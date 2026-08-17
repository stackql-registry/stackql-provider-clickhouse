#!/usr/bin/env node

// Quick offline validation of the generated provider against the local file
// registry - no network, no server. Runs SHOW SERVICES / SHOW RESOURCES /
// SHOW METHODS and DESCRIBE EXTENDED over representative resources and
// asserts expected counts and mappings, including the x-stackQL-envVar
// behaviour of the organizationId server variable (stackql/stackql#707).
// Exit 1 on any failure.
//
// Usage: node tests/offline_validation.mjs
// Binary resolution: $STACKQL, ./stackql(.exe), then PATH.

import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const regPath = path.join(repoRoot, 'provider-dev', 'openapi').replace(/\\/g, '/');
const registry = JSON.stringify({ url: `file://${regPath}`, localDocRoot: regPath, verifyConfig: { nopVerify: true } });

function findBinary() {
  if (process.env.STACKQL && fs.existsSync(process.env.STACKQL)) return process.env.STACKQL;
  for (const name of ['stackql', 'stackql.exe']) {
    const local = path.join(repoRoot, name);
    if (fs.existsSync(local)) return local;
  }
  return 'stackql'; // PATH
}
const bin = findBinary();

function runSql(sql, envOverrides = {}) {
  return new Promise((resolve) => {
    const env = { ...process.env, ...envOverrides };
    for (const [k, v] of Object.entries(envOverrides)) if (v === undefined) delete env[k];
    const child = spawn(bin, [`--registry=${registry}`, 'exec', sql, '--output', 'json'], { cwd: repoRoot, env });
    let stdout = '', stderr = '';
    child.stdout.on('data', (d) => (stdout += d));
    child.stderr.on('data', (d) => (stderr += d));
    child.on('close', (code) => {
      let rows = [];
      try { rows = JSON.parse(stdout) ?? []; } catch { rows = []; }
      resolve({ code, rows, stdout, stderr });
    });
    child.on('error', (err) => resolve({ code: -1, rows: [], stdout: '', stderr: String(err) }));
  });
}

const results = [];
function check(name, cond, note = '') {
  results.push({ name, pass: !!cond, note });
  console.log(`  ${cond ? 'PASS' : 'FAIL'}  ${name}${cond ? '' : `  [${String(note).slice(0, 160)}]`}`);
}

const EXPECTED_SERVICES = ['backups', 'clickpipes', 'clickstack', 'keys', 'members', 'organizations', 'postgres', 'roles', 'services', 'udfs'];
const EXPECTED_RESOURCES = {
  services: ['clickhouse_settings', 'clickhouse_settings_schemas', 'private_endpoint_configs', 'private_endpoints', 'replica_scalings', 'scaling_schedules', 'service_query_endpoints', 'services', 'upgrade_windows'],
  organizations: ['active_balances', 'activities', 'byoc_infrastructures', 'organizations', 'private_endpoint_configs', 'prometheus_scrape_targets', 'quotas', 'usage_costs'],
  keys: ['keys'],
  clickstack: ['alerts', 'dashboards', 'roles', 'saved_searches', 'sources', 'webhooks'],
  clickpipes: ['cdc_scalings', 'clickpipes', 'reverse_private_endpoints', 'scalings', 'settings'],
  postgres: ['configs', 'logs', 'metrics', 'services', 'slow_query_patterns'],
  members: ['invitations', 'members'],
  backups: ['backup_buckets', 'backup_configurations', 'backups'],
  roles: ['roles'],
  udfs: ['attachments', 'functions', 'upload_urls', 'versions']
};

console.log(`stackql: ${bin}`);
let r = await runSql('SHOW SERVICES IN clickhouse');
check('SHOW SERVICES (10)', r.rows.length === 10 && EXPECTED_SERVICES.every((s) => r.rows.some((x) => x.name === s)), r.stderr || JSON.stringify(r.rows.map((x) => x.name)));

for (const [svc, expected] of Object.entries(EXPECTED_RESOURCES)) {
  r = await runSql(`SHOW RESOURCES IN clickhouse.${svc}`);
  const names = r.rows.map((x) => x.name).sort();
  check(`SHOW RESOURCES IN clickhouse.${svc} (${expected.length})`, JSON.stringify(names) === JSON.stringify(expected), r.stderr || JSON.stringify(names));
}

// services.services: 7 methods, verbs, and organizationId requiredness tracks CLICKHOUSE_ORG_ID
r = await runSql('SHOW METHODS IN clickhouse.services.services', { CLICKHOUSE_ORG_ID: undefined });
const byName = Object.fromEntries(r.rows.map((m) => [m.MethodName, m]));
check('services.services methods (7)', r.rows.length === 7, JSON.stringify(Object.keys(byName)));
check('services.services verbs', byName.list?.SQLVerb === 'SELECT' && byName.create?.SQLVerb === 'INSERT' && byName.update?.SQLVerb === 'UPDATE' && byName.delete?.SQLVerb === 'DELETE' && byName.update_state?.SQLVerb === 'EXEC' && byName.update_password?.SQLVerb === 'EXEC', JSON.stringify(byName));
check('organization_id is required when CLICKHOUSE_ORG_ID is unset', String(byName.list?.RequiredParams || '').includes('organization_id'), JSON.stringify(byName.list));
r = await runSql('SHOW METHODS IN clickhouse.services.services', { CLICKHOUSE_ORG_ID: '00000000-0000-4000-8000-000000000000' });
const listM = r.rows.find((m) => m.MethodName === 'list');
check('organization_id is optional when CLICKHOUSE_ORG_ID is set (x-stackQL-envVar)', listM && !String(listM.RequiredParams || '').includes('organization_id'), JSON.stringify(listM));

// organizations root paths: list needs nothing, get needs organizationId as a path param
r = await runSql('SHOW METHODS IN clickhouse.organizations.organizations', { CLICKHOUSE_ORG_ID: undefined });
const org = Object.fromEntries(r.rows.map((m) => [m.MethodName, m]));
check('organizations.organizations list has no required params', org.list && !String(org.list.RequiredParams || '').trim(), JSON.stringify(org.list));
check('organizations.organizations get requires organizationId', String(org.get?.RequiredParams || '').includes('organizationId'), JSON.stringify(org.get));

// DESCRIBE EXTENDED on the representative resources
r = await runSql('DESCRIBE EXTENDED clickhouse.services.services');
const svcCols = r.rows.map((c) => c.name);
check('DESCRIBE services.services has snake_case columns (ip_access_list, current_scaling)', ['id', 'name', 'state', 'tier', 'provider', 'region', 'ip_access_list', 'current_scaling'].every((c) => svcCols.includes(c)), JSON.stringify(svcCols));
r = await runSql('DESCRIBE EXTENDED clickhouse.organizations.usage_costs');
const ucCols = r.rows.map((c) => c.name);
check('DESCRIBE usage_costs projects the cost rows ($.result.costs)', ['date', 'entity_type', 'entity_name', 'total_chc', 'metrics'].every((c) => ucCols.includes(c)) && !ucCols.includes('grand_total_chc'), JSON.stringify(ucCols));
r = await runSql('DESCRIBE EXTENDED clickhouse.keys.keys');
const keyCols = r.rows.map((c) => c.name);
check('DESCRIBE keys.keys has snake_case columns (assigned_roles, expire_at)', ['id', 'name', 'state', 'assigned_roles', 'expire_at', 'ip_access_list'].every((c) => keyCols.includes(c)), JSON.stringify(keyCols));
r = await runSql('DESCRIBE EXTENDED clickhouse.clickstack.dashboards');
check('DESCRIBE clickstack.dashboards has tiles', r.rows.some((c) => c.name === 'tiles'), JSON.stringify(r.rows.map((c) => c.name)));

// udfs: cursor pagination config present, functions list projects $.result.items
r = await runSql('SHOW METHODS IN clickhouse.udfs.functions');
check('udfs.functions methods (list, get, create, delete)', ['list', 'get', 'create', 'delete'].every((m) => r.rows.some((x) => x.MethodName === m)), JSON.stringify(r.rows));
r = await runSql('DESCRIBE EXTENDED clickhouse.udfs.functions');
check('DESCRIBE udfs.functions projects UDF rows ($.result.items)', r.rows.some((c) => c.name === 'function_name') && !r.rows.some((c) => c.name === 'pagination'), JSON.stringify(r.rows.map((c) => c.name)));
r = await runSql('DESCRIBE EXTENDED clickhouse.organizations.prometheus_scrape_targets');
check('DESCRIBE prometheus_scrape_targets (bare-array wrap) has targets and labels', ['targets', 'labels'].every((c) => r.rows.some((x) => x.name === c)), JSON.stringify(r.rows.map((c) => c.name)));

// EXEC method params surface the body attributes (naive request body translate)
r = await runSql('SHOW METHODS IN clickhouse.clickstack.dashboards');
check('clickstack.dashboards update requires name and tiles (PUT full replacement)', r.rows.some((m) => m.MethodName === 'update' && /name/.test(m.RequiredParams) && /tiles/.test(m.RequiredParams)), JSON.stringify(r.rows));

const failed = results.filter((x) => !x.pass);
console.log(`\n${results.length - failed.length}/${results.length} passed`);
if (failed.length) process.exit(1);

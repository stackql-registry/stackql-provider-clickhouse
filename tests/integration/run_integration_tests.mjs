#!/usr/bin/env node

// Integration tests: run the generated clickhouse provider (local file
// registry) against the mock ClickHouse Cloud API and assert row-level
// results for each operation archetype:
//   - $.result envelope unwrapping for list and single reads
//   - $.result.costs projection on usage_costs (the FinOps lead)
//   - basic-auth header presence (the mock 401s anything else)
//   - organizationId resolved from CLICKHOUSE_ORG_ID (x-stackQL-envVar,
//     stackql/stackql#707), a WHERE value beating the environment, and the
//     unset-env failure mode
//   - the organization-root paths on their path-level server override
//   - a full API key INSERT / UPDATE / DELETE lifecycle
//   - the EXEC state command wire body ({"command": "stop"})
//   - an ipAccessList add/remove array-patch UPDATE (body passed through)
//   - a ClickStack dashboard INSERT / SELECT / UPDATE (PUT) / DELETE round trip
//   - status-only DELETE responses
//   - the snake_case surface: snake WHERE / INSERT keys (service_id,
//     ip_access_list, click_stack_dashboard_id) resolve to the camelCase wire
//     names via request.nativeCasing; SELECT columns are snake aliases
//
// The vendor server template is https-only and cannot address the mock, so
// this runner materialises a TEST COPY of provider-dev/openapi in
// tests/integration/.registry-tmp (gitignored, recreated each run) with the
// server URLs rewritten to the mock (server variables and the
// x-stackQL-envVar extension are preserved). provider-dev/** is never
// modified.
//
// Requires a stackql binary: $STACKQL, ./stackql, or `stackql` on PATH.
//
// Usage: node tests/integration/run_integration_tests.mjs [--verbose]

import { spawn } from 'child_process';
import { existsSync, rmSync, cpSync, readdirSync, readFileSync, writeFileSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import yaml from 'js-yaml';
import {
  startMockServer, EXPECTED_KEY_ID, EXPECTED_KEY_SECRET, ORG_ID, OTHER_ORG_ID,
  SERVICE_ID, KEY_ID, DASHBOARD_ID
} from './mock_clickhouse_server.mjs';

const here = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(here, '..', '..');
const verbose = process.argv.includes('--verbose');
const t0 = Date.now();

function findStackql() {
  if (process.env.STACKQL) return process.env.STACKQL;
  const local = path.join(repoRoot, process.platform === 'win32' ? 'stackql.exe' : 'stackql');
  if (existsSync(local)) return local;
  return 'stackql'; // PATH
}

// Copy the generated provider docs and point every server at the mock:
// the org-scoped template keeps its {organizationId} variable and
// x-stackQL-envVar; the organization-root path-level override goes to the
// bare mock base.
function buildTestRegistry(port) {
  const srcDir = path.join(repoRoot, 'provider-dev', 'openapi');
  const tmpDir = path.join(here, '.registry-tmp');
  rmSync(tmpDir, { recursive: true, force: true });
  cpSync(srcDir, tmpDir, { recursive: true });
  const servicesDir = path.join(tmpDir, 'src', 'clickhouse', 'v00.00.00000', 'services');
  const base = `http://localhost:${port}`;
  for (const f of readdirSync(servicesDir)) {
    if (!f.endsWith('.yaml')) continue;
    const fp = path.join(servicesDir, f);
    const doc = yaml.load(readFileSync(fp, 'utf8'));
    if (!doc.servers?.[0]?.url) throw new Error(`no top-level servers block found in ${f}`);
    doc.servers[0].url = doc.servers[0].url.replace('https://api.clickhouse.cloud', base);
    if (!doc.servers[0].variables?.organization_id?.['x-stackQL-envVar']) throw new Error(`${f}: organization_id server variable lost its x-stackQL-envVar`);
    for (const item of Object.values(doc.paths || {})) {
      if (item.servers) item.servers = item.servers.map((s) => ({ ...s, url: s.url.replace('https://api.clickhouse.cloud', base) }));
    }
    writeFileSync(fp, yaml.dump(doc, { lineWidth: -1, noRefs: true }));
  }
  return tmpDir;
}

const stackqlBin = findStackql();

// IMPORTANT: must be async (spawn, not spawnSync) - the mock server runs on
// this process's event loop, so a synchronous wait for stackql deadlocks.
function makeRunSql(registry) {
  return function runSql(sql, envOverrides = {}) {
    return new Promise((resolve) => {
      const env = {
        ...process.env,
        CLICKHOUSE_CLOUD_API_KEY: EXPECTED_KEY_ID,
        CLICKHOUSE_CLOUD_API_SECRET: EXPECTED_KEY_SECRET,
        CLICKHOUSE_ORG_ID: ORG_ID,
        ...envOverrides
      };
      for (const [k, v] of Object.entries(envOverrides)) if (v === undefined) delete env[k];
      const child = spawn(stackqlBin, [`--registry=${registry}`, 'exec', sql, '--output', 'json'], { cwd: repoRoot, env });
      let stdout = '', stderr = '';
      child.stdout.on('data', (d) => { stdout += d; });
      child.stderr.on('data', (d) => { stderr += d; });
      const timer = setTimeout(() => child.kill(), 120000);
      child.on('error', (e) => { clearTimeout(timer); resolve({ rows: null, err: String(e) }); });
      child.on('close', () => {
        clearTimeout(timer);
        stdout = stdout.trim();
        stderr = stderr.trim();
        if (verbose) console.log(`    sql: ${sql}\n    out: ${stdout.slice(0, 400)}${stderr ? `\n    err: ${stderr.slice(0, 400)}` : ''}`);
        const errish = /http response status code: [45]|error|panic|FindRoute|no matching operation|cannot find matching operation|disallowed|cannot find any viable servers/i;
        if (errish.test(stderr)) return resolve({ rows: null, err: stderr });
        if (!stdout) return resolve({ rows: [], err: null });
        try {
          resolve({ rows: JSON.parse(stdout) ?? [], err: null }); // literal null for zero rows
        } catch {
          resolve({ rows: [{ _text: stdout }], err: errish.test(stdout) ? stdout : null }); // DML status text
        }
      });
    });
  };
}

const results = [];
function check(name, cond, note = '') {
  results.push({ name, pass: !!cond, note });
  console.log(`  ${cond ? 'PASS' : 'FAIL'}  ${name}${!cond && note ? `  [${String(note).slice(0, 220)}]` : ''}`);
}

const { server, port, log, state } = await startMockServer();
const tmpDir = buildTestRegistry(port);
const regPath = tmpDir.split(path.sep).join('/');
const registry = JSON.stringify({ url: `file://${regPath}`, localDocRoot: regPath, verifyConfig: { nopVerify: true } });
const runSql = makeRunSql(registry);
console.log(`mock ClickHouse Cloud API on localhost:${port}, stackql: ${stackqlBin}`);

const orgPath = (rest) => `/v1/organizations/${ORG_ID}${rest}`;
const calls = (mark, method, p) => log.slice(mark).filter((e) => e.method === method && e.path === p);

try {
  // --- meta sanity
  let r = await runSql(`SHOW SERVICES IN clickhouse`);
  check('show services (10)', r.rows && r.rows.length === 10, r.err || `got ${r.rows?.length}`);
  r = await runSql(`SHOW METHODS IN clickhouse.services.services`);
  check('show methods: organization_id not required when CLICKHOUSE_ORG_ID is set',
    r.rows && r.rows.length === 7 && !r.rows.some((m) => String(m.RequiredParams).includes('organization_id')), r.err || JSON.stringify(r.rows));
  r = await runSql(`SHOW METHODS IN clickhouse.services.services`, { CLICKHOUSE_ORG_ID: undefined });
  check('show methods: organization_id required when CLICKHOUSE_ORG_ID is unset',
    r.rows && r.rows.some((m) => m.MethodName === 'list' && String(m.RequiredParams).includes('organization_id')), r.err || JSON.stringify(r.rows));

  // --- basic auth: the mock 401s anything but the expected pair
  let mark = log.length;
  r = await runSql(`SELECT id, name FROM clickhouse.services.services`);
  check('services list (2 rows via $.result)', r.rows && r.rows.length === 2, r.err || `got ${r.rows?.length}`);
  const svcCalls = calls(mark, 'GET', orgPath('/services'));
  // any-sdk emits the scheme token as `BASIC`; RFC 7235 makes it case-insensitive
  check('basic auth header sent (Basic base64(key:secret))',
    svcCalls.length === 1 && /^basic\s+/i.test(svcCalls[0].authorization) && svcCalls[0].authorization.split(/\s+/)[1] === Buffer.from(`${EXPECTED_KEY_ID}:${EXPECTED_KEY_SECRET}`).toString('base64'),
    JSON.stringify(svcCalls.map((c) => c.authorization)));
  check('no auth failures so far', state.authFailures === 0, `authFailures=${state.authFailures}`);
  r = await runSql(`SELECT id FROM clickhouse.services.services`, { CLICKHOUSE_CLOUD_API_SECRET: 'wrong' });
  check('wrong secret -> 401 surfaced', r.err && /401/.test(r.err), r.err || 'no error');

  // --- organizationId: env-resolved, WHERE override, unset failure
  mark = log.length;
  r = await runSql(`SELECT id, name FROM clickhouse.services.services WHERE organization_id = '${OTHER_ORG_ID}'`);
  check('WHERE organization_id beats CLICKHOUSE_ORG_ID (routed to other org, 0 rows)',
    r.rows && r.rows.length === 0 && calls(mark, 'GET', `/v1/organizations/${OTHER_ORG_ID}/services`).length === 1,
    r.err || `rows=${r.rows?.length} paths=${JSON.stringify(log.slice(mark).map((e) => e.path))}`);
  r = await runSql(`SELECT id FROM clickhouse.services.services`, { CLICKHOUSE_ORG_ID: undefined });
  check('unset CLICKHOUSE_ORG_ID and no WHERE -> cannot find any viable servers', r.err && /viable servers|organization_id/i.test(r.err), r.err || 'no error');
  r = await runSql(`SELECT id FROM clickhouse.services.services WHERE organization_id = '${ORG_ID}'`, { CLICKHOUSE_ORG_ID: undefined });
  check('unset env + WHERE organization_id works', r.rows && r.rows.length === 2, r.err || `got ${r.rows?.length}`);

  // --- organization-root paths on their path-level server override
  mark = log.length;
  r = await runSql(`SELECT id, name FROM clickhouse.organizations.organizations`);
  check('organizations list hits GET /v1/organizations (bare base)',
    r.rows && r.rows.length === 1 && calls(mark, 'GET', '/v1/organizations').length === 1, r.err || JSON.stringify(log.slice(mark).map((e) => e.path)));
  mark = log.length;
  r = await runSql(`SELECT name FROM clickhouse.organizations.organizations WHERE organization_id = '${ORG_ID}'`);
  check('organization get by id', r.rows && r.rows.length === 1 && r.rows[0].name === 'Mock Org' && calls(mark, 'GET', orgPath('')).length === 1, r.err || JSON.stringify(r.rows));

  // --- single read via $.result
  r = await runSql(`SELECT name, state, json_extract(ip_access_list, '$[0].source') AS cidr FROM clickhouse.services.services WHERE service_id = '${SERVICE_ID}'`);
  check('service get ($.result object, json_extract on nested list)', r.rows && r.rows.length === 1 && r.rows[0].cidr === '0.0.0.0/0', r.err || JSON.stringify(r.rows));

  // --- FinOps: usage_costs projects $.result.costs
  mark = log.length;
  r = await runSql(`SELECT date, entity_type, entity_name, total_chc, json_extract(metrics, '$.computeCHC') AS compute FROM clickhouse.organizations.usage_costs WHERE from_date = '2026-08-01' AND to_date = '2026-08-07'`);
  check('usage_costs list (3 rows via $.result.costs)', r.rows && r.rows.length === 3 && r.rows.some((x) => String(x.compute) === '0.675'), r.err || JSON.stringify(r.rows));
  const ucCalls = calls(mark, 'GET', orgPath('/usageCost'));
  check('from_date/to_date pushed as query params', ucCalls.length === 1 && ucCalls[0].query.from_date === '2026-08-01' && ucCalls[0].query.to_date === '2026-08-07', JSON.stringify(ucCalls.map((c) => c.query)));

  // --- other reads
  r = await runSql(`SELECT user_id, role FROM clickhouse.members.members`);
  check('members list', r.rows && r.rows.length === 1 && r.rows[0].role === 'admin', r.err || JSON.stringify(r.rows));
  r = await runSql(`SELECT id, type FROM clickhouse.organizations.activities`);
  check('activities list', r.rows && r.rows.length === 2, r.err || JSON.stringify(r.rows));
  r = await runSql(`SELECT id, status FROM clickhouse.backups.backups WHERE service_id = '${SERVICE_ID}'`);
  check('backups list (service-scoped)', r.rows && r.rows.length === 2, r.err || JSON.stringify(r.rows));
  r = await runSql(`SELECT id, name FROM clickhouse.keys.keys`);
  check('keys list (1 seed key)', r.rows && r.rows.length === 1 && r.rows[0].id === KEY_ID, r.err || JSON.stringify(r.rows));

  // --- API key lifecycle: INSERT / UPDATE / DELETE
  mark = log.length;
  r = await runSql(`INSERT INTO clickhouse.keys.keys (name, roles, state) SELECT 'stackql-smoke-it', '["developer"]', 'enabled'`);
  check('key INSERT', !r.err, r.err);
  const keyPost = calls(mark, 'POST', orgPath('/keys'));
  check('key INSERT wire body {name, roles[], state}',
    keyPost.length === 1 && keyPost[0].body?.name === 'stackql-smoke-it' && Array.isArray(keyPost[0].body?.roles) && keyPost[0].body.roles[0] === 'developer' && keyPost[0].body?.state === 'enabled',
    JSON.stringify(keyPost.map((c) => c.body)));
  const newKey = [...state.keys.values()].find((k) => k.name === 'stackql-smoke-it');
  check('key exists in mock state', !!newKey);
  if (newKey) {
    r = await runSql(`SELECT name, state FROM clickhouse.keys.keys WHERE key_id = '${newKey.id}'`);
    check('key get after INSERT', r.rows && r.rows.length === 1 && r.rows[0].state === 'enabled', r.err || JSON.stringify(r.rows));
    mark = log.length;
    r = await runSql(`UPDATE clickhouse.keys.keys SET state = 'disabled', name = 'stackql-smoke-it-renamed' WHERE key_id = '${newKey.id}'`);
    check('key UPDATE (PATCH)', !r.err, r.err);
    const keyPatch = calls(mark, 'PATCH', orgPath(`/keys/${newKey.id}`));
    check('key UPDATE wire body {state, name}', keyPatch.length === 1 && keyPatch[0].body?.state === 'disabled' && keyPatch[0].body?.name === 'stackql-smoke-it-renamed', JSON.stringify(keyPatch.map((c) => c.body)));
    r = await runSql(`SELECT name, state FROM clickhouse.keys.keys WHERE key_id = '${newKey.id}'`);
    check('key reflects UPDATE', r.rows && r.rows[0]?.state === 'disabled' && r.rows[0]?.name === 'stackql-smoke-it-renamed', r.err || JSON.stringify(r.rows));
    mark = log.length;
    r = await runSql(`DELETE FROM clickhouse.keys.keys WHERE key_id = '${newKey.id}'`);
    check('key DELETE (status-only response)', !r.err && calls(mark, 'DELETE', orgPath(`/keys/${newKey.id}`)).length === 1, r.err);
    check('key gone from mock state', !state.keys.has(newKey.id));
    r = await runSql(`SELECT id FROM clickhouse.keys.keys`);
    check('keys list back to 1', r.rows && r.rows.length === 1, r.err || `got ${r.rows?.length}`);
  }

  // --- EXEC state command: PATCH .../state {"command": "stop"}
  mark = log.length;
  r = await runSql(`EXEC clickhouse.services.services.update_state @serviceId = '${SERVICE_ID}', @command = 'stop'`);
  check('services.update_state EXEC', !r.err, r.err);
  const stateCalls = calls(mark, 'PATCH', orgPath(`/services/${SERVICE_ID}/state`));
  check('EXEC wire body {"command": "stop"}', stateCalls.length === 1 && stateCalls[0].body?.command === 'stop', JSON.stringify(stateCalls.map((c) => c.body)));
  check('mock service state -> stopping', state.services.get(SERVICE_ID)?.state === 'stopping', state.services.get(SERVICE_ID)?.state);

  // --- ipAccessList array-patch UPDATE (add/remove passed through verbatim)
  mark = log.length;
  const patch = JSON.stringify({ add: [{ source: '203.0.113.0/24', description: 'office' }], remove: [{ source: '0.0.0.0/0', description: 'Anywhere' }] });
  r = await runSql(`UPDATE clickhouse.services.services SET ip_access_list = '${patch}' WHERE service_id = '${SERVICE_ID}'`);
  check('service ip_access_list UPDATE (snake key -> ipAccessList add/remove)', !r.err, r.err);
  const svcPatch = calls(mark, 'PATCH', orgPath(`/services/${SERVICE_ID}`));
  check('array-patch wire body {ipAccessList: {add, remove}}',
    svcPatch.length === 1 && svcPatch[0].body?.ipAccessList?.add?.[0]?.source === '203.0.113.0/24' && svcPatch[0].body?.ipAccessList?.remove?.[0]?.source === '0.0.0.0/0',
    JSON.stringify(svcPatch.map((c) => c.body)));
  r = await runSql(`SELECT json_extract(ip_access_list, '$[0].source') AS cidr FROM clickhouse.services.services WHERE service_id = '${SERVICE_ID}'`);
  check('ipAccessList after patch: remove processed before add', r.rows && r.rows[0]?.cidr === '203.0.113.0/24', r.err || JSON.stringify(r.rows));

  // --- ClickStack dashboard round trip
  r = await runSql(`SELECT id, name FROM clickhouse.clickstack.dashboards WHERE service_id = '${SERVICE_ID}'`);
  check('dashboards list (1 seed)', r.rows && r.rows.length === 1 && r.rows[0].id === DASHBOARD_ID, r.err || JSON.stringify(r.rows));
  mark = log.length;
  const tiles = JSON.stringify([{ name: 'Error rate', x: 0, y: 0, w: 6, h: 3, config: { displayType: 'line', select: [{ aggFn: 'count', where: '' }] } }]);
  r = await runSql(`INSERT INTO clickhouse.clickstack.dashboards (service_id, name, tiles, tags) SELECT '${SERVICE_ID}', 'stackql-smoke-dash', '${tiles}', '["smoke"]'`);
  check('dashboard INSERT', !r.err, r.err);
  const dashPost = calls(mark, 'POST', orgPath(`/services/${SERVICE_ID}/clickstack/dashboards`));
  check('dashboard INSERT wire body {name, tiles[], tags[]}', dashPost.length === 1 && dashPost[0].body?.name === 'stackql-smoke-dash' && dashPost[0].body?.tiles?.[0]?.config?.displayType === 'line' && dashPost[0].body?.tags?.[0] === 'smoke', JSON.stringify(dashPost.map((c) => c.body)));
  const newDash = [...state.dashboards.values()].find((d) => d.name === 'stackql-smoke-dash');
  if (newDash) {
    r = await runSql(`SELECT name, json_extract(tiles, '$[0].name') AS tile FROM clickhouse.clickstack.dashboards WHERE service_id = '${SERVICE_ID}' AND click_stack_dashboard_id = '${newDash.id}'`);
    check('dashboard get (nested tiles via json_extract)', r.rows && r.rows[0]?.tile === 'Error rate', r.err || JSON.stringify(r.rows));
    mark = log.length;
    // PUT is a full replacement: name and tiles are required on the update
    r = await runSql(`UPDATE clickhouse.clickstack.dashboards SET name = 'stackql-smoke-dash-v2', tiles = '${tiles}' WHERE service_id = '${SERVICE_ID}' AND click_stack_dashboard_id = '${newDash.id}'`);
    check('dashboard UPDATE (PUT, full replacement: name + tiles required)', !r.err && calls(mark, 'PUT', orgPath(`/services/${SERVICE_ID}/clickstack/dashboards/${newDash.id}`)).length === 1, r.err || JSON.stringify(log.slice(mark).map((e) => `${e.method} ${e.path}`)));
    r = await runSql(`DELETE FROM clickhouse.clickstack.dashboards WHERE service_id = '${SERVICE_ID}' AND click_stack_dashboard_id = '${newDash.id}'`);
    check('dashboard DELETE', !r.err && !state.dashboards.has(newDash.id), r.err);
  } else {
    check('dashboard exists in mock state', false, 'INSERT did not create the dashboard');
  }

  // --- negative path: error envelope surfaces
  r = await runSql(`SELECT name FROM clickhouse.services.services WHERE service_id = 'does-not-exist'`);
  check('404 error envelope surfaced', r.err && /404/.test(r.err) && /NOT_FOUND/.test(r.err), r.err || 'no error');
} finally {
  server.close();
}

const failed = results.filter((x) => !x.pass);
console.log(`\n${results.length - failed.length}/${results.length} passed in ${((Date.now() - t0) / 1000).toFixed(1)}s`);
if (failed.length) {
  console.log('failed:');
  for (const f of failed) console.log(`  - ${f.name}${f.note ? `: ${String(f.note).slice(0, 300)}` : ''}`);
  process.exit(1);
}

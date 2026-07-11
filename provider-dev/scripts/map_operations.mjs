#!/usr/bin/env node

// Populates stackql_resource_name, stackql_method_name, stackql_verb and
// stackql_object_key in provider-dev/config/all_services.csv from the split
// service specs in provider-dev/source. Deterministic and re-runnable on
// spec refreshes; review the CSV diff after running. Manual mapping decisions
// are applied as rules here, never as hand-edits to the CSV.
//
// Mapping conventions (see CLAUDE.md):
//   GET collection ($.result array)  -> SELECT  <resource>.list, objectKey $.result
//   GET single                       -> SELECT  <resource>.get,  objectKey $.result
//   POST create                      -> INSERT  <resource>.create
//   PATCH/PUT edit                   -> UPDATE  <resource>.update (array-operation
//                                       add/remove semantics stay visible in the
//                                       request body schema - nothing is hidden)
//   DELETE                           -> DELETE  <resource>.delete
//   PATCH state/password commands    -> EXEC    <parent>.update_<segment>
//                                       (services.update_state with @command)
//   POST actions (restore, replica,  -> EXEC    <parent>.<snake(action)>
//     schema discovery)
//   Prometheus text, PEM, deprecated -> skipped (skip_this_resource, reason-coded
//     scaling PATCH                     in endpoint_inventory.csv)
//
// Resource names come from the shared derivation in lib/spec_helpers.mjs
// (scoping pairs stripped, last segment pluralized); RESOURCE_RULES applies
// explicit overrides where the mechanical name is wrong.
//
// Validates before writing: every CSV row mapped or skipped with a reason,
// every spec operation present in the CSV, (resource, method) unique per
// service, and unique required-parameter signatures per (resource, sqlVerb).
// Fails without writing on violations.
//
// Usage: npm run map-operations [-- --out other.csv]

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import yaml from 'js-yaml';
import pluralize from 'pluralize';
import {
  HTTP_VERBS, camelToSnake, pathParams, makeResolver,
  classifyEnvelope, skipReason, scopedSegments,
  ACTION_SEGMENTS, POST_EXEC_SEGMENTS, deriveResource
} from './lib/spec_helpers.mjs';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
const sourceDir = path.join(repoRoot, 'provider-dev', 'source');
const csvPath = path.join(repoRoot, 'provider-dev', 'config', 'all_services.csv');

// Explicit resource-name overrides, matched on (service, verb-optional,
// normalized path with params collapsed to {}). First match wins; add rules
// here as services come online - never edit the CSV.
const RESOURCE_RULES = [
  // pluralize gives "schemata"; the settings schema read is its own resource
  // because a select method on clickhouse_settings would clash with list's
  // required-parameter signature
  { re: /\/clickhouseSettings\/schema$/, resource: 'clickhouse_settings_schemas' },
  // the mechanical name repeats the service prefix
  { service: 'clickpipes', re: /\/clickpipesReversePrivateEndpoints(\/\{\})?$/, resource: 'reverse_private_endpoints' },
  { service: 'clickpipes', re: /\/clickpipesCdcScaling$/, resource: 'cdc_scalings' },
  // clickhouse.postgres.postgres reads poorly; the entity is a service
  { service: 'postgres', re: /\/postgres(\/\{\})?$/, resource: 'services' },
  { service: 'postgres', re: /\/postgres\/\{\}\/(restoredService|readReplica|password|state)$/, resource: 'services' }
];

// Method-name / verb / objectKey overrides for cases the generic rules
// cannot express, matched on (verb, normalized path). First match wins.
const METHOD_RULES = [
  // usage cost rows live under $.result.costs; $.result itself is a single
  // object carrying grandTotalCHC plus the costs array. Projecting the array
  // makes the FinOps queries row-oriented.
  { verb: 'get', re: /\/usageCost$/, method: 'list', sqlVerb: 'select', objectKey: '$.result.costs' },
  // "List ClickHouse settings" returns the settings map as a result object,
  // not a result array; it is still the collection read, and calling it get
  // would collide with the single-setting read on {settingName}
  { verb: 'get', re: /\/clickhouseSettings$/, method: 'list', sqlVerb: 'select', objectKey: '$.result' }
];

function normalizePath(pathKey) {
  return pathKey.replace(/\{[^}]+\}/g, '{}');
}

// ---------------------------------------------------------------------------
// Index every operation in the split service specs
// ---------------------------------------------------------------------------

const ops = new Map(); // `${filename}::${path}::${verb}` -> { op, pathItem, resolve }
const specFiles = fs.readdirSync(sourceDir).filter((f) => f.endsWith('.yaml')).sort();
if (specFiles.length === 0) {
  console.error(`Error: no service specs in ${sourceDir} - run npm run split first`);
  process.exit(1);
}
for (const filename of specFiles) {
  const spec = yaml.load(fs.readFileSync(path.join(sourceDir, filename), 'utf8'));
  const resolve = makeResolver(spec);
  for (const [pathKey, pathItem] of Object.entries(spec.paths || {})) {
    for (const verb of HTTP_VERBS) {
      if (!pathItem[verb]) continue;
      ops.set(`${filename}::${pathKey}::${verb}`, { op: pathItem[verb], pathItem, resolve });
    }
  }
}

// ---------------------------------------------------------------------------
// Mapping
// ---------------------------------------------------------------------------

function resourceFor(service, pathKey, verb) {
  const norm = normalizePath(pathKey);
  for (const rule of RESOURCE_RULES) {
    if (rule.service && rule.service !== service) continue;
    if (rule.verb && rule.verb !== verb) continue;
    if (rule.re.test(norm)) return rule.resource;
  }
  return deriveResource(pathKey, verb, service, pluralize);
}

function mapOperation(filename, pathKey, verb) {
  const entry = ops.get(`${filename}::${pathKey}::${verb}`);
  if (!entry) return { error: `operation not found in ${sourceDir}` };
  const { op, resolve } = entry;
  const service = filename.replace(/\.yaml$/, '');

  const skip = skipReason(pathKey, op, resolve);
  if (skip) return { resource: 'skip_this_resource', method: '', sqlVerb: '', objectKey: '', skip };

  const norm = normalizePath(pathKey);
  const methodRule = METHOD_RULES.find((r) => r.verb === verb && r.re.test(norm));
  const resource = resourceFor(service, pathKey, verb);
  if (methodRule) {
    return { resource, method: methodRule.method, sqlVerb: methodRule.sqlVerb, objectKey: methodRule.objectKey || '' };
  }

  const { segs } = scopedSegments(pathKey);
  const statics = segs.filter((s) => !s.startsWith('{'));
  const lastStatic = statics[statics.length - 1];
  const lastSegIsParam = /\}$/.test(pathKey);
  const { envelope } = classifyEnvelope(op, resolve);

  if (verb === 'get') {
    if (envelope === 'result-array') return { resource, method: 'list', sqlVerb: 'select', objectKey: '$.result' };
    if (lastSegIsParam) return { resource, method: 'get', sqlVerb: 'select', objectKey: '$.result' };
    // singleton reads (configs, windows, schedules, schemas, settings maps)
    return { resource, method: 'get', sqlVerb: 'select', objectKey: '$.result' };
  }
  if (verb === 'delete') {
    return { resource, method: 'delete', sqlVerb: 'delete', objectKey: '' };
  }
  if (verb === 'patch' || verb === 'put') {
    if (ACTION_SEGMENTS.has(lastStatic)) {
      return { resource, method: `update_${camelToSnake(lastStatic)}`, sqlVerb: 'exec', objectKey: '' };
    }
    return { resource, method: 'update', sqlVerb: 'update', objectKey: '' };
  }
  // post
  if (POST_EXEC_SEGMENTS.has(lastStatic)) {
    return { resource, method: camelToSnake(lastStatic), sqlVerb: 'exec', objectKey: '' };
  }
  return { resource, method: 'create', sqlVerb: 'insert', objectKey: '' };
}

// ---------------------------------------------------------------------------
// CSV read/transform/write (RFC 4180, preserves column order)
// ---------------------------------------------------------------------------

function parseCsv(text) {
  const rows = [];
  let row = [], field = '', inQuotes = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (inQuotes) {
      if (c === '"') {
        if (text[i + 1] === '"') { field += '"'; i++; } else { inQuotes = false; }
      } else { field += c; }
    } else if (c === '"') {
      inQuotes = true;
    } else if (c === ',') {
      row.push(field); field = '';
    } else if (c === '\n' || c === '\r') {
      if (c === '\r' && text[i + 1] === '\n') i++;
      row.push(field); field = '';
      if (row.length > 1 || row[0] !== '') rows.push(row);
      row = [];
    } else { field += c; }
  }
  if (field !== '' || row.length > 0) { row.push(field); rows.push(row); }
  return rows;
}

function csvField(v) {
  return /[",\n\r]/.test(v) ? `"${v.replace(/"/g, '""')}"` : v;
}

const rows = parseCsv(fs.readFileSync(csvPath, 'utf8'));
const header = rows[0];
const col = Object.fromEntries(header.map((h, i) => [h, i]));
for (const required of ['filename', 'path', 'verb', 'operationId', 'stackql_resource_name', 'stackql_method_name', 'stackql_verb', 'stackql_object_key']) {
  if (!(required in col)) {
    console.error(`Missing expected CSV column: ${required}`);
    process.exit(1);
  }
}

const errors = [];
const seenKeys = new Set();
const stats = { select: 0, insert: 0, update: 0, delete: 0, exec: 0, skipped: 0 };
const skipsByReason = {};

for (const row of rows.slice(1)) {
  const filename = row[col.filename], pathKey = row[col.path], verb = row[col.verb];
  seenKeys.add(`${filename}::${pathKey}::${verb}`);
  const m = mapOperation(filename, pathKey, verb);
  if (m.error) {
    errors.push(`${filename} ${verb} ${pathKey}: ${m.error}`);
    continue;
  }
  row[col.stackql_resource_name] = m.resource;
  if (m.resource === 'skip_this_resource') {
    stats.skipped++;
    skipsByReason[m.skip] = (skipsByReason[m.skip] || 0) + 1;
    row[col.stackql_method_name] = '';
    row[col.stackql_verb] = '';
    row[col.stackql_object_key] = '';
    continue;
  }
  row[col.stackql_method_name] = m.method;
  row[col.stackql_verb] = m.sqlVerb;
  row[col.stackql_object_key] = m.objectKey;
  stats[m.sqlVerb]++;
}

// every spec operation must have a CSV row (else generate-provider misses it)
for (const key of ops.keys()) {
  if (!seenKeys.has(key)) errors.push(`in spec but not in CSV: ${key}`);
}

// ---------------------------------------------------------------------------
// Consistency checks
// ---------------------------------------------------------------------------

const methodSeen = new Map();
const sigSeen = new Map();
for (const row of rows.slice(1)) {
  const resource = row[col.stackql_resource_name];
  if (!resource || resource === 'skip_this_resource') continue;
  const service = row[col.filename].replace(/\.yaml$/, '');
  const methodKey = `${service}.${resource}.${row[col.stackql_method_name]}`;
  if (methodSeen.has(methodKey)) {
    errors.push(`duplicate method ${methodKey} (${methodSeen.get(methodKey)} and ${row[col.path]}:${row[col.verb]})`);
  }
  methodSeen.set(methodKey, `${row[col.path]}:${row[col.verb]}`);

  const sqlVerb = row[col.stackql_verb];
  if (sqlVerb === 'exec') continue;
  // signature = required inputs: path params plus required query params
  const entry = ops.get(`${row[col.filename]}::${row[col.path]}::${row[col.verb]}`);
  const requiredQuery = [...(entry?.pathItem?.parameters || []), ...(entry?.op.parameters || [])]
    .map((p) => entry.resolve(p))
    .filter((p) => p && p.in === 'query' && p.required)
    .map((p) => p.name);
  const sig = [...pathParams(row[col.path]), ...requiredQuery].sort().join(',');
  const sigKey = `${service}.${resource}.${sqlVerb}::${sig}`;
  if (sigSeen.has(sigKey)) {
    errors.push(`signature clash on ${service}.${resource} ${sqlVerb} [${sig}] (${sigSeen.get(sigKey)} and ${row[col.stackql_method_name]})`);
  }
  sigSeen.set(sigKey, row[col.stackql_method_name]);
}

if (errors.length > 0) {
  console.error(`FAILED with ${errors.length} error(s), nothing written:`);
  for (const e of errors) console.error(`  ${e}`);
  process.exit(1);
}

const outArgIdx = process.argv.indexOf('--out');
const outPath = outArgIdx !== -1 ? path.resolve(process.argv[outArgIdx + 1]) : csvPath;
const out = rows.map((r) => r.map(csvField).join(',')).join('\n') + '\n';
fs.writeFileSync(outPath, out);

// summary
const resourcesByService = new Map();
for (const row of rows.slice(1)) {
  const resource = row[col.stackql_resource_name];
  if (!resource || resource === 'skip_this_resource') continue;
  const service = row[col.filename].replace(/\.yaml$/, '');
  if (!resourcesByService.has(service)) resourcesByService.set(service, new Set());
  resourcesByService.get(service).add(resource);
}
console.log(`Mapped: select ${stats.select}, insert ${stats.insert}, update ${stats.update}, delete ${stats.delete}, exec ${stats.exec}; skipped ${stats.skipped} (${Object.entries(skipsByReason).map(([k, v]) => `${k}: ${v}`).join(', ')})`);
console.log('Resources per service:');
for (const [service, resources] of [...resourcesByService.entries()].sort()) {
  console.log(`  ${service}: ${[...resources].sort().join(', ')}`);
}

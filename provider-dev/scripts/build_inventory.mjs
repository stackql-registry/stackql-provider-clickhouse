#!/usr/bin/env node

// Builds the endpoint inventory (provider-dev/config/endpoint_inventory.csv)
// from the pinned ClickHouse Cloud spec: one row per operation with the
// response envelope check ($.result confirmed or the deviation named),
// request body presence and array-operation (add/remove) PATCH fields, the
// vendor's beta tier, pagination-style query parameters (recorded to confirm
// the no-pagination expectation, not to configure traversal), the proposed
// service (from the path rules in provider-dev/config/service_names.json),
// a draft resource and StackQL verb, and a skip reason where the operation
// is not mapped.
//
// The proposed resource/verb columns are groundwork drafts -
// map_operations.mjs produces the authoritative mapping. Fails without
// writing if any path lacks a service rule or an envelope cannot be
// classified.
//
// Usage: npm run build-inventory

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import pluralize from 'pluralize';
import {
  HTTP_VERBS, pathParams, makeResolver, makeServiceResolver,
  classifyEnvelope, classifyBeta, arrayPatchFields, paginationParams, skipReason,
  deriveResource, deriveVerb
} from './lib/spec_helpers.mjs';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
const specPath = path.join(repoRoot, 'provider-dev', 'downloaded', 'clickhouse-cloud-v1.json');
const outPath = path.join(repoRoot, 'provider-dev', 'config', 'endpoint_inventory.csv');

// Draft resource / verb proposals come from the shared derivation in
// lib/spec_helpers.mjs; map_operations.mjs produces the authoritative
// mapping (same derivation plus explicit override rules).
const proposeResource = (pathKey, verb, service) => deriveResource(pathKey, verb, service, pluralize);
const proposeVerb = (verb, pathKey) => deriveVerb(verb, pathKey);

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

const spec = JSON.parse(fs.readFileSync(specPath, 'utf8'));
const resolve = makeResolver(spec);
const resolveService = makeServiceResolver();

const rows = [];
const errors = [];
const stats = { byService: {}, byVerb: {}, byEnvelope: {}, byBeta: {}, byDisposition: {} };
const paginationFindings = [];
const envelopeDeviations = [];
const bump = (obj, key) => { obj[key] = (obj[key] || 0) + 1; };

for (const [pathKey, pathItem] of Object.entries(spec.paths || {})) {
  for (const verb of HTTP_VERBS) {
    const op = pathItem[verb];
    if (!op) continue;

    const service = resolveService(pathKey);
    if (!service) {
      errors.push(`no service rule matches ${verb.toUpperCase()} ${pathKey}`);
      continue;
    }
    const { envelope, key, mediaTypes } = classifyEnvelope(op, resolve);
    if (envelope === 'unexpected') {
      errors.push(`unclassifiable response envelope on ${verb.toUpperCase()} ${pathKey}`);
      continue;
    }
    const skip = skipReason(pathKey, op, resolve);
    const beta = classifyBeta(op);
    const arrayPatch = arrayPatchFields(op, resolve);
    const pageParams = paginationParams(op, pathItem, resolve);
    const hasBody = op.requestBody ? 'y' : 'n';

    if (pageParams.length > 0) {
      paginationFindings.push(`${verb.toUpperCase()} ${pathKey}: ${pageParams.join(', ')}`);
    }
    // $.result is the uniform envelope for mapped JSON reads and writes;
    // status-only DELETE bodies and reason-coded non-JSON skips are the only
    // tolerated exceptions
    if (!skip && envelope !== 'result-array' && envelope !== 'result-object'
        && !(envelope === 'status-only' && verb === 'delete')) {
      envelopeDeviations.push(`${verb.toUpperCase()} ${pathKey}: ${envelope} (${mediaTypes.join(', ')})`);
    }

    rows.push({
      method: verb,
      path: pathKey,
      operation_id: op.operationId,
      tag: (op.tags || []).join(';'),
      path_params: pathParams(pathKey).join(';'),
      has_request_body: hasBody,
      array_patch_fields: arrayPatch.join(';'),
      envelope,
      envelope_key: key,
      pagination_params: pageParams.join(';'),
      beta,
      proposed_service: service,
      proposed_resource: skip ? '' : proposeResource(pathKey, verb, service),
      proposed_verb: skip ? '' : proposeVerb(verb, pathKey),
      skip_reason: skip
    });

    bump(stats.byEnvelope, envelope);
    bump(stats.byBeta, beta || 'ga');
    bump(stats.byDisposition, skip ? `skipped: ${skip}` : 'mapped');
    if (!skip) {
      bump(stats.byService, service);
      bump(stats.byVerb, proposeVerb(verb, pathKey));
    }
  }
}

if (errors.length > 0) {
  console.error(`FAILED with ${errors.length} error(s), nothing written:`);
  for (const e of errors) console.error(`  ${e}`);
  process.exit(1);
}
if (envelopeDeviations.length > 0) {
  console.error(`FAILED: ${envelopeDeviations.length} mapped operation(s) deviate from the $.result envelope, nothing written:`);
  for (const e of envelopeDeviations) console.error(`  ${e}`);
  process.exit(1);
}

const columns = Object.keys(rows[0]);
const csvField = (v) => (/[",\n\r]/.test(v) ? `"${String(v).replace(/"/g, '""')}"` : String(v));
const csv = [columns.join(',')]
  .concat(rows.map((r) => columns.map((c) => csvField(r[c] ?? '')).join(',')))
  .join('\n') + '\n';
fs.writeFileSync(outPath, csv);

console.log(`Endpoint inventory written to ${outPath} (${rows.length} operations)\n`);
const printStats = (title, obj) => {
  console.log(title);
  for (const [k, v] of Object.entries(obj).sort((a, b) => b[1] - a[1])) console.log(`  ${String(v).padStart(4)}  ${k}`);
};
printStats('By disposition:', stats.byDisposition);
printStats('\nMapped operations by proposed service:', stats.byService);
printStats('\nMapped operations by proposed StackQL verb:', stats.byVerb);
printStats('\nBy envelope style:', stats.byEnvelope);
printStats('\nBy beta tier:', stats.byBeta);

console.log('\nPagination check (query parameters that look like paging):');
if (paginationFindings.length === 0) {
  console.log('  none - every list endpoint returns the complete collection');
} else {
  for (const f of paginationFindings) console.log(`  ${f}`);
}

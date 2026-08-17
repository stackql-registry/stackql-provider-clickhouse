#!/usr/bin/env node

// ClickHouse-specific spec adjustments applied to provider-dev/source before
// the generic provider-utils normalize pass. Deterministic and idempotent.
//
// 1. OpenAPI 3.1 type arrays -> a single 3.0-style type. The vendor spec is
//    3.1.2 and uses `type: [string, "null"]` (nullable scalars) and
//    `type: [string, integer]` (dual-typed ids) throughout. stackql's
//    OpenAPI loader (any-sdk on kin-openapi v0.88, `Type string`) cannot
//    unmarshal a type array, so each is lowered to its first non-null member
//    (string wins for mixed scalars); nullability is recorded as
//    `nullable: true`, which is inert but keeps the intent visible.
//
// 2. `openapi: 3.1.2` -> `3.1.1`. The vendor declares OpenAPI 3.1.2 (an
//    errata-only patch release); @apidevtools/swagger-parser v12, which the
//    docgen step dereferences with, accepts 3.1.0 / 3.1.1 but rejects
//    3.1.2 by string match. The document semantics are unchanged.
//
// Fails without writing on any unexpected shape (a type array with no
// usable member).
//
// Usage: node provider-dev/scripts/pre_normalize.mjs [--dry-run]

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import yaml from 'js-yaml';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
const sourceDir = path.join(repoRoot, 'provider-dev', 'source');
const dryRun = process.argv.includes('--dry-run');

const SCALAR_PREFERENCE = ['string', 'integer', 'number', 'boolean', 'object', 'array'];

function lowerTypeArrays(node, stats, errors, trail = '$') {
  if (Array.isArray(node)) {
    node.forEach((v, i) => lowerTypeArrays(v, stats, errors, `${trail}[${i}]`));
    return;
  }
  if (!node || typeof node !== 'object') return;
  if (Array.isArray(node.type)) {
    const members = node.type.filter((t) => t !== 'null');
    const pick = SCALAR_PREFERENCE.find((t) => members.includes(t));
    if (!pick) {
      errors.push(`${trail}: type array ${JSON.stringify(node.type)} has no usable member`);
    } else {
      const key = JSON.stringify(node.type);
      stats[key] = (stats[key] || 0) + 1;
      if (node.type.includes('null')) node.nullable = true;
      node.type = pick;
    }
  }
  for (const [k, v] of Object.entries(node)) lowerTypeArrays(v, stats, errors, `${trail}.${k}`);
}

const files = fs.readdirSync(sourceDir).filter((f) => f.endsWith('.yaml')).sort();
if (files.length === 0) {
  console.error(`Error: no service specs in ${sourceDir} - run npm run split first`);
  process.exit(1);
}

const pending = [];
const errors = [];
const totals = {};
for (const f of files) {
  const fp = path.join(sourceDir, f);
  const doc = yaml.load(fs.readFileSync(fp, 'utf8'));
  const stats = {};
  lowerTypeArrays(doc, stats, errors, f);
  if (doc.openapi === '3.1.2') { doc.openapi = '3.1.1'; totals['openapi 3.1.2 -> 3.1.1'] = (totals['openapi 3.1.2 -> 3.1.1'] || 0) + 1; }
  for (const [k, v] of Object.entries(stats)) totals[k] = (totals[k] || 0) + v;
  pending.push({ fp, doc, count: Object.values(stats).reduce((a, b) => a + b, 0) });
}
if (errors.length > 0) {
  console.error(`FAILED with ${errors.length} error(s), nothing written:`);
  for (const e of errors) console.error(`  ${e}`);
  process.exit(1);
}
if (!dryRun) {
  for (const { fp, doc } of pending) fs.writeFileSync(fp, yaml.dump(doc, { lineWidth: -1, noRefs: true }));
}
console.log(`pre_normalize: lowered ${Object.values(totals).reduce((a, b) => a + b, 0)} OpenAPI 3.1 type arrays across ${files.length} service specs${dryRun ? ' (dry run)' : ''}`);
for (const [k, v] of Object.entries(totals).sort()) console.log(`  ${k}: ${v}`);

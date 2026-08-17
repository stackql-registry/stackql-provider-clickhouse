#!/usr/bin/env node

// Post-generation fixes for things the generator cannot express. Idempotent;
// re-run after every generate. Validates and fails without writing.
//
// 1. Organization-root server override. Every service is generated on the
//    org-scoped server template (https://api.clickhouse.cloud/v1/
//    organizations/{organizationId}, organizationId via x-stackQL-envVar
//    CLICKHOUSE_ORG_ID). The organization list/get/update operations are the
//    exception: they address the API base directly, so the two root path
//    items in organizations.yaml get a path-level `servers` override back to
//    https://api.clickhouse.cloud. any-sdk resolves servers operation ->
//    path item -> document, so the override wins for these operations only.
//    It has to be applied here because the normalize step strips path-level
//    servers from provider-dev/source.
//
// 2. UDF cursor pagination. The udfs service lists (functions, versions,
//    attachments) page with `cursor` (query) / `$.result.pagination.nextCursor`
//    (body), the only paginated surface in the API. A document-level
//    x-stackQL-config pagination block on udfs.yaml lets stackql follow the
//    cursor; the non-list operations in the service ignore it.
//
// Usage: node provider-dev/scripts/post_process.mjs

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import yaml from 'js-yaml';
import { ORG_ROOT_PATHS, API_BASE_URL } from './lib/spec_helpers.mjs';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
const servicesDir = path.join(repoRoot, 'provider-dev', 'openapi', 'src', 'clickhouse', 'v00.00.00000', 'services');
const orgSpecPath = path.join(servicesDir, 'organizations.yaml');

if (!fs.existsSync(orgSpecPath)) {
  console.error(`Error: ${orgSpecPath} not found - run the generate step first`);
  process.exit(1);
}

const doc = yaml.load(fs.readFileSync(orgSpecPath, 'utf8'));
const errors = [];
let applied = 0;
for (const p of ORG_ROOT_PATHS) {
  const item = doc.paths?.[p];
  if (!item) { errors.push(`organizations.yaml: expected organization-root path ${p} is missing`); continue; }
  item.servers = [{ url: API_BASE_URL }];
  applied++;
}
// every other path in every service must be org-relative (no /v1/ prefix)
for (const f of fs.readdirSync(servicesDir).filter((x) => x.endsWith('.yaml'))) {
  const d = f === 'organizations.yaml' ? doc : yaml.load(fs.readFileSync(path.join(servicesDir, f), 'utf8'));
  for (const p of Object.keys(d.paths || {})) {
    if (ORG_ROOT_PATHS.includes(p)) continue;
    if (p.startsWith('/v1/')) errors.push(`${f}: path ${p} was not rebased onto the org-scoped server`);
  }
  const srv = d.servers?.[0];
  if (!srv?.variables?.organizationId?.['x-stackQL-envVar']) errors.push(`${f}: top-level server lacks the organizationId x-stackQL-envVar variable`);
}
// udfs: cursor pagination config
const udfsSpecPath = path.join(servicesDir, 'udfs.yaml');
let udfsDoc = null;
if (fs.existsSync(udfsSpecPath)) {
  udfsDoc = yaml.load(fs.readFileSync(udfsSpecPath, 'utf8'));
  const listOps = Object.entries(udfsDoc.paths || {}).filter(([, item]) => (item.get?.parameters || []).some((p) => p.name === 'cursor'));
  if (listOps.length === 0) errors.push('udfs.yaml: expected cursor-paginated list operations, found none');
  udfsDoc['x-stackQL-config'] = {
    ...(udfsDoc['x-stackQL-config'] || {}),
    pagination: {
      requestToken: { key: 'cursor', location: 'query' },
      responseToken: { key: '$.result.pagination.nextCursor', location: 'body' }
    }
  };
} else {
  errors.push('udfs.yaml not found - the udfs service is expected from the refreshed spec');
}
if (errors.length > 0) {
  console.error(`FAILED with ${errors.length} error(s), nothing written:`);
  for (const e of errors) console.error(`  ${e}`);
  process.exit(1);
}
fs.writeFileSync(orgSpecPath, yaml.dump(doc, { lineWidth: -1, noRefs: true }));
fs.writeFileSync(udfsSpecPath, yaml.dump(udfsDoc, { lineWidth: -1, noRefs: true }));
console.log(`post_process: pinned ${applied} organization-root path item(s) to ${API_BASE_URL} in organizations.yaml; cursor pagination config on udfs.yaml`);

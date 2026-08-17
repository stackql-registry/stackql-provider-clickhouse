// Shared helpers for the ClickHouse Cloud spec scripts (build_inventory.mjs,
// map_operations.mjs, bin/split.mjs): service resolution, response envelope
// classification, beta and array-patch detection, skip rules, and naming
// utilities. Single-sourced so the inventory and the authoritative mapping
// can never disagree on classification.

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

export const HTTP_VERBS = ['get', 'post', 'put', 'patch', 'delete'];

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..', '..');
const serviceNamesPath = path.join(repoRoot, 'provider-dev', 'config', 'service_names.json');

export function camelToSnake(s) {
  return String(s).replace(/([a-z0-9])([A-Z])/g, '$1_$2').replace(/[-. ]/g, '_').toLowerCase();
}

export function pathParams(pathKey) {
  return (pathKey.match(/\{[^}]+\}/g) || []).map((s) => s.slice(1, -1));
}

// Resolves local $refs against the containing spec document
export function makeResolver(spec) {
  return function resolve(schema, depth = 0) {
    if (!schema || depth > 10) return schema;
    if (schema.$ref) {
      const parts = schema.$ref.replace(/^#\//, '').split('/');
      let node = spec;
      for (const p of parts) node = node?.[p];
      return resolve(node, depth + 1);
    }
    return schema;
  };
}

// Service resolution from the ordered path rules in service_names.json.
// Every operation path must match a rule; a miss is an error the caller
// must surface (fail without writing).
export function makeServiceResolver() {
  const config = JSON.parse(fs.readFileSync(serviceNamesPath, 'utf8'));
  const rules = config.rules.map((r) => ({ re: new RegExp(r.pathRegex), service: r.service }));
  return function resolveService(pathKey) {
    for (const rule of rules) {
      if (rule.re.test(pathKey)) return rule.service;
    }
    return null;
  };
}

export function success2xx(op) {
  const codes = Object.keys(op.responses || {}).filter((c) => /^2/.test(c)).sort();
  for (const code of codes) {
    const content = op.responses[code].content || {};
    const jsonType = Object.keys(content).find((m) => m.includes('json'));
    if (jsonType && content[jsonType].schema) return { code, schema: content[jsonType].schema, mediaTypes: Object.keys(content) };
    if (Object.keys(content).length > 0) return { code, schema: null, mediaTypes: Object.keys(content) };
  }
  return { code: codes[0] || null, schema: null, mediaTypes: [] };
}

// Response envelope styles for the ClickHouse Cloud API:
//   result-array  - {status, requestId, result: [...]}  (collection reads)
//   result-object - {status, requestId, result: {...}}  (single reads, writes)
//   status-only   - {status, requestId}                  (DELETE responses)
//   non-json      - text/plain (prometheus) or application/x-pem-file
//   none          - no 2xx content
// The key doubles as stackql_object_key for result-* envelopes.
export function classifyEnvelope(op, resolve) {
  const { schema, mediaTypes } = success2xx(op);
  if (!schema) {
    if (mediaTypes.length > 0) return { envelope: 'non-json', key: '', mediaTypes };
    return { envelope: 'none', key: '', mediaTypes };
  }
  const s = resolve(schema);
  // bare JSON array - no envelope at all (see ENVELOPE_DEVIATIONS)
  if (s && s.type === 'array') return { envelope: 'bare-array', key: '', mediaTypes };
  const props = (s && s.properties) || {};
  if ('result' in props) {
    const r = resolve(props.result);
    const isArray = r && (r.type === 'array' || (r.items && !r.properties));
    return { envelope: isArray ? 'result-array' : 'result-object', key: '$.result', mediaTypes };
  }
  if ('status' in props && 'requestId' in props) return { envelope: 'status-only', key: '', mediaTypes };
  return { envelope: 'unexpected', key: '', mediaTypes };
}

// Known, reason-coded deviations from the uniform $.result envelope. Any
// mapped operation whose envelope is not result-array / result-object (or
// status-only on DELETE) must match one of these or the inventory fails.
//   prometheus/discovery - Prometheus HTTP service discovery (http_sd) format
//     is a bare JSON array of target groups by definition; the provider-utils
//     normalize pass wraps bare-array responses (x-stackql-bare-array-wrap)
//     and the generator emits the matching transform + objectKey, so the
//     mapping carries no object key of its own.
export const ENVELOPE_DEVIATIONS = [
  { re: /\/prometheus\/discovery$/, envelope: 'bare-array', reason: 'prometheus_http_sd_bare_array' }
];
export function knownEnvelopeDeviation(pathKey, envelope) {
  return ENVELOPE_DEVIATIONS.find((d) => d.re.test(pathKey) && d.envelope === envelope) || null;
}

// Beta tiers, mirroring the vendor's own labelling in operation descriptions:
//   beta-evolving - "This beta endpoint is evolving; the API contract may change"
//   beta-stable   - "This endpoint is in beta. API contract is stable"
export function classifyBeta(op) {
  const text = `${op.summary || ''} ${op.description || ''}`;
  if (/beta endpoint is evolving|contract may change/i.test(text)) return 'beta-evolving';
  if (/endpoint is in beta/i.test(text)) return 'beta-stable';
  return '';
}

// Request-body properties with operation-array (add/remove) PATCH semantics,
// e.g. ipAccessList, privateEndpointIds and tags on the service PATCH.
export function arrayPatchFields(op, resolve) {
  const schema = op.requestBody?.content?.['application/json']?.schema;
  if (!schema) return [];
  const s = resolve(schema);
  const fields = [];
  for (const [name, prop] of Object.entries(s?.properties || {})) {
    const r = resolve(prop);
    if (r?.properties && ('add' in r.properties || 'remove' in r.properties)) fields.push(name);
  }
  return fields;
}

// Pagination-style query parameters present on the operation. The ClickHouse
// Cloud API returns bounded, complete collections; anything reported here is
// an exception to record, not a traversal scheme to configure.
const PAGINATION_PARAM_NAMES = ['limit', 'offset', 'page', 'pageSize', 'page_size', 'cursor', 'nextPageToken', 'maxResults', 'startAt'];
export function paginationParams(op, pathItem, resolve) {
  const params = [...(pathItem?.parameters || []), ...(op.parameters || [])]
    .map((p) => resolve(p))
    .filter((p) => p && p.in === 'query')
    .map((p) => p.name);
  return params.filter((n) => PAGINATION_PARAM_NAMES.includes(n));
}

// ---------------------------------------------------------------------------
// Resource and verb derivation, shared by build_inventory.mjs (draft columns)
// and map_operations.mjs (authoritative mapping)
// ---------------------------------------------------------------------------

// PATCH/PUT on these trailing static segments is a state/credential command
// on the parent resource (EXEC), not an entity update
export const ACTION_SEGMENTS = new Set(['state', 'password']);
// POST on these trailing static segments is an action on the parent
// resource (EXEC), not a create
export const POST_EXEC_SEGMENTS = new Set(['restoredService', 'readReplica', 'schemaDiscovery', 'validate']);

// Strips /v1/, then iteratively strips scoping pairs (a static segment
// followed by a path parameter) while more segments follow: organizations/
// {organizationId}/services/{serviceId}/backups -> backups. The last
// stripped parent is kept so action segments can resolve to it.
export function scopedSegments(pathKey) {
  let segs = pathKey.replace(/^\/v1\//, '').split('/').filter(Boolean);
  let parent = null;
  while (segs.length > 2 && !segs[0].startsWith('{') && segs[1].startsWith('{')) {
    parent = segs[0];
    segs = segs.slice(2);
  }
  return { segs, parent };
}

export function deriveResource(pathKey, verb, service, pluralizeFn) {
  const { segs, parent } = scopedSegments(pathKey);
  let statics = segs.filter((s) => !s.startsWith('{'));
  const last = statics[statics.length - 1];
  // an action segment names a method on the scoping parent, not a resource
  if (verb !== 'get' && ACTION_SEGMENTS.has(last)) {
    statics = statics.slice(0, -1);
    if (statics.length === 0 && parent) statics = [parent];
  }
  if (verb === 'post' && POST_EXEC_SEGMENTS.has(last)) {
    statics = statics.slice(0, -1);
    if (statics.length === 0 && parent) statics = [parent];
  }
  if (statics.length === 0 && parent) statics = [parent];
  // drop a leading segment that just restates the service name
  if (statics.length > 1 && camelToSnake(statics[0]) === service) statics = statics.slice(1);
  const snake = statics.map(camelToSnake);
  const lastSnake = snake[snake.length - 1];
  return [...snake.slice(0, -1), pluralizeFn(lastSnake)].join('_');
}

export function deriveVerb(verb, pathKey) {
  const { segs } = scopedSegments(pathKey);
  const statics = segs.filter((s) => !s.startsWith('{'));
  const last = statics[statics.length - 1];
  if (verb === 'get') return 'select';
  if (verb === 'delete') return 'delete';
  if (verb === 'patch' || verb === 'put') return ACTION_SEGMENTS.has(last) ? 'exec' : 'update';
  // post
  if (POST_EXEC_SEGMENTS.has(last) || ACTION_SEGMENTS.has(last)) return 'exec';
  return 'insert';
}

// Skip rules for operations that stay visible in the CSV artifacts but are
// not mapped to StackQL methods.
//   prometheus_text_metrics - Prometheus scrape endpoints return text/plain,
//     not JSON (standing non-JSON exclusion)
//   non_json_response_pem - the Postgres CA certificate read returns
//     application/x-pem-file
//   deprecated_superseded - PATCH .../scaling is deprecated by the vendor;
//     PATCH .../replicaScaling is the mapped replacement
export function skipReason(pathKey, op, resolve) {
  if (/\/prometheus$/.test(pathKey)) return 'prometheus_text_metrics';
  const { schema, mediaTypes } = success2xx(op);
  if (!schema && mediaTypes.some((m) => m.includes('x-pem-file'))) return 'non_json_response_pem';
  if (op.deprecated && /\/scaling$/.test(pathKey)) return 'deprecated_superseded';
  return '';
}

// ---------------------------------------------------------------------------
// Organization-scoped server rebase (bin/split.mjs, post_process.mjs)
// ---------------------------------------------------------------------------

// Every operation except the two organization-root paths lives under this
// prefix. It becomes the server URL template, with {organizationId} resolved
// from CLICKHOUSE_ORG_ID via x-stackQL-envVar (stackql/stackql#707).
export const ORG_PREFIX = '/v1/organizations/{organizationId}';
// The organization list/get/update paths cannot live under the org-scoped
// server; they keep their full path and a path-level servers override back
// to the bare API base (injected after generation by post_process.mjs).
export const ORG_ROOT_PATHS = ['/v1/organizations', '/v1/organizations/{organizationId}'];
export const API_BASE_URL = 'https://api.clickhouse.cloud';

// Rewrites a split service document in place: sets the org-scoped servers,
// strips the org prefix from every non-root path and drops the organizationId
// path parameter from those operations. Returns counts for the split summary.
export function rebaseOrgScopedPaths(doc, servers) {
  const newPaths = {};
  let rebased = 0, kept = 0;
  for (const [pathKey, pathItem] of Object.entries(doc.paths || {})) {
    if (ORG_ROOT_PATHS.includes(pathKey)) {
      newPaths[pathKey] = pathItem;
      kept++;
      continue;
    }
    if (!pathKey.startsWith(ORG_PREFIX + '/')) {
      throw new Error(`path ${pathKey} is neither an organization-root path nor under ${ORG_PREFIX}`);
    }
    const shortPath = pathKey.slice(ORG_PREFIX.length);
    if (shortPath in newPaths) throw new Error(`rebase collision: ${pathKey} -> ${shortPath}`);
    const dropOrgParam = (params) => (params || []).filter((p) => !(p && p.in === 'path' && p.name === 'organizationId'));
    if (pathItem.parameters) pathItem.parameters = dropOrgParam(pathItem.parameters);
    for (const verb of HTTP_VERBS) {
      if (pathItem[verb] && pathItem[verb].parameters) pathItem[verb].parameters = dropOrgParam(pathItem[verb].parameters);
    }
    newPaths[shortPath] = pathItem;
    rebased++;
  }
  doc.paths = newPaths;
  doc.servers = JSON.parse(JSON.stringify(servers));
  return { rebased, kept };
}

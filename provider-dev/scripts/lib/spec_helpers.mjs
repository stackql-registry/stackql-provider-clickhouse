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
  const props = (s && s.properties) || {};
  if ('result' in props) {
    const r = resolve(props.result);
    const isArray = r && (r.type === 'array' || (r.items && !r.properties));
    return { envelope: isArray ? 'result-array' : 'result-object', key: '$.result', mediaTypes };
  }
  if ('status' in props && 'requestId' in props) return { envelope: 'status-only', key: '', mediaTypes };
  return { envelope: 'unexpected', key: '', mediaTypes };
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

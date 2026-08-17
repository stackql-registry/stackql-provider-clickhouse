#!/usr/bin/env node

// Mock ClickHouse Cloud API for integration-testing the generated clickhouse
// provider without an organization. Serves canned JSON in the exact wire
// shapes the real API produces (captured from a live organization and
// redacted): every success response is the {"result": ..., "requestId":
// ..., "status": 200} envelope, DELETE responses are status-only
// ({"status", "requestId"} - no result key), errors are {"requestId",
// "error", "status"}. Mutable in-memory stores make the API key, service
// and ClickStack dashboard lifecycles round-trip realistically.
//
// Every request must carry `Authorization: Basic base64(KEY_ID:KEY_SECRET)`
// matching EXPECTED_KEY_ID / EXPECTED_KEY_SECRET or it is rejected 401 with
// the real error envelope - this proves the provider's basic-auth wiring
// (CLICKHOUSE_CLOUD_API_KEY / CLICKHOUSE_CLOUD_API_SECRET).
//
// Two organizations are served: ORG_ID (the one CLICKHOUSE_ORG_ID resolves
// to in the tests) and OTHER_ORG_ID (used to prove a WHERE organizationId
// value beats the environment). Any other organization id is 404.
//
// The live API's rate-limit headers are echoed (X-RateLimit-Limit: 40,
// X-RateLimit-Policy: 40;w=10) so tests can see the contract shape.
//
// Exports startMockServer() for the test runner; also runnable standalone:
//   node tests/integration/mock_clickhouse_server.mjs [port]

import http from 'http';
import { URL } from 'url';

export const EXPECTED_KEY_ID = 'mock-key-id';
export const EXPECTED_KEY_SECRET = 'mock-key-secret';
export const ORG_ID = '11111111-1111-4111-8111-111111111111';
export const OTHER_ORG_ID = '22222222-2222-4222-8222-222222222222';
export const SERVICE_ID = 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa';
export const SERVICE_ID_2 = 'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb';
export const KEY_ID = 'cccccccc-cccc-4ccc-8ccc-cccccccccccc';
export const DASHBOARD_ID = '65f5e4a3b9e77c001a567890';

const REQUEST_ID = 'dddddddd-dddd-4ddd-8ddd-dddddddddddd';
const RATE_HEADERS = {
  'X-RateLimit-Limit': '40',
  'X-RateLimit-Remaining': '39',
  'X-RateLimit-Reset': '10',
  'X-RateLimit-Policy': '40;w=10;comment="fixed window"'
};

let idCounter = 0;
function newId(prefix) {
  idCounter++;
  return `${prefix}${String(idCounter).padStart(8, '0')}-0000-4000-8000-000000000000`.slice(0, 36);
}

// ---------------------------------------------------------------------------
// Fixtures (redacted captures from a live organization)
// ---------------------------------------------------------------------------

function orgObj(id, name) {
  return { id, name, createdAt: '2026-08-04T20:10:42Z', privateEndpoints: [], enableCoreDumps: true };
}

function serviceObj(id, name, state, extra = {}) {
  return {
    id, name, provider: 'aws', region: 'ap-southeast-2', state,
    endpoints: [
      { protocol: 'nativesecure', host: 'abc123.ap-southeast-2.aws.clickhouse.cloud', port: 9440 },
      { protocol: 'https', host: 'abc123.ap-southeast-2.aws.clickhouse.cloud', port: 8443 }
    ],
    tier: 'production',
    idleScaling: true, idleTimeoutMinutes: 15,
    minReplicaMemoryGb: 16, maxReplicaMemoryGb: 120, minTotalMemoryGb: 48, maxTotalMemoryGb: 360,
    numReplicas: 2, autoscalingMode: 'vertical',
    ipAccessList: [{ source: '0.0.0.0/0', description: 'Anywhere' }],
    createdAt: '2026-08-04T20:11:50Z', clickhouseVersion: '26.2',
    iamRole: 'arn:aws:iam::000000000000:role/CH-S3-mock-Role',
    privateEndpointIds: [], availablePrivateEndpointIds: [],
    dataWarehouseId: 'eeeeeeee-eeee-4eee-8eee-eeeeeeeeeeee', isPrimary: true, isReadonly: false,
    profile: 'v1-default', releaseChannel: 'default', hasTransparentDataEncryption: false,
    tags: [], enableCoreDumps: true,
    currentScaling: {
      effectiveAutoscalingMode: 'vertical', effectiveMinReplicaMemoryGb: 16, effectiveMaxReplicaMemoryGb: 120,
      effectiveMinReplicas: 2, effectiveMaxReplicas: 2, effectiveIdleScaling: true, effectiveIdleTimeoutMinutes: 15
    },
    mcpEnabled: false,
    ...extra
  };
}

function keyObj(id, name, extra = {}) {
  return {
    id, name, createdAt: '2026-08-17T04:12:34Z', keySuffix: 'vBoN', roles: [],
    assignedRoles: [{ roleId: 'ffffffff-ffff-4fff-8fff-ffffffffffff', roleName: 'Admin', roleType: 'system' }],
    state: 'enabled', usedAt: '2026-08-17T04:32:00Z',
    ipAccessList: [{ source: '0.0.0.0/0', description: 'Anywhere' }],
    ...extra
  };
}

function memberObj() {
  return {
    userId: 'Google_000000000000000000000', name: 'Mock Member', role: 'admin', email: 'user@example.com',
    joinedAt: '2026-08-04T20:10:42Z',
    assignedRoles: [{ roleId: 'ffffffff-ffff-4fff-8fff-ffffffffffff', roleName: 'Admin', roleType: 'system' }]
  };
}

function usageCostBody() {
  const dw = 'eeeeeeee-eeee-4eee-8eee-eeeeeeeeeeee';
  const line = (date, entityType, entityId, entityName, metrics, totalCHC) => ({
    date, dataWarehouseId: dw, serviceId: entityType === 'service' ? entityId : null,
    entityType, entityId, entityName, organizationTier: 'SCALE', locked: false, metrics, totalCHC, discount: 1
  });
  return {
    grandTotalCHC: 1.35,
    costs: [
      line('2026-08-04', 'datawarehouse', dw, 'clickhouse-service warehouse', { backupCHC: 0, storageCHC: 0 }, 0),
      line('2026-08-04', 'service', SERVICE_ID, 'clickhouse-service', { publicDataTransferCHC: 0, computeCHC: 0.675 }, 0.675),
      line('2026-08-05', 'service', SERVICE_ID, 'clickhouse-service', { publicDataTransferCHC: 0, computeCHC: 0.675 }, 0.675)
    ]
  };
}

function activityObj(id, type) {
  return {
    id, createdAt: '2026-08-04T20:10:42Z', actorType: 'user', actorId: 'Google_000000000000000000000',
    actorDetails: 'user@example.com', organizationId: ORG_ID, actorIpAddress: '203.0.113.10', type
  };
}

function backupObj(id, status) {
  return { id, status, serviceId: SERVICE_ID, startedAt: '2026-08-10T00:00:00Z', finishedAt: '2026-08-10T00:05:00Z', sizeInBytes: 1048576, durationInSeconds: 300, type: 'full' };
}

function dashboardObj(id, name, tiles = [], tags = []) {
  return { id, name, tiles, tags, filters: [], savedQuery: null, savedQueryLanguage: null, savedFilterValues: [], containers: [] };
}

function makeState() {
  return {
    orgs: new Map([[ORG_ID, orgObj(ORG_ID, 'Mock Org')], [OTHER_ORG_ID, orgObj(OTHER_ORG_ID, 'Other Org')]]),
    services: new Map([
      [SERVICE_ID, serviceObj(SERVICE_ID, 'clickhouse-service', 'idle')],
      [SERVICE_ID_2, serviceObj(SERVICE_ID_2, 'analytics-prod', 'running', { region: 'us-east-1', tier: 'production' })]
    ]),
    keys: new Map([[KEY_ID, keyObj(KEY_ID, 'stackql-demo')]]),
    dashboards: new Map([[DASHBOARD_ID, dashboardObj(DASHBOARD_ID, 'Service Overview', [], ['production'])]]),
    authFailures: 0
  };
}

// ---------------------------------------------------------------------------
// HTTP plumbing
// ---------------------------------------------------------------------------

function send(res, code, body) {
  res.writeHead(code, { 'Content-Type': 'application/json', ...RATE_HEADERS });
  res.end(JSON.stringify(body));
}
function ok(res, result) { send(res, 200, { result, requestId: REQUEST_ID, status: 200 }); }
function okStatusOnly(res) { send(res, 200, { requestId: REQUEST_ID, status: 200 }); }
function fail(res, code, message) { send(res, code, { requestId: REQUEST_ID, error: message, status: code }); }

function readBody(req) {
  return new Promise((resolve) => {
    let data = '';
    req.on('data', (c) => { data += c; });
    req.on('end', () => {
      if (!data) return resolve(null);
      try { resolve(JSON.parse(data)); } catch { resolve({ _raw: data }); }
    });
  });
}

export function startMockServer(port = 0) {
  const state = makeState();
  const log = [];
  // RFC 7235: the auth scheme token is case-insensitive. any-sdk sends the
  // scheme as `BASIC` (upper case) and the live API accepts it, so the mock
  // compares scheme case-insensitively and the credentials exactly.
  const expectedCreds = Buffer.from(`${EXPECTED_KEY_ID}:${EXPECTED_KEY_SECRET}`).toString('base64');
  const authOk = (h) => {
    const m = /^basic\s+(\S+)$/i.exec(h || '');
    return !!m && m[1] === expectedCreds;
  };

  const server = http.createServer(async (req, res) => {
    const url = new URL(req.url, `http://${req.headers.host}`);
    const body = await readBody(req);
    const entry = {
      method: req.method, path: url.pathname, query: Object.fromEntries(url.searchParams),
      authorization: req.headers['authorization'] || '', body
    };
    log.push(entry);

    if (!authOk(req.headers['authorization'])) {
      state.authFailures++;
      return fail(res, 401, req.headers['authorization'] ? 'UNAUTHORIZED: Invalid credentials.' : 'UNAUTHORIZED: No Authorization header provided.');
    }

    const p = url.pathname;
    const m = req.method;

    // --- organization root paths (bare API base)
    if (p === '/v1/organizations' && m === 'GET') return ok(res, [state.orgs.get(ORG_ID)]);
    const orgMatch = p.match(/^\/v1\/organizations\/([^/]+)(\/.*)?$/);
    if (!orgMatch) return fail(res, 404, 'NOT_FOUND: Unknown route');
    const orgId = orgMatch[1];
    const rest = orgMatch[2] || '';
    const org = state.orgs.get(orgId);
    if (!org) return fail(res, 404, `NOT_FOUND: Organization ${orgId} not found`);
    entry.orgId = orgId;

    if (rest === '') {
      if (m === 'GET') return ok(res, org);
      if (m === 'PATCH') { Object.assign(org, body || {}); return ok(res, org); }
    }

    // --- services
    if (rest === '/services') {
      if (m === 'GET') return ok(res, orgId === ORG_ID ? [...state.services.values()] : []);
      if (m === 'POST') {
        const id = newId('5e');
        const svc = serviceObj(id, body?.name || 'unnamed', 'provisioning', {
          provider: body?.provider, region: body?.region, tier: body?.tier || 'production',
          ipAccessList: body?.ipAccessList || []
        });
        state.services.set(id, svc);
        return ok(res, { service: svc, password: 'mock-generated-password' });
      }
    }
    let mm = rest.match(/^\/services\/([^/]+)$/);
    if (mm) {
      const svc = state.services.get(mm[1]);
      if (!svc) return fail(res, 404, `NOT_FOUND: Service ${mm[1]} not found`);
      if (m === 'GET') return ok(res, svc);
      if (m === 'PATCH') {
        // array-operation semantics: remove first, then add
        if (body?.ipAccessList) {
          const { add = [], remove = [] } = body.ipAccessList;
          svc.ipAccessList = svc.ipAccessList.filter((e) => !remove.some((r) => r.source === e.source));
          svc.ipAccessList.push(...add);
        }
        if (body?.name) svc.name = body.name;
        if (body?.releaseChannel) svc.releaseChannel = body.releaseChannel;
        return ok(res, svc);
      }
      if (m === 'DELETE') { state.services.delete(mm[1]); return okStatusOnly(res); }
    }
    mm = rest.match(/^\/services\/([^/]+)\/state$/);
    if (mm && m === 'PATCH') {
      const svc = state.services.get(mm[1]);
      if (!svc) return fail(res, 404, 'NOT_FOUND: Service not found');
      if (!body || !['start', 'stop', 'awake'].includes(body.command)) return fail(res, 400, 'BAD_REQUEST: Invalid command');
      svc.state = body.command === 'stop' ? 'stopping' : 'starting';
      return ok(res, svc);
    }
    mm = rest.match(/^\/services\/([^/]+)\/password$/);
    if (mm && m === 'PATCH') {
      if (!state.services.get(mm[1])) return fail(res, 404, 'NOT_FOUND: Service not found');
      return ok(res, { password: body?.newPasswordHash ? undefined : 'mock-generated-password' });
    }
    mm = rest.match(/^\/services\/([^/]+)\/backups$/);
    if (mm && m === 'GET') {
      if (!state.services.get(mm[1])) return fail(res, 404, 'NOT_FOUND: Service not found');
      return ok(res, [backupObj('bk-0001', 'done'), backupObj('bk-0002', 'done')]);
    }
    mm = rest.match(/^\/services\/([^/]+)\/backupConfiguration$/);
    if (mm && m === 'GET') return ok(res, { backupPeriodInHours: 24, backupRetentionPeriodInHours: 24, backupStartTime: null });

    // --- ClickStack dashboards
    mm = rest.match(/^\/services\/([^/]+)\/clickstack\/dashboards$/);
    if (mm) {
      if (!state.services.get(mm[1])) return fail(res, 404, 'NOT_FOUND: Service not found');
      if (m === 'GET') return ok(res, [...state.dashboards.values()]);
      if (m === 'POST') {
        const id = newId('65');
        const d = dashboardObj(id.replace(/-/g, '').slice(0, 24), body?.name || 'New Dashboard', body?.tiles || [], body?.tags || []);
        state.dashboards.set(d.id, d);
        return ok(res, d);
      }
    }
    mm = rest.match(/^\/services\/([^/]+)\/clickstack\/dashboards\/([^/]+)$/);
    if (mm) {
      const d = state.dashboards.get(mm[2]);
      if (!d) return fail(res, 404, 'NOT_FOUND: Dashboard not found');
      if (m === 'GET') return ok(res, d);
      if (m === 'PUT') { Object.assign(d, body || {}); return ok(res, d); }
      if (m === 'DELETE') { state.dashboards.delete(mm[2]); return okStatusOnly(res); }
    }

    // --- API keys
    if (rest === '/keys') {
      if (m === 'GET') return ok(res, [...state.keys.values()]);
      if (m === 'POST') {
        const id = newId('cc');
        const key = keyObj(id, body?.name || 'unnamed', {
          roles: body?.roles || [], state: body?.state || 'enabled', expireAt: body?.expireAt || null,
          ipAccessList: body?.ipAccessList || [{ source: '0.0.0.0/0', description: 'Anywhere' }], usedAt: undefined
        });
        state.keys.set(id, key);
        return ok(res, { key, keyId: `mock-${id.slice(0, 8)}`, keySecret: 'mock-secret-do-not-use' });
      }
    }
    mm = rest.match(/^\/keys\/([^/]+)$/);
    if (mm) {
      const key = state.keys.get(mm[1]);
      if (!key) return fail(res, 404, `NOT_FOUND: Key ${mm[1]} not found`);
      if (m === 'GET') return ok(res, key);
      if (m === 'PATCH') {
        for (const f of ['name', 'state', 'expireAt', 'roles']) if (body && f in body) key[f] = body[f];
        if (body?.ipAccessList) key.ipAccessList = body.ipAccessList; // plain replacement on keys
        return ok(res, key);
      }
      if (m === 'DELETE') { state.keys.delete(mm[1]); return okStatusOnly(res); }
    }

    // --- members, invitations, roles, activities, usage cost
    if (rest === '/members' && m === 'GET') return ok(res, [memberObj()]);
    if (rest === '/invitations' && m === 'GET') return ok(res, []);
    if (rest === '/roles' && m === 'GET') return ok(res, [{ id: 'ffffffff-ffff-4fff-8fff-ffffffffffff', tenantId: `organization/${orgId}`, ownerId: `organization/${orgId}`, name: 'Admin', actors: [`apiKey/${KEY_ID}`], policies: [] }]);
    if (rest === '/activities' && m === 'GET') return ok(res, [activityObj('6a7247421a1886ac652866b7', 'create_organization'), activityObj('6a7247866faa2fa54f734081', 'service_create')]);
    if (rest === '/usageCost' && m === 'GET') return ok(res, usageCostBody());
    if (rest === '/postgres' && m === 'GET') return ok(res, []);
    if (rest === '/prometheus' && m === 'GET') {
      res.writeHead(200, { 'Content-Type': 'text/plain', ...RATE_HEADERS });
      return res.end('# HELP ClickHouse_ServiceInfo Information about service\n');
    }

    return fail(res, 404, `NOT_FOUND: no route for ${m} ${p}`);
  });

  return new Promise((resolve) => {
    server.listen(port, '127.0.0.1', () => {
      resolve({ server, port: server.address().port, log, state });
    });
  });
}

if (import.meta.url === `file://${process.argv[1]}` || process.argv[1]?.endsWith('mock_clickhouse_server.mjs')) {
  const p = Number(process.argv[2] || 0);
  const { port } = await startMockServer(p);
  console.log(`mock ClickHouse Cloud API listening on http://127.0.0.1:${port}`);
  console.log(`expects: Authorization: Basic base64(${EXPECTED_KEY_ID}:${EXPECTED_KEY_SECRET}); organization ${ORG_ID}`);
}

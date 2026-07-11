# Engineering Notes

Open questions from the phase 1 kickoff, answered with evidence where possible. Sources: the pinned spec snapshot (`provider-dev/downloaded/clickhouse-cloud-v1.json`, sha256 48d0fbbbb8be..., fetched 2026-07-12), live unauthenticated probes against `https://api.clickhouse.cloud`, the jira build's NOTES.md (any-sdk findings reused, not re-derived), and the k8s reference repo.

## 1. Basic auth construct and the credential env var convention

**Answered by the jira finding** (evidence: `any-sdk/pkg/dto/auth_ctx.go`, per the jira NOTES.md). The `basic` auth type resolves credentials in this order:

1. `username_var` + `password_var` - env vars holding the plaintext pair, base64-encoded at request time
2. inline `username` + `password` (or `api_key` / `api_secret`)
3. `credentialsenvvar` - a single env var holding the already base64-encoded `id:secret` string

Convention adopted: the **plaintext pair**, baked into the provider config at generate time:

```json
{"auth": {"type": "basic", "username_var": "CLICKHOUSE_CLOUD_KEY_ID", "password_var": "CLICKHOUSE_CLOUD_KEY_SECRET"}}
```

Rationale: the ClickHouse Cloud console issues the key as a separate Key ID and Key Secret (unlike Jira's single `email:token` string), so the pair matches what users copy out of the console, and rotation replaces one env var without re-encoding. The docs will also show the combined alternative for parity with the jira convention:

```bash
export CLICKHOUSE_CLOUD_CREDS=$(echo -n "${KEY_ID}:${KEY_SECRET}" | base64)
# runtime auth override: {"clickhouse": {"type": "basic", "credentialsenvvar": "CLICKHOUSE_CLOUD_CREDS"}}
```

**Live verification status: partially verified; authenticated call pending credentials.** No dev-organization key pair is available in this environment. The unauthenticated probe confirms the API expects an `Authorization` header and returns the JSON error envelope (`GET /v1/organizations` -> `401 {"requestId": "...", "error": "UNAUTHORIZED: No Authorization header provided.", "status": 401}`). The pending one-liner once the dev org key exists:

```bash
curl -s -u "${CLICKHOUSE_CLOUD_KEY_ID}:${CLICKHOUSE_CLOUD_KEY_SECRET}" https://api.clickhouse.cloud/v1/organizations
```

followed by the same read through `stackql exec "SELECT id, name FROM clickhouse.organizations.organizations"` against the local registry.

## 2. Pagination

**Confirmed: none.** Evidence from the inventory pass over all 110 operations (`npm run build-inventory`):

- No list endpoint carries paging query parameters (`limit`, `offset`, `page`, `cursor`, `nextPageToken`, `maxResults`, `startAt`) except the one recorded below.
- No `result-array` response schema carries cursor or page-marker companions - the top-level keys are uniformly `status`, `requestId`, `result`.

Exception list (one entry): `GET .../postgres/{postgresId}/slowQueryPatterns` takes optional `limit`/`offset` query parameters. This is parameter-driven windowing (usable in the `WHERE` clause), not a traversal scheme; there is no cursor or total in the response to configure against. No pagination config is passed to `generate-provider`.

## 3. The `EXEC` state mapping (`@command` body binding)

**Design confirmed; wire proof deferred to integration tests.** `PATCH .../state` takes body `{"command": "start" | "stop" | "awake"}` (schema `ServiceStatePatchRequest`, a single enum string property). Mapped as `services.update_state` with SQL verb `exec`. The generate step runs with `--naive-req-body-translate`, which exposes top-level request body properties as exec parameters - the k8s build's exec methods bind body attributes this way, so `EXEC clickhouse.services.services.update_state @command='stop'` is expected to render `{"command": "stop"}`. The integration mock server asserts the exact wire body (phase 5 test archetype); promote this note to "verified" then. Same construct covers `postgres.services.update_state` later.

## 4. Array-operation PATCH semantics

**Wire shapes confirmed from the spec; round-trip proof deferred to integration tests.** Four named patch schemas carry `add`/`remove` array semantics (remove is processed before add, per the schema descriptions):

| Schema | Used by | Element type |
|---|---|---|
| `IpAccessListPatch` | service `PATCH` `ipAccessList` | `{source, description}` |
| `InstancePrivateEndpointsPatch` | service `PATCH` `privateEndpointIds` | string |
| `InstanceTagsPatch` | service `PATCH` `tags` | `ResourceTagsV1`, max 50 per side |
| `OrganizationPrivateEndpointsPatch` | organization `PATCH` `privateEndpoints` | vendor-deprecated: use the service-level `privateEndpointIds` instead |

Nuance: the API key `PATCH` also has an `ipAccessList` field, but it is a **plain replacement array** of `{source, description}` - not add/remove. The `UPDATE` methods pass these bodies through unmodified (`--naive-req-body-translate`), so the wire shape is exactly what the user writes; the method docs state the add/remove semantics plainly. The integration suite round-trips a service `ipAccessList` `UPDATE` with an `add`/`remove` body (phase 5 archetype).

## 5. Rate limit behaviour and harness pacing

**Documented limit adopted for pacing; live headers observed.** Vendor docs state 10 requests per 10-second window per API key. The live API (unauthenticated 401 path) advertises `X-RateLimit-Limit: 40`, `X-RateLimit-Policy: 40;w=10;comment="fixed window"`, plus `X-RateLimit-Remaining` and `X-RateLimit-Reset` - a more generous window than documented, but the authenticated per-key policy may differ and the documented number is the contract. Harness decision:

- Serial execution everywhere; **`INTER_REQUEST_DELAY_MS = 1200`** (under 10 requests per 10s with margin) as the shared constant in the integration runner and smoke suite.
- A 429 in CI is a harness bug, not a retry case: the suites fail on 429 (per the repo non-negotiables). The response headers (`X-RateLimit-Reset`, fixed window) are recorded here for any future backoff need.
- Confirm the authenticated per-key headers and the 429 body shape during the first live smoke run and update this note.

## 6. Beta endpoints

**Confirmed: they map cleanly.** 43 of 110 operations carry the vendor's beta labelling, in two distinct tiers now recorded per-operation in the inventory:

- `beta-stable` (33 ops): "This endpoint is in beta. API contract is stable" - ClickStack, Postgres, backup bucket, ClickPipes schema discovery
- `beta-evolving` (10 ops): "This beta endpoint is evolving; the API contract may change" - `clickhouseSettings`, `scalingSchedule`, the Postgres prometheus skips

The `services` pilot mapped its beta surfaces (`clickhouseSettings`, `scalingSchedule`) with no special handling. Docs labelling mechanism: the vendor's disclaimer is the first line of each operation description and flows into the generated method docs verbatim, so per-method labelling is automatic; the provider landing page (`headerContent`) will additionally summarize the beta surfaces by tier. Confirm rendering in phase 7.

## 7. Findings not in the kickoff list

- **The spec is larger than the phase-0 scope list.** Surfaces not in the CLAUDE.md candidate split: organization RBAC roles (5 ops), the whole ClickPipes surface (17 ops - pipes, settings, per-pipe scaling and state, CDC scaling, schema discovery, reverse private endpoints), service `scalingSchedule` and `upgradeWindow`, `backupBucket`, and Postgres depth (config, time-series metrics, slow query patterns, read replica, restore). The service split was updated accordingly (`roles` and `clickpipes` added; `network` dropped; `byoc` folded into `organizations`).
- **DELETE responses are status-only.** All 16 `DELETE` operations return `{status, requestId}` with no `result` key - expected, and no object key is needed on delete methods.
- **`GET /organizations/{id}/privateEndpointConfig` is vendor-deprecated** (docs point to the service-level read) but kept mapped: it is the only org-level private endpoint read and contends with nothing. `PATCH .../scaling` is the one deprecated operation skipped (`deprecated_superseded`), since `replicaScaling` is its direct replacement on the same entity.
- **`serviceQueryEndpoint` POST is an upsert** (`instanceQueryEndpointUpsert`, "Upsert the service query endpoint"), mapped as `INSERT service_query_endpoints.create`; the upsert semantics stay visible in the method description.
- **`clickhouseSettings` PATCH takes a stringified JSON map**: the required `settings` property is `type: string` holding a JSON object (example `{"compatibility": "24.8"}`). Vendor-intended, and it lands naturally as a JSON-blob string column; no pre_normalize work expected, verify in the phase 3/4 round trip.
- **Error envelope**: errors are JSON `{requestId, error, status}` (observed live on the 401 path) - the mock server should mirror this shape for negative-path tests.
- **`usage_costs` object key**: `$.result` on the usage cost read is a wrapper (`grandTotalCHC` + `costs[]`); the mapping projects `$.result.costs` so the FinOps queries are row-per-cost-line. The one deliberate refinement over the uniform `$.result`.

## Test plan requirements (carried from CLAUDE.md)

Four layers, mirroring the k8s repo: offline validation (`SHOW`/`DESCRIBE` against the local file registry), meta-route tests, integration tests against a mock ClickHouse Cloud server (real wire shapes: `$.result` unwrapping both list and single, basic-auth header presence, key INSERT/UPDATE/DELETE lifecycle, the `EXEC` state command body, an `ipAccessList` add/remove `UPDATE`, a ClickStack dashboard round trip), and `tests/smoke_test.py` (pystackql) against a dedicated dev organization - serial pacing per note 5, `stackql-smoke-<stamp>` naming, sweep-then-create, and full cleanup of anything billable within the run.

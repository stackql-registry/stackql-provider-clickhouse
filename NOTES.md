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

## Phase 2 findings (full build, tests, docs - 2026-08-17)

### 8. Organization scope via `x-stackQL-envVar` (stackql/stackql#707)

any-sdk v0.5.4-alpha01 (consumed by stackql v0.10.601, released 2026-08-15) resolves OpenAPI **server variables** from the environment when the variable carries `x-stackQL-envVar: <NAME>` (`internal/anysdk/server.go`: `resolveServerVariableFromEnv`; requiredness is `!isEnvResolved`, so `SHOW METHODS` lists the variable only when the env var is unset; an explicit input value always wins). Adopted for the organization ID: every service is generated on `https://api.clickhouse.cloud/v1/organizations/{organizationId}` with `organizationId` -> `CLICKHOUSE_ORG_ID`, and paths are rebased to be org-relative in `bin/split.mjs` (rule in `lib/spec_helpers.mjs: rebaseOrgScopedPaths`). Consequences verified live and in the integration suite:

- `SELECT ... FROM clickhouse.services.services` with no `WHERE` works with the env var set; `WHERE organizationId = '<other>'` overrides it; unset + no `WHERE` fails with `cannot find any viable servers` (any-sdk swallows the per-variable error inside server selection - the message named in the PR as a candidate follow-up).
- The two organization-root operations cannot live under the org-scoped template. any-sdk resolves servers operation -> path item -> document (`getServersFromHeirarchy`), so `post_process.mjs` sets a path-level `servers: [{url: https://api.clickhouse.cloud}]` on `/v1/organizations` and `/v1/organizations/{organizationId}` in the generated `organizations.yaml`. It has to be post-generation: provider-utils normalize pass 1e strips path-level servers from the source specs. Verified: `organizations.list` needs no params, `get`/`update` take `organizationId` as a plain path parameter.
- docgen (provider-utils 0.7.7) already annotates the parameter description with `(x-stackQL-envVar: CLICKHOUSE_ORG_ID)` but merges the server variable into every method's required params and example `WHERE`; `website/scripts/sanitize-docs.mjs` rewrites those to "required unless CLICKHOUSE_ORG_ID is set" and drops it from `organizations.list`.
- pystackql manages its own stackql binary (`~/.local/stackql`, v0.10.542 on this machine) which predates the feature; the smoke harness enforces `MIN_STACKQL_VERSION = 0.10.601` and calls `StackQL.upgrade()`.

### 9. Credential env var names (supersedes the convention in note 1)

Adopted `CLICKHOUSE_CLOUD_API_KEY` (Key ID) / `CLICKHOUSE_CLOUD_API_SECRET` (Key Secret), plus `CLICKHOUSE_ORG_ID` for the server variable - the names in use in the dev environment, and `CLICKHOUSE_ORG_ID` matches the vendor's Terraform provider variable. The mechanism is unchanged: `{"auth": {"type": "basic", "username_var": ..., "password_var": ...}}`, plaintext pair base64-encoded at request time; the combined `credentialsenvvar` form documented as the runtime alternative. Live-verified (note 1's pending one-liner): `SELECT id, name FROM clickhouse.organizations.organizations` returns the org.

any-sdk emits the auth scheme token in upper case (`Authorization: BASIC <b64>`); RFC 7235 makes the token case-insensitive and the live API accepts it. The mock server compares the scheme case-insensitively - a mock that string-compares `Basic ` will reject every request.

### 10. OpenAPI 3.1 in the vendor spec vs the toolchain

- The spec is `openapi: 3.1.2` and uses type arrays: 258 in the raw spec, 267 after the split duplicates shared schemas (`[string, null]` 163, `[integer, null]` 40, `[boolean, null]` 23, `[string, integer]` 24, `[string, number]` 4, `[number, null]` 4). any-sdk's kin-openapi is v0.88.0 (`Schema.Type string`), so a type array fails to unmarshal and the whole service document is unloadable. `pre_normalize.mjs` lowers each to its first non-null member (string preferred for mixed scalars) and records `nullable: true`. This is the one ClickHouse-specific pre-normalize rule; the "expected minimal" call in CLAUDE.md held.
- `@apidevtools/swagger-parser` v12 (docgen's dereferencer) accepts `3.1.0`/`3.1.1` and rejects `3.1.2` by string match; `pre_normalize.mjs` sets `3.1.1` (errata-only difference). stackql itself does not check the version string (openai_admin ships 3.1.0 docs).

### 11. Live behaviours recorded from the first authenticated runs

- **Rate limit (note 5 update)**: the authenticated per-key policy headers are `X-RateLimit-Limit: 40`, `X-RateLimit-Policy: 40;w=10;comment="fixed window"`, `X-RateLimit-Remaining`, `X-RateLimit-Reset` (seconds, fractional) - the same 40/10s window as the unauthenticated path, four times the documented 10/10s. Harness pacing stays at 1.2 s (the documented number is the contract); no 429 observed across all runs.
- **Custom Roles**: the dev organization has migrated to Custom Roles; `POST /keys` with the legacy `roles` field returns `400 BAD_REQUEST: Organization has migrated to Custom Roles. Use 'assignedRoleIds' instead of 'roles'.` The smoke harness selects the least-privileged system role from `clickhouse.roles.roles` (`Organization API Reader`, then `Service API Reader`, then `Basic Service API Reader`) and passes `assignedRoleIds`; it falls back to `roles` only when the organization exposes no roles. Read responses still carry `roles: []` alongside `assignedRoles[]`.
- **Services list is eventually consistent after a create**: a `SELECT` issued ~1 s after `INSERT INTO clickhouse.services.services` did not include the new service (it appeared ~2 s later). The harness polls the list for up to 120 s after the create instead of reading once - a single miss would strand a billable service until the next sweep.
- **Service lifecycle**: `POST /services` with `numReplicas: 1, minReplicaMemoryGb: 8, maxReplicaMemoryGb: 8, idleScaling: true, idleTimeoutMinutes: 5` is accepted on a SCALE-tier organization (state `provisioning`, ~2.5 min to reach a stoppable state); `EXEC services.update_state @command = 'stop'` on a provisioning service is accepted; `DELETE` requires `stopped` (per the spec description) and is asynchronous. `awake` is the third command.
- **`EXEC` state binding (note 3 - now verified)**: with `--naive-req-body-translate`, `EXEC clickhouse.services.services.update_state @serviceId = '...', @command = 'stop'` renders exactly `{"command": "stop"}` on the wire (integration suite asserts the body; the sweep uses it live). No `@@json` needed.
- **Array-patch `UPDATE` (note 4 - now verified)**: `UPDATE clickhouse.services.services SET ipAccessList = '{"add": [...], "remove": [...]}'` passes the object through verbatim as `{"ipAccessList": {"add": [...], "remove": [...]}}`; the API key `ipAccessList` `UPDATE` is a plain replacement array (verified live: the key reflects the new list).
- **ClickStack dashboard `PUT`** requires `name` and `tiles` (full replacement) - `SHOW METHODS` lists both as required on `update`; a partial `UPDATE` fails route resolution with `cannot find matching operation`.
- **ClickStack on a service without ClickStack**: `403 {"error": "FORBIDDEN: ClickStack has not been setup for this service"}` - the error envelope shape recorded in note 7, surfaced by stackql as `http response status code: 403`.
- **`organizations.privateEndpointConfig`** (the vendor-deprecated org-level read) rejects `?region=` with `400 BAD_REQUEST: Unknown parameter: region`; the service-level read is the supported path.

### 12. Toolchain notes

- provider-utils 0.7.7 (latest at build time). `generate` copies the `--servers` JSON verbatim onto every service doc, extension keys included; the same JSON lives in `provider-dev/config/servers.json` and is passed single-quoted on the command line, so it must not contain single quotes.
- Line endings: the shell and node scripts run under WSL/Linux CI; edits made on Windows produced CRLF and broke `bash bin/start-server.sh` (`$'\r': command not found`). `.gitattributes` now normalises everything to LF.
- `bin/start-server.sh` resolves `$STACKQL`, then `./stackql`, then `stackql` on PATH before downloading; the local registry root is `provider-dev/openapi` (the k8s script's `/src` suffix is wrong for `SHOW PROVIDERS`).
- The smoke venv on `/mnt/c` under WSL is slow to create (minutes) - a one-time cost; `make venv` is a prerequisite of the smoke targets.

### 13. Spec refresh 2026-08-17 (pin 48d0fbbb... -> 1dce7e51...)

The first `make build` after the phase 1 pin failed the pin check as designed: upstream had grown from 64 paths / 110 operations to 83 / 145 in five weeks (the vendor's evolution caveat is real). Accepted with `make refresh-spec`; the operation diff was reviewed and the pipeline extended by rules only:

- **New surfaces**: ClickStack roles, saved searches, source and webhook CRUD, dashboard validation (`POST .../dashboards/validate` -> `EXEC dashboards.validate`, `validate` added to `POST_EXEC_SEGMENTS`); a UDF surface (`/udfs`, versions, service attachments, `/udfUploads/url`) -> new dedicated `udfs` service (`functions`, `versions`, `attachments`, `upload_urls`); organization `quotas`, `activeBalances`, `prometheus/discovery`; Postgres `logs`. Ten services, 44 resources, 139 methods (60 selectable).
- **First envelope deviation**: `GET .../prometheus/discovery` returns a bare JSON array (Prometheus http_sd target groups). Recorded as a reason-coded entry in `ENVELOPE_DEVIATIONS` (`spec_helpers.mjs`); the inventory still fails on any unlisted deviation. The provider-utils normalize pass wraps the response (`x-stackql-bare-array-wrap`) and the generator emits the transform + objectKey; mapped as `organizations.prometheus_scrape_targets`. Live: `403 FORBIDDEN: early access API endpoint` on the dev org (beta-evolving) - the mapping is right, the entitlement is not there yet.
- **First pagination**: the UDF lists are cursor-paginated (`cursor` query, `$.result.pagination.nextCursor`, `limit` <= 100). Configured as a document-level `x-stackQL-config: pagination` on `udfs.yaml` in `post_process.mjs` (the k8s precedent) - the whole service shares the scheme and non-list operations ignore it. `activeBalances`, the ClickStack alert/webhook/saved-search lists and Postgres `logs`/`slowQueryPatterns` take `limit`/`offset` windows but return no cursor; left as plain query parameters. Wrapper projections added: `active_balances` -> `$.result.prepaidBalances`, UDF lists -> `$.result.items`.
- **New 3.1 construct**: numeric `exclusiveMinimum` (25, all in the UDF and quota schemas) - kin-openapi v0.88 declares `ExclusiveMin bool`, so the whole `udfs.yaml` failed to load until `pre_normalize.mjs` lowered it to `minimum` + `true`. Type arrays now 270 across the split specs.
- Live probes on the dev org: `quotas` returns the four organization quotas with usage (a good estate-inventory table); `active_balances` and `udfs.functions` return empty sets; the full gated service lifecycle (`make smoke-service`) passed 28/28 in ~4 minutes and left the organization clean.

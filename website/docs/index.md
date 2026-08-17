---
title: clickhouse
hide_title: false
hide_table_of_contents: false
keywords:
  - clickhouse
  - clickhouse cloud
  - clickstack
  - clickpipes
  - stackql
  - infrastructure-as-code
  - configuration-as-data
  - cloud inventory
  - finops
description: Query, provision and manage ClickHouse Cloud organizations, services, keys, members, backups, ClickPipes, ClickStack and Managed Postgres using SQL
custom_edit_url: null
image: /img/stackql-clickhouse-provider-featured-image.png
id: 'provider-intro'
---

import CopyableCode from '@site/src/components/CopyableCode/CopyableCode';

Query, provision and operate the ClickHouse Cloud control plane using SQL - organizations, services (lifecycle, scaling, settings, passwords), API keys, members and invitations, organization roles, backups and backup configuration, private endpoints, BYOC infrastructure, usage cost, activities, ClickPipes, the ClickStack surface (dashboards, alerts, sources, webhooks) and Managed Postgres services. Usage cost by day and entity, and the service estate inventory across organizations, are the queries this provider exists for.


:::info[Provider Summary] 

total services: __10__  
total resources: __54__  

:::

See also:
[[` SHOW `]](https://stackql.io/docs/language-spec/show) [[` DESCRIBE `]](https://stackql.io/docs/language-spec/describe)  [[` REGISTRY `]](https://stackql.io/docs/language-spec/registry)
* * *

## Installation

To pull the latest version of the `clickhouse` provider, run the following command:

```bash
REGISTRY PULL clickhouse;
```
> To view previous provider versions or to pull a specific provider version, see [here](https://stackql.io/docs/language-spec/registry).

## Scope

This provider covers the ClickHouse Cloud management API at `https://api.clickhouse.cloud` (the control plane). The ClickHouse server HTTP interface - SQL-over-HTTP against a self-managed or Cloud service endpoint, and typed resources introspected from the `system.*` tables - is a distinct surface with separate authentication and is reserved as the future sibling provider `clickhouse_server`. What requires two Terraform providers today (the Cloud infrastructure provider and the DBops provider for database-level objects) will be two SQL namespaces in one StackQL session.

## Authentication

The provider authenticates with an API key pair using HTTP Basic auth: the Key ID is the username and the Key Secret is the password. Create a key in the ClickHouse Cloud console under Settings -> API Keys, choosing the role the queries need: `Organization API Reader` / `Service API Reader` for read-only inventory and FinOps queries, `Service API Admin` for service and ClickStack provisioning, `Admin` for key, member and role management. Export the pair as environment variables and StackQL picks them up with no further configuration:

```bash
export CLICKHOUSE_CLOUD_API_KEY='...'      # Key ID
export CLICKHOUSE_CLOUD_API_SECRET='...'   # Key Secret
export CLICKHOUSE_ORG_ID='...'             # Organization ID (see below)
```

or using PowerShell:

```powershell
$env:CLICKHOUSE_CLOUD_API_KEY = '...'
$env:CLICKHOUSE_CLOUD_API_SECRET = '...'
$env:CLICKHOUSE_ORG_ID = '...'
```

The provider config in the registry document is:

```json
{"auth": {"type": "basic", "username_var": "CLICKHOUSE_CLOUD_API_KEY", "password_var": "CLICKHOUSE_CLOUD_API_SECRET"}}
```

<details>

<summary>Overriding the credential env vars at runtime</summary>

The env var names above are provider defaults; any of the `basic` auth forms can be supplied on the command line to use different names or a single pre-encoded credential:

```bash
# a different variable pair
AUTH='{"clickhouse": {"type": "basic", "username_var": "CH_KEY_ID", "password_var": "CH_KEY_SECRET"}}'
stackql shell --auth="${AUTH}"

# a single base64(keyId:keySecret) string
export CLICKHOUSE_CLOUD_CREDS=$(echo -n "${KEY_ID}:${KEY_SECRET}" | base64)
AUTH='{"clickhouse": {"type": "basic", "credentialsenvvar": "CLICKHOUSE_CLOUD_CREDS"}}'
stackql shell --auth="${AUTH}"
```

</details>

## Organization scope

Every resource except `organizations` is scoped to an organization. The organization ID is a server variable resolved from the <CopyableCode code="CLICKHOUSE_ORG_ID" /> environment variable when it is set, so queries need no `WHERE organizationId` clause:

```sql
SELECT name, state, provider, region
FROM clickhouse.services.services;
```

A `WHERE organizationId = '...'` value always takes precedence over the environment, which is how a single session queries several organizations. With the variable unset, `organizationId` becomes a required parameter on every method (visible in `SHOW METHODS`) and must be supplied per query. To discover the ID:

```sql
SELECT id, name FROM clickhouse.organizations.organizations;
```

## Rate limit

The API allows a fixed window of requests per API key (documented as 10 per 10 seconds; the authenticated policy header currently reports `40;w=10`). A `429` response is the signal. Wide queries that fan out across many services (backups or settings for every service, for example) are paced by StackQL's request loop, but long-running scans should be sequenced rather than issued in parallel across API keys.

## Beta endpoints

The vendor labels part of the surface as beta and this provider mirrors the labelling in each method description: ClickStack, Managed Postgres, backup buckets and ClickPipes schema discovery are beta with a stable contract; `clickhouseSettings`, `scalingSchedule` and the Postgres metrics reads are beta and evolving (the contract may change). Refreshes of the provider are reviewed spec diffs against a content-hash pin.

## Example queries

Service estate inventory - state, footprint and scaling configuration for every service:

```sql
SELECT name, state, provider, region,
       numReplicas,
       minReplicaMemoryGb, maxReplicaMemoryGb,
       json_extract(currentScaling, '$.effectiveAutoscalingMode') AS scaling_mode,
       idleScaling, idleTimeoutMinutes, clickhouseVersion
FROM clickhouse.services.services
ORDER BY provider, region, name;
```

Daily usage cost by entity (ClickHouse Credits) - the FinOps view:

```sql
SELECT date, entityType, entityName, totalCHC,
       json_extract(metrics, '$.computeCHC') AS computeCHC,
       json_extract(metrics, '$.storageCHC') AS storageCHC,
       json_extract(metrics, '$.backupCHC') AS backupCHC
FROM clickhouse.organizations.usage_costs
WHERE from_date = '2026-08-01' AND to_date = '2026-08-31'
ORDER BY date, entityName;
```

Idle-service detection - stopped or idle services that still carried cost in the window:

```sql
SELECT s.name, s.state, SUM(c.totalCHC) AS chc_in_window
FROM clickhouse.services.services s
JOIN clickhouse.organizations.usage_costs c
  ON c.serviceId = s.id
WHERE c.from_date = '2026-08-01' AND c.to_date = '2026-08-31'
  AND s.state IN ('stopped', 'idle')
GROUP BY s.name, s.state
ORDER BY chc_in_window DESC;
```

API keys by age, state and assigned roles:

```sql
SELECT name, state, createdAt, expireAt, usedAt,
       json_extract(assignedRoles, '$[0].roleName') AS first_role,
       json_array_length(assignedRoles) AS role_count
FROM clickhouse.keys.keys
ORDER BY createdAt;
```

Member and invitation audit:

```sql
SELECT name, email, role, joinedAt, 'member' AS kind
FROM clickhouse.members.members
UNION ALL
SELECT email, email, role, createdAt, 'invitation'
FROM clickhouse.members.invitations;
```

Backup configuration coverage across the estate:

```sql
SELECT s.name, b.backupPeriodInHours, b.backupRetentionPeriodInHours, b.backupStartTime
FROM clickhouse.services.services s
JOIN clickhouse.backups.backup_configurations b
  ON b.serviceId = s.id;
```

Service lifecycle - the state command is an `EXEC` method with a `command` of `start`, `stop` or `awake`:

```sql
EXEC clickhouse.services.services.update_state
  @serviceId = '<service-uuid>',
  @command = 'stop';
```

Network access - the service `ipAccessList` `PATCH` takes `add` / `remove` arrays (remove is processed before add), passed through as written:

```sql
UPDATE clickhouse.services.services
SET ipAccessList = '{"add": [{"source": "203.0.113.0/24", "description": "office"}],
                     "remove": [{"source": "0.0.0.0/0", "description": "Anywhere"}]}'
WHERE serviceId = '<service-uuid>';
```

ClickStack dashboards as code - a dashboard `INSERT` with tiles:

```sql
INSERT INTO clickhouse.clickstack.dashboards (serviceId, name, tiles, tags)
SELECT '<service-uuid>', 'Service Overview',
       '[{"name": "Error rate", "x": 0, "y": 0, "w": 6, "h": 3,
          "config": {"displayType": "line", "select": [{"aggFn": "count", "where": "SeverityText = ''ERROR''"}]}}]',
       '["production"]';
```

The data platform estate in one query - ClickHouse Cloud services alongside Snowflake warehouses and Databricks clusters:

```sql
SELECT 'clickhouse' AS platform, name, state, region
FROM clickhouse.services.services
UNION ALL
SELECT 'snowflake', name, state, NULL
FROM snowflake.warehouses.warehouses
UNION ALL
SELECT 'databricks', cluster_name, state, NULL
FROM databricks_workspace.compute.clusters
WHERE deployment_name = '<workspace>';
```


## Services
<div class="row">
<div class="providerDocColumn">
<a href="/services/backups/">backups</a><br />
<a href="/services/clickpipes/">clickpipes</a><br />
<a href="/services/clickstack/">clickstack</a><br />
<a href="/services/keys/">keys</a><br />
<a href="/services/members/">members</a><br />
</div>
<div class="providerDocColumn">
<a href="/services/organizations/">organizations</a><br />
<a href="/services/postgres/">postgres</a><br />
<a href="/services/roles/">roles</a><br />
<a href="/services/services/">services</a><br />
<a href="/services/udfs/">udfs</a><br />
</div>
</div>

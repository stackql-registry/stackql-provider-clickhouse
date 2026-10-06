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
source project: __[stackql-provider-clickhouse](https://github.com/stackql-registry/stackql-provider-clickhouse)__  

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

## Organization scope

Every resource except `organizations` is scoped to an organization. The organization ID is a server variable (`organization_id`) resolved from the <CopyableCode code="CLICKHOUSE_ORG_ID" /> environment variable when it is set, so queries need no `WHERE organization_id` clause:

```sql
SELECT name, state, provider, region
FROM clickhouse.services.services;
```

A `WHERE organization_id = '...'` value always takes precedence over the environment, which is how a single session queries several organizations. With the variable unset, `organization_id` becomes a required parameter on every method (visible in `SHOW METHODS`) and must be supplied per query. To discover the ID:

```sql
SELECT id, name FROM clickhouse.organizations.organizations;
```

## Rate limit

The API allows a fixed window of requests per API key (documented as 10 per 10 seconds; the authenticated policy header currently reports `40;w=10`). A `429` response is the signal. Wide queries that fan out across many services (backups or settings for every service, for example) are paced by StackQL's request loop, but long-running scans should be sequenced rather than issued in parallel across API keys.

## Beta endpoints

The vendor labels part of the surface as beta and this provider mirrors the labelling in each method description: ClickStack, Managed Postgres, backup buckets and ClickPipes schema discovery are beta with a stable contract; `clickhouseSettings`, `scalingSchedule` and the Postgres metrics reads are beta and evolving (the contract may change). Refreshes of the provider are reviewed spec diffs against a content-hash pin.

## Example queries

### Service estate inventory

State, footprint and scaling configuration for every service:

```sql
SELECT name, state, provider, region,
       num_replicas,
       min_replica_memory_gb, max_replica_memory_gb,
       json_extract(current_scaling, '$.effectiveAutoscalingMode') AS scaling_mode,
       idle_scaling, idle_timeout_minutes, clickhouse_version
FROM clickhouse.services.services
ORDER BY provider, region, name;
```

### Usage cost by day and entity

Daily usage cost in ClickHouse Credits, one row per entity per day:

```sql
SELECT date, entity_type, entity_name, total_chc,
       json_extract(metrics, '$.computeCHC') AS compute_chc,
       json_extract(metrics, '$.storageCHC') AS storage_chc,
       json_extract(metrics, '$.backupCHC') AS backup_chc
FROM clickhouse.organizations.usage_costs
WHERE from_date = '2026-08-01' AND to_date = '2026-08-31'
ORDER BY date, entity_name;
```

### Idle-service detection

Stopped or idle services that still carried cost in the window:

```sql
SELECT s.name, s.state, SUM(c.total_chc) AS chc_in_window
FROM clickhouse.services.services s
JOIN clickhouse.organizations.usage_costs c
  ON c.service_id = s.id
WHERE c.from_date = '2026-08-01' AND c.to_date = '2026-08-31'
  AND s.state IN ('stopped', 'idle')
GROUP BY s.name, s.state
ORDER BY chc_in_window DESC;
```

### API keys by age and role

Keys with state, expiry, last use and assigned roles:

```sql
SELECT name, state, created_at, expire_at, used_at,
       json_extract(assigned_roles, '$[0].roleName') AS first_role,
       json_array_length(assigned_roles) AS role_count
FROM clickhouse.keys.keys
ORDER BY created_at;
```

### Member and invitation audit

Members and outstanding invitations in one list:

```sql
SELECT name, email, role, joined_at, 'member' AS kind
FROM clickhouse.members.members
UNION ALL
SELECT email, email, role, created_at, 'invitation'
FROM clickhouse.members.invitations;
```

### Backup configuration coverage

Backup period and retention for every service:

```sql
SELECT s.name, b.backup_period_in_hours, b.backup_retention_period_in_hours, b.backup_start_time
FROM clickhouse.services.services s
JOIN clickhouse.backups.backup_configurations b
  ON b.service_id = s.id;
```

### Organization quotas

Usage against limits:

```sql
SELECT quota_code, name, value AS quota_limit, usage
FROM clickhouse.organizations.quotas;
```

### API key provisioning

Organizations on Custom Roles assign roles by ID (`assigned_role_ids`), so the role lookup and the key creation are one statement:

```sql
INSERT INTO clickhouse.keys.keys (name, assigned_role_ids, state)
SELECT 'finops-reader',
       '["' || id || '"]',
       'enabled'
FROM clickhouse.roles.roles
WHERE name = 'Organization API Reader';
```

### Service lifecycle

The state command is an `EXEC` method with a `command` of `start`, `stop` or `awake`:

```sql
EXEC clickhouse.services.services.update_state
  @serviceId = '<service-uuid>',
  @command = 'stop';
```

### Network access

The service `ip_access_list` update takes `add` / `remove` arrays (remove is processed before add):

```sql
UPDATE clickhouse.services.services
SET ip_access_list = '{"add": [{"source": "203.0.113.0/24", "description": "office"}],
                       "remove": [{"source": "0.0.0.0/0", "description": "Anywhere"}]}'
WHERE service_id = '<service-uuid>';
```

### ClickStack dashboards as code

A dashboard `INSERT` with tiles:

```sql
INSERT INTO clickhouse.clickstack.dashboards (service_id, name, tiles, tags)
SELECT '<service-uuid>', 'Service Overview',
       '[{"name": "Error rate", "x": 0, "y": 0, "w": 6, "h": 3,
          "config": {"displayType": "line", "select": [{"aggFn": "count", "where": "SeverityText = ''ERROR''"}]}}]',
       '["production"]';
```

### The data platform estate in one query

ClickHouse Cloud services alongside Snowflake warehouses and Databricks clusters:

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

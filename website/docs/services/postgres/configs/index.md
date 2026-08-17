--- 
title: configs
hide_title: false
hide_table_of_contents: false
keywords:
  - configs
  - postgres
  - clickhouse
  - infrastructure-as-code
  - configuration-as-data
  - cloud inventory
description: Query, deploy and manage clickhouse resources using SQL
custom_edit_url: null
image: /img/stackql-clickhouse-provider-featured-image.png
---

import CopyableCode from '@site/src/components/CopyableCode/CopyableCode';
import CodeBlock from '@theme/CodeBlock';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Creates, updates, deletes, gets or lists a <code>configs</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="configs" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="clickhouse.postgres.configs" /></td></tr>
</tbody></table>

## Fields

The following fields are returned by `SELECT` queries:

<Tabs
    defaultValue="get"
    values={[
        { label: 'get', value: 'get' }
    ]}
>
<TabItem value="get">

<table>
<thead>
    <tr>
    <th>Name</th>
    <th>Datatype</th>
    <th>Description</th>
    </tr>
</thead>
<tbody>
<tr>
    <td><CopyableCode code="pg_bouncer_config" /></td>
    <td><code>object</code></td>
    <td>PgBouncer &#91;runtime configuration&#93;(https:​//www.pgbouncer.org/config.html) configuration. (title: PgBouncer Configuration) (wire: pgBouncerConfig)</td>
</tr>
<tr>
    <td><CopyableCode code="pg_config" /></td>
    <td><code>object</code></td>
    <td>Postgres &#91;runtime configuration&#93;(https:​//www.postgresql.org/docs/current/runtime-config.html) configuration. (title: Postgres Configuration) (wire: pgConfig)</td>
</tr>
</tbody>
</table>
</TabItem>
</Tabs>

## Methods

The following methods are available for this resource:

<table>
<thead>
    <tr>
    <th>Name</th>
    <th>Accessible by</th>
    <th>Required Params</th>
    <th>Optional Params</th>
    <th>Description</th>
    </tr>
</thead>
<tbody>
<tr>
    <td><a href="#get"><CopyableCode code="get" /></a></td>
    <td><CopyableCode code="select" /></td>
    <td><a href="#parameter-postgres_id"><code>postgres_id</code></a>, <a href="#parameter-organization_id"><code>organization_id</code></a></td>
    <td></td>
    <td>**This endpoint is in beta.** API contract is stable, and no breaking changes are expected in the future. &lt;br /&gt;&lt;br /&gt; Returns the configuration data for a Postgres service and its PgBouncer service.</td>
</tr>
<tr>
    <td><a href="#create"><CopyableCode code="create" /></a></td>
    <td><CopyableCode code="insert" /></td>
    <td><a href="#parameter-postgres_id"><code>postgres_id</code></a>, <a href="#parameter-organization_id"><code>organization_id</code></a>, <a href="#parameter-pg_config"><code>pg_config</code></a>, <a href="#parameter-pg_bouncer_config"><code>pg_bouncer_config</code></a></td>
    <td></td>
    <td>**This endpoint is in beta.** API contract is stable, and no breaking changes are expected in the future. &lt;br /&gt;&lt;br /&gt; Replace the existing Postgres service and pgBouncer configuration.</td>
</tr>
<tr>
    <td><a href="#update"><CopyableCode code="update" /></a></td>
    <td><CopyableCode code="update" /></td>
    <td><a href="#parameter-postgres_id"><code>postgres_id</code></a>, <a href="#parameter-organization_id"><code>organization_id</code></a>, <a href="#parameter-pg_config"><code>pg_config</code></a>, <a href="#parameter-pg_bouncer_config"><code>pg_bouncer_config</code></a></td>
    <td></td>
    <td>**This endpoint is in beta.** API contract is stable, and no breaking changes are expected in the future. &lt;br /&gt;&lt;br /&gt; Update the existing Postgres service and pgBouncer configuration.</td>
</tr>
</tbody>
</table>

## Parameters

Parameters can be passed in the `WHERE` clause of a query. Check the [Methods](#methods) section to see which parameters are required or optional for each operation.

<table>
<thead>
    <tr>
    <th>Name</th>
    <th>Datatype</th>
    <th>Description</th>
    </tr>
</thead>
<tbody>
<tr id="parameter-organization_id">
    <td><CopyableCode code="organization_id" /></td>
    <td><code>string</code></td>
    <td>ClickHouse Cloud organization ID. Resolved from the CLICKHOUSE_ORG_ID environment variable when it is set (x-stackQL-envVar); otherwise it must be supplied on every query as WHERE organization_id = &lt;uuid&gt;. A WHERE value always takes precedence over the environment. (x-stackQL-envVar: CLICKHOUSE_ORG_ID)</td>
</tr>
<tr id="parameter-postgres_id">
    <td><CopyableCode code="postgres_id" /></td>
    <td><code>string (uuid)</code></td>
    <td>ID of the requested Postgres service. (wire: postgresId)</td>
</tr>
</tbody>
</table>

## `SELECT` examples

<Tabs
    defaultValue="get"
    values={[
        { label: 'get', value: 'get' }
    ]}
>
<TabItem value="get">

**This endpoint is in beta.** API contract is stable, and no breaking changes are expected in the future. &lt;br /&gt;&lt;br /&gt; Returns the configuration data for a Postgres service and its PgBouncer service.

```sql
SELECT
pg_bouncer_config,
pg_config
FROM clickhouse.postgres.configs
WHERE postgres_id = '{{ postgres_id }}' -- required
AND organization_id = '{{ organization_id }}' -- required unless CLICKHOUSE_ORG_ID is set
;
```
</TabItem>
</Tabs>


## `INSERT` examples

<Tabs
    defaultValue="create"
    values={[
        { label: 'create', value: 'create' },
        { label: 'Manifest', value: 'manifest' }
    ]}
>
<TabItem value="create">

**This endpoint is in beta.** API contract is stable, and no breaking changes are expected in the future. &lt;br /&gt;&lt;br /&gt; Replace the existing Postgres service and pgBouncer configuration.

```sql
INSERT INTO clickhouse.postgres.configs (
pg_config,
pg_bouncer_config,
postgres_id,
organization_id
)
SELECT 
'{{ pg_config }}' /* required */,
'{{ pg_bouncer_config }}' /* required */,
'{{ postgres_id }}',
'{{ organization_id }}'
RETURNING
request_id,
result,
status
;
```
</TabItem>
<TabItem value="manifest">

<CodeBlock language="yaml">{`# Description fields are for documentation purposes
- name: configs
  props:
    - name: postgres_id
      value: "{{ postgres_id }}"
      description: Required parameter for the configs resource.
    - name: organization_id
      value: "{{ organization_id }}"
      description: Required parameter for the configs resource.
    - name: pg_config
      description: |
        Postgres [runtime configuration](https://www.postgresql.org/docs/current/runtime-config.html) configuration.
      value:
        max_connections: "{{ max_connections }}"
        default_transaction_isolation: "{{ default_transaction_isolation }}"
        ssl_min_protocol_version: "{{ ssl_min_protocol_version }}"
        maintenance_work_mem: "{{ maintenance_work_mem }}"
        work_mem: "{{ work_mem }}"
        effective_cache_size: "{{ effective_cache_size }}"
        random_page_cost: "{{ random_page_cost }}"
        effective_io_concurrency: "{{ effective_io_concurrency }}"
        max_worker_processes: "{{ max_worker_processes }}"
        max_parallel_workers: "{{ max_parallel_workers }}"
        max_parallel_workers_per_gather: "{{ max_parallel_workers_per_gather }}"
        max_parallel_maintenance_workers: "{{ max_parallel_maintenance_workers }}"
        statement_timeout: "{{ statement_timeout }}"
        lock_timeout: "{{ lock_timeout }}"
        idle_session_timeout: "{{ idle_session_timeout }}"
        idle_in_transaction_session_timeout: "{{ idle_in_transaction_session_timeout }}"
        transaction_timeout: "{{ transaction_timeout }}"
        wal_sender_timeout: "{{ wal_sender_timeout }}"
        wal_keep_size: "{{ wal_keep_size }}"
        min_wal_size: "{{ min_wal_size }}"
        max_wal_size: "{{ max_wal_size }}"
        max_slot_wal_keep_size: "{{ max_slot_wal_keep_size }}"
        wal_compression: "{{ wal_compression }}"
        autovacuum_max_workers: "{{ autovacuum_max_workers }}"
        autovacuum_naptime: "{{ autovacuum_naptime }}"
        autovacuum_work_mem: "{{ autovacuum_work_mem }}"
        autovacuum_vacuum_scale_factor: "{{ autovacuum_vacuum_scale_factor }}"
        autovacuum_analyze_scale_factor: "{{ autovacuum_analyze_scale_factor }}"
        autovacuum_vacuum_insert_scale_factor: "{{ autovacuum_vacuum_insert_scale_factor }}"
        autovacuum_vacuum_cost_limit: "{{ autovacuum_vacuum_cost_limit }}"
        autovacuum_vacuum_cost_delay: "{{ autovacuum_vacuum_cost_delay }}"
    - name: pg_bouncer_config
      value: "{{ pg_bouncer_config }}"
      description: |
        PgBouncer [runtime configuration](https://www.pgbouncer.org/config.html) configuration.
`}</CodeBlock>

</TabItem>
</Tabs>


## `UPDATE` examples

<Tabs
    defaultValue="update"
    values={[
        { label: 'update', value: 'update' }
    ]}
>
<TabItem value="update">

**This endpoint is in beta.** API contract is stable, and no breaking changes are expected in the future. &lt;br /&gt;&lt;br /&gt; Update the existing Postgres service and pgBouncer configuration.

```sql
UPDATE clickhouse.postgres.configs
SET 
pg_config = '{{ pg_config }}',
pg_bouncer_config = '{{ pg_bouncer_config }}'
WHERE 
postgres_id = '{{ postgres_id }}' --required
AND organization_id = '{{ organization_id }}' --required unless CLICKHOUSE_ORG_ID is set
AND pg_config = '{{ pg_config }}' --required
AND pg_bouncer_config = '{{ pg_bouncer_config }}' --required
RETURNING
request_id,
result,
status;
```
</TabItem>
</Tabs>

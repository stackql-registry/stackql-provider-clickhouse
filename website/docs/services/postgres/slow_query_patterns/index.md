--- 
title: slow_query_patterns
hide_title: false
hide_table_of_contents: false
keywords:
  - slow_query_patterns
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

Creates, updates, deletes, gets or lists a <code>slow_query_patterns</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="slow_query_patterns" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="clickhouse.postgres.slow_query_patterns" /></td></tr>
</tbody></table>

## Fields

The following fields are returned by `SELECT` queries:

<Tabs
    defaultValue="get"
    values={[
        { label: 'get', value: 'get' },
        { label: 'list', value: 'list' }
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
    <td><CopyableCode code="aggregate" /></td>
    <td><code>object</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="recent_executions" /></td>
    <td><code>array</code></td>
    <td>Recent individual executions matching the pattern. (wire: recentExecutions)</td>
</tr>
</tbody>
</table>
</TabItem>
<TabItem value="list">

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
    <td><CopyableCode code="query_id" /></td>
    <td><code>string</code></td>
    <td>Stable identifier for the query pattern (normalized SQL). (wire: queryId)</td>
</tr>
<tr>
    <td><CopyableCode code="db_name" /></td>
    <td><code>string</code></td>
    <td>Database the query ran in. (wire: dbName)</td>
</tr>
<tr>
    <td><CopyableCode code="app" /></td>
    <td><code>string</code></td>
    <td>Value of the Postgres `application_name` for executions matching this pattern.</td>
</tr>
<tr>
    <td><CopyableCode code="avg_duration_us" /></td>
    <td><code>integer</code></td>
    <td>Average execution time per call, in microseconds. (wire: avgDurationUs)</td>
</tr>
<tr>
    <td><CopyableCode code="call_count" /></td>
    <td><code>integer</code></td>
    <td>Number of times the pattern executed in the window. (wire: callCount)</td>
</tr>
<tr>
    <td><CopyableCode code="db_operation" /></td>
    <td><code>string</code></td>
    <td>Top-level SQL operation type (for example, SELECT, INSERT, UPDATE, DELETE, UTILITY). (wire: dbOperation)</td>
</tr>
<tr>
    <td><CopyableCode code="db_user" /></td>
    <td><code>string</code></td>
    <td>Database user that executed the query. (wire: dbUser)</td>
</tr>
<tr>
    <td><CopyableCode code="error_count" /></td>
    <td><code>integer</code></td>
    <td>Number of executions of the pattern that raised an error. (wire: errorCount)</td>
</tr>
<tr>
    <td><CopyableCode code="max_duration_us" /></td>
    <td><code>integer</code></td>
    <td>Maximum execution time of any call, in microseconds. (wire: maxDurationUs)</td>
</tr>
<tr>
    <td><CopyableCode code="p_50_duration_us" /></td>
    <td><code>integer</code></td>
    <td>50th percentile execution time, in microseconds. (wire: p50DurationUs)</td>
</tr>
<tr>
    <td><CopyableCode code="p_95_duration_us" /></td>
    <td><code>integer</code></td>
    <td>95th percentile execution time, in microseconds. (wire: p95DurationUs)</td>
</tr>
<tr>
    <td><CopyableCode code="p_99_duration_us" /></td>
    <td><code>integer</code></td>
    <td>99th percentile execution time, in microseconds. (wire: p99DurationUs)</td>
</tr>
<tr>
    <td><CopyableCode code="query_text" /></td>
    <td><code>string</code></td>
    <td>Normalized query text with literals replaced by placeholders. (wire: queryText)</td>
</tr>
<tr>
    <td><CopyableCode code="total_cpu_time_us" /></td>
    <td><code>integer</code></td>
    <td>Total CPU time across all calls, in microseconds. (wire: totalCpuTimeUs)</td>
</tr>
<tr>
    <td><CopyableCode code="total_duration_us" /></td>
    <td><code>integer</code></td>
    <td>Total execution time across all calls, in microseconds. (wire: totalDurationUs)</td>
</tr>
<tr>
    <td><CopyableCode code="total_rows" /></td>
    <td><code>integer</code></td>
    <td>Total number of rows returned or affected across all calls. (wire: totalRows)</td>
</tr>
<tr>
    <td><CopyableCode code="total_shared_blks_hit" /></td>
    <td><code>integer</code></td>
    <td>Total shared buffer blocks hit (cache hits) across all calls. (wire: totalSharedBlksHit)</td>
</tr>
<tr>
    <td><CopyableCode code="total_shared_blks_read" /></td>
    <td><code>integer</code></td>
    <td>Total shared buffer blocks read from disk (cache misses) across all calls. (wire: totalSharedBlksRead)</td>
</tr>
<tr>
    <td><CopyableCode code="total_wal_bytes" /></td>
    <td><code>integer</code></td>
    <td>Total WAL (write-ahead log) bytes generated across all calls. (wire: totalWalBytes)</td>
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
    <td><a href="#parameter-postgres_id"><code>postgres_id</code></a>, <a href="#parameter-query_id"><code>query_id</code></a>, <a href="#parameter-db_name"><code>db_name</code></a>, <a href="#parameter-db_user"><code>db_user</code></a>, <a href="#parameter-db_operation"><code>db_operation</code></a>, <a href="#parameter-organization_id"><code>organization_id</code></a></td>
    <td><a href="#parameter-app"><code>app</code></a>, <a href="#parameter-timestamp"><code>timestamp</code></a></td>
    <td>**This endpoint is in beta.** API contract is stable, and no breaking changes are expected in the future. &lt;br /&gt;&lt;br /&gt; Returns aggregate metrics for a single slow query pattern together with its most recent individual executions.</td>
</tr>
<tr>
    <td><a href="#list"><CopyableCode code="list" /></a></td>
    <td><CopyableCode code="select" /></td>
    <td><a href="#parameter-postgres_id"><code>postgres_id</code></a>, <a href="#parameter-from_date"><code>from_date</code></a>, <a href="#parameter-to_date"><code>to_date</code></a>, <a href="#parameter-organization_id"><code>organization_id</code></a></td>
    <td><a href="#parameter-db_name"><code>db_name</code></a>, <a href="#parameter-db_user"><code>db_user</code></a>, <a href="#parameter-db_operation"><code>db_operation</code></a>, <a href="#parameter-app"><code>app</code></a>, <a href="#parameter-sort_by"><code>sort_by</code></a>, <a href="#parameter-sort_order"><code>sort_order</code></a>, <a href="#parameter-limit"><code>limit</code></a>, <a href="#parameter-offset"><code>offset</code></a></td>
    <td>**This endpoint is in beta.** API contract is stable, and no breaking changes are expected in the future. &lt;br /&gt;&lt;br /&gt; Returns aggregate metrics for the slowest query patterns observed on a Postgres service during the given time window. Use this to discover which queries dominate total execution time, CPU, I/O, or WAL generation.</td>
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
<tr id="parameter-db_name">
    <td><CopyableCode code="db_name" /></td>
    <td><code>string</code></td>
    <td>Database name filter.</td>
</tr>
<tr id="parameter-db_operation">
    <td><CopyableCode code="db_operation" /></td>
    <td><code>string</code></td>
    <td>Database operation filter (for example, SELECT, INSERT, UPDATE, DELETE, UTILITY).</td>
</tr>
<tr id="parameter-db_user">
    <td><CopyableCode code="db_user" /></td>
    <td><code>string</code></td>
    <td>Database user filter.</td>
</tr>
<tr id="parameter-from_date">
    <td><CopyableCode code="from_date" /></td>
    <td><code>string (date-time)</code></td>
    <td>Inclusive start of the time window (RFC 3339 date-time).</td>
</tr>
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
<tr id="parameter-query_id">
    <td><CopyableCode code="query_id" /></td>
    <td><code>string</code></td>
    <td>Stable identifier for the query pattern. (wire: queryId)</td>
</tr>
<tr id="parameter-to_date">
    <td><CopyableCode code="to_date" /></td>
    <td><code>string (date-time)</code></td>
    <td>Exclusive end of the time window (RFC 3339 date-time).</td>
</tr>
<tr id="parameter-app">
    <td><CopyableCode code="app" /></td>
    <td><code>string</code></td>
    <td>Application name filter.</td>
</tr>
<tr id="parameter-db_name">
    <td><CopyableCode code="db_name" /></td>
    <td><code>string</code></td>
    <td>Database name filter.</td>
</tr>
<tr id="parameter-db_operation">
    <td><CopyableCode code="db_operation" /></td>
    <td><code>string</code></td>
    <td>Database operation filter (for example, SELECT, INSERT, UPDATE, DELETE, UTILITY).</td>
</tr>
<tr id="parameter-db_user">
    <td><CopyableCode code="db_user" /></td>
    <td><code>string</code></td>
    <td>Database user filter.</td>
</tr>
<tr id="parameter-limit">
    <td><CopyableCode code="limit" /></td>
    <td><code>integer</code></td>
    <td>Maximum number of results to return.</td>
</tr>
<tr id="parameter-offset">
    <td><CopyableCode code="offset" /></td>
    <td><code>integer</code></td>
    <td>Number of results to skip before returning.</td>
</tr>
<tr id="parameter-sort_by">
    <td><CopyableCode code="sort_by" /></td>
    <td><code>string</code></td>
    <td>Field to sort results by.</td>
</tr>
<tr id="parameter-sort_order">
    <td><CopyableCode code="sort_order" /></td>
    <td><code>string</code></td>
    <td>Sort order. One of `asc` or `desc`.</td>
</tr>
<tr id="parameter-timestamp">
    <td><CopyableCode code="timestamp" /></td>
    <td><code>string (date-time)</code></td>
    <td>Timestamp of a specific execution (RFC 3339).</td>
</tr>
</tbody>
</table>

## `SELECT` examples

<Tabs
    defaultValue="get"
    values={[
        { label: 'get', value: 'get' },
        { label: 'list', value: 'list' }
    ]}
>
<TabItem value="get">

**This endpoint is in beta.** API contract is stable, and no breaking changes are expected in the future. &lt;br /&gt;&lt;br /&gt; Returns aggregate metrics for a single slow query pattern together with its most recent individual executions.

```sql
SELECT
aggregate,
recent_executions
FROM clickhouse.postgres.slow_query_patterns
WHERE postgres_id = '{{ postgres_id }}' -- required
AND query_id = '{{ query_id }}' -- required
AND db_name = '{{ db_name }}' -- required
AND db_user = '{{ db_user }}' -- required
AND db_operation = '{{ db_operation }}' -- required
AND organization_id = '{{ organization_id }}' -- required unless CLICKHOUSE_ORG_ID is set
AND app = '{{ app }}'
AND timestamp = '{{ timestamp }}'
;
```
</TabItem>
<TabItem value="list">

**This endpoint is in beta.** API contract is stable, and no breaking changes are expected in the future. &lt;br /&gt;&lt;br /&gt; Returns aggregate metrics for the slowest query patterns observed on a Postgres service during the given time window. Use this to discover which queries dominate total execution time, CPU, I/O, or WAL generation.

```sql
SELECT
query_id,
db_name,
app,
avg_duration_us,
call_count,
db_operation,
db_user,
error_count,
max_duration_us,
p_50_duration_us,
p_95_duration_us,
p_99_duration_us,
query_text,
total_cpu_time_us,
total_duration_us,
total_rows,
total_shared_blks_hit,
total_shared_blks_read,
total_wal_bytes
FROM clickhouse.postgres.slow_query_patterns
WHERE postgres_id = '{{ postgres_id }}' -- required
AND from_date = '{{ from_date }}' -- required
AND to_date = '{{ to_date }}' -- required
AND organization_id = '{{ organization_id }}' -- required unless CLICKHOUSE_ORG_ID is set
AND db_name = '{{ db_name }}'
AND db_user = '{{ db_user }}'
AND db_operation = '{{ db_operation }}'
AND app = '{{ app }}'
AND sort_by = '{{ sort_by }}'
AND sort_order = '{{ sort_order }}'
AND limit = '{{ limit }}'
AND offset = '{{ offset }}'
;
```
</TabItem>
</Tabs>

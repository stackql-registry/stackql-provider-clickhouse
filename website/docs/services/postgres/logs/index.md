--- 
title: logs
hide_title: false
hide_table_of_contents: false
keywords:
  - logs
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

Creates, updates, deletes, gets or lists a <code>logs</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="logs" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="clickhouse.postgres.logs" /></td></tr>
</tbody></table>

## Fields

The following fields are returned by `SELECT` queries:

<Tabs
    defaultValue="list"
    values={[
        { label: 'list', value: 'list' }
    ]}
>
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
    <td><CopyableCode code="body" /></td>
    <td><code>string</code></td>
    <td>Raw log entry body as emitted by PostgreSQL. Structured bodies are returned as a JSON-encoded string.</td>
</tr>
<tr>
    <td><CopyableCode code="severity" /></td>
    <td><code>string</code></td>
    <td>PostgreSQL severity of the entry (for example, LOG, WARNING, ERROR, FATAL, PANIC).</td>
</tr>
<tr>
    <td><CopyableCode code="timestamp" /></td>
    <td><code>string (date-time)</code></td>
    <td>Time the entry was logged (RFC 3339).</td>
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
    <td><a href="#list"><CopyableCode code="list" /></a></td>
    <td><CopyableCode code="select" /></td>
    <td><a href="#parameter-postgresId"><code>postgresId</code></a>, <a href="#parameter-from_date"><code>from_date</code></a>, <a href="#parameter-to_date"><code>to_date</code></a>, <a href="#parameter-organization_id"><code>organization_id</code></a></td>
    <td><a href="#parameter-body_contains"><code>body_contains</code></a>, <a href="#parameter-severity"><code>severity</code></a>, <a href="#parameter-sort_order"><code>sort_order</code></a>, <a href="#parameter-limit"><code>limit</code></a>, <a href="#parameter-offset"><code>offset</code></a></td>
    <td>**This endpoint is in beta.** API contract is stable, and no breaking changes are expected in the future. &lt;br /&gt;&lt;br /&gt; Returns PostgreSQL server log entries for a Postgres service within the given time window, most recent first by default (override with `sort_order`). Results are paginated with `limit`/`offset`; advance `offset` until a page returns fewer than `limit` entries to read the full window. The time range must not exceed 30 days, and `to_date` must be after `from_date`.</td>
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
<tr id="parameter-postgresId">
    <td><CopyableCode code="postgresId" /></td>
    <td><code>string (uuid)</code></td>
    <td>ID of the requested Postgres service.</td>
</tr>
<tr id="parameter-to_date">
    <td><CopyableCode code="to_date" /></td>
    <td><code>string (date-time)</code></td>
    <td>Inclusive end of the time window (RFC 3339 date-time).</td>
</tr>
<tr id="parameter-body_contains">
    <td><CopyableCode code="body_contains" /></td>
    <td><code>string</code></td>
    <td>Case-sensitive substring the log body must contain.</td>
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
<tr id="parameter-severity">
    <td><CopyableCode code="severity" /></td>
    <td><code>string</code></td>
    <td>Filter to log entries with this PostgreSQL severity (for example, ERROR, WARNING, LOG).</td>
</tr>
<tr id="parameter-sort_order">
    <td><CopyableCode code="sort_order" /></td>
    <td><code>string</code></td>
    <td>Sort order. One of `asc` or `desc`.</td>
</tr>
</tbody>
</table>

## `SELECT` examples

<Tabs
    defaultValue="list"
    values={[
        { label: 'list', value: 'list' }
    ]}
>
<TabItem value="list">

**This endpoint is in beta.** API contract is stable, and no breaking changes are expected in the future. &lt;br /&gt;&lt;br /&gt; Returns PostgreSQL server log entries for a Postgres service within the given time window, most recent first by default (override with `sort_order`). Results are paginated with `limit`/`offset`; advance `offset` until a page returns fewer than `limit` entries to read the full window. The time range must not exceed 30 days, and `to_date` must be after `from_date`.

```sql
SELECT
body,
severity,
timestamp
FROM clickhouse.postgres.logs
WHERE postgresId = '{{ postgresId }}' -- required
AND from_date = '{{ from_date }}' -- required
AND to_date = '{{ to_date }}' -- required
AND organization_id = '{{ organization_id }}' -- required unless CLICKHOUSE_ORG_ID is set
AND body_contains = '{{ body_contains }}'
AND severity = '{{ severity }}'
AND sort_order = '{{ sort_order }}'
AND limit = '{{ limit }}'
AND offset = '{{ offset }}'
;
```
</TabItem>
</Tabs>

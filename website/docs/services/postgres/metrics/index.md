--- 
title: metrics
hide_title: false
hide_table_of_contents: false
keywords:
  - metrics
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

Creates, updates, deletes, gets or lists a <code>metrics</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="metrics" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="clickhouse.postgres.metrics" /></td></tr>
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
    <td><CopyableCode code="metrics" /></td>
    <td><code>array</code></td>
    <td>Available metrics, each with its bucketed time series.</td>
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
    <td><a href="#parameter-postgres_id"><code>postgres_id</code></a>, <a href="#parameter-from_date"><code>from_date</code></a>, <a href="#parameter-to_date"><code>to_date</code></a>, <a href="#parameter-organization_id"><code>organization_id</code></a></td>
    <td><a href="#parameter-bucket_size_seconds"><code>bucket_size_seconds</code></a></td>
    <td>**This endpoint is in beta.** API contract is stable, and no breaking changes are expected in the future. &lt;br /&gt;&lt;br /&gt; Returns bucketed time-series metrics for a PostgreSQL service over the requested window (CPU, memory, disk, network, connections, cache hit ratio, throughput, transactions, and more). Use this to chart or analyze how a service behaved over time.</td>
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
<tr id="parameter-postgres_id">
    <td><CopyableCode code="postgres_id" /></td>
    <td><code>string (uuid)</code></td>
    <td>ID of the Postgres service. (wire: postgresId)</td>
</tr>
<tr id="parameter-to_date">
    <td><CopyableCode code="to_date" /></td>
    <td><code>string (date-time)</code></td>
    <td>Exclusive end of the time window (RFC 3339 date-time).</td>
</tr>
<tr id="parameter-bucket_size_seconds">
    <td><CopyableCode code="bucket_size_seconds" /></td>
    <td><code>integer</code></td>
    <td>Time-series bucket size in seconds. When omitted, a bucket size is derived from the requested window. Requests are capped at 250 data points.</td>
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

**This endpoint is in beta.** API contract is stable, and no breaking changes are expected in the future. &lt;br /&gt;&lt;br /&gt; Returns bucketed time-series metrics for a PostgreSQL service over the requested window (CPU, memory, disk, network, connections, cache hit ratio, throughput, transactions, and more). Use this to chart or analyze how a service behaved over time.

```sql
SELECT
metrics
FROM clickhouse.postgres.metrics
WHERE postgres_id = '{{ postgres_id }}' -- required
AND from_date = '{{ from_date }}' -- required
AND to_date = '{{ to_date }}' -- required
AND organization_id = '{{ organization_id }}' -- required unless CLICKHOUSE_ORG_ID is set
AND bucket_size_seconds = '{{ bucket_size_seconds }}'
;
```
</TabItem>
</Tabs>

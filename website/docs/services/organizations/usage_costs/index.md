--- 
title: usage_costs
hide_title: false
hide_table_of_contents: false
keywords:
  - usage_costs
  - organizations
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

Creates, updates, deletes, gets or lists a <code>usage_costs</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="usage_costs" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="clickhouse.organizations.usage_costs" /></td></tr>
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
    <td><CopyableCode code="dataWarehouseId" /></td>
    <td><code>string (uuid)</code></td>
    <td>ID of the dataWarehouse this entity belongs to (or is).</td>
</tr>
<tr>
    <td><CopyableCode code="date" /></td>
    <td><code>string (date)</code></td>
    <td>Date of the usage. ISO-8601 date, based on the UTC timezone.</td>
</tr>
<tr>
    <td><CopyableCode code="entityId" /></td>
    <td><code>string (uuid)</code></td>
    <td>Unique ID of the entity.</td>
</tr>
<tr>
    <td><CopyableCode code="entityName" /></td>
    <td><code>string</code></td>
    <td>Name of the entity.</td>
</tr>
<tr>
    <td><CopyableCode code="entityType" /></td>
    <td><code>string</code></td>
    <td>Type of the entity. (datawarehouse, service, clickpipe)</td>
</tr>
<tr>
    <td><CopyableCode code="locked" /></td>
    <td><code>boolean</code></td>
    <td>When true, the record is immutable. Unlocked records are subject to change until locked.</td>
</tr>
<tr>
    <td><CopyableCode code="metrics" /></td>
    <td><code>object</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="serviceId" /></td>
    <td><code>string (uuid)</code></td>
    <td>ID of the service this entity belongs to (or is). Set to null for dataWarehouse entities.</td>
</tr>
<tr>
    <td><CopyableCode code="totalCHC" /></td>
    <td><code>number</code></td>
    <td>Total cost of usage in ClickHouse Credits (CHCs) for this entity.</td>
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
    <td><a href="#parameter-from_date"><code>from_date</code></a>, <a href="#parameter-to_date"><code>to_date</code></a>, <a href="#parameter-organizationId"><code>organizationId</code></a></td>
    <td><a href="#parameter-filter"><code>filter</code></a></td>
    <td>Returns a grand total and a list of daily, per-entity organization usage cost records for the organization in the queried time period (maximum 31 days). All days in both the request and the response are evaluated based on the UTC timezone.</td>
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
    <td><code>string (date)</code></td>
    <td>Start date for the report, e.g. 2024-12-19.</td>
</tr>
<tr id="parameter-organizationId">
    <td><CopyableCode code="organizationId" /></td>
    <td><code>string</code></td>
    <td>ClickHouse Cloud organization ID. Resolved from the CLICKHOUSE_ORG_ID environment variable when it is set (x-stackQL-envVar); otherwise it must be supplied on every query as WHERE organizationId = &lt;uuid&gt;. A WHERE value always takes precedence over the environment. (x-stackQL-envVar: CLICKHOUSE_ORG_ID)</td>
</tr>
<tr id="parameter-to_date">
    <td><CopyableCode code="to_date" /></td>
    <td><code>string (date)</code></td>
    <td>End date (inclusive) for the report, e.g. 2024-12-20. This date cannot be more than 30 days after from_date (for a maximum queried period of 31 days).</td>
</tr>
<tr id="parameter-filter">
    <td><CopyableCode code="filter" /></td>
    <td><code>array</code></td>
    <td>Filter criteria to apply when retrieving the usage cost report. Currently, only filtering by resource tags is supported. (example: &#91;tag:Environment=Production, tag:Department=Engineering, tag:isActive&#93;)</td>
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

Returns a grand total and a list of daily, per-entity organization usage cost records for the organization in the queried time period (maximum 31 days). All days in both the request and the response are evaluated based on the UTC timezone.

```sql
SELECT
dataWarehouseId,
date,
entityId,
entityName,
entityType,
locked,
metrics,
serviceId,
totalCHC
FROM clickhouse.organizations.usage_costs
WHERE from_date = '{{ from_date }}' -- required
AND to_date = '{{ to_date }}' -- required
AND organizationId = '{{ organizationId }}' -- required unless CLICKHOUSE_ORG_ID is set
AND filter = '{{ filter }}'
;
```
</TabItem>
</Tabs>

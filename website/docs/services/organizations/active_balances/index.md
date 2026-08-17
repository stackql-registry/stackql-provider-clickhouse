--- 
title: active_balances
hide_title: false
hide_table_of_contents: false
keywords:
  - active_balances
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

Creates, updates, deletes, gets or lists an <code>active_balances</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="active_balances" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="clickhouse.organizations.active_balances" /></td></tr>
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
    <td><CopyableCode code="id" /></td>
    <td><code>string (uuid)</code></td>
    <td>Unique ID of the prepaid balance.</td>
</tr>
<tr>
    <td><CopyableCode code="amountSpent" /></td>
    <td><code>number</code></td>
    <td>Credits spent from this balance, in ClickHouse Credits (CHCs).</td>
</tr>
<tr>
    <td><CopyableCode code="expirationDate" /></td>
    <td><code>string (date-time)</code></td>
    <td>Date the balance expires. ISO-8601, based on the UTC timezone.</td>
</tr>
<tr>
    <td><CopyableCode code="remainingPrepaidCredits" /></td>
    <td><code>number</code></td>
    <td>Remaining credits available on this balance, in ClickHouse Credits (CHCs).</td>
</tr>
<tr>
    <td><CopyableCode code="startDate" /></td>
    <td><code>string (date-time)</code></td>
    <td>Date the balance became active. ISO-8601, based on the UTC timezone.</td>
</tr>
<tr>
    <td><CopyableCode code="totalAmount" /></td>
    <td><code>number</code></td>
    <td>Total credits granted on this balance, in ClickHouse Credits (CHCs).</td>
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
    <td><a href="#parameter-organizationId"><code>organizationId</code></a></td>
    <td><a href="#parameter-limit"><code>limit</code></a>, <a href="#parameter-offset"><code>offset</code></a></td>
    <td>**This endpoint is in beta.** API contract is stable, and no breaking changes are expected in the future. &lt;br /&gt;&lt;br /&gt; Returns the active prepaid credit balances for the organization, each with its own balance ID and remaining credits, along with the total remaining credits across all active balances. A balance is active when it has started, has not expired, and has credits remaining. Balances are ordered by expiration date, soonest first, and the returned page is capped at `limit` (default and maximum 100). When `totalCount` exceeds the number of returned balances, page with `limit`/`offset` to retrieve them all. `totalRemainingPrepaidCredits` always covers every active balance, not just the returned page.</td>
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
<tr id="parameter-organizationId">
    <td><CopyableCode code="organizationId" /></td>
    <td><code>string</code></td>
    <td>ClickHouse Cloud organization ID. Resolved from the CLICKHOUSE_ORG_ID environment variable when it is set (x-stackQL-envVar); otherwise it must be supplied on every query as WHERE organizationId = &lt;uuid&gt;. A WHERE value always takes precedence over the environment. (x-stackQL-envVar: CLICKHOUSE_ORG_ID)</td>
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

**This endpoint is in beta.** API contract is stable, and no breaking changes are expected in the future. &lt;br /&gt;&lt;br /&gt; Returns the active prepaid credit balances for the organization, each with its own balance ID and remaining credits, along with the total remaining credits across all active balances. A balance is active when it has started, has not expired, and has credits remaining. Balances are ordered by expiration date, soonest first, and the returned page is capped at `limit` (default and maximum 100). When `totalCount` exceeds the number of returned balances, page with `limit`/`offset` to retrieve them all. `totalRemainingPrepaidCredits` always covers every active balance, not just the returned page.

```sql
SELECT
id,
amountSpent,
expirationDate,
remainingPrepaidCredits,
startDate,
totalAmount
FROM clickhouse.organizations.active_balances
WHERE organizationId = '{{ organizationId }}' -- required unless CLICKHOUSE_ORG_ID is set
AND limit = '{{ limit }}'
AND offset = '{{ offset }}'
;
```
</TabItem>
</Tabs>

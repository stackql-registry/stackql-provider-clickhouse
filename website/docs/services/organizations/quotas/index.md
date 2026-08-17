--- 
title: quotas
hide_title: false
hide_table_of_contents: false
keywords:
  - quotas
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

Creates, updates, deletes, gets or lists a <code>quotas</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="quotas" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="clickhouse.organizations.quotas" /></td></tr>
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
    <td><CopyableCode code="name" /></td>
    <td><code>string</code></td>
    <td>Human-readable name of the quota. (example: Services per organization)</td>
</tr>
<tr>
    <td><CopyableCode code="adjustable" /></td>
    <td><code>boolean</code></td>
    <td>Whether the limit can be raised for the organization by contacting ClickHouse support.</td>
</tr>
<tr>
    <td><CopyableCode code="description" /></td>
    <td><code>string</code></td>
    <td>Explanation of the resource the quota limits and how the limit is applied.</td>
</tr>
<tr>
    <td><CopyableCode code="quota_code" /></td>
    <td><code>string</code></td>
    <td>Stable identifier of the quota. Use it to request a single quota by code. (services-per-organization, postgres-services-per-organization, replicas-per-warehouse, api-keys-per-organization) (example: services-per-organization) (wire: quotaCode)</td>
</tr>
<tr>
    <td><CopyableCode code="scope" /></td>
    <td><code>string</code></td>
    <td>Granularity at which the limit is applied. For example, `replicas-per-warehouse` is an organization-wide setting that limits each warehouse individually. (organization, warehouse) (example: organization)</td>
</tr>
<tr>
    <td><CopyableCode code="usage" /></td>
    <td><code>integer</code></td>
    <td>Current consumption of the quota. Omitted for quotas that do not report usage. Usage can exceed `value` when a limit was lowered after resources were created; existing resources are not affected.</td>
</tr>
<tr>
    <td><CopyableCode code="value" /></td>
    <td><code>integer</code></td>
    <td>Limit currently applied to the organization, including any adjustments made for the organization. The value can change when the billing status of the organization changes.</td>
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
    <td><CopyableCode code="name" /></td>
    <td><code>string</code></td>
    <td>Human-readable name of the quota. (example: Services per organization)</td>
</tr>
<tr>
    <td><CopyableCode code="adjustable" /></td>
    <td><code>boolean</code></td>
    <td>Whether the limit can be raised for the organization by contacting ClickHouse support.</td>
</tr>
<tr>
    <td><CopyableCode code="description" /></td>
    <td><code>string</code></td>
    <td>Explanation of the resource the quota limits and how the limit is applied.</td>
</tr>
<tr>
    <td><CopyableCode code="quota_code" /></td>
    <td><code>string</code></td>
    <td>Stable identifier of the quota. Use it to request a single quota by code. (services-per-organization, postgres-services-per-organization, replicas-per-warehouse, api-keys-per-organization) (example: services-per-organization) (wire: quotaCode)</td>
</tr>
<tr>
    <td><CopyableCode code="scope" /></td>
    <td><code>string</code></td>
    <td>Granularity at which the limit is applied. For example, `replicas-per-warehouse` is an organization-wide setting that limits each warehouse individually. (organization, warehouse) (example: organization)</td>
</tr>
<tr>
    <td><CopyableCode code="usage" /></td>
    <td><code>integer</code></td>
    <td>Current consumption of the quota. Omitted for quotas that do not report usage. Usage can exceed `value` when a limit was lowered after resources were created; existing resources are not affected.</td>
</tr>
<tr>
    <td><CopyableCode code="value" /></td>
    <td><code>integer</code></td>
    <td>Limit currently applied to the organization, including any adjustments made for the organization. The value can change when the billing status of the organization changes.</td>
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
    <td><a href="#parameter-quota_code"><code>quota_code</code></a>, <a href="#parameter-organization_id"><code>organization_id</code></a></td>
    <td></td>
    <td>**Disclaimer:** This beta endpoint is evolving; the API contract may change. &lt;br /&gt;&lt;br /&gt; Returns a single organization quota identified by its quota code. Responds with a not found error when the quota code is unknown or the quota does not apply to the organization.</td>
</tr>
<tr>
    <td><a href="#list"><CopyableCode code="list" /></a></td>
    <td><CopyableCode code="select" /></td>
    <td><a href="#parameter-organization_id"><code>organization_id</code></a></td>
    <td></td>
    <td>**Disclaimer:** This beta endpoint is evolving; the API contract may change. &lt;br /&gt;&lt;br /&gt; Returns the resource quotas enforced for the organization together with their current usage where available. Quotas that do not apply to the organization are omitted. Quota values reflect the limits currently enforced, so they can be polled to detect changes, for example after a billing status change. The response contains one entry per quota code; quotas enforced per resource may additionally appear under resource-scoped endpoints in the future.</td>
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
<tr id="parameter-quota_code">
    <td><CopyableCode code="quota_code" /></td>
    <td><code>string</code></td>
    <td>Code of the requested quota. (wire: quotaCode)</td>
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

**Disclaimer:** This beta endpoint is evolving; the API contract may change. &lt;br /&gt;&lt;br /&gt; Returns a single organization quota identified by its quota code. Responds with a not found error when the quota code is unknown or the quota does not apply to the organization.

```sql
SELECT
name,
adjustable,
description,
quota_code,
scope,
usage,
value
FROM clickhouse.organizations.quotas
WHERE quota_code = '{{ quota_code }}' -- required
AND organization_id = '{{ organization_id }}' -- required unless CLICKHOUSE_ORG_ID is set
;
```
</TabItem>
<TabItem value="list">

**Disclaimer:** This beta endpoint is evolving; the API contract may change. &lt;br /&gt;&lt;br /&gt; Returns the resource quotas enforced for the organization together with their current usage where available. Quotas that do not apply to the organization are omitted. Quota values reflect the limits currently enforced, so they can be polled to detect changes, for example after a billing status change. The response contains one entry per quota code; quotas enforced per resource may additionally appear under resource-scoped endpoints in the future.

```sql
SELECT
name,
adjustable,
description,
quota_code,
scope,
usage,
value
FROM clickhouse.organizations.quotas
WHERE organization_id = '{{ organization_id }}' -- required unless CLICKHOUSE_ORG_ID is set
;
```
</TabItem>
</Tabs>

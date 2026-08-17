--- 
title: upgrade_windows
hide_title: false
hide_table_of_contents: false
keywords:
  - upgrade_windows
  - services
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

Creates, updates, deletes, gets or lists a <code>upgrade_windows</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="upgrade_windows" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="clickhouse.services.upgrade_windows" /></td></tr>
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
    <td><CopyableCode code="duration" /></td>
    <td><code>integer</code></td>
    <td>Length of the upgrade window in hours. Currently only a 6-hour window is supported. (6)</td>
</tr>
<tr>
    <td><CopyableCode code="startHourUtc" /></td>
    <td><code>integer</code></td>
    <td>UTC hour when the upgrade window starts. Must be one of 0, 6, 12, or 18. (0, 6, 12, 18)</td>
</tr>
<tr>
    <td><CopyableCode code="weekday" /></td>
    <td><code>integer</code></td>
    <td>Day of the week the upgrade window starts. 0 = Sunday, 1 = Monday, …, 6 = Saturday.</td>
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
    <td><a href="#parameter-serviceId"><code>serviceId</code></a>, <a href="#parameter-organization_id"><code>organization_id</code></a></td>
    <td></td>
    <td>Returns the configured upgrade window for a service.&lt;br /&gt;&lt;br /&gt;Errors:&lt;br /&gt;- 401: missing, invalid, or disabled API key.&lt;br /&gt;- 403: caller lacks `control-plane:service:view` on the service.&lt;br /&gt;- 404: service does not exist, is not visible to the caller, or no upgrade window has been configured.</td>
</tr>
<tr>
    <td><a href="#update"><CopyableCode code="update" /></a></td>
    <td><CopyableCode code="update" /></td>
    <td><a href="#parameter-serviceId"><code>serviceId</code></a>, <a href="#parameter-organization_id"><code>organization_id</code></a>, <a href="#parameter-weekday"><code>weekday</code></a>, <a href="#parameter-startHourUtc"><code>startHourUtc</code></a></td>
    <td></td>
    <td>Creates or fully replaces the upgrade window for a service. The upgrade window currently lasts 6 hours from `startHourUtc`. The upgrade window can only be set on primary services; secondary services inherit the primary service window.&lt;br /&gt;&lt;br /&gt;Errors:&lt;br /&gt;- 400: invalid field values (`weekday` not in 0–6, `startHourUtc` not in &#123;0, 6, 12, 18&#125;), or the service is a secondary service.&lt;br /&gt;- 401: missing, invalid, or disabled API key.&lt;br /&gt;- 403: caller lacks `control-plane:service:manage` on the service, or the organization does not have the scheduled upgrades feature enabled.&lt;br /&gt;- 404: service does not exist or is not visible to the caller.</td>
</tr>
<tr>
    <td><a href="#delete"><CopyableCode code="delete" /></a></td>
    <td><CopyableCode code="delete" /></td>
    <td><a href="#parameter-serviceId"><code>serviceId</code></a>, <a href="#parameter-organization_id"><code>organization_id</code></a></td>
    <td></td>
    <td>Deletes the upgrade window for a service, restoring the default scheduling behaviour. The upgrade window can only be deleted on primary services. Deletion succeeds even if the organization has lost the scheduled upgrades entitlement, so a window can be cleared after entitlement loss.&lt;br /&gt;&lt;br /&gt;Errors:&lt;br /&gt;- 400: the service is a secondary service.&lt;br /&gt;- 401: missing, invalid, or disabled API key.&lt;br /&gt;- 403: caller lacks `control-plane:service:manage` on the service.&lt;br /&gt;- 404: service does not exist, is not visible to the caller, or no upgrade window is configured.</td>
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
<tr id="parameter-serviceId">
    <td><CopyableCode code="serviceId" /></td>
    <td><code>string (uuid)</code></td>
    <td>ID of the service.</td>
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

Returns the configured upgrade window for a service.&lt;br /&gt;&lt;br /&gt;Errors:&lt;br /&gt;- 401: missing, invalid, or disabled API key.&lt;br /&gt;- 403: caller lacks `control-plane:service:view` on the service.&lt;br /&gt;- 404: service does not exist, is not visible to the caller, or no upgrade window has been configured.

```sql
SELECT
duration,
startHourUtc,
weekday
FROM clickhouse.services.upgrade_windows
WHERE serviceId = '{{ serviceId }}' -- required
AND organization_id = '{{ organization_id }}' -- required unless CLICKHOUSE_ORG_ID is set
;
```
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

Creates or fully replaces the upgrade window for a service. The upgrade window currently lasts 6 hours from `startHourUtc`. The upgrade window can only be set on primary services; secondary services inherit the primary service window.&lt;br /&gt;&lt;br /&gt;Errors:&lt;br /&gt;- 400: invalid field values (`weekday` not in 0–6, `startHourUtc` not in &#123;0, 6, 12, 18&#125;), or the service is a secondary service.&lt;br /&gt;- 401: missing, invalid, or disabled API key.&lt;br /&gt;- 403: caller lacks `control-plane:service:manage` on the service, or the organization does not have the scheduled upgrades feature enabled.&lt;br /&gt;- 404: service does not exist or is not visible to the caller.

```sql
UPDATE clickhouse.services.upgrade_windows
SET 
weekday = {{ weekday }},
startHourUtc = {{ startHourUtc }}
WHERE 
serviceId = '{{ serviceId }}' --required
AND organization_id = '{{ organization_id }}' --required unless CLICKHOUSE_ORG_ID is set
AND weekday = '{{ weekday }}' --required
AND startHourUtc = '{{ startHourUtc }}' --required
RETURNING
requestId,
result,
status;
```
</TabItem>
</Tabs>


## `DELETE` examples

<Tabs
    defaultValue="delete"
    values={[
        { label: 'delete', value: 'delete' }
    ]}
>
<TabItem value="delete">

Deletes the upgrade window for a service, restoring the default scheduling behaviour. The upgrade window can only be deleted on primary services. Deletion succeeds even if the organization has lost the scheduled upgrades entitlement, so a window can be cleared after entitlement loss.&lt;br /&gt;&lt;br /&gt;Errors:&lt;br /&gt;- 400: the service is a secondary service.&lt;br /&gt;- 401: missing, invalid, or disabled API key.&lt;br /&gt;- 403: caller lacks `control-plane:service:manage` on the service.&lt;br /&gt;- 404: service does not exist, is not visible to the caller, or no upgrade window is configured.

```sql
DELETE FROM clickhouse.services.upgrade_windows
WHERE serviceId = '{{ serviceId }}' --required
AND organization_id = '{{ organization_id }}' --required unless CLICKHOUSE_ORG_ID is set
;
```
</TabItem>
</Tabs>

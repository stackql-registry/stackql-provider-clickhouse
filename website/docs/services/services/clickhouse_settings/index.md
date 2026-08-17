--- 
title: clickhouse_settings
hide_title: false
hide_table_of_contents: false
keywords:
  - clickhouse_settings
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

Creates, updates, deletes, gets or lists a <code>clickhouse_settings</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="clickhouse_settings" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="clickhouse.services.clickhouse_settings" /></td></tr>
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
    <td>Name of the setting. (example: compatibility)</td>
</tr>
<tr>
    <td><CopyableCode code="value" /></td>
    <td><code>string</code></td>
    <td>Current value of the setting. Returned as a string for all setting types. (example: 24.8)</td>
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
    <td><CopyableCode code="settings" /></td>
    <td><code>array</code></td>
    <td>List of ClickHouse settings with their current values.</td>
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
    <td><a href="#parameter-service_id"><code>service_id</code></a>, <a href="#parameter-setting_name"><code>setting_name</code></a>, <a href="#parameter-organization_id"><code>organization_id</code></a></td>
    <td></td>
    <td>**Disclaimer:** This beta endpoint is evolving; the API contract may change. &lt;br /&gt;&lt;br /&gt; Returns the current value of a ClickHouse setting for the service. Use the &#91;schema endpoint&#93;(#tag/Service/operation/serviceClickhouseSettingsSchemaGet) to discover which settings are configurable.</td>
</tr>
<tr>
    <td><a href="#list"><CopyableCode code="list" /></a></td>
    <td><CopyableCode code="select" /></td>
    <td><a href="#parameter-service_id"><code>service_id</code></a>, <a href="#parameter-organization_id"><code>organization_id</code></a></td>
    <td></td>
    <td>**Disclaimer:** This beta endpoint is evolving; the API contract may change. &lt;br /&gt;&lt;br /&gt; Returns the configured ClickHouse settings for the service. Only settings that have been explicitly set are included.</td>
</tr>
<tr>
    <td><a href="#update"><CopyableCode code="update" /></a></td>
    <td><CopyableCode code="update" /></td>
    <td><a href="#parameter-service_id"><code>service_id</code></a>, <a href="#parameter-organization_id"><code>organization_id</code></a>, <a href="#parameter-settings"><code>settings</code></a></td>
    <td></td>
    <td>**Disclaimer:** This beta endpoint is evolving; the API contract may change. &lt;br /&gt;&lt;br /&gt; Updates one or more ClickHouse settings for the service. To reset a setting to its platform default, use the &#91;DELETE single setting&#93;(#tag/Service/operation/serviceClickhouseSettingDelete) endpoint. Use the &#91;schema endpoint&#93;(#tag/Service/operation/serviceClickhouseSettingsSchemaGet) to discover which settings are configurable.</td>
</tr>
<tr>
    <td><a href="#delete"><CopyableCode code="delete" /></a></td>
    <td><CopyableCode code="delete" /></td>
    <td><a href="#parameter-service_id"><code>service_id</code></a>, <a href="#parameter-setting_name"><code>setting_name</code></a>, <a href="#parameter-organization_id"><code>organization_id</code></a></td>
    <td></td>
    <td>**Disclaimer:** This beta endpoint is evolving; the API contract may change. &lt;br /&gt;&lt;br /&gt; Removes a previously-configured ClickHouse setting, reverting its effective value to the platform default. Settings under `spec.extraConfig.server.*` (e.g. `keep_alive_timeout`, `shared_merge_tree_disable_merges_and_mutations_assignment`) trigger a ClickHouse server rollout restart; other settings propagate to all replicas after a short delay. Deleting a setting that was never configured is a no-op (200 OK).</td>
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
<tr id="parameter-service_id">
    <td><CopyableCode code="service_id" /></td>
    <td><code>string (uuid)</code></td>
    <td>ID of the service. (wire: serviceId)</td>
</tr>
<tr id="parameter-setting_name">
    <td><CopyableCode code="setting_name" /></td>
    <td><code>string</code></td>
    <td>Name of the setting to reset. (wire: settingName)</td>
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

**Disclaimer:** This beta endpoint is evolving; the API contract may change. &lt;br /&gt;&lt;br /&gt; Returns the current value of a ClickHouse setting for the service. Use the &#91;schema endpoint&#93;(#tag/Service/operation/serviceClickhouseSettingsSchemaGet) to discover which settings are configurable.

```sql
SELECT
name,
value
FROM clickhouse.services.clickhouse_settings
WHERE service_id = '{{ service_id }}' -- required
AND setting_name = '{{ setting_name }}' -- required
AND organization_id = '{{ organization_id }}' -- required unless CLICKHOUSE_ORG_ID is set
;
```
</TabItem>
<TabItem value="list">

**Disclaimer:** This beta endpoint is evolving; the API contract may change. &lt;br /&gt;&lt;br /&gt; Returns the configured ClickHouse settings for the service. Only settings that have been explicitly set are included.

```sql
SELECT
settings
FROM clickhouse.services.clickhouse_settings
WHERE service_id = '{{ service_id }}' -- required
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

**Disclaimer:** This beta endpoint is evolving; the API contract may change. &lt;br /&gt;&lt;br /&gt; Updates one or more ClickHouse settings for the service. To reset a setting to its platform default, use the &#91;DELETE single setting&#93;(#tag/Service/operation/serviceClickhouseSettingDelete) endpoint. Use the &#91;schema endpoint&#93;(#tag/Service/operation/serviceClickhouseSettingsSchemaGet) to discover which settings are configurable.

```sql
UPDATE clickhouse.services.clickhouse_settings
SET 
settings = '{{ settings }}'
WHERE 
service_id = '{{ service_id }}' --required
AND organization_id = '{{ organization_id }}' --required unless CLICKHOUSE_ORG_ID is set
AND settings = '{{ settings }}' --required
RETURNING
request_id,
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

**Disclaimer:** This beta endpoint is evolving; the API contract may change. &lt;br /&gt;&lt;br /&gt; Removes a previously-configured ClickHouse setting, reverting its effective value to the platform default. Settings under `spec.extraConfig.server.*` (e.g. `keep_alive_timeout`, `shared_merge_tree_disable_merges_and_mutations_assignment`) trigger a ClickHouse server rollout restart; other settings propagate to all replicas after a short delay. Deleting a setting that was never configured is a no-op (200 OK).

```sql
DELETE FROM clickhouse.services.clickhouse_settings
WHERE service_id = '{{ service_id }}' --required
AND setting_name = '{{ setting_name }}' --required
AND organization_id = '{{ organization_id }}' --required unless CLICKHOUSE_ORG_ID is set
;
```
</TabItem>
</Tabs>

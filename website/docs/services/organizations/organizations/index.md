--- 
title: organizations
hide_title: false
hide_table_of_contents: false
keywords:
  - organizations
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

Creates, updates, deletes, gets or lists an <code>organizations</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="organizations" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="clickhouse.organizations.organizations" /></td></tr>
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
    <td><CopyableCode code="id" /></td>
    <td><code>string (uuid)</code></td>
    <td>Unique organization ID.</td>
</tr>
<tr>
    <td><CopyableCode code="name" /></td>
    <td><code>string</code></td>
    <td>Name of the organization.</td>
</tr>
<tr>
    <td><CopyableCode code="byoc_config" /></td>
    <td><code>array</code></td>
    <td>BYOC configuration for the organization (wire: byocConfig)</td>
</tr>
<tr>
    <td><CopyableCode code="created_at" /></td>
    <td><code>string (date-time)</code></td>
    <td>The timestamp the organization was created. ISO-8601. (wire: createdAt)</td>
</tr>
<tr>
    <td><CopyableCode code="enable_core_dumps" /></td>
    <td><code>boolean</code></td>
    <td>Whether crash reports (core dumps) collection is enabled for services in the organization. When disabled at the organization level, individual services cannot enable crash reports. (wire: enableCoreDumps)</td>
</tr>
<tr>
    <td><CopyableCode code="private_endpoints" /></td>
    <td><code>array</code></td>
    <td>List of private endpoints for organization (wire: privateEndpoints)</td>
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
    <td><CopyableCode code="id" /></td>
    <td><code>string (uuid)</code></td>
    <td>Unique organization ID.</td>
</tr>
<tr>
    <td><CopyableCode code="name" /></td>
    <td><code>string</code></td>
    <td>Name of the organization.</td>
</tr>
<tr>
    <td><CopyableCode code="byoc_config" /></td>
    <td><code>array</code></td>
    <td>BYOC configuration for the organization (wire: byocConfig)</td>
</tr>
<tr>
    <td><CopyableCode code="created_at" /></td>
    <td><code>string (date-time)</code></td>
    <td>The timestamp the organization was created. ISO-8601. (wire: createdAt)</td>
</tr>
<tr>
    <td><CopyableCode code="enable_core_dumps" /></td>
    <td><code>boolean</code></td>
    <td>Whether crash reports (core dumps) collection is enabled for services in the organization. When disabled at the organization level, individual services cannot enable crash reports. (wire: enableCoreDumps)</td>
</tr>
<tr>
    <td><CopyableCode code="private_endpoints" /></td>
    <td><code>array</code></td>
    <td>List of private endpoints for organization (wire: privateEndpoints)</td>
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
    <td><a href="#parameter-organizationId"><code>organizationId</code></a>, <a href="#parameter-organization_id"><code>organization_id</code></a></td>
    <td></td>
    <td>Returns details of a single organization. In order to get the details, the auth key must belong to the organization.</td>
</tr>
<tr>
    <td><a href="#list"><CopyableCode code="list" /></a></td>
    <td><CopyableCode code="select" /></td>
    <td><a href="#parameter-organization_id"><code>organization_id</code></a></td>
    <td></td>
    <td>Returns a list with a single organization associated with the API key in the request.</td>
</tr>
<tr>
    <td><a href="#update"><CopyableCode code="update" /></a></td>
    <td><CopyableCode code="update" /></td>
    <td><a href="#parameter-organizationId"><code>organizationId</code></a>, <a href="#parameter-organization_id"><code>organization_id</code></a></td>
    <td></td>
    <td>Updates organization fields. Requires ADMIN auth key role.</td>
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
    <td><code>string (uuid)</code></td>
    <td>ID of the organization to update.</td>
</tr>
<tr id="parameter-organization_id">
    <td><CopyableCode code="organization_id" /></td>
    <td><code>string</code></td>
    <td>ClickHouse Cloud organization ID. Resolved from the CLICKHOUSE_ORG_ID environment variable when it is set (x-stackQL-envVar); otherwise it must be supplied on every query as WHERE organization_id = &lt;uuid&gt;. A WHERE value always takes precedence over the environment. (x-stackQL-envVar: CLICKHOUSE_ORG_ID)</td>
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

Returns details of a single organization. In order to get the details, the auth key must belong to the organization.

```sql
SELECT
id,
name,
byoc_config,
created_at,
enable_core_dumps,
private_endpoints
FROM clickhouse.organizations.organizations
WHERE organizationId = '{{ organizationId }}' -- required
AND organization_id = '{{ organization_id }}' -- required unless CLICKHOUSE_ORG_ID is set
;
```
</TabItem>
<TabItem value="list">

Returns a list with a single organization associated with the API key in the request.

```sql
SELECT
id,
name,
byoc_config,
created_at,
enable_core_dumps,
private_endpoints
FROM clickhouse.organizations.organizations
WHERE organization_id = '{{ organization_id }}' -- required unless CLICKHOUSE_ORG_ID is set
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

Updates organization fields. Requires ADMIN auth key role.

```sql
UPDATE clickhouse.organizations.organizations
SET 
name = '{{ name }}',
private_endpoints = '{{ private_endpoints }}',
enable_core_dumps = {{ enable_core_dumps }}
WHERE 
organizationId = '{{ organizationId }}' --required
AND organization_id = '{{ organization_id }}' --required unless CLICKHOUSE_ORG_ID is set
RETURNING
request_id,
result,
status;
```
</TabItem>
</Tabs>

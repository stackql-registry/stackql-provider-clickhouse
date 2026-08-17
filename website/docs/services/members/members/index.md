--- 
title: members
hide_title: false
hide_table_of_contents: false
keywords:
  - members
  - members
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

Creates, updates, deletes, gets or lists a <code>members</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="members" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="clickhouse.members.members" /></td></tr>
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
    <td>Name of the member as set a personal user profile.</td>
</tr>
<tr>
    <td><CopyableCode code="assignedRoles" /></td>
    <td><code>array</code></td>
    <td>Custom roles and System roles assigned to this member</td>
</tr>
<tr>
    <td><CopyableCode code="email" /></td>
    <td><code>string (email)</code></td>
    <td>Email of the member as set in personal user profile.</td>
</tr>
<tr>
    <td><CopyableCode code="joinedAt" /></td>
    <td><code>string (date-time)</code></td>
    <td>Timestamp the member joined the organization. ISO-8601.</td>
</tr>
<tr>
    <td><CopyableCode code="role" /></td>
    <td><code>string</code></td>
    <td>DEPRECATED. Use `assignedRoles` instead. Role of the member in the organization. For organizations that have migrated to custom roles, this field is frozen at the pre-migration value and does not reflect current role assignments. (admin, developer)</td>
</tr>
<tr>
    <td><CopyableCode code="userId" /></td>
    <td><code>string</code></td>
    <td>Unique user ID. If a user is a member in multiple organizations this ID will stay the same.</td>
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
    <td>Name of the member as set a personal user profile.</td>
</tr>
<tr>
    <td><CopyableCode code="assignedRoles" /></td>
    <td><code>array</code></td>
    <td>Custom roles and System roles assigned to this member</td>
</tr>
<tr>
    <td><CopyableCode code="email" /></td>
    <td><code>string (email)</code></td>
    <td>Email of the member as set in personal user profile.</td>
</tr>
<tr>
    <td><CopyableCode code="joinedAt" /></td>
    <td><code>string (date-time)</code></td>
    <td>Timestamp the member joined the organization. ISO-8601.</td>
</tr>
<tr>
    <td><CopyableCode code="role" /></td>
    <td><code>string</code></td>
    <td>DEPRECATED. Use `assignedRoles` instead. Role of the member in the organization. For organizations that have migrated to custom roles, this field is frozen at the pre-migration value and does not reflect current role assignments. (admin, developer)</td>
</tr>
<tr>
    <td><CopyableCode code="userId" /></td>
    <td><code>string</code></td>
    <td>Unique user ID. If a user is a member in multiple organizations this ID will stay the same.</td>
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
    <td><a href="#parameter-userId"><code>userId</code></a>, <a href="#parameter-organizationId"><code>organizationId</code></a></td>
    <td></td>
    <td>Returns a single organization member details.</td>
</tr>
<tr>
    <td><a href="#list"><CopyableCode code="list" /></a></td>
    <td><CopyableCode code="select" /></td>
    <td><a href="#parameter-organizationId"><code>organizationId</code></a></td>
    <td></td>
    <td>Returns a list of all members in the organization.</td>
</tr>
<tr>
    <td><a href="#update"><CopyableCode code="update" /></a></td>
    <td><CopyableCode code="update" /></td>
    <td><a href="#parameter-userId"><code>userId</code></a>, <a href="#parameter-organizationId"><code>organizationId</code></a></td>
    <td></td>
    <td>Updates organization member role.</td>
</tr>
<tr>
    <td><a href="#delete"><CopyableCode code="delete" /></a></td>
    <td><CopyableCode code="delete" /></td>
    <td><a href="#parameter-userId"><code>userId</code></a>, <a href="#parameter-organizationId"><code>organizationId</code></a></td>
    <td></td>
    <td>Removes a user from the organization</td>
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
<tr id="parameter-userId">
    <td><CopyableCode code="userId" /></td>
    <td><code>string (uuid)</code></td>
    <td>ID of the requested user.</td>
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

Returns a single organization member details.

```sql
SELECT
name,
assignedRoles,
email,
joinedAt,
role,
userId
FROM clickhouse.members.members
WHERE userId = '{{ userId }}' -- required
AND organizationId = '{{ organizationId }}' -- required unless CLICKHOUSE_ORG_ID is set
;
```
</TabItem>
<TabItem value="list">

Returns a list of all members in the organization.

```sql
SELECT
name,
assignedRoles,
email,
joinedAt,
role,
userId
FROM clickhouse.members.members
WHERE organizationId = '{{ organizationId }}' -- required unless CLICKHOUSE_ORG_ID is set
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

Updates organization member role.

```sql
UPDATE clickhouse.members.members
SET 
role = '{{ role }}',
assignedRoleIds = '{{ assignedRoleIds }}'
WHERE 
userId = '{{ userId }}' --required
AND organizationId = '{{ organizationId }}' --required unless CLICKHOUSE_ORG_ID is set
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

Removes a user from the organization

```sql
DELETE FROM clickhouse.members.members
WHERE userId = '{{ userId }}' --required
AND organizationId = '{{ organizationId }}' --required unless CLICKHOUSE_ORG_ID is set
;
```
</TabItem>
</Tabs>

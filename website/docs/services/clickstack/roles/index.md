--- 
title: roles
hide_title: false
hide_table_of_contents: false
keywords:
  - roles
  - clickstack
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

Creates, updates, deletes, gets or lists a <code>roles</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="roles" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="clickhouse.clickstack.roles" /></td></tr>
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
    <td><code>string</code></td>
    <td>Role ID. (example: 507f1f77bcf86cd799439011)</td>
</tr>
<tr>
    <td><CopyableCode code="name" /></td>
    <td><code>string</code></td>
    <td>Role name. (example: Read Only)</td>
</tr>
<tr>
    <td><CopyableCode code="createdAt" /></td>
    <td><code>string (date-time)</code></td>
    <td>Creation timestamp. (example: 2025-01-01T00:00:00.000Z)</td>
</tr>
<tr>
    <td><CopyableCode code="description" /></td>
    <td><code>string</code></td>
    <td>Human-readable role description. (example: Read-only access to all resources)</td>
</tr>
<tr>
    <td><CopyableCode code="isPredefined" /></td>
    <td><code>boolean</code></td>
    <td>Whether this is an immutable predefined/system role.</td>
</tr>
<tr>
    <td><CopyableCode code="permissions" /></td>
    <td><code>array</code></td>
    <td>The CASL permissions granted by this role.</td>
</tr>
<tr>
    <td><CopyableCode code="updatedAt" /></td>
    <td><code>string (date-time)</code></td>
    <td>Last update timestamp. (example: 2025-06-15T10:30:00.000Z)</td>
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
    <td><code>string</code></td>
    <td>Role ID. (example: 507f1f77bcf86cd799439011)</td>
</tr>
<tr>
    <td><CopyableCode code="name" /></td>
    <td><code>string</code></td>
    <td>Role name. (example: Read Only)</td>
</tr>
<tr>
    <td><CopyableCode code="createdAt" /></td>
    <td><code>string (date-time)</code></td>
    <td>Creation timestamp. (example: 2025-01-01T00:00:00.000Z)</td>
</tr>
<tr>
    <td><CopyableCode code="description" /></td>
    <td><code>string</code></td>
    <td>Human-readable role description. (example: Read-only access to all resources)</td>
</tr>
<tr>
    <td><CopyableCode code="isPredefined" /></td>
    <td><code>boolean</code></td>
    <td>Whether this is an immutable predefined/system role.</td>
</tr>
<tr>
    <td><CopyableCode code="permissions" /></td>
    <td><code>array</code></td>
    <td>The CASL permissions granted by this role.</td>
</tr>
<tr>
    <td><CopyableCode code="updatedAt" /></td>
    <td><code>string (date-time)</code></td>
    <td>Last update timestamp. (example: 2025-06-15T10:30:00.000Z)</td>
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
    <td><a href="#parameter-serviceId"><code>serviceId</code></a>, <a href="#parameter-clickStackRoleId"><code>clickStackRoleId</code></a>, <a href="#parameter-organizationId"><code>organizationId</code></a></td>
    <td></td>
    <td>**This endpoint is in beta.** API contract is stable, and no breaking changes are expected in the future. &lt;br /&gt;&lt;br /&gt; ClickStack: Retrieves a specific role by ID.</td>
</tr>
<tr>
    <td><a href="#list"><CopyableCode code="list" /></a></td>
    <td><CopyableCode code="select" /></td>
    <td><a href="#parameter-serviceId"><code>serviceId</code></a>, <a href="#parameter-organizationId"><code>organizationId</code></a></td>
    <td></td>
    <td>**This endpoint is in beta.** API contract is stable, and no breaking changes are expected in the future. &lt;br /&gt;&lt;br /&gt; ClickStack: Retrieves all roles for the authenticated team, including predefined roles.</td>
</tr>
<tr>
    <td><a href="#create"><CopyableCode code="create" /></a></td>
    <td><CopyableCode code="insert" /></td>
    <td><a href="#parameter-serviceId"><code>serviceId</code></a>, <a href="#parameter-organizationId"><code>organizationId</code></a>, <a href="#parameter-name"><code>name</code></a>, <a href="#parameter-permissions"><code>permissions</code></a></td>
    <td></td>
    <td>**This endpoint is in beta.** API contract is stable, and no breaking changes are expected in the future. &lt;br /&gt;&lt;br /&gt; ClickStack: Creates a new custom role for the team.</td>
</tr>
<tr>
    <td><a href="#update"><CopyableCode code="update" /></a></td>
    <td><CopyableCode code="update" /></td>
    <td><a href="#parameter-serviceId"><code>serviceId</code></a>, <a href="#parameter-clickStackRoleId"><code>clickStackRoleId</code></a>, <a href="#parameter-organizationId"><code>organizationId</code></a>, <a href="#parameter-permissions"><code>permissions</code></a></td>
    <td></td>
    <td>**This endpoint is in beta.** API contract is stable, and no breaking changes are expected in the future. &lt;br /&gt;&lt;br /&gt; ClickStack: Updates a custom role's permissions, name, and description. Predefined roles cannot be modified.</td>
</tr>
<tr>
    <td><a href="#delete"><CopyableCode code="delete" /></a></td>
    <td><CopyableCode code="delete" /></td>
    <td><a href="#parameter-serviceId"><code>serviceId</code></a>, <a href="#parameter-clickStackRoleId"><code>clickStackRoleId</code></a>, <a href="#parameter-organizationId"><code>organizationId</code></a></td>
    <td></td>
    <td>**This endpoint is in beta.** API contract is stable, and no breaking changes are expected in the future. &lt;br /&gt;&lt;br /&gt; ClickStack: Deletes a custom role. Predefined roles, the team default user role, and roles assigned to users cannot be deleted.</td>
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
<tr id="parameter-clickStackRoleId">
    <td><CopyableCode code="clickStackRoleId" /></td>
    <td><code>string</code></td>
    <td>id parameter</td>
</tr>
<tr id="parameter-organizationId">
    <td><CopyableCode code="organizationId" /></td>
    <td><code>string</code></td>
    <td>ClickHouse Cloud organization ID. Resolved from the CLICKHOUSE_ORG_ID environment variable when it is set (x-stackQL-envVar); otherwise it must be supplied on every query as WHERE organizationId = &lt;uuid&gt;. A WHERE value always takes precedence over the environment. (x-stackQL-envVar: CLICKHOUSE_ORG_ID)</td>
</tr>
<tr id="parameter-serviceId">
    <td><CopyableCode code="serviceId" /></td>
    <td><code>string (uuid)</code></td>
    <td>ID of the ClickStack service.</td>
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

**This endpoint is in beta.** API contract is stable, and no breaking changes are expected in the future. &lt;br /&gt;&lt;br /&gt; ClickStack: Retrieves a specific role by ID.

```sql
SELECT
id,
name,
createdAt,
description,
isPredefined,
permissions,
updatedAt
FROM clickhouse.clickstack.roles
WHERE serviceId = '{{ serviceId }}' -- required
AND clickStackRoleId = '{{ clickStackRoleId }}' -- required
AND organizationId = '{{ organizationId }}' -- required unless CLICKHOUSE_ORG_ID is set
;
```
</TabItem>
<TabItem value="list">

**This endpoint is in beta.** API contract is stable, and no breaking changes are expected in the future. &lt;br /&gt;&lt;br /&gt; ClickStack: Retrieves all roles for the authenticated team, including predefined roles.

```sql
SELECT
id,
name,
createdAt,
description,
isPredefined,
permissions,
updatedAt
FROM clickhouse.clickstack.roles
WHERE serviceId = '{{ serviceId }}' -- required
AND organizationId = '{{ organizationId }}' -- required unless CLICKHOUSE_ORG_ID is set
;
```
</TabItem>
</Tabs>


## `INSERT` examples

<Tabs
    defaultValue="create"
    values={[
        { label: 'create', value: 'create' },
        { label: 'Manifest', value: 'manifest' }
    ]}
>
<TabItem value="create">

**This endpoint is in beta.** API contract is stable, and no breaking changes are expected in the future. &lt;br /&gt;&lt;br /&gt; ClickStack: Creates a new custom role for the team.

```sql
INSERT INTO clickhouse.clickstack.roles (
name,
description,
permissions,
serviceId,
organizationId
)
SELECT 
'{{ name }}' /* required */,
'{{ description }}',
'{{ permissions }}' /* required */,
'{{ serviceId }}',
'{{ organizationId }}'
RETURNING
requestId,
result,
status
;
```
</TabItem>
<TabItem value="manifest">

<CodeBlock language="yaml">{`# Description fields are for documentation purposes
- name: roles
  props:
    - name: serviceId
      value: "{{ serviceId }}"
      description: Required parameter for the roles resource.
    - name: organizationId
      value: "{{ organizationId }}"
      description: Required parameter for the roles resource.
    - name: name
      value: "{{ name }}"
      description: |
        Role name. Must be unique within the team and not collide with a predefined role.
    - name: description
      value: "{{ description }}"
      description: |
        Human-readable role description.
    - name: permissions
      description: |
        The CASL permissions to grant to the role.
      value:
        - action: "{{ action }}"
          subject: "{{ subject }}"
          inverted: {{ inverted }}
          integration: "{{ integration }}"
          conditions: "{{ conditions }}"
`}</CodeBlock>

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

**This endpoint is in beta.** API contract is stable, and no breaking changes are expected in the future. &lt;br /&gt;&lt;br /&gt; ClickStack: Updates a custom role's permissions, name, and description. Predefined roles cannot be modified.

```sql
UPDATE clickhouse.clickstack.roles
SET 
name = '{{ name }}',
description = '{{ description }}',
permissions = '{{ permissions }}'
WHERE 
serviceId = '{{ serviceId }}' --required
AND clickStackRoleId = '{{ clickStackRoleId }}' --required
AND organizationId = '{{ organizationId }}' --required unless CLICKHOUSE_ORG_ID is set
AND permissions = '{{ permissions }}' --required
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

**This endpoint is in beta.** API contract is stable, and no breaking changes are expected in the future. &lt;br /&gt;&lt;br /&gt; ClickStack: Deletes a custom role. Predefined roles, the team default user role, and roles assigned to users cannot be deleted.

```sql
DELETE FROM clickhouse.clickstack.roles
WHERE serviceId = '{{ serviceId }}' --required
AND clickStackRoleId = '{{ clickStackRoleId }}' --required
AND organizationId = '{{ organizationId }}' --required unless CLICKHOUSE_ORG_ID is set
;
```
</TabItem>
</Tabs>

--- 
title: roles
hide_title: false
hide_table_of_contents: false
keywords:
  - roles
  - roles
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
<tr><td><b>Id</b></td><td><CopyableCode code="clickhouse.roles.roles" /></td></tr>
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
    <td>Unique role identifier</td>
</tr>
<tr>
    <td><CopyableCode code="name" /></td>
    <td><code>string</code></td>
    <td>Name of the role</td>
</tr>
<tr>
    <td><CopyableCode code="actors" /></td>
    <td><code>array</code></td>
    <td>List of actor resource IDs assigned to this role (e.g., user/uuid, apiKey/uuid)</td>
</tr>
<tr>
    <td><CopyableCode code="createdAt" /></td>
    <td><code>string (date-time)</code></td>
    <td>Timestamp when the role was created. ISO-8601.</td>
</tr>
<tr>
    <td><CopyableCode code="ownerId" /></td>
    <td><code>string</code></td>
    <td>Owner resource ID (e.g., organization/uuid)</td>
</tr>
<tr>
    <td><CopyableCode code="policies" /></td>
    <td><code>array</code></td>
    <td>List of policies associated with this role</td>
</tr>
<tr>
    <td><CopyableCode code="tenantId" /></td>
    <td><code>string</code></td>
    <td>Tenant resource ID (e.g., organization/uuid)</td>
</tr>
<tr>
    <td><CopyableCode code="type" /></td>
    <td><code>string</code></td>
    <td>Whether this is a system role or a custom role (system, custom)</td>
</tr>
<tr>
    <td><CopyableCode code="updatedAt" /></td>
    <td><code>string (date-time)</code></td>
    <td>Timestamp when the role was last updated. ISO-8601.</td>
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
    <td>Unique role identifier</td>
</tr>
<tr>
    <td><CopyableCode code="name" /></td>
    <td><code>string</code></td>
    <td>Name of the role</td>
</tr>
<tr>
    <td><CopyableCode code="actors" /></td>
    <td><code>array</code></td>
    <td>List of actor resource IDs assigned to this role (e.g., user/uuid, apiKey/uuid)</td>
</tr>
<tr>
    <td><CopyableCode code="createdAt" /></td>
    <td><code>string (date-time)</code></td>
    <td>Timestamp when the role was created. ISO-8601.</td>
</tr>
<tr>
    <td><CopyableCode code="ownerId" /></td>
    <td><code>string</code></td>
    <td>Owner resource ID (e.g., organization/uuid)</td>
</tr>
<tr>
    <td><CopyableCode code="policies" /></td>
    <td><code>array</code></td>
    <td>List of policies associated with this role</td>
</tr>
<tr>
    <td><CopyableCode code="tenantId" /></td>
    <td><code>string</code></td>
    <td>Tenant resource ID (e.g., organization/uuid)</td>
</tr>
<tr>
    <td><CopyableCode code="type" /></td>
    <td><code>string</code></td>
    <td>Whether this is a system role or a custom role (system, custom)</td>
</tr>
<tr>
    <td><CopyableCode code="updatedAt" /></td>
    <td><code>string (date-time)</code></td>
    <td>Timestamp when the role was last updated. ISO-8601.</td>
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
    <td><a href="#parameter-roleId"><code>roleId</code></a>, <a href="#parameter-organizationId"><code>organizationId</code></a></td>
    <td></td>
    <td>Returns details for a specific role.</td>
</tr>
<tr>
    <td><a href="#list"><CopyableCode code="list" /></a></td>
    <td><CopyableCode code="select" /></td>
    <td><a href="#parameter-organizationId"><code>organizationId</code></a></td>
    <td></td>
    <td>Returns all available roles (system + custom) for an organization.</td>
</tr>
<tr>
    <td><a href="#create"><CopyableCode code="create" /></a></td>
    <td><CopyableCode code="insert" /></td>
    <td><a href="#parameter-organizationId"><code>organizationId</code></a>, <a href="#parameter-name"><code>name</code></a>, <a href="#parameter-actors"><code>actors</code></a>, <a href="#parameter-policies"><code>policies</code></a></td>
    <td></td>
    <td>Creates a new custom role for an organization with specified policies and actors.</td>
</tr>
<tr>
    <td><a href="#update"><CopyableCode code="update" /></a></td>
    <td><CopyableCode code="update" /></td>
    <td><a href="#parameter-roleId"><code>roleId</code></a>, <a href="#parameter-organizationId"><code>organizationId</code></a></td>
    <td></td>
    <td>Updates an existing custom role. System roles cannot be updated. All fields are optional - only provided fields will be updated.</td>
</tr>
<tr>
    <td><a href="#delete"><CopyableCode code="delete" /></a></td>
    <td><CopyableCode code="delete" /></td>
    <td><a href="#parameter-roleId"><code>roleId</code></a>, <a href="#parameter-organizationId"><code>organizationId</code></a></td>
    <td></td>
    <td>Deletes an existing custom role. System roles cannot be deleted. This operation will remove the role and all its associated policies.</td>
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
<tr id="parameter-roleId">
    <td><CopyableCode code="roleId" /></td>
    <td><code>string (uuid)</code></td>
    <td>ID of the requested role.</td>
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

Returns details for a specific role.

```sql
SELECT
id,
name,
actors,
createdAt,
ownerId,
policies,
tenantId,
type,
updatedAt
FROM clickhouse.roles.roles
WHERE roleId = '{{ roleId }}' -- required
AND organizationId = '{{ organizationId }}' -- required unless CLICKHOUSE_ORG_ID is set
;
```
</TabItem>
<TabItem value="list">

Returns all available roles (system + custom) for an organization.

```sql
SELECT
id,
name,
actors,
createdAt,
ownerId,
policies,
tenantId,
type,
updatedAt
FROM clickhouse.roles.roles
WHERE organizationId = '{{ organizationId }}' -- required unless CLICKHOUSE_ORG_ID is set
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

Creates a new custom role for an organization with specified policies and actors.

```sql
INSERT INTO clickhouse.roles.roles (
name,
actors,
policies,
organizationId
)
SELECT 
'{{ name }}' /* required */,
'{{ actors }}' /* required */,
'{{ policies }}' /* required */,
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
    - name: organizationId
      value: "{{ organizationId }}"
      description: Required parameter for the roles resource.
    - name: name
      value: "{{ name }}"
      description: |
        Name of the role
    - name: actors
      value:
        - "{{ actors }}"
      description: |
        List of actor resource IDs to assign to this role (e.g., ["user/uuid", "apiKey/uuid"])
    - name: policies
      description: |
        List of policies to create for this role
      value:
        - allowDeny: "{{ allowDeny }}"
          permissions: "{{ permissions }}"
          resources: "{{ resources }}"
          tags:
            grants:
              - "{{ grants }}"
            roleV2: "{{ roleV2 }}"
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

Updates an existing custom role. System roles cannot be updated. All fields are optional - only provided fields will be updated.

```sql
UPDATE clickhouse.roles.roles
SET 
name = '{{ name }}',
actors = '{{ actors }}',
policies = '{{ policies }}'
WHERE 
roleId = '{{ roleId }}' --required
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

Deletes an existing custom role. System roles cannot be deleted. This operation will remove the role and all its associated policies.

```sql
DELETE FROM clickhouse.roles.roles
WHERE roleId = '{{ roleId }}' --required
AND organizationId = '{{ organizationId }}' --required unless CLICKHOUSE_ORG_ID is set
;
```
</TabItem>
</Tabs>

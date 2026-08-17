--- 
title: invitations
hide_title: false
hide_table_of_contents: false
keywords:
  - invitations
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

Creates, updates, deletes, gets or lists an <code>invitations</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="invitations" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="clickhouse.members.invitations" /></td></tr>
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
    <td>Unique invitation ID.</td>
</tr>
<tr>
    <td><CopyableCode code="assignedRoles" /></td>
    <td><code>array</code></td>
    <td>Custom roles and System roles that will be assigned to the user when they accept the invitation</td>
</tr>
<tr>
    <td><CopyableCode code="createdAt" /></td>
    <td><code>string (date-time)</code></td>
    <td>Invitation creation timestamp. ISO-8601.</td>
</tr>
<tr>
    <td><CopyableCode code="email" /></td>
    <td><code>string (email)</code></td>
    <td>Email of the invited user. Only a user with this email can join using the invitation. The email is stored in a lowercase form.</td>
</tr>
<tr>
    <td><CopyableCode code="expireAt" /></td>
    <td><code>string (date-time)</code></td>
    <td>Timestamp the invitation expires. ISO-8601.</td>
</tr>
<tr>
    <td><CopyableCode code="role" /></td>
    <td><code>string</code></td>
    <td>DEPRECATED. Use `assignedRoles` instead. Role of the invited user in the organization. For organizations that have migrated to custom roles, this field is frozen at the pre-migration value and does not reflect the role assignment that will be applied. (admin, developer)</td>
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
    <td>Unique invitation ID.</td>
</tr>
<tr>
    <td><CopyableCode code="assignedRoles" /></td>
    <td><code>array</code></td>
    <td>Custom roles and System roles that will be assigned to the user when they accept the invitation</td>
</tr>
<tr>
    <td><CopyableCode code="createdAt" /></td>
    <td><code>string (date-time)</code></td>
    <td>Invitation creation timestamp. ISO-8601.</td>
</tr>
<tr>
    <td><CopyableCode code="email" /></td>
    <td><code>string (email)</code></td>
    <td>Email of the invited user. Only a user with this email can join using the invitation. The email is stored in a lowercase form.</td>
</tr>
<tr>
    <td><CopyableCode code="expireAt" /></td>
    <td><code>string (date-time)</code></td>
    <td>Timestamp the invitation expires. ISO-8601.</td>
</tr>
<tr>
    <td><CopyableCode code="role" /></td>
    <td><code>string</code></td>
    <td>DEPRECATED. Use `assignedRoles` instead. Role of the invited user in the organization. For organizations that have migrated to custom roles, this field is frozen at the pre-migration value and does not reflect the role assignment that will be applied. (admin, developer)</td>
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
    <td><a href="#parameter-invitationId"><code>invitationId</code></a>, <a href="#parameter-organization_id"><code>organization_id</code></a></td>
    <td></td>
    <td>Returns details for a single organization invitation.</td>
</tr>
<tr>
    <td><a href="#list"><CopyableCode code="list" /></a></td>
    <td><CopyableCode code="select" /></td>
    <td><a href="#parameter-organization_id"><code>organization_id</code></a></td>
    <td></td>
    <td>Returns list of all organization invitations.</td>
</tr>
<tr>
    <td><a href="#create"><CopyableCode code="create" /></a></td>
    <td><CopyableCode code="insert" /></td>
    <td><a href="#parameter-organization_id"><code>organization_id</code></a></td>
    <td></td>
    <td>Creates organization invitation.</td>
</tr>
<tr>
    <td><a href="#delete"><CopyableCode code="delete" /></a></td>
    <td><CopyableCode code="delete" /></td>
    <td><a href="#parameter-invitationId"><code>invitationId</code></a>, <a href="#parameter-organization_id"><code>organization_id</code></a></td>
    <td></td>
    <td>Deletes a single organization invitation.</td>
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
<tr id="parameter-invitationId">
    <td><CopyableCode code="invitationId" /></td>
    <td><code>string (uuid)</code></td>
    <td>ID of the requested organization.</td>
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

Returns details for a single organization invitation.

```sql
SELECT
id,
assignedRoles,
createdAt,
email,
expireAt,
role
FROM clickhouse.members.invitations
WHERE invitationId = '{{ invitationId }}' -- required
AND organization_id = '{{ organization_id }}' -- required unless CLICKHOUSE_ORG_ID is set
;
```
</TabItem>
<TabItem value="list">

Returns list of all organization invitations.

```sql
SELECT
id,
assignedRoles,
createdAt,
email,
expireAt,
role
FROM clickhouse.members.invitations
WHERE organization_id = '{{ organization_id }}' -- required unless CLICKHOUSE_ORG_ID is set
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

Creates organization invitation.

```sql
INSERT INTO clickhouse.members.invitations (
email,
role,
assignedRoleIds,
organization_id
)
SELECT 
'{{ email }}',
'{{ role }}',
'{{ assignedRoleIds }}',
'{{ organization_id }}'
RETURNING
requestId,
result,
status
;
```
</TabItem>
<TabItem value="manifest">

<CodeBlock language="yaml">{`# Description fields are for documentation purposes
- name: invitations
  props:
    - name: organization_id
      value: "{{ organization_id }}"
      description: Required parameter for the invitations resource.
    - name: email
      value: "{{ email }}"
      description: |
        Email of the invited user. Only a user with this email can join using the invitation. The email is stored in a lowercase form.
    - name: role
      value: "{{ role }}"
      description: |
        DEPRECATED. Use \`assignedRoleIds\` instead. Role to assign to the invited user in the organization.
      valid_values: ['admin', 'developer']
    - name: assignedRoleIds
      value:
        - "{{ assignedRoleIds }}"
      description: |
        List of role IDs to assign to the invited user when they accept the invitation
`}</CodeBlock>

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

Deletes a single organization invitation.

```sql
DELETE FROM clickhouse.members.invitations
WHERE invitationId = '{{ invitationId }}' --required
AND organization_id = '{{ organization_id }}' --required unless CLICKHOUSE_ORG_ID is set
;
```
</TabItem>
</Tabs>

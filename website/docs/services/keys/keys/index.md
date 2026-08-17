--- 
title: keys
hide_title: false
hide_table_of_contents: false
keywords:
  - keys
  - keys
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

Creates, updates, deletes, gets or lists a <code>keys</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="keys" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="clickhouse.keys.keys" /></td></tr>
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
    <td>Unique API key ID.</td>
</tr>
<tr>
    <td><CopyableCode code="name" /></td>
    <td><code>string</code></td>
    <td>Name of the key</td>
</tr>
<tr>
    <td><CopyableCode code="assignedRoles" /></td>
    <td><code>array</code></td>
    <td>Custom roles and System roles assigned to this API key</td>
</tr>
<tr>
    <td><CopyableCode code="createdAt" /></td>
    <td><code>string (date-time)</code></td>
    <td>Timestamp the key was created. ISO-8601.</td>
</tr>
<tr>
    <td><CopyableCode code="expireAt" /></td>
    <td><code>string (date-time)</code></td>
    <td>Timestamp the key expires. If not present, `null` or is empty the key never expires. ISO-8601.</td>
</tr>
<tr>
    <td><CopyableCode code="ipAccessList" /></td>
    <td><code>array</code></td>
    <td>List of IP addresses allowed to access the API using this key</td>
</tr>
<tr>
    <td><CopyableCode code="keySuffix" /></td>
    <td><code>string</code></td>
    <td>Last 4 letters of the key.</td>
</tr>
<tr>
    <td><CopyableCode code="roles" /></td>
    <td><code>array</code></td>
    <td>DEPRECATED. Use `assignedRoles` instead. List of roles assigned to the key. For organizations that have migrated to custom roles, this field is frozen at the pre-migration value and does not reflect current role assignments.</td>
</tr>
<tr>
    <td><CopyableCode code="state" /></td>
    <td><code>string</code></td>
    <td>State of the key: 'enabled', 'disabled'. (enabled, disabled)</td>
</tr>
<tr>
    <td><CopyableCode code="usedAt" /></td>
    <td><code>string (date-time)</code></td>
    <td>Timestamp the key was used last time, with one-minute precision. If not present the key was never used. ISO-8601.</td>
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
    <td>Unique API key ID.</td>
</tr>
<tr>
    <td><CopyableCode code="name" /></td>
    <td><code>string</code></td>
    <td>Name of the key</td>
</tr>
<tr>
    <td><CopyableCode code="assignedRoles" /></td>
    <td><code>array</code></td>
    <td>Custom roles and System roles assigned to this API key</td>
</tr>
<tr>
    <td><CopyableCode code="createdAt" /></td>
    <td><code>string (date-time)</code></td>
    <td>Timestamp the key was created. ISO-8601.</td>
</tr>
<tr>
    <td><CopyableCode code="expireAt" /></td>
    <td><code>string (date-time)</code></td>
    <td>Timestamp the key expires. If not present, `null` or is empty the key never expires. ISO-8601.</td>
</tr>
<tr>
    <td><CopyableCode code="ipAccessList" /></td>
    <td><code>array</code></td>
    <td>List of IP addresses allowed to access the API using this key</td>
</tr>
<tr>
    <td><CopyableCode code="keySuffix" /></td>
    <td><code>string</code></td>
    <td>Last 4 letters of the key.</td>
</tr>
<tr>
    <td><CopyableCode code="roles" /></td>
    <td><code>array</code></td>
    <td>DEPRECATED. Use `assignedRoles` instead. List of roles assigned to the key. For organizations that have migrated to custom roles, this field is frozen at the pre-migration value and does not reflect current role assignments.</td>
</tr>
<tr>
    <td><CopyableCode code="state" /></td>
    <td><code>string</code></td>
    <td>State of the key: 'enabled', 'disabled'. (enabled, disabled)</td>
</tr>
<tr>
    <td><CopyableCode code="usedAt" /></td>
    <td><code>string (date-time)</code></td>
    <td>Timestamp the key was used last time, with one-minute precision. If not present the key was never used. ISO-8601.</td>
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
    <td><a href="#parameter-keyId"><code>keyId</code></a>, <a href="#parameter-organization_id"><code>organization_id</code></a></td>
    <td></td>
    <td>Returns a single key details.</td>
</tr>
<tr>
    <td><a href="#list"><CopyableCode code="list" /></a></td>
    <td><CopyableCode code="select" /></td>
    <td><a href="#parameter-organization_id"><code>organization_id</code></a></td>
    <td></td>
    <td>Returns a list of all keys in the organization.</td>
</tr>
<tr>
    <td><a href="#create"><CopyableCode code="create" /></a></td>
    <td><CopyableCode code="insert" /></td>
    <td><a href="#parameter-organization_id"><code>organization_id</code></a></td>
    <td></td>
    <td>Creates new API key.</td>
</tr>
<tr>
    <td><a href="#update"><CopyableCode code="update" /></a></td>
    <td><CopyableCode code="update" /></td>
    <td><a href="#parameter-keyId"><code>keyId</code></a>, <a href="#parameter-organization_id"><code>organization_id</code></a></td>
    <td></td>
    <td>Updates API key properties.</td>
</tr>
<tr>
    <td><a href="#delete"><CopyableCode code="delete" /></a></td>
    <td><CopyableCode code="delete" /></td>
    <td><a href="#parameter-keyId"><code>keyId</code></a>, <a href="#parameter-organization_id"><code>organization_id</code></a></td>
    <td></td>
    <td>Deletes API key. Only a key not used to authenticate the active request can be deleted.</td>
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
<tr id="parameter-keyId">
    <td><CopyableCode code="keyId" /></td>
    <td><code>string (uuid)</code></td>
    <td>ID of the key to delete.</td>
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

Returns a single key details.

```sql
SELECT
id,
name,
assignedRoles,
createdAt,
expireAt,
ipAccessList,
keySuffix,
roles,
state,
usedAt
FROM clickhouse.keys.keys
WHERE keyId = '{{ keyId }}' -- required
AND organization_id = '{{ organization_id }}' -- required unless CLICKHOUSE_ORG_ID is set
;
```
</TabItem>
<TabItem value="list">

Returns a list of all keys in the organization.

```sql
SELECT
id,
name,
assignedRoles,
createdAt,
expireAt,
ipAccessList,
keySuffix,
roles,
state,
usedAt
FROM clickhouse.keys.keys
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

Creates new API key.

```sql
INSERT INTO clickhouse.keys.keys (
name,
expireAt,
state,
hashData,
roles,
assignedRoleIds,
ipAccessList,
organization_id
)
SELECT 
'{{ name }}',
'{{ expireAt }}',
'{{ state }}',
'{{ hashData }}',
'{{ roles }}',
'{{ assignedRoleIds }}',
'{{ ipAccessList }}',
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
- name: keys
  props:
    - name: organization_id
      value: "{{ organization_id }}"
      description: Required parameter for the keys resource.
    - name: name
      value: "{{ name }}"
      description: |
        Name of the key.
    - name: expireAt
      value: "{{ expireAt }}"
      description: |
        Timestamp the key expires. If not present, \`null\` or is empty the key never expires. ISO-8601.
    - name: state
      value: "{{ state }}"
      description: |
        Initial state of the key: 'enabled', 'disabled'. If not provided the new key will be 'enabled'.
      valid_values: ['enabled', 'disabled']
    - name: hashData
      value:
        keyIdHash: "{{ keyIdHash }}"
        keyIdSuffix: "{{ keyIdSuffix }}"
        keySecretHash: "{{ keySecretHash }}"
    - name: roles
      value:
        - "{{ roles }}"
      description: |
        DEPRECATED. Use \`assignedRoleIds\` instead. List of roles assigned to the key. Contains at least 1 element.
    - name: assignedRoleIds
      value:
        - "{{ assignedRoleIds }}"
      description: |
        Array of role UUIDs to assign to the API key
    - name: ipAccessList
      description: |
        List of IP addresses allowed to access the API using this key
      value:
        - source: "{{ source }}"
          description: "{{ description }}"
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

Updates API key properties.

```sql
UPDATE clickhouse.keys.keys
SET 
name = '{{ name }}',
roles = '{{ roles }}',
assignedRoleIds = '{{ assignedRoleIds }}',
expireAt = '{{ expireAt }}',
state = '{{ state }}',
ipAccessList = '{{ ipAccessList }}'
WHERE 
keyId = '{{ keyId }}' --required
AND organization_id = '{{ organization_id }}' --required unless CLICKHOUSE_ORG_ID is set
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

Deletes API key. Only a key not used to authenticate the active request can be deleted.

```sql
DELETE FROM clickhouse.keys.keys
WHERE keyId = '{{ keyId }}' --required
AND organization_id = '{{ organization_id }}' --required unless CLICKHOUSE_ORG_ID is set
;
```
</TabItem>
</Tabs>

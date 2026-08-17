--- 
title: backup_buckets
hide_title: false
hide_table_of_contents: false
keywords:
  - backup_buckets
  - backups
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

Creates, updates, deletes, gets or lists a <code>backup_buckets</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="backup_buckets" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="clickhouse.backups.backup_buckets" /></td></tr>
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
    <td><CopyableCode code="id" /></td>
    <td><code>string (uuid)</code></td>
    <td>Unique backup bucket ID</td>
</tr>
<tr>
    <td><CopyableCode code="accessKeyId" /></td>
    <td><code>string</code></td>
    <td>Access Key ID (HMAC key)</td>
</tr>
<tr>
    <td><CopyableCode code="bucketPath" /></td>
    <td><code>string</code></td>
    <td>Bucket path</td>
</tr>
<tr>
    <td><CopyableCode code="bucketProvider" /></td>
    <td><code>string</code></td>
    <td>Bucket provider (AWS)</td>
</tr>
<tr>
    <td><CopyableCode code="containerName" /></td>
    <td><code>string</code></td>
    <td>Container Name</td>
</tr>
<tr>
    <td><CopyableCode code="iamRoleArn" /></td>
    <td><code>string</code></td>
    <td>AWS Role ARN</td>
</tr>
<tr>
    <td><CopyableCode code="iamRoleSessionName" /></td>
    <td><code>string</code></td>
    <td>AWS  Role session name</td>
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
    <td>**This endpoint is in beta.** API contract is stable, and no breaking changes are expected in the future. &lt;br /&gt;&lt;br /&gt; Returns the service backup bucket.</td>
</tr>
<tr>
    <td><a href="#create"><CopyableCode code="create" /></a></td>
    <td><CopyableCode code="insert" /></td>
    <td><a href="#parameter-serviceId"><code>serviceId</code></a>, <a href="#parameter-organization_id"><code>organization_id</code></a></td>
    <td></td>
    <td>**This endpoint is in beta.** API contract is stable, and no breaking changes are expected in the future. &lt;br /&gt;&lt;br /&gt; Create service backup bucket. Requires ADMIN auth key role.</td>
</tr>
<tr>
    <td><a href="#update"><CopyableCode code="update" /></a></td>
    <td><CopyableCode code="update" /></td>
    <td><a href="#parameter-serviceId"><code>serviceId</code></a>, <a href="#parameter-organization_id"><code>organization_id</code></a></td>
    <td></td>
    <td>**This endpoint is in beta.** API contract is stable, and no breaking changes are expected in the future. &lt;br /&gt;&lt;br /&gt; Update service backup bucket. Requires ADMIN auth key role. The secrets of the specified bucket provider are always required</td>
</tr>
<tr>
    <td><a href="#delete"><CopyableCode code="delete" /></a></td>
    <td><CopyableCode code="delete" /></td>
    <td><a href="#parameter-serviceId"><code>serviceId</code></a>, <a href="#parameter-organization_id"><code>organization_id</code></a></td>
    <td></td>
    <td>**This endpoint is in beta.** API contract is stable, and no breaking changes are expected in the future. &lt;br /&gt;&lt;br /&gt; Delete service backup bucket. Requires ADMIN auth key role.</td>
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
    <td>ID of the requested service.</td>
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

**This endpoint is in beta.** API contract is stable, and no breaking changes are expected in the future. &lt;br /&gt;&lt;br /&gt; Returns the service backup bucket.

```sql
SELECT
id,
accessKeyId,
bucketPath,
bucketProvider,
containerName,
iamRoleArn,
iamRoleSessionName
FROM clickhouse.backups.backup_buckets
WHERE serviceId = '{{ serviceId }}' -- required
AND organization_id = '{{ organization_id }}' -- required unless CLICKHOUSE_ORG_ID is set
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

**This endpoint is in beta.** API contract is stable, and no breaking changes are expected in the future. &lt;br /&gt;&lt;br /&gt; Create service backup bucket. Requires ADMIN auth key role.

```sql
INSERT INTO clickhouse.backups.backup_buckets (
bucketProvider,
bucketPath,
iamRoleArn,
iamRoleSessionName,
accessKeyId,
secretAccessKey,
containerName,
connectionString,
serviceId,
organization_id
)
SELECT 
'{{ bucketProvider }}',
'{{ bucketPath }}',
'{{ iamRoleArn }}',
'{{ iamRoleSessionName }}',
'{{ accessKeyId }}',
'{{ secretAccessKey }}',
'{{ containerName }}',
'{{ connectionString }}',
'{{ serviceId }}',
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
- name: backup_buckets
  props:
    - name: serviceId
      value: "{{ serviceId }}"
      description: Required parameter for the backup_buckets resource.
    - name: organization_id
      value: "{{ organization_id }}"
      description: Required parameter for the backup_buckets resource.
    - name: bucketProvider
      value: "{{ bucketProvider }}"
      description: |
        Bucket provider
      valid_values: ['AWS']
    - name: bucketPath
      value: "{{ bucketPath }}"
      description: |
        Bucket path
    - name: iamRoleArn
      value: "{{ iamRoleArn }}"
      description: |
        AWS Role ARN
    - name: iamRoleSessionName
      value: "{{ iamRoleSessionName }}"
      description: |
        AWS Role session name
    - name: accessKeyId
      value: "{{ accessKeyId }}"
      description: |
        Access Key ID (HMAC key)
    - name: secretAccessKey
      value: "{{ secretAccessKey }}"
      description: |
        Secret Access Key (HMAC secret key)
    - name: containerName
      value: "{{ containerName }}"
      description: |
        Container Name
    - name: connectionString
      value: "{{ connectionString }}"
      description: |
        Connection String
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

**This endpoint is in beta.** API contract is stable, and no breaking changes are expected in the future. &lt;br /&gt;&lt;br /&gt; Update service backup bucket. Requires ADMIN auth key role. The secrets of the specified bucket provider are always required

```sql
UPDATE clickhouse.backups.backup_buckets
SET 
bucketProvider = '{{ bucketProvider }}',
bucketPath = '{{ bucketPath }}',
iamRoleArn = '{{ iamRoleArn }}',
iamRoleSessionName = '{{ iamRoleSessionName }}',
accessKeyId = '{{ accessKeyId }}',
secretAccessKey = '{{ secretAccessKey }}',
containerName = '{{ containerName }}',
connectionString = '{{ connectionString }}'
WHERE 
serviceId = '{{ serviceId }}' --required
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

**This endpoint is in beta.** API contract is stable, and no breaking changes are expected in the future. &lt;br /&gt;&lt;br /&gt; Delete service backup bucket. Requires ADMIN auth key role.

```sql
DELETE FROM clickhouse.backups.backup_buckets
WHERE serviceId = '{{ serviceId }}' --required
AND organization_id = '{{ organization_id }}' --required unless CLICKHOUSE_ORG_ID is set
;
```
</TabItem>
</Tabs>

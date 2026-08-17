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
    <td><CopyableCode code="access_key_id" /></td>
    <td><code>string</code></td>
    <td>Access Key ID (HMAC key) (wire: accessKeyId)</td>
</tr>
<tr>
    <td><CopyableCode code="container_name" /></td>
    <td><code>string</code></td>
    <td>Container Name (wire: containerName)</td>
</tr>
<tr>
    <td><CopyableCode code="iam_role_session_name" /></td>
    <td><code>string</code></td>
    <td>AWS  Role session name (wire: iamRoleSessionName)</td>
</tr>
<tr>
    <td><CopyableCode code="bucket_path" /></td>
    <td><code>string</code></td>
    <td>Bucket path (wire: bucketPath)</td>
</tr>
<tr>
    <td><CopyableCode code="bucket_provider" /></td>
    <td><code>string</code></td>
    <td>Bucket provider (AWS) (wire: bucketProvider)</td>
</tr>
<tr>
    <td><CopyableCode code="iam_role_arn" /></td>
    <td><code>string</code></td>
    <td>AWS Role ARN (wire: iamRoleArn)</td>
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
    <td><a href="#parameter-service_id"><code>service_id</code></a>, <a href="#parameter-organization_id"><code>organization_id</code></a></td>
    <td></td>
    <td>**This endpoint is in beta.** API contract is stable, and no breaking changes are expected in the future. &lt;br /&gt;&lt;br /&gt; Returns the service backup bucket.</td>
</tr>
<tr>
    <td><a href="#create"><CopyableCode code="create" /></a></td>
    <td><CopyableCode code="insert" /></td>
    <td><a href="#parameter-service_id"><code>service_id</code></a>, <a href="#parameter-organization_id"><code>organization_id</code></a></td>
    <td></td>
    <td>**This endpoint is in beta.** API contract is stable, and no breaking changes are expected in the future. &lt;br /&gt;&lt;br /&gt; Create service backup bucket. Requires ADMIN auth key role.</td>
</tr>
<tr>
    <td><a href="#update"><CopyableCode code="update" /></a></td>
    <td><CopyableCode code="update" /></td>
    <td><a href="#parameter-service_id"><code>service_id</code></a>, <a href="#parameter-organization_id"><code>organization_id</code></a></td>
    <td></td>
    <td>**This endpoint is in beta.** API contract is stable, and no breaking changes are expected in the future. &lt;br /&gt;&lt;br /&gt; Update service backup bucket. Requires ADMIN auth key role. The secrets of the specified bucket provider are always required</td>
</tr>
<tr>
    <td><a href="#delete"><CopyableCode code="delete" /></a></td>
    <td><CopyableCode code="delete" /></td>
    <td><a href="#parameter-service_id"><code>service_id</code></a>, <a href="#parameter-organization_id"><code>organization_id</code></a></td>
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
<tr id="parameter-service_id">
    <td><CopyableCode code="service_id" /></td>
    <td><code>string (uuid)</code></td>
    <td>ID of the requested service. (wire: serviceId)</td>
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
access_key_id,
container_name,
iam_role_session_name,
bucket_path,
bucket_provider,
iam_role_arn
FROM clickhouse.backups.backup_buckets
WHERE service_id = '{{ service_id }}' -- required
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
bucket_provider,
bucket_path,
iam_role_arn,
iam_role_session_name,
access_key_id,
secret_access_key,
container_name,
connection_string,
service_id,
organization_id
)
SELECT 
'{{ bucket_provider }}',
'{{ bucket_path }}',
'{{ iam_role_arn }}',
'{{ iam_role_session_name }}',
'{{ access_key_id }}',
'{{ secret_access_key }}',
'{{ container_name }}',
'{{ connection_string }}',
'{{ service_id }}',
'{{ organization_id }}'
RETURNING
request_id,
result,
status
;
```
</TabItem>
<TabItem value="manifest">

<CodeBlock language="yaml">{`# Description fields are for documentation purposes
- name: backup_buckets
  props:
    - name: service_id
      value: "{{ service_id }}"
      description: Required parameter for the backup_buckets resource.
    - name: organization_id
      value: "{{ organization_id }}"
      description: Required parameter for the backup_buckets resource.
    - name: bucket_provider
      value: "{{ bucket_provider }}"
      description: |
        Bucket provider
      valid_values: ['AWS']
    - name: bucket_path
      value: "{{ bucket_path }}"
      description: |
        Bucket path
    - name: iam_role_arn
      value: "{{ iam_role_arn }}"
      description: |
        AWS Role ARN
    - name: iam_role_session_name
      value: "{{ iam_role_session_name }}"
      description: |
        AWS Role session name
    - name: access_key_id
      value: "{{ access_key_id }}"
      description: |
        Access Key ID (HMAC key)
    - name: secret_access_key
      value: "{{ secret_access_key }}"
      description: |
        Secret Access Key (HMAC secret key)
    - name: container_name
      value: "{{ container_name }}"
      description: |
        Container Name
    - name: connection_string
      value: "{{ connection_string }}"
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
bucket_provider = '{{ bucket_provider }}',
bucket_path = '{{ bucket_path }}',
iam_role_arn = '{{ iam_role_arn }}',
iam_role_session_name = '{{ iam_role_session_name }}',
access_key_id = '{{ access_key_id }}',
secret_access_key = '{{ secret_access_key }}',
container_name = '{{ container_name }}',
connection_string = '{{ connection_string }}'
WHERE 
service_id = '{{ service_id }}' --required
AND organization_id = '{{ organization_id }}' --required unless CLICKHOUSE_ORG_ID is set
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

**This endpoint is in beta.** API contract is stable, and no breaking changes are expected in the future. &lt;br /&gt;&lt;br /&gt; Delete service backup bucket. Requires ADMIN auth key role.

```sql
DELETE FROM clickhouse.backups.backup_buckets
WHERE service_id = '{{ service_id }}' --required
AND organization_id = '{{ organization_id }}' --required unless CLICKHOUSE_ORG_ID is set
;
```
</TabItem>
</Tabs>

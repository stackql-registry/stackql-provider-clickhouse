--- 
title: backups
hide_title: false
hide_table_of_contents: false
keywords:
  - backups
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

Creates, updates, deletes, gets or lists a <code>backups</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="backups" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="clickhouse.backups.backups" /></td></tr>
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
    <td>Unique backup ID.</td>
</tr>
<tr>
    <td><CopyableCode code="service_id" /></td>
    <td><code>string</code></td>
    <td>Name  (wire: serviceId)</td>
</tr>
<tr>
    <td><CopyableCode code="backup_name" /></td>
    <td><code>string</code></td>
    <td>Backup name on the external backup bucket. (wire: backupName)</td>
</tr>
<tr>
    <td><CopyableCode code="bucket" /></td>
    <td><code>object</code></td>
    <td>Backup bucket where the backup is stored.</td>
</tr>
<tr>
    <td><CopyableCode code="duration_in_seconds" /></td>
    <td><code>number</code></td>
    <td>Time in seconds it took to perform the backup. If the status still in_progress, this is the time in seconds since the backup started until now. (wire: durationInSeconds)</td>
</tr>
<tr>
    <td><CopyableCode code="finished_at" /></td>
    <td><code>string (date-time)</code></td>
    <td>Backup finish timestamp. ISO-8601. Available only for finished backups (wire: finishedAt)</td>
</tr>
<tr>
    <td><CopyableCode code="size_in_bytes" /></td>
    <td><code>number</code></td>
    <td>Size of the backup in bytes. (wire: sizeInBytes)</td>
</tr>
<tr>
    <td><CopyableCode code="started_at" /></td>
    <td><code>string (date-time)</code></td>
    <td>Backup start timestamp. ISO-8601. (wire: startedAt)</td>
</tr>
<tr>
    <td><CopyableCode code="status" /></td>
    <td><code>string</code></td>
    <td>Status of the backup: 'done', 'error', 'in_progress'. (done, error, in_progress)</td>
</tr>
<tr>
    <td><CopyableCode code="type" /></td>
    <td><code>string</code></td>
    <td>Backup type ("full" or "incremental"). (full, incremental)</td>
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
    <td>Unique backup ID.</td>
</tr>
<tr>
    <td><CopyableCode code="service_id" /></td>
    <td><code>string</code></td>
    <td>Name  (wire: serviceId)</td>
</tr>
<tr>
    <td><CopyableCode code="backup_name" /></td>
    <td><code>string</code></td>
    <td>Backup name on the external backup bucket. (wire: backupName)</td>
</tr>
<tr>
    <td><CopyableCode code="bucket" /></td>
    <td><code>object</code></td>
    <td>Backup bucket where the backup is stored.</td>
</tr>
<tr>
    <td><CopyableCode code="duration_in_seconds" /></td>
    <td><code>number</code></td>
    <td>Time in seconds it took to perform the backup. If the status still in_progress, this is the time in seconds since the backup started until now. (wire: durationInSeconds)</td>
</tr>
<tr>
    <td><CopyableCode code="finished_at" /></td>
    <td><code>string (date-time)</code></td>
    <td>Backup finish timestamp. ISO-8601. Available only for finished backups (wire: finishedAt)</td>
</tr>
<tr>
    <td><CopyableCode code="size_in_bytes" /></td>
    <td><code>number</code></td>
    <td>Size of the backup in bytes. (wire: sizeInBytes)</td>
</tr>
<tr>
    <td><CopyableCode code="started_at" /></td>
    <td><code>string (date-time)</code></td>
    <td>Backup start timestamp. ISO-8601. (wire: startedAt)</td>
</tr>
<tr>
    <td><CopyableCode code="status" /></td>
    <td><code>string</code></td>
    <td>Status of the backup: 'done', 'error', 'in_progress'. (done, error, in_progress)</td>
</tr>
<tr>
    <td><CopyableCode code="type" /></td>
    <td><code>string</code></td>
    <td>Backup type ("full" or "incremental"). (full, incremental)</td>
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
    <td><a href="#parameter-service_id"><code>service_id</code></a>, <a href="#parameter-backup_id"><code>backup_id</code></a>, <a href="#parameter-organization_id"><code>organization_id</code></a></td>
    <td></td>
    <td>Returns a single backup info.</td>
</tr>
<tr>
    <td><a href="#list"><CopyableCode code="list" /></a></td>
    <td><CopyableCode code="select" /></td>
    <td><a href="#parameter-service_id"><code>service_id</code></a>, <a href="#parameter-organization_id"><code>organization_id</code></a></td>
    <td></td>
    <td>Returns a list of all backups for the service. The most recent backups comes first in the list.</td>
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
<tr id="parameter-backup_id">
    <td><CopyableCode code="backup_id" /></td>
    <td><code>string (uuid)</code></td>
    <td>ID of the requested backup. (wire: backupId)</td>
</tr>
<tr id="parameter-organization_id">
    <td><CopyableCode code="organization_id" /></td>
    <td><code>string</code></td>
    <td>ClickHouse Cloud organization ID. Resolved from the CLICKHOUSE_ORG_ID environment variable when it is set (x-stackQL-envVar); otherwise it must be supplied on every query as WHERE organization_id = &lt;uuid&gt;. A WHERE value always takes precedence over the environment. (x-stackQL-envVar: CLICKHOUSE_ORG_ID)</td>
</tr>
<tr id="parameter-service_id">
    <td><CopyableCode code="service_id" /></td>
    <td><code>string (uuid)</code></td>
    <td>ID of the service the backup was created from. (wire: serviceId)</td>
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

Returns a single backup info.

```sql
SELECT
id,
service_id,
backup_name,
bucket,
duration_in_seconds,
finished_at,
size_in_bytes,
started_at,
status,
type
FROM clickhouse.backups.backups
WHERE service_id = '{{ service_id }}' -- required
AND backup_id = '{{ backup_id }}' -- required
AND organization_id = '{{ organization_id }}' -- required unless CLICKHOUSE_ORG_ID is set
;
```
</TabItem>
<TabItem value="list">

Returns a list of all backups for the service. The most recent backups comes first in the list.

```sql
SELECT
id,
service_id,
backup_name,
bucket,
duration_in_seconds,
finished_at,
size_in_bytes,
started_at,
status,
type
FROM clickhouse.backups.backups
WHERE service_id = '{{ service_id }}' -- required
AND organization_id = '{{ organization_id }}' -- required unless CLICKHOUSE_ORG_ID is set
;
```
</TabItem>
</Tabs>

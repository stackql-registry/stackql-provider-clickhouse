--- 
title: cdc_scalings
hide_title: false
hide_table_of_contents: false
keywords:
  - cdc_scalings
  - clickpipes
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

Creates, updates, deletes, gets or lists a <code>cdc_scalings</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="cdc_scalings" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="clickhouse.clickpipes.cdc_scalings" /></td></tr>
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
    <td><CopyableCode code="replicaCpuMillicores" /></td>
    <td><code>integer</code></td>
    <td>CPU in millicores for DB ClickPipes.</td>
</tr>
<tr>
    <td><CopyableCode code="replicaMemoryGb" /></td>
    <td><code>number</code></td>
    <td>Memory in GiB for DB ClickPipes. Must be 4× the CPU core count.</td>
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
    <td>Get scaling settings for database ClickPipes (PostgreSQL, MySQL, MongoDB, BigQuery).&lt;br /&gt;&lt;br /&gt;The infrastructure is shared between all database ClickPipes in the service, both for initial load and CDC. For billing purposes, 2 CPU cores and 8 GB of RAM &#91;correspond&#93;(https:​//clickhouse.com/docs/cloud/manage/billing/overview#clickpipes-for-postgres-cdc) to one compute unit.&lt;br /&gt;&lt;br /&gt;**Note:** For Kafka, Kinesis, and object storage pipes (S3, GCS, Azure Blob), see &#91;Get ClickPipe&#93;(#tag/ClickPipes/operation/clickPipeGet).&lt;br /&gt;&lt;br /&gt;**This endpoint becomes available once at least one database ClickPipe was provisioned.**</td>
</tr>
<tr>
    <td><a href="#update"><CopyableCode code="update" /></a></td>
    <td><CopyableCode code="update" /></td>
    <td><a href="#parameter-serviceId"><code>serviceId</code></a>, <a href="#parameter-organization_id"><code>organization_id</code></a></td>
    <td></td>
    <td>Update scaling settings for database ClickPipes (PostgreSQL, MySQL, MongoDB, BigQuery).&lt;br /&gt;&lt;br /&gt;The infrastructure is shared between all database ClickPipes in the service, both for initial load and CDC. Scaling settings may take a few minutes to fully propagate.&lt;br /&gt;&lt;br /&gt;For billing purposes, 2 CPU cores and 8 GB of RAM &#91;correspond&#93;(https:​//clickhouse.com/docs/cloud/manage/billing/overview#clickpipes-for-postgres-cdc) to one compute unit. If your organization tier changes, database ClickPipes will be &#91;rescaled&#93;(https:​//clickhouse.com/docs/cloud/manage/billing/overview#compute) appropriately.&lt;br /&gt;&lt;br /&gt;**Note:** For Kafka, Kinesis, and object storage pipes (S3, GCS, Azure Blob), see &#91;Get ClickPipe&#93;(#tag/ClickPipes/operation/clickPipeGet).&lt;br /&gt;&lt;br /&gt;**This endpoint becomes available once at least one database ClickPipe was provisioned.**</td>
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
    <td>ID of the service that owns the ClickPipe.</td>
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

Get scaling settings for database ClickPipes (PostgreSQL, MySQL, MongoDB, BigQuery).&lt;br /&gt;&lt;br /&gt;The infrastructure is shared between all database ClickPipes in the service, both for initial load and CDC. For billing purposes, 2 CPU cores and 8 GB of RAM &#91;correspond&#93;(https:​//clickhouse.com/docs/cloud/manage/billing/overview#clickpipes-for-postgres-cdc) to one compute unit.&lt;br /&gt;&lt;br /&gt;**Note:** For Kafka, Kinesis, and object storage pipes (S3, GCS, Azure Blob), see &#91;Get ClickPipe&#93;(#tag/ClickPipes/operation/clickPipeGet).&lt;br /&gt;&lt;br /&gt;**This endpoint becomes available once at least one database ClickPipe was provisioned.**

```sql
SELECT
replicaCpuMillicores,
replicaMemoryGb
FROM clickhouse.clickpipes.cdc_scalings
WHERE serviceId = '{{ serviceId }}' -- required
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

Update scaling settings for database ClickPipes (PostgreSQL, MySQL, MongoDB, BigQuery).&lt;br /&gt;&lt;br /&gt;The infrastructure is shared between all database ClickPipes in the service, both for initial load and CDC. Scaling settings may take a few minutes to fully propagate.&lt;br /&gt;&lt;br /&gt;For billing purposes, 2 CPU cores and 8 GB of RAM &#91;correspond&#93;(https:​//clickhouse.com/docs/cloud/manage/billing/overview#clickpipes-for-postgres-cdc) to one compute unit. If your organization tier changes, database ClickPipes will be &#91;rescaled&#93;(https:​//clickhouse.com/docs/cloud/manage/billing/overview#compute) appropriately.&lt;br /&gt;&lt;br /&gt;**Note:** For Kafka, Kinesis, and object storage pipes (S3, GCS, Azure Blob), see &#91;Get ClickPipe&#93;(#tag/ClickPipes/operation/clickPipeGet).&lt;br /&gt;&lt;br /&gt;**This endpoint becomes available once at least one database ClickPipe was provisioned.**

```sql
UPDATE clickhouse.clickpipes.cdc_scalings
SET 
replicaCpuMillicores = {{ replicaCpuMillicores }},
replicaMemoryGb = {{ replicaMemoryGb }}
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

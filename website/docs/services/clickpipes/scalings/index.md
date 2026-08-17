--- 
title: scalings
hide_title: false
hide_table_of_contents: false
keywords:
  - scalings
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

Creates, updates, deletes, gets or lists a <code>scalings</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="scalings" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="clickhouse.clickpipes.scalings" /></td></tr>
</tbody></table>

## Fields

The following fields are returned by `SELECT` queries:

`SELECT` not supported for this resource, use `SHOW METHODS` to view available operations for the resource.


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
    <td><a href="#update"><CopyableCode code="update" /></a></td>
    <td><CopyableCode code="update" /></td>
    <td><a href="#parameter-service_id"><code>service_id</code></a>, <a href="#parameter-click_pipe_id"><code>click_pipe_id</code></a>, <a href="#parameter-organization_id"><code>organization_id</code></a></td>
    <td></td>
    <td>Change scaling settings for the specified ClickPipe. This endpoint supports Kafka, Kinesis, and object storage pipes (S3, GCS, Azure Blob).&lt;br /&gt;&lt;br /&gt;**Note:** For database ClickPipes (PostgreSQL, MySQL, MongoDB, BigQuery), use the &#91;Update CDC ClickPipes scaling&#93;(#tag/ClickPipes/operation/clickPipeCdcScalingUpdate) endpoint instead.</td>
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
<tr id="parameter-click_pipe_id">
    <td><CopyableCode code="click_pipe_id" /></td>
    <td><code>string (uuid)</code></td>
    <td>ID of the ClickPipe to update scaling settings. (wire: clickPipeId)</td>
</tr>
<tr id="parameter-organization_id">
    <td><CopyableCode code="organization_id" /></td>
    <td><code>string</code></td>
    <td>ClickHouse Cloud organization ID. Resolved from the CLICKHOUSE_ORG_ID environment variable when it is set (x-stackQL-envVar); otherwise it must be supplied on every query as WHERE organization_id = &lt;uuid&gt;. A WHERE value always takes precedence over the environment. (x-stackQL-envVar: CLICKHOUSE_ORG_ID)</td>
</tr>
<tr id="parameter-service_id">
    <td><CopyableCode code="service_id" /></td>
    <td><code>string (uuid)</code></td>
    <td>ID of the service that owns the ClickPipe. (wire: serviceId)</td>
</tr>
</tbody>
</table>

## `UPDATE` examples

<Tabs
    defaultValue="update"
    values={[
        { label: 'update', value: 'update' }
    ]}
>
<TabItem value="update">

Change scaling settings for the specified ClickPipe. This endpoint supports Kafka, Kinesis, and object storage pipes (S3, GCS, Azure Blob).&lt;br /&gt;&lt;br /&gt;**Note:** For database ClickPipes (PostgreSQL, MySQL, MongoDB, BigQuery), use the &#91;Update CDC ClickPipes scaling&#93;(#tag/ClickPipes/operation/clickPipeCdcScalingUpdate) endpoint instead.

```sql
UPDATE clickhouse.clickpipes.scalings
SET 
replicas = {{ replicas }},
concurrency = {{ concurrency }},
replica_cpu_millicores = {{ replica_cpu_millicores }},
replica_memory_gb = {{ replica_memory_gb }}
WHERE 
service_id = '{{ service_id }}' --required
AND click_pipe_id = '{{ click_pipe_id }}' --required
AND organization_id = '{{ organization_id }}' --required unless CLICKHOUSE_ORG_ID is set
RETURNING
request_id,
result,
status;
```
</TabItem>
</Tabs>

--- 
title: settings
hide_title: false
hide_table_of_contents: false
keywords:
  - settings
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

Creates, updates, deletes, gets or lists a <code>settings</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="settings" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="clickhouse.clickpipes.settings" /></td></tr>
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
    <td><CopyableCode code="clickhouse_max_download_threads" /></td>
    <td><code>integer</code></td>
    <td>Max download threads. Maximum number of concurrent download threads</td>
</tr>
<tr>
    <td><CopyableCode code="clickhouse_max_insert_threads" /></td>
    <td><code>integer</code></td>
    <td>Max insert threads. Maximum number of concurrent insert threads</td>
</tr>
<tr>
    <td><CopyableCode code="clickhouse_max_threads" /></td>
    <td><code>integer</code></td>
    <td>Max threads. Maximum number of concurrent threads for file processing</td>
</tr>
<tr>
    <td><CopyableCode code="clickhouse_min_insert_block_size_bytes" /></td>
    <td><code>integer</code></td>
    <td>Min insert block size bytes. Minimum size of data block for insert (in bytes)</td>
</tr>
<tr>
    <td><CopyableCode code="clickhouse_parallel_distributed_insert_select" /></td>
    <td><code>integer</code></td>
    <td>Parallel distributed insert select. Parallel distributed insert select setting</td>
</tr>
<tr>
    <td><CopyableCode code="clickhouse_parallel_view_processing" /></td>
    <td><code>boolean</code></td>
    <td>parallel view processing. Whether to enable pushing to attached views concurrently instead of sequentially</td>
</tr>
<tr>
    <td><CopyableCode code="kafka_read_committed" /></td>
    <td><code>boolean</code></td>
    <td>Kafka Read Committed. Whether Kafka consumers read only committed messages</td>
</tr>
<tr>
    <td><CopyableCode code="object_storage_concurrency" /></td>
    <td><code>integer</code></td>
    <td>Object storage concurrency. Number of concurrent file processing threads</td>
</tr>
<tr>
    <td><CopyableCode code="object_storage_max_file_count" /></td>
    <td><code>integer</code></td>
    <td>Max file count. Maximum number of files to process in a single insert batch</td>
</tr>
<tr>
    <td><CopyableCode code="object_storage_max_insert_bytes" /></td>
    <td><code>integer</code></td>
    <td>Max insert bytes. Number of bytes to process in a single insert batch</td>
</tr>
<tr>
    <td><CopyableCode code="object_storage_polling_interval_ms" /></td>
    <td><code>integer</code></td>
    <td>Object storage polling interval. Configures the refresh interval for querying continuous ingest for new object storage data</td>
</tr>
<tr>
    <td><CopyableCode code="object_storage_use_cluster_function" /></td>
    <td><code>boolean</code></td>
    <td>use cluster function. Whether to use ClickHouse cluster function for distributed processing</td>
</tr>
<tr>
    <td><CopyableCode code="streaming_max_insert_wait_ms" /></td>
    <td><code>integer</code></td>
    <td>Streaming max insert wait time. Configures the max wait period before inserting data into the ClickHouse.</td>
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
    <td><a href="#parameter-serviceId"><code>serviceId</code></a>, <a href="#parameter-clickPipeId"><code>clickPipeId</code></a>, <a href="#parameter-organizationId"><code>organizationId</code></a></td>
    <td></td>
    <td>Returns the advanced settings for the specified ClickPipe.</td>
</tr>
<tr>
    <td><a href="#update"><CopyableCode code="update" /></a></td>
    <td><CopyableCode code="update" /></td>
    <td><a href="#parameter-serviceId"><code>serviceId</code></a>, <a href="#parameter-clickPipeId"><code>clickPipeId</code></a>, <a href="#parameter-organizationId"><code>organizationId</code></a></td>
    <td></td>
    <td>Update the advanced settings for the specified ClickPipe. Send key-value pairs where values can be strings, numbers, or booleans.</td>
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
<tr id="parameter-clickPipeId">
    <td><CopyableCode code="clickPipeId" /></td>
    <td><code>string (uuid)</code></td>
    <td>ID of the ClickPipe to update settings for.</td>
</tr>
<tr id="parameter-organizationId">
    <td><CopyableCode code="organizationId" /></td>
    <td><code>string</code></td>
    <td>ClickHouse Cloud organization ID. Resolved from the CLICKHOUSE_ORG_ID environment variable when it is set (x-stackQL-envVar); otherwise it must be supplied on every query as WHERE organizationId = &lt;uuid&gt;. A WHERE value always takes precedence over the environment. (x-stackQL-envVar: CLICKHOUSE_ORG_ID)</td>
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

Returns the advanced settings for the specified ClickPipe.

```sql
SELECT
clickhouse_max_download_threads,
clickhouse_max_insert_threads,
clickhouse_max_threads,
clickhouse_min_insert_block_size_bytes,
clickhouse_parallel_distributed_insert_select,
clickhouse_parallel_view_processing,
kafka_read_committed,
object_storage_concurrency,
object_storage_max_file_count,
object_storage_max_insert_bytes,
object_storage_polling_interval_ms,
object_storage_use_cluster_function,
streaming_max_insert_wait_ms
FROM clickhouse.clickpipes.settings
WHERE serviceId = '{{ serviceId }}' -- required
AND clickPipeId = '{{ clickPipeId }}' -- required
AND organizationId = '{{ organizationId }}' -- required unless CLICKHOUSE_ORG_ID is set
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

Update the advanced settings for the specified ClickPipe. Send key-value pairs where values can be strings, numbers, or booleans.

```sql
UPDATE clickhouse.clickpipes.settings
SET 
streaming_max_insert_wait_ms = {{ streaming_max_insert_wait_ms }},
object_storage_concurrency = {{ object_storage_concurrency }},
object_storage_polling_interval_ms = {{ object_storage_polling_interval_ms }},
object_storage_max_insert_bytes = {{ object_storage_max_insert_bytes }},
object_storage_max_file_count = {{ object_storage_max_file_count }},
clickhouse_max_threads = {{ clickhouse_max_threads }},
clickhouse_max_insert_threads = {{ clickhouse_max_insert_threads }},
clickhouse_min_insert_block_size_bytes = {{ clickhouse_min_insert_block_size_bytes }},
clickhouse_max_download_threads = {{ clickhouse_max_download_threads }},
clickhouse_parallel_distributed_insert_select = {{ clickhouse_parallel_distributed_insert_select }},
kafka_read_committed = {{ kafka_read_committed }},
object_storage_use_cluster_function = {{ object_storage_use_cluster_function }},
clickhouse_parallel_view_processing = {{ clickhouse_parallel_view_processing }}
WHERE 
serviceId = '{{ serviceId }}' --required
AND clickPipeId = '{{ clickPipeId }}' --required
AND organizationId = '{{ organizationId }}' --required unless CLICKHOUSE_ORG_ID is set
RETURNING
requestId,
result,
status;
```
</TabItem>
</Tabs>

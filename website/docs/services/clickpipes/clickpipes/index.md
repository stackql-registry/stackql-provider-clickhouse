--- 
title: clickpipes
hide_title: false
hide_table_of_contents: false
keywords:
  - clickpipes
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

Creates, updates, deletes, gets or lists a <code>clickpipes</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="clickpipes" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="clickhouse.clickpipes.clickpipes" /></td></tr>
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
    <td>Unique ClickPipe ID.</td>
</tr>
<tr>
    <td><CopyableCode code="name" /></td>
    <td><code>string</code></td>
    <td>Name of the ClickPipe. (example: my_postgres_pipe)</td>
</tr>
<tr>
    <td><CopyableCode code="createdAt" /></td>
    <td><code>string (date-time)</code></td>
    <td>Creation timestamp of the ClickPipe in ISO 8601 format.</td>
</tr>
<tr>
    <td><CopyableCode code="destination" /></td>
    <td><code>object</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="fieldMappings" /></td>
    <td><code>array</code></td>
    <td>Field mappings of the ClickPipe. Note that all destination columns must be included in the mappings.</td>
</tr>
<tr>
    <td><CopyableCode code="scaling" /></td>
    <td><code>object</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="serviceId" /></td>
    <td><code>string (uuid)</code></td>
    <td>ID of the service this ClickPipe belongs to.</td>
</tr>
<tr>
    <td><CopyableCode code="settings" /></td>
    <td><code>object</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="source" /></td>
    <td><code>object</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="state" /></td>
    <td><code>string</code></td>
    <td>Current lifecycle state of the ClickPipe. For database pipes: "Provisioning" (initial setup), "Setup" (configuring replication), "Snapshot" (initial data load), "Running" (actively replicating), "Pausing" (transitioning to paused state), "Paused" (temporarily paused), "Modifying" (applying configuration updates), "Resync" (swapping resync tables with original tables), "Failed" (error occurred), "Unknown". For streaming/object storage pipes (Kafka, Kinesis, S3): "Unknown" (initial state), "Provisioning" (setting up resources), "Running" (actively ingesting data), "Stopping" (transitioning to stopped state), "Stopped" (manually stopped, can be restarted), "Completed" (batch ingestion finished for object storage), "Failed" (error occurred, pipe stopped), "InternalError" (internal system error). (Unknown, Provisioning, Running, Degraded, Stopping, Stopped, Failed, Completed, InternalError, Setup, Snapshot, Paused, Pausing, Modifying, Resync) (example: Running)</td>
</tr>
<tr>
    <td><CopyableCode code="updatedAt" /></td>
    <td><code>string (date-time)</code></td>
    <td>Last update timestamp of the ClickPipe in ISO 8601 format.</td>
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
    <td>Unique ClickPipe ID.</td>
</tr>
<tr>
    <td><CopyableCode code="name" /></td>
    <td><code>string</code></td>
    <td>Name of the ClickPipe. (example: my_postgres_pipe)</td>
</tr>
<tr>
    <td><CopyableCode code="createdAt" /></td>
    <td><code>string (date-time)</code></td>
    <td>Creation timestamp of the ClickPipe in ISO 8601 format.</td>
</tr>
<tr>
    <td><CopyableCode code="destination" /></td>
    <td><code>object</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="fieldMappings" /></td>
    <td><code>array</code></td>
    <td>Field mappings of the ClickPipe. Note that all destination columns must be included in the mappings.</td>
</tr>
<tr>
    <td><CopyableCode code="scaling" /></td>
    <td><code>object</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="serviceId" /></td>
    <td><code>string (uuid)</code></td>
    <td>ID of the service this ClickPipe belongs to.</td>
</tr>
<tr>
    <td><CopyableCode code="settings" /></td>
    <td><code>object</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="source" /></td>
    <td><code>object</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="state" /></td>
    <td><code>string</code></td>
    <td>Current lifecycle state of the ClickPipe. For database pipes: "Provisioning" (initial setup), "Setup" (configuring replication), "Snapshot" (initial data load), "Running" (actively replicating), "Pausing" (transitioning to paused state), "Paused" (temporarily paused), "Modifying" (applying configuration updates), "Resync" (swapping resync tables with original tables), "Failed" (error occurred), "Unknown". For streaming/object storage pipes (Kafka, Kinesis, S3): "Unknown" (initial state), "Provisioning" (setting up resources), "Running" (actively ingesting data), "Stopping" (transitioning to stopped state), "Stopped" (manually stopped, can be restarted), "Completed" (batch ingestion finished for object storage), "Failed" (error occurred, pipe stopped), "InternalError" (internal system error). (Unknown, Provisioning, Running, Degraded, Stopping, Stopped, Failed, Completed, InternalError, Setup, Snapshot, Paused, Pausing, Modifying, Resync) (example: Running)</td>
</tr>
<tr>
    <td><CopyableCode code="updatedAt" /></td>
    <td><code>string (date-time)</code></td>
    <td>Last update timestamp of the ClickPipe in ISO 8601 format.</td>
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
    <td><a href="#parameter-serviceId"><code>serviceId</code></a>, <a href="#parameter-clickPipeId"><code>clickPipeId</code></a>, <a href="#parameter-organization_id"><code>organization_id</code></a></td>
    <td></td>
    <td>Returns the specified ClickPipe.</td>
</tr>
<tr>
    <td><a href="#list"><CopyableCode code="list" /></a></td>
    <td><CopyableCode code="select" /></td>
    <td><a href="#parameter-serviceId"><code>serviceId</code></a>, <a href="#parameter-organization_id"><code>organization_id</code></a></td>
    <td></td>
    <td>Returns a list of ClickPipes.</td>
</tr>
<tr>
    <td><a href="#create"><CopyableCode code="create" /></a></td>
    <td><CopyableCode code="insert" /></td>
    <td><a href="#parameter-serviceId"><code>serviceId</code></a>, <a href="#parameter-organization_id"><code>organization_id</code></a></td>
    <td></td>
    <td>Create a new ClickPipe.</td>
</tr>
<tr>
    <td><a href="#update"><CopyableCode code="update" /></a></td>
    <td><CopyableCode code="update" /></td>
    <td><a href="#parameter-serviceId"><code>serviceId</code></a>, <a href="#parameter-clickPipeId"><code>clickPipeId</code></a>, <a href="#parameter-organization_id"><code>organization_id</code></a></td>
    <td></td>
    <td>Update the specified ClickPipe. Source fields not present in the per-source update schemas are immutable after creation. For Kafka sources, values submitted for immutable fields (type, format, brokers, topics, consumerGroup, offset, schemaRegistry, exactlyOnce) are not applied, except schema registry credentials, which are rejected.</td>
</tr>
<tr>
    <td><a href="#delete"><CopyableCode code="delete" /></a></td>
    <td><CopyableCode code="delete" /></td>
    <td><a href="#parameter-serviceId"><code>serviceId</code></a>, <a href="#parameter-clickPipeId"><code>clickPipeId</code></a>, <a href="#parameter-organization_id"><code>organization_id</code></a></td>
    <td></td>
    <td>Delete the specified ClickPipe.</td>
</tr>
<tr>
    <td><a href="#schema_discovery"><CopyableCode code="schema_discovery" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-serviceId"><code>serviceId</code></a>, <a href="#parameter-organization_id"><code>organization_id</code></a></td>
    <td></td>
    <td>**This endpoint is in beta.** API contract is stable, and no breaking changes are expected in the future. &lt;br /&gt;&lt;br /&gt; Infers the schema (field names and ClickHouse data types) of a ClickPipe source without creating a pipe. Supported for Kafka, Kinesis, Pub/Sub, and object storage sources. Object storage inference runs on the destination service, which must be running.</td>
</tr>
<tr>
    <td><a href="#update_state"><CopyableCode code="update_state" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-serviceId"><code>serviceId</code></a>, <a href="#parameter-clickPipeId"><code>clickPipeId</code></a>, <a href="#parameter-organization_id"><code>organization_id</code></a></td>
    <td></td>
    <td>Start, stop or resync ClickPipe. Stopping a ClickPipe will stop the ingestion process from any state. Starting is allowed for ClickPipes in the "Stopped" state or with a "Failed" state. Resyncing is only for Postgres and MySQL pipes and can be done from any state.</td>
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
    <td>ID of the ClickPipe to update state.</td>
</tr>
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
        { label: 'get', value: 'get' },
        { label: 'list', value: 'list' }
    ]}
>
<TabItem value="get">

Returns the specified ClickPipe.

```sql
SELECT
id,
name,
createdAt,
destination,
fieldMappings,
scaling,
serviceId,
settings,
source,
state,
updatedAt
FROM clickhouse.clickpipes.clickpipes
WHERE serviceId = '{{ serviceId }}' -- required
AND clickPipeId = '{{ clickPipeId }}' -- required
AND organization_id = '{{ organization_id }}' -- required unless CLICKHOUSE_ORG_ID is set
;
```
</TabItem>
<TabItem value="list">

Returns a list of ClickPipes.

```sql
SELECT
id,
name,
createdAt,
destination,
fieldMappings,
scaling,
serviceId,
settings,
source,
state,
updatedAt
FROM clickhouse.clickpipes.clickpipes
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

Create a new ClickPipe.

```sql
INSERT INTO clickhouse.clickpipes.clickpipes (
name,
source,
destination,
fieldMappings,
scaling,
settings,
serviceId,
organization_id
)
SELECT 
'{{ name }}',
'{{ source }}',
'{{ destination }}',
'{{ fieldMappings }}',
'{{ scaling }}',
'{{ settings }}',
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
- name: clickpipes
  props:
    - name: serviceId
      value: "{{ serviceId }}"
      description: Required parameter for the clickpipes resource.
    - name: organization_id
      value: "{{ organization_id }}"
      description: Required parameter for the clickpipes resource.
    - name: name
      value: "{{ name }}"
      description: |
        Name of the ClickPipe.
    - name: source
      value:
        kafka:
          type: "{{ type }}"
          format: "{{ format }}"
          brokers: "{{ brokers }}"
          topics: "{{ topics }}"
          consumerGroup: "{{ consumerGroup }}"
          authentication: "{{ authentication }}"
          iamRole: "{{ iamRole }}"
          offset:
            strategy: "{{ strategy }}"
            timestamp: "{{ timestamp }}"
          schemaRegistry:
            url: "{{ url }}"
            authentication: "{{ authentication }}"
            caCertificate: "{{ caCertificate }}"
            credentials:
              username: "{{ username }}"
              password: "{{ password }}"
          caCertificate: "{{ caCertificate }}"
          reversePrivateEndpointIds:
            - "{{ reversePrivateEndpointIds }}"
          exactlyOnce: {{ exactlyOnce }}
          credentials:
            username: "{{ username }}"
            password: "{{ password }}"
            accessKeyId: "{{ accessKeyId }}"
            secretKey: "{{ secretKey }}"
            connectionString: "{{ connectionString }}"
            certificate: "{{ certificate }}"
            privateKey: "{{ privateKey }}"
        objectStorage:
          type: "{{ type }}"
          format: "{{ format }}"
          url: "{{ url }}"
          delimiter: "{{ delimiter }}"
          compression: "{{ compression }}"
          isContinuous: {{ isContinuous }}
          queueUrl: "{{ queueUrl }}"
          skipInitialLoad: {{ skipInitialLoad }}
          startAfter: "{{ startAfter }}"
          authentication: "{{ authentication }}"
          iamRole: "{{ iamRole }}"
          connectionString: "{{ connectionString }}"
          path: "{{ path }}"
          azureContainerName: "{{ azureContainerName }}"
          accessKey:
            accessKeyId: "{{ accessKeyId }}"
            secretKey: "{{ secretKey }}"
          serviceAccountKey: "{{ serviceAccountKey }}"
        kinesis:
          format: "{{ format }}"
          streamName: "{{ streamName }}"
          region: "{{ region }}"
          useEnhancedFanOut: {{ useEnhancedFanOut }}
          iteratorType: "{{ iteratorType }}"
          timestamp: {{ timestamp }}
          authentication: "{{ authentication }}"
          iamRole: "{{ iamRole }}"
          accessKey:
            accessKeyId: "{{ accessKeyId }}"
            secretKey: "{{ secretKey }}"
        pubsub:
          format: "{{ format }}"
          projectId: "{{ projectId }}"
          topic: "{{ topic }}"
          authentication: "{{ authentication }}"
          seekType: "{{ seekType }}"
          seekTimestamp: "{{ seekTimestamp }}"
          filter: "{{ filter }}"
          enableOrdering: {{ enableOrdering }}
          ackDeadline: {{ ackDeadline }}
          serviceAccountKey:
            serviceAccountFile: "{{ serviceAccountFile }}"
        postgres:
          type: "{{ type }}"
          credentials:
            username: "{{ username }}"
            password: "{{ password }}"
          host: "{{ host }}"
          port: {{ port }}
          database: "{{ database }}"
          settings:
            syncIntervalSeconds: {{ syncIntervalSeconds }}
            pullBatchSize: {{ pullBatchSize }}
            publicationName: "{{ publicationName }}"
            replicationMode: "{{ replicationMode }}"
            replicationSlotName: "{{ replicationSlotName }}"
            allowNullableColumns: {{ allowNullableColumns }}
            initialLoadParallelism: {{ initialLoadParallelism }}
            snapshotNumRowsPerPartition: {{ snapshotNumRowsPerPartition }}
            snapshotNumberOfParallelTables: {{ snapshotNumberOfParallelTables }}
            enableFailoverSlots: {{ enableFailoverSlots }}
            deleteOnMerge: {{ deleteOnMerge }}
          authentication: "{{ authentication }}"
          iamRole: "{{ iamRole }}"
          tlsHost: "{{ tlsHost }}"
          caCertificate: "{{ caCertificate }}"
          disableTls: {{ disableTls }}
          skipCertVerification: {{ skipCertVerification }}
          tableMappings:
            - sourceSchemaName: "{{ sourceSchemaName }}"
              sourceTable: "{{ sourceTable }}"
              targetTable: "{{ targetTable }}"
              excludedColumns: "{{ excludedColumns }}"
              useCustomSortingKey: {{ useCustomSortingKey }}
              sortingKeys: "{{ sortingKeys }}"
              tableEngine: "{{ tableEngine }}"
              partitionKey: "{{ partitionKey }}"
              partitionByExpr: "{{ partitionByExpr }}"
        mysql:
          type: "{{ type }}"
          credentials:
            username: "{{ username }}"
            password: "{{ password }}"
          host: "{{ host }}"
          port: {{ port }}
          settings:
            syncIntervalSeconds: {{ syncIntervalSeconds }}
            pullBatchSize: {{ pullBatchSize }}
            replicationMode: "{{ replicationMode }}"
            replicationMechanism: "{{ replicationMechanism }}"
            useCompression: {{ useCompression }}
            allowNullableColumns: {{ allowNullableColumns }}
            initialLoadParallelism: {{ initialLoadParallelism }}
            snapshotNumRowsPerPartition: {{ snapshotNumRowsPerPartition }}
            snapshotNumberOfParallelTables: {{ snapshotNumberOfParallelTables }}
            deleteOnMerge: {{ deleteOnMerge }}
          authentication: "{{ authentication }}"
          iamRole: "{{ iamRole }}"
          tlsHost: "{{ tlsHost }}"
          caCertificate: "{{ caCertificate }}"
          disableTls: {{ disableTls }}
          skipCertVerification: {{ skipCertVerification }}
          serverId: {{ serverId }}
          tableMappings:
            - sourceSchemaName: "{{ sourceSchemaName }}"
              sourceTable: "{{ sourceTable }}"
              targetTable: "{{ targetTable }}"
              excludedColumns: "{{ excludedColumns }}"
              useCustomSortingKey: {{ useCustomSortingKey }}
              sortingKeys: "{{ sortingKeys }}"
              tableEngine: "{{ tableEngine }}"
              partitionKey: "{{ partitionKey }}"
        bigquery:
          snapshotStagingPath: "{{ snapshotStagingPath }}"
          settings:
            replicationMode: "{{ replicationMode }}"
            allowNullableColumns: {{ allowNullableColumns }}
            initialLoadParallelism: {{ initialLoadParallelism }}
            snapshotNumRowsPerPartition: {{ snapshotNumRowsPerPartition }}
            snapshotNumberOfParallelTables: {{ snapshotNumberOfParallelTables }}
          tableMappings:
            - sourceDatasetName: "{{ sourceDatasetName }}"
              sourceTable: "{{ sourceTable }}"
              targetTable: "{{ targetTable }}"
              excludedColumns: "{{ excludedColumns }}"
              useCustomSortingKey: {{ useCustomSortingKey }}
              sortingKeys: "{{ sortingKeys }}"
              tableEngine: "{{ tableEngine }}"
          credentials:
            serviceAccountFile: "{{ serviceAccountFile }}"
        mongodb:
          credentials:
            username: "{{ username }}"
            password: "{{ password }}"
          uri: "{{ uri }}"
          readPreference: "{{ readPreference }}"
          tlsHost: "{{ tlsHost }}"
          disableTls: {{ disableTls }}
          skipCertVerification: {{ skipCertVerification }}
          caCertificate: "{{ caCertificate }}"
          settings:
            syncIntervalSeconds: {{ syncIntervalSeconds }}
            pullBatchSize: {{ pullBatchSize }}
            replicationMode: "{{ replicationMode }}"
            snapshotNumRowsPerPartition: {{ snapshotNumRowsPerPartition }}
            snapshotNumberOfParallelTables: {{ snapshotNumberOfParallelTables }}
            deleteOnMerge: {{ deleteOnMerge }}
            useJsonNativeFormat: {{ useJsonNativeFormat }}
          tableMappings:
            - sourceDatabaseName: "{{ sourceDatabaseName }}"
              sourceCollection: "{{ sourceCollection }}"
              targetTable: "{{ targetTable }}"
              tableEngine: "{{ tableEngine }}"
        validateSamples: {{ validateSamples }}
    - name: destination
      value:
        database: "{{ database }}"
        table: "{{ table }}"
        managedTable: {{ managedTable }}
        tableDefinition:
          engine:
            type: "{{ type }}"
            versionColumnId: "{{ versionColumnId }}"
            columnIds:
              - "{{ columnIds }}"
          sortingKey:
            - "{{ sortingKey }}"
          partitionBy: "{{ partitionBy }}"
          primaryKey: "{{ primaryKey }}"
        columns:
          - name: "{{ name }}"
            type: "{{ type }}"
        roles:
          - "{{ roles }}"
    - name: fieldMappings
      description: |
        Field mappings of the ClickPipe. Note that all destination columns must be included in the mappings.
      value:
        - sourceField: "{{ sourceField }}"
          destinationField: "{{ destinationField }}"
    - name: scaling
      value:
        replicas: {{ replicas }}
        concurrency: {{ concurrency }}
        replicaCpuMillicores: {{ replicaCpuMillicores }}
        replicaMemoryGb: {{ replicaMemoryGb }}
    - name: settings
      value:
        streaming_max_insert_wait_ms: {{ streaming_max_insert_wait_ms }}
        object_storage_concurrency: {{ object_storage_concurrency }}
        object_storage_polling_interval_ms: {{ object_storage_polling_interval_ms }}
        object_storage_max_insert_bytes: {{ object_storage_max_insert_bytes }}
        object_storage_max_file_count: {{ object_storage_max_file_count }}
        clickhouse_max_threads: {{ clickhouse_max_threads }}
        clickhouse_max_insert_threads: {{ clickhouse_max_insert_threads }}
        clickhouse_min_insert_block_size_bytes: {{ clickhouse_min_insert_block_size_bytes }}
        clickhouse_max_download_threads: {{ clickhouse_max_download_threads }}
        clickhouse_parallel_distributed_insert_select: {{ clickhouse_parallel_distributed_insert_select }}
        kafka_read_committed: {{ kafka_read_committed }}
        object_storage_use_cluster_function: {{ object_storage_use_cluster_function }}
        clickhouse_parallel_view_processing: {{ clickhouse_parallel_view_processing }}
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

Update the specified ClickPipe. Source fields not present in the per-source update schemas are immutable after creation. For Kafka sources, values submitted for immutable fields (type, format, brokers, topics, consumerGroup, offset, schemaRegistry, exactlyOnce) are not applied, except schema registry credentials, which are rejected.

```sql
UPDATE clickhouse.clickpipes.clickpipes
SET 
name = '{{ name }}',
source = '{{ source }}',
destination = '{{ destination }}',
fieldMappings = '{{ fieldMappings }}',
settings = '{{ settings }}'
WHERE 
serviceId = '{{ serviceId }}' --required
AND clickPipeId = '{{ clickPipeId }}' --required
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

Delete the specified ClickPipe.

```sql
DELETE FROM clickhouse.clickpipes.clickpipes
WHERE serviceId = '{{ serviceId }}' --required
AND clickPipeId = '{{ clickPipeId }}' --required
AND organization_id = '{{ organization_id }}' --required unless CLICKHOUSE_ORG_ID is set
;
```
</TabItem>
</Tabs>


## Lifecycle Methods

<Tabs
    defaultValue="schema_discovery"
    values={[
        { label: 'schema_discovery', value: 'schema_discovery' },
        { label: 'update_state', value: 'update_state' }
    ]}
>
<TabItem value="schema_discovery">

**This endpoint is in beta.** API contract is stable, and no breaking changes are expected in the future. &lt;br /&gt;&lt;br /&gt; Infers the schema (field names and ClickHouse data types) of a ClickPipe source without creating a pipe. Supported for Kafka, Kinesis, Pub/Sub, and object storage sources. Object storage inference runs on the destination service, which must be running.

```sql
EXEC clickhouse.clickpipes.clickpipes.schema_discovery 
@serviceId='{{ serviceId }}' --required, 
@organization_id='{{ organization_id }}' --required unless CLICKHOUSE_ORG_ID is set 
@@json=
'{
"source": "{{ source }}"
}'
;
```
</TabItem>
<TabItem value="update_state">

Start, stop or resync ClickPipe. Stopping a ClickPipe will stop the ingestion process from any state. Starting is allowed for ClickPipes in the "Stopped" state or with a "Failed" state. Resyncing is only for Postgres and MySQL pipes and can be done from any state.

```sql
EXEC clickhouse.clickpipes.clickpipes.update_state 
@serviceId='{{ serviceId }}' --required, 
@clickPipeId='{{ clickPipeId }}' --required, 
@organization_id='{{ organization_id }}' --required unless CLICKHOUSE_ORG_ID is set 
@@json=
'{
"command": "{{ command }}"
}'
;
```
</TabItem>
</Tabs>

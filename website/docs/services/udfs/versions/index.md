--- 
title: versions
hide_title: false
hide_table_of_contents: false
keywords:
  - versions
  - udfs
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

Creates, updates, deletes, gets or lists a <code>versions</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="versions" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="clickhouse.udfs.versions" /></td></tr>
</tbody></table>

## Fields

The following fields are returned by `SELECT` queries:

<Tabs
    defaultValue="list"
    values={[
        { label: 'list', value: 'list' }
    ]}
>
<TabItem value="list">

Successful response.

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
    <td><CopyableCode code="arguments" /></td>
    <td><code>array</code></td>
    <td>Arguments passed to the UDF command.</td>
</tr>
<tr>
    <td><CopyableCode code="commandReadTimeout" /></td>
    <td><code>integer</code></td>
    <td>Command stdout read timeout in milliseconds.</td>
</tr>
<tr>
    <td><CopyableCode code="commandWriteTimeout" /></td>
    <td><code>integer</code></td>
    <td>Command stdin write timeout in milliseconds.</td>
</tr>
<tr>
    <td><CopyableCode code="createdAt" /></td>
    <td><code>string (date-time)</code></td>
    <td>Creation timestamp.</td>
</tr>
<tr>
    <td><CopyableCode code="error" /></td>
    <td><code>string</code></td>
    <td>Build error, or null when no build error is present.</td>
</tr>
<tr>
    <td><CopyableCode code="format" /></td>
    <td><code>string</code></td>
    <td>Input and output format used by the UDF command.</td>
</tr>
<tr>
    <td><CopyableCode code="functionName" /></td>
    <td><code>string</code></td>
    <td>Name of the UDF. Unique within the organization.</td>
</tr>
<tr>
    <td><CopyableCode code="maxCommandExecutionTime" /></td>
    <td><code>integer</code></td>
    <td>Maximum command execution time in seconds for executable_pool UDFs.</td>
</tr>
<tr>
    <td><CopyableCode code="memoryLimitMib" /></td>
    <td><code>integer</code></td>
    <td>Maximum memory, in MiB, available to each UDF sandbox process. Null uses the sandbox default.</td>
</tr>
<tr>
    <td><CopyableCode code="poolSize" /></td>
    <td><code>integer</code></td>
    <td>Command pool size for executable_pool UDFs.</td>
</tr>
<tr>
    <td><CopyableCode code="returnName" /></td>
    <td><code>string</code></td>
    <td>Name of the returned value, or null when unnamed.</td>
</tr>
<tr>
    <td><CopyableCode code="returnType" /></td>
    <td><code>string</code></td>
    <td>ClickHouse data type of the returned value.</td>
</tr>
<tr>
    <td><CopyableCode code="runtime" /></td>
    <td><code>string</code></td>
    <td>Runtime used to execute the UDF command. (python3.11, native)</td>
</tr>
<tr>
    <td><CopyableCode code="sandboxType" /></td>
    <td><code>string</code></td>
    <td>Sandbox isolation level. (basic, netenable)</td>
</tr>
<tr>
    <td><CopyableCode code="sandboxVersion" /></td>
    <td><code>string</code></td>
    <td>Sandbox runtime version. (v1, v2, v3)</td>
</tr>
<tr>
    <td><CopyableCode code="sendChunkHeader" /></td>
    <td><code>boolean</code></td>
    <td>Whether ClickHouse sends a row-count chunk header.</td>
</tr>
<tr>
    <td><CopyableCode code="status" /></td>
    <td><code>string</code></td>
    <td>Build state of this UDF version. (building, error, ready)</td>
</tr>
<tr>
    <td><CopyableCode code="type" /></td>
    <td><code>string</code></td>
    <td>Executable UDF type. (executable, executable_pool)</td>
</tr>
<tr>
    <td><CopyableCode code="updatedAt" /></td>
    <td><code>string (date-time)</code></td>
    <td>Last-update timestamp.</td>
</tr>
<tr>
    <td><CopyableCode code="version" /></td>
    <td><code>integer</code></td>
    <td>Version number of the UDF.</td>
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
    <td><a href="#list"><CopyableCode code="list" /></a></td>
    <td><CopyableCode code="select" /></td>
    <td><a href="#parameter-functionName"><code>functionName</code></a>, <a href="#parameter-organization_id"><code>organization_id</code></a></td>
    <td><a href="#parameter-cursor"><code>cursor</code></a>, <a href="#parameter-limit"><code>limit</code></a></td>
    <td>**Disclaimer:** This beta endpoint is evolving; the API contract may change. &lt;br /&gt;&lt;br /&gt; Returns all versions of a UDF.</td>
</tr>
<tr>
    <td><a href="#create"><CopyableCode code="create" /></a></td>
    <td><CopyableCode code="insert" /></td>
    <td><a href="#parameter-functionName"><code>functionName</code></a>, <a href="#parameter-organization_id"><code>organization_id</code></a>, <a href="#parameter-uploadId"><code>uploadId</code></a>, <a href="#parameter-runtime"><code>runtime</code></a>, <a href="#parameter-arguments"><code>arguments</code></a>, <a href="#parameter-returnType"><code>returnType</code></a>, <a href="#parameter-type"><code>type</code></a></td>
    <td></td>
    <td>**Disclaimer:** This beta endpoint is evolving; the API contract may change. &lt;br /&gt;&lt;br /&gt; Consumes a source archive, assigns a version, and starts the UDF build. Optional configuration fields omitted from the request use the defaults documented in the request schema; values are not inherited from the previous version. Retry by requesting a new upload URL and re-uploading.</td>
</tr>
<tr>
    <td><a href="#delete"><CopyableCode code="delete" /></a></td>
    <td><CopyableCode code="delete" /></td>
    <td><a href="#parameter-functionName"><code>functionName</code></a>, <a href="#parameter-version"><code>version</code></a>, <a href="#parameter-organization_id"><code>organization_id</code></a></td>
    <td></td>
    <td>**Disclaimer:** This beta endpoint is evolving; the API contract may change. &lt;br /&gt;&lt;br /&gt; Deletes a UDF version. The UDF must not be attached to any services.</td>
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
<tr id="parameter-functionName">
    <td><CopyableCode code="functionName" /></td>
    <td><code>string</code></td>
    <td>Name of the UDF.</td>
</tr>
<tr id="parameter-organization_id">
    <td><CopyableCode code="organization_id" /></td>
    <td><code>string</code></td>
    <td>ClickHouse Cloud organization ID. Resolved from the CLICKHOUSE_ORG_ID environment variable when it is set (x-stackQL-envVar); otherwise it must be supplied on every query as WHERE organization_id = &lt;uuid&gt;. A WHERE value always takes precedence over the environment. (x-stackQL-envVar: CLICKHOUSE_ORG_ID)</td>
</tr>
<tr id="parameter-version">
    <td><CopyableCode code="version" /></td>
    <td><code>integer</code></td>
    <td>Version number of the UDF.</td>
</tr>
<tr id="parameter-cursor">
    <td><CopyableCode code="cursor" /></td>
    <td><code>string</code></td>
    <td>Cursor returned in `pagination.nextCursor` from the previous page.</td>
</tr>
<tr id="parameter-limit">
    <td><CopyableCode code="limit" /></td>
    <td><code>integer</code></td>
    <td>Maximum number of records to return per page. Defaults to 100. Maximum is 100.</td>
</tr>
</tbody>
</table>

## `SELECT` examples

<Tabs
    defaultValue="list"
    values={[
        { label: 'list', value: 'list' }
    ]}
>
<TabItem value="list">

**Disclaimer:** This beta endpoint is evolving; the API contract may change. &lt;br /&gt;&lt;br /&gt; Returns all versions of a UDF.

```sql
SELECT
arguments,
commandReadTimeout,
commandWriteTimeout,
createdAt,
error,
format,
functionName,
maxCommandExecutionTime,
memoryLimitMib,
poolSize,
returnName,
returnType,
runtime,
sandboxType,
sandboxVersion,
sendChunkHeader,
status,
type,
updatedAt,
version
FROM clickhouse.udfs.versions
WHERE functionName = '{{ functionName }}' -- required
AND organization_id = '{{ organization_id }}' -- required unless CLICKHOUSE_ORG_ID is set
AND cursor = '{{ cursor }}'
AND limit = '{{ limit }}'
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

**Disclaimer:** This beta endpoint is evolving; the API contract may change. &lt;br /&gt;&lt;br /&gt; Consumes a source archive, assigns a version, and starts the UDF build. Optional configuration fields omitted from the request use the defaults documented in the request schema; values are not inherited from the previous version. Retry by requesting a new upload URL and re-uploading.

```sql
INSERT INTO clickhouse.udfs.versions (
uploadId,
runtime,
arguments,
returnType,
returnName,
commandReadTimeout,
commandWriteTimeout,
memoryLimitMib,
sendChunkHeader,
format,
sandboxType,
sandboxVersion,
type,
poolSize,
maxCommandExecutionTime,
functionName,
organization_id
)
SELECT 
'{{ uploadId }}' /* required */,
'{{ runtime }}' /* required */,
'{{ arguments }}' /* required */,
'{{ returnType }}' /* required */,
'{{ returnName }}',
{{ commandReadTimeout }},
{{ commandWriteTimeout }},
'{{ memoryLimitMib }}',
{{ sendChunkHeader }},
'{{ format }}',
'{{ sandboxType }}',
'{{ sandboxVersion }}',
'{{ type }}' /* required */,
'{{ poolSize }}',
'{{ maxCommandExecutionTime }}',
'{{ functionName }}',
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
- name: versions
  props:
    - name: functionName
      value: "{{ functionName }}"
      description: Required parameter for the versions resource.
    - name: organization_id
      value: "{{ organization_id }}"
      description: Required parameter for the versions resource.
    - name: uploadId
      value: "{{ uploadId }}"
      description: |
        Identifier of the uploaded source archive.
    - name: runtime
      value: "{{ runtime }}"
      valid_values: ['python3.11', 'native']
    - name: arguments
      value:
        - name: "{{ name }}"
          type: "{{ type }}"
    - name: returnType
      value: "{{ returnType }}"
    - name: returnName
      value: "{{ returnName }}"
      default: null
    - name: commandReadTimeout
      value: {{ commandReadTimeout }}
      default: 10000
    - name: commandWriteTimeout
      value: {{ commandWriteTimeout }}
      default: 10000
    - name: memoryLimitMib
      value: "{{ memoryLimitMib }}"
      default: null
    - name: sendChunkHeader
      value: {{ sendChunkHeader }}
      default: false
    - name: format
      value: "{{ format }}"
      default: TabSeparated
    - name: sandboxType
      value: "{{ sandboxType }}"
      valid_values: ['basic', 'netenable']
      default: basic
    - name: sandboxVersion
      value: "{{ sandboxVersion }}"
      valid_values: ['v1', 'v2', 'v3']
      default: v2
    - name: type
      value: "{{ type }}"
    - name: poolSize
      value: "{{ poolSize }}"
      default: null
    - name: maxCommandExecutionTime
      value: "{{ maxCommandExecutionTime }}"
      default: 10
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

**Disclaimer:** This beta endpoint is evolving; the API contract may change. &lt;br /&gt;&lt;br /&gt; Deletes a UDF version. The UDF must not be attached to any services.

```sql
DELETE FROM clickhouse.udfs.versions
WHERE functionName = '{{ functionName }}' --required
AND version = '{{ version }}' --required
AND organization_id = '{{ organization_id }}' --required unless CLICKHOUSE_ORG_ID is set
;
```
</TabItem>
</Tabs>

--- 
title: functions
hide_title: false
hide_table_of_contents: false
keywords:
  - functions
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

Creates, updates, deletes, gets or lists a <code>functions</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="functions" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="clickhouse.udfs.functions" /></td></tr>
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
    <td><CopyableCode code="function_name" /></td>
    <td><code>string</code></td>
    <td>Name of the UDF. Unique within the organization. (wire: functionName)</td>
</tr>
<tr>
    <td><CopyableCode code="return_name" /></td>
    <td><code>string</code></td>
    <td>Name of the returned value, or null when unnamed. (wire: returnName)</td>
</tr>
<tr>
    <td><CopyableCode code="arguments" /></td>
    <td><code>array</code></td>
    <td>Arguments passed to the UDF command.</td>
</tr>
<tr>
    <td><CopyableCode code="command_read_timeout" /></td>
    <td><code>integer</code></td>
    <td>Command stdout read timeout in milliseconds. (wire: commandReadTimeout)</td>
</tr>
<tr>
    <td><CopyableCode code="command_write_timeout" /></td>
    <td><code>integer</code></td>
    <td>Command stdin write timeout in milliseconds. (wire: commandWriteTimeout)</td>
</tr>
<tr>
    <td><CopyableCode code="created_at" /></td>
    <td><code>string (date-time)</code></td>
    <td>Creation timestamp. (wire: createdAt)</td>
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
    <td><CopyableCode code="max_command_execution_time" /></td>
    <td><code>integer</code></td>
    <td>Maximum command execution time in seconds for executable_pool UDFs. (wire: maxCommandExecutionTime)</td>
</tr>
<tr>
    <td><CopyableCode code="memory_limit_mib" /></td>
    <td><code>integer</code></td>
    <td>Maximum memory, in MiB, available to each UDF sandbox process. Null uses the sandbox default. (wire: memoryLimitMib)</td>
</tr>
<tr>
    <td><CopyableCode code="pool_size" /></td>
    <td><code>integer</code></td>
    <td>Command pool size for executable_pool UDFs. (wire: poolSize)</td>
</tr>
<tr>
    <td><CopyableCode code="return_type" /></td>
    <td><code>string</code></td>
    <td>ClickHouse data type of the returned value. (wire: returnType)</td>
</tr>
<tr>
    <td><CopyableCode code="runtime" /></td>
    <td><code>string</code></td>
    <td>Runtime used to execute the UDF command. (python3.11, native)</td>
</tr>
<tr>
    <td><CopyableCode code="sandbox_type" /></td>
    <td><code>string</code></td>
    <td>Sandbox isolation level. (basic, netenable) (wire: sandboxType)</td>
</tr>
<tr>
    <td><CopyableCode code="sandbox_version" /></td>
    <td><code>string</code></td>
    <td>Sandbox runtime version. (v1, v2, v3) (wire: sandboxVersion)</td>
</tr>
<tr>
    <td><CopyableCode code="send_chunk_header" /></td>
    <td><code>boolean</code></td>
    <td>Whether ClickHouse sends a row-count chunk header. (wire: sendChunkHeader)</td>
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
    <td><CopyableCode code="updated_at" /></td>
    <td><code>string (date-time)</code></td>
    <td>Last-update timestamp. (wire: updatedAt)</td>
</tr>
<tr>
    <td><CopyableCode code="version" /></td>
    <td><code>integer</code></td>
    <td>Version number of the UDF.</td>
</tr>
</tbody>
</table>
</TabItem>
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
    <td><CopyableCode code="function_name" /></td>
    <td><code>string</code></td>
    <td>Name of the UDF. Unique within the organization. (wire: functionName)</td>
</tr>
<tr>
    <td><CopyableCode code="return_name" /></td>
    <td><code>string</code></td>
    <td>Name of the returned value, or null when unnamed. (wire: returnName)</td>
</tr>
<tr>
    <td><CopyableCode code="arguments" /></td>
    <td><code>array</code></td>
    <td>Arguments passed to the UDF command.</td>
</tr>
<tr>
    <td><CopyableCode code="command_read_timeout" /></td>
    <td><code>integer</code></td>
    <td>Command stdout read timeout in milliseconds. (wire: commandReadTimeout)</td>
</tr>
<tr>
    <td><CopyableCode code="command_write_timeout" /></td>
    <td><code>integer</code></td>
    <td>Command stdin write timeout in milliseconds. (wire: commandWriteTimeout)</td>
</tr>
<tr>
    <td><CopyableCode code="created_at" /></td>
    <td><code>string (date-time)</code></td>
    <td>Creation timestamp. (wire: createdAt)</td>
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
    <td><CopyableCode code="max_command_execution_time" /></td>
    <td><code>integer</code></td>
    <td>Maximum command execution time in seconds for executable_pool UDFs. (wire: maxCommandExecutionTime)</td>
</tr>
<tr>
    <td><CopyableCode code="memory_limit_mib" /></td>
    <td><code>integer</code></td>
    <td>Maximum memory, in MiB, available to each UDF sandbox process. Null uses the sandbox default. (wire: memoryLimitMib)</td>
</tr>
<tr>
    <td><CopyableCode code="pool_size" /></td>
    <td><code>integer</code></td>
    <td>Command pool size for executable_pool UDFs. (wire: poolSize)</td>
</tr>
<tr>
    <td><CopyableCode code="return_type" /></td>
    <td><code>string</code></td>
    <td>ClickHouse data type of the returned value. (wire: returnType)</td>
</tr>
<tr>
    <td><CopyableCode code="runtime" /></td>
    <td><code>string</code></td>
    <td>Runtime used to execute the UDF command. (python3.11, native)</td>
</tr>
<tr>
    <td><CopyableCode code="sandbox_type" /></td>
    <td><code>string</code></td>
    <td>Sandbox isolation level. (basic, netenable) (wire: sandboxType)</td>
</tr>
<tr>
    <td><CopyableCode code="sandbox_version" /></td>
    <td><code>string</code></td>
    <td>Sandbox runtime version. (v1, v2, v3) (wire: sandboxVersion)</td>
</tr>
<tr>
    <td><CopyableCode code="send_chunk_header" /></td>
    <td><code>boolean</code></td>
    <td>Whether ClickHouse sends a row-count chunk header. (wire: sendChunkHeader)</td>
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
    <td><CopyableCode code="updated_at" /></td>
    <td><code>string (date-time)</code></td>
    <td>Last-update timestamp. (wire: updatedAt)</td>
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
    <td><a href="#get"><CopyableCode code="get" /></a></td>
    <td><CopyableCode code="select" /></td>
    <td><a href="#parameter-function_name"><code>function_name</code></a>, <a href="#parameter-organization_id"><code>organization_id</code></a></td>
    <td></td>
    <td>**Disclaimer:** This beta endpoint is evolving; the API contract may change. &lt;br /&gt;&lt;br /&gt; Returns the latest version of a UDF.</td>
</tr>
<tr>
    <td><a href="#list"><CopyableCode code="list" /></a></td>
    <td><CopyableCode code="select" /></td>
    <td><a href="#parameter-organization_id"><code>organization_id</code></a></td>
    <td><a href="#parameter-cursor"><code>cursor</code></a>, <a href="#parameter-limit"><code>limit</code></a></td>
    <td>**Disclaimer:** This beta endpoint is evolving; the API contract may change. &lt;br /&gt;&lt;br /&gt; Returns the latest version of each UDF in the organization.</td>
</tr>
<tr>
    <td><a href="#create"><CopyableCode code="create" /></a></td>
    <td><CopyableCode code="insert" /></td>
    <td><a href="#parameter-organization_id"><code>organization_id</code></a>, <a href="#parameter-upload_id"><code>upload_id</code></a>, <a href="#parameter-runtime"><code>runtime</code></a>, <a href="#parameter-arguments"><code>arguments</code></a>, <a href="#parameter-return_type"><code>return_type</code></a>, <a href="#parameter-type"><code>type</code></a>, <a href="#parameter-function_name"><code>function_name</code></a></td>
    <td></td>
    <td>**Disclaimer:** This beta endpoint is evolving; the API contract may change. &lt;br /&gt;&lt;br /&gt; Creates a new UDF. See &#91;User-defined functions in Cloud&#93;(https:​//clickhouse.com/docs/products/cloud/features/sql-console-features/user-defined-functions).</td>
</tr>
<tr>
    <td><a href="#delete"><CopyableCode code="delete" /></a></td>
    <td><CopyableCode code="delete" /></td>
    <td><a href="#parameter-function_name"><code>function_name</code></a>, <a href="#parameter-organization_id"><code>organization_id</code></a></td>
    <td></td>
    <td>**Disclaimer:** This beta endpoint is evolving; the API contract may change. &lt;br /&gt;&lt;br /&gt; Deletes every version of a UDF and detaches it from all services. Removal from services completes asynchronously.</td>
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
<tr id="parameter-function_name">
    <td><CopyableCode code="function_name" /></td>
    <td><code>string</code></td>
    <td>Name of the UDF. (wire: functionName)</td>
</tr>
<tr id="parameter-organization_id">
    <td><CopyableCode code="organization_id" /></td>
    <td><code>string</code></td>
    <td>ClickHouse Cloud organization ID. Resolved from the CLICKHOUSE_ORG_ID environment variable when it is set (x-stackQL-envVar); otherwise it must be supplied on every query as WHERE organization_id = &lt;uuid&gt;. A WHERE value always takes precedence over the environment. (x-stackQL-envVar: CLICKHOUSE_ORG_ID)</td>
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
    defaultValue="get"
    values={[
        { label: 'get', value: 'get' },
        { label: 'list', value: 'list' }
    ]}
>
<TabItem value="get">

**Disclaimer:** This beta endpoint is evolving; the API contract may change. &lt;br /&gt;&lt;br /&gt; Returns the latest version of a UDF.

```sql
SELECT
function_name,
return_name,
arguments,
command_read_timeout,
command_write_timeout,
created_at,
error,
format,
max_command_execution_time,
memory_limit_mib,
pool_size,
return_type,
runtime,
sandbox_type,
sandbox_version,
send_chunk_header,
status,
type,
updated_at,
version
FROM clickhouse.udfs.functions
WHERE function_name = '{{ function_name }}' -- required
AND organization_id = '{{ organization_id }}' -- required unless CLICKHOUSE_ORG_ID is set
;
```
</TabItem>
<TabItem value="list">

**Disclaimer:** This beta endpoint is evolving; the API contract may change. &lt;br /&gt;&lt;br /&gt; Returns the latest version of each UDF in the organization.

```sql
SELECT
function_name,
return_name,
arguments,
command_read_timeout,
command_write_timeout,
created_at,
error,
format,
max_command_execution_time,
memory_limit_mib,
pool_size,
return_type,
runtime,
sandbox_type,
sandbox_version,
send_chunk_header,
status,
type,
updated_at,
version
FROM clickhouse.udfs.functions
WHERE organization_id = '{{ organization_id }}' -- required unless CLICKHOUSE_ORG_ID is set
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

**Disclaimer:** This beta endpoint is evolving; the API contract may change. &lt;br /&gt;&lt;br /&gt; Creates a new UDF. See &#91;User-defined functions in Cloud&#93;(https:​//clickhouse.com/docs/products/cloud/features/sql-console-features/user-defined-functions).

```sql
INSERT INTO clickhouse.udfs.functions (
upload_id,
runtime,
arguments,
return_type,
return_name,
command_read_timeout,
command_write_timeout,
memory_limit_mib,
send_chunk_header,
format,
sandbox_type,
sandbox_version,
type,
pool_size,
max_command_execution_time,
function_name,
organization_id
)
SELECT 
'{{ upload_id }}' /* required */,
'{{ runtime }}' /* required */,
'{{ arguments }}' /* required */,
'{{ return_type }}' /* required */,
'{{ return_name }}',
{{ command_read_timeout }},
{{ command_write_timeout }},
'{{ memory_limit_mib }}',
{{ send_chunk_header }},
'{{ format }}',
'{{ sandbox_type }}',
'{{ sandbox_version }}',
'{{ type }}' /* required */,
'{{ pool_size }}',
'{{ max_command_execution_time }}',
'{{ function_name }}' /* required */,
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
- name: functions
  props:
    - name: organization_id
      value: "{{ organization_id }}"
      description: Required parameter for the functions resource.
    - name: upload_id
      value: "{{ upload_id }}"
      description: |
        Identifier of the uploaded source archive.
    - name: runtime
      value: "{{ runtime }}"
      valid_values: ['python3.11', 'native']
    - name: arguments
      value:
        - name: "{{ name }}"
          type: "{{ type }}"
    - name: return_type
      value: "{{ return_type }}"
    - name: return_name
      value: "{{ return_name }}"
      default: null
    - name: command_read_timeout
      value: {{ command_read_timeout }}
      default: 10000
    - name: command_write_timeout
      value: {{ command_write_timeout }}
      default: 10000
    - name: memory_limit_mib
      value: "{{ memory_limit_mib }}"
      default: null
    - name: send_chunk_header
      value: {{ send_chunk_header }}
      default: false
    - name: format
      value: "{{ format }}"
      default: TabSeparated
    - name: sandbox_type
      value: "{{ sandbox_type }}"
      valid_values: ['basic', 'netenable']
      default: basic
    - name: sandbox_version
      value: "{{ sandbox_version }}"
      valid_values: ['v1', 'v2', 'v3']
      default: v2
    - name: type
      value: "{{ type }}"
    - name: pool_size
      value: "{{ pool_size }}"
      default: null
    - name: max_command_execution_time
      value: "{{ max_command_execution_time }}"
      default: 10
    - name: function_name
      value: "{{ function_name }}"
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

**Disclaimer:** This beta endpoint is evolving; the API contract may change. &lt;br /&gt;&lt;br /&gt; Deletes every version of a UDF and detaches it from all services. Removal from services completes asynchronously.

```sql
DELETE FROM clickhouse.udfs.functions
WHERE function_name = '{{ function_name }}' --required
AND organization_id = '{{ organization_id }}' --required unless CLICKHOUSE_ORG_ID is set
;
```
</TabItem>
</Tabs>

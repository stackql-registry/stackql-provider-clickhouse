--- 
title: upload_urls
hide_title: false
hide_table_of_contents: false
keywords:
  - upload_urls
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

Creates, updates, deletes, gets or lists a <code>upload_urls</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="upload_urls" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="clickhouse.udfs.upload_urls" /></td></tr>
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
    <td><a href="#create"><CopyableCode code="create" /></a></td>
    <td><CopyableCode code="insert" /></td>
    <td><a href="#parameter-organizationId"><code>organizationId</code></a></td>
    <td></td>
    <td>**Disclaimer:** This beta endpoint is evolving; the API contract may change. &lt;br /&gt;&lt;br /&gt; Creates an org-scoped presigned application/zip upload URL. Callers must use an upload ID for only one create or version attempt and request a new upload URL when retrying.</td>
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
<tr id="parameter-organizationId">
    <td><CopyableCode code="organizationId" /></td>
    <td><code>string</code></td>
    <td>ClickHouse Cloud organization ID. Resolved from the CLICKHOUSE_ORG_ID environment variable when it is set (x-stackQL-envVar); otherwise it must be supplied on every query as WHERE organizationId = &lt;uuid&gt;. A WHERE value always takes precedence over the environment. (x-stackQL-envVar: CLICKHOUSE_ORG_ID)</td>
</tr>
</tbody>
</table>

## `INSERT` examples

<Tabs
    defaultValue="create"
    values={[
        { label: 'create', value: 'create' },
        { label: 'Manifest', value: 'manifest' }
    ]}
>
<TabItem value="create">

**Disclaimer:** This beta endpoint is evolving; the API contract may change. &lt;br /&gt;&lt;br /&gt; Creates an org-scoped presigned application/zip upload URL. Callers must use an upload ID for only one create or version attempt and request a new upload URL when retrying.

```sql
INSERT INTO clickhouse.udfs.upload_urls (
organizationId
)
SELECT 
'{{ organizationId }}'
RETURNING
requestId,
result,
status
;
```
</TabItem>
<TabItem value="manifest">

<CodeBlock language="yaml">{`# Description fields are for documentation purposes
- name: upload_urls
  props:
    - name: organizationId
      value: "{{ organizationId }}"
      description: Required parameter for the upload_urls resource.
`}</CodeBlock>

</TabItem>
</Tabs>

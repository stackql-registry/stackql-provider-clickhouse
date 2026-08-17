--- 
title: saved_searches
hide_title: false
hide_table_of_contents: false
keywords:
  - saved_searches
  - clickstack
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

Creates, updates, deletes, gets or lists a <code>saved_searches</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="saved_searches" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="clickhouse.clickstack.saved_searches" /></td></tr>
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
    <td><code>string</code></td>
    <td>Unique saved search ID. Server-generated. (example: 507f1f77bcf86cd799439011)</td>
</tr>
<tr>
    <td><CopyableCode code="name" /></td>
    <td><code>string</code></td>
    <td>Display name for the saved search. (example: Production Errors)</td>
</tr>
<tr>
    <td><CopyableCode code="source_id" /></td>
    <td><code>string</code></td>
    <td>ID of the source this saved search queries. (example: 507f1f77bcf86cd799439012) (wire: sourceId)</td>
</tr>
<tr>
    <td><CopyableCode code="team_id" /></td>
    <td><code>string</code></td>
    <td>ID of the team that owns the saved search. (example: 507f1f77bcf86cd799439013) (wire: teamId)</td>
</tr>
<tr>
    <td><CopyableCode code="created_at" /></td>
    <td><code>string (date-time)</code></td>
    <td>Creation timestamp. (example: 2025-01-01T00:00:00.000Z) (wire: createdAt)</td>
</tr>
<tr>
    <td><CopyableCode code="filters" /></td>
    <td><code>array</code></td>
    <td>Structured pinned filters applied to the search.</td>
</tr>
<tr>
    <td><CopyableCode code="order_by" /></td>
    <td><code>string</code></td>
    <td>ORDER BY expression. Empty uses the source default. (example: Timestamp DESC) (wire: orderBy)</td>
</tr>
<tr>
    <td><CopyableCode code="select" /></td>
    <td><code>string</code></td>
    <td>Comma-separated list of column expressions to display. Empty uses the source default. (example: Timestamp, ServiceName, Body)</td>
</tr>
<tr>
    <td><CopyableCode code="tags" /></td>
    <td><code>array</code></td>
    <td>Tags used to organize saved searches.</td>
</tr>
<tr>
    <td><CopyableCode code="updated_at" /></td>
    <td><code>string (date-time)</code></td>
    <td>Last update timestamp. (example: 2025-06-15T10:30:00.000Z) (wire: updatedAt)</td>
</tr>
<tr>
    <td><CopyableCode code="where" /></td>
    <td><code>string</code></td>
    <td>Row filter expression. The language is controlled by whereLanguage. (example: SeverityText:ERROR)</td>
</tr>
<tr>
    <td><CopyableCode code="where_language" /></td>
    <td><code>string</code></td>
    <td>Language used for the where filter. (lucene, sql) (example: lucene) (wire: whereLanguage)</td>
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
    <td><code>string</code></td>
    <td>Unique saved search ID. Server-generated. (example: 507f1f77bcf86cd799439011)</td>
</tr>
<tr>
    <td><CopyableCode code="name" /></td>
    <td><code>string</code></td>
    <td>Display name for the saved search. (example: Production Errors)</td>
</tr>
<tr>
    <td><CopyableCode code="source_id" /></td>
    <td><code>string</code></td>
    <td>ID of the source this saved search queries. (example: 507f1f77bcf86cd799439012) (wire: sourceId)</td>
</tr>
<tr>
    <td><CopyableCode code="team_id" /></td>
    <td><code>string</code></td>
    <td>ID of the team that owns the saved search. (example: 507f1f77bcf86cd799439013) (wire: teamId)</td>
</tr>
<tr>
    <td><CopyableCode code="created_at" /></td>
    <td><code>string (date-time)</code></td>
    <td>Creation timestamp. (example: 2025-01-01T00:00:00.000Z) (wire: createdAt)</td>
</tr>
<tr>
    <td><CopyableCode code="filters" /></td>
    <td><code>array</code></td>
    <td>Structured pinned filters applied to the search.</td>
</tr>
<tr>
    <td><CopyableCode code="order_by" /></td>
    <td><code>string</code></td>
    <td>ORDER BY expression. Empty uses the source default. (example: Timestamp DESC) (wire: orderBy)</td>
</tr>
<tr>
    <td><CopyableCode code="select" /></td>
    <td><code>string</code></td>
    <td>Comma-separated list of column expressions to display. Empty uses the source default. (example: Timestamp, ServiceName, Body)</td>
</tr>
<tr>
    <td><CopyableCode code="tags" /></td>
    <td><code>array</code></td>
    <td>Tags used to organize saved searches.</td>
</tr>
<tr>
    <td><CopyableCode code="updated_at" /></td>
    <td><code>string (date-time)</code></td>
    <td>Last update timestamp. (example: 2025-06-15T10:30:00.000Z) (wire: updatedAt)</td>
</tr>
<tr>
    <td><CopyableCode code="where" /></td>
    <td><code>string</code></td>
    <td>Row filter expression. The language is controlled by whereLanguage. (example: SeverityText:ERROR)</td>
</tr>
<tr>
    <td><CopyableCode code="where_language" /></td>
    <td><code>string</code></td>
    <td>Language used for the where filter. (lucene, sql) (example: lucene) (wire: whereLanguage)</td>
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
    <td><a href="#parameter-service_id"><code>service_id</code></a>, <a href="#parameter-click_stack_saved_search_id"><code>click_stack_saved_search_id</code></a>, <a href="#parameter-organization_id"><code>organization_id</code></a></td>
    <td></td>
    <td>**This endpoint is in beta.** API contract is stable, and no breaking changes are expected in the future. &lt;br /&gt;&lt;br /&gt; ClickStack: Retrieves a specific saved search by ID.</td>
</tr>
<tr>
    <td><a href="#list"><CopyableCode code="list" /></a></td>
    <td><CopyableCode code="select" /></td>
    <td><a href="#parameter-service_id"><code>service_id</code></a>, <a href="#parameter-organization_id"><code>organization_id</code></a></td>
    <td><a href="#parameter-limit"><code>limit</code></a>, <a href="#parameter-offset"><code>offset</code></a></td>
    <td>**This endpoint is in beta.** API contract is stable, and no breaking changes are expected in the future. &lt;br /&gt;&lt;br /&gt; ClickStack: Retrieves saved searches for the authenticated team (paginated). Results are capped at `limit` (default and maximum 1000). When `totalCount` exceeds the number of returned items, page with `limit`/`offset` to retrieve them all.</td>
</tr>
<tr>
    <td><a href="#create"><CopyableCode code="create" /></a></td>
    <td><CopyableCode code="insert" /></td>
    <td><a href="#parameter-service_id"><code>service_id</code></a>, <a href="#parameter-organization_id"><code>organization_id</code></a>, <a href="#parameter-name"><code>name</code></a>, <a href="#parameter-source_id"><code>source_id</code></a></td>
    <td></td>
    <td>**This endpoint is in beta.** API contract is stable, and no breaking changes are expected in the future. &lt;br /&gt;&lt;br /&gt; ClickStack: Creates a new saved search.</td>
</tr>
<tr>
    <td><a href="#update"><CopyableCode code="update" /></a></td>
    <td><CopyableCode code="update" /></td>
    <td><a href="#parameter-service_id"><code>service_id</code></a>, <a href="#parameter-click_stack_saved_search_id"><code>click_stack_saved_search_id</code></a>, <a href="#parameter-organization_id"><code>organization_id</code></a>, <a href="#parameter-name"><code>name</code></a>, <a href="#parameter-source_id"><code>source_id</code></a></td>
    <td></td>
    <td>**This endpoint is in beta.** API contract is stable, and no breaking changes are expected in the future. &lt;br /&gt;&lt;br /&gt; ClickStack: Updates an existing saved search. This is a full replace: send the full object. Every optional field (`select`, `where`, `whereLanguage`, `orderBy`, `tags`, `filters`) is always written and falls back to its default when omitted, so omitting a field resets it rather than preserving the stored value.</td>
</tr>
<tr>
    <td><a href="#delete"><CopyableCode code="delete" /></a></td>
    <td><CopyableCode code="delete" /></td>
    <td><a href="#parameter-service_id"><code>service_id</code></a>, <a href="#parameter-click_stack_saved_search_id"><code>click_stack_saved_search_id</code></a>, <a href="#parameter-organization_id"><code>organization_id</code></a></td>
    <td></td>
    <td>**This endpoint is in beta.** API contract is stable, and no breaking changes are expected in the future. &lt;br /&gt;&lt;br /&gt; ClickStack: Deletes a saved search and any alerts attached to it.</td>
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
<tr id="parameter-click_stack_saved_search_id">
    <td><CopyableCode code="click_stack_saved_search_id" /></td>
    <td><code>string</code></td>
    <td>Saved search ID (wire: clickStackSavedSearchId)</td>
</tr>
<tr id="parameter-organization_id">
    <td><CopyableCode code="organization_id" /></td>
    <td><code>string</code></td>
    <td>ClickHouse Cloud organization ID. Resolved from the CLICKHOUSE_ORG_ID environment variable when it is set (x-stackQL-envVar); otherwise it must be supplied on every query as WHERE organization_id = &lt;uuid&gt;. A WHERE value always takes precedence over the environment. (x-stackQL-envVar: CLICKHOUSE_ORG_ID)</td>
</tr>
<tr id="parameter-service_id">
    <td><CopyableCode code="service_id" /></td>
    <td><code>string (uuid)</code></td>
    <td>ID of the ClickStack service. (wire: serviceId)</td>
</tr>
<tr id="parameter-limit">
    <td><CopyableCode code="limit" /></td>
    <td><code>integer</code></td>
    <td>Maximum number of results to return.</td>
</tr>
<tr id="parameter-offset">
    <td><CopyableCode code="offset" /></td>
    <td><code>integer</code></td>
    <td>Number of results to skip before returning.</td>
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

**This endpoint is in beta.** API contract is stable, and no breaking changes are expected in the future. &lt;br /&gt;&lt;br /&gt; ClickStack: Retrieves a specific saved search by ID.

```sql
SELECT
id,
name,
source_id,
team_id,
created_at,
filters,
order_by,
select,
tags,
updated_at,
where,
where_language
FROM clickhouse.clickstack.saved_searches
WHERE service_id = '{{ service_id }}' -- required
AND click_stack_saved_search_id = '{{ click_stack_saved_search_id }}' -- required
AND organization_id = '{{ organization_id }}' -- required unless CLICKHOUSE_ORG_ID is set
;
```
</TabItem>
<TabItem value="list">

**This endpoint is in beta.** API contract is stable, and no breaking changes are expected in the future. &lt;br /&gt;&lt;br /&gt; ClickStack: Retrieves saved searches for the authenticated team (paginated). Results are capped at `limit` (default and maximum 1000). When `totalCount` exceeds the number of returned items, page with `limit`/`offset` to retrieve them all.

```sql
SELECT
id,
name,
source_id,
team_id,
created_at,
filters,
order_by,
select,
tags,
updated_at,
where,
where_language
FROM clickhouse.clickstack.saved_searches
WHERE service_id = '{{ service_id }}' -- required
AND organization_id = '{{ organization_id }}' -- required unless CLICKHOUSE_ORG_ID is set
AND limit = '{{ limit }}'
AND offset = '{{ offset }}'
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

**This endpoint is in beta.** API contract is stable, and no breaking changes are expected in the future. &lt;br /&gt;&lt;br /&gt; ClickStack: Creates a new saved search.

```sql
INSERT INTO clickhouse.clickstack.saved_searches (
name,
source_id,
select,
where,
where_language,
order_by,
tags,
filters,
service_id,
organization_id
)
SELECT 
'{{ name }}' /* required */,
'{{ source_id }}' /* required */,
'{{ select }}',
'{{ where }}',
'{{ where_language }}',
'{{ order_by }}',
'{{ tags }}',
'{{ filters }}',
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
- name: saved_searches
  props:
    - name: service_id
      value: "{{ service_id }}"
      description: Required parameter for the saved_searches resource.
    - name: organization_id
      value: "{{ organization_id }}"
      description: Required parameter for the saved_searches resource.
    - name: name
      value: "{{ name }}"
      description: |
        Display name for the saved search.
    - name: source_id
      value: "{{ source_id }}"
      description: |
        ID of the source to query. Must belong to the team.
    - name: select
      value: "{{ select }}"
      description: |
        Comma-separated list of column expressions to display. Empty uses the source default.
    - name: where
      value: "{{ where }}"
      description: |
        Row filter expression. The language is controlled by whereLanguage.
    - name: where_language
      value: "{{ where_language }}"
      description: |
        Language used for the where filter.
      valid_values: ['lucene', 'sql']
    - name: order_by
      value: "{{ order_by }}"
      description: |
        ORDER BY expression. Empty uses the source default.
    - name: tags
      value:
        - "{{ tags }}"
      description: |
        Tags used to organize saved searches.
    - name: filters
      description: |
        Structured pinned filters applied to the search.
      value:
        - type: "{{ type }}"
          condition: "{{ condition }}"
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

**This endpoint is in beta.** API contract is stable, and no breaking changes are expected in the future. &lt;br /&gt;&lt;br /&gt; ClickStack: Updates an existing saved search. This is a full replace: send the full object. Every optional field (`select`, `where`, `whereLanguage`, `orderBy`, `tags`, `filters`) is always written and falls back to its default when omitted, so omitting a field resets it rather than preserving the stored value.

```sql
UPDATE clickhouse.clickstack.saved_searches
SET 
name = '{{ name }}',
source_id = '{{ source_id }}',
select = '{{ select }}',
where = '{{ where }}',
where_language = '{{ where_language }}',
order_by = '{{ order_by }}',
tags = '{{ tags }}',
filters = '{{ filters }}'
WHERE 
service_id = '{{ service_id }}' --required
AND click_stack_saved_search_id = '{{ click_stack_saved_search_id }}' --required
AND organization_id = '{{ organization_id }}' --required unless CLICKHOUSE_ORG_ID is set
AND name = '{{ name }}' --required
AND source_id = '{{ source_id }}' --required
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

**This endpoint is in beta.** API contract is stable, and no breaking changes are expected in the future. &lt;br /&gt;&lt;br /&gt; ClickStack: Deletes a saved search and any alerts attached to it.

```sql
DELETE FROM clickhouse.clickstack.saved_searches
WHERE service_id = '{{ service_id }}' --required
AND click_stack_saved_search_id = '{{ click_stack_saved_search_id }}' --required
AND organization_id = '{{ organization_id }}' --required unless CLICKHOUSE_ORG_ID is set
;
```
</TabItem>
</Tabs>

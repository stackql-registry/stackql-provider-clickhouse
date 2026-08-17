--- 
title: webhooks
hide_title: false
hide_table_of_contents: false
keywords:
  - webhooks
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

Creates, updates, deletes, gets or lists a <code>webhooks</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="webhooks" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="clickhouse.clickstack.webhooks" /></td></tr>
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
    <td>Webhook ID (example: 507f1f77bcf86cd799439011)</td>
</tr>
<tr>
    <td><CopyableCode code="name" /></td>
    <td><code>string</code></td>
    <td>Webhook name (example: Production Alerts)</td>
</tr>
<tr>
    <td><CopyableCode code="body" /></td>
    <td><code>string</code></td>
    <td>Optional request body template (example: &#123;"alert": "&#123;&#123;title&#125;&#125;", "severity": "&#123;&#123;level&#125;&#125;"&#125;)</td>
</tr>
<tr>
    <td><CopyableCode code="created_at" /></td>
    <td><code>string (date-time)</code></td>
    <td>Creation timestamp (example: 2025-01-01T00:00:00.000Z) (wire: createdAt)</td>
</tr>
<tr>
    <td><CopyableCode code="description" /></td>
    <td><code>string</code></td>
    <td>Webhook description, shown in the UI (example: Sends critical alerts to the #incidents channel)</td>
</tr>
<tr>
    <td><CopyableCode code="service" /></td>
    <td><code>string</code></td>
    <td>Webhook service type (slack) (example: slack)</td>
</tr>
<tr>
    <td><CopyableCode code="updated_at" /></td>
    <td><code>string (date-time)</code></td>
    <td>Last update timestamp (example: 2025-06-15T10:30:00.000Z) (wire: updatedAt)</td>
</tr>
<tr>
    <td><CopyableCode code="url" /></td>
    <td><code>string</code></td>
    <td>Slack incoming webhook URL (example: https:​//hooks.slack.com/services/EXAMPLE)</td>
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
    <td><a href="#parameter-service_id"><code>service_id</code></a>, <a href="#parameter-organization_id"><code>organization_id</code></a></td>
    <td><a href="#parameter-limit"><code>limit</code></a>, <a href="#parameter-offset"><code>offset</code></a></td>
    <td>**This endpoint is in beta.** API contract is stable, and no breaking changes are expected in the future. &lt;br /&gt;&lt;br /&gt; ClickStack: Retrieves webhooks for the authenticated team (paginated). Results are capped at `limit` (default and maximum 1000). When `totalCount` exceeds the number of returned items, page with `limit`/`offset` to retrieve them all.</td>
</tr>
<tr>
    <td><a href="#create"><CopyableCode code="create" /></a></td>
    <td><CopyableCode code="insert" /></td>
    <td><a href="#parameter-service_id"><code>service_id</code></a>, <a href="#parameter-organization_id"><code>organization_id</code></a>, <a href="#parameter-name"><code>name</code></a>, <a href="#parameter-service"><code>service</code></a>, <a href="#parameter-url"><code>url</code></a></td>
    <td></td>
    <td>**This endpoint is in beta.** API contract is stable, and no breaking changes are expected in the future. &lt;br /&gt;&lt;br /&gt; ClickStack: Creates a new webhook for the authenticated team.</td>
</tr>
<tr>
    <td><a href="#update"><CopyableCode code="update" /></a></td>
    <td><CopyableCode code="update" /></td>
    <td><a href="#parameter-service_id"><code>service_id</code></a>, <a href="#parameter-click_stack_webhook_id"><code>click_stack_webhook_id</code></a>, <a href="#parameter-organization_id"><code>organization_id</code></a>, <a href="#parameter-name"><code>name</code></a>, <a href="#parameter-service"><code>service</code></a>, <a href="#parameter-url"><code>url</code></a></td>
    <td></td>
    <td>**This endpoint is in beta.** API contract is stable, and no breaking changes are expected in the future. &lt;br /&gt;&lt;br /&gt; ClickStack: Replaces an existing webhook. Readable optional fields (`description`, `body`) are a full replace: omitting them clears them. The write-only fields `headers` and `queryParams` are never returned on read, so omitting them preserves the stored values; send an explicit empty object (`&#123;&#125;`) to clear them. Exception: if the destination (`url` or `service`) changes, omitted `headers`/ `queryParams` are cleared rather than preserved so stored secrets are never forwarded to a new destination.</td>
</tr>
<tr>
    <td><a href="#delete"><CopyableCode code="delete" /></a></td>
    <td><CopyableCode code="delete" /></td>
    <td><a href="#parameter-service_id"><code>service_id</code></a>, <a href="#parameter-click_stack_webhook_id"><code>click_stack_webhook_id</code></a>, <a href="#parameter-organization_id"><code>organization_id</code></a></td>
    <td></td>
    <td>**This endpoint is in beta.** API contract is stable, and no breaking changes are expected in the future. &lt;br /&gt;&lt;br /&gt; ClickStack: Deletes a webhook. Blocked with a 409 while any alert still references it — reassign or remove those alerts first — so deletion never leaves an alert pointing at a missing webhook (which would silently drop notifications). Mirrors the internal webhook delete guard.</td>
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
<tr id="parameter-click_stack_webhook_id">
    <td><CopyableCode code="click_stack_webhook_id" /></td>
    <td><code>string</code></td>
    <td>Webhook ID (wire: clickStackWebhookId)</td>
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
    defaultValue="list"
    values={[
        { label: 'list', value: 'list' }
    ]}
>
<TabItem value="list">

**This endpoint is in beta.** API contract is stable, and no breaking changes are expected in the future. &lt;br /&gt;&lt;br /&gt; ClickStack: Retrieves webhooks for the authenticated team (paginated). Results are capped at `limit` (default and maximum 1000). When `totalCount` exceeds the number of returned items, page with `limit`/`offset` to retrieve them all.

```sql
SELECT
id,
name,
body,
created_at,
description,
service,
updated_at,
url
FROM clickhouse.clickstack.webhooks
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

**This endpoint is in beta.** API contract is stable, and no breaking changes are expected in the future. &lt;br /&gt;&lt;br /&gt; ClickStack: Creates a new webhook for the authenticated team.

```sql
INSERT INTO clickhouse.clickstack.webhooks (
name,
service,
url,
description,
body,
headers,
query_params,
service_id,
organization_id
)
SELECT 
'{{ name }}' /* required */,
'{{ service }}' /* required */,
'{{ url }}' /* required */,
'{{ description }}',
'{{ body }}',
'{{ headers }}',
'{{ query_params }}',
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
- name: webhooks
  props:
    - name: service_id
      value: "{{ service_id }}"
      description: Required parameter for the webhooks resource.
    - name: organization_id
      value: "{{ organization_id }}"
      description: Required parameter for the webhooks resource.
    - name: name
      value: "{{ name }}"
      description: |
        Webhook name. Must be unique per service within the team.
    - name: service
      value: "{{ service }}"
      description: |
        Webhook service type.
      valid_values: ['slack', 'incidentio', 'generic']
    - name: url
      value: "{{ url }}"
      description: |
        Webhook destination URL.
    - name: description
      value: "{{ description }}"
      description: |
        Webhook description, shown in the UI.
    - name: body
      value: "{{ body }}"
      description: |
        Optional request body template. Only for generic/incidentio; rejected for slack.
    - name: headers
      value: "{{ headers }}"
    - name: query_params
      value: "{{ query_params }}"
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

**This endpoint is in beta.** API contract is stable, and no breaking changes are expected in the future. &lt;br /&gt;&lt;br /&gt; ClickStack: Replaces an existing webhook. Readable optional fields (`description`, `body`) are a full replace: omitting them clears them. The write-only fields `headers` and `queryParams` are never returned on read, so omitting them preserves the stored values; send an explicit empty object (`&#123;&#125;`) to clear them. Exception: if the destination (`url` or `service`) changes, omitted `headers`/ `queryParams` are cleared rather than preserved so stored secrets are never forwarded to a new destination.

```sql
UPDATE clickhouse.clickstack.webhooks
SET 
name = '{{ name }}',
service = '{{ service }}',
url = '{{ url }}',
description = '{{ description }}',
body = '{{ body }}',
headers = '{{ headers }}',
query_params = '{{ query_params }}'
WHERE 
service_id = '{{ service_id }}' --required
AND click_stack_webhook_id = '{{ click_stack_webhook_id }}' --required
AND organization_id = '{{ organization_id }}' --required unless CLICKHOUSE_ORG_ID is set
AND name = '{{ name }}' --required
AND service = '{{ service }}' --required
AND url = '{{ url }}' --required
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

**This endpoint is in beta.** API contract is stable, and no breaking changes are expected in the future. &lt;br /&gt;&lt;br /&gt; ClickStack: Deletes a webhook. Blocked with a 409 while any alert still references it — reassign or remove those alerts first — so deletion never leaves an alert pointing at a missing webhook (which would silently drop notifications). Mirrors the internal webhook delete guard.

```sql
DELETE FROM clickhouse.clickstack.webhooks
WHERE service_id = '{{ service_id }}' --required
AND click_stack_webhook_id = '{{ click_stack_webhook_id }}' --required
AND organization_id = '{{ organization_id }}' --required unless CLICKHOUSE_ORG_ID is set
;
```
</TabItem>
</Tabs>

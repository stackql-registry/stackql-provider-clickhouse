--- 
title: alerts
hide_title: false
hide_table_of_contents: false
keywords:
  - alerts
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

Creates, updates, deletes, gets or lists an <code>alerts</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="alerts" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="clickhouse.clickstack.alerts" /></td></tr>
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
    <td>Unique alert identifier. (example: 65f5e4a3b9e77c001a123456)</td>
</tr>
<tr>
    <td><CopyableCode code="name" /></td>
    <td><code>string</code></td>
    <td>Human-friendly alert name. (example: Test Alert)</td>
</tr>
<tr>
    <td><CopyableCode code="channel" /></td>
    <td><code>object</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="createdAt" /></td>
    <td><code>string (date-time)</code></td>
    <td>Creation timestamp. (example: 2023-01-01T00:00:00.000Z)</td>
</tr>
<tr>
    <td><CopyableCode code="dashboardId" /></td>
    <td><code>string</code></td>
    <td>Dashboard ID for tile-based alerts. (example: 65f5e4a3b9e77c001a567890)</td>
</tr>
<tr>
    <td><CopyableCode code="executionErrors" /></td>
    <td><code>array</code></td>
    <td>Errors recorded during the most recent alert execution, if any.</td>
</tr>
<tr>
    <td><CopyableCode code="groupBy" /></td>
    <td><code>string</code></td>
    <td>Group-by key for saved search alerts. (example: ServiceName)</td>
</tr>
<tr>
    <td><CopyableCode code="interval" /></td>
    <td><code>string</code></td>
    <td>Evaluation interval for the alert. (1m, 5m, 15m, 30m, 1h, 6h, 12h, 1d) (example: 1h)</td>
</tr>
<tr>
    <td><CopyableCode code="message" /></td>
    <td><code>string</code></td>
    <td>Alert message template. (example: Test Alert Message)</td>
</tr>
<tr>
    <td><CopyableCode code="note" /></td>
    <td><code>string</code></td>
    <td>Freeform note for the alert. Supports markdown formatting. (example: Threshold raised from 50 to 100 on 2026-01-15. See &#91;runbook&#93;(https:​//wiki.example.com/runbook).)</td>
</tr>
<tr>
    <td><CopyableCode code="numConsecutiveWindows" /></td>
    <td><code>integer</code></td>
    <td>Fire the alert only after its condition has been met for this many consecutive evaluation windows. While the condition is met but fewer than this many consecutive windows have violated, the alert is in the PENDING state.</td>
</tr>
<tr>
    <td><CopyableCode code="savedSearchId" /></td>
    <td><code>string</code></td>
    <td>Saved search ID for saved_search alerts. (example: 65f5e4a3b9e77c001a345678)</td>
</tr>
<tr>
    <td><CopyableCode code="scheduleOffsetMinutes" /></td>
    <td><code>integer</code></td>
    <td>Offset from the interval boundary in minutes. For example, 2 with a 5m interval evaluates windows at :02, :07, :12, etc. (UTC).</td>
</tr>
<tr>
    <td><CopyableCode code="scheduleStartAt" /></td>
    <td><code>string (date-time)</code></td>
    <td>Absolute UTC start time anchor. Alert windows start from this timestamp and repeat every interval. (example: 2026-02-08T10:00:00.000Z)</td>
</tr>
<tr>
    <td><CopyableCode code="silenced" /></td>
    <td><code>object</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="source" /></td>
    <td><code>string</code></td>
    <td>Alert source type (tile-based or saved search). (saved_search, tile) (example: tile)</td>
</tr>
<tr>
    <td><CopyableCode code="state" /></td>
    <td><code>string</code></td>
    <td>Current alert state. (ALERT, OK, INSUFFICIENT_DATA, DISABLED, PENDING) (example: ALERT)</td>
</tr>
<tr>
    <td><CopyableCode code="teamId" /></td>
    <td><code>string</code></td>
    <td>Team identifier. (example: 65f5e4a3b9e77c001a345678)</td>
</tr>
<tr>
    <td><CopyableCode code="threshold" /></td>
    <td><code>number</code></td>
    <td>Threshold value for triggering the alert. For between and not_between threshold types, this is the lower bound.</td>
</tr>
<tr>
    <td><CopyableCode code="thresholdMax" /></td>
    <td><code>number</code></td>
    <td>Upper bound for between and not_between threshold types. Required when thresholdType is between or not_between, must be &gt;= threshold.</td>
</tr>
<tr>
    <td><CopyableCode code="thresholdType" /></td>
    <td><code>string</code></td>
    <td>Threshold comparison direction. (above, below, above_exclusive, below_or_equal, equal, not_equal, between, not_between) (example: above)</td>
</tr>
<tr>
    <td><CopyableCode code="tileId" /></td>
    <td><code>string</code></td>
    <td>Tile ID for tile-based alerts. Must be a line, stacked bar, or number type tile. (example: 65f5e4a3b9e77c001a901234)</td>
</tr>
<tr>
    <td><CopyableCode code="updatedAt" /></td>
    <td><code>string (date-time)</code></td>
    <td>Last update timestamp. (example: 2023-01-01T00:00:00.000Z)</td>
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
    <td>Unique alert identifier. (example: 65f5e4a3b9e77c001a123456)</td>
</tr>
<tr>
    <td><CopyableCode code="name" /></td>
    <td><code>string</code></td>
    <td>Human-friendly alert name. (example: Test Alert)</td>
</tr>
<tr>
    <td><CopyableCode code="channel" /></td>
    <td><code>object</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="createdAt" /></td>
    <td><code>string (date-time)</code></td>
    <td>Creation timestamp. (example: 2023-01-01T00:00:00.000Z)</td>
</tr>
<tr>
    <td><CopyableCode code="dashboardId" /></td>
    <td><code>string</code></td>
    <td>Dashboard ID for tile-based alerts. (example: 65f5e4a3b9e77c001a567890)</td>
</tr>
<tr>
    <td><CopyableCode code="executionErrors" /></td>
    <td><code>array</code></td>
    <td>Errors recorded during the most recent alert execution, if any.</td>
</tr>
<tr>
    <td><CopyableCode code="groupBy" /></td>
    <td><code>string</code></td>
    <td>Group-by key for saved search alerts. (example: ServiceName)</td>
</tr>
<tr>
    <td><CopyableCode code="interval" /></td>
    <td><code>string</code></td>
    <td>Evaluation interval for the alert. (1m, 5m, 15m, 30m, 1h, 6h, 12h, 1d) (example: 1h)</td>
</tr>
<tr>
    <td><CopyableCode code="message" /></td>
    <td><code>string</code></td>
    <td>Alert message template. (example: Test Alert Message)</td>
</tr>
<tr>
    <td><CopyableCode code="note" /></td>
    <td><code>string</code></td>
    <td>Freeform note for the alert. Supports markdown formatting. (example: Threshold raised from 50 to 100 on 2026-01-15. See &#91;runbook&#93;(https:​//wiki.example.com/runbook).)</td>
</tr>
<tr>
    <td><CopyableCode code="numConsecutiveWindows" /></td>
    <td><code>integer</code></td>
    <td>Fire the alert only after its condition has been met for this many consecutive evaluation windows. While the condition is met but fewer than this many consecutive windows have violated, the alert is in the PENDING state.</td>
</tr>
<tr>
    <td><CopyableCode code="savedSearchId" /></td>
    <td><code>string</code></td>
    <td>Saved search ID for saved_search alerts. (example: 65f5e4a3b9e77c001a345678)</td>
</tr>
<tr>
    <td><CopyableCode code="scheduleOffsetMinutes" /></td>
    <td><code>integer</code></td>
    <td>Offset from the interval boundary in minutes. For example, 2 with a 5m interval evaluates windows at :02, :07, :12, etc. (UTC).</td>
</tr>
<tr>
    <td><CopyableCode code="scheduleStartAt" /></td>
    <td><code>string (date-time)</code></td>
    <td>Absolute UTC start time anchor. Alert windows start from this timestamp and repeat every interval. (example: 2026-02-08T10:00:00.000Z)</td>
</tr>
<tr>
    <td><CopyableCode code="silenced" /></td>
    <td><code>object</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="source" /></td>
    <td><code>string</code></td>
    <td>Alert source type (tile-based or saved search). (saved_search, tile) (example: tile)</td>
</tr>
<tr>
    <td><CopyableCode code="state" /></td>
    <td><code>string</code></td>
    <td>Current alert state. (ALERT, OK, INSUFFICIENT_DATA, DISABLED, PENDING) (example: ALERT)</td>
</tr>
<tr>
    <td><CopyableCode code="teamId" /></td>
    <td><code>string</code></td>
    <td>Team identifier. (example: 65f5e4a3b9e77c001a345678)</td>
</tr>
<tr>
    <td><CopyableCode code="threshold" /></td>
    <td><code>number</code></td>
    <td>Threshold value for triggering the alert. For between and not_between threshold types, this is the lower bound.</td>
</tr>
<tr>
    <td><CopyableCode code="thresholdMax" /></td>
    <td><code>number</code></td>
    <td>Upper bound for between and not_between threshold types. Required when thresholdType is between or not_between, must be &gt;= threshold.</td>
</tr>
<tr>
    <td><CopyableCode code="thresholdType" /></td>
    <td><code>string</code></td>
    <td>Threshold comparison direction. (above, below, above_exclusive, below_or_equal, equal, not_equal, between, not_between) (example: above)</td>
</tr>
<tr>
    <td><CopyableCode code="tileId" /></td>
    <td><code>string</code></td>
    <td>Tile ID for tile-based alerts. Must be a line, stacked bar, or number type tile. (example: 65f5e4a3b9e77c001a901234)</td>
</tr>
<tr>
    <td><CopyableCode code="updatedAt" /></td>
    <td><code>string (date-time)</code></td>
    <td>Last update timestamp. (example: 2023-01-01T00:00:00.000Z)</td>
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
    <td><a href="#parameter-serviceId"><code>serviceId</code></a>, <a href="#parameter-clickStackAlertId"><code>clickStackAlertId</code></a>, <a href="#parameter-organization_id"><code>organization_id</code></a></td>
    <td></td>
    <td>**This endpoint is in beta.** API contract is stable, and no breaking changes are expected in the future. &lt;br /&gt;&lt;br /&gt; ClickStack: Retrieves a specific alert by ID</td>
</tr>
<tr>
    <td><a href="#list"><CopyableCode code="list" /></a></td>
    <td><CopyableCode code="select" /></td>
    <td><a href="#parameter-serviceId"><code>serviceId</code></a>, <a href="#parameter-organization_id"><code>organization_id</code></a></td>
    <td><a href="#parameter-limit"><code>limit</code></a>, <a href="#parameter-offset"><code>offset</code></a></td>
    <td>**This endpoint is in beta.** API contract is stable, and no breaking changes are expected in the future. &lt;br /&gt;&lt;br /&gt; ClickStack: Retrieves alerts for the authenticated team (paginated). Results are capped at `limit` (default and maximum 1000). When `totalCount` exceeds the number of returned items, page with `limit`/`offset` to retrieve them all.</td>
</tr>
<tr>
    <td><a href="#create"><CopyableCode code="create" /></a></td>
    <td><CopyableCode code="insert" /></td>
    <td><a href="#parameter-serviceId"><code>serviceId</code></a>, <a href="#parameter-organization_id"><code>organization_id</code></a></td>
    <td></td>
    <td>**This endpoint is in beta.** API contract is stable, and no breaking changes are expected in the future. &lt;br /&gt;&lt;br /&gt; ClickStack: Creates a new alert</td>
</tr>
<tr>
    <td><a href="#update"><CopyableCode code="update" /></a></td>
    <td><CopyableCode code="update" /></td>
    <td><a href="#parameter-serviceId"><code>serviceId</code></a>, <a href="#parameter-clickStackAlertId"><code>clickStackAlertId</code></a>, <a href="#parameter-organization_id"><code>organization_id</code></a></td>
    <td></td>
    <td>**This endpoint is in beta.** API contract is stable, and no breaking changes are expected in the future. &lt;br /&gt;&lt;br /&gt; ClickStack: Updates an existing alert</td>
</tr>
<tr>
    <td><a href="#delete"><CopyableCode code="delete" /></a></td>
    <td><CopyableCode code="delete" /></td>
    <td><a href="#parameter-serviceId"><code>serviceId</code></a>, <a href="#parameter-clickStackAlertId"><code>clickStackAlertId</code></a>, <a href="#parameter-organization_id"><code>organization_id</code></a></td>
    <td></td>
    <td>**This endpoint is in beta.** API contract is stable, and no breaking changes are expected in the future. &lt;br /&gt;&lt;br /&gt; ClickStack: Deletes an alert</td>
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
<tr id="parameter-clickStackAlertId">
    <td><CopyableCode code="clickStackAlertId" /></td>
    <td><code>string</code></td>
    <td>ClickStack Alert ID</td>
</tr>
<tr id="parameter-organization_id">
    <td><CopyableCode code="organization_id" /></td>
    <td><code>string</code></td>
    <td>ClickHouse Cloud organization ID. Resolved from the CLICKHOUSE_ORG_ID environment variable when it is set (x-stackQL-envVar); otherwise it must be supplied on every query as WHERE organization_id = &lt;uuid&gt;. A WHERE value always takes precedence over the environment. (x-stackQL-envVar: CLICKHOUSE_ORG_ID)</td>
</tr>
<tr id="parameter-serviceId">
    <td><CopyableCode code="serviceId" /></td>
    <td><code>string (uuid)</code></td>
    <td>ID of the ClickStack service.</td>
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

**This endpoint is in beta.** API contract is stable, and no breaking changes are expected in the future. &lt;br /&gt;&lt;br /&gt; ClickStack: Retrieves a specific alert by ID

```sql
SELECT
id,
name,
channel,
createdAt,
dashboardId,
executionErrors,
groupBy,
interval,
message,
note,
numConsecutiveWindows,
savedSearchId,
scheduleOffsetMinutes,
scheduleStartAt,
silenced,
source,
state,
teamId,
threshold,
thresholdMax,
thresholdType,
tileId,
updatedAt
FROM clickhouse.clickstack.alerts
WHERE serviceId = '{{ serviceId }}' -- required
AND clickStackAlertId = '{{ clickStackAlertId }}' -- required
AND organization_id = '{{ organization_id }}' -- required unless CLICKHOUSE_ORG_ID is set
;
```
</TabItem>
<TabItem value="list">

**This endpoint is in beta.** API contract is stable, and no breaking changes are expected in the future. &lt;br /&gt;&lt;br /&gt; ClickStack: Retrieves alerts for the authenticated team (paginated). Results are capped at `limit` (default and maximum 1000). When `totalCount` exceeds the number of returned items, page with `limit`/`offset` to retrieve them all.

```sql
SELECT
id,
name,
channel,
createdAt,
dashboardId,
executionErrors,
groupBy,
interval,
message,
note,
numConsecutiveWindows,
savedSearchId,
scheduleOffsetMinutes,
scheduleStartAt,
silenced,
source,
state,
teamId,
threshold,
thresholdMax,
thresholdType,
tileId,
updatedAt
FROM clickhouse.clickstack.alerts
WHERE serviceId = '{{ serviceId }}' -- required
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

**This endpoint is in beta.** API contract is stable, and no breaking changes are expected in the future. &lt;br /&gt;&lt;br /&gt; ClickStack: Creates a new alert

```sql
INSERT INTO clickhouse.clickstack.alerts (
dashboardId,
tileId,
savedSearchId,
groupBy,
threshold,
thresholdMax,
interval,
scheduleOffsetMinutes,
scheduleStartAt,
source,
thresholdType,
channel,
name,
message,
note,
numConsecutiveWindows,
serviceId,
organization_id
)
SELECT 
'{{ dashboardId }}',
'{{ tileId }}',
'{{ savedSearchId }}',
'{{ groupBy }}',
{{ threshold }},
{{ thresholdMax }},
'{{ interval }}',
{{ scheduleOffsetMinutes }},
'{{ scheduleStartAt }}',
'{{ source }}',
'{{ thresholdType }}',
'{{ channel }}',
'{{ name }}',
'{{ message }}',
'{{ note }}',
{{ numConsecutiveWindows }},
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
- name: alerts
  props:
    - name: serviceId
      value: "{{ serviceId }}"
      description: Required parameter for the alerts resource.
    - name: organization_id
      value: "{{ organization_id }}"
      description: Required parameter for the alerts resource.
    - name: dashboardId
      value: "{{ dashboardId }}"
      description: |
        Dashboard ID for tile-based alerts.
    - name: tileId
      value: "{{ tileId }}"
      description: |
        Tile ID for tile-based alerts. Must be a line, stacked bar, or number type tile.
    - name: savedSearchId
      value: "{{ savedSearchId }}"
      description: |
        Saved search ID for saved_search alerts.
    - name: groupBy
      value: "{{ groupBy }}"
      description: |
        Group-by key for saved search alerts.
    - name: threshold
      value: {{ threshold }}
      description: |
        Threshold value for triggering the alert. For between and not_between threshold types, this is the lower bound.
    - name: thresholdMax
      value: {{ thresholdMax }}
      description: |
        Upper bound for between and not_between threshold types. Required when thresholdType is between or not_between, must be >= threshold.
    - name: interval
      value: "{{ interval }}"
      description: |
        Evaluation interval for the alert.
      valid_values: ['1m', '5m', '15m', '30m', '1h', '6h', '12h', '1d']
    - name: scheduleOffsetMinutes
      value: {{ scheduleOffsetMinutes }}
      description: |
        Offset from the interval boundary in minutes. For example, 2 with a 5m interval evaluates windows at :02, :07, :12, etc. (UTC).
    - name: scheduleStartAt
      value: "{{ scheduleStartAt }}"
      description: |
        Absolute UTC start time anchor. Alert windows start from this timestamp and repeat every interval.
    - name: source
      value: "{{ source }}"
      description: |
        Alert source type (tile-based or saved search).
      valid_values: ['saved_search', 'tile']
    - name: thresholdType
      value: "{{ thresholdType }}"
      description: |
        Threshold comparison direction.
      valid_values: ['above', 'below', 'above_exclusive', 'below_or_equal', 'equal', 'not_equal', 'between', 'not_between']
    - name: channel
      value:
        type: "{{ type }}"
        emailRecipients:
          - "{{ emailRecipients }}"
        webhookId: "{{ webhookId }}"
        webhookService: "{{ webhookService }}"
        slackChannelId: "{{ slackChannelId }}"
        severity: "{{ severity }}"
    - name: name
      value: "{{ name }}"
      description: |
        Human-friendly alert name.
    - name: message
      value: "{{ message }}"
      description: |
        Alert message template.
    - name: note
      value: "{{ note }}"
      description: |
        Freeform note for the alert. Supports markdown formatting.
    - name: numConsecutiveWindows
      value: {{ numConsecutiveWindows }}
      description: |
        Fire the alert only after its condition has been met for this many consecutive evaluation windows. While the condition is met but fewer than this many consecutive windows have violated, the alert is in the PENDING state.
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

**This endpoint is in beta.** API contract is stable, and no breaking changes are expected in the future. &lt;br /&gt;&lt;br /&gt; ClickStack: Updates an existing alert

```sql
UPDATE clickhouse.clickstack.alerts
SET 
dashboardId = '{{ dashboardId }}',
tileId = '{{ tileId }}',
savedSearchId = '{{ savedSearchId }}',
groupBy = '{{ groupBy }}',
threshold = {{ threshold }},
thresholdMax = {{ thresholdMax }},
interval = '{{ interval }}',
scheduleOffsetMinutes = {{ scheduleOffsetMinutes }},
scheduleStartAt = '{{ scheduleStartAt }}',
source = '{{ source }}',
thresholdType = '{{ thresholdType }}',
channel = '{{ channel }}',
name = '{{ name }}',
message = '{{ message }}',
note = '{{ note }}',
numConsecutiveWindows = {{ numConsecutiveWindows }}
WHERE 
serviceId = '{{ serviceId }}' --required
AND clickStackAlertId = '{{ clickStackAlertId }}' --required
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

**This endpoint is in beta.** API contract is stable, and no breaking changes are expected in the future. &lt;br /&gt;&lt;br /&gt; ClickStack: Deletes an alert

```sql
DELETE FROM clickhouse.clickstack.alerts
WHERE serviceId = '{{ serviceId }}' --required
AND clickStackAlertId = '{{ clickStackAlertId }}' --required
AND organization_id = '{{ organization_id }}' --required unless CLICKHOUSE_ORG_ID is set
;
```
</TabItem>
</Tabs>

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
    <td><CopyableCode code="dashboard_id" /></td>
    <td><code>string</code></td>
    <td>Dashboard ID for tile-based alerts. (example: 65f5e4a3b9e77c001a567890) (wire: dashboardId)</td>
</tr>
<tr>
    <td><CopyableCode code="saved_search_id" /></td>
    <td><code>string</code></td>
    <td>Saved search ID for saved_search alerts. (example: 65f5e4a3b9e77c001a345678) (wire: savedSearchId)</td>
</tr>
<tr>
    <td><CopyableCode code="team_id" /></td>
    <td><code>string</code></td>
    <td>Team identifier. (example: 65f5e4a3b9e77c001a345678) (wire: teamId)</td>
</tr>
<tr>
    <td><CopyableCode code="tile_id" /></td>
    <td><code>string</code></td>
    <td>Tile ID for tile-based alerts. Must be a line, stacked bar, or number type tile. (example: 65f5e4a3b9e77c001a901234) (wire: tileId)</td>
</tr>
<tr>
    <td><CopyableCode code="channel" /></td>
    <td><code>object</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="created_at" /></td>
    <td><code>string (date-time)</code></td>
    <td>Creation timestamp. (example: 2023-01-01T00:00:00.000Z) (wire: createdAt)</td>
</tr>
<tr>
    <td><CopyableCode code="execution_errors" /></td>
    <td><code>array</code></td>
    <td>Errors recorded during the most recent alert execution, if any. (wire: executionErrors)</td>
</tr>
<tr>
    <td><CopyableCode code="group_by" /></td>
    <td><code>string</code></td>
    <td>Group-by key for saved search alerts. (example: ServiceName) (wire: groupBy)</td>
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
    <td><CopyableCode code="num_consecutive_windows" /></td>
    <td><code>integer</code></td>
    <td>Fire the alert only after its condition has been met for this many consecutive evaluation windows. While the condition is met but fewer than this many consecutive windows have violated, the alert is in the PENDING state. (wire: numConsecutiveWindows)</td>
</tr>
<tr>
    <td><CopyableCode code="schedule_offset_minutes" /></td>
    <td><code>integer</code></td>
    <td>Offset from the interval boundary in minutes. For example, 2 with a 5m interval evaluates windows at :02, :07, :12, etc. (UTC). (wire: scheduleOffsetMinutes)</td>
</tr>
<tr>
    <td><CopyableCode code="schedule_start_at" /></td>
    <td><code>string (date-time)</code></td>
    <td>Absolute UTC start time anchor. Alert windows start from this timestamp and repeat every interval. (example: 2026-02-08T10:00:00.000Z) (wire: scheduleStartAt)</td>
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
    <td><CopyableCode code="threshold" /></td>
    <td><code>number</code></td>
    <td>Threshold value for triggering the alert. For between and not_between threshold types, this is the lower bound.</td>
</tr>
<tr>
    <td><CopyableCode code="threshold_max" /></td>
    <td><code>number</code></td>
    <td>Upper bound for between and not_between threshold types. Required when thresholdType is between or not_between, must be &gt;= threshold. (wire: thresholdMax)</td>
</tr>
<tr>
    <td><CopyableCode code="threshold_type" /></td>
    <td><code>string</code></td>
    <td>Threshold comparison direction. (above, below, above_exclusive, below_or_equal, equal, not_equal, between, not_between) (example: above) (wire: thresholdType)</td>
</tr>
<tr>
    <td><CopyableCode code="updated_at" /></td>
    <td><code>string (date-time)</code></td>
    <td>Last update timestamp. (example: 2023-01-01T00:00:00.000Z) (wire: updatedAt)</td>
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
    <td><CopyableCode code="dashboard_id" /></td>
    <td><code>string</code></td>
    <td>Dashboard ID for tile-based alerts. (example: 65f5e4a3b9e77c001a567890) (wire: dashboardId)</td>
</tr>
<tr>
    <td><CopyableCode code="saved_search_id" /></td>
    <td><code>string</code></td>
    <td>Saved search ID for saved_search alerts. (example: 65f5e4a3b9e77c001a345678) (wire: savedSearchId)</td>
</tr>
<tr>
    <td><CopyableCode code="team_id" /></td>
    <td><code>string</code></td>
    <td>Team identifier. (example: 65f5e4a3b9e77c001a345678) (wire: teamId)</td>
</tr>
<tr>
    <td><CopyableCode code="tile_id" /></td>
    <td><code>string</code></td>
    <td>Tile ID for tile-based alerts. Must be a line, stacked bar, or number type tile. (example: 65f5e4a3b9e77c001a901234) (wire: tileId)</td>
</tr>
<tr>
    <td><CopyableCode code="channel" /></td>
    <td><code>object</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="created_at" /></td>
    <td><code>string (date-time)</code></td>
    <td>Creation timestamp. (example: 2023-01-01T00:00:00.000Z) (wire: createdAt)</td>
</tr>
<tr>
    <td><CopyableCode code="execution_errors" /></td>
    <td><code>array</code></td>
    <td>Errors recorded during the most recent alert execution, if any. (wire: executionErrors)</td>
</tr>
<tr>
    <td><CopyableCode code="group_by" /></td>
    <td><code>string</code></td>
    <td>Group-by key for saved search alerts. (example: ServiceName) (wire: groupBy)</td>
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
    <td><CopyableCode code="num_consecutive_windows" /></td>
    <td><code>integer</code></td>
    <td>Fire the alert only after its condition has been met for this many consecutive evaluation windows. While the condition is met but fewer than this many consecutive windows have violated, the alert is in the PENDING state. (wire: numConsecutiveWindows)</td>
</tr>
<tr>
    <td><CopyableCode code="schedule_offset_minutes" /></td>
    <td><code>integer</code></td>
    <td>Offset from the interval boundary in minutes. For example, 2 with a 5m interval evaluates windows at :02, :07, :12, etc. (UTC). (wire: scheduleOffsetMinutes)</td>
</tr>
<tr>
    <td><CopyableCode code="schedule_start_at" /></td>
    <td><code>string (date-time)</code></td>
    <td>Absolute UTC start time anchor. Alert windows start from this timestamp and repeat every interval. (example: 2026-02-08T10:00:00.000Z) (wire: scheduleStartAt)</td>
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
    <td><CopyableCode code="threshold" /></td>
    <td><code>number</code></td>
    <td>Threshold value for triggering the alert. For between and not_between threshold types, this is the lower bound.</td>
</tr>
<tr>
    <td><CopyableCode code="threshold_max" /></td>
    <td><code>number</code></td>
    <td>Upper bound for between and not_between threshold types. Required when thresholdType is between or not_between, must be &gt;= threshold. (wire: thresholdMax)</td>
</tr>
<tr>
    <td><CopyableCode code="threshold_type" /></td>
    <td><code>string</code></td>
    <td>Threshold comparison direction. (above, below, above_exclusive, below_or_equal, equal, not_equal, between, not_between) (example: above) (wire: thresholdType)</td>
</tr>
<tr>
    <td><CopyableCode code="updated_at" /></td>
    <td><code>string (date-time)</code></td>
    <td>Last update timestamp. (example: 2023-01-01T00:00:00.000Z) (wire: updatedAt)</td>
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
    <td><a href="#parameter-service_id"><code>service_id</code></a>, <a href="#parameter-click_stack_alert_id"><code>click_stack_alert_id</code></a>, <a href="#parameter-organization_id"><code>organization_id</code></a></td>
    <td></td>
    <td>**This endpoint is in beta.** API contract is stable, and no breaking changes are expected in the future. &lt;br /&gt;&lt;br /&gt; ClickStack: Retrieves a specific alert by ID</td>
</tr>
<tr>
    <td><a href="#list"><CopyableCode code="list" /></a></td>
    <td><CopyableCode code="select" /></td>
    <td><a href="#parameter-service_id"><code>service_id</code></a>, <a href="#parameter-organization_id"><code>organization_id</code></a></td>
    <td><a href="#parameter-limit"><code>limit</code></a>, <a href="#parameter-offset"><code>offset</code></a></td>
    <td>**This endpoint is in beta.** API contract is stable, and no breaking changes are expected in the future. &lt;br /&gt;&lt;br /&gt; ClickStack: Retrieves alerts for the authenticated team (paginated). Results are capped at `limit` (default and maximum 1000). When `totalCount` exceeds the number of returned items, page with `limit`/`offset` to retrieve them all.</td>
</tr>
<tr>
    <td><a href="#create"><CopyableCode code="create" /></a></td>
    <td><CopyableCode code="insert" /></td>
    <td><a href="#parameter-service_id"><code>service_id</code></a>, <a href="#parameter-organization_id"><code>organization_id</code></a></td>
    <td></td>
    <td>**This endpoint is in beta.** API contract is stable, and no breaking changes are expected in the future. &lt;br /&gt;&lt;br /&gt; ClickStack: Creates a new alert</td>
</tr>
<tr>
    <td><a href="#update"><CopyableCode code="update" /></a></td>
    <td><CopyableCode code="update" /></td>
    <td><a href="#parameter-service_id"><code>service_id</code></a>, <a href="#parameter-click_stack_alert_id"><code>click_stack_alert_id</code></a>, <a href="#parameter-organization_id"><code>organization_id</code></a></td>
    <td></td>
    <td>**This endpoint is in beta.** API contract is stable, and no breaking changes are expected in the future. &lt;br /&gt;&lt;br /&gt; ClickStack: Updates an existing alert</td>
</tr>
<tr>
    <td><a href="#delete"><CopyableCode code="delete" /></a></td>
    <td><CopyableCode code="delete" /></td>
    <td><a href="#parameter-service_id"><code>service_id</code></a>, <a href="#parameter-click_stack_alert_id"><code>click_stack_alert_id</code></a>, <a href="#parameter-organization_id"><code>organization_id</code></a></td>
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
<tr id="parameter-click_stack_alert_id">
    <td><CopyableCode code="click_stack_alert_id" /></td>
    <td><code>string</code></td>
    <td>ClickStack Alert ID (wire: clickStackAlertId)</td>
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

**This endpoint is in beta.** API contract is stable, and no breaking changes are expected in the future. &lt;br /&gt;&lt;br /&gt; ClickStack: Retrieves a specific alert by ID

```sql
SELECT
id,
name,
dashboard_id,
saved_search_id,
team_id,
tile_id,
channel,
created_at,
execution_errors,
group_by,
interval,
message,
note,
num_consecutive_windows,
schedule_offset_minutes,
schedule_start_at,
silenced,
source,
state,
threshold,
threshold_max,
threshold_type,
updated_at
FROM clickhouse.clickstack.alerts
WHERE service_id = '{{ service_id }}' -- required
AND click_stack_alert_id = '{{ click_stack_alert_id }}' -- required
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
dashboard_id,
saved_search_id,
team_id,
tile_id,
channel,
created_at,
execution_errors,
group_by,
interval,
message,
note,
num_consecutive_windows,
schedule_offset_minutes,
schedule_start_at,
silenced,
source,
state,
threshold,
threshold_max,
threshold_type,
updated_at
FROM clickhouse.clickstack.alerts
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

**This endpoint is in beta.** API contract is stable, and no breaking changes are expected in the future. &lt;br /&gt;&lt;br /&gt; ClickStack: Creates a new alert

```sql
INSERT INTO clickhouse.clickstack.alerts (
dashboard_id,
tile_id,
saved_search_id,
group_by,
threshold,
threshold_max,
interval,
schedule_offset_minutes,
schedule_start_at,
source,
threshold_type,
channel,
name,
message,
note,
num_consecutive_windows,
service_id,
organization_id
)
SELECT 
'{{ dashboard_id }}',
'{{ tile_id }}',
'{{ saved_search_id }}',
'{{ group_by }}',
{{ threshold }},
{{ threshold_max }},
'{{ interval }}',
{{ schedule_offset_minutes }},
'{{ schedule_start_at }}',
'{{ source }}',
'{{ threshold_type }}',
'{{ channel }}',
'{{ name }}',
'{{ message }}',
'{{ note }}',
{{ num_consecutive_windows }},
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
- name: alerts
  props:
    - name: service_id
      value: "{{ service_id }}"
      description: Required parameter for the alerts resource.
    - name: organization_id
      value: "{{ organization_id }}"
      description: Required parameter for the alerts resource.
    - name: dashboard_id
      value: "{{ dashboard_id }}"
      description: |
        Dashboard ID for tile-based alerts.
    - name: tile_id
      value: "{{ tile_id }}"
      description: |
        Tile ID for tile-based alerts. Must be a line, stacked bar, or number type tile.
    - name: saved_search_id
      value: "{{ saved_search_id }}"
      description: |
        Saved search ID for saved_search alerts.
    - name: group_by
      value: "{{ group_by }}"
      description: |
        Group-by key for saved search alerts.
    - name: threshold
      value: {{ threshold }}
      description: |
        Threshold value for triggering the alert. For between and not_between threshold types, this is the lower bound.
    - name: threshold_max
      value: {{ threshold_max }}
      description: |
        Upper bound for between and not_between threshold types. Required when thresholdType is between or not_between, must be >= threshold.
    - name: interval
      value: "{{ interval }}"
      description: |
        Evaluation interval for the alert.
      valid_values: ['1m', '5m', '15m', '30m', '1h', '6h', '12h', '1d']
    - name: schedule_offset_minutes
      value: {{ schedule_offset_minutes }}
      description: |
        Offset from the interval boundary in minutes. For example, 2 with a 5m interval evaluates windows at :02, :07, :12, etc. (UTC).
    - name: schedule_start_at
      value: "{{ schedule_start_at }}"
      description: |
        Absolute UTC start time anchor. Alert windows start from this timestamp and repeat every interval.
    - name: source
      value: "{{ source }}"
      description: |
        Alert source type (tile-based or saved search).
      valid_values: ['saved_search', 'tile']
    - name: threshold_type
      value: "{{ threshold_type }}"
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
    - name: num_consecutive_windows
      value: {{ num_consecutive_windows }}
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
dashboard_id = '{{ dashboard_id }}',
tile_id = '{{ tile_id }}',
saved_search_id = '{{ saved_search_id }}',
group_by = '{{ group_by }}',
threshold = {{ threshold }},
threshold_max = {{ threshold_max }},
interval = '{{ interval }}',
schedule_offset_minutes = {{ schedule_offset_minutes }},
schedule_start_at = '{{ schedule_start_at }}',
source = '{{ source }}',
threshold_type = '{{ threshold_type }}',
channel = '{{ channel }}',
name = '{{ name }}',
message = '{{ message }}',
note = '{{ note }}',
num_consecutive_windows = {{ num_consecutive_windows }}
WHERE 
service_id = '{{ service_id }}' --required
AND click_stack_alert_id = '{{ click_stack_alert_id }}' --required
AND organization_id = '{{ organization_id }}' --required unless CLICKHOUSE_ORG_ID is set
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

**This endpoint is in beta.** API contract is stable, and no breaking changes are expected in the future. &lt;br /&gt;&lt;br /&gt; ClickStack: Deletes an alert

```sql
DELETE FROM clickhouse.clickstack.alerts
WHERE service_id = '{{ service_id }}' --required
AND click_stack_alert_id = '{{ click_stack_alert_id }}' --required
AND organization_id = '{{ organization_id }}' --required unless CLICKHOUSE_ORG_ID is set
;
```
</TabItem>
</Tabs>

--- 
title: scaling_schedules
hide_title: false
hide_table_of_contents: false
keywords:
  - scaling_schedules
  - services
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

Creates, updates, deletes, gets or lists a <code>scaling_schedules</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="scaling_schedules" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="clickhouse.services.scaling_schedules" /></td></tr>
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
    <td><CopyableCode code="activeEntryId" /></td>
    <td><code>string (uuid)</code></td>
    <td>ID of the currently-active schedule entry. Absent when no entry is active and the base config is in effect.</td>
</tr>
<tr>
    <td><CopyableCode code="baseConfig" /></td>
    <td><code>object</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="entries" /></td>
    <td><code>array</code></td>
    <td>List of schedule entries.</td>
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
    <td><a href="#parameter-serviceId"><code>serviceId</code></a>, <a href="#parameter-organization_id"><code>organization_id</code></a></td>
    <td></td>
    <td>**Disclaimer:** This beta endpoint is evolving; the API contract may change. &lt;br /&gt;&lt;br /&gt; Returns the autoscaling schedule for a service. Returns 404 if no schedule has been configured or if the schedule was cleared. Requires the scheduled autoscaling feature to be enabled for the organization.</td>
</tr>
<tr>
    <td><a href="#create"><CopyableCode code="create" /></a></td>
    <td><CopyableCode code="insert" /></td>
    <td><a href="#parameter-serviceId"><code>serviceId</code></a>, <a href="#parameter-organization_id"><code>organization_id</code></a>, <a href="#parameter-entries"><code>entries</code></a></td>
    <td></td>
    <td>**Disclaimer:** This beta endpoint is evolving; the API contract may change. &lt;br /&gt;&lt;br /&gt; Creates or fully replaces the autoscaling schedule for a service. Pass an empty `entries` array to clear the schedule — a subsequent GET will return 404, and the response will contain an empty `baseConfig` (all fields absent). The base scaling config (applied when no entry is active) is managed separately via the `replicaScaling` endpoint. Requires the scheduled autoscaling feature to be enabled for the organization.</td>
</tr>
<tr>
    <td><a href="#delete"><CopyableCode code="delete" /></a></td>
    <td><CopyableCode code="delete" /></td>
    <td><a href="#parameter-serviceId"><code>serviceId</code></a>, <a href="#parameter-organization_id"><code>organization_id</code></a></td>
    <td></td>
    <td>**Disclaimer:** This beta endpoint is evolving; the API contract may change. &lt;br /&gt;&lt;br /&gt; Deletes the autoscaling schedule for a service. If a schedule entry is currently active, the base scaling config is restored to the instance before the schedule is removed. Returns 404 if no schedule exists. Requires the scheduled autoscaling feature to be enabled for the organization.</td>
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
<tr id="parameter-organization_id">
    <td><CopyableCode code="organization_id" /></td>
    <td><code>string</code></td>
    <td>ClickHouse Cloud organization ID. Resolved from the CLICKHOUSE_ORG_ID environment variable when it is set (x-stackQL-envVar); otherwise it must be supplied on every query as WHERE organization_id = &lt;uuid&gt;. A WHERE value always takes precedence over the environment. (x-stackQL-envVar: CLICKHOUSE_ORG_ID)</td>
</tr>
<tr id="parameter-serviceId">
    <td><CopyableCode code="serviceId" /></td>
    <td><code>string (uuid)</code></td>
    <td>ID of the service.</td>
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

**Disclaimer:** This beta endpoint is evolving; the API contract may change. &lt;br /&gt;&lt;br /&gt; Returns the autoscaling schedule for a service. Returns 404 if no schedule has been configured or if the schedule was cleared. Requires the scheduled autoscaling feature to be enabled for the organization.

```sql
SELECT
activeEntryId,
baseConfig,
entries
FROM clickhouse.services.scaling_schedules
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

**Disclaimer:** This beta endpoint is evolving; the API contract may change. &lt;br /&gt;&lt;br /&gt; Creates or fully replaces the autoscaling schedule for a service. Pass an empty `entries` array to clear the schedule — a subsequent GET will return 404, and the response will contain an empty `baseConfig` (all fields absent). The base scaling config (applied when no entry is active) is managed separately via the `replicaScaling` endpoint. Requires the scheduled autoscaling feature to be enabled for the organization.

```sql
INSERT INTO clickhouse.services.scaling_schedules (
entries,
serviceId,
organization_id
)
SELECT 
'{{ entries }}' /* required */,
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
- name: scaling_schedules
  props:
    - name: serviceId
      value: "{{ serviceId }}"
      description: Required parameter for the scaling_schedules resource.
    - name: organization_id
      value: "{{ organization_id }}"
      description: Required parameter for the scaling_schedules resource.
    - name: entries
      description: |
        List of schedule entries. Pass an empty array to clear the schedule.
      value:
        - name: "{{ name }}"
          weekdays: "{{ weekdays }}"
          startHourUtc: {{ startHourUtc }}
          endHourUtc: {{ endHourUtc }}
          autoscalingMode: "{{ autoscalingMode }}"
          minReplicaMemoryGb: {{ minReplicaMemoryGb }}
          maxReplicaMemoryGb: {{ maxReplicaMemoryGb }}
          numReplicas: {{ numReplicas }}
          minReplicas: {{ minReplicas }}
          maxReplicas: {{ maxReplicas }}
          idleScaling: {{ idleScaling }}
          idleTimeoutMinutes: {{ idleTimeoutMinutes }}
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

**Disclaimer:** This beta endpoint is evolving; the API contract may change. &lt;br /&gt;&lt;br /&gt; Deletes the autoscaling schedule for a service. If a schedule entry is currently active, the base scaling config is restored to the instance before the schedule is removed. Returns 404 if no schedule exists. Requires the scheduled autoscaling feature to be enabled for the organization.

```sql
DELETE FROM clickhouse.services.scaling_schedules
WHERE serviceId = '{{ serviceId }}' --required
AND organization_id = '{{ organization_id }}' --required unless CLICKHOUSE_ORG_ID is set
;
```
</TabItem>
</Tabs>

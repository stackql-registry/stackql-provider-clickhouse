--- 
title: replica_scalings
hide_title: false
hide_table_of_contents: false
keywords:
  - replica_scalings
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

Creates, updates, deletes, gets or lists a <code>replica_scalings</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="replica_scalings" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="clickhouse.services.replica_scalings" /></td></tr>
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
    <td><a href="#update"><CopyableCode code="update" /></a></td>
    <td><CopyableCode code="update" /></td>
    <td><a href="#parameter-serviceId"><code>serviceId</code></a>, <a href="#parameter-organizationId"><code>organizationId</code></a></td>
    <td></td>
    <td>Updates minimum and maximum memory limits per replica and idle mode scaling behavior for the service. Supports both vertical autoscaling (fixed replica count, variable memory) and horizontal autoscaling (variable replica count, fixed memory). The memory settings are available only for "production" services and must be a multiple of 4 starting from 8GB. For vertical autoscaling, please contact support to enable adjustment of numReplicas. For horizontal autoscaling (autoscalingMode "horizontal" with minReplicas/maxReplicas), contact support to enable the feature for your organization.</td>
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
<tr id="parameter-serviceId">
    <td><CopyableCode code="serviceId" /></td>
    <td><code>string (uuid)</code></td>
    <td>ID of the service to update scaling parameters.</td>
</tr>
</tbody>
</table>

## `UPDATE` examples

<Tabs
    defaultValue="update"
    values={[
        { label: 'update', value: 'update' }
    ]}
>
<TabItem value="update">

Updates minimum and maximum memory limits per replica and idle mode scaling behavior for the service. Supports both vertical autoscaling (fixed replica count, variable memory) and horizontal autoscaling (variable replica count, fixed memory). The memory settings are available only for "production" services and must be a multiple of 4 starting from 8GB. For vertical autoscaling, please contact support to enable adjustment of numReplicas. For horizontal autoscaling (autoscalingMode "horizontal" with minReplicas/maxReplicas), contact support to enable the feature for your organization.

```sql
UPDATE clickhouse.services.replica_scalings
SET 
minReplicaMemoryGb = {{ minReplicaMemoryGb }},
maxReplicaMemoryGb = {{ maxReplicaMemoryGb }},
autoscalingMode = '{{ autoscalingMode }}',
numReplicas = {{ numReplicas }},
minReplicas = {{ minReplicas }},
maxReplicas = {{ maxReplicas }},
idleScaling = {{ idleScaling }},
idleTimeoutMinutes = {{ idleTimeoutMinutes }}
WHERE 
serviceId = '{{ serviceId }}' --required
AND organizationId = '{{ organizationId }}' --required unless CLICKHOUSE_ORG_ID is set
RETURNING
requestId,
result,
status;
```
</TabItem>
</Tabs>

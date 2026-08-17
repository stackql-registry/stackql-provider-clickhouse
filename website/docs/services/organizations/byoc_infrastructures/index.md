--- 
title: byoc_infrastructures
hide_title: false
hide_table_of_contents: false
keywords:
  - byoc_infrastructures
  - organizations
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

Creates, updates, deletes, gets or lists a <code>byoc_infrastructures</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="byoc_infrastructures" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="clickhouse.organizations.byoc_infrastructures" /></td></tr>
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
    <td><a href="#parameter-organization_id"><code>organization_id</code></a></td>
    <td></td>
    <td>Create a new BYOC Infrastructure in the organization. Returns the configuration of the newly created infrastructure</td>
</tr>
<tr>
    <td><a href="#update"><CopyableCode code="update" /></a></td>
    <td><CopyableCode code="update" /></td>
    <td><a href="#parameter-byocInfrastructureId"><code>byocInfrastructureId</code></a>, <a href="#parameter-organization_id"><code>organization_id</code></a></td>
    <td></td>
    <td>Update configuration of the BYOC infrastructure. Returns the modified infrastructure</td>
</tr>
<tr>
    <td><a href="#delete"><CopyableCode code="delete" /></a></td>
    <td><CopyableCode code="delete" /></td>
    <td><a href="#parameter-byocInfrastructureId"><code>byocInfrastructureId</code></a>, <a href="#parameter-organization_id"><code>organization_id</code></a></td>
    <td></td>
    <td>Removes a BYOC Infrastructure from the organization</td>
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
<tr id="parameter-byocInfrastructureId">
    <td><CopyableCode code="byocInfrastructureId" /></td>
    <td><code>string (uuid)</code></td>
    <td>ID of the requested BYOC Infrastructure</td>
</tr>
<tr id="parameter-organization_id">
    <td><CopyableCode code="organization_id" /></td>
    <td><code>string</code></td>
    <td>ClickHouse Cloud organization ID. Resolved from the CLICKHOUSE_ORG_ID environment variable when it is set (x-stackQL-envVar); otherwise it must be supplied on every query as WHERE organization_id = &lt;uuid&gt;. A WHERE value always takes precedence over the environment. (x-stackQL-envVar: CLICKHOUSE_ORG_ID)</td>
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

Create a new BYOC Infrastructure in the organization. Returns the configuration of the newly created infrastructure

```sql
INSERT INTO clickhouse.organizations.byoc_infrastructures (
regionId,
accountId,
availabilityZoneSuffixes,
vpcCidrRange,
displayName,
organization_id
)
SELECT 
'{{ regionId }}',
'{{ accountId }}',
'{{ availabilityZoneSuffixes }}',
'{{ vpcCidrRange }}',
'{{ displayName }}',
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
- name: byoc_infrastructures
  props:
    - name: organization_id
      value: "{{ organization_id }}"
      description: Required parameter for the byoc_infrastructures resource.
    - name: regionId
      value: "{{ regionId }}"
      description: |
        Region in which the BYOC infrastructure will be located
      valid_values: ['ap-northeast-1', 'ap-northeast-2', 'ap-south-1', 'ap-southeast-1', 'ap-southeast-2', 'ca-central-1', 'eu-central-1', 'eu-west-1', 'eu-west-2', 'il-central-1', 'us-east-1', 'us-east-2', 'us-west-2', 'us-east1', 'us-central1', 'europe-west2', 'europe-west4', 'asia-southeast1', 'asia-northeast1', 'eastus', 'eastus2', 'westus3', 'germanywestcentral', 'centralus']
    - name: accountId
      value: "{{ accountId }}"
      description: |
        Cloud account ID the BYOC infrastructure is configured for
    - name: availabilityZoneSuffixes
      value:
        - "{{ availabilityZoneSuffixes }}"
      description: |
        List of availability zone suffixes
    - name: vpcCidrRange
      value: "{{ vpcCidrRange }}"
      description: |
        CIDR range for VPC
    - name: displayName
      value: "{{ displayName }}"
      description: |
        Human readable name for infrastructure
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

Update configuration of the BYOC infrastructure. Returns the modified infrastructure

```sql
UPDATE clickhouse.organizations.byoc_infrastructures
SET 
displayName = '{{ displayName }}'
WHERE 
byocInfrastructureId = '{{ byocInfrastructureId }}' --required
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

Removes a BYOC Infrastructure from the organization

```sql
DELETE FROM clickhouse.organizations.byoc_infrastructures
WHERE byocInfrastructureId = '{{ byocInfrastructureId }}' --required
AND organization_id = '{{ organization_id }}' --required unless CLICKHOUSE_ORG_ID is set
;
```
</TabItem>
</Tabs>

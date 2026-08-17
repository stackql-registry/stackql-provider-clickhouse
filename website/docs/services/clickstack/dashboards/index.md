--- 
title: dashboards
hide_title: false
hide_table_of_contents: false
keywords:
  - dashboards
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

Creates, updates, deletes, gets or lists a <code>dashboards</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="dashboards" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="clickhouse.clickstack.dashboards" /></td></tr>
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
    <td>Dashboard ID (example: 65f5e4a3b9e77c001a567890)</td>
</tr>
<tr>
    <td><CopyableCode code="name" /></td>
    <td><code>string</code></td>
    <td>Dashboard name (example: Service Overview)</td>
</tr>
<tr>
    <td><CopyableCode code="containers" /></td>
    <td><code>array</code></td>
    <td>Optional grouping containers. Each tile may join a container via tile.containerId, and a tab inside it via tile.tabId.</td>
</tr>
<tr>
    <td><CopyableCode code="filters" /></td>
    <td><code>array</code></td>
    <td>Dashboard filter keys added to the dashboard and applied to all tiles</td>
</tr>
<tr>
    <td><CopyableCode code="savedFilterValues" /></td>
    <td><code>array</code></td>
    <td>Optional default dashboard filter values restored when loading the dashboard.</td>
</tr>
<tr>
    <td><CopyableCode code="savedQuery" /></td>
    <td><code>string</code></td>
    <td>Optional default dashboard query restored when loading the dashboard. (example: service.name = 'api')</td>
</tr>
<tr>
    <td><CopyableCode code="savedQueryLanguage" /></td>
    <td><code>string</code></td>
    <td>Query language used by savedQuery. (sql, lucene) (example: sql)</td>
</tr>
<tr>
    <td><CopyableCode code="tags" /></td>
    <td><code>array</code></td>
    <td>Tags for organizing and filtering dashboards</td>
</tr>
<tr>
    <td><CopyableCode code="tiles" /></td>
    <td><code>array</code></td>
    <td>List of tiles/charts in the dashboard</td>
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
    <td>Dashboard ID (example: 65f5e4a3b9e77c001a567890)</td>
</tr>
<tr>
    <td><CopyableCode code="name" /></td>
    <td><code>string</code></td>
    <td>Dashboard name (example: Service Overview)</td>
</tr>
<tr>
    <td><CopyableCode code="containers" /></td>
    <td><code>array</code></td>
    <td>Optional grouping containers. Each tile may join a container via tile.containerId, and a tab inside it via tile.tabId.</td>
</tr>
<tr>
    <td><CopyableCode code="filters" /></td>
    <td><code>array</code></td>
    <td>Dashboard filter keys added to the dashboard and applied to all tiles</td>
</tr>
<tr>
    <td><CopyableCode code="savedFilterValues" /></td>
    <td><code>array</code></td>
    <td>Optional default dashboard filter values restored when loading the dashboard.</td>
</tr>
<tr>
    <td><CopyableCode code="savedQuery" /></td>
    <td><code>string</code></td>
    <td>Optional default dashboard query restored when loading the dashboard. (example: service.name = 'api')</td>
</tr>
<tr>
    <td><CopyableCode code="savedQueryLanguage" /></td>
    <td><code>string</code></td>
    <td>Query language used by savedQuery. (sql, lucene) (example: sql)</td>
</tr>
<tr>
    <td><CopyableCode code="tags" /></td>
    <td><code>array</code></td>
    <td>Tags for organizing and filtering dashboards</td>
</tr>
<tr>
    <td><CopyableCode code="tiles" /></td>
    <td><code>array</code></td>
    <td>List of tiles/charts in the dashboard</td>
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
    <td><a href="#parameter-serviceId"><code>serviceId</code></a>, <a href="#parameter-clickStackDashboardId"><code>clickStackDashboardId</code></a>, <a href="#parameter-organizationId"><code>organizationId</code></a></td>
    <td></td>
    <td>**This endpoint is in beta.** API contract is stable, and no breaking changes are expected in the future. &lt;br /&gt;&lt;br /&gt; ClickStack: Retrieves a specific dashboard by ID</td>
</tr>
<tr>
    <td><a href="#list"><CopyableCode code="list" /></a></td>
    <td><CopyableCode code="select" /></td>
    <td><a href="#parameter-serviceId"><code>serviceId</code></a>, <a href="#parameter-organizationId"><code>organizationId</code></a></td>
    <td></td>
    <td>**This endpoint is in beta.** API contract is stable, and no breaking changes are expected in the future. &lt;br /&gt;&lt;br /&gt; ClickStack: Retrieves a list of all dashboards for the authenticated team</td>
</tr>
<tr>
    <td><a href="#create"><CopyableCode code="create" /></a></td>
    <td><CopyableCode code="insert" /></td>
    <td><a href="#parameter-serviceId"><code>serviceId</code></a>, <a href="#parameter-organizationId"><code>organizationId</code></a>, <a href="#parameter-name"><code>name</code></a>, <a href="#parameter-tiles"><code>tiles</code></a></td>
    <td></td>
    <td>**This endpoint is in beta.** API contract is stable, and no breaking changes are expected in the future. &lt;br /&gt;&lt;br /&gt; ClickStack: Creates a new dashboard</td>
</tr>
<tr>
    <td><a href="#update"><CopyableCode code="update" /></a></td>
    <td><CopyableCode code="update" /></td>
    <td><a href="#parameter-serviceId"><code>serviceId</code></a>, <a href="#parameter-clickStackDashboardId"><code>clickStackDashboardId</code></a>, <a href="#parameter-organizationId"><code>organizationId</code></a>, <a href="#parameter-name"><code>name</code></a>, <a href="#parameter-tiles"><code>tiles</code></a></td>
    <td></td>
    <td>**This endpoint is in beta.** API contract is stable, and no breaking changes are expected in the future. &lt;br /&gt;&lt;br /&gt; ClickStack: Updates an existing dashboard.  **Concurrency:** This endpoint does not support optimistic concurrency control. Concurrent PUT requests for the same dashboard may silently overwrite each other, which can leave orphan tile-to-container references on layout-shape edits. Clients should serialize edits to a given dashboard.</td>
</tr>
<tr>
    <td><a href="#delete"><CopyableCode code="delete" /></a></td>
    <td><CopyableCode code="delete" /></td>
    <td><a href="#parameter-serviceId"><code>serviceId</code></a>, <a href="#parameter-clickStackDashboardId"><code>clickStackDashboardId</code></a>, <a href="#parameter-organizationId"><code>organizationId</code></a></td>
    <td></td>
    <td>**This endpoint is in beta.** API contract is stable, and no breaking changes are expected in the future. &lt;br /&gt;&lt;br /&gt; ClickStack: Deletes a dashboard</td>
</tr>
<tr>
    <td><a href="#validate"><CopyableCode code="validate" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-serviceId"><code>serviceId</code></a>, <a href="#parameter-organizationId"><code>organizationId</code></a>, <a href="#parameter-name"><code>name</code></a>, <a href="#parameter-tiles"><code>tiles</code></a></td>
    <td></td>
    <td>**This endpoint is in beta.** API contract is stable, and no breaking changes are expected in the future. &lt;br /&gt;&lt;br /&gt; ClickStack: Validates a dashboard body against the same schema and tile rules used by POST /api/v2/dashboards. The dashboard is **never persisted**. Use this endpoint at plan time (e.g. from a Terraform provider) to check that a dashboard configuration is valid before applying it.</td>
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
<tr id="parameter-clickStackDashboardId">
    <td><CopyableCode code="clickStackDashboardId" /></td>
    <td><code>string</code></td>
    <td>ClickStack Dashboard ID</td>
</tr>
<tr id="parameter-organizationId">
    <td><CopyableCode code="organizationId" /></td>
    <td><code>string</code></td>
    <td>ClickHouse Cloud organization ID. Resolved from the CLICKHOUSE_ORG_ID environment variable when it is set (x-stackQL-envVar); otherwise it must be supplied on every query as WHERE organizationId = &lt;uuid&gt;. A WHERE value always takes precedence over the environment. (x-stackQL-envVar: CLICKHOUSE_ORG_ID)</td>
</tr>
<tr id="parameter-serviceId">
    <td><CopyableCode code="serviceId" /></td>
    <td><code>string (uuid)</code></td>
    <td>ID of the ClickStack service.</td>
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

**This endpoint is in beta.** API contract is stable, and no breaking changes are expected in the future. &lt;br /&gt;&lt;br /&gt; ClickStack: Retrieves a specific dashboard by ID

```sql
SELECT
id,
name,
containers,
filters,
savedFilterValues,
savedQuery,
savedQueryLanguage,
tags,
tiles
FROM clickhouse.clickstack.dashboards
WHERE serviceId = '{{ serviceId }}' -- required
AND clickStackDashboardId = '{{ clickStackDashboardId }}' -- required
AND organizationId = '{{ organizationId }}' -- required unless CLICKHOUSE_ORG_ID is set
;
```
</TabItem>
<TabItem value="list">

**This endpoint is in beta.** API contract is stable, and no breaking changes are expected in the future. &lt;br /&gt;&lt;br /&gt; ClickStack: Retrieves a list of all dashboards for the authenticated team

```sql
SELECT
id,
name,
containers,
filters,
savedFilterValues,
savedQuery,
savedQueryLanguage,
tags,
tiles
FROM clickhouse.clickstack.dashboards
WHERE serviceId = '{{ serviceId }}' -- required
AND organizationId = '{{ organizationId }}' -- required unless CLICKHOUSE_ORG_ID is set
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

**This endpoint is in beta.** API contract is stable, and no breaking changes are expected in the future. &lt;br /&gt;&lt;br /&gt; ClickStack: Creates a new dashboard

```sql
INSERT INTO clickhouse.clickstack.dashboards (
name,
tiles,
tags,
filters,
savedQuery,
savedQueryLanguage,
savedFilterValues,
containers,
serviceId,
organizationId
)
SELECT 
'{{ name }}' /* required */,
'{{ tiles }}' /* required */,
'{{ tags }}',
'{{ filters }}',
'{{ savedQuery }}',
'{{ savedQueryLanguage }}',
'{{ savedFilterValues }}',
'{{ containers }}',
'{{ serviceId }}',
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
- name: dashboards
  props:
    - name: serviceId
      value: "{{ serviceId }}"
      description: Required parameter for the dashboards resource.
    - name: organizationId
      value: "{{ organizationId }}"
      description: Required parameter for the dashboards resource.
    - name: name
      value: "{{ name }}"
      description: |
        Dashboard name.
    - name: tiles
      description: |
        List of tiles/charts to include in the dashboard.
      value:
        - name: "{{ name }}"
          x: {{ x }}
          y: {{ y }}
          w: {{ w }}
          h: {{ h }}
          config:
            displayType: "{{ displayType }}"
            sourceId: "{{ sourceId }}"
            select:
              - aggFn: "{{ aggFn }}"
                valueExpression: "{{ valueExpression }}"
                alias: "{{ alias }}"
                level: {{ level }}
                where: "{{ where }}"
                whereLanguage: "{{ whereLanguage }}"
                metricName: "{{ metricName }}"
                metricType: "{{ metricType }}"
                periodAggFn: "{{ periodAggFn }}"
                numberFormat:
                  output: "{{ output }}"
                  mantissa: {{ mantissa }}
                  thousandSeparated: {{ thousandSeparated }}
                  average: {{ average }}
                  decimalBytes: {{ decimalBytes }}
                  factor: {{ factor }}
                  currencySymbol: "{{ currencySymbol }}"
                  numericUnit: "{{ numericUnit }}"
                  unit: "{{ unit }}"
            groupBy: "{{ groupBy }}"
            asRatio: {{ asRatio }}
            alignDateRangeToGranularity: {{ alignDateRangeToGranularity }}
            fillNulls: {{ fillNulls }}
            fitYAxisToData: {{ fitYAxisToData }}
            numberFormat:
              output: "{{ output }}"
              mantissa: {{ mantissa }}
              thousandSeparated: {{ thousandSeparated }}
              average: {{ average }}
              decimalBytes: {{ decimalBytes }}
              factor: {{ factor }}
              currencySymbol: "{{ currencySymbol }}"
              numericUnit: "{{ numericUnit }}"
              unit: "{{ unit }}"
            compareToPreviousPeriod: {{ compareToPreviousPeriod }}
            configType: "{{ configType }}"
            connectionId: "{{ connectionId }}"
            sqlTemplate: "{{ sqlTemplate }}"
            having: "{{ having }}"
            orderBy: "{{ orderBy }}"
            groupByColumnsOnLeft: {{ groupByColumnsOnLeft }}
            onClick:
              type: "{{ type }}"
              target:
                mode: "{{ mode }}"
                id: "{{ id }}"
                template: "{{ template }}"
              whereTemplate: "{{ whereTemplate }}"
              whereLanguage: "{{ whereLanguage }}"
              filters:
                - kind: "{{ kind }}"
                  expression: "{{ expression }}"
                  template: "{{ template }}"
              urlTemplate: "{{ urlTemplate }}"
            color: "{{ color }}"
            colorRules:
              - operator: "{{ operator }}"
                value: {{ value }}
                color: "{{ color }}"
                label: "{{ label }}"
            backgroundChart:
              type: "{{ type }}"
              color: "{{ color }}"
            limit: {{ limit }}
            where: "{{ where }}"
            whereLanguage: "{{ whereLanguage }}"
            markdown: "{{ markdown }}"
          containerId: "{{ containerId }}"
          tabId: "{{ tabId }}"
          id: "{{ id }}"
          asRatio: {{ asRatio }}
          series: "{{ series }}"
    - name: tags
      value:
        - "{{ tags }}"
      description: |
        Tags for organizing and filtering dashboards.
    - name: filters
      description: |
        Dashboard filter keys to add to the dashboard and apply across all tiles
      value:
        - type: "{{ type }}"
          name: "{{ name }}"
          expression: "{{ expression }}"
          sourceId: "{{ sourceId }}"
          sourceMetricType: "{{ sourceMetricType }}"
          where: "{{ where }}"
          whereLanguage: "{{ whereLanguage }}"
          appliesToSourceIds: "{{ appliesToSourceIds }}"
    - name: savedQuery
      value: "{{ savedQuery }}"
      description: |
        Optional default dashboard query to persist on the dashboard.
    - name: savedQueryLanguage
      value: "{{ savedQueryLanguage }}"
      description: |
        Query language used by savedQuery.
      valid_values: ['sql', 'lucene']
    - name: savedFilterValues
      description: |
        Optional default dashboard filter values to persist on the dashboard.
      value:
        - type: "{{ type }}"
          condition: "{{ condition }}"
    - name: containers
      description: |
        Optional grouping containers. Each tile may join a container via tile.containerId, and a tab inside it via tile.tabId.
      value:
        - id: "{{ id }}"
          title: "{{ title }}"
          collapsed: {{ collapsed }}
          collapsible: {{ collapsible }}
          bordered: {{ bordered }}
          tabs: "{{ tabs }}"
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

**This endpoint is in beta.** API contract is stable, and no breaking changes are expected in the future. &lt;br /&gt;&lt;br /&gt; ClickStack: Updates an existing dashboard.  **Concurrency:** This endpoint does not support optimistic concurrency control. Concurrent PUT requests for the same dashboard may silently overwrite each other, which can leave orphan tile-to-container references on layout-shape edits. Clients should serialize edits to a given dashboard.

```sql
UPDATE clickhouse.clickstack.dashboards
SET 
name = '{{ name }}',
tiles = '{{ tiles }}',
tags = '{{ tags }}',
filters = '{{ filters }}',
savedQuery = '{{ savedQuery }}',
savedQueryLanguage = '{{ savedQueryLanguage }}',
savedFilterValues = '{{ savedFilterValues }}',
containers = '{{ containers }}'
WHERE 
serviceId = '{{ serviceId }}' --required
AND clickStackDashboardId = '{{ clickStackDashboardId }}' --required
AND organizationId = '{{ organizationId }}' --required unless CLICKHOUSE_ORG_ID is set
AND name = '{{ name }}' --required
AND tiles = '{{ tiles }}' --required
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

**This endpoint is in beta.** API contract is stable, and no breaking changes are expected in the future. &lt;br /&gt;&lt;br /&gt; ClickStack: Deletes a dashboard

```sql
DELETE FROM clickhouse.clickstack.dashboards
WHERE serviceId = '{{ serviceId }}' --required
AND clickStackDashboardId = '{{ clickStackDashboardId }}' --required
AND organizationId = '{{ organizationId }}' --required unless CLICKHOUSE_ORG_ID is set
;
```
</TabItem>
</Tabs>


## Lifecycle Methods

<Tabs
    defaultValue="validate"
    values={[
        { label: 'validate', value: 'validate' }
    ]}
>
<TabItem value="validate">

**This endpoint is in beta.** API contract is stable, and no breaking changes are expected in the future. &lt;br /&gt;&lt;br /&gt; ClickStack: Validates a dashboard body against the same schema and tile rules used by POST /api/v2/dashboards. The dashboard is **never persisted**. Use this endpoint at plan time (e.g. from a Terraform provider) to check that a dashboard configuration is valid before applying it.

```sql
EXEC clickhouse.clickstack.dashboards.validate 
@serviceId='{{ serviceId }}' --required, 
@organizationId='{{ organizationId }}' --required unless CLICKHOUSE_ORG_ID is set 
@@json=
'{
"name": "{{ name }}", 
"tiles": "{{ tiles }}", 
"tags": "{{ tags }}", 
"filters": "{{ filters }}", 
"savedQuery": "{{ savedQuery }}", 
"savedQueryLanguage": "{{ savedQueryLanguage }}", 
"savedFilterValues": "{{ savedFilterValues }}", 
"containers": "{{ containers }}"
}'
;
```
</TabItem>
</Tabs>

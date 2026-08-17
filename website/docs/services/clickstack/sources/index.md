--- 
title: sources
hide_title: false
hide_table_of_contents: false
keywords:
  - sources
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

Creates, updates, deletes, gets or lists a <code>sources</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="sources" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="clickhouse.clickstack.sources" /></td></tr>
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
    <td>Unique source ID. (example: 507f1f77bcf86cd799439011)</td>
</tr>
<tr>
    <td><CopyableCode code="name" /></td>
    <td><code>string</code></td>
    <td>Display name for the source. (example: Logs)</td>
</tr>
<tr>
    <td><CopyableCode code="bodyExpression" /></td>
    <td><code>string</code></td>
    <td>Expression to extract the log message body. (example: Body)</td>
</tr>
<tr>
    <td><CopyableCode code="connection" /></td>
    <td><code>string</code></td>
    <td>ID of the ClickHouse connection used by this source. (example: 507f1f77bcf86cd799439012)</td>
</tr>
<tr>
    <td><CopyableCode code="defaultTableSelectExpression" /></td>
    <td><code>string</code></td>
    <td>Default columns selected in search results (this can be customized per search later) (example: Timestamp, ServiceName, SeverityText, Body)</td>
</tr>
<tr>
    <td><CopyableCode code="displayedTimestampValueExpression" /></td>
    <td><code>string</code></td>
    <td>This DateTime column is used to display and order search results. (example: TimestampTime)</td>
</tr>
<tr>
    <td><CopyableCode code="durationExpression" /></td>
    <td><code>string</code></td>
    <td>Expression to extract span duration. (example: Duration)</td>
</tr>
<tr>
    <td><CopyableCode code="durationPrecision" /></td>
    <td><code>integer</code></td>
    <td>Number of decimal digits in the duration value (e.g., 3 for milliseconds, 6 for microseconds, 9 for nanoseconds).</td>
</tr>
<tr>
    <td><CopyableCode code="eventAttributesExpression" /></td>
    <td><code>string</code></td>
    <td>Expression to extract event-level attributes. (example: LogAttributes)</td>
</tr>
<tr>
    <td><CopyableCode code="filterSettings" /></td>
    <td><code>object</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="from" /></td>
    <td><code>object</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="highlightedRowAttributeExpressions" /></td>
    <td><code>array</code></td>
    <td>Expressions defining row-level attributes which are displayed in the row side panel for the selected row.</td>
</tr>
<tr>
    <td><CopyableCode code="highlightedTraceAttributeExpressions" /></td>
    <td><code>array</code></td>
    <td>Expressions defining trace-level attributes which are displayed in the trace view for the selected trace.</td>
</tr>
<tr>
    <td><CopyableCode code="implicitColumnExpression" /></td>
    <td><code>string</code></td>
    <td>Column used for full text search if no property is specified in a Lucene-based search. Typically the message body of a log. (example: Body)</td>
</tr>
<tr>
    <td><CopyableCode code="kind" /></td>
    <td><code>string</code></td>
    <td>Source kind discriminator. Must be "log" for log sources. (log) (example: log)</td>
</tr>
<tr>
    <td><CopyableCode code="logSourceId" /></td>
    <td><code>string</code></td>
    <td>HyperDX Source for logs associated with traces. Optional (example: 507f1f77bcf86cd799439011)</td>
</tr>
<tr>
    <td><CopyableCode code="materializedViews" /></td>
    <td><code>array</code></td>
    <td>Configure materialized views for query optimization. These pre-aggregated views can significantly improve query performance on aggregation queries.</td>
</tr>
<tr>
    <td><CopyableCode code="metadataMaterializedViews" /></td>
    <td><code>object</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="metricSourceId" /></td>
    <td><code>string</code></td>
    <td>HyperDX Source for metrics associated with logs. Optional (example: 507f1f77bcf86cd799439013)</td>
</tr>
<tr>
    <td><CopyableCode code="metricTables" /></td>
    <td><code>object</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="parentSpanIdExpression" /></td>
    <td><code>string</code></td>
    <td>Expression to extract the parent span ID. (example: ParentSpanId)</td>
</tr>
<tr>
    <td><CopyableCode code="querySettings" /></td>
    <td><code>array</code></td>
    <td>Optional ClickHouse query settings applied when querying this source.</td>
</tr>
<tr>
    <td><CopyableCode code="resourceAttributesExpression" /></td>
    <td><code>string</code></td>
    <td>Expression to extract resource-level attributes. (example: ResourceAttributes)</td>
</tr>
<tr>
    <td><CopyableCode code="serviceNameExpression" /></td>
    <td><code>string</code></td>
    <td>Expression to extract the service name from log rows. (example: ServiceName)</td>
</tr>
<tr>
    <td><CopyableCode code="sessionSourceId" /></td>
    <td><code>string</code></td>
    <td>HyperDX Source for sessions associated with traces. Optional (example: 507f1f77bcf86cd799439031)</td>
</tr>
<tr>
    <td><CopyableCode code="severityTextExpression" /></td>
    <td><code>string</code></td>
    <td>Expression to extract the severity/log level text. (example: SeverityText)</td>
</tr>
<tr>
    <td><CopyableCode code="spanEventsValueExpression" /></td>
    <td><code>string</code></td>
    <td>Expression to extract span events. Used to capture events associated with spans. Expected to be Nested ( Timestamp DateTime64(9), Name LowCardinality(String), Attributes Map(LowCardinality(String), String) (example: Events)</td>
</tr>
<tr>
    <td><CopyableCode code="spanIdExpression" /></td>
    <td><code>string</code></td>
    <td>Expression to extract the span ID for correlating logs with traces. (example: SpanId)</td>
</tr>
<tr>
    <td><CopyableCode code="spanKindExpression" /></td>
    <td><code>string</code></td>
    <td>Expression to extract the span kind (e.g., client, server, internal). (example: SpanKind)</td>
</tr>
<tr>
    <td><CopyableCode code="spanNameExpression" /></td>
    <td><code>string</code></td>
    <td>Expression to extract the span name. (example: SpanName)</td>
</tr>
<tr>
    <td><CopyableCode code="statusCodeExpression" /></td>
    <td><code>string</code></td>
    <td>Expression to extract the span status code. (example: StatusCode)</td>
</tr>
<tr>
    <td><CopyableCode code="statusMessageExpression" /></td>
    <td><code>string</code></td>
    <td>Expression to extract the span status message. (example: StatusMessage)</td>
</tr>
<tr>
    <td><CopyableCode code="timestampValueExpression" /></td>
    <td><code>string</code></td>
    <td>DateTime column or expression that is part of your table's primary key. (example: Timestamp)</td>
</tr>
<tr>
    <td><CopyableCode code="traceIdExpression" /></td>
    <td><code>string</code></td>
    <td>Expression to extract the trace ID for correlating logs with traces. (example: TraceId)</td>
</tr>
<tr>
    <td><CopyableCode code="traceSourceId" /></td>
    <td><code>string</code></td>
    <td>HyperDX Source for traces associated with logs. Optional (example: 507f1f77bcf86cd799439014)</td>
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
    <td><a href="#parameter-serviceId"><code>serviceId</code></a>, <a href="#parameter-organizationId"><code>organizationId</code></a></td>
    <td></td>
    <td>**This endpoint is in beta.** API contract is stable, and no breaking changes are expected in the future. &lt;br /&gt;&lt;br /&gt; ClickStack: Retrieves a list of all sources for the authenticated team</td>
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
    <td>ID of the ClickStack service.</td>
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

**This endpoint is in beta.** API contract is stable, and no breaking changes are expected in the future. &lt;br /&gt;&lt;br /&gt; ClickStack: Retrieves a list of all sources for the authenticated team

```sql
SELECT
id,
name,
bodyExpression,
connection,
defaultTableSelectExpression,
displayedTimestampValueExpression,
durationExpression,
durationPrecision,
eventAttributesExpression,
filterSettings,
from,
highlightedRowAttributeExpressions,
highlightedTraceAttributeExpressions,
implicitColumnExpression,
kind,
logSourceId,
materializedViews,
metadataMaterializedViews,
metricSourceId,
metricTables,
parentSpanIdExpression,
querySettings,
resourceAttributesExpression,
serviceNameExpression,
sessionSourceId,
severityTextExpression,
spanEventsValueExpression,
spanIdExpression,
spanKindExpression,
spanNameExpression,
statusCodeExpression,
statusMessageExpression,
timestampValueExpression,
traceIdExpression,
traceSourceId
FROM clickhouse.clickstack.sources
WHERE serviceId = '{{ serviceId }}' -- required
AND organizationId = '{{ organizationId }}' -- required unless CLICKHOUSE_ORG_ID is set
;
```
</TabItem>
</Tabs>

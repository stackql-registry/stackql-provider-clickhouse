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
    <td>Unique source ID. Server-generated; ignored if sent in create/update requests. (example: 507f1f77bcf86cd799439011)</td>
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
    <td><CopyableCode code="disabled" /></td>
    <td><code>boolean</code></td>
    <td>When true, the source is hidden from source selectors in the UI. Defaults to false.</td>
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
    <td><CopyableCode code="knownColumnsListExpression" /></td>
    <td><code>string</code></td>
    <td>For Distributed table sources whose target tables have non-matching column sets. A list of columns supported across all target tables, used instead of SELECT * when fetching full row data. Leave blank to select all columns. (example: Timestamp, Body, ServiceName)</td>
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
    <td><CopyableCode code="section" /></td>
    <td><code>string</code></td>
    <td>Optional grouping label used to organize sources in the source selector. Sources that share a section value are displayed together. (example: Billing)</td>
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
<tr>
    <td><CopyableCode code="useTextIndexForImplicitColumn" /></td>
    <td><code>string</code></td>
    <td>Controls whether lucene rendering uses ClickHouse text indices via hasAllTokens() against the implicit column. "auto" detects a covering index at query time, "enabled" forces text index usage, "disabled" forces a LIKE/hasToken fallback. (auto, enabled, disabled) (example: auto)</td>
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
    <td>Unique source ID. Server-generated; ignored if sent in create/update requests. (example: 507f1f77bcf86cd799439011)</td>
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
    <td><CopyableCode code="disabled" /></td>
    <td><code>boolean</code></td>
    <td>When true, the source is hidden from source selectors in the UI. Defaults to false.</td>
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
    <td><CopyableCode code="knownColumnsListExpression" /></td>
    <td><code>string</code></td>
    <td>For Distributed table sources whose target tables have non-matching column sets. A list of columns supported across all target tables, used instead of SELECT * when fetching full row data. Leave blank to select all columns. (example: Timestamp, Body, ServiceName)</td>
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
    <td><CopyableCode code="section" /></td>
    <td><code>string</code></td>
    <td>Optional grouping label used to organize sources in the source selector. Sources that share a section value are displayed together. (example: Billing)</td>
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
<tr>
    <td><CopyableCode code="useTextIndexForImplicitColumn" /></td>
    <td><code>string</code></td>
    <td>Controls whether lucene rendering uses ClickHouse text indices via hasAllTokens() against the implicit column. "auto" detects a covering index at query time, "enabled" forces text index usage, "disabled" forces a LIKE/hasToken fallback. (auto, enabled, disabled) (example: auto)</td>
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
    <td><a href="#parameter-serviceId"><code>serviceId</code></a>, <a href="#parameter-clickStackSourceId"><code>clickStackSourceId</code></a>, <a href="#parameter-organization_id"><code>organization_id</code></a></td>
    <td></td>
    <td>**This endpoint is in beta.** API contract is stable, and no breaking changes are expected in the future. &lt;br /&gt;&lt;br /&gt; ClickStack: Retrieves a specific source by ID</td>
</tr>
<tr>
    <td><a href="#list"><CopyableCode code="list" /></a></td>
    <td><CopyableCode code="select" /></td>
    <td><a href="#parameter-serviceId"><code>serviceId</code></a>, <a href="#parameter-organization_id"><code>organization_id</code></a></td>
    <td></td>
    <td>**This endpoint is in beta.** API contract is stable, and no breaking changes are expected in the future. &lt;br /&gt;&lt;br /&gt; ClickStack: Retrieves a list of all sources for the authenticated team</td>
</tr>
<tr>
    <td><a href="#create"><CopyableCode code="create" /></a></td>
    <td><CopyableCode code="insert" /></td>
    <td><a href="#parameter-serviceId"><code>serviceId</code></a>, <a href="#parameter-organization_id"><code>organization_id</code></a>, <a href="#parameter-name"><code>name</code></a>, <a href="#parameter-kind"><code>kind</code></a>, <a href="#parameter-connection"><code>connection</code></a>, <a href="#parameter-from"><code>from</code></a>, <a href="#parameter-defaultTableSelectExpression"><code>defaultTableSelectExpression</code></a>, <a href="#parameter-timestampValueExpression"><code>timestampValueExpression</code></a>, <a href="#parameter-durationExpression"><code>durationExpression</code></a>, <a href="#parameter-durationPrecision"><code>durationPrecision</code></a>, <a href="#parameter-traceIdExpression"><code>traceIdExpression</code></a>, <a href="#parameter-spanIdExpression"><code>spanIdExpression</code></a>, <a href="#parameter-parentSpanIdExpression"><code>parentSpanIdExpression</code></a>, <a href="#parameter-spanNameExpression"><code>spanNameExpression</code></a>, <a href="#parameter-spanKindExpression"><code>spanKindExpression</code></a>, <a href="#parameter-metricTables"><code>metricTables</code></a>, <a href="#parameter-resourceAttributesExpression"><code>resourceAttributesExpression</code></a>, <a href="#parameter-traceSourceId"><code>traceSourceId</code></a></td>
    <td></td>
    <td>**This endpoint is in beta.** API contract is stable, and no breaking changes are expected in the future. &lt;br /&gt;&lt;br /&gt; ClickStack: Creates a new source.  The request body is a source object without the `id` field. If an `id` is sent anyway it is silently ignored (stripped before validation — the request is never rejected because of it). Granularity fields (`materializedViews&#91;&#93;.minGranularity` and `metadataMaterializedViews.granularity`) accept the same short format the API returns (e.g. `5m`, `15s`, `1h`, `1d`).</td>
</tr>
<tr>
    <td><a href="#update"><CopyableCode code="update" /></a></td>
    <td><CopyableCode code="update" /></td>
    <td><a href="#parameter-serviceId"><code>serviceId</code></a>, <a href="#parameter-clickStackSourceId"><code>clickStackSourceId</code></a>, <a href="#parameter-organization_id"><code>organization_id</code></a>, <a href="#parameter-name"><code>name</code></a>, <a href="#parameter-kind"><code>kind</code></a>, <a href="#parameter-connection"><code>connection</code></a>, <a href="#parameter-from"><code>from</code></a>, <a href="#parameter-defaultTableSelectExpression"><code>defaultTableSelectExpression</code></a>, <a href="#parameter-timestampValueExpression"><code>timestampValueExpression</code></a>, <a href="#parameter-durationExpression"><code>durationExpression</code></a>, <a href="#parameter-durationPrecision"><code>durationPrecision</code></a>, <a href="#parameter-traceIdExpression"><code>traceIdExpression</code></a>, <a href="#parameter-spanIdExpression"><code>spanIdExpression</code></a>, <a href="#parameter-parentSpanIdExpression"><code>parentSpanIdExpression</code></a>, <a href="#parameter-spanNameExpression"><code>spanNameExpression</code></a>, <a href="#parameter-spanKindExpression"><code>spanKindExpression</code></a>, <a href="#parameter-metricTables"><code>metricTables</code></a>, <a href="#parameter-resourceAttributesExpression"><code>resourceAttributesExpression</code></a>, <a href="#parameter-traceSourceId"><code>traceSourceId</code></a></td>
    <td></td>
    <td>**This endpoint is in beta.** API contract is stable, and no breaking changes are expected in the future. &lt;br /&gt;&lt;br /&gt; ClickStack: Updates an existing source. The full source object must be provided; this is a replace, not a patch.  The request body is a source object without the `id` field. If an `id` is sent anyway it is silently ignored (stripped before validation — never a 400); the path parameter alone identifies the source. Granularity fields (`materializedViews&#91;&#93;.minGranularity` and `metadataMaterializedViews.granularity`) accept the same short format the API returns (e.g. `5m`, `15s`, `1h`, `1d`).</td>
</tr>
<tr>
    <td><a href="#delete"><CopyableCode code="delete" /></a></td>
    <td><CopyableCode code="delete" /></td>
    <td><a href="#parameter-serviceId"><code>serviceId</code></a>, <a href="#parameter-clickStackSourceId"><code>clickStackSourceId</code></a>, <a href="#parameter-organization_id"><code>organization_id</code></a></td>
    <td></td>
    <td>**This endpoint is in beta.** API contract is stable, and no breaking changes are expected in the future. &lt;br /&gt;&lt;br /&gt; ClickStack: Deletes a source</td>
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
<tr id="parameter-clickStackSourceId">
    <td><CopyableCode code="clickStackSourceId" /></td>
    <td><code>string</code></td>
    <td>Source ID</td>
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

**This endpoint is in beta.** API contract is stable, and no breaking changes are expected in the future. &lt;br /&gt;&lt;br /&gt; ClickStack: Retrieves a specific source by ID

```sql
SELECT
id,
name,
bodyExpression,
connection,
defaultTableSelectExpression,
disabled,
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
knownColumnsListExpression,
logSourceId,
materializedViews,
metadataMaterializedViews,
metricSourceId,
metricTables,
parentSpanIdExpression,
querySettings,
resourceAttributesExpression,
section,
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
traceSourceId,
useTextIndexForImplicitColumn
FROM clickhouse.clickstack.sources
WHERE serviceId = '{{ serviceId }}' -- required
AND clickStackSourceId = '{{ clickStackSourceId }}' -- required
AND organization_id = '{{ organization_id }}' -- required unless CLICKHOUSE_ORG_ID is set
;
```
</TabItem>
<TabItem value="list">

**This endpoint is in beta.** API contract is stable, and no breaking changes are expected in the future. &lt;br /&gt;&lt;br /&gt; ClickStack: Retrieves a list of all sources for the authenticated team

```sql
SELECT
id,
name,
bodyExpression,
connection,
defaultTableSelectExpression,
disabled,
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
knownColumnsListExpression,
logSourceId,
materializedViews,
metadataMaterializedViews,
metricSourceId,
metricTables,
parentSpanIdExpression,
querySettings,
resourceAttributesExpression,
section,
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
traceSourceId,
useTextIndexForImplicitColumn
FROM clickhouse.clickstack.sources
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

**This endpoint is in beta.** API contract is stable, and no breaking changes are expected in the future. &lt;br /&gt;&lt;br /&gt; ClickStack: Creates a new source.  The request body is a source object without the `id` field. If an `id` is sent anyway it is silently ignored (stripped before validation — the request is never rejected because of it). Granularity fields (`materializedViews&#91;&#93;.minGranularity` and `metadataMaterializedViews.granularity`) accept the same short format the API returns (e.g. `5m`, `15s`, `1h`, `1d`).

```sql
INSERT INTO clickhouse.clickstack.sources (
id,
name,
section,
disabled,
kind,
connection,
from,
querySettings,
filterSettings,
defaultTableSelectExpression,
timestampValueExpression,
serviceNameExpression,
severityTextExpression,
bodyExpression,
eventAttributesExpression,
resourceAttributesExpression,
displayedTimestampValueExpression,
metricSourceId,
traceSourceId,
traceIdExpression,
spanIdExpression,
implicitColumnExpression,
knownColumnsListExpression,
useTextIndexForImplicitColumn,
highlightedTraceAttributeExpressions,
highlightedRowAttributeExpressions,
materializedViews,
metadataMaterializedViews,
durationExpression,
durationPrecision,
parentSpanIdExpression,
spanNameExpression,
spanKindExpression,
logSourceId,
sessionSourceId,
statusCodeExpression,
statusMessageExpression,
spanEventsValueExpression,
metricTables,
serviceId,
organization_id
)
SELECT 
'{{ id }}',
'{{ name }}' /* required */,
'{{ section }}',
{{ disabled }},
'{{ kind }}' /* required */,
'{{ connection }}' /* required */,
'{{ from }}' /* required */,
'{{ querySettings }}',
'{{ filterSettings }}',
'{{ defaultTableSelectExpression }}' /* required */,
'{{ timestampValueExpression }}' /* required */,
'{{ serviceNameExpression }}',
'{{ severityTextExpression }}',
'{{ bodyExpression }}',
'{{ eventAttributesExpression }}',
'{{ resourceAttributesExpression }}' /* required */,
'{{ displayedTimestampValueExpression }}',
'{{ metricSourceId }}',
'{{ traceSourceId }}' /* required */,
'{{ traceIdExpression }}' /* required */,
'{{ spanIdExpression }}' /* required */,
'{{ implicitColumnExpression }}',
'{{ knownColumnsListExpression }}',
'{{ useTextIndexForImplicitColumn }}',
'{{ highlightedTraceAttributeExpressions }}',
'{{ highlightedRowAttributeExpressions }}',
'{{ materializedViews }}',
'{{ metadataMaterializedViews }}',
'{{ durationExpression }}' /* required */,
{{ durationPrecision }} /* required */,
'{{ parentSpanIdExpression }}' /* required */,
'{{ spanNameExpression }}' /* required */,
'{{ spanKindExpression }}' /* required */,
'{{ logSourceId }}',
'{{ sessionSourceId }}',
'{{ statusCodeExpression }}',
'{{ statusMessageExpression }}',
'{{ spanEventsValueExpression }}',
'{{ metricTables }}' /* required */,
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
- name: sources
  props:
    - name: serviceId
      value: "{{ serviceId }}"
      description: Required parameter for the sources resource.
    - name: organization_id
      value: "{{ organization_id }}"
      description: Required parameter for the sources resource.
    - name: id
      value: "{{ id }}"
      description: |
        Unique source ID. Server-generated; ignored if sent in create/update requests.
    - name: name
      value: "{{ name }}"
      description: |
        Display name for the source.
    - name: section
      value: "{{ section }}"
      description: |
        Optional grouping label used to organize sources in the source selector. Sources that share a section value are displayed together.
    - name: disabled
      value: {{ disabled }}
      description: |
        When true, the source is hidden from source selectors in the UI. Defaults to false.
    - name: kind
      value: "{{ kind }}"
      description: |
        Source kind discriminator. Must be "log" for log sources.
      valid_values: ['log']
    - name: connection
      value: "{{ connection }}"
      description: |
        ID of the ClickHouse connection used by this source.
    - name: from
      value:
        databaseName: "{{ databaseName }}"
        tableName: "{{ tableName }}"
    - name: querySettings
      description: |
        Optional ClickHouse query settings applied when querying this source.
      value:
        - setting: "{{ setting }}"
          value: "{{ value }}"
    - name: filterSettings
      value:
        databaseName: "{{ databaseName }}"
        tableName: "{{ tableName }}"
        columns:
          - name: "{{ name }}"
            label: "{{ label }}"
    - name: defaultTableSelectExpression
      value: "{{ defaultTableSelectExpression }}"
      description: |
        Default columns selected in search results (this can be customized per search later)
    - name: timestampValueExpression
      value: "{{ timestampValueExpression }}"
      description: |
        DateTime column or expression that is part of your table's primary key.
    - name: serviceNameExpression
      value: "{{ serviceNameExpression }}"
      description: |
        Expression to extract the service name from log rows.
    - name: severityTextExpression
      value: "{{ severityTextExpression }}"
      description: |
        Expression to extract the severity/log level text.
    - name: bodyExpression
      value: "{{ bodyExpression }}"
      description: |
        Expression to extract the log message body.
    - name: eventAttributesExpression
      value: "{{ eventAttributesExpression }}"
      description: |
        Expression to extract event-level attributes.
    - name: resourceAttributesExpression
      value: "{{ resourceAttributesExpression }}"
      description: |
        Expression to extract resource-level attributes.
    - name: displayedTimestampValueExpression
      value: "{{ displayedTimestampValueExpression }}"
      description: |
        This DateTime column is used to display and order search results.
    - name: metricSourceId
      value: "{{ metricSourceId }}"
      description: |
        HyperDX Source for metrics associated with logs. Optional
    - name: traceSourceId
      value: "{{ traceSourceId }}"
      description: |
        HyperDX Source for traces associated with logs. Optional
    - name: traceIdExpression
      value: "{{ traceIdExpression }}"
      description: |
        Expression to extract the trace ID for correlating logs with traces.
    - name: spanIdExpression
      value: "{{ spanIdExpression }}"
      description: |
        Expression to extract the span ID for correlating logs with traces.
    - name: implicitColumnExpression
      value: "{{ implicitColumnExpression }}"
      description: |
        Column used for full text search if no property is specified in a Lucene-based search. Typically the message body of a log.
    - name: knownColumnsListExpression
      value: "{{ knownColumnsListExpression }}"
      description: |
        For Distributed table sources whose target tables have non-matching column sets. A list of columns supported across all target tables, used instead of SELECT * when fetching full row data. Leave blank to select all columns.
    - name: useTextIndexForImplicitColumn
      value: "{{ useTextIndexForImplicitColumn }}"
      description: |
        Controls whether lucene rendering uses ClickHouse text indices via hasAllTokens() against the implicit column. "auto" detects a covering index at query time, "enabled" forces text index usage, "disabled" forces a LIKE/hasToken fallback.
      valid_values: ['auto', 'enabled', 'disabled']
    - name: highlightedTraceAttributeExpressions
      description: |
        Expressions defining trace-level attributes which are displayed in the trace view for the selected trace.
      value:
        - sqlExpression: "{{ sqlExpression }}"
          luceneExpression: "{{ luceneExpression }}"
          alias: "{{ alias }}"
    - name: highlightedRowAttributeExpressions
      description: |
        Expressions defining row-level attributes which are displayed in the row side panel for the selected row.
      value:
        - sqlExpression: "{{ sqlExpression }}"
          luceneExpression: "{{ luceneExpression }}"
          alias: "{{ alias }}"
    - name: materializedViews
      description: |
        Configure materialized views for query optimization. These pre-aggregated views can significantly improve query performance on aggregation queries.
      value:
        - databaseName: "{{ databaseName }}"
          tableName: "{{ tableName }}"
          dimensionColumns: "{{ dimensionColumns }}"
          minGranularity: "{{ minGranularity }}"
          minDate: "{{ minDate }}"
          timestampColumn: "{{ timestampColumn }}"
          aggregatedColumns: "{{ aggregatedColumns }}"
    - name: metadataMaterializedViews
      value:
        keyRollupTable: "{{ keyRollupTable }}"
        kvRollupTable: "{{ kvRollupTable }}"
        granularity: "{{ granularity }}"
    - name: durationExpression
      value: "{{ durationExpression }}"
      description: |
        Expression to extract span duration.
    - name: durationPrecision
      value: {{ durationPrecision }}
      description: |
        Number of decimal digits in the duration value (e.g., 3 for milliseconds, 6 for microseconds, 9 for nanoseconds).
    - name: parentSpanIdExpression
      value: "{{ parentSpanIdExpression }}"
      description: |
        Expression to extract the parent span ID.
    - name: spanNameExpression
      value: "{{ spanNameExpression }}"
      description: |
        Expression to extract the span name.
    - name: spanKindExpression
      value: "{{ spanKindExpression }}"
      description: |
        Expression to extract the span kind (e.g., client, server, internal).
    - name: logSourceId
      value: "{{ logSourceId }}"
      description: |
        HyperDX Source for logs associated with traces. Optional
    - name: sessionSourceId
      value: "{{ sessionSourceId }}"
      description: |
        HyperDX Source for sessions associated with traces. Optional
    - name: statusCodeExpression
      value: "{{ statusCodeExpression }}"
      description: |
        Expression to extract the span status code.
    - name: statusMessageExpression
      value: "{{ statusMessageExpression }}"
      description: |
        Expression to extract the span status message.
    - name: spanEventsValueExpression
      value: "{{ spanEventsValueExpression }}"
      description: |
        Expression to extract span events. Used to capture events associated with spans. Expected to be Nested ( Timestamp DateTime64(9), Name LowCardinality(String), Attributes Map(LowCardinality(String), String)
    - name: metricTables
      value:
        gauge: "{{ gauge }}"
        histogram: "{{ histogram }}"
        sum: "{{ sum }}"
        summary: "{{ summary }}"
        exponential histogram: "{{ exponential histogram }}"
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

**This endpoint is in beta.** API contract is stable, and no breaking changes are expected in the future. &lt;br /&gt;&lt;br /&gt; ClickStack: Updates an existing source. The full source object must be provided; this is a replace, not a patch.  The request body is a source object without the `id` field. If an `id` is sent anyway it is silently ignored (stripped before validation — never a 400); the path parameter alone identifies the source. Granularity fields (`materializedViews&#91;&#93;.minGranularity` and `metadataMaterializedViews.granularity`) accept the same short format the API returns (e.g. `5m`, `15s`, `1h`, `1d`).

```sql
UPDATE clickhouse.clickstack.sources
SET 
id = '{{ id }}',
name = '{{ name }}',
section = '{{ section }}',
disabled = {{ disabled }},
kind = '{{ kind }}',
connection = '{{ connection }}',
from = '{{ from }}',
querySettings = '{{ querySettings }}',
filterSettings = '{{ filterSettings }}',
defaultTableSelectExpression = '{{ defaultTableSelectExpression }}',
timestampValueExpression = '{{ timestampValueExpression }}',
serviceNameExpression = '{{ serviceNameExpression }}',
severityTextExpression = '{{ severityTextExpression }}',
bodyExpression = '{{ bodyExpression }}',
eventAttributesExpression = '{{ eventAttributesExpression }}',
resourceAttributesExpression = '{{ resourceAttributesExpression }}',
displayedTimestampValueExpression = '{{ displayedTimestampValueExpression }}',
metricSourceId = '{{ metricSourceId }}',
traceSourceId = '{{ traceSourceId }}',
traceIdExpression = '{{ traceIdExpression }}',
spanIdExpression = '{{ spanIdExpression }}',
implicitColumnExpression = '{{ implicitColumnExpression }}',
knownColumnsListExpression = '{{ knownColumnsListExpression }}',
useTextIndexForImplicitColumn = '{{ useTextIndexForImplicitColumn }}',
highlightedTraceAttributeExpressions = '{{ highlightedTraceAttributeExpressions }}',
highlightedRowAttributeExpressions = '{{ highlightedRowAttributeExpressions }}',
materializedViews = '{{ materializedViews }}',
metadataMaterializedViews = '{{ metadataMaterializedViews }}',
durationExpression = '{{ durationExpression }}',
durationPrecision = {{ durationPrecision }},
parentSpanIdExpression = '{{ parentSpanIdExpression }}',
spanNameExpression = '{{ spanNameExpression }}',
spanKindExpression = '{{ spanKindExpression }}',
logSourceId = '{{ logSourceId }}',
sessionSourceId = '{{ sessionSourceId }}',
statusCodeExpression = '{{ statusCodeExpression }}',
statusMessageExpression = '{{ statusMessageExpression }}',
spanEventsValueExpression = '{{ spanEventsValueExpression }}',
metricTables = '{{ metricTables }}'
WHERE 
serviceId = '{{ serviceId }}' --required
AND clickStackSourceId = '{{ clickStackSourceId }}' --required
AND organization_id = '{{ organization_id }}' --required unless CLICKHOUSE_ORG_ID is set
AND name = '{{ name }}' --required
AND kind = '{{ kind }}' --required
AND connection = '{{ connection }}' --required
AND from = '{{ from }}' --required
AND defaultTableSelectExpression = '{{ defaultTableSelectExpression }}' --required
AND timestampValueExpression = '{{ timestampValueExpression }}' --required
AND durationExpression = '{{ durationExpression }}' --required
AND durationPrecision = '{{ durationPrecision }}' --required
AND traceIdExpression = '{{ traceIdExpression }}' --required
AND spanIdExpression = '{{ spanIdExpression }}' --required
AND parentSpanIdExpression = '{{ parentSpanIdExpression }}' --required
AND spanNameExpression = '{{ spanNameExpression }}' --required
AND spanKindExpression = '{{ spanKindExpression }}' --required
AND metricTables = '{{ metricTables }}' --required
AND resourceAttributesExpression = '{{ resourceAttributesExpression }}' --required
AND traceSourceId = '{{ traceSourceId }}' --required
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

**This endpoint is in beta.** API contract is stable, and no breaking changes are expected in the future. &lt;br /&gt;&lt;br /&gt; ClickStack: Deletes a source

```sql
DELETE FROM clickhouse.clickstack.sources
WHERE serviceId = '{{ serviceId }}' --required
AND clickStackSourceId = '{{ clickStackSourceId }}' --required
AND organization_id = '{{ organization_id }}' --required unless CLICKHOUSE_ORG_ID is set
;
```
</TabItem>
</Tabs>

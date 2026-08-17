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
    <td><CopyableCode code="log_source_id" /></td>
    <td><code>string</code></td>
    <td>HyperDX Source for logs associated with traces. Optional (example: 507f1f77bcf86cd799439011) (wire: logSourceId)</td>
</tr>
<tr>
    <td><CopyableCode code="metric_source_id" /></td>
    <td><code>string</code></td>
    <td>HyperDX Source for metrics associated with logs. Optional (example: 507f1f77bcf86cd799439013) (wire: metricSourceId)</td>
</tr>
<tr>
    <td><CopyableCode code="session_source_id" /></td>
    <td><code>string</code></td>
    <td>HyperDX Source for sessions associated with traces. Optional (example: 507f1f77bcf86cd799439031) (wire: sessionSourceId)</td>
</tr>
<tr>
    <td><CopyableCode code="trace_source_id" /></td>
    <td><code>string</code></td>
    <td>HyperDX Source for traces associated with logs. Optional (example: 507f1f77bcf86cd799439014) (wire: traceSourceId)</td>
</tr>
<tr>
    <td><CopyableCode code="body_expression" /></td>
    <td><code>string</code></td>
    <td>Expression to extract the log message body. (example: Body) (wire: bodyExpression)</td>
</tr>
<tr>
    <td><CopyableCode code="connection" /></td>
    <td><code>string</code></td>
    <td>ID of the ClickHouse connection used by this source. (example: 507f1f77bcf86cd799439012)</td>
</tr>
<tr>
    <td><CopyableCode code="default_table_select_expression" /></td>
    <td><code>string</code></td>
    <td>Default columns selected in search results (this can be customized per search later) (example: Timestamp, ServiceName, SeverityText, Body) (wire: defaultTableSelectExpression)</td>
</tr>
<tr>
    <td><CopyableCode code="disabled" /></td>
    <td><code>boolean</code></td>
    <td>When true, the source is hidden from source selectors in the UI. Defaults to false.</td>
</tr>
<tr>
    <td><CopyableCode code="displayed_timestamp_value_expression" /></td>
    <td><code>string</code></td>
    <td>This DateTime column is used to display and order search results. (example: TimestampTime) (wire: displayedTimestampValueExpression)</td>
</tr>
<tr>
    <td><CopyableCode code="duration_expression" /></td>
    <td><code>string</code></td>
    <td>Expression to extract span duration. (example: Duration) (wire: durationExpression)</td>
</tr>
<tr>
    <td><CopyableCode code="duration_precision" /></td>
    <td><code>integer</code></td>
    <td>Number of decimal digits in the duration value (e.g., 3 for milliseconds, 6 for microseconds, 9 for nanoseconds). (wire: durationPrecision)</td>
</tr>
<tr>
    <td><CopyableCode code="event_attributes_expression" /></td>
    <td><code>string</code></td>
    <td>Expression to extract event-level attributes. (example: LogAttributes) (wire: eventAttributesExpression)</td>
</tr>
<tr>
    <td><CopyableCode code="filter_settings" /></td>
    <td><code>object</code></td>
    <td> (wire: filterSettings)</td>
</tr>
<tr>
    <td><CopyableCode code="from" /></td>
    <td><code>object</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="highlighted_row_attribute_expressions" /></td>
    <td><code>array</code></td>
    <td>Expressions defining row-level attributes which are displayed in the row side panel for the selected row. (wire: highlightedRowAttributeExpressions)</td>
</tr>
<tr>
    <td><CopyableCode code="highlighted_trace_attribute_expressions" /></td>
    <td><code>array</code></td>
    <td>Expressions defining trace-level attributes which are displayed in the trace view for the selected trace. (wire: highlightedTraceAttributeExpressions)</td>
</tr>
<tr>
    <td><CopyableCode code="implicit_column_expression" /></td>
    <td><code>string</code></td>
    <td>Column used for full text search if no property is specified in a Lucene-based search. Typically the message body of a log. (example: Body) (wire: implicitColumnExpression)</td>
</tr>
<tr>
    <td><CopyableCode code="kind" /></td>
    <td><code>string</code></td>
    <td>Source kind discriminator. Must be "log" for log sources. (log) (example: log)</td>
</tr>
<tr>
    <td><CopyableCode code="known_columns_list_expression" /></td>
    <td><code>string</code></td>
    <td>For Distributed table sources whose target tables have non-matching column sets. A list of columns supported across all target tables, used instead of SELECT * when fetching full row data. Leave blank to select all columns. (example: Timestamp, Body, ServiceName) (wire: knownColumnsListExpression)</td>
</tr>
<tr>
    <td><CopyableCode code="materialized_views" /></td>
    <td><code>array</code></td>
    <td>Configure materialized views for query optimization. These pre-aggregated views can significantly improve query performance on aggregation queries. (wire: materializedViews)</td>
</tr>
<tr>
    <td><CopyableCode code="metadata_materialized_views" /></td>
    <td><code>object</code></td>
    <td> (wire: metadataMaterializedViews)</td>
</tr>
<tr>
    <td><CopyableCode code="metric_tables" /></td>
    <td><code>object</code></td>
    <td> (wire: metricTables)</td>
</tr>
<tr>
    <td><CopyableCode code="parent_span_id_expression" /></td>
    <td><code>string</code></td>
    <td>Expression to extract the parent span ID. (example: ParentSpanId) (wire: parentSpanIdExpression)</td>
</tr>
<tr>
    <td><CopyableCode code="query_settings" /></td>
    <td><code>array</code></td>
    <td>Optional ClickHouse query settings applied when querying this source. (wire: querySettings)</td>
</tr>
<tr>
    <td><CopyableCode code="resource_attributes_expression" /></td>
    <td><code>string</code></td>
    <td>Expression to extract resource-level attributes. (example: ResourceAttributes) (wire: resourceAttributesExpression)</td>
</tr>
<tr>
    <td><CopyableCode code="section" /></td>
    <td><code>string</code></td>
    <td>Optional grouping label used to organize sources in the source selector. Sources that share a section value are displayed together. (example: Billing)</td>
</tr>
<tr>
    <td><CopyableCode code="service_name_expression" /></td>
    <td><code>string</code></td>
    <td>Expression to extract the service name from log rows. (example: ServiceName) (wire: serviceNameExpression)</td>
</tr>
<tr>
    <td><CopyableCode code="severity_text_expression" /></td>
    <td><code>string</code></td>
    <td>Expression to extract the severity/log level text. (example: SeverityText) (wire: severityTextExpression)</td>
</tr>
<tr>
    <td><CopyableCode code="span_events_value_expression" /></td>
    <td><code>string</code></td>
    <td>Expression to extract span events. Used to capture events associated with spans. Expected to be Nested ( Timestamp DateTime64(9), Name LowCardinality(String), Attributes Map(LowCardinality(String), String) (example: Events) (wire: spanEventsValueExpression)</td>
</tr>
<tr>
    <td><CopyableCode code="span_id_expression" /></td>
    <td><code>string</code></td>
    <td>Expression to extract the span ID for correlating logs with traces. (example: SpanId) (wire: spanIdExpression)</td>
</tr>
<tr>
    <td><CopyableCode code="span_kind_expression" /></td>
    <td><code>string</code></td>
    <td>Expression to extract the span kind (e.g., client, server, internal). (example: SpanKind) (wire: spanKindExpression)</td>
</tr>
<tr>
    <td><CopyableCode code="span_name_expression" /></td>
    <td><code>string</code></td>
    <td>Expression to extract the span name. (example: SpanName) (wire: spanNameExpression)</td>
</tr>
<tr>
    <td><CopyableCode code="status_code_expression" /></td>
    <td><code>string</code></td>
    <td>Expression to extract the span status code. (example: StatusCode) (wire: statusCodeExpression)</td>
</tr>
<tr>
    <td><CopyableCode code="status_message_expression" /></td>
    <td><code>string</code></td>
    <td>Expression to extract the span status message. (example: StatusMessage) (wire: statusMessageExpression)</td>
</tr>
<tr>
    <td><CopyableCode code="timestamp_value_expression" /></td>
    <td><code>string</code></td>
    <td>DateTime column or expression that is part of your table's primary key. (example: Timestamp) (wire: timestampValueExpression)</td>
</tr>
<tr>
    <td><CopyableCode code="trace_id_expression" /></td>
    <td><code>string</code></td>
    <td>Expression to extract the trace ID for correlating logs with traces. (example: TraceId) (wire: traceIdExpression)</td>
</tr>
<tr>
    <td><CopyableCode code="use_text_index_for_implicit_column" /></td>
    <td><code>string</code></td>
    <td>Controls whether lucene rendering uses ClickHouse text indices via hasAllTokens() against the implicit column. "auto" detects a covering index at query time, "enabled" forces text index usage, "disabled" forces a LIKE/hasToken fallback. (auto, enabled, disabled) (example: auto) (wire: useTextIndexForImplicitColumn)</td>
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
    <td><CopyableCode code="log_source_id" /></td>
    <td><code>string</code></td>
    <td>HyperDX Source for logs associated with traces. Optional (example: 507f1f77bcf86cd799439011) (wire: logSourceId)</td>
</tr>
<tr>
    <td><CopyableCode code="metric_source_id" /></td>
    <td><code>string</code></td>
    <td>HyperDX Source for metrics associated with logs. Optional (example: 507f1f77bcf86cd799439013) (wire: metricSourceId)</td>
</tr>
<tr>
    <td><CopyableCode code="session_source_id" /></td>
    <td><code>string</code></td>
    <td>HyperDX Source for sessions associated with traces. Optional (example: 507f1f77bcf86cd799439031) (wire: sessionSourceId)</td>
</tr>
<tr>
    <td><CopyableCode code="trace_source_id" /></td>
    <td><code>string</code></td>
    <td>HyperDX Source for traces associated with logs. Optional (example: 507f1f77bcf86cd799439014) (wire: traceSourceId)</td>
</tr>
<tr>
    <td><CopyableCode code="body_expression" /></td>
    <td><code>string</code></td>
    <td>Expression to extract the log message body. (example: Body) (wire: bodyExpression)</td>
</tr>
<tr>
    <td><CopyableCode code="connection" /></td>
    <td><code>string</code></td>
    <td>ID of the ClickHouse connection used by this source. (example: 507f1f77bcf86cd799439012)</td>
</tr>
<tr>
    <td><CopyableCode code="default_table_select_expression" /></td>
    <td><code>string</code></td>
    <td>Default columns selected in search results (this can be customized per search later) (example: Timestamp, ServiceName, SeverityText, Body) (wire: defaultTableSelectExpression)</td>
</tr>
<tr>
    <td><CopyableCode code="disabled" /></td>
    <td><code>boolean</code></td>
    <td>When true, the source is hidden from source selectors in the UI. Defaults to false.</td>
</tr>
<tr>
    <td><CopyableCode code="displayed_timestamp_value_expression" /></td>
    <td><code>string</code></td>
    <td>This DateTime column is used to display and order search results. (example: TimestampTime) (wire: displayedTimestampValueExpression)</td>
</tr>
<tr>
    <td><CopyableCode code="duration_expression" /></td>
    <td><code>string</code></td>
    <td>Expression to extract span duration. (example: Duration) (wire: durationExpression)</td>
</tr>
<tr>
    <td><CopyableCode code="duration_precision" /></td>
    <td><code>integer</code></td>
    <td>Number of decimal digits in the duration value (e.g., 3 for milliseconds, 6 for microseconds, 9 for nanoseconds). (wire: durationPrecision)</td>
</tr>
<tr>
    <td><CopyableCode code="event_attributes_expression" /></td>
    <td><code>string</code></td>
    <td>Expression to extract event-level attributes. (example: LogAttributes) (wire: eventAttributesExpression)</td>
</tr>
<tr>
    <td><CopyableCode code="filter_settings" /></td>
    <td><code>object</code></td>
    <td> (wire: filterSettings)</td>
</tr>
<tr>
    <td><CopyableCode code="from" /></td>
    <td><code>object</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="highlighted_row_attribute_expressions" /></td>
    <td><code>array</code></td>
    <td>Expressions defining row-level attributes which are displayed in the row side panel for the selected row. (wire: highlightedRowAttributeExpressions)</td>
</tr>
<tr>
    <td><CopyableCode code="highlighted_trace_attribute_expressions" /></td>
    <td><code>array</code></td>
    <td>Expressions defining trace-level attributes which are displayed in the trace view for the selected trace. (wire: highlightedTraceAttributeExpressions)</td>
</tr>
<tr>
    <td><CopyableCode code="implicit_column_expression" /></td>
    <td><code>string</code></td>
    <td>Column used for full text search if no property is specified in a Lucene-based search. Typically the message body of a log. (example: Body) (wire: implicitColumnExpression)</td>
</tr>
<tr>
    <td><CopyableCode code="kind" /></td>
    <td><code>string</code></td>
    <td>Source kind discriminator. Must be "log" for log sources. (log) (example: log)</td>
</tr>
<tr>
    <td><CopyableCode code="known_columns_list_expression" /></td>
    <td><code>string</code></td>
    <td>For Distributed table sources whose target tables have non-matching column sets. A list of columns supported across all target tables, used instead of SELECT * when fetching full row data. Leave blank to select all columns. (example: Timestamp, Body, ServiceName) (wire: knownColumnsListExpression)</td>
</tr>
<tr>
    <td><CopyableCode code="materialized_views" /></td>
    <td><code>array</code></td>
    <td>Configure materialized views for query optimization. These pre-aggregated views can significantly improve query performance on aggregation queries. (wire: materializedViews)</td>
</tr>
<tr>
    <td><CopyableCode code="metadata_materialized_views" /></td>
    <td><code>object</code></td>
    <td> (wire: metadataMaterializedViews)</td>
</tr>
<tr>
    <td><CopyableCode code="metric_tables" /></td>
    <td><code>object</code></td>
    <td> (wire: metricTables)</td>
</tr>
<tr>
    <td><CopyableCode code="parent_span_id_expression" /></td>
    <td><code>string</code></td>
    <td>Expression to extract the parent span ID. (example: ParentSpanId) (wire: parentSpanIdExpression)</td>
</tr>
<tr>
    <td><CopyableCode code="query_settings" /></td>
    <td><code>array</code></td>
    <td>Optional ClickHouse query settings applied when querying this source. (wire: querySettings)</td>
</tr>
<tr>
    <td><CopyableCode code="resource_attributes_expression" /></td>
    <td><code>string</code></td>
    <td>Expression to extract resource-level attributes. (example: ResourceAttributes) (wire: resourceAttributesExpression)</td>
</tr>
<tr>
    <td><CopyableCode code="section" /></td>
    <td><code>string</code></td>
    <td>Optional grouping label used to organize sources in the source selector. Sources that share a section value are displayed together. (example: Billing)</td>
</tr>
<tr>
    <td><CopyableCode code="service_name_expression" /></td>
    <td><code>string</code></td>
    <td>Expression to extract the service name from log rows. (example: ServiceName) (wire: serviceNameExpression)</td>
</tr>
<tr>
    <td><CopyableCode code="severity_text_expression" /></td>
    <td><code>string</code></td>
    <td>Expression to extract the severity/log level text. (example: SeverityText) (wire: severityTextExpression)</td>
</tr>
<tr>
    <td><CopyableCode code="span_events_value_expression" /></td>
    <td><code>string</code></td>
    <td>Expression to extract span events. Used to capture events associated with spans. Expected to be Nested ( Timestamp DateTime64(9), Name LowCardinality(String), Attributes Map(LowCardinality(String), String) (example: Events) (wire: spanEventsValueExpression)</td>
</tr>
<tr>
    <td><CopyableCode code="span_id_expression" /></td>
    <td><code>string</code></td>
    <td>Expression to extract the span ID for correlating logs with traces. (example: SpanId) (wire: spanIdExpression)</td>
</tr>
<tr>
    <td><CopyableCode code="span_kind_expression" /></td>
    <td><code>string</code></td>
    <td>Expression to extract the span kind (e.g., client, server, internal). (example: SpanKind) (wire: spanKindExpression)</td>
</tr>
<tr>
    <td><CopyableCode code="span_name_expression" /></td>
    <td><code>string</code></td>
    <td>Expression to extract the span name. (example: SpanName) (wire: spanNameExpression)</td>
</tr>
<tr>
    <td><CopyableCode code="status_code_expression" /></td>
    <td><code>string</code></td>
    <td>Expression to extract the span status code. (example: StatusCode) (wire: statusCodeExpression)</td>
</tr>
<tr>
    <td><CopyableCode code="status_message_expression" /></td>
    <td><code>string</code></td>
    <td>Expression to extract the span status message. (example: StatusMessage) (wire: statusMessageExpression)</td>
</tr>
<tr>
    <td><CopyableCode code="timestamp_value_expression" /></td>
    <td><code>string</code></td>
    <td>DateTime column or expression that is part of your table's primary key. (example: Timestamp) (wire: timestampValueExpression)</td>
</tr>
<tr>
    <td><CopyableCode code="trace_id_expression" /></td>
    <td><code>string</code></td>
    <td>Expression to extract the trace ID for correlating logs with traces. (example: TraceId) (wire: traceIdExpression)</td>
</tr>
<tr>
    <td><CopyableCode code="use_text_index_for_implicit_column" /></td>
    <td><code>string</code></td>
    <td>Controls whether lucene rendering uses ClickHouse text indices via hasAllTokens() against the implicit column. "auto" detects a covering index at query time, "enabled" forces text index usage, "disabled" forces a LIKE/hasToken fallback. (auto, enabled, disabled) (example: auto) (wire: useTextIndexForImplicitColumn)</td>
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
    <td><a href="#parameter-service_id"><code>service_id</code></a>, <a href="#parameter-click_stack_source_id"><code>click_stack_source_id</code></a>, <a href="#parameter-organization_id"><code>organization_id</code></a></td>
    <td></td>
    <td>**This endpoint is in beta.** API contract is stable, and no breaking changes are expected in the future. &lt;br /&gt;&lt;br /&gt; ClickStack: Retrieves a specific source by ID</td>
</tr>
<tr>
    <td><a href="#list"><CopyableCode code="list" /></a></td>
    <td><CopyableCode code="select" /></td>
    <td><a href="#parameter-service_id"><code>service_id</code></a>, <a href="#parameter-organization_id"><code>organization_id</code></a></td>
    <td></td>
    <td>**This endpoint is in beta.** API contract is stable, and no breaking changes are expected in the future. &lt;br /&gt;&lt;br /&gt; ClickStack: Retrieves a list of all sources for the authenticated team</td>
</tr>
<tr>
    <td><a href="#create"><CopyableCode code="create" /></a></td>
    <td><CopyableCode code="insert" /></td>
    <td><a href="#parameter-service_id"><code>service_id</code></a>, <a href="#parameter-organization_id"><code>organization_id</code></a>, <a href="#parameter-name"><code>name</code></a>, <a href="#parameter-kind"><code>kind</code></a>, <a href="#parameter-connection"><code>connection</code></a>, <a href="#parameter-from"><code>from</code></a>, <a href="#parameter-default_table_select_expression"><code>default_table_select_expression</code></a>, <a href="#parameter-timestamp_value_expression"><code>timestamp_value_expression</code></a>, <a href="#parameter-duration_expression"><code>duration_expression</code></a>, <a href="#parameter-duration_precision"><code>duration_precision</code></a>, <a href="#parameter-trace_id_expression"><code>trace_id_expression</code></a>, <a href="#parameter-span_id_expression"><code>span_id_expression</code></a>, <a href="#parameter-parent_span_id_expression"><code>parent_span_id_expression</code></a>, <a href="#parameter-span_name_expression"><code>span_name_expression</code></a>, <a href="#parameter-span_kind_expression"><code>span_kind_expression</code></a>, <a href="#parameter-metric_tables"><code>metric_tables</code></a>, <a href="#parameter-resource_attributes_expression"><code>resource_attributes_expression</code></a>, <a href="#parameter-trace_source_id"><code>trace_source_id</code></a></td>
    <td></td>
    <td>**This endpoint is in beta.** API contract is stable, and no breaking changes are expected in the future. &lt;br /&gt;&lt;br /&gt; ClickStack: Creates a new source.  The request body is a source object without the `id` field. If an `id` is sent anyway it is silently ignored (stripped before validation — the request is never rejected because of it). Granularity fields (`materializedViews&#91;&#93;.minGranularity` and `metadataMaterializedViews.granularity`) accept the same short format the API returns (e.g. `5m`, `15s`, `1h`, `1d`).</td>
</tr>
<tr>
    <td><a href="#update"><CopyableCode code="update" /></a></td>
    <td><CopyableCode code="update" /></td>
    <td><a href="#parameter-service_id"><code>service_id</code></a>, <a href="#parameter-click_stack_source_id"><code>click_stack_source_id</code></a>, <a href="#parameter-organization_id"><code>organization_id</code></a>, <a href="#parameter-name"><code>name</code></a>, <a href="#parameter-kind"><code>kind</code></a>, <a href="#parameter-connection"><code>connection</code></a>, <a href="#parameter-from"><code>from</code></a>, <a href="#parameter-default_table_select_expression"><code>default_table_select_expression</code></a>, <a href="#parameter-timestamp_value_expression"><code>timestamp_value_expression</code></a>, <a href="#parameter-duration_expression"><code>duration_expression</code></a>, <a href="#parameter-duration_precision"><code>duration_precision</code></a>, <a href="#parameter-trace_id_expression"><code>trace_id_expression</code></a>, <a href="#parameter-span_id_expression"><code>span_id_expression</code></a>, <a href="#parameter-parent_span_id_expression"><code>parent_span_id_expression</code></a>, <a href="#parameter-span_name_expression"><code>span_name_expression</code></a>, <a href="#parameter-span_kind_expression"><code>span_kind_expression</code></a>, <a href="#parameter-metric_tables"><code>metric_tables</code></a>, <a href="#parameter-resource_attributes_expression"><code>resource_attributes_expression</code></a>, <a href="#parameter-trace_source_id"><code>trace_source_id</code></a></td>
    <td></td>
    <td>**This endpoint is in beta.** API contract is stable, and no breaking changes are expected in the future. &lt;br /&gt;&lt;br /&gt; ClickStack: Updates an existing source. The full source object must be provided; this is a replace, not a patch.  The request body is a source object without the `id` field. If an `id` is sent anyway it is silently ignored (stripped before validation — never a 400); the path parameter alone identifies the source. Granularity fields (`materializedViews&#91;&#93;.minGranularity` and `metadataMaterializedViews.granularity`) accept the same short format the API returns (e.g. `5m`, `15s`, `1h`, `1d`).</td>
</tr>
<tr>
    <td><a href="#delete"><CopyableCode code="delete" /></a></td>
    <td><CopyableCode code="delete" /></td>
    <td><a href="#parameter-service_id"><code>service_id</code></a>, <a href="#parameter-click_stack_source_id"><code>click_stack_source_id</code></a>, <a href="#parameter-organization_id"><code>organization_id</code></a></td>
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
<tr id="parameter-click_stack_source_id">
    <td><CopyableCode code="click_stack_source_id" /></td>
    <td><code>string</code></td>
    <td>Source ID (wire: clickStackSourceId)</td>
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
log_source_id,
metric_source_id,
session_source_id,
trace_source_id,
body_expression,
connection,
default_table_select_expression,
disabled,
displayed_timestamp_value_expression,
duration_expression,
duration_precision,
event_attributes_expression,
filter_settings,
from,
highlighted_row_attribute_expressions,
highlighted_trace_attribute_expressions,
implicit_column_expression,
kind,
known_columns_list_expression,
materialized_views,
metadata_materialized_views,
metric_tables,
parent_span_id_expression,
query_settings,
resource_attributes_expression,
section,
service_name_expression,
severity_text_expression,
span_events_value_expression,
span_id_expression,
span_kind_expression,
span_name_expression,
status_code_expression,
status_message_expression,
timestamp_value_expression,
trace_id_expression,
use_text_index_for_implicit_column
FROM clickhouse.clickstack.sources
WHERE service_id = '{{ service_id }}' -- required
AND click_stack_source_id = '{{ click_stack_source_id }}' -- required
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
log_source_id,
metric_source_id,
session_source_id,
trace_source_id,
body_expression,
connection,
default_table_select_expression,
disabled,
displayed_timestamp_value_expression,
duration_expression,
duration_precision,
event_attributes_expression,
filter_settings,
from,
highlighted_row_attribute_expressions,
highlighted_trace_attribute_expressions,
implicit_column_expression,
kind,
known_columns_list_expression,
materialized_views,
metadata_materialized_views,
metric_tables,
parent_span_id_expression,
query_settings,
resource_attributes_expression,
section,
service_name_expression,
severity_text_expression,
span_events_value_expression,
span_id_expression,
span_kind_expression,
span_name_expression,
status_code_expression,
status_message_expression,
timestamp_value_expression,
trace_id_expression,
use_text_index_for_implicit_column
FROM clickhouse.clickstack.sources
WHERE service_id = '{{ service_id }}' -- required
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
query_settings,
filter_settings,
default_table_select_expression,
timestamp_value_expression,
service_name_expression,
severity_text_expression,
body_expression,
event_attributes_expression,
resource_attributes_expression,
displayed_timestamp_value_expression,
metric_source_id,
trace_source_id,
trace_id_expression,
span_id_expression,
implicit_column_expression,
known_columns_list_expression,
use_text_index_for_implicit_column,
highlighted_trace_attribute_expressions,
highlighted_row_attribute_expressions,
materialized_views,
metadata_materialized_views,
duration_expression,
duration_precision,
parent_span_id_expression,
span_name_expression,
span_kind_expression,
log_source_id,
session_source_id,
status_code_expression,
status_message_expression,
span_events_value_expression,
metric_tables,
service_id,
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
'{{ query_settings }}',
'{{ filter_settings }}',
'{{ default_table_select_expression }}' /* required */,
'{{ timestamp_value_expression }}' /* required */,
'{{ service_name_expression }}',
'{{ severity_text_expression }}',
'{{ body_expression }}',
'{{ event_attributes_expression }}',
'{{ resource_attributes_expression }}' /* required */,
'{{ displayed_timestamp_value_expression }}',
'{{ metric_source_id }}',
'{{ trace_source_id }}' /* required */,
'{{ trace_id_expression }}' /* required */,
'{{ span_id_expression }}' /* required */,
'{{ implicit_column_expression }}',
'{{ known_columns_list_expression }}',
'{{ use_text_index_for_implicit_column }}',
'{{ highlighted_trace_attribute_expressions }}',
'{{ highlighted_row_attribute_expressions }}',
'{{ materialized_views }}',
'{{ metadata_materialized_views }}',
'{{ duration_expression }}' /* required */,
{{ duration_precision }} /* required */,
'{{ parent_span_id_expression }}' /* required */,
'{{ span_name_expression }}' /* required */,
'{{ span_kind_expression }}' /* required */,
'{{ log_source_id }}',
'{{ session_source_id }}',
'{{ status_code_expression }}',
'{{ status_message_expression }}',
'{{ span_events_value_expression }}',
'{{ metric_tables }}' /* required */,
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
- name: sources
  props:
    - name: service_id
      value: "{{ service_id }}"
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
    - name: query_settings
      description: |
        Optional ClickHouse query settings applied when querying this source.
      value:
        - setting: "{{ setting }}"
          value: "{{ value }}"
    - name: filter_settings
      value:
        databaseName: "{{ databaseName }}"
        tableName: "{{ tableName }}"
        columns:
          - name: "{{ name }}"
            label: "{{ label }}"
    - name: default_table_select_expression
      value: "{{ default_table_select_expression }}"
      description: |
        Default columns selected in search results (this can be customized per search later)
    - name: timestamp_value_expression
      value: "{{ timestamp_value_expression }}"
      description: |
        DateTime column or expression that is part of your table's primary key.
    - name: service_name_expression
      value: "{{ service_name_expression }}"
      description: |
        Expression to extract the service name from log rows.
    - name: severity_text_expression
      value: "{{ severity_text_expression }}"
      description: |
        Expression to extract the severity/log level text.
    - name: body_expression
      value: "{{ body_expression }}"
      description: |
        Expression to extract the log message body.
    - name: event_attributes_expression
      value: "{{ event_attributes_expression }}"
      description: |
        Expression to extract event-level attributes.
    - name: resource_attributes_expression
      value: "{{ resource_attributes_expression }}"
      description: |
        Expression to extract resource-level attributes.
    - name: displayed_timestamp_value_expression
      value: "{{ displayed_timestamp_value_expression }}"
      description: |
        This DateTime column is used to display and order search results.
    - name: metric_source_id
      value: "{{ metric_source_id }}"
      description: |
        HyperDX Source for metrics associated with logs. Optional
    - name: trace_source_id
      value: "{{ trace_source_id }}"
      description: |
        HyperDX Source for traces associated with logs. Optional
    - name: trace_id_expression
      value: "{{ trace_id_expression }}"
      description: |
        Expression to extract the trace ID for correlating logs with traces.
    - name: span_id_expression
      value: "{{ span_id_expression }}"
      description: |
        Expression to extract the span ID for correlating logs with traces.
    - name: implicit_column_expression
      value: "{{ implicit_column_expression }}"
      description: |
        Column used for full text search if no property is specified in a Lucene-based search. Typically the message body of a log.
    - name: known_columns_list_expression
      value: "{{ known_columns_list_expression }}"
      description: |
        For Distributed table sources whose target tables have non-matching column sets. A list of columns supported across all target tables, used instead of SELECT * when fetching full row data. Leave blank to select all columns.
    - name: use_text_index_for_implicit_column
      value: "{{ use_text_index_for_implicit_column }}"
      description: |
        Controls whether lucene rendering uses ClickHouse text indices via hasAllTokens() against the implicit column. "auto" detects a covering index at query time, "enabled" forces text index usage, "disabled" forces a LIKE/hasToken fallback.
      valid_values: ['auto', 'enabled', 'disabled']
    - name: highlighted_trace_attribute_expressions
      description: |
        Expressions defining trace-level attributes which are displayed in the trace view for the selected trace.
      value:
        - sqlExpression: "{{ sqlExpression }}"
          luceneExpression: "{{ luceneExpression }}"
          alias: "{{ alias }}"
    - name: highlighted_row_attribute_expressions
      description: |
        Expressions defining row-level attributes which are displayed in the row side panel for the selected row.
      value:
        - sqlExpression: "{{ sqlExpression }}"
          luceneExpression: "{{ luceneExpression }}"
          alias: "{{ alias }}"
    - name: materialized_views
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
    - name: metadata_materialized_views
      value:
        keyRollupTable: "{{ keyRollupTable }}"
        kvRollupTable: "{{ kvRollupTable }}"
        granularity: "{{ granularity }}"
    - name: duration_expression
      value: "{{ duration_expression }}"
      description: |
        Expression to extract span duration.
    - name: duration_precision
      value: {{ duration_precision }}
      description: |
        Number of decimal digits in the duration value (e.g., 3 for milliseconds, 6 for microseconds, 9 for nanoseconds).
    - name: parent_span_id_expression
      value: "{{ parent_span_id_expression }}"
      description: |
        Expression to extract the parent span ID.
    - name: span_name_expression
      value: "{{ span_name_expression }}"
      description: |
        Expression to extract the span name.
    - name: span_kind_expression
      value: "{{ span_kind_expression }}"
      description: |
        Expression to extract the span kind (e.g., client, server, internal).
    - name: log_source_id
      value: "{{ log_source_id }}"
      description: |
        HyperDX Source for logs associated with traces. Optional
    - name: session_source_id
      value: "{{ session_source_id }}"
      description: |
        HyperDX Source for sessions associated with traces. Optional
    - name: status_code_expression
      value: "{{ status_code_expression }}"
      description: |
        Expression to extract the span status code.
    - name: status_message_expression
      value: "{{ status_message_expression }}"
      description: |
        Expression to extract the span status message.
    - name: span_events_value_expression
      value: "{{ span_events_value_expression }}"
      description: |
        Expression to extract span events. Used to capture events associated with spans. Expected to be Nested ( Timestamp DateTime64(9), Name LowCardinality(String), Attributes Map(LowCardinality(String), String)
    - name: metric_tables
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
query_settings = '{{ query_settings }}',
filter_settings = '{{ filter_settings }}',
default_table_select_expression = '{{ default_table_select_expression }}',
timestamp_value_expression = '{{ timestamp_value_expression }}',
service_name_expression = '{{ service_name_expression }}',
severity_text_expression = '{{ severity_text_expression }}',
body_expression = '{{ body_expression }}',
event_attributes_expression = '{{ event_attributes_expression }}',
resource_attributes_expression = '{{ resource_attributes_expression }}',
displayed_timestamp_value_expression = '{{ displayed_timestamp_value_expression }}',
metric_source_id = '{{ metric_source_id }}',
trace_source_id = '{{ trace_source_id }}',
trace_id_expression = '{{ trace_id_expression }}',
span_id_expression = '{{ span_id_expression }}',
implicit_column_expression = '{{ implicit_column_expression }}',
known_columns_list_expression = '{{ known_columns_list_expression }}',
use_text_index_for_implicit_column = '{{ use_text_index_for_implicit_column }}',
highlighted_trace_attribute_expressions = '{{ highlighted_trace_attribute_expressions }}',
highlighted_row_attribute_expressions = '{{ highlighted_row_attribute_expressions }}',
materialized_views = '{{ materialized_views }}',
metadata_materialized_views = '{{ metadata_materialized_views }}',
duration_expression = '{{ duration_expression }}',
duration_precision = {{ duration_precision }},
parent_span_id_expression = '{{ parent_span_id_expression }}',
span_name_expression = '{{ span_name_expression }}',
span_kind_expression = '{{ span_kind_expression }}',
log_source_id = '{{ log_source_id }}',
session_source_id = '{{ session_source_id }}',
status_code_expression = '{{ status_code_expression }}',
status_message_expression = '{{ status_message_expression }}',
span_events_value_expression = '{{ span_events_value_expression }}',
metric_tables = '{{ metric_tables }}'
WHERE 
service_id = '{{ service_id }}' --required
AND click_stack_source_id = '{{ click_stack_source_id }}' --required
AND organization_id = '{{ organization_id }}' --required unless CLICKHOUSE_ORG_ID is set
AND name = '{{ name }}' --required
AND kind = '{{ kind }}' --required
AND connection = '{{ connection }}' --required
AND from = '{{ from }}' --required
AND default_table_select_expression = '{{ default_table_select_expression }}' --required
AND timestamp_value_expression = '{{ timestamp_value_expression }}' --required
AND duration_expression = '{{ duration_expression }}' --required
AND duration_precision = '{{ duration_precision }}' --required
AND trace_id_expression = '{{ trace_id_expression }}' --required
AND span_id_expression = '{{ span_id_expression }}' --required
AND parent_span_id_expression = '{{ parent_span_id_expression }}' --required
AND span_name_expression = '{{ span_name_expression }}' --required
AND span_kind_expression = '{{ span_kind_expression }}' --required
AND metric_tables = '{{ metric_tables }}' --required
AND resource_attributes_expression = '{{ resource_attributes_expression }}' --required
AND trace_source_id = '{{ trace_source_id }}' --required
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

**This endpoint is in beta.** API contract is stable, and no breaking changes are expected in the future. &lt;br /&gt;&lt;br /&gt; ClickStack: Deletes a source

```sql
DELETE FROM clickhouse.clickstack.sources
WHERE service_id = '{{ service_id }}' --required
AND click_stack_source_id = '{{ click_stack_source_id }}' --required
AND organization_id = '{{ organization_id }}' --required unless CLICKHOUSE_ORG_ID is set
;
```
</TabItem>
</Tabs>

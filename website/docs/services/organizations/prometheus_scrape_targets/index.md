--- 
title: prometheus_scrape_targets
hide_title: false
hide_table_of_contents: false
keywords:
  - prometheus_scrape_targets
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

Creates, updates, deletes, gets or lists a <code>prometheus_scrape_targets</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="prometheus_scrape_targets" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="clickhouse.organizations.prometheus_scrape_targets" /></td></tr>
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
    <td><CopyableCode code="labels" /></td>
    <td><code>object</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="targets" /></td>
    <td><code>array</code></td>
    <td>Host (and port) of the ClickHouse Cloud API.</td>
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
    <td><a href="#parameter-organizationId"><code>organizationId</code></a></td>
    <td><a href="#parameter-filtered_metrics"><code>filtered_metrics</code></a></td>
    <td>**Disclaimer:** This beta endpoint is evolving; the API contract may change. &lt;br /&gt;&lt;br /&gt; Returns one Prometheus scrape target per service in the organization that the caller is authorized to view, in HTTP service discovery (http_sd) format. Services the caller lacks view access to, and services in a terminated, terminating, or (soft-)deleted state, are omitted — the response can have fewer groups than the organization has services. Point a Prometheus http_sd_configs job at this endpoint to discover and scrape all services automatically; targets are refreshed on every discovery poll, so created and deleted services are picked up without reconfiguration. Targets scrape with filtered_metrics=true by default; pass ?filtered_metrics=false to this endpoint to discover unfiltered targets.&lt;br /&gt;&lt;br /&gt;Sample Prometheus scrape config:&lt;br /&gt;&lt;br /&gt;```yaml&lt;br /&gt;scrape_configs:&lt;br /&gt;  - job_name: clickhouse-cloud&lt;br /&gt;    http_sd_configs:&lt;br /&gt;      - url: https:​//api.clickhouse.cloud/v1/organizations/&lt;organizationId&gt;/prometheus/discovery&lt;br /&gt;        refresh_interval: 60s&lt;br /&gt;        basic_auth:&lt;br /&gt;          username: &lt;key-id&gt;&lt;br /&gt;          password: &lt;key-secret&gt;&lt;br /&gt;    basic_auth:&lt;br /&gt;      username: &lt;key-id&gt;&lt;br /&gt;      password: &lt;key-secret&gt;&lt;br /&gt;```&lt;br /&gt;&lt;br /&gt;The `basic_auth` block must be set both under `http_sd_configs` (used to authenticate discovery polls against this endpoint) and on the scrape job itself (used to authenticate the actual per-service scrapes) — omitting either one is the most common misconfiguration.</td>
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
<tr id="parameter-filtered_metrics">
    <td><CopyableCode code="filtered_metrics" /></td>
    <td><code>string (boolean)</code></td>
    <td>Whether discovered targets carry filtered_metrics=true or =false as a scrape param. Accepts true or false; defaults to true — the opposite default from the per-service prometheus endpoint. (example: true)</td>
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

**Disclaimer:** This beta endpoint is evolving; the API contract may change. &lt;br /&gt;&lt;br /&gt; Returns one Prometheus scrape target per service in the organization that the caller is authorized to view, in HTTP service discovery (http_sd) format. Services the caller lacks view access to, and services in a terminated, terminating, or (soft-)deleted state, are omitted — the response can have fewer groups than the organization has services. Point a Prometheus http_sd_configs job at this endpoint to discover and scrape all services automatically; targets are refreshed on every discovery poll, so created and deleted services are picked up without reconfiguration. Targets scrape with filtered_metrics=true by default; pass ?filtered_metrics=false to this endpoint to discover unfiltered targets.&lt;br /&gt;&lt;br /&gt;Sample Prometheus scrape config:&lt;br /&gt;&lt;br /&gt;```yaml&lt;br /&gt;scrape_configs:&lt;br /&gt;  - job_name: clickhouse-cloud&lt;br /&gt;    http_sd_configs:&lt;br /&gt;      - url: https:​//api.clickhouse.cloud/v1/organizations/&lt;organizationId&gt;/prometheus/discovery&lt;br /&gt;        refresh_interval: 60s&lt;br /&gt;        basic_auth:&lt;br /&gt;          username: &lt;key-id&gt;&lt;br /&gt;          password: &lt;key-secret&gt;&lt;br /&gt;    basic_auth:&lt;br /&gt;      username: &lt;key-id&gt;&lt;br /&gt;      password: &lt;key-secret&gt;&lt;br /&gt;```&lt;br /&gt;&lt;br /&gt;The `basic_auth` block must be set both under `http_sd_configs` (used to authenticate discovery polls against this endpoint) and on the scrape job itself (used to authenticate the actual per-service scrapes) — omitting either one is the most common misconfiguration.

```sql
SELECT
labels,
targets
FROM clickhouse.organizations.prometheus_scrape_targets
WHERE organizationId = '{{ organizationId }}' -- required unless CLICKHOUSE_ORG_ID is set
AND filtered_metrics = '{{ filtered_metrics }}'
;
```
</TabItem>
</Tabs>

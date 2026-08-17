--- 
title: services
hide_title: false
hide_table_of_contents: false
keywords:
  - services
  - postgres
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

Creates, updates, deletes, gets or lists a <code>services</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="services" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="clickhouse.postgres.services" /></td></tr>
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
    <td><code>string (uuid)</code></td>
    <td> (title: Unique Postgres service ID, example: f71df78e-ddad-82d0-8dfa-abbec741b82e)</td>
</tr>
<tr>
    <td><CopyableCode code="name" /></td>
    <td><code>string</code></td>
    <td>Name of the Postgres service. Alphanumerical string with whitespaces up to 50 characters. (title: Postgres Service Name)</td>
</tr>
<tr>
    <td><CopyableCode code="connectionString" /></td>
    <td><code>string</code></td>
    <td>Connection string to the Postgres service. Embeds the service password, so it is only returned when the service is created or its password is reset. Omitted from every other response when Postgres credential redaction is enabled for the organization. Not guaranteed to be present — treat as optional.</td>
</tr>
<tr>
    <td><CopyableCode code="createdAt" /></td>
    <td><code>string (date-time)</code></td>
    <td> (title: Postgres Service creation timestamp, example: 2026-03-26T20:51:16.384Z)</td>
</tr>
<tr>
    <td><CopyableCode code="haType" /></td>
    <td><code>string</code></td>
    <td>Type of high availability: “none” for no replication, “async” for asynchronous replication to a single standby, and “sync” for synchronous replication to two standbys. (none, async, sync)</td>
</tr>
<tr>
    <td><CopyableCode code="hostname" /></td>
    <td><code>string</code></td>
    <td>Hostname for the Postgres service</td>
</tr>
<tr>
    <td><CopyableCode code="isPrimary" /></td>
    <td><code>boolean</code></td>
    <td>True if this service is the primary service in the data warehouse (title: Postgres Service is Primary)</td>
</tr>
<tr>
    <td><CopyableCode code="password" /></td>
    <td><code>string</code></td>
    <td>Password for the Postgres service. Only returned when the service is created or its password is reset. Omitted from every other response when Postgres credential redaction is enabled for the organization. Not guaranteed to be present — treat as optional.</td>
</tr>
<tr>
    <td><CopyableCode code="postgresVersion" /></td>
    <td><code>string</code></td>
    <td> (18, 17) (title: Postgres major version)</td>
</tr>
<tr>
    <td><CopyableCode code="provider" /></td>
    <td><code>string</code></td>
    <td>The cloud provider for a Postgres service. (aws) (title: Cloud provider)</td>
</tr>
<tr>
    <td><CopyableCode code="region" /></td>
    <td><code>string</code></td>
    <td>The cloud region for a Postgres service. (title: Service region)</td>
</tr>
<tr>
    <td><CopyableCode code="size" /></td>
    <td><code>string</code></td>
    <td>The VM size for a Postgres service. (c6gd.large, c6gd.xlarge, c6gd.2xlarge, c6gd.4xlarge, c6gd.8xlarge, c6gd.16xlarge, i7i.large, i7i.xlarge, i7i.2xlarge, i7i.4xlarge, i7i.8xlarge, i7i.12xlarge, i7i.16xlarge, i7i.24xlarge, i7ie.large, i7ie.xlarge, i7ie.2xlarge, i7ie.3xlarge, i7ie.6xlarge, i7ie.12xlarge, i7ie.18xlarge, i7ie.24xlarge, i8g.large, i8g.xlarge, i8g.2xlarge, i8g.4xlarge, i8g.8xlarge, i8g.16xlarge, i8g.24xlarge, i8ge.large, i8ge.xlarge, i8ge.2xlarge, i8ge.3xlarge, i8ge.6xlarge, i8ge.12xlarge, i8ge.18xlarge, i8ge.24xlarge, m6gd.large, m6gd.xlarge, m6gd.2xlarge, m6gd.4xlarge, m6gd.8xlarge, m6gd.16xlarge, m6id.large, m6id.xlarge, m6id.2xlarge, m6id.4xlarge, m6id.8xlarge, m6id.16xlarge, m8gd.large, m8gd.xlarge, m8gd.2xlarge, m8gd.4xlarge, m8gd.8xlarge, m8gd.16xlarge, r6gd.medium, r6gd.large, r6gd.xlarge, r6gd.2xlarge, r6gd.4xlarge, r6gd.8xlarge, r6gd.12xlarge, r6gd.16xlarge, r6id.large, r6id.xlarge, r6id.2xlarge, r6id.4xlarge, r6id.8xlarge, r6id.12xlarge, r6id.16xlarge, r6id.24xlarge, r6id.32xlarge, r8gd.medium, r8gd.large, r8gd.xlarge, r8gd.2xlarge, r8gd.4xlarge, r8gd.8xlarge, r8gd.12xlarge, r8gd.16xlarge, r8gd.24xlarge, r8gd.48xlarge) (title: VM size)</td>
</tr>
<tr>
    <td><CopyableCode code="state" /></td>
    <td><code>string</code></td>
    <td>Current state of the service (creating, restarting, running, replaying_wal, restoring_backup, finalizing_restore, unavailable, stopped, deleting) (title: Postgres Service State)</td>
</tr>
<tr>
    <td><CopyableCode code="storageSize" /></td>
    <td><code>integer</code></td>
    <td>The storage size, in GiB, which must be supported by the specified `size`. (title: Storage Size)</td>
</tr>
<tr>
    <td><CopyableCode code="tags" /></td>
    <td><code>array</code></td>
    <td>Tags associated with the Postgres service. Tag keys starting with “chc_” are reserved for internal use. (title: Postgres Tags)</td>
</tr>
<tr>
    <td><CopyableCode code="username" /></td>
    <td><code>string</code></td>
    <td>Username for the Postgres service</td>
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
    <td><code>string (uuid)</code></td>
    <td> (title: Unique Postgres service ID, example: f71df78e-ddad-82d0-8dfa-abbec741b82e)</td>
</tr>
<tr>
    <td><CopyableCode code="name" /></td>
    <td><code>string</code></td>
    <td>Name of the Postgres service. Alphanumerical string with whitespaces up to 50 characters. (title: Postgres Service Name)</td>
</tr>
<tr>
    <td><CopyableCode code="createdAt" /></td>
    <td><code>string (date-time)</code></td>
    <td> (title: Postgres Service creation timestamp, example: 2026-03-26T20:51:16.384Z)</td>
</tr>
<tr>
    <td><CopyableCode code="haType" /></td>
    <td><code>string</code></td>
    <td>Type of high availability: “none” for no replication, “async” for asynchronous replication to a single standby, and “sync” for synchronous replication to two standbys. (none, async, sync)</td>
</tr>
<tr>
    <td><CopyableCode code="isPrimary" /></td>
    <td><code>boolean</code></td>
    <td>True if this service is the primary service in the data warehouse (title: Postgres Service is Primary)</td>
</tr>
<tr>
    <td><CopyableCode code="postgresVersion" /></td>
    <td><code>string</code></td>
    <td> (18, 17) (title: Postgres major version)</td>
</tr>
<tr>
    <td><CopyableCode code="provider" /></td>
    <td><code>string</code></td>
    <td>The cloud provider for a Postgres service. (aws) (title: Cloud provider)</td>
</tr>
<tr>
    <td><CopyableCode code="region" /></td>
    <td><code>string</code></td>
    <td>The cloud region for a Postgres service. (title: Service region)</td>
</tr>
<tr>
    <td><CopyableCode code="size" /></td>
    <td><code>string</code></td>
    <td>The VM size for a Postgres service. (c6gd.large, c6gd.xlarge, c6gd.2xlarge, c6gd.4xlarge, c6gd.8xlarge, c6gd.16xlarge, i7i.large, i7i.xlarge, i7i.2xlarge, i7i.4xlarge, i7i.8xlarge, i7i.12xlarge, i7i.16xlarge, i7i.24xlarge, i7ie.large, i7ie.xlarge, i7ie.2xlarge, i7ie.3xlarge, i7ie.6xlarge, i7ie.12xlarge, i7ie.18xlarge, i7ie.24xlarge, i8g.large, i8g.xlarge, i8g.2xlarge, i8g.4xlarge, i8g.8xlarge, i8g.16xlarge, i8g.24xlarge, i8ge.large, i8ge.xlarge, i8ge.2xlarge, i8ge.3xlarge, i8ge.6xlarge, i8ge.12xlarge, i8ge.18xlarge, i8ge.24xlarge, m6gd.large, m6gd.xlarge, m6gd.2xlarge, m6gd.4xlarge, m6gd.8xlarge, m6gd.16xlarge, m6id.large, m6id.xlarge, m6id.2xlarge, m6id.4xlarge, m6id.8xlarge, m6id.16xlarge, m8gd.large, m8gd.xlarge, m8gd.2xlarge, m8gd.4xlarge, m8gd.8xlarge, m8gd.16xlarge, r6gd.medium, r6gd.large, r6gd.xlarge, r6gd.2xlarge, r6gd.4xlarge, r6gd.8xlarge, r6gd.12xlarge, r6gd.16xlarge, r6id.large, r6id.xlarge, r6id.2xlarge, r6id.4xlarge, r6id.8xlarge, r6id.12xlarge, r6id.16xlarge, r6id.24xlarge, r6id.32xlarge, r8gd.medium, r8gd.large, r8gd.xlarge, r8gd.2xlarge, r8gd.4xlarge, r8gd.8xlarge, r8gd.12xlarge, r8gd.16xlarge, r8gd.24xlarge, r8gd.48xlarge) (title: VM size)</td>
</tr>
<tr>
    <td><CopyableCode code="state" /></td>
    <td><code>string</code></td>
    <td>Current state of the service (creating, restarting, running, replaying_wal, restoring_backup, finalizing_restore, unavailable, stopped, deleting) (title: Postgres Service State)</td>
</tr>
<tr>
    <td><CopyableCode code="tags" /></td>
    <td><code>array</code></td>
    <td>Tags associated with the Postgres service. Tag keys starting with “chc_” are reserved for internal use. (title: Postgres Tags)</td>
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
    <td><a href="#parameter-postgresId"><code>postgresId</code></a>, <a href="#parameter-organizationId"><code>organizationId</code></a></td>
    <td></td>
    <td>**This endpoint is in beta.** API contract is stable, and no breaking changes are expected in the future. &lt;br /&gt;&lt;br /&gt; Returns a Postgres service that belongs to the organization</td>
</tr>
<tr>
    <td><a href="#list"><CopyableCode code="list" /></a></td>
    <td><CopyableCode code="select" /></td>
    <td><a href="#parameter-organizationId"><code>organizationId</code></a></td>
    <td></td>
    <td>**This endpoint is in beta.** API contract is stable, and no breaking changes are expected in the future. &lt;br /&gt;&lt;br /&gt; Returns a list of all Postgres services in the organization.</td>
</tr>
<tr>
    <td><a href="#create"><CopyableCode code="create" /></a></td>
    <td><CopyableCode code="insert" /></td>
    <td><a href="#parameter-organizationId"><code>organizationId</code></a>, <a href="#parameter-name"><code>name</code></a>, <a href="#parameter-provider"><code>provider</code></a>, <a href="#parameter-region"><code>region</code></a>, <a href="#parameter-size"><code>size</code></a></td>
    <td></td>
    <td>**This endpoint is in beta.** API contract is stable, and no breaking changes are expected in the future. &lt;br /&gt;&lt;br /&gt; Creates a new Postgres service in the organization and returns it. The service is started asynchronously.</td>
</tr>
<tr>
    <td><a href="#update"><CopyableCode code="update" /></a></td>
    <td><CopyableCode code="update" /></td>
    <td><a href="#parameter-postgresId"><code>postgresId</code></a>, <a href="#parameter-organizationId"><code>organizationId</code></a></td>
    <td></td>
    <td>**This endpoint is in beta.** API contract is stable, and no breaking changes are expected in the future. &lt;br /&gt;&lt;br /&gt; Update a Postgres service that belongs to the organization. **WARNING:** Changing the name also updates the host name and certificates for the service.</td>
</tr>
<tr>
    <td><a href="#delete"><CopyableCode code="delete" /></a></td>
    <td><CopyableCode code="delete" /></td>
    <td><a href="#parameter-postgresId"><code>postgresId</code></a>, <a href="#parameter-organizationId"><code>organizationId</code></a></td>
    <td></td>
    <td>**This endpoint is in beta.** API contract is stable, and no breaking changes are expected in the future. &lt;br /&gt;&lt;br /&gt; Deletes a Postgres service that belongs to the organization</td>
</tr>
<tr>
    <td><a href="#restored_service"><CopyableCode code="restored_service" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-postgresId"><code>postgresId</code></a>, <a href="#parameter-organizationId"><code>organizationId</code></a>, <a href="#parameter-name"><code>name</code></a>, <a href="#parameter-restoreTarget"><code>restoreTarget</code></a></td>
    <td></td>
    <td>**This endpoint is in beta.** API contract is stable, and no breaking changes are expected in the future. &lt;br /&gt;&lt;br /&gt; Restore a Postgres database from continuous backup, optionally at a specific point in time.</td>
</tr>
<tr>
    <td><a href="#update_password"><CopyableCode code="update_password" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-postgresId"><code>postgresId</code></a>, <a href="#parameter-organizationId"><code>organizationId</code></a></td>
    <td></td>
    <td>**This endpoint is in beta.** API contract is stable, and no breaking changes are expected in the future. &lt;br /&gt;&lt;br /&gt; Sets a new password for a Postgres service's superuser account.</td>
</tr>
<tr>
    <td><a href="#update_state"><CopyableCode code="update_state" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-postgresId"><code>postgresId</code></a>, <a href="#parameter-organizationId"><code>organizationId</code></a></td>
    <td></td>
    <td>**This endpoint is in beta.** API contract is stable, and no breaking changes are expected in the future. &lt;br /&gt;&lt;br /&gt; Initiate a process for a Postgres service:&lt;br /&gt;* restart: Initiates a service restart&lt;br /&gt;* promote: Promotes a read replica to primary&lt;br /&gt;* switchover: Switch a primary over to a standby&lt;br /&gt;</td>
</tr>
<tr>
    <td><a href="#read_replica"><CopyableCode code="read_replica" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-postgresId"><code>postgresId</code></a>, <a href="#parameter-organizationId"><code>organizationId</code></a>, <a href="#parameter-name"><code>name</code></a></td>
    <td></td>
    <td>**This endpoint is in beta.** API contract is stable, and no breaking changes are expected in the future. &lt;br /&gt;&lt;br /&gt; Initiate the process to create a new read replica for a Postgres service.</td>
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
<tr id="parameter-postgresId">
    <td><CopyableCode code="postgresId" /></td>
    <td><code>string (uuid)</code></td>
    <td>ID of the requested Postgres service.</td>
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

**This endpoint is in beta.** API contract is stable, and no breaking changes are expected in the future. &lt;br /&gt;&lt;br /&gt; Returns a Postgres service that belongs to the organization

```sql
SELECT
id,
name,
connectionString,
createdAt,
haType,
hostname,
isPrimary,
password,
postgresVersion,
provider,
region,
size,
state,
storageSize,
tags,
username
FROM clickhouse.postgres.services
WHERE postgresId = '{{ postgresId }}' -- required
AND organizationId = '{{ organizationId }}' -- required unless CLICKHOUSE_ORG_ID is set
;
```
</TabItem>
<TabItem value="list">

**This endpoint is in beta.** API contract is stable, and no breaking changes are expected in the future. &lt;br /&gt;&lt;br /&gt; Returns a list of all Postgres services in the organization.

```sql
SELECT
id,
name,
createdAt,
haType,
isPrimary,
postgresVersion,
provider,
region,
size,
state,
tags
FROM clickhouse.postgres.services
WHERE organizationId = '{{ organizationId }}' -- required unless CLICKHOUSE_ORG_ID is set
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

**This endpoint is in beta.** API contract is stable, and no breaking changes are expected in the future. &lt;br /&gt;&lt;br /&gt; Creates a new Postgres service in the organization and returns it. The service is started asynchronously.

```sql
INSERT INTO clickhouse.postgres.services (
name,
provider,
region,
postgresVersion,
size,
haType,
tags,
pgConfig,
pgBouncerConfig,
organizationId
)
SELECT 
'{{ name }}' /* required */,
'{{ provider }}' /* required */,
'{{ region }}' /* required */,
'{{ postgresVersion }}',
'{{ size }}' /* required */,
'{{ haType }}',
'{{ tags }}',
'{{ pgConfig }}',
'{{ pgBouncerConfig }}',
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
- name: services
  props:
    - name: organizationId
      value: "{{ organizationId }}"
      description: Required parameter for the services resource.
    - name: name
      value: "{{ name }}"
      description: |
        Name of the Postgres service. Alphanumerical string with whitespaces up to 50 characters.
    - name: provider
      value: "{{ provider }}"
      description: |
        The cloud provider for a Postgres service.
      valid_values: ['aws']
    - name: region
      value: "{{ region }}"
      description: |
        The cloud region for a Postgres service.
    - name: postgresVersion
      value: "{{ postgresVersion }}"
      valid_values: ['18', '17']
    - name: size
      value: "{{ size }}"
      description: |
        The VM size for a Postgres service.
      valid_values: ['c6gd.large', 'c6gd.xlarge', 'c6gd.2xlarge', 'c6gd.4xlarge', 'c6gd.8xlarge', 'c6gd.16xlarge', 'i7i.large', 'i7i.xlarge', 'i7i.2xlarge', 'i7i.4xlarge', 'i7i.8xlarge', 'i7i.12xlarge', 'i7i.16xlarge', 'i7i.24xlarge', 'i7ie.large', 'i7ie.xlarge', 'i7ie.2xlarge', 'i7ie.3xlarge', 'i7ie.6xlarge', 'i7ie.12xlarge', 'i7ie.18xlarge', 'i7ie.24xlarge', 'i8g.large', 'i8g.xlarge', 'i8g.2xlarge', 'i8g.4xlarge', 'i8g.8xlarge', 'i8g.16xlarge', 'i8g.24xlarge', 'i8ge.large', 'i8ge.xlarge', 'i8ge.2xlarge', 'i8ge.3xlarge', 'i8ge.6xlarge', 'i8ge.12xlarge', 'i8ge.18xlarge', 'i8ge.24xlarge', 'm6gd.large', 'm6gd.xlarge', 'm6gd.2xlarge', 'm6gd.4xlarge', 'm6gd.8xlarge', 'm6gd.16xlarge', 'm6id.large', 'm6id.xlarge', 'm6id.2xlarge', 'm6id.4xlarge', 'm6id.8xlarge', 'm6id.16xlarge', 'm8gd.large', 'm8gd.xlarge', 'm8gd.2xlarge', 'm8gd.4xlarge', 'm8gd.8xlarge', 'm8gd.16xlarge', 'r6gd.medium', 'r6gd.large', 'r6gd.xlarge', 'r6gd.2xlarge', 'r6gd.4xlarge', 'r6gd.8xlarge', 'r6gd.12xlarge', 'r6gd.16xlarge', 'r6id.large', 'r6id.xlarge', 'r6id.2xlarge', 'r6id.4xlarge', 'r6id.8xlarge', 'r6id.12xlarge', 'r6id.16xlarge', 'r6id.24xlarge', 'r6id.32xlarge', 'r8gd.medium', 'r8gd.large', 'r8gd.xlarge', 'r8gd.2xlarge', 'r8gd.4xlarge', 'r8gd.8xlarge', 'r8gd.12xlarge', 'r8gd.16xlarge', 'r8gd.24xlarge', 'r8gd.48xlarge']
    - name: haType
      value: "{{ haType }}"
      description: |
        Type of high availability: “none” for no replication, “async” for asynchronous replication to a single standby, and “sync” for synchronous replication to two standbys.
      valid_values: ['none', 'async', 'sync']
    - name: tags
      description: |
        Tags associated with the Postgres service. Tag keys starting with “chc_” are reserved for internal use.
      value:
        - key: "{{ key }}"
          value: "{{ value }}"
    - name: pgConfig
      description: |
        Postgres [runtime configuration](https://www.postgresql.org/docs/current/runtime-config.html) configuration.
      value:
        max_connections: "{{ max_connections }}"
        default_transaction_isolation: "{{ default_transaction_isolation }}"
        ssl_min_protocol_version: "{{ ssl_min_protocol_version }}"
        maintenance_work_mem: "{{ maintenance_work_mem }}"
        work_mem: "{{ work_mem }}"
        effective_cache_size: "{{ effective_cache_size }}"
        random_page_cost: "{{ random_page_cost }}"
        effective_io_concurrency: "{{ effective_io_concurrency }}"
        max_worker_processes: "{{ max_worker_processes }}"
        max_parallel_workers: "{{ max_parallel_workers }}"
        max_parallel_workers_per_gather: "{{ max_parallel_workers_per_gather }}"
        max_parallel_maintenance_workers: "{{ max_parallel_maintenance_workers }}"
        statement_timeout: "{{ statement_timeout }}"
        lock_timeout: "{{ lock_timeout }}"
        idle_session_timeout: "{{ idle_session_timeout }}"
        idle_in_transaction_session_timeout: "{{ idle_in_transaction_session_timeout }}"
        transaction_timeout: "{{ transaction_timeout }}"
        wal_sender_timeout: "{{ wal_sender_timeout }}"
        wal_keep_size: "{{ wal_keep_size }}"
        min_wal_size: "{{ min_wal_size }}"
        max_wal_size: "{{ max_wal_size }}"
        max_slot_wal_keep_size: "{{ max_slot_wal_keep_size }}"
        wal_compression: "{{ wal_compression }}"
        autovacuum_max_workers: "{{ autovacuum_max_workers }}"
        autovacuum_naptime: "{{ autovacuum_naptime }}"
        autovacuum_work_mem: "{{ autovacuum_work_mem }}"
        autovacuum_vacuum_scale_factor: "{{ autovacuum_vacuum_scale_factor }}"
        autovacuum_analyze_scale_factor: "{{ autovacuum_analyze_scale_factor }}"
        autovacuum_vacuum_insert_scale_factor: "{{ autovacuum_vacuum_insert_scale_factor }}"
        autovacuum_vacuum_cost_limit: "{{ autovacuum_vacuum_cost_limit }}"
        autovacuum_vacuum_cost_delay: "{{ autovacuum_vacuum_cost_delay }}"
    - name: pgBouncerConfig
      value: "{{ pgBouncerConfig }}"
      description: |
        PgBouncer [runtime configuration](https://www.pgbouncer.org/config.html) configuration.
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

**This endpoint is in beta.** API contract is stable, and no breaking changes are expected in the future. &lt;br /&gt;&lt;br /&gt; Update a Postgres service that belongs to the organization. **WARNING:** Changing the name also updates the host name and certificates for the service.

```sql
UPDATE clickhouse.postgres.services
SET 
name = '{{ name }}',
size = '{{ size }}',
haType = '{{ haType }}',
tags = '{{ tags }}'
WHERE 
postgresId = '{{ postgresId }}' --required
AND organizationId = '{{ organizationId }}' --required unless CLICKHOUSE_ORG_ID is set
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

**This endpoint is in beta.** API contract is stable, and no breaking changes are expected in the future. &lt;br /&gt;&lt;br /&gt; Deletes a Postgres service that belongs to the organization

```sql
DELETE FROM clickhouse.postgres.services
WHERE postgresId = '{{ postgresId }}' --required
AND organizationId = '{{ organizationId }}' --required unless CLICKHOUSE_ORG_ID is set
;
```
</TabItem>
</Tabs>


## Lifecycle Methods

<Tabs
    defaultValue="restored_service"
    values={[
        { label: 'restored_service', value: 'restored_service' },
        { label: 'update_password', value: 'update_password' },
        { label: 'update_state', value: 'update_state' },
        { label: 'read_replica', value: 'read_replica' }
    ]}
>
<TabItem value="restored_service">

**This endpoint is in beta.** API contract is stable, and no breaking changes are expected in the future. &lt;br /&gt;&lt;br /&gt; Restore a Postgres database from continuous backup, optionally at a specific point in time.

```sql
EXEC clickhouse.postgres.services.restored_service 
@postgresId='{{ postgresId }}' --required, 
@organizationId='{{ organizationId }}' --required unless CLICKHOUSE_ORG_ID is set 
@@json=
'{
"name": "{{ name }}", 
"restoreTarget": "{{ restoreTarget }}", 
"pgConfig": "{{ pgConfig }}", 
"pgBouncerConfig": "{{ pgBouncerConfig }}", 
"tags": "{{ tags }}"
}'
;
```
</TabItem>
<TabItem value="update_password">

**This endpoint is in beta.** API contract is stable, and no breaking changes are expected in the future. &lt;br /&gt;&lt;br /&gt; Sets a new password for a Postgres service's superuser account.

```sql
EXEC clickhouse.postgres.services.update_password 
@postgresId='{{ postgresId }}' --required, 
@organizationId='{{ organizationId }}' --required unless CLICKHOUSE_ORG_ID is set 
@@json=
'{
"password": "{{ password }}"
}'
;
```
</TabItem>
<TabItem value="update_state">

**This endpoint is in beta.** API contract is stable, and no breaking changes are expected in the future. &lt;br /&gt;&lt;br /&gt; Initiate a process for a Postgres service:&lt;br /&gt;* restart: Initiates a service restart&lt;br /&gt;* promote: Promotes a read replica to primary&lt;br /&gt;* switchover: Switch a primary over to a standby&lt;br /&gt;

```sql
EXEC clickhouse.postgres.services.update_state 
@postgresId='{{ postgresId }}' --required, 
@organizationId='{{ organizationId }}' --required unless CLICKHOUSE_ORG_ID is set 
@@json=
'{
"command": "{{ command }}"
}'
;
```
</TabItem>
<TabItem value="read_replica">

**This endpoint is in beta.** API contract is stable, and no breaking changes are expected in the future. &lt;br /&gt;&lt;br /&gt; Initiate the process to create a new read replica for a Postgres service.

```sql
EXEC clickhouse.postgres.services.read_replica 
@postgresId='{{ postgresId }}' --required, 
@organizationId='{{ organizationId }}' --required unless CLICKHOUSE_ORG_ID is set 
@@json=
'{
"name": "{{ name }}", 
"pgConfig": "{{ pgConfig }}", 
"pgBouncerConfig": "{{ pgBouncerConfig }}", 
"tags": "{{ tags }}"
}'
;
```
</TabItem>
</Tabs>

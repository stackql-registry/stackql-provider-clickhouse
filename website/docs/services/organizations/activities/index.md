--- 
title: activities
hide_title: false
hide_table_of_contents: false
keywords:
  - activities
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

Creates, updates, deletes, gets or lists an <code>activities</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="activities" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="clickhouse.organizations.activities" /></td></tr>
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
    <td>Unique activity ID.</td>
</tr>
<tr>
    <td><CopyableCode code="actorDetails" /></td>
    <td><code>string</code></td>
    <td>Additional information about the actor.</td>
</tr>
<tr>
    <td><CopyableCode code="actorId" /></td>
    <td><code>string</code></td>
    <td>Unique actor ID.</td>
</tr>
<tr>
    <td><CopyableCode code="actorIpAddress" /></td>
    <td><code>string</code></td>
    <td>IP address of the actor. Defined for 'user' and 'api' actor types.</td>
</tr>
<tr>
    <td><CopyableCode code="actorType" /></td>
    <td><code>string</code></td>
    <td>Type of the actor: 'user', 'support', 'system', 'api'. (user, support, system, api)</td>
</tr>
<tr>
    <td><CopyableCode code="createdAt" /></td>
    <td><code>string (date-time)</code></td>
    <td>Timestamp of the activity. ISO-8601.</td>
</tr>
<tr>
    <td><CopyableCode code="keyUpdateType" /></td>
    <td><code>string</code></td>
    <td>For 'openapi_key_update' activities: the type of update that was performed. (created, deleted, name-changed, role-changed, state-changed, date-changed, ip-access-list-changed, org-role-changed, default-service-role-changed, service-role-changed, roles-v2-changed)</td>
</tr>
<tr>
    <td><CopyableCode code="organizationId" /></td>
    <td><code>string</code></td>
    <td>Scope of the activity: organization ID this activity is related to.</td>
</tr>
<tr>
    <td><CopyableCode code="serviceId" /></td>
    <td><code>string</code></td>
    <td>Scope of the activity: service ID this activity is related to.</td>
</tr>
<tr>
    <td><CopyableCode code="targetKeyId" /></td>
    <td><code>string</code></td>
    <td>For 'openapi_key_update' activities: the ID of the API key that was updated.</td>
</tr>
<tr>
    <td><CopyableCode code="type" /></td>
    <td><code>string</code></td>
    <td>Type of the activity. (create_organization, organization_update_name, transfer_service_in, transfer_service_out, save_payment_method, marketplace_subscription, migrate_marketplace_billing_details_in, migrate_marketplace_billing_details_out, organization_update_tier, organization_invite_create, organization_invite_delete, organization_member_join, organization_member_add, organization_member_leave, organization_member_delete, organization_member_update_role, organization_member_update_mfa_method, user_login, user_login_failed, user_logout, key_create, key_delete, openapi_key_update, service_create, service_start, service_stop, service_awaken, service_idle, service_running, service_partially_running, service_delete, service_update_name, service_update_ip_access_list, service_update_autoscaling_memory, service_update_autoscaling_idling, service_update_password, service_update_autoscaling_replicas, service_update_max_allowable_replicas, service_update_backup_configuration, service_restore_backup, service_update_release_channel, service_update_gpt_usage_consent, service_update_private_endpoints, service_import_to_organization, service_export_from_organization, service_maintenance_start, service_maintenance_end, service_update_core_dump, backup_delete)</td>
</tr>
<tr>
    <td><CopyableCode code="userAgent" /></td>
    <td><code>string</code></td>
    <td>User agent of the actor</td>
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
    <td>Unique activity ID.</td>
</tr>
<tr>
    <td><CopyableCode code="actorDetails" /></td>
    <td><code>string</code></td>
    <td>Additional information about the actor.</td>
</tr>
<tr>
    <td><CopyableCode code="actorId" /></td>
    <td><code>string</code></td>
    <td>Unique actor ID.</td>
</tr>
<tr>
    <td><CopyableCode code="actorIpAddress" /></td>
    <td><code>string</code></td>
    <td>IP address of the actor. Defined for 'user' and 'api' actor types.</td>
</tr>
<tr>
    <td><CopyableCode code="actorType" /></td>
    <td><code>string</code></td>
    <td>Type of the actor: 'user', 'support', 'system', 'api'. (user, support, system, api)</td>
</tr>
<tr>
    <td><CopyableCode code="createdAt" /></td>
    <td><code>string (date-time)</code></td>
    <td>Timestamp of the activity. ISO-8601.</td>
</tr>
<tr>
    <td><CopyableCode code="keyUpdateType" /></td>
    <td><code>string</code></td>
    <td>For 'openapi_key_update' activities: the type of update that was performed. (created, deleted, name-changed, role-changed, state-changed, date-changed, ip-access-list-changed, org-role-changed, default-service-role-changed, service-role-changed, roles-v2-changed)</td>
</tr>
<tr>
    <td><CopyableCode code="organizationId" /></td>
    <td><code>string</code></td>
    <td>Scope of the activity: organization ID this activity is related to.</td>
</tr>
<tr>
    <td><CopyableCode code="serviceId" /></td>
    <td><code>string</code></td>
    <td>Scope of the activity: service ID this activity is related to.</td>
</tr>
<tr>
    <td><CopyableCode code="targetKeyId" /></td>
    <td><code>string</code></td>
    <td>For 'openapi_key_update' activities: the ID of the API key that was updated.</td>
</tr>
<tr>
    <td><CopyableCode code="type" /></td>
    <td><code>string</code></td>
    <td>Type of the activity. (create_organization, organization_update_name, transfer_service_in, transfer_service_out, save_payment_method, marketplace_subscription, migrate_marketplace_billing_details_in, migrate_marketplace_billing_details_out, organization_update_tier, organization_invite_create, organization_invite_delete, organization_member_join, organization_member_add, organization_member_leave, organization_member_delete, organization_member_update_role, organization_member_update_mfa_method, user_login, user_login_failed, user_logout, key_create, key_delete, openapi_key_update, service_create, service_start, service_stop, service_awaken, service_idle, service_running, service_partially_running, service_delete, service_update_name, service_update_ip_access_list, service_update_autoscaling_memory, service_update_autoscaling_idling, service_update_password, service_update_autoscaling_replicas, service_update_max_allowable_replicas, service_update_backup_configuration, service_restore_backup, service_update_release_channel, service_update_gpt_usage_consent, service_update_private_endpoints, service_import_to_organization, service_export_from_organization, service_maintenance_start, service_maintenance_end, service_update_core_dump, backup_delete)</td>
</tr>
<tr>
    <td><CopyableCode code="userAgent" /></td>
    <td><code>string</code></td>
    <td>User agent of the actor</td>
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
    <td><a href="#parameter-activityId"><code>activityId</code></a>, <a href="#parameter-organizationId"><code>organizationId</code></a></td>
    <td></td>
    <td>Returns a single organization activity by ID.</td>
</tr>
<tr>
    <td><a href="#list"><CopyableCode code="list" /></a></td>
    <td><CopyableCode code="select" /></td>
    <td><a href="#parameter-organizationId"><code>organizationId</code></a></td>
    <td><a href="#parameter-from_date"><code>from_date</code></a>, <a href="#parameter-to_date"><code>to_date</code></a></td>
    <td>Returns a list of all organization activities.</td>
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
<tr id="parameter-activityId">
    <td><CopyableCode code="activityId" /></td>
    <td><code>string</code></td>
    <td>ID of the requested activity.</td>
</tr>
<tr id="parameter-organizationId">
    <td><CopyableCode code="organizationId" /></td>
    <td><code>string</code></td>
    <td>ClickHouse Cloud organization ID. Resolved from the CLICKHOUSE_ORG_ID environment variable when it is set (x-stackQL-envVar); otherwise it must be supplied on every query as WHERE organizationId = &lt;uuid&gt;. A WHERE value always takes precedence over the environment. (x-stackQL-envVar: CLICKHOUSE_ORG_ID)</td>
</tr>
<tr id="parameter-from_date">
    <td><CopyableCode code="from_date" /></td>
    <td><code>string (date-time)</code></td>
    <td>A starting date for a search</td>
</tr>
<tr id="parameter-to_date">
    <td><CopyableCode code="to_date" /></td>
    <td><code>string (date-time)</code></td>
    <td>An ending date for a search</td>
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

Returns a single organization activity by ID.

```sql
SELECT
id,
actorDetails,
actorId,
actorIpAddress,
actorType,
createdAt,
keyUpdateType,
organizationId,
serviceId,
targetKeyId,
type,
userAgent
FROM clickhouse.organizations.activities
WHERE activityId = '{{ activityId }}' -- required
AND organizationId = '{{ organizationId }}' -- required unless CLICKHOUSE_ORG_ID is set
;
```
</TabItem>
<TabItem value="list">

Returns a list of all organization activities.

```sql
SELECT
id,
actorDetails,
actorId,
actorIpAddress,
actorType,
createdAt,
keyUpdateType,
organizationId,
serviceId,
targetKeyId,
type,
userAgent
FROM clickhouse.organizations.activities
WHERE organizationId = '{{ organizationId }}' -- required unless CLICKHOUSE_ORG_ID is set
AND from_date = '{{ from_date }}'
AND to_date = '{{ to_date }}'
;
```
</TabItem>
</Tabs>

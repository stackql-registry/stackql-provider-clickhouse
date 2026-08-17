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
    <td><CopyableCode code="actor_id" /></td>
    <td><code>string</code></td>
    <td>Unique actor ID. (wire: actorId)</td>
</tr>
<tr>
    <td><CopyableCode code="organization_id" /></td>
    <td><code>string</code></td>
    <td>Scope of the activity: organization ID this activity is related to. (wire: organizationId)</td>
</tr>
<tr>
    <td><CopyableCode code="service_id" /></td>
    <td><code>string</code></td>
    <td>Scope of the activity: service ID this activity is related to. (wire: serviceId)</td>
</tr>
<tr>
    <td><CopyableCode code="target_key_id" /></td>
    <td><code>string</code></td>
    <td>For 'openapi_key_update' activities: the ID of the API key that was updated. (wire: targetKeyId)</td>
</tr>
<tr>
    <td><CopyableCode code="actor_details" /></td>
    <td><code>string</code></td>
    <td>Additional information about the actor. (wire: actorDetails)</td>
</tr>
<tr>
    <td><CopyableCode code="actor_ip_address" /></td>
    <td><code>string</code></td>
    <td>IP address of the actor. Defined for 'user' and 'api' actor types. (wire: actorIpAddress)</td>
</tr>
<tr>
    <td><CopyableCode code="actor_type" /></td>
    <td><code>string</code></td>
    <td>Type of the actor: 'user', 'support', 'system', 'api'. (user, support, system, api) (wire: actorType)</td>
</tr>
<tr>
    <td><CopyableCode code="created_at" /></td>
    <td><code>string (date-time)</code></td>
    <td>Timestamp of the activity. ISO-8601. (wire: createdAt)</td>
</tr>
<tr>
    <td><CopyableCode code="key_update_type" /></td>
    <td><code>string</code></td>
    <td>For 'openapi_key_update' activities: the type of update that was performed. (created, deleted, name-changed, role-changed, state-changed, date-changed, ip-access-list-changed, org-role-changed, default-service-role-changed, service-role-changed, roles-v2-changed) (wire: keyUpdateType)</td>
</tr>
<tr>
    <td><CopyableCode code="target_actor_ids" /></td>
    <td><code>array</code></td>
    <td>For 'organization_member_update_roles' and 'organization_member_remove_roles' activities: IDs of the affected actors (e.g. 'user/&lt;id&gt;'). (wire: targetActorIds)</td>
</tr>
<tr>
    <td><CopyableCode code="target_resource_ids" /></td>
    <td><code>array</code></td>
    <td>For 'role_resources_delete' activities: IDs of the deleted resources the roles referenced. (wire: targetResourceIds)</td>
</tr>
<tr>
    <td><CopyableCode code="target_role_ids" /></td>
    <td><code>array</code></td>
    <td>For role and actor-role activities: IDs of the affected roles. (wire: targetRoleIds)</td>
</tr>
<tr>
    <td><CopyableCode code="target_role_names" /></td>
    <td><code>array</code></td>
    <td>For role and actor-role activities: names of the affected roles, when recorded. (wire: targetRoleNames)</td>
</tr>
<tr>
    <td><CopyableCode code="type" /></td>
    <td><code>string</code></td>
    <td>Type of the activity. (create_organization, delete_organization, organization_update_name, transfer_service_in, transfer_service_out, save_payment_method, marketplace_subscription, migrate_marketplace_billing_details_in, migrate_marketplace_billing_details_out, organization_update_tier, organization_invite_create, organization_invite_delete, organization_member_join, organization_member_add, organization_member_leave, organization_member_delete, organization_member_update_role, organization_member_update_roles, organization_member_update_mfa_method, organization_saml_connection_create, organization_saml_connection_update, user_login, user_login_failed, user_logout, key_create, key_delete, openapi_key_update, service_create, service_start, service_stop, service_awaken, service_idle, service_running, service_partially_running, service_delete, service_update_name, service_update_ip_access_list, service_update_autoscaling_memory, service_update_autoscaling_idling, service_update_password, service_update_autoscaling_replicas, service_update_max_allowable_replicas, service_update_backup_configuration, service_restore_backup, service_update_release_channel, service_update_gpt_usage_consent, service_update_private_endpoints, service_import_to_organization, service_export_from_organization, service_maintenance_start, service_maintenance_end, service_update_core_dump, service_update_autoscaling_schedule, service_update_query_endpoints, service_update_direct_connection, service_update_sql_console_jwt_auth, service_update_snapshot_configuration, service_update_collector_ip_access_list, service_update_mysql_interface, service_update_upgrade_window, service_delete_upgrade_window, service_trigger_failover, service_trigger_recovery, service_mcp_enabled, service_mcp_disabled, service_upgrade, service_scaled_down_for_tier_change, service_encryption_key_check_failed, service_encryption_key_rotation_failed, service_encryption_key_rotated, service_stop_encryption_key_inaccessible, service_restart_encryption_key_rotation, backup_delete, backup_bucket_create, backup_bucket_update, backup_bucket_delete, backup_bucket_archive, warehouse_update_name, warehouse_update_release_channel, role_create, role_update, role_delete, role_resources_delete, organization_member_remove_roles, scim_user_profile_update, scim_group_create, scim_group_update, scim_group_delete, organization_saml_connection_delete, datadog_integration_create, datadog_integration_delete, organization_update_spend_alert, organization_update_core_dumps, organization_update_private_endpoints, organization_update_pci_compliance, organization_update_hipaa_status, transfer_credits_in, transfer_credits_out, promo_code_claim, schema_advisor_seed, schema_advisor_generate_plan, schema_advisor_approve_plan, schema_advisor_start_deployment, schema_advisor_start_benchmark, schema_advisor_run_benchmark, schema_advisor_start_promotion, schema_advisor_exchange_tables, schema_advisor_drop_sandbox, udf_create, udf_update, udf_delete, udf_version_create, udf_version_delete, udf_attach, udf_detach, udf_update_services, udf_redeploy, udf_rebuild)</td>
</tr>
<tr>
    <td><CopyableCode code="user_agent" /></td>
    <td><code>string</code></td>
    <td>User agent of the actor (wire: userAgent)</td>
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
    <td><CopyableCode code="actor_id" /></td>
    <td><code>string</code></td>
    <td>Unique actor ID. (wire: actorId)</td>
</tr>
<tr>
    <td><CopyableCode code="organization_id" /></td>
    <td><code>string</code></td>
    <td>Scope of the activity: organization ID this activity is related to. (wire: organizationId)</td>
</tr>
<tr>
    <td><CopyableCode code="service_id" /></td>
    <td><code>string</code></td>
    <td>Scope of the activity: service ID this activity is related to. (wire: serviceId)</td>
</tr>
<tr>
    <td><CopyableCode code="target_key_id" /></td>
    <td><code>string</code></td>
    <td>For 'openapi_key_update' activities: the ID of the API key that was updated. (wire: targetKeyId)</td>
</tr>
<tr>
    <td><CopyableCode code="actor_details" /></td>
    <td><code>string</code></td>
    <td>Additional information about the actor. (wire: actorDetails)</td>
</tr>
<tr>
    <td><CopyableCode code="actor_ip_address" /></td>
    <td><code>string</code></td>
    <td>IP address of the actor. Defined for 'user' and 'api' actor types. (wire: actorIpAddress)</td>
</tr>
<tr>
    <td><CopyableCode code="actor_type" /></td>
    <td><code>string</code></td>
    <td>Type of the actor: 'user', 'support', 'system', 'api'. (user, support, system, api) (wire: actorType)</td>
</tr>
<tr>
    <td><CopyableCode code="created_at" /></td>
    <td><code>string (date-time)</code></td>
    <td>Timestamp of the activity. ISO-8601. (wire: createdAt)</td>
</tr>
<tr>
    <td><CopyableCode code="key_update_type" /></td>
    <td><code>string</code></td>
    <td>For 'openapi_key_update' activities: the type of update that was performed. (created, deleted, name-changed, role-changed, state-changed, date-changed, ip-access-list-changed, org-role-changed, default-service-role-changed, service-role-changed, roles-v2-changed) (wire: keyUpdateType)</td>
</tr>
<tr>
    <td><CopyableCode code="target_actor_ids" /></td>
    <td><code>array</code></td>
    <td>For 'organization_member_update_roles' and 'organization_member_remove_roles' activities: IDs of the affected actors (e.g. 'user/&lt;id&gt;'). (wire: targetActorIds)</td>
</tr>
<tr>
    <td><CopyableCode code="target_resource_ids" /></td>
    <td><code>array</code></td>
    <td>For 'role_resources_delete' activities: IDs of the deleted resources the roles referenced. (wire: targetResourceIds)</td>
</tr>
<tr>
    <td><CopyableCode code="target_role_ids" /></td>
    <td><code>array</code></td>
    <td>For role and actor-role activities: IDs of the affected roles. (wire: targetRoleIds)</td>
</tr>
<tr>
    <td><CopyableCode code="target_role_names" /></td>
    <td><code>array</code></td>
    <td>For role and actor-role activities: names of the affected roles, when recorded. (wire: targetRoleNames)</td>
</tr>
<tr>
    <td><CopyableCode code="type" /></td>
    <td><code>string</code></td>
    <td>Type of the activity. (create_organization, delete_organization, organization_update_name, transfer_service_in, transfer_service_out, save_payment_method, marketplace_subscription, migrate_marketplace_billing_details_in, migrate_marketplace_billing_details_out, organization_update_tier, organization_invite_create, organization_invite_delete, organization_member_join, organization_member_add, organization_member_leave, organization_member_delete, organization_member_update_role, organization_member_update_roles, organization_member_update_mfa_method, organization_saml_connection_create, organization_saml_connection_update, user_login, user_login_failed, user_logout, key_create, key_delete, openapi_key_update, service_create, service_start, service_stop, service_awaken, service_idle, service_running, service_partially_running, service_delete, service_update_name, service_update_ip_access_list, service_update_autoscaling_memory, service_update_autoscaling_idling, service_update_password, service_update_autoscaling_replicas, service_update_max_allowable_replicas, service_update_backup_configuration, service_restore_backup, service_update_release_channel, service_update_gpt_usage_consent, service_update_private_endpoints, service_import_to_organization, service_export_from_organization, service_maintenance_start, service_maintenance_end, service_update_core_dump, service_update_autoscaling_schedule, service_update_query_endpoints, service_update_direct_connection, service_update_sql_console_jwt_auth, service_update_snapshot_configuration, service_update_collector_ip_access_list, service_update_mysql_interface, service_update_upgrade_window, service_delete_upgrade_window, service_trigger_failover, service_trigger_recovery, service_mcp_enabled, service_mcp_disabled, service_upgrade, service_scaled_down_for_tier_change, service_encryption_key_check_failed, service_encryption_key_rotation_failed, service_encryption_key_rotated, service_stop_encryption_key_inaccessible, service_restart_encryption_key_rotation, backup_delete, backup_bucket_create, backup_bucket_update, backup_bucket_delete, backup_bucket_archive, warehouse_update_name, warehouse_update_release_channel, role_create, role_update, role_delete, role_resources_delete, organization_member_remove_roles, scim_user_profile_update, scim_group_create, scim_group_update, scim_group_delete, organization_saml_connection_delete, datadog_integration_create, datadog_integration_delete, organization_update_spend_alert, organization_update_core_dumps, organization_update_private_endpoints, organization_update_pci_compliance, organization_update_hipaa_status, transfer_credits_in, transfer_credits_out, promo_code_claim, schema_advisor_seed, schema_advisor_generate_plan, schema_advisor_approve_plan, schema_advisor_start_deployment, schema_advisor_start_benchmark, schema_advisor_run_benchmark, schema_advisor_start_promotion, schema_advisor_exchange_tables, schema_advisor_drop_sandbox, udf_create, udf_update, udf_delete, udf_version_create, udf_version_delete, udf_attach, udf_detach, udf_update_services, udf_redeploy, udf_rebuild)</td>
</tr>
<tr>
    <td><CopyableCode code="user_agent" /></td>
    <td><code>string</code></td>
    <td>User agent of the actor (wire: userAgent)</td>
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
    <td><a href="#parameter-activity_id"><code>activity_id</code></a>, <a href="#parameter-organization_id"><code>organization_id</code></a></td>
    <td></td>
    <td>Returns a single organization activity by ID.</td>
</tr>
<tr>
    <td><a href="#list"><CopyableCode code="list" /></a></td>
    <td><CopyableCode code="select" /></td>
    <td><a href="#parameter-organization_id"><code>organization_id</code></a></td>
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
<tr id="parameter-activity_id">
    <td><CopyableCode code="activity_id" /></td>
    <td><code>string</code></td>
    <td>ID of the requested activity. (wire: activityId)</td>
</tr>
<tr id="parameter-organization_id">
    <td><CopyableCode code="organization_id" /></td>
    <td><code>string</code></td>
    <td>ClickHouse Cloud organization ID. Resolved from the CLICKHOUSE_ORG_ID environment variable when it is set (x-stackQL-envVar); otherwise it must be supplied on every query as WHERE organization_id = &lt;uuid&gt;. A WHERE value always takes precedence over the environment. (x-stackQL-envVar: CLICKHOUSE_ORG_ID)</td>
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
actor_id,
organization_id,
service_id,
target_key_id,
actor_details,
actor_ip_address,
actor_type,
created_at,
key_update_type,
target_actor_ids,
target_resource_ids,
target_role_ids,
target_role_names,
type,
user_agent
FROM clickhouse.organizations.activities
WHERE activity_id = '{{ activity_id }}' -- required
AND organization_id = '{{ organization_id }}' -- required unless CLICKHOUSE_ORG_ID is set
;
```
</TabItem>
<TabItem value="list">

Returns a list of all organization activities.

```sql
SELECT
id,
actor_id,
organization_id,
service_id,
target_key_id,
actor_details,
actor_ip_address,
actor_type,
created_at,
key_update_type,
target_actor_ids,
target_resource_ids,
target_role_ids,
target_role_names,
type,
user_agent
FROM clickhouse.organizations.activities
WHERE organization_id = '{{ organization_id }}' -- required unless CLICKHOUSE_ORG_ID is set
AND from_date = '{{ from_date }}'
AND to_date = '{{ to_date }}'
;
```
</TabItem>
</Tabs>

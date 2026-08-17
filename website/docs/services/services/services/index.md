--- 
title: services
hide_title: false
hide_table_of_contents: false
keywords:
  - services
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

Creates, updates, deletes, gets or lists a <code>services</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="services" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="clickhouse.services.services" /></td></tr>
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
    <td>Unique service ID.</td>
</tr>
<tr>
    <td><CopyableCode code="name" /></td>
    <td><code>string</code></td>
    <td>Name of the service. Alphanumerical string with whitespaces up to 50 characters.</td>
</tr>
<tr>
    <td><CopyableCode code="byoc_id" /></td>
    <td><code>string</code></td>
    <td>This is the ID returned after setting up a region for Bring Your Own Cloud (BYOC). When the byocId parameter is specified, the minReplicaMemoryGb and the maxReplicaGb parameters are required too, with values included among the following sizes: 48, 116, 172, 232. (wire: byocId)</td>
</tr>
<tr>
    <td><CopyableCode code="data_warehouse_id" /></td>
    <td><code>string</code></td>
    <td>Data warehouse containing this service (wire: dataWarehouseId)</td>
</tr>
<tr>
    <td><CopyableCode code="encryption_role_id" /></td>
    <td><code>string</code></td>
    <td>The ID of the IAM role used for encryption. This is only available if hasTransparentDataEncryption is true. (wire: encryptionRoleId)</td>
</tr>
<tr>
    <td><CopyableCode code="transparent_data_encryption_key_id" /></td>
    <td><code>string</code></td>
    <td>The ID of the Transparent Data Encryption key used for the service. This is only available if hasTransparentDataEncryption is true. (wire: transparentDataEncryptionKeyId)</td>
</tr>
<tr>
    <td><CopyableCode code="autoscaling_mode" /></td>
    <td><code>string</code></td>
    <td>Configured autoscaling mode. "vertical" runs a fixed replica count while memory scales between minReplicaMemoryGb and maxReplicaMemoryGb; "horizontal" scales the replica count between minReplicas and maxReplicas at a fixed per-replica memory. This is the baseline configuration; the mode currently applied (which may differ while a schedule entry is active) is currentScaling.effectiveAutoscalingMode. (vertical, horizontal) (example: vertical) (wire: autoscalingMode)</td>
</tr>
<tr>
    <td><CopyableCode code="available_private_endpoint_ids" /></td>
    <td><code>array</code></td>
    <td>List of available private endpoints ids that can be attached to the service (wire: availablePrivateEndpointIds)</td>
</tr>
<tr>
    <td><CopyableCode code="clickhouse_version" /></td>
    <td><code>string</code></td>
    <td>ClickHouse version of the service. (wire: clickhouseVersion)</td>
</tr>
<tr>
    <td><CopyableCode code="compliance_type" /></td>
    <td><code>string</code></td>
    <td>Type of regulatory compliance for service. (hipaa, pci) (wire: complianceType)</td>
</tr>
<tr>
    <td><CopyableCode code="created_at" /></td>
    <td><code>string (date-time)</code></td>
    <td>Service creation timestamp. ISO-8601. (wire: createdAt)</td>
</tr>
<tr>
    <td><CopyableCode code="current_scaling" /></td>
    <td><code>object</code></td>
    <td> (wire: currentScaling)</td>
</tr>
<tr>
    <td><CopyableCode code="enable_core_dumps" /></td>
    <td><code>boolean</code></td>
    <td>True if the service's underline infra is enabled for collecting core dumps. This is an experimental feature (wire: enableCoreDumps)</td>
</tr>
<tr>
    <td><CopyableCode code="encryption_assumed_role_identifier" /></td>
    <td><code>string</code></td>
    <td>Optional role to use for disk encryption (wire: encryptionAssumedRoleIdentifier)</td>
</tr>
<tr>
    <td><CopyableCode code="encryption_key" /></td>
    <td><code>string</code></td>
    <td>Optional customer provided disk encryption key (wire: encryptionKey)</td>
</tr>
<tr>
    <td><CopyableCode code="endpoints" /></td>
    <td><code>array</code></td>
    <td>List of all service endpoints.</td>
</tr>
<tr>
    <td><CopyableCode code="has_transparent_data_encryption" /></td>
    <td><code>boolean</code></td>
    <td>True if the service should have the Transparent Data Encryption (TDE) enabled. TDE is only available for ENTERPRISE organizations tiers and can only be enabled at service creation. (wire: hasTransparentDataEncryption)</td>
</tr>
<tr>
    <td><CopyableCode code="iam_role" /></td>
    <td><code>string</code></td>
    <td>IAM role used for accessing objects in s3 (wire: iamRole)</td>
</tr>
<tr>
    <td><CopyableCode code="idle_scaling" /></td>
    <td><code>boolean</code></td>
    <td>When set to true the service is allowed to scale down to zero when idle. True by default. (wire: idleScaling)</td>
</tr>
<tr>
    <td><CopyableCode code="idle_timeout_minutes" /></td>
    <td><code>number</code></td>
    <td>Set minimum idling timeout (in minutes). Must be &gt;= 5 minutes. (wire: idleTimeoutMinutes)</td>
</tr>
<tr>
    <td><CopyableCode code="ip_access_list" /></td>
    <td><code>array</code></td>
    <td>List of IP addresses allowed to access the service (wire: ipAccessList)</td>
</tr>
<tr>
    <td><CopyableCode code="is_primary" /></td>
    <td><code>boolean</code></td>
    <td>True if this service is the primary service in the data warehouse (wire: isPrimary)</td>
</tr>
<tr>
    <td><CopyableCode code="is_readonly" /></td>
    <td><code>boolean</code></td>
    <td>True if this service is read-only. It can only be read-only if a dataWarehouseId is provided. (wire: isReadonly)</td>
</tr>
<tr>
    <td><CopyableCode code="max_replica_memory_gb" /></td>
    <td><code>number</code></td>
    <td>Maximum total memory of each replica during auto-scaling in Gb. A range in vertical autoscaling; equal to minReplicaMemoryGb in horizontal (memory is fixed while the replica count scales). Must be a multiple of 4 and lower than or equal to 120* for non paid services or 356* for paid services.* - maximum replica size subject to cloud provider hardware availability in your selected region.  (wire: maxReplicaMemoryGb)</td>
</tr>
<tr>
    <td><CopyableCode code="max_replicas" /></td>
    <td><code>integer</code></td>
    <td>Maximum number of replicas for horizontal autoscaling. Present only when the service uses horizontal autoscaling. (wire: maxReplicas)</td>
</tr>
<tr>
    <td><CopyableCode code="max_total_memory_gb" /></td>
    <td><code>number</code></td>
    <td>DEPRECATED - inaccurate for services with non-default numbers of replicas. Use `maxReplicaMemoryGb` instead. Maximum memory of three workers during auto-scaling in Gb. Available only for 'production' services. Must be a multiple of 12 and lower than or equal to 360 for non paid services or 1068 for paid services. Always absent for horizontal-autoscaling services (replica count is variable). (wire: maxTotalMemoryGb)</td>
</tr>
<tr>
    <td><CopyableCode code="min_replica_memory_gb" /></td>
    <td><code>number</code></td>
    <td>Minimum total memory of each replica during auto-scaling in Gb. A range in vertical autoscaling; equal to maxReplicaMemoryGb in horizontal (memory is fixed while the replica count scales). Must be a multiple of 4 and greater than or equal to 8. (wire: minReplicaMemoryGb)</td>
</tr>
<tr>
    <td><CopyableCode code="min_replicas" /></td>
    <td><code>integer</code></td>
    <td>Minimum number of replicas for horizontal autoscaling. Present only when the service uses horizontal autoscaling. (wire: minReplicas)</td>
</tr>
<tr>
    <td><CopyableCode code="min_total_memory_gb" /></td>
    <td><code>number</code></td>
    <td>DEPRECATED - inaccurate for services with non-default numbers of replicas. Use `minReplicaMemoryGb` instead. Minimum memory of three workers during auto-scaling in Gb. Available only for 'production' services. Must be a multiple of 12 and greater than or equal to 24. Always absent for horizontal-autoscaling services (replica count is variable). (wire: minTotalMemoryGb)</td>
</tr>
<tr>
    <td><CopyableCode code="num_replicas" /></td>
    <td><code>integer</code></td>
    <td>Number of replicas for the service. The number of replicas must be between 2 and 20 for the first service in a warehouse. Services that are created in an existing warehouse can have a number of replicas as low as 1. Further restrictions may apply based on your organization's tier. It defaults to 1 for the BASIC tier and 3 for the SCALE and ENTERPRISE tiers. Present only when the service uses vertical autoscaling. For horizontal autoscaling, use minReplicas and maxReplicas instead. (wire: numReplicas)</td>
</tr>
<tr>
    <td><CopyableCode code="private_endpoint_ids" /></td>
    <td><code>array</code></td>
    <td>List of private endpoints (wire: privateEndpointIds)</td>
</tr>
<tr>
    <td><CopyableCode code="profile" /></td>
    <td><code>string</code></td>
    <td>Custom instance profile. Only available for ENTERPRISE organization tiers. (v1-default, v1-highmem-xs, v1-highmem-s, v1-highmem-m, v1-highmem-l, v1-highmem-xl)</td>
</tr>
<tr>
    <td><CopyableCode code="provider" /></td>
    <td><code>string</code></td>
    <td>Cloud provider (aws, gcp, azure)</td>
</tr>
<tr>
    <td><CopyableCode code="region" /></td>
    <td><code>string</code></td>
    <td>Service region. (ap-northeast-1, ap-northeast-2, ap-south-1, ap-southeast-1, ap-southeast-2, ca-central-1, eu-central-1, eu-west-1, eu-west-2, il-central-1, us-east-1, us-east-2, us-west-2, us-east1, us-central1, europe-west2, europe-west4, asia-southeast1, asia-northeast1, eastus, eastus2, westus3, germanywestcentral, centralus)</td>
</tr>
<tr>
    <td><CopyableCode code="release_channel" /></td>
    <td><code>string</code></td>
    <td>Select fast if you want to get new ClickHouse releases as soon as they are available. You'll get new features faster, but with a higher risk of bugs. Select slow if you would like to defer releases to give yourself more time to test. This feature is only available for production services. default is the regular release channel. (slow, default, fast) (wire: releaseChannel)</td>
</tr>
<tr>
    <td><CopyableCode code="replica_memory_gb" /></td>
    <td><code>number</code></td>
    <td>Fixed memory per replica in Gb for horizontal autoscaling. Present only when the service uses horizontal autoscaling. Must be a multiple of 4, at least 8 Gb, and at most 120 Gb for non paid services or 356 Gb for paid services. (wire: replicaMemoryGb)</td>
</tr>
<tr>
    <td><CopyableCode code="scaling_schedule" /></td>
    <td><code>object</code></td>
    <td> (wire: scalingSchedule)</td>
</tr>
<tr>
    <td><CopyableCode code="state" /></td>
    <td><code>string</code></td>
    <td>Current state of the service. (starting, stopping, terminating, softdeleting, awaking, partially_running, provisioning, running, stopped, terminated, softdeleted, degraded, failed, idle)</td>
</tr>
<tr>
    <td><CopyableCode code="tags" /></td>
    <td><code>array</code></td>
    <td>Tags associated with the service.</td>
</tr>
<tr>
    <td><CopyableCode code="tier" /></td>
    <td><code>string</code></td>
    <td>DEPRECATED for BASIC, SCALE and ENTERPRISE organization tiers. Use `minReplicaMemoryGb`, `maxReplicaMemoryGb`, and `numReplicas` instead. Tier of the service: 'development', 'production', 'dedicated_high_mem', 'dedicated_high_cpu', 'dedicated_standard', 'dedicated_standard_n2d_standard_4', 'dedicated_standard_n2d_standard_8', 'dedicated_standard_n2d_standard_32', 'dedicated_standard_n2d_standard_128', 'dedicated_standard_n2d_standard_32_16SSD', 'dedicated_standard_n2d_standard_64_24SSD'. Production services scale, Development are fixed size. Azure services don't support Development tier (development, production, dedicated_high_mem, dedicated_high_cpu, dedicated_standard, dedicated_standard_n2d_standard_4, dedicated_standard_n2d_standard_8, dedicated_standard_n2d_standard_32, dedicated_standard_n2d_standard_128, dedicated_standard_n2d_standard_32_16SSD, dedicated_standard_n2d_standard_64_24SSD)</td>
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
    <td>Unique service ID.</td>
</tr>
<tr>
    <td><CopyableCode code="name" /></td>
    <td><code>string</code></td>
    <td>Name of the service. Alphanumerical string with whitespaces up to 50 characters.</td>
</tr>
<tr>
    <td><CopyableCode code="byoc_id" /></td>
    <td><code>string</code></td>
    <td>This is the ID returned after setting up a region for Bring Your Own Cloud (BYOC). When the byocId parameter is specified, the minReplicaMemoryGb and the maxReplicaGb parameters are required too, with values included among the following sizes: 48, 116, 172, 232. (wire: byocId)</td>
</tr>
<tr>
    <td><CopyableCode code="data_warehouse_id" /></td>
    <td><code>string</code></td>
    <td>Data warehouse containing this service (wire: dataWarehouseId)</td>
</tr>
<tr>
    <td><CopyableCode code="encryption_role_id" /></td>
    <td><code>string</code></td>
    <td>The ID of the IAM role used for encryption. This is only available if hasTransparentDataEncryption is true. (wire: encryptionRoleId)</td>
</tr>
<tr>
    <td><CopyableCode code="transparent_data_encryption_key_id" /></td>
    <td><code>string</code></td>
    <td>The ID of the Transparent Data Encryption key used for the service. This is only available if hasTransparentDataEncryption is true. (wire: transparentDataEncryptionKeyId)</td>
</tr>
<tr>
    <td><CopyableCode code="autoscaling_mode" /></td>
    <td><code>string</code></td>
    <td>Configured autoscaling mode. "vertical" runs a fixed replica count while memory scales between minReplicaMemoryGb and maxReplicaMemoryGb; "horizontal" scales the replica count between minReplicas and maxReplicas at a fixed per-replica memory. This is the baseline configuration; the mode currently applied (which may differ while a schedule entry is active) is currentScaling.effectiveAutoscalingMode. (vertical, horizontal) (example: vertical) (wire: autoscalingMode)</td>
</tr>
<tr>
    <td><CopyableCode code="available_private_endpoint_ids" /></td>
    <td><code>array</code></td>
    <td>List of available private endpoints ids that can be attached to the service (wire: availablePrivateEndpointIds)</td>
</tr>
<tr>
    <td><CopyableCode code="clickhouse_version" /></td>
    <td><code>string</code></td>
    <td>ClickHouse version of the service. (wire: clickhouseVersion)</td>
</tr>
<tr>
    <td><CopyableCode code="compliance_type" /></td>
    <td><code>string</code></td>
    <td>Type of regulatory compliance for service. (hipaa, pci) (wire: complianceType)</td>
</tr>
<tr>
    <td><CopyableCode code="created_at" /></td>
    <td><code>string (date-time)</code></td>
    <td>Service creation timestamp. ISO-8601. (wire: createdAt)</td>
</tr>
<tr>
    <td><CopyableCode code="current_scaling" /></td>
    <td><code>object</code></td>
    <td> (wire: currentScaling)</td>
</tr>
<tr>
    <td><CopyableCode code="enable_core_dumps" /></td>
    <td><code>boolean</code></td>
    <td>True if the service's underline infra is enabled for collecting core dumps. This is an experimental feature (wire: enableCoreDumps)</td>
</tr>
<tr>
    <td><CopyableCode code="encryption_assumed_role_identifier" /></td>
    <td><code>string</code></td>
    <td>Optional role to use for disk encryption (wire: encryptionAssumedRoleIdentifier)</td>
</tr>
<tr>
    <td><CopyableCode code="encryption_key" /></td>
    <td><code>string</code></td>
    <td>Optional customer provided disk encryption key (wire: encryptionKey)</td>
</tr>
<tr>
    <td><CopyableCode code="endpoints" /></td>
    <td><code>array</code></td>
    <td>List of all service endpoints.</td>
</tr>
<tr>
    <td><CopyableCode code="has_transparent_data_encryption" /></td>
    <td><code>boolean</code></td>
    <td>True if the service should have the Transparent Data Encryption (TDE) enabled. TDE is only available for ENTERPRISE organizations tiers and can only be enabled at service creation. (wire: hasTransparentDataEncryption)</td>
</tr>
<tr>
    <td><CopyableCode code="iam_role" /></td>
    <td><code>string</code></td>
    <td>IAM role used for accessing objects in s3 (wire: iamRole)</td>
</tr>
<tr>
    <td><CopyableCode code="idle_scaling" /></td>
    <td><code>boolean</code></td>
    <td>When set to true the service is allowed to scale down to zero when idle. True by default. (wire: idleScaling)</td>
</tr>
<tr>
    <td><CopyableCode code="idle_timeout_minutes" /></td>
    <td><code>number</code></td>
    <td>Set minimum idling timeout (in minutes). Must be &gt;= 5 minutes. (wire: idleTimeoutMinutes)</td>
</tr>
<tr>
    <td><CopyableCode code="ip_access_list" /></td>
    <td><code>array</code></td>
    <td>List of IP addresses allowed to access the service (wire: ipAccessList)</td>
</tr>
<tr>
    <td><CopyableCode code="is_primary" /></td>
    <td><code>boolean</code></td>
    <td>True if this service is the primary service in the data warehouse (wire: isPrimary)</td>
</tr>
<tr>
    <td><CopyableCode code="is_readonly" /></td>
    <td><code>boolean</code></td>
    <td>True if this service is read-only. It can only be read-only if a dataWarehouseId is provided. (wire: isReadonly)</td>
</tr>
<tr>
    <td><CopyableCode code="max_replica_memory_gb" /></td>
    <td><code>number</code></td>
    <td>Maximum total memory of each replica during auto-scaling in Gb. A range in vertical autoscaling; equal to minReplicaMemoryGb in horizontal (memory is fixed while the replica count scales). Must be a multiple of 4 and lower than or equal to 120* for non paid services or 356* for paid services.* - maximum replica size subject to cloud provider hardware availability in your selected region.  (wire: maxReplicaMemoryGb)</td>
</tr>
<tr>
    <td><CopyableCode code="max_replicas" /></td>
    <td><code>integer</code></td>
    <td>Maximum number of replicas for horizontal autoscaling. Present only when the service uses horizontal autoscaling. (wire: maxReplicas)</td>
</tr>
<tr>
    <td><CopyableCode code="max_total_memory_gb" /></td>
    <td><code>number</code></td>
    <td>DEPRECATED - inaccurate for services with non-default numbers of replicas. Use `maxReplicaMemoryGb` instead. Maximum memory of three workers during auto-scaling in Gb. Available only for 'production' services. Must be a multiple of 12 and lower than or equal to 360 for non paid services or 1068 for paid services. Always absent for horizontal-autoscaling services (replica count is variable). (wire: maxTotalMemoryGb)</td>
</tr>
<tr>
    <td><CopyableCode code="min_replica_memory_gb" /></td>
    <td><code>number</code></td>
    <td>Minimum total memory of each replica during auto-scaling in Gb. A range in vertical autoscaling; equal to maxReplicaMemoryGb in horizontal (memory is fixed while the replica count scales). Must be a multiple of 4 and greater than or equal to 8. (wire: minReplicaMemoryGb)</td>
</tr>
<tr>
    <td><CopyableCode code="min_replicas" /></td>
    <td><code>integer</code></td>
    <td>Minimum number of replicas for horizontal autoscaling. Present only when the service uses horizontal autoscaling. (wire: minReplicas)</td>
</tr>
<tr>
    <td><CopyableCode code="min_total_memory_gb" /></td>
    <td><code>number</code></td>
    <td>DEPRECATED - inaccurate for services with non-default numbers of replicas. Use `minReplicaMemoryGb` instead. Minimum memory of three workers during auto-scaling in Gb. Available only for 'production' services. Must be a multiple of 12 and greater than or equal to 24. Always absent for horizontal-autoscaling services (replica count is variable). (wire: minTotalMemoryGb)</td>
</tr>
<tr>
    <td><CopyableCode code="num_replicas" /></td>
    <td><code>integer</code></td>
    <td>Number of replicas for the service. The number of replicas must be between 2 and 20 for the first service in a warehouse. Services that are created in an existing warehouse can have a number of replicas as low as 1. Further restrictions may apply based on your organization's tier. It defaults to 1 for the BASIC tier and 3 for the SCALE and ENTERPRISE tiers. Present only when the service uses vertical autoscaling. For horizontal autoscaling, use minReplicas and maxReplicas instead. (wire: numReplicas)</td>
</tr>
<tr>
    <td><CopyableCode code="private_endpoint_ids" /></td>
    <td><code>array</code></td>
    <td>List of private endpoints (wire: privateEndpointIds)</td>
</tr>
<tr>
    <td><CopyableCode code="profile" /></td>
    <td><code>string</code></td>
    <td>Custom instance profile. Only available for ENTERPRISE organization tiers. (v1-default, v1-highmem-xs, v1-highmem-s, v1-highmem-m, v1-highmem-l, v1-highmem-xl)</td>
</tr>
<tr>
    <td><CopyableCode code="provider" /></td>
    <td><code>string</code></td>
    <td>Cloud provider (aws, gcp, azure)</td>
</tr>
<tr>
    <td><CopyableCode code="region" /></td>
    <td><code>string</code></td>
    <td>Service region. (ap-northeast-1, ap-northeast-2, ap-south-1, ap-southeast-1, ap-southeast-2, ca-central-1, eu-central-1, eu-west-1, eu-west-2, il-central-1, us-east-1, us-east-2, us-west-2, us-east1, us-central1, europe-west2, europe-west4, asia-southeast1, asia-northeast1, eastus, eastus2, westus3, germanywestcentral, centralus)</td>
</tr>
<tr>
    <td><CopyableCode code="release_channel" /></td>
    <td><code>string</code></td>
    <td>Select fast if you want to get new ClickHouse releases as soon as they are available. You'll get new features faster, but with a higher risk of bugs. Select slow if you would like to defer releases to give yourself more time to test. This feature is only available for production services. default is the regular release channel. (slow, default, fast) (wire: releaseChannel)</td>
</tr>
<tr>
    <td><CopyableCode code="replica_memory_gb" /></td>
    <td><code>number</code></td>
    <td>Fixed memory per replica in Gb for horizontal autoscaling. Present only when the service uses horizontal autoscaling. Must be a multiple of 4, at least 8 Gb, and at most 120 Gb for non paid services or 356 Gb for paid services. (wire: replicaMemoryGb)</td>
</tr>
<tr>
    <td><CopyableCode code="scaling_schedule" /></td>
    <td><code>object</code></td>
    <td> (wire: scalingSchedule)</td>
</tr>
<tr>
    <td><CopyableCode code="state" /></td>
    <td><code>string</code></td>
    <td>Current state of the service. (starting, stopping, terminating, softdeleting, awaking, partially_running, provisioning, running, stopped, terminated, softdeleted, degraded, failed, idle)</td>
</tr>
<tr>
    <td><CopyableCode code="tags" /></td>
    <td><code>array</code></td>
    <td>Tags associated with the service.</td>
</tr>
<tr>
    <td><CopyableCode code="tier" /></td>
    <td><code>string</code></td>
    <td>DEPRECATED for BASIC, SCALE and ENTERPRISE organization tiers. Use `minReplicaMemoryGb`, `maxReplicaMemoryGb`, and `numReplicas` instead. Tier of the service: 'development', 'production', 'dedicated_high_mem', 'dedicated_high_cpu', 'dedicated_standard', 'dedicated_standard_n2d_standard_4', 'dedicated_standard_n2d_standard_8', 'dedicated_standard_n2d_standard_32', 'dedicated_standard_n2d_standard_128', 'dedicated_standard_n2d_standard_32_16SSD', 'dedicated_standard_n2d_standard_64_24SSD'. Production services scale, Development are fixed size. Azure services don't support Development tier (development, production, dedicated_high_mem, dedicated_high_cpu, dedicated_standard, dedicated_standard_n2d_standard_4, dedicated_standard_n2d_standard_8, dedicated_standard_n2d_standard_32, dedicated_standard_n2d_standard_128, dedicated_standard_n2d_standard_32_16SSD, dedicated_standard_n2d_standard_64_24SSD)</td>
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
    <td><a href="#parameter-service_id"><code>service_id</code></a>, <a href="#parameter-organization_id"><code>organization_id</code></a></td>
    <td></td>
    <td>Returns a service that belongs to the organization</td>
</tr>
<tr>
    <td><a href="#list"><CopyableCode code="list" /></a></td>
    <td><CopyableCode code="select" /></td>
    <td><a href="#parameter-organization_id"><code>organization_id</code></a></td>
    <td><a href="#parameter-filter"><code>filter</code></a></td>
    <td>Returns a list of all services in the organization.</td>
</tr>
<tr>
    <td><a href="#create"><CopyableCode code="create" /></a></td>
    <td><CopyableCode code="insert" /></td>
    <td><a href="#parameter-organization_id"><code>organization_id</code></a></td>
    <td></td>
    <td>Creates a new service in the organization, and returns the current service state and a password to access the service. The service is started asynchronously.</td>
</tr>
<tr>
    <td><a href="#update"><CopyableCode code="update" /></a></td>
    <td><CopyableCode code="update" /></td>
    <td><a href="#parameter-service_id"><code>service_id</code></a>, <a href="#parameter-organization_id"><code>organization_id</code></a></td>
    <td></td>
    <td>Updates basic service details like service name or IP access list.</td>
</tr>
<tr>
    <td><a href="#delete"><CopyableCode code="delete" /></a></td>
    <td><CopyableCode code="delete" /></td>
    <td><a href="#parameter-service_id"><code>service_id</code></a>, <a href="#parameter-organization_id"><code>organization_id</code></a></td>
    <td></td>
    <td>Deletes the service. The service must be in stopped state and is deleted asynchronously after this method call.</td>
</tr>
<tr>
    <td><a href="#update_state"><CopyableCode code="update_state" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-serviceId"><code>serviceId</code></a>, <a href="#parameter-organization_id"><code>organization_id</code></a></td>
    <td></td>
    <td>Starts or stop service</td>
</tr>
<tr>
    <td><a href="#update_password"><CopyableCode code="update_password" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-serviceId"><code>serviceId</code></a>, <a href="#parameter-organization_id"><code>organization_id</code></a></td>
    <td></td>
    <td>Sets a new password for the service</td>
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
<tr id="parameter-organization_id">
    <td><CopyableCode code="organization_id" /></td>
    <td><code>string</code></td>
    <td>ClickHouse Cloud organization ID. Resolved from the CLICKHOUSE_ORG_ID environment variable when it is set (x-stackQL-envVar); otherwise it must be supplied on every query as WHERE organization_id = &lt;uuid&gt;. A WHERE value always takes precedence over the environment. (x-stackQL-envVar: CLICKHOUSE_ORG_ID)</td>
</tr>
<tr id="parameter-serviceId">
    <td><CopyableCode code="serviceId" /></td>
    <td><code>string (uuid)</code></td>
    <td>ID of the service to update password.</td>
</tr>
<tr id="parameter-service_id">
    <td><CopyableCode code="service_id" /></td>
    <td><code>string (uuid)</code></td>
    <td>ID of the service to delete. (wire: serviceId)</td>
</tr>
<tr id="parameter-filter">
    <td><CopyableCode code="filter" /></td>
    <td><code>array</code></td>
    <td>Filter criteria to apply when retrieving the resource. Currently, only filtering by resource tags is supported. (example: &#91;tag:Environment=Production, tag:Department=Engineering, tag:isActive&#93;)</td>
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

Returns a service that belongs to the organization

```sql
SELECT
id,
name,
byoc_id,
data_warehouse_id,
encryption_role_id,
transparent_data_encryption_key_id,
autoscaling_mode,
available_private_endpoint_ids,
clickhouse_version,
compliance_type,
created_at,
current_scaling,
enable_core_dumps,
encryption_assumed_role_identifier,
encryption_key,
endpoints,
has_transparent_data_encryption,
iam_role,
idle_scaling,
idle_timeout_minutes,
ip_access_list,
is_primary,
is_readonly,
max_replica_memory_gb,
max_replicas,
max_total_memory_gb,
min_replica_memory_gb,
min_replicas,
min_total_memory_gb,
num_replicas,
private_endpoint_ids,
profile,
provider,
region,
release_channel,
replica_memory_gb,
scaling_schedule,
state,
tags,
tier
FROM clickhouse.services.services
WHERE service_id = '{{ service_id }}' -- required
AND organization_id = '{{ organization_id }}' -- required unless CLICKHOUSE_ORG_ID is set
;
```
</TabItem>
<TabItem value="list">

Returns a list of all services in the organization.

```sql
SELECT
id,
name,
byoc_id,
data_warehouse_id,
encryption_role_id,
transparent_data_encryption_key_id,
autoscaling_mode,
available_private_endpoint_ids,
clickhouse_version,
compliance_type,
created_at,
current_scaling,
enable_core_dumps,
encryption_assumed_role_identifier,
encryption_key,
endpoints,
has_transparent_data_encryption,
iam_role,
idle_scaling,
idle_timeout_minutes,
ip_access_list,
is_primary,
is_readonly,
max_replica_memory_gb,
max_replicas,
max_total_memory_gb,
min_replica_memory_gb,
min_replicas,
min_total_memory_gb,
num_replicas,
private_endpoint_ids,
profile,
provider,
region,
release_channel,
replica_memory_gb,
scaling_schedule,
state,
tags,
tier
FROM clickhouse.services.services
WHERE organization_id = '{{ organization_id }}' -- required unless CLICKHOUSE_ORG_ID is set
AND filter = '{{ filter }}'
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

Creates a new service in the organization, and returns the current service state and a password to access the service. The service is started asynchronously.

```sql
INSERT INTO clickhouse.services.services (
name,
provider,
region,
tier,
ip_access_list,
min_total_memory_gb,
max_total_memory_gb,
autoscaling_mode,
min_replica_memory_gb,
max_replica_memory_gb,
num_replicas,
min_replicas,
max_replicas,
idle_scaling,
idle_timeout_minutes,
is_readonly,
data_warehouse_id,
backup_id,
encryption_key,
encryption_assumed_role_identifier,
private_endpoint_ids,
private_preview_terms_checked,
release_channel,
byoc_id,
has_transparent_data_encryption,
endpoints,
profile,
compliance_type,
tags,
enable_core_dumps,
organization_id
)
SELECT 
'{{ name }}',
'{{ provider }}',
'{{ region }}',
'{{ tier }}',
'{{ ip_access_list }}',
{{ min_total_memory_gb }},
{{ max_total_memory_gb }},
'{{ autoscaling_mode }}',
{{ min_replica_memory_gb }},
{{ max_replica_memory_gb }},
{{ num_replicas }},
{{ min_replicas }},
{{ max_replicas }},
{{ idle_scaling }},
{{ idle_timeout_minutes }},
{{ is_readonly }},
'{{ data_warehouse_id }}',
'{{ backup_id }}',
'{{ encryption_key }}',
'{{ encryption_assumed_role_identifier }}',
'{{ private_endpoint_ids }}',
{{ private_preview_terms_checked }},
'{{ release_channel }}',
'{{ byoc_id }}',
{{ has_transparent_data_encryption }},
'{{ endpoints }}',
'{{ profile }}',
'{{ compliance_type }}',
'{{ tags }}',
{{ enable_core_dumps }},
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
- name: services
  props:
    - name: organization_id
      value: "{{ organization_id }}"
      description: Required parameter for the services resource.
    - name: name
      value: "{{ name }}"
      description: |
        Name of the service. Alphanumerical string with whitespaces up to 50 characters.
    - name: provider
      value: "{{ provider }}"
      description: |
        Cloud provider
      valid_values: ['aws', 'gcp', 'azure']
    - name: region
      value: "{{ region }}"
      description: |
        Service region.
      valid_values: ['ap-northeast-1', 'ap-northeast-2', 'ap-south-1', 'ap-southeast-1', 'ap-southeast-2', 'ca-central-1', 'eu-central-1', 'eu-west-1', 'eu-west-2', 'il-central-1', 'us-east-1', 'us-east-2', 'us-west-2', 'us-east1', 'us-central1', 'europe-west2', 'europe-west4', 'asia-southeast1', 'asia-northeast1', 'eastus', 'eastus2', 'westus3', 'germanywestcentral', 'centralus']
    - name: tier
      value: "{{ tier }}"
      description: |
        DEPRECATED for BASIC, SCALE and ENTERPRISE organization tiers. Use \`minReplicaMemoryGb\`, \`maxReplicaMemoryGb\`, and \`numReplicas\` instead. Tier of the service: 'development', 'production', 'dedicated_high_mem', 'dedicated_high_cpu', 'dedicated_standard', 'dedicated_standard_n2d_standard_4', 'dedicated_standard_n2d_standard_8', 'dedicated_standard_n2d_standard_32', 'dedicated_standard_n2d_standard_128', 'dedicated_standard_n2d_standard_32_16SSD', 'dedicated_standard_n2d_standard_64_24SSD'. Production services scale, Development are fixed size. Azure services don't support Development tier
      valid_values: ['development', 'production', 'dedicated_high_mem', 'dedicated_high_cpu', 'dedicated_standard', 'dedicated_standard_n2d_standard_4', 'dedicated_standard_n2d_standard_8', 'dedicated_standard_n2d_standard_32', 'dedicated_standard_n2d_standard_128', 'dedicated_standard_n2d_standard_32_16SSD', 'dedicated_standard_n2d_standard_64_24SSD']
    - name: ip_access_list
      description: |
        List of IP addresses allowed to access the service
      value:
        - source: "{{ source }}"
          description: "{{ description }}"
    - name: min_total_memory_gb
      value: {{ min_total_memory_gb }}
      description: |
        DEPRECATED - inaccurate for services with non-default numbers of replicas. Use \`minReplicaMemoryGb\` instead. Minimum memory of three workers during auto-scaling in Gb. Available only for 'production' services. Must be a multiple of 12 and greater than or equal to 24. Always absent for horizontal-autoscaling services (replica count is variable).
    - name: max_total_memory_gb
      value: {{ max_total_memory_gb }}
      description: |
        DEPRECATED - inaccurate for services with non-default numbers of replicas. Use \`maxReplicaMemoryGb\` instead. Maximum memory of three workers during auto-scaling in Gb. Available only for 'production' services. Must be a multiple of 12 and lower than or equal to 360 for non paid services or 1068 for paid services. Always absent for horizontal-autoscaling services (replica count is variable).
    - name: autoscaling_mode
      value: "{{ autoscaling_mode }}"
      description: |
        Autoscaling mode. "vertical" (the default when omitted) runs a fixed replica count while memory scales between minReplicaMemoryGb and maxReplicaMemoryGb; "horizontal" scales the replica count between minReplicas and maxReplicas at a fixed per-replica memory (minReplicaMemoryGb equal to maxReplicaMemoryGb). Horizontal requires the feature to be enabled for the organization.
      valid_values: ['vertical', 'horizontal']
    - name: min_replica_memory_gb
      value: {{ min_replica_memory_gb }}
      description: |
        Minimum total memory of each replica during auto-scaling in Gb. A range in vertical autoscaling; equal to maxReplicaMemoryGb in horizontal (memory is fixed while the replica count scales). Must be a multiple of 4 and greater than or equal to 8.
    - name: max_replica_memory_gb
      value: {{ max_replica_memory_gb }}
      description: |
        Maximum total memory of each replica during auto-scaling in Gb. A range in vertical autoscaling; equal to minReplicaMemoryGb in horizontal (memory is fixed while the replica count scales). Must be a multiple of 4 and lower than or equal to 120* for non paid services or 356* for paid services.* - maximum replica size subject to cloud provider hardware availability in your selected region.
    - name: num_replicas
      value: {{ num_replicas }}
      description: |
        Fixed replica count for vertical autoscaling (autoscalingMode "vertical" or omitted). Mutually exclusive with minReplicas/maxReplicas.
    - name: min_replicas
      value: {{ min_replicas }}
      description: |
        Minimum number of replicas. A minReplicas/maxReplicas band scales the replica count in horizontal autoscaling (autoscalingMode "horizontal"). Must be provided together with maxReplicas. Mutually exclusive with numReplicas. Requires horizontal autoscaling to be enabled for the organization, unless autoscalingMode is omitted or "vertical" and minReplicas equals maxReplicas (an equal band is then an accepted vertical fixed count and needs no horizontal entitlement).
    - name: max_replicas
      value: {{ max_replicas }}
      description: |
        Maximum number of replicas. A minReplicas/maxReplicas band scales the replica count in horizontal autoscaling (autoscalingMode "horizontal"). Must be provided together with minReplicas. Mutually exclusive with numReplicas. Requires horizontal autoscaling to be enabled for the organization, unless autoscalingMode is omitted or "vertical" and minReplicas equals maxReplicas (an equal band is then an accepted vertical fixed count and needs no horizontal entitlement).
    - name: idle_scaling
      value: {{ idle_scaling }}
      description: |
        When set to true the service is allowed to scale down to zero when idle. True by default.
    - name: idle_timeout_minutes
      value: {{ idle_timeout_minutes }}
      description: |
        Set minimum idling timeout (in minutes). Must be >= 5 minutes.
    - name: is_readonly
      value: {{ is_readonly }}
      description: |
        True if this service is read-only. It can only be read-only if a dataWarehouseId is provided.
    - name: data_warehouse_id
      value: "{{ data_warehouse_id }}"
      description: |
        Data warehouse containing this service
    - name: backup_id
      value: "{{ backup_id }}"
      description: |
        Optional backup ID used as an initial state for the new service. When used the region and the tier of the new instance must be the same as the values of the original instance.
    - name: encryption_key
      value: "{{ encryption_key }}"
      description: |
        Optional customer provided disk encryption key
    - name: encryption_assumed_role_identifier
      value: "{{ encryption_assumed_role_identifier }}"
      description: |
        Optional role to use for disk encryption
    - name: private_endpoint_ids
      value:
        - "{{ private_endpoint_ids }}"
      description: |
        DEPRECATED. To associate the service with private endpoints, first create the service, then use the \`Update Service Basic Details\` endpoint with the \`privateEndpointIds\` field to modify private endpoints.
    - name: private_preview_terms_checked
      value: {{ private_preview_terms_checked }}
      description: |
        Accept the private preview terms and conditions. It is only needed when creating the first service in the organization in case of a private preview
    - name: release_channel
      value: "{{ release_channel }}"
      description: |
        Select fast if you want to get new ClickHouse releases as soon as they are available. You'll get new features faster, but with a higher risk of bugs. Select slow if you would like to defer releases to give yourself more time to test. This feature is only available for production services. default is the regular release channel.
      valid_values: ['slow', 'default', 'fast']
    - name: byoc_id
      value: "{{ byoc_id }}"
      description: |
        This is the ID returned after setting up a region for Bring Your Own Cloud (BYOC). When the byocId parameter is specified, the minReplicaMemoryGb and the maxReplicaGb parameters are required too, with values included among the following sizes: 48, 116, 172, 232.
    - name: has_transparent_data_encryption
      value: {{ has_transparent_data_encryption }}
      description: |
        True if the service should have the Transparent Data Encryption (TDE) enabled. TDE is only available for ENTERPRISE organizations tiers and can only be enabled at service creation.
    - name: endpoints
      description: |
        List of service endpoints to enable or disable
      value:
        - protocol: "{{ protocol }}"
          enabled: {{ enabled }}
    - name: profile
      value: "{{ profile }}"
      description: |
        Custom instance profile. Only available for ENTERPRISE organization tiers.
      valid_values: ['v1-default', 'v1-highmem-xs', 'v1-highmem-s', 'v1-highmem-m', 'v1-highmem-l', 'v1-highmem-xl']
    - name: compliance_type
      value: "{{ compliance_type }}"
      description: |
        Type of regulatory compliance for service.
      valid_values: ['hipaa', 'pci']
    - name: tags
      description: |
        Tags associated with the service.
      value:
        - key: "{{ key }}"
          value: "{{ value }}"
    - name: enable_core_dumps
      value: {{ enable_core_dumps }}
      description: |
        Enables the underlying infra for collecting core dumps. Default is enabled.
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

Updates basic service details like service name or IP access list.

```sql
UPDATE clickhouse.services.services
SET 
name = '{{ name }}',
ip_access_list = '{{ ip_access_list }}',
private_endpoint_ids = '{{ private_endpoint_ids }}',
release_channel = '{{ release_channel }}',
endpoints = '{{ endpoints }}',
transparent_data_encryption_key_id = '{{ transparent_data_encryption_key_id }}',
tags = '{{ tags }}',
enable_core_dumps = {{ enable_core_dumps }}
WHERE 
service_id = '{{ service_id }}' --required
AND organization_id = '{{ organization_id }}' --required unless CLICKHOUSE_ORG_ID is set
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

Deletes the service. The service must be in stopped state and is deleted asynchronously after this method call.

```sql
DELETE FROM clickhouse.services.services
WHERE service_id = '{{ service_id }}' --required
AND organization_id = '{{ organization_id }}' --required unless CLICKHOUSE_ORG_ID is set
;
```
</TabItem>
</Tabs>


## Lifecycle Methods

EXEC variables use wire (API) names.

<Tabs
    defaultValue="update_state"
    values={[
        { label: 'update_state', value: 'update_state' },
        { label: 'update_password', value: 'update_password' }
    ]}
>
<TabItem value="update_state">

Starts or stop service

```sql
EXEC clickhouse.services.services.update_state 
@serviceId='{{ serviceId }}' --required, 
@organization_id='{{ organization_id }}' --required unless CLICKHOUSE_ORG_ID is set 
@@json=
'{
"command": "{{ command }}"
}'
;
```
</TabItem>
<TabItem value="update_password">

Sets a new password for the service

```sql
EXEC clickhouse.services.services.update_password 
@serviceId='{{ serviceId }}' --required, 
@organization_id='{{ organization_id }}' --required unless CLICKHOUSE_ORG_ID is set 
@@json=
'{
"newPasswordHash": "{{ newPasswordHash }}", 
"newDoubleSha1Hash": "{{ newDoubleSha1Hash }}"
}'
;
```
</TabItem>
</Tabs>

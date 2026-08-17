--- 
title: reverse_private_endpoints
hide_title: false
hide_table_of_contents: false
keywords:
  - reverse_private_endpoints
  - clickpipes
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

Creates, updates, deletes, gets or lists a <code>reverse_private_endpoints</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="reverse_private_endpoints" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="clickhouse.clickpipes.reverse_private_endpoints" /></td></tr>
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
    <td>Reverse private endpoint ID. (example: 12345678-1234-1234-1234-123456789012)</td>
</tr>
<tr>
    <td><CopyableCode code="endpoint_id" /></td>
    <td><code>string</code></td>
    <td>Reverse private endpoint endpoint ID. (example: vpce-12345678901234567) (wire: endpointId)</td>
</tr>
<tr>
    <td><CopyableCode code="service_id" /></td>
    <td><code>string (uuid)</code></td>
    <td>ClickHouse service ID reverse private endpoint is associated with. (example: 12345678-1234-1234-1234-123456789012) (wire: serviceId)</td>
</tr>
<tr>
    <td><CopyableCode code="vpc_resource_configuration_id" /></td>
    <td><code>string</code></td>
    <td>VPC resource configuration ID. Required for VPC_RESOURCE type. (example: rcfg-12345678901234567) (wire: vpcResourceConfigurationId)</td>
</tr>
<tr>
    <td><CopyableCode code="vpc_endpoint_service_name" /></td>
    <td><code>string</code></td>
    <td>VPC endpoint service name. (example: com.amazonaws.vpce.us-east-1.vpce-svc-12345678901234567) (wire: vpcEndpointServiceName)</td>
</tr>
<tr>
    <td><CopyableCode code="custom_private_dns_mappings" /></td>
    <td><code>array</code></td>
    <td>Optional private DNS names for Reverse Private Endpoint. Can be used as data source destination address. Must be unique across the ClickHouse service. Generally available for Google Private Service Connect (PSC). For AWS PrivateLink (VPC endpoint service and VPC resource), available in Private Preview; contact ClickHouse support to enable it for your service. Not supported for MSK multi-VPC. Supports exact names and leading wildcard names such as *.example.com (wire: customPrivateDnsMappings)</td>
</tr>
<tr>
    <td><CopyableCode code="description" /></td>
    <td><code>string</code></td>
    <td>Reverse private endpoint description. Maximum length is 255 characters. (example: My reverse private endpoint)</td>
</tr>
<tr>
    <td><CopyableCode code="dns_names" /></td>
    <td><code>array</code></td>
    <td>Reverse private endpoint internal DNS names. (wire: dnsNames)</td>
</tr>
<tr>
    <td><CopyableCode code="gcp_service_attachment" /></td>
    <td><code>string</code></td>
    <td>Private Preview. GCP PSC service attachment URI. Required for GCP_PSC_SERVICE_ATTACHMENT type. Format: projects/&#123;project&#125;/regions/&#123;region&#125;/serviceAttachments/&#123;name&#125;. (example: projects/my-project/regions/us-central1/serviceAttachments/my-service) (wire: gcpServiceAttachment)</td>
</tr>
<tr>
    <td><CopyableCode code="msk_authentication" /></td>
    <td><code>string</code></td>
    <td>MSK cluster authentication type. Required for MSK_MULTI_VPC type. (SASL_IAM, SASL_SCRAM) (example: SASL_IAM) (wire: mskAuthentication)</td>
</tr>
<tr>
    <td><CopyableCode code="msk_cluster_arn" /></td>
    <td><code>string</code></td>
    <td>MSK cluster ARN. Required for MSK_MULTI_VPC type. (example: arn:aws:kafka:us-east-1:123456789012:cluster/my-cluster) (wire: mskClusterArn)</td>
</tr>
<tr>
    <td><CopyableCode code="private_dns_names" /></td>
    <td><code>array</code></td>
    <td>Reverse private endpoint private DNS names. (wire: privateDnsNames)</td>
</tr>
<tr>
    <td><CopyableCode code="status" /></td>
    <td><code>string</code></td>
    <td>Reverse private endpoint status. (Unknown, Provisioning, Deleting, Ready, Failed, PendingAcceptance, Rejected, Expired) (example: Ready)</td>
</tr>
<tr>
    <td><CopyableCode code="type" /></td>
    <td><code>string</code></td>
    <td>Reverse private endpoint type. (VPC_ENDPOINT_SERVICE, VPC_RESOURCE, MSK_MULTI_VPC, GCP_PSC_SERVICE_ATTACHMENT) (example: VPC_ENDPOINT_SERVICE)</td>
</tr>
<tr>
    <td><CopyableCode code="vpc_resource_share_arn" /></td>
    <td><code>string</code></td>
    <td>VPC resource share ARN. Required for VPC_RESOURCE type. (example: arn:aws:ram:us-east-1:123456789012:resource-share/share-12345678901234567) (wire: vpcResourceShareArn)</td>
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
    <td>Reverse private endpoint ID. (example: 12345678-1234-1234-1234-123456789012)</td>
</tr>
<tr>
    <td><CopyableCode code="endpoint_id" /></td>
    <td><code>string</code></td>
    <td>Reverse private endpoint endpoint ID. (example: vpce-12345678901234567) (wire: endpointId)</td>
</tr>
<tr>
    <td><CopyableCode code="service_id" /></td>
    <td><code>string (uuid)</code></td>
    <td>ClickHouse service ID reverse private endpoint is associated with. (example: 12345678-1234-1234-1234-123456789012) (wire: serviceId)</td>
</tr>
<tr>
    <td><CopyableCode code="vpc_resource_configuration_id" /></td>
    <td><code>string</code></td>
    <td>VPC resource configuration ID. Required for VPC_RESOURCE type. (example: rcfg-12345678901234567) (wire: vpcResourceConfigurationId)</td>
</tr>
<tr>
    <td><CopyableCode code="vpc_endpoint_service_name" /></td>
    <td><code>string</code></td>
    <td>VPC endpoint service name. (example: com.amazonaws.vpce.us-east-1.vpce-svc-12345678901234567) (wire: vpcEndpointServiceName)</td>
</tr>
<tr>
    <td><CopyableCode code="custom_private_dns_mappings" /></td>
    <td><code>array</code></td>
    <td>Optional private DNS names for Reverse Private Endpoint. Can be used as data source destination address. Must be unique across the ClickHouse service. Generally available for Google Private Service Connect (PSC). For AWS PrivateLink (VPC endpoint service and VPC resource), available in Private Preview; contact ClickHouse support to enable it for your service. Not supported for MSK multi-VPC. Supports exact names and leading wildcard names such as *.example.com (wire: customPrivateDnsMappings)</td>
</tr>
<tr>
    <td><CopyableCode code="description" /></td>
    <td><code>string</code></td>
    <td>Reverse private endpoint description. Maximum length is 255 characters. (example: My reverse private endpoint)</td>
</tr>
<tr>
    <td><CopyableCode code="dns_names" /></td>
    <td><code>array</code></td>
    <td>Reverse private endpoint internal DNS names. (wire: dnsNames)</td>
</tr>
<tr>
    <td><CopyableCode code="gcp_service_attachment" /></td>
    <td><code>string</code></td>
    <td>Private Preview. GCP PSC service attachment URI. Required for GCP_PSC_SERVICE_ATTACHMENT type. Format: projects/&#123;project&#125;/regions/&#123;region&#125;/serviceAttachments/&#123;name&#125;. (example: projects/my-project/regions/us-central1/serviceAttachments/my-service) (wire: gcpServiceAttachment)</td>
</tr>
<tr>
    <td><CopyableCode code="msk_authentication" /></td>
    <td><code>string</code></td>
    <td>MSK cluster authentication type. Required for MSK_MULTI_VPC type. (SASL_IAM, SASL_SCRAM) (example: SASL_IAM) (wire: mskAuthentication)</td>
</tr>
<tr>
    <td><CopyableCode code="msk_cluster_arn" /></td>
    <td><code>string</code></td>
    <td>MSK cluster ARN. Required for MSK_MULTI_VPC type. (example: arn:aws:kafka:us-east-1:123456789012:cluster/my-cluster) (wire: mskClusterArn)</td>
</tr>
<tr>
    <td><CopyableCode code="private_dns_names" /></td>
    <td><code>array</code></td>
    <td>Reverse private endpoint private DNS names. (wire: privateDnsNames)</td>
</tr>
<tr>
    <td><CopyableCode code="status" /></td>
    <td><code>string</code></td>
    <td>Reverse private endpoint status. (Unknown, Provisioning, Deleting, Ready, Failed, PendingAcceptance, Rejected, Expired) (example: Ready)</td>
</tr>
<tr>
    <td><CopyableCode code="type" /></td>
    <td><code>string</code></td>
    <td>Reverse private endpoint type. (VPC_ENDPOINT_SERVICE, VPC_RESOURCE, MSK_MULTI_VPC, GCP_PSC_SERVICE_ATTACHMENT) (example: VPC_ENDPOINT_SERVICE)</td>
</tr>
<tr>
    <td><CopyableCode code="vpc_resource_share_arn" /></td>
    <td><code>string</code></td>
    <td>VPC resource share ARN. Required for VPC_RESOURCE type. (example: arn:aws:ram:us-east-1:123456789012:resource-share/share-12345678901234567) (wire: vpcResourceShareArn)</td>
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
    <td><a href="#parameter-service_id"><code>service_id</code></a>, <a href="#parameter-reverse_private_endpoint_id"><code>reverse_private_endpoint_id</code></a>, <a href="#parameter-organization_id"><code>organization_id</code></a></td>
    <td></td>
    <td>Returns the reverse private endpoint with the specified ID.</td>
</tr>
<tr>
    <td><a href="#list"><CopyableCode code="list" /></a></td>
    <td><CopyableCode code="select" /></td>
    <td><a href="#parameter-service_id"><code>service_id</code></a>, <a href="#parameter-organization_id"><code>organization_id</code></a></td>
    <td></td>
    <td>Returns a list of reverse private endpoints for the specified service.</td>
</tr>
<tr>
    <td><a href="#create"><CopyableCode code="create" /></a></td>
    <td><CopyableCode code="insert" /></td>
    <td><a href="#parameter-service_id"><code>service_id</code></a>, <a href="#parameter-organization_id"><code>organization_id</code></a></td>
    <td></td>
    <td>Create a new reverse private endpoint.</td>
</tr>
<tr>
    <td><a href="#update"><CopyableCode code="update" /></a></td>
    <td><CopyableCode code="update" /></td>
    <td><a href="#parameter-service_id"><code>service_id</code></a>, <a href="#parameter-reverse_private_endpoint_id"><code>reverse_private_endpoint_id</code></a>, <a href="#parameter-organization_id"><code>organization_id</code></a></td>
    <td></td>
    <td>Update mutable fields for an existing reverse private endpoint. customPrivateDnsMappings is a full replacement list. Use an empty array to clear mappings.</td>
</tr>
<tr>
    <td><a href="#delete"><CopyableCode code="delete" /></a></td>
    <td><CopyableCode code="delete" /></td>
    <td><a href="#parameter-service_id"><code>service_id</code></a>, <a href="#parameter-reverse_private_endpoint_id"><code>reverse_private_endpoint_id</code></a>, <a href="#parameter-organization_id"><code>organization_id</code></a></td>
    <td></td>
    <td>Delete the reverse private endpoint with the specified ID.</td>
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
<tr id="parameter-reverse_private_endpoint_id">
    <td><CopyableCode code="reverse_private_endpoint_id" /></td>
    <td><code>string (uuid)</code></td>
    <td>ID of the reverse private endpoint to delete. (wire: reversePrivateEndpointId)</td>
</tr>
<tr id="parameter-service_id">
    <td><CopyableCode code="service_id" /></td>
    <td><code>string (uuid)</code></td>
    <td>ID of the service that owns the Reverse Private Endpoint. (wire: serviceId)</td>
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

Returns the reverse private endpoint with the specified ID.

```sql
SELECT
id,
endpoint_id,
service_id,
vpc_resource_configuration_id,
vpc_endpoint_service_name,
custom_private_dns_mappings,
description,
dns_names,
gcp_service_attachment,
msk_authentication,
msk_cluster_arn,
private_dns_names,
status,
type,
vpc_resource_share_arn
FROM clickhouse.clickpipes.reverse_private_endpoints
WHERE service_id = '{{ service_id }}' -- required
AND reverse_private_endpoint_id = '{{ reverse_private_endpoint_id }}' -- required
AND organization_id = '{{ organization_id }}' -- required unless CLICKHOUSE_ORG_ID is set
;
```
</TabItem>
<TabItem value="list">

Returns a list of reverse private endpoints for the specified service.

```sql
SELECT
id,
endpoint_id,
service_id,
vpc_resource_configuration_id,
vpc_endpoint_service_name,
custom_private_dns_mappings,
description,
dns_names,
gcp_service_attachment,
msk_authentication,
msk_cluster_arn,
private_dns_names,
status,
type,
vpc_resource_share_arn
FROM clickhouse.clickpipes.reverse_private_endpoints
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

Create a new reverse private endpoint.

```sql
INSERT INTO clickhouse.clickpipes.reverse_private_endpoints (
description,
type,
vpc_endpoint_service_name,
vpc_resource_configuration_id,
vpc_resource_share_arn,
msk_cluster_arn,
msk_authentication,
gcp_service_attachment,
custom_private_dns_mappings,
service_id,
organization_id
)
SELECT 
'{{ description }}',
'{{ type }}',
'{{ vpc_endpoint_service_name }}',
'{{ vpc_resource_configuration_id }}',
'{{ vpc_resource_share_arn }}',
'{{ msk_cluster_arn }}',
'{{ msk_authentication }}',
'{{ gcp_service_attachment }}',
'{{ custom_private_dns_mappings }}',
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
- name: reverse_private_endpoints
  props:
    - name: service_id
      value: "{{ service_id }}"
      description: Required parameter for the reverse_private_endpoints resource.
    - name: organization_id
      value: "{{ organization_id }}"
      description: Required parameter for the reverse_private_endpoints resource.
    - name: description
      value: "{{ description }}"
      description: |
        Reverse private endpoint description. Maximum length is 255 characters.
    - name: type
      value: "{{ type }}"
      description: |
        Reverse private endpoint type.
      valid_values: ['VPC_ENDPOINT_SERVICE', 'VPC_RESOURCE', 'MSK_MULTI_VPC', 'GCP_PSC_SERVICE_ATTACHMENT']
    - name: vpc_endpoint_service_name
      value: "{{ vpc_endpoint_service_name }}"
      description: |
        VPC endpoint service name.
    - name: vpc_resource_configuration_id
      value: "{{ vpc_resource_configuration_id }}"
      description: |
        VPC resource configuration ID. Required for VPC_RESOURCE type.
    - name: vpc_resource_share_arn
      value: "{{ vpc_resource_share_arn }}"
      description: |
        VPC resource share ARN. Required for VPC_RESOURCE type.
    - name: msk_cluster_arn
      value: "{{ msk_cluster_arn }}"
      description: |
        MSK cluster ARN. Required for MSK_MULTI_VPC type.
    - name: msk_authentication
      value: "{{ msk_authentication }}"
      description: |
        MSK cluster authentication type. Required for MSK_MULTI_VPC type.
      valid_values: ['SASL_IAM', 'SASL_SCRAM']
    - name: gcp_service_attachment
      value: "{{ gcp_service_attachment }}"
      description: |
        Private Preview. GCP PSC service attachment URI. Required for GCP_PSC_SERVICE_ATTACHMENT type. Format: projects/{project}/regions/{region}/serviceAttachments/{name}.
    - name: custom_private_dns_mappings
      description: |
        Optional private DNS names for Reverse Private Endpoint. Can be used as data source destination address. Must be unique across the ClickHouse service.
        Generally available for Google Private Service Connect (PSC). For AWS PrivateLink (VPC endpoint service and VPC resource), available in Private Preview; contact ClickHouse support to enable it for your service. Not supported for MSK multi-VPC.
        Supports exact names and leading wildcard names such as *.example.com
      value:
        - privateDnsName: "{{ privateDnsName }}"
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

Update mutable fields for an existing reverse private endpoint. customPrivateDnsMappings is a full replacement list. Use an empty array to clear mappings.

```sql
UPDATE clickhouse.clickpipes.reverse_private_endpoints
SET 
custom_private_dns_mappings = '{{ custom_private_dns_mappings }}'
WHERE 
service_id = '{{ service_id }}' --required
AND reverse_private_endpoint_id = '{{ reverse_private_endpoint_id }}' --required
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

Delete the reverse private endpoint with the specified ID.

```sql
DELETE FROM clickhouse.clickpipes.reverse_private_endpoints
WHERE service_id = '{{ service_id }}' --required
AND reverse_private_endpoint_id = '{{ reverse_private_endpoint_id }}' --required
AND organization_id = '{{ organization_id }}' --required unless CLICKHOUSE_ORG_ID is set
;
```
</TabItem>
</Tabs>

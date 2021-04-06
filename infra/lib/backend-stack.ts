import * as cdk from '@aws-cdk/core';
import * as awsAPIGatewayDynamoDB from '@aws-solutions-constructs/aws-apigateway-dynamodb';

export interface BackendStackProps extends cdk.StackProps {

}

export class BackendStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props: BackendStackProps) {
    super(scope, id, props);

    const construct = new awsAPIGatewayDynamoDB.ApiGatewayToDynamoDB(this, 'PostAPI', {
        allowCreateOperation: true,
        allowReadOperation: true,
        allowUpdateOperation: true, 
        allowDeleteOperation: true,
    });

    const root = construct.apiGateway.root;
    root.addResource('signedUrls').addMethod('GET');

    root.addResource('posts').addMethod('POST');


    // 1. Upload
        // 1. get Signed url 
        // 2. upload 
    // 2. Create the post
  }

}
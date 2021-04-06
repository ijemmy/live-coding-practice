import * as cdk from '@aws-cdk/core';
import * as awsAPIGatewayDynamoDB from '@aws-solutions-constructs/aws-apigateway-dynamodb';
import * as apigateway from '@aws-cdk/aws-apigateway';
export interface BackendStackProps extends cdk.StackProps {

}
export class BackendStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props: BackendStackProps) {
    super(scope, id, props);

    const construct = new awsAPIGatewayDynamoDB.ApiGatewayToDynamoDB(this, 'FeedbackAPI', {
        allowCreateOperation: true,
        allowReadOperation: true,
        // allowUpdateOperation: true, 
        // allowDeleteOperation: true,
        createRequestTemplate: JSON.stringify({
          TableName: '${Table}',
          Item: {
            'Key': { S: "$input.path('$.key')" },
            'Name': { S: "$input.path('$.name')" },
            'Email': { S: "$input.path('$.email')" },
            'Subject': { S: "$input.path('$.subject')" },
            'Details': { S: "$input.path('$.details')" },
          }
        })
    });

    construct.apiGateway.methods.forEach((apiMethod) => {
      const child = apiMethod.node.findChild("Resource") as apigateway.CfnMethod;
        child.addPropertyOverride("AuthorizationType", "NONE");
    });


    
    // const root = construct.apiGateway.root;
    // root.addResource('feedback').addMethod('POST');

    // How do we link this to config stack
  }

}
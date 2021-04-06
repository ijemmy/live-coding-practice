import * as cdk from "@aws-cdk/core";
import * as lambdaDynamoDB from "@aws-solutions-constructs/aws-lambda-dynamodb";
import * as lambda from "@aws-cdk/aws-lambda";
export interface BackendStackProps extends cdk.StackProps {}
export class BackendStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props: BackendStackProps) {
    super(scope, id, props);

    new lambdaDynamoDB.LambdaToDynamoDB(this, "test-lambda-dynamodb-stack", {
      lambdaFunctionProps: {
        code: lambda.Code.fromAsset(
          `${__dirname}/feedback-service-lambdas`
        ),
        runtime: lambda.Runtime.NODEJS_12_X,
        handler: "index.handler",
      },
    });
  }
}

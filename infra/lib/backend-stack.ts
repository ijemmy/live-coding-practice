import * as cdk from "@aws-cdk/core";
import * as lambdaDynamoDB from "@aws-solutions-constructs/aws-lambda-dynamodb";
import * as lambda from "@aws-cdk/aws-lambda";
import * as apigateway from "@aws-cdk/aws-apigateway";

export interface BackendStackProps extends cdk.StackProps {}
export class BackendStack extends cdk.Stack {
  public readonly api: apigateway.RestApi;

  constructor(scope: cdk.Construct, id: string, props: BackendStackProps) {
    super(scope, id, props);

    const lambdaToDynamoDB = new lambdaDynamoDB.LambdaToDynamoDB(
      this,
      "test-lambda-dynamodb-stack",
      {
        lambdaFunctionProps: {
          code: lambda.Code.fromAsset(`${__dirname}/feedback-service-lambdas`),
          runtime: lambda.Runtime.NODEJS_12_X,
          handler: "index.handler",
        },
      }
    );

    const api = new apigateway.RestApi(this, "feedback-api", {
      // defaultCorsPreflightOptions: {
      //   allowOrigins: apigateway.Cors.ALL_ORIGINS,
      //   allowMethods: apigateway.Cors.ALL_METHODS,
      // }, 
    });
    this.api = api;
    
    const integration = new apigateway.LambdaIntegration(
      lambdaToDynamoDB.lambdaFunction
    );

    const feedbacks = api.root.addResource("feedback");
    feedbacks.addMethod("POST", integration);

    new cdk.CfnOutput(this, "FrontendConfig", {
      value: JSON.stringify({
        API_URL: api.url,
      }),
    });
  }
}

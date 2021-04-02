import * as cdk from '@aws-cdk/core';
import * as apigateway from '@aws-cdk/aws-apigateway';

export interface APIProps {

}

export class API extends cdk.Construct {
  constructor(scope: cdk.Construct, id: string, props: APIProps) {
    super(scope, id);

    const api = new apigateway.RestApi(this, 'unicorn-api');

    api.root.addMethod('ANY');

    // GET /posts 
    // POST /posts

    const posts = api.root.addResource('posts');
    posts.addMethod('GET');
    posts.addMethod('POST');
        
  }
}
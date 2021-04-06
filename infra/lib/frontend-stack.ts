import * as cdk from '@aws-cdk/core';

import * as s3 from '@aws-cdk/aws-s3';
import * as cloudfront from '@aws-cdk/aws-cloudfront';
import * as origins from '@aws-cdk/aws-cloudfront-origins';
import * as s3deploy from '@aws-cdk/aws-s3-deployment';
import * as path from 'path';
import { cfnTagToCloudFormation } from '@aws-cdk/core';

export interface FrontendProps extends cdk.StackProps {

}

export class Frontend extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props: FrontendProps) {
    super(scope, id, props);

    const websiteBucket = new s3.Bucket(this, "WebSiteBuck", {
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL
    });

    const distribution = new cloudfront.Distribution(this, 'WebSiteDistribution',{
        defaultBehavior: { origin: new origins.S3Origin(websiteBucket) },
        defaultRootObject: 'index.html',
        errorResponses: [
          { httpStatus: 404, responsePagePath: '/index.html', responseHttpStatus: 200 },
        ],
    });

    new s3deploy.BucketDeployment(this, 'DeployWebsite', {
        sources: [s3deploy.Source.asset(path.resolve(__dirname, '../../ui/build'))],
        destinationBucket: websiteBucket,
        distribution: distribution
      });
    
    new cdk.CfnOutput(this, 'DistributionUrl', {
        value: distribution.distributionDomainName,
    })

  }
}
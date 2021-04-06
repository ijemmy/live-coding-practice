#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { Frontend } from '../lib/frontend-stack';
import { BackendStack } from '../lib/backend-stack';

const app = new cdk.App();
new Frontend(app, 'FrontendStack', {});
new BackendStack(app, 'BackendStack', {});
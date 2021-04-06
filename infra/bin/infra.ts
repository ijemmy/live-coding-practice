#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { Frontend } from '../lib/frontend-stack';
import { BackendStack } from '../lib/backend-stack';
import { FrontendConfig } from '../lib/frontend-config-stack';

const app = new cdk.App();

const frontend = new Frontend(app, 'FrontendStack', {});

const backend = new BackendStack(app, 'BackendStack', {});

new FrontendConfig(app, 'FrontendConfigStack', {
    siteBucket: frontend.siteBucket,
    api: backend.api,
})
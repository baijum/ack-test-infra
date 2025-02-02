#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { TestCIStack } from '../lib/test-ci-stack';

const app = new cdk.App();
new TestCIStack(app, 'TestCIStack', {
  /* If you don't specify 'env', this stack will be environment-agnostic.
   * Account/Region-dependent features and context lookups will not work,
   * but a single synthesized template can be deployed anywhere. */

  /* Uncomment the next line to specialize this stack for the AWS Account
   * and Region that are implied by the current CLI configuration. */
  env: { account: process.env.CDK_DEFAULT_ACCOUNT, region: process.env.CDK_DEFAULT_REGION },

  /* Uncomment the next line if you know exactly what Account and Region you
   * want to deploy the stack to. */
  // env: { account: '123456789012', region: 'us-east-1' },
  terminationProtection: true,

  /* For more information, see https://docs.aws.amazon.com/cdk/latest/guide/environments.html */
  clusterConfig: {
    botPersonalAccessToken: app.node.tryGetContext('bot_pat') || process.env.BOT_PAT,
    webhookHMACToken: app.node.tryGetContext('webhook_hmac') || process.env.WEBHOOK_HMAC
  },
  logsBucketName: app.node.tryGetContext('logs_bucket') || process.env.LOGS_BUCKET,
  pvreBucketName: app.node.tryGetContext('pvre_bucket') || process.env.PVRE_BUCKET,
});

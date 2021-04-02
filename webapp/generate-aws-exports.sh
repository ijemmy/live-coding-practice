# Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
# 
# Licensed under the Apache License, Version 2.0 (the "License").
# You may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#    http://www.apache.org/licenses/LICENSE-2.0
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.


# This script configures the aws-exports with the output of the stack created in API Section
# Arg $1 : Cloudformation stack name from API section
# With cross account role, you can extract value from other accounts and manage your different envs.

echo "***** Getting outputs from $1 stack *****"
AWS_REGION=$(aws configure get region)
COGNITO_USER_POOL_CLIENT_ID=$(aws cloudformation describe-stacks --stack $1 --query "Stacks[0].Outputs[0].OutputValue")
COGNITO_USER_POOL_ID=$(aws cloudformation describe-stacks --stack $1 --query "Stacks[0].Outputs[1].OutputValue")
API_ENDPOINT=$(aws cloudformation describe-stacks --stack $1 --query "Stacks[0].Outputs[2].OutputValue")

echo "Region : $AWS_REGION"
echo "Cognito WebClientID : $COGNITO_USER_POOL_CLIENT_ID"
echo "Cognito UserPoolID : $COGNITO_USER_POOL_ID"
echo "API endpoint : $API_ENDPOINT"

echo "***** generating aws-exports.js *****"
sed -e "s/\$AWS_REGION/$AWS_REGION/" \
    -e "s/\$COGNITO_USER_POOL_CLIENT_ID/$COGNITO_USER_POOL_CLIENT_ID/" \
    -e "s/\$COGNITO_USER_POOL_ID/$COGNITO_USER_POOL_ID/" \
    -e "s~\$API_ENDPOINT~$API_ENDPOINT~" \
    src/aws-exports-template.js > src/aws-exports.js

cat src/aws-exports.js

echo "***** generated aws-exports.js"
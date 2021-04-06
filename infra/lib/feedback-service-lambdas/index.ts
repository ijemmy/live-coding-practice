import * as AWS from "aws-sdk";

const TABLE_NAME = process.env.DDB_TABLE_NAME!;
const dynamodb = new AWS.DynamoDB();

exports.handler = async (event: any) => {
  const headers = {
    "Access-Control-Allow-Origin": "*",
  };
  const body = event["body"];
  const { name, email, subject, details } = JSON.parse(body);
  const key = `${email.toLowerCase()}:${new Date().toISOString()}`;
  const params: AWS.DynamoDB.PutItemInput = {
    TableName: TABLE_NAME,
    Item: {
      id: { S: key },
      Name: { S: name },
      Email: { S: email },
      Subject: { S: subject },
      Details: { S: details },
    },
  };
  await dynamodb.putItem(params).promise();
  return { statusCode: 200, body: "success", headers };
};

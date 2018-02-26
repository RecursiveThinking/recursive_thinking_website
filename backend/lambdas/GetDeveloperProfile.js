const aws = require('aws-sdk');
const dynamodb = new aws.DynamoDB.DocumentClient();

exports.get = (event, context, callback) => {

    const username = event.requestContext.authorizer.claims["cognito:username"];
    const parameterUser = event.pathParameters.developerId;

    if (username !== parameterUser) {
        context.succeed({
            statusCode: 403,
            body: JSON.stringify({ message: "Unable to authenticate access to this users profile." }),
            headers: {'Content-Type': 'application/json'}
        });
    }

    const params = {
        TableName : process.env.TABLE,
        Key: {
            "id": username
        }
    };

    dynamodb.get(params, function(err, data) {
        if (err) {
            context.succeed({
                statusCode: 501,
                body: JSON.stringify({ message: 'There was an error when calling DynamoDB' }),
                headers: {'Content-Type': 'text/plain'}
            });
        } else {
            context.succeed({
                statusCode: 200,
                body: JSON.stringify(data),
                headers: {'Content-Type': 'application/json'}
            });
        }
    });

};

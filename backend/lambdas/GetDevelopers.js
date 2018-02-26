const aws = require('aws-sdk');
const dynamodb = new aws.DynamoDB.DocumentClient();

exports.get = (event, context, callback) => {

    const params = {
        TableName : process.env.TABLE
    };

    dynamodb.scan(params, function(err, data) {
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

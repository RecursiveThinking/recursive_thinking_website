# AWS Backend Notes

## Did you Not Save the Information When you Built Your Stack?

### Here are some alternate locations for this same information:

    apiUrl:

        This can also be found in the web UI under API Gateway, RecursiveThinkingAPI
            on the left menu, select Stages, then click "Prod" in the middle menu, then a blue box will appear in the right-side area - copy the link titled "Invoke URL:" its also inside a little blue box for easier reference.
    
    region:
    userPoolId:
    userPoolWebClientId:

        These can be found in Cognito --> Manage User Pools --> RecursiveThinkingUserPool
            Pool Id (which also shows the region)
        -->App Clients
            App client id (userPoolWebClientId)
            
    (Need to add items from s3Upload)
--------------------------------------------------------------------------

## @Avsean - Take it away!

For more robust error/info logging in aws-amplify, go into the chrome console
    window.LOG_LEVEL = "DEBUG"

If ambiguous login errors occur on the client, try updating the aws-amplify package
    npm install aws-amplify@latest
    
If you need to update the AWS CLI - here is the command: (this does mean you need pip...)

```javascript
    pip install awscli --upgrade --user
```
    
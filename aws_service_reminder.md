# AWS Notes

## When you Deploy the Stack for the First Time

When you deploy your backend stack, you'll need to copy and save the following Outputs from the script log:

    CognitoUserPoolId : <currentValueForStackDeployed>
    CognitoClientId : <currentValueForStackDeployed>
    BASE API URL : <currentValueForStackDeployed>

For Example, A Recent AWS Stack Deployment Yielded this:

    CognitoUserPoolId : us-west-2_aNGi5YoeN
    CognitoClientId : r05v9bom94rthtepealmhr8tm
    BASE API URL : https://biqaidzr66.execute-api.us-west-2.amazonaws.com/Prod

For the First time, after the stack successfully deploys - and to connect your FrontEnd (DevDay Website) to the AWS Backend Stack, you'll need to:

- Create a Folder in your project called "secrets" (and yes, name it secret because we have git ignored this folder...)

- Inside secrets, make a file named cognitoCreds.js

In this file, paste the following code in: 

```javascript
    export const credentials = {
        region: 'us-west-2',
        userPoolId: 'us-west-2_Ll0gsVsni',
        userPoolWebClientId: '5hch7trbdtsnha391ntejst7bb',
        apiUrl: 'https://93lkkahf1b.execute-api.us-west-2.amazonaws.com/Prod'
    }
```

## Some Notes:
    
    region:  <this value should be the first part of userPoolId> (In this Case: 'us-west-2')

    userPoolId: <this value should be CognitoUserPoolId in your Stack Output> (In this Case: 'us-west-2_aNGi5YoeN')
    
    userPoolWebClientId: <this value should be CognitoClientId from your Stack Output> (In this Case: 'r05v9bom94rthtepealmhr8tm')
    
    apiUrl: <this value should be BASE API URL from your Stack Output> (In this Case: 'https://biqaidzr66.execute-api.us-west-2.amazonaws.com/Prod')
    
### A Finished Config File Should Look Something Like this:

```javascript
    export const credentials = {
        region: '',
        userPoolId: '',
        userPoolWebClientId: '',
        apiUrl: ''
    }
```

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
--------------------------------------------------------------------------

## @Avsean - Take it away!

For more robust error/info logging in aws-amplify, go into the chrome console
    window.LOG_LEVEL = "DEBUG"

If ambiguous login errors occur on the client, try updating the aws-amplify package
    npm install aws-amplify@latest
    
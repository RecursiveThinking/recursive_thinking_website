When you download the website, you'll need to make changes to the following files/lines

serverApi.js

    variable apiUrl should be equal to the url provided when you build the stack
        this can also be found in the web UI under API Gateway, RecursiveThinkingAPI, on the left menu, select Stages, then click "Prod" in the middle menu, then a blue box will appear in the right-side area - copy the link titled "Invoke URL:" its also inside a little blue box for easier reference.
    
main.js

    make sure all values in Auth object are consistent with your Cognito stack profile.
    
        region:
        userPoolId:
        userPoolWebClientId:

    These can be found in Cognito --> Manage User Pools --> RecursiveThinkingUserPool
        Pool Id (which also shows the region)
    -->App Clients
        App client id (userPoolWebClientId)
--------------------------------------------------------------------------

For more robust error/info logging in aws-amplify, go into the chrome console
    window.LOG_LEVEL = "DEBUG"

If ambiguous login errors occur on the client, try updating the aws-amplify package
    npm install aws-amplify@latest
    
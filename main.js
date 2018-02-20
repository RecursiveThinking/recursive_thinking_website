import { global } from './scripts/global';
import layout from './scripts/layout';
import redirect from './scripts/redirect';
import Amplify from 'aws-amplify';

Amplify.configure({
    Auth: {
        // REQUIRED - Amazon Cognito Identity Pool ID
        identityPoolId: 'us-west-2:35b0c13e-47e0-41e4-b5c8-e3924d86d107',
        // REQUIRED - Amazon Cognito Region
        region: 'us-west-2',
        // OPTIONAL - Amazon Cognito User Pool ID
        userPoolId: 'us-west-2_570GEyJgs',
        // OPTIONAL - Amazon Cognito Web Client ID
        userPoolWebClientId: '1tt5sh3cf3csicaqcpg0a4jiva'
    }
});



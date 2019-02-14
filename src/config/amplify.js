import Creds from '../credentials/secrets/cognitoSecrets.json'
// console.log(creds);
import s3Creds from '../credentials/secrets/s3UploadSecrets.json'
import Amplify from 'aws-amplify';

Amplify.configure({
  Auth: {

      // REQUIRED only for Federated Authentication - Amazon Cognito Identity Pool ID
      identityPoolId: s3Creds.IdentityPoolId,
      
      // REQUIRED - Amazon Cognito Region
      region: Creds.region,

      // OPTIONAL - Amazon Cognito Federated Identity Pool Region 
      // Required only if it's different from Amazon Cognito Region
      identityPoolRegion: s3Creds.region,

      // OPTIONAL - Amazon Cognito User Pool ID
      userPoolId: Creds.userPoolId,

      // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
      userPoolWebClientId: Creds.userPoolWebClientId,

      // OPTIONAL - Enforce user authentication prior to accessing AWS resources or not
      // mandatorySignIn: false,

      // OPTIONAL - Configuration for cookie storage
      // Note: if the secure flag is set to true, then the cookie transmission requires a secure protocol
      
      // cookieStorage: {
      // // REQUIRED - Cookie domain (only required if cookieStorage is provided)
      //     domain: '.yourdomain.com',
      // // OPTIONAL - Cookie path
      //     path: '/',
      // // OPTIONAL - Cookie expiration in days
      //     expires: 365,
      // // OPTIONAL - Cookie secure flag
      // // Either true or false, indicating if the cookie transmission requires a secure protocol (https).
      //     secure: true
      // },

      // OPTIONAL - customized storage object
      // storage: new MyStorage(),
      
      // OPTIONAL - Manually set the authentication flow type. Default is 'USER_SRP_AUTH'
      // authenticationFlowType: 'USER_PASSWORD_AUTH'
  }
});
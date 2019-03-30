/*
 * This file contains all user authentication methods.
 * Docs: https://aws.github.io/aws-amplify/api/classes/authclass.html
 * Examples: https://aws.github.io/aws-amplify/media/authentication_guide.html
*/

import { Auth } from 'aws-amplify';
import { history } from '../index'
import { SubmissionError } from 'redux-form'

import { ROUTES_REACT } from '../standards/routes';

export const signUp = async ({username, password, email, name}) => {
  return Auth.signUp(
    {
      username,
      password,
      attributes: {
        email,
        name,
        // other custom attributes 
      }
    })
    .then(data => {
      console.log('data: ', data)
      return data;
    })
    .catch(err => {
      console.log('err: ', err)
      return err;
    });
}

export const confirmSignUp = async ({username, code}) => {
  // After retrieveing the confirmation code from the user
  return Auth.confirmSignUp(
    username, 
    code, 
    {
      // Optional. Force user confirmation irrespective of existing alias. By default set to True.
      forceAliasCreation: false    
    })
    .then(data => {
      console.log('data @ confirmSignUp: ', data)
      return data
    })
    .catch(err => {
      console.log('err @ confirmSignUp: ', err)
      return err
    });
}

export const resendSignUp = (username) => {
  console.log('@ resentSignUp: ', username)
  return Auth.resendSignUp(username)
    .then(() => {
      console.log('@ resentSignUp - success');
      // return data
      return {
        code: 'UserFoundSuccessfully',
        name: 'UserFoundSuccessfully',
        message: 'User was Found'
      }
    })
    .catch(err => {
      console.log('@ resentSignUp - err: ', err);
      return err
  });
}

export const signIn = async ({username, password}) => {
  try {
    const user = await Auth.signIn(username, password);
    if (user.challengeName === 'NEW_PASSWORD_REQUIRED') {
        console.log('signin @ second if')  
      
        // const { requiredAttributes } = user.challengeParam; 
        
        // the array of required attributes, e.g ['email', 'phone_number']
        // You need to get the new password and required attributes from the UI inputs
        // and then trigger the following function with a button click
        // For example, the email and phone_number are required attributes
        
        // const { username, email, phone_number } = getInfoFromUserInput();
        // const loggedUser = await Auth.completeNewPassword(
        //     user,               // the Cognito User Object
        //     newPassword,       // the new password
        //     // OPTIONAL, the required attributes
        //     {
        //         email,
        //         phone_number,
        //     }
        // );
        
    } else if (user.challengeName === 'MFA_SETUP') {
      
      console.log('signin @ third if')  
      
      
        // This happens when the MFA method is TOTP
        // The user needs to setup the TOTP before using it
        // More info please check the Enabling MFA part
        Auth.setupTOTP(user);
    } else {
        // The user directly signs in
        // currentUser = utils.parseJwt(data.signInUserSession.idToken.jwtToken);
        console.log('@ authMethod signIn method third if: show cogUser: ', user);
        return user;
    } 
  } catch (err) {
    if (err.code === 'UserNotConfirmedException') {
        // The error happens if the user didn't finish the confirmation step when signing up
        // In this case you need to resend the code and confirm the user
        // About how to resend the code and confirm the user, please check the signUp part
    } else if (err.code === 'PasswordResetRequiredException') {
        // The error happens when the password is reset in the Cognito console
        // In this case you need to call forgotPassword to reset the password
        // Please check the Forgot Password part.
    } else {
        console.log(err);
        return err;
    }
  }
}

// export const signInGetUserInfo = async () => {
//     return Auth.currentUserInfo()
//       .then((user) => {
//         console.log('current user info ', user);
//         // do something with signed in user credential
//         return user;
//       })
//       .catch(err => {
//         console.log("There was a problem getting user info ", err);
//         return err;
//       });
// };
// You can call Auth.currentAuthenticatedUser() to get the current authenticated user object.

//  This method can be used to check if a user is logged in when the page is loaded. It will throw an error if there is no user logged in. This method should be called after the Auth module is configured or the user is logged in. To ensure that you can listen on the auth events configured or signIn. Learn how to listen on auth events.

export const getCurrentAuthenticatedUser = async () => {
  return Auth.currentAuthenticatedUser({
    bypassCache: false
  })
    .then(user => {
      console.log('user @ auth getCurAuthUser: ', user)
      return user;
    })
    .catch(err => console.log('err @ auth getCurAuthUser: ', err))
}

// Retrieve Current User Session
// Auth.currentSession() returns a CognitoUserSession object which contains JWT accessToken, idToken, and refreshToken.

export const getCurrentUserFromSession = async () => {
  //Get current user's from  session
  return Auth.currentSession()
      .then((user) => {
          console.log('current user session @ auth', user);
          // TODO: Do we want to return the user, or accept and invoke a callback?
          // cb(user);
          return user;
          // do something with signed in user session
      })
      .catch(err => {
        console.log("There was a problem getting user from session ", err)
        signOut()
          .then(data => {
            console.log('So we will Log them out and return to Root')
            history.push(ROUTES_REACT.root);
            return data;
          })
          .catch(err => {
            console.log('err: ', err)
          })
      });
};

export const signOut = async () => {
  await Auth.signOut()
    .then(data => console.log(data))
    .catch(err => console.log(err));
  // By doing this, you are revoking all the auth tokens(id token, access token and refresh token)
  // which means the user is signed out from all the devices
  // Note: although the tokens are revoked, the AWS credentials will remain valid until they expire (which by default is 1 hour)
  // Auth.signOut({ global: true })
  //     .then(data => console.log(data))
  //     .catch(err => console.log(err));
}

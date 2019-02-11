/*
 * This file contains all user authentication methods.
 * Docs: https://aws.github.io/aws-amplify/api/classes/authclass.html
 * Examples: https://aws.github.io/aws-amplify/media/authentication_guide.html
*/

import { Auth } from 'aws-amplify';

export const signUp = ({username, password, email, name}) => {
  Auth.signUp(
    {
      username,
      password,
      attributes: {
        email,
        name,
        // other custom attributes 
      }
    })
    .then(data => console.log(data))
    .catch(err => console.log(err));
}

export const confirmSignUp = ({username, code}) => {
  // After retrieveing the confirmation code from the user
  Auth.confirmSignUp(
    username, 
    code, 
    {
      // Optional. Force user confirmation irrespective of existing alias. By default set to True.
      forceAliasCreation: true    
    })
    .then(data => console.log(data))
    .catch(err => console.log(err));
}

export const resendSignUp = (username) => {
  Auth.resendSignUp(username)
    .then(() => {
      console.log('code resent successfully');
    })
    .catch(event => {
    console.log(event);
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
        console.log(user);
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

export const signInGetUserInfo = async () => {
    await Auth.currentUserInfo()
      .then((user) => {
          console.log('current user info ', user);
          // do something with signed in user credential
          return user;
      })
      .catch(err => console.log("There was a problem getting user info ", err));
};

export const getSignInUserSession = async () => {
  //Get current user's session
  return Auth.currentSession()
      .then((user) => {
          console.log('current user session @ auth', user);
          // TODO: Do we want to return the user, or accept and invoke a callback?
          // cb(user);
          return user;
          // do something with signed in user session
      })
      .catch(err => console.log("There was a problem getting session ", err));
};

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
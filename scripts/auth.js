import { Auth } from 'aws-amplify';


/*
 * This file contains all user authentication methods.
 * Docs: https://aws.github.io/aws-amplify/api/classes/authclass.html
 * Examples: https://aws.github.io/aws-amplify/media/authentication_guide.html
*/

const signIn = (username, password) => {
    Auth.signIn(username, password)
        .then((user) => {
            console.log(user);
            // do something with signed in user credential
            // maybe not since theres a currentCredential API to get signed in user
        })
        .catch(err => console.log("There was a problem signing in ", err));
};

/*
* @params object info
* @returns object user
*/
const signUp = (info) => {
    const { username, password, email, name } = info;
    Auth.signUp({
        username,
        password,
        attributes: {
            email,
            name,
            "custom:title": 'Developer',
            "custom:rank": 'a',
            "custom:website": 'default',
            "custom:linkedin": 'default',
            "custom:picture": 'default',
            "custom:bio": 'default',
            "custom:quote": 'default',
            "custom:city": 'default',
            "custom:state": 'default',
            "custom:experience": 'default'
            // other custom attributes
        }
    })
        .then((data) => {
            console.log('signed up ', data);
        })
        .catch(err => console.log("Sign up failed ", err));
};

/*
 * @params string username
 * @params string code
 * @returns string success/fail
 */
const confirmSignUp = (username, code) => {
    Auth.confirmSignUp(username, code)
        .then((user) => {
            console.log('confirmed sign up ', user);
            // do something with signed in user credential
            // maybe not since theres a currentCredential API to get signed in user
        })
        .catch(err => console.log("There was a problem confirming sign up ", err));
};

const getCredentials = () => {
    Auth.currentCredentials()
        .then((user) => {
            console.log('current credential ', user);
            // do something with signed in user credential
        })
        .catch(err => console.log("There was a problem getting credentials ", err));
};

const getUserCredentials = () => {
    // Get authenticated credentials of current user.
    Auth.currentUserCredentials()
        .then((user) => {
            console.log('current user credential ', user);
            // do something with signed in user credential
        })
        .catch(err => console.log("There was a problem getting user credentials ", err));
};

const getUserInfo = () => {
    Auth.currentUserInfo()
        .then((user) => {
            console.log('current user info ', user);
            // do something with signed in user credential
        })
        .catch(err => console.log("There was a problem getting user info ", err));
};

const getUserPoolUser = () => {
    // Get current authenticated user
    Auth.currentUserPoolUser()
        .then((user) => {
            console.log('current user pool user info ', user);
            // do something with signed in user credential
        })
        .catch(err => console.log("There was a problem getting user info ", err));
};

const getUserSession = () => {
    //Get current user's session
    Auth.currentSession()
        .then((user) => {
            console.log('current user session ', user);
            // do something with signed in user session
        })
        .catch(err => console.log("There was a problem getting session ", err));
};

const signInFederated = (provider, response, user) => {
    //For federated login
    Auth.federatedSignIn(provider, response, user)
        .then((user) => {
            console.log('current federated user ', user);
            // do something with signed in user session
        })
        .catch(err => console.log("There was a problem getting federated user ", err));
};

const forgotPassword = (username) => {
    //forgot password for username
    Auth.forgotPassword(username)
        .then((data) => {
            console.log('sent code to the users email ', data);
            // do something with signed in user session
        })
        .catch(err => console.log("There was a problem initiating forgot password ", err));
};

const forgotPasswordSubmit = (username, code, newPassword) => {
    //forgot password for submit for user
    Auth.forgotPasswordSubmit(username, code, newPassword)
        .then((data) => {
            console.log('the users password has been reset ', data);
            // do something with signed in user session
        })
        .catch(err => console.log("There was a problem resetting password ", err));
};

const updateUserAttributes = (user, attributes) => {
    // update user's attributes with attributes object
    Auth.updateUserAttributes(user, attributes)
        .then((user) => {
            console.log('current users updated their attributes ', user);
            // do something with signed in user session
        })
        .catch(err => console.log(`There was a problem updating attributes ${attributes} for the user ${user} `, err));
};

const getUserAttributes = (user) => {
    // takes cognito user object and returns their attributes
    Auth.userAttributes(user)
        .then((attributes) => {
            console.log('current user attributes ', attributes);
            // do something with signed in user session
        })
        .catch(err => console.log("There was a problem getting users attributes  ", err))
};

export const User = {
    signIn,
    signUp,
    confirmSignUp,
    getCredentials,
    getUserCredentials,
    getUserInfo,
    getUserPoolUser,
    getUserSession,
    signInFederated,
    forgotPassword,
    forgotPasswordSubmit,
    updateUserAttributes,
    getUserAttributes
};


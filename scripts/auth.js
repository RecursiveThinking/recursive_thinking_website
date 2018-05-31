import { Auth } from 'aws-amplify';


/*
 * This file contains all user authentication methods.
 * Docs: https://aws.github.io/aws-amplify/api/classes/authclass.html
 * Examples: https://aws.github.io/aws-amplify/media/authentication_guide.html
*/

const signIn = (username, password) => {
    return Auth.signIn(username, password);
};

/*
* @params object info
* @returns object user
*/
const signUp = (info) => {
    const { username, password, email, name } = info;
    return Auth.signUp({
        username,
        password,
        attributes: {
            email,
            name
            // name,
            // "custom:title": 'Developer',
            // "custom:rank": 'a',
            // "custom:website": 'default',
            // "custom:linkedin": 'default',
            // "custom:picture": 'default',
            // "custom:bio": 'default',
            // "custom:quote": 'default',
            // "custom:city": 'default',
            // "custom:state": 'default',
            // "custom:experience": 'default'
            // other custom attributes
        }
    })
    
};

/*
 * @params string username
 * @params string code
 * @returns string success/fail
 */
const confirmSignUp = (username, code) => {
    return Auth.confirmSignUp(username, code);
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
    // Get authenticated credentials of current user. #federated not user pool
    return Auth.currentUserCredentials()
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
    // Get current authenticated user pool user
    return Auth.currentUserPoolUser()
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
    return Auth.updateUserAttributes(user, attributes)
};

const getUserAttributes = (user) => {
    // takes cognito user pool object and returns their attributes
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

// @return string SUCCESS or error
export const updateUsersProfile = (attributes) => {
    User.getUserPoolUser()
        .then((user) => {
            User.updateUserAttributes(user, attributes)
                .then((status) => {
                    console.log(status, ' current users updated their attributes.');
                    // do something with signed in user session
                })
                .catch(err => console.log(`There was a problem updating attributes ${attributes} for the user ${user} `, err));
        });
};

// @return array of objects, each object is an attribute of user profile
export const getUsersProfile = () => {
    User.getUserPoolUser()
        .then((user) => {
            User.getUserAttributes(user)
                .then((profile) => {
                    return profile;
                    // do something with signed in user session
                })
                .catch(err => console.log(`There was a problem getting the profile for user ${user} `, err));
        });
};

export const signOut = () => {
    return Auth.signOut();
};


import {
    User
} from '../scripts/auth';

import {
    importTemplate,
    templates,
    fill
} from '../scripts/templater'
import {
    utils
} from '../scripts/global';
import serverApi from '../scripts/serverApi.js';

import homeScreenHtml from './homeScreen.html'
import {
    Auth
} from 'aws-amplify';
import {
    Store
} from '../scripts/Store.js';

importTemplate("homeScreen", homeScreenHtml);

export function setup(renderFunction) {
    renderFunction(
        "homeScreen"
    );

    homeScreen();
};

export const homeScreen = () => {
    let currentUser = {};
    let developers;

    const initModalEvents = () => {

        const btnSignUpHead = document.getElementById('btnSignUpHead');
        const btnSignUpSubmit = document.getElementById('btnSignUpSubmit');
        const btnSignInSubmit = document.getElementById('btnSignInSubmit');
        const btnLoginHead = document.getElementById('btnLoginHead');
        const btnSignUpBody = document.getElementById('btnSignUpBody');
        const modalConfirm = document.getElementById('modalConfirm');
        const modalContSignUp = document.getElementById('modalSignUp');
        const modalContLogin = document.getElementById('modalLogin');
        const homePage = document.getElementById('homePage');
        const btnConfirmSubmit = document.getElementById('btnConfirmSubmit');

        btnConfirmSubmit.onclick = function () {
            handleConfirmSubmit(modalConfirm);
        };

        btnSignUpHead.onclick = function () {
            utils.showModal(modalContSignUp);
        };

        btnLoginHead.onclick = function () {
            utils.showModal(modalContLogin);
        };

        btnSignUpBody.onclick = function () {
            utils.showModal(modalContSignUp);
        };

        btnSignUpSubmit.onclick = function () {
            handleSignUpSubmit(modalContSignUp);
        };

        btnSignInSubmit.onclick = function () {
            handleSignInSubmit(modalContLogin);
        };

        homePage.addEventListener('keydown', function (event) {
            if (event.code === "Enter" || event.keyCode === 13) {
                if (modalContSignUp.style.display === 'block') {
                    handleSignUpSubmit(modalContSignUp);
                } else if (modalContLogin.style.display === 'block') {
                    handleSignInSubmit(modalContLogin);
                } else if (modalConfirm.style.display === 'block') {
                    handleConfirmSubmit(modalConfirm);
                }
            }
        });

        homePage.onclick = function (event) {
            if (event.target == modalContSignUp) {
                modalContSignUp.style.display = "none";
            } else if (event.target == modalContLogin) {
                modalContLogin.style.display = "none";
            } else {
                console.log("Clicking on Something Not a Modal");
            }
        }

    };

    const handleSignUpSubmit = (modal) => {

        const modalConfirm = document.getElementById('modalConfirm');
        const given_name = document.getElementById('signUpName').value;
        const username = document.getElementById('signUpUserName').value;
        const email = document.getElementById('signUpEmail').value;
        const password = document.getElementById('signUpPassword').value;

        const info = {
            given_name,
            username,
            name: username,
            email,
            password
        };
        User.signUp(info)
            .then((data) => {
                console.log('signed up ', data);

                currentUser = data;

                modal.style.display = "none";
                modalConfirm.style.display = "block";
            })
            .catch(err => {
                console.log("Sign up failed ", err);
                let check;
                if (typeof err === 'string') {
                    check = err.toLowerCase();
                } else {
                    check = err.message.toLowerCase();
                    err = err.message;
                }

                if (check.indexOf('username') !== -1) {
                    document.getElementById('signUpUserNameError').innerText = err;
                } else if (check.indexOf('email') !== -1) {
                    document.getElementById('signUpEmailError').innerText = err;
                } else if (check.indexOf('name') !== -1) {
                    document.getElementById('signUpNameError').innerText = err;
                } else {
                    document.getElementById('signUpPasswordError').innerText = err;
                }
            });
    };

    const handleConfirmSubmit = (modal) => {

        const username = document.getElementById('confirmUserName').value;
        const code = document.getElementById('confirmCode').value;

        User.confirmSignUp(username, code)
            .then((user) => {
                console.log('confirmed sign up ', user);

                modal.style.display = "none";
                utils.navigateToPage('dashboard');
            })
            .catch((err) => {
                console.log("There was a problem confirming sign up ", err);
                let check;
                if (typeof err === 'string') {
                    check = err.toLowerCase();
                } else {
                    check = err.message.toLowerCase();
                    err = err.message;
                }

                if (check.indexOf('username') !== -1) {
                    document.getElementById('confirmUserNameError').innerText = err;
                } else {
                    document.getElementById('confirmCodeError').innerText = err;
                }
            });

    };

    const handleSignInSubmit = (modal) => {

        const username = document.getElementById('signInUserName').value;
        const password = document.getElementById('signInPassword').value;

        User.signIn(username, password)
            .then(signInCB)
            .catch(err => {
                console.log("Sign in failed ", err);
                let check;
                if (typeof err === 'string') {
                    check = err.toLowerCase();
                } else {
                    check = err.message.toLowerCase();
                    err = err.message;
                }

                if (check.indexOf('username') !== -1) {
                    document.getElementById('signInUserNameError').innerText = err;
                } else {
                    document.getElementById('signInPasswordError').innerText = err;
                }
            });

        async function signInCB(data) {
            let userInDB = false;
            // console.log('signed in ', data);

            currentUser = utils.parseJwt(data.signInUserSession.idToken.jwtToken);
            Store.updateCurrentUserCognitoId(currentUser);

            developers = await serverApi.getDeveloperProfiles();
            developers = developers.Items;
            Store.updateDevelopers(developers);
            userInDB = checkUserInDB();

            if (!userInDB) {
                console.log("user not in DB adding");
                serverApi.postDeveloperById(Store.currentUser)
                    .then(async function reGetDevelopers() {
                        Store.updateDevelopers(await serverApi.getDeveloperProfiles().Items);
                        developers = developers.Items;
                        Store.updateDevelopers(developers);
                    });
            }

            modal.style.display = "none";
            utils.navigateToPage('dashboard');
        }
    };

    function checkUserInDB() {
        let flag = false;
        // Need to change this to userID (sub) in the future - Checking if the user has been added to the DB
        for (let i = 0; i < Store.developers.length; i++) {
            if (Store.developers[i].Username == Store.currentUserCognitoId['cognito:username']) {
                flag = true;
                Store.updateUser(developers[i]);
            }
        }
        return flag;
    }

    initModalEvents();
};
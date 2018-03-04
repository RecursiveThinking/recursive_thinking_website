import { User } from '../scripts/auth';
import { utils } from '../scripts/global';

export const homeScreen = () => {

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
            modalContSignUp.style.display = "block";
        };

        btnLoginHead.onclick = function () {
            utils.showModal(modalContLogin);
            modalContLogin.style.display = "block";
        };

        btnSignUpBody.onclick = function () {
            utils.showModal(modalContSignUp);
            modalContSignUp.style.display = "block";
        };

        btnSignUpSubmit.onclick = function () {
            handleSignUpSubmit(modalContSignUp);
        };

        btnSignInSubmit.onclick = function () {
            handleSignInSubmit(modalContLogin);
        };

        homePage.onclick = function (event) {
            if (event.target == modalContSignUp) {
                modalContSignUp.style.display = "none";
            }
            else if (event.target == modalContLogin) {
                modalContLogin.style.display = "none";
            }
            else {
                console.log("Clicking on Something Not a Modal");
            }
        }

    };

    const handleSignUpSubmit = (modal) => {

        const modalConfirm = document.getElementById('modalConfirm');
        const name = document.getElementById('signUpName').value;
        const username = document.getElementById('signUpUserName').value;
        const email = document.getElementById('signUpEmail').value;
        const password = document.getElementById('signUpPassword').value;

        const info = {
            name,
            username,
            email,
            password
        };
        User.signUp(info)
            .then((data) => {
            console.log('signed up ', data);
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
            .then((data) => {
                console.log('signed in ', data);
                modal.style.display = "none";
                utils.navigateToPage('dashboard');
            })
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

    };

    initModalEvents();
};

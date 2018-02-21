import { User } from '../scripts/auth';
import { utils } from '../scripts/global';

export const homeScreen = () => {

    const initModalEvents = () => {

        const btnSignUpHead = document.getElementById('btnSignUpHead');
        const btnSignUpSubmit = document.getElementById('btnSignUpSubmit');
        const btnLoginHead = document.getElementById('btnLoginHead');
        const btnSignUpBody = document.getElementById('btnSignUpBody');
        const modalContSignUp = document.getElementById('modalSignUp');
        const modalContLogin = document.getElementById('modalLogin');
        const homePage = document.getElementById('homePage');

        btnSignUpHead.onclick = function () {
            modalContSignUp.style.display = "block";
        };

        btnLoginHead.onclick = function () {
            modalContLogin.style.display = "block";
        };

        btnSignUpBody.onclick = function () {
            modalContSignUp.style.display = "block";
        };

        btnSignUpSubmit.onclick = function () {
            handleSignUpSubmit(modalContSignUp);
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
            utils.navigateToPage('dashboard');
        })
        .catch(err => {
            console.log("Sign up failed ", err);
            let check;
            if (typeof err === 'string') {
                check = err.toLowerCase();
            } else {
                check = err.message;
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



    initModalEvents();
};
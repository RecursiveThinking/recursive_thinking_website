
export const homeScreen = () => {
    
// capture header signup button
    const btnSignUpHead = document.getElementById('btnSignUpHead');
// console.log(btnSignUpHead);
// caputer header login button
    const btnLoginHead = document.getElementById('btnLoginHead');
// console.log(btnLoginHead);
    const btnSignUpBody = document.getElementById('btnSignUpBody')
    console.log(btnSignUpBody);

// capture modal Signup
    const modalContSignUp = document.getElementById('modalSignUp');
// console.log(modalContSignup);

// capture modal Container Login
    const modalContLogin = document.getElementById('modalLogin');
// console.log(modalContLogin);

    btnSignUpHead.onclick = function () {
        modalContSignUp.style.display = "block";
    }

    btnLoginHead.onclick = function () {
        modalContLogin.style.display = "block";
    }

    btnSignUpBody.onclick = function () {
        modalContSignUp.style.display = "block";
    }

// if the user clicks outside either modal, close that modal
    window.onclick = function (event) {
        if (event.target == modalContSignUp) {
            modalContSignUp.style.display = "none";
        }
        else if (event.target == modalContLogin) {
            modalContLogin.style.display = "none";
        }
        else {
            // console.log(event.target.parentElement.style.display);
            console.log("Clicking on Something Not a Modal");
        }
    }
}
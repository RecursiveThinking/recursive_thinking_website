// console.log("Loaded at HomeScreen");

// capture header signup button
const btnSignUpHead = document.getElementById('btnSignUp');
// console.log(btnSignUpHead);
// caputer header login button
const btnLoginHead = document.getElementById('btnLogin');
// console.log(btnLoginHead);

// capture modal Signup
const modalContSignup = document.getElementById('modalSignUp');
// console.log(modalContSignup);

// capture modal Container Login
const modalContLogin = document.getElementById('modalLogin');
// console.log(modalContLogin);

btnSignUpHead.onclick = function() {
    modalContSignup.style.display = "block";
}

btnLoginHead.onclick = function() {
    modalContLogin.style.display = "block";
}

// if the user clicks outside either modal, close that modal
window.onclick = function(event) {
    if (event.target == modalContSignup) {
        modalContSignup.style.display = "none";
    }
    else if(event.target == modalContLogin){
        modalContLogin.style.display = "none";
    }
    else{
        // console.log(event.target.parentElement.style.display);
        console.log("Clicking on Something Not a Modal");
    }
}
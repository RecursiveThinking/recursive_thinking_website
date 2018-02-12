function modal(){
    // const submitButton = document.getElementById("btnSubmitLesson");

    // const openModal = () => {
    //     const modalContSubmitLesson = document.getElementById('modalSubmitLesson');
    //     modalContSubmitLesson.style.display = "block";
    // }

    // const closeModal = () => {

    // }

    const btnSubmitLesson = document.getElementById('btnSubmitLesson');
    // console.log(btnSubmitLesson);

    const modalContSubmitLesson = document.getElementById('modalSubmitLesson');
    // console.log(modalContSubmitLesson);

    btnSubmitLesson.onclick = function() {
        modalContSubmitLesson.style.display = "block";
    }

    window.onclick = function(event) {
        if (event.target == modalContSubmitLesson) {
            modalContSubmitLesson.style.display = "none";
        }
        else{
            // console.log(event.target.parentElement.style.display);
            console.log("Clicking on Something Not a Modal");
        }
    }
}

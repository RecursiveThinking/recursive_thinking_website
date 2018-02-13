function modalInterview(){

    const btnSubmitInterviewQuestion = document.getElementById('btnSubmitInterviewQuestion');
    
    const btnAnswerQuestion = document.getElementById('btnAnswerQuestion');

//     // modal
    const modalContSubmitInterviewQuestion = document.getElementById('modalSubmitInterviewQuestion');
    
    const modalConstAnswerInterviewQuestion = document.getElementById('modalAnswerInterviewQuestion');
    
    
    btnSubmitInterviewQuestion.onclick = function() {
        modalContSubmitInterviewQuestion.style.display = "block";
    }
    
    btnAnswerQuestion.onclick = function() {
        modalConstAnswerInterviewQuestion.style.display = "block";
    }
    
    window.onclick = function(event) {
        if (event.target == modalContSubmitInterviewQuestion) {
            modalContSubmitInterviewQuestion.style.display = "none";
        }
        else if (event.target == modalConstAnswerInterviewQuestion) {
            modalConstAnswerInterviewQuestion.style.display = "none";
        }
        else{
            // console.log(event.target.parentElement.style.display);
            console.log("Clicking on Something Not a Modal");
        }
    }
}
const btnSidebarVoteLessons = document.getElementById('btnSidebarVoteLessons');
// console.log(btnSidebarVoteLessons);

btnSidebarVoteLessons.addEventListener('click', function(){
    // the code to be called when the dom has loaded
    // #document has its nodes
    // selects
    // console.log("Connected Vote for Lesson");
    // document.addEventListener('DOMContentLoaded', function() {
        // your code here
    let btnSubmitLesson = document.getElementById('btnSubmitLesson');
    console.log(btnSubmitLesson);
    // }, false);
    const modalContSubmitLesson = document.getElementById('modalSubmitLesson');
    
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
})

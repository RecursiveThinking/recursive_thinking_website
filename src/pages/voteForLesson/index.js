import { importTemplate, templates, fill } from '../scripts/templater'
import { utils, data } from '../scripts/global';

import voteForLessonHtml from './voteForLesson.html'
importTemplate("voteForLesson", voteForLessonHtml)

export function setup(renderFunction) {
    renderFunction(
        fill(templates.voteForLesson.page, model())
    );

    modalLessons();
}

export const model = () => {
    // appendPage('voteForLesson');
    // setUpVoteForLesson();
    var allUsers = JSON.parse(localStorage.getItem('allUsers'))
    // var allLessons = JSON.parse(localStorage.getItem('allLessons'));
    var allLessons = JSON.parse(localStorage.getItem('allLessons'));
    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    // console.log(currentUser);
    let lessonLimit = 4;

    return {
        voteForLesson: allLessons.map(lesson => {
            let filteredTaughtByUserArray = utils.returnFilteredTaughtByUserArray(lesson.lessonTaughtBy);
            // console.log(filteredTaughtByUserArray);
            let boolHasUserVoted = utils.hasUserVoted(lesson.lessonVotes, currentUser);
            // console.log("bool at redirect", boolHasUserVoted);
            return fill(templates.voteForLesson.displayALesson, {
                title: lesson.title,
                description: lesson.description,
                // lessonTeachers: lesson.lessonTaughtBy.map((image) => {
                //     return `<img class="avatarThumbRound" src="./public/images/avatar${image}.png" alt="avatar${image} - Sweet Mug">`
                // })
                lessonTeachers: filteredTaughtByUserArray.map(userObj => fill(templates.voteForLesson.displayTaughtByLessons, {
                    imgAttrs: {
                        src: `${userObj["image"]}`,
                        alt: `Lesson ${lesson.title} will be taught by ${userObj["name"]}`
                    }
                })),
                // this passes a lesson to function - the function counts the number of votes, and returns an appropriate string
                lessonVotes: utils.getCountString('lesson', lesson),
                // this returns an HTML string for the button based on whether or not user has voited on lesson.
                hasCurrentUserVoted: utils.getButtonHTMLString(boolHasUserVoted)
            })
        })
    }
    // turn on lesson modal
}

export const modalLessons = () => {
    const btnSubmitLesson = document.getElementById('btnSubmitLesson');

    const modalContSubmitLesson = document.getElementById('modalSubmitLesson');

    btnSubmitLesson.onclick = function() {
        modalContSubmitLesson.style.display = "block";
    }

    window.onclick = function(event) {
        if (event.target == modalContSubmitLesson) {
            modalContSubmitLesson.style.display = "none";
        }
        else{
            console.log("Clicking on Something Not a Modal");
        }
    }
}

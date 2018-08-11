import { importTemplate, templates, fill } from '../../templater'
import { utils, data } from '../../global';
import uuidV1 from 'uuid/v1';
import serverApi from '../../serverApi.js';
import { Store } from '../../store.js';

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
    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    let lessonLimit = 4;
    // const allLessons = Object.values(Store.lessons);
    // only unscheduled lessons
    let lessonsNotScheduled = allLessons.filter(lesson => lesson.scheduled === false)
    // only lessons that are currently valid (less than 30 days old)
    let currentDate = new Date();
    let comparisonDate = new Date();
    let dayOffset = 30
    comparisonDate.setDate(currentDate.getDate() - dayOffset);
    let onlyValidLessons = lessonsNotScheduled.filter(lesson => new Date(lesson.createdAt) > comparisonDate)
    console.log(onlyValidLessons);
    return {
        voteForLesson: onlyValidLessons.map(lesson => {
            // let filteredTaughtByUserArray = utils.returnFilteredTaughtByUserArray(lesson.lessonTaughtBy);
            // console.log(filteredTaughtByUserArray);
            // let boolHasUserVoted = utils.hasUserVoted(lesson.lessonVotes, currentUser);
            // console.log("bool at redirect", boolHasUserVoted);
            return fill(templates.voteForLesson.displayALesson, {
                title: lesson.title,
                description: lesson.description,
                // lessonTeachers: lesson.lessonTaughtBy.map((image) => {
                //     return `<img class="avatarThumbRound" src="./images/avatar${image}.png" alt="avatar${image} - Sweet Mug">`
                // })
                // lessonTeachers: filteredTaughtByUserArray.map(userObj => fill(templates.voteForLesson.displayTaughtByLessons, {
                //     imgAttrs: {
                //         src: `${userObj["image"]}`,
                //         alt: `Lesson ${lesson.title} will be taught by ${userObj["name"]}`
                //     }
                // })),
                // this passes a lesson to function - the function counts the number of votes, and returns an appropriate string
                lessonVotes: lesson.lessonVotes.length,
                // this returns an HTML string for the button based on whether or not user has voited on lesson.
                // hasCurrentUserVoted: utils.getButtonHTMLString(boolHasUserVoted)
            })
        })
    }
    // turn on lesson modal
}

export const modalLessons = () => {
    const btnCreateLessonRequest = document.getElementById('btnCreateLessonRequest');
    const btnSubmitLessonRequest = document.getElementById('btnSubmitLessonRequest');
    const modalContSubmitLesson = document.getElementById('modalSubmitLesson');

    btnCreateLessonRequest.onclick = function() {
        modalContSubmitLesson.style.display = "block";
    }

    btnSubmitLessonRequest.onclick = submitNewLesson;

    window.onclick = function(event) {
        if (event.target == modalContSubmitLesson) {
            modalContSubmitLesson.style.display = "none";
        }
        else{
            console.log("Clicking on Something Not a Modal");
        }
    }
}

async function submitNewLesson(e){
    e.preventDefault();
    const title = document.querySelector('input[name="lessonTitle"]').value;
    const description = document.querySelector('textarea[name="lessonDescription"]').value;
    const taughtBy = document.querySelector('input[name="lessonTaughtBy"]').value;

    const Id = uuidV1();

    const lesson = {
        Id,
        title,
        description,
        taughtBy
    }

    await serverApi.postLessonById(lesson);
    // console.log(lesson);

}
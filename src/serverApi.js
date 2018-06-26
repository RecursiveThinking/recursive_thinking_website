import {
    User
} from './auth';
import {credentials} from '../secrets/cognitoCreds.js';
import {Store} from '../src/store.js';

let apiUrl = credentials.apiUrl;

function signUp(info) {
    User.signUp(info);
}

async function postDeveloperById(user) {
    const resource = `/developers/${user.sub}`;

    const options = {
        method: "POST",
        body: {
            name: user.name,
            username: user["cognito:username"],
            email: user.email
        }
    };

    return initFetchCall(resource, options);
}

async function postEditProfile() {
    const resource = `/developers/${Store.currentUser.userId}/edit`;
    const body = Object.assign(Store["updatedUser"]);
    const options = {
        method: "POST",
        body
    };
    return initFetchCall(resource, options);
}


// Get all developer profiles
async function getDeveloperProfiles() {

    const resource = "/developers";

    // let token = await User.getUserSession().idToken.jwtToken;

    const options = {
        method: "GET",
    };

    let developers = await initFetchCall(resource, options);
    developers = developers.Items;
    Store.updateDevelopers(developers);
}

// For now taughtBy will be a string of a username, however it should eventually be an array of valid userIds
async function postLessonById(lesson){
    const resource = `/lessons/${lesson.Id}`;

    const options = {
        method: "POST",
        body: {
            Id: lesson.Id,
            title: lesson.title,
            description: lesson.description,
            taughtBy: lesson.taughtBy
        }
    };

    return initFetchCall(resource, options);
}

// Get all upcoming lessons
async function getLessons() {
    const resource = "/lessons";
    const options = {
        method: "GET"
    };
    let lessons = await initFetchCall(resource, options);
    lessons = lessons.Items;
    Store.updateLessons(lessons);
    
}

// Submit an attending status (Attending, maybe, not attending) to a lesson
function postUpcomingLessons(lessonId, attendingStatus) {
    // What shape do we want attending status to be? Integers for attending, maybe, or not attending?  Strings of the words themselves?
    const resourse = `/lessons/attending/${lessonId}`;
    const options = {
        method: "POST",
        body: attendingStatus
    }
    return initFetchCall(resource, options);
}
// Get all potential future lessons (to be voted on)
function getVoteForLessons() {
    const resource = `/voteLessons`;
    const options = {
        method: "GET"
    }
    return initFetchCall(resource, options);
}
// Vote for a specific potential future lesson
function postVoteForLessons(lessonId) {
    const resource = `/voteLessons/${lessonId}`;
    const options = {
        method: "POST",
    };
    return initFetchCall(resource, options);
}

// Submit a new Lesson Request
function postVoteForLessonsSubmitLesson(data) {
    /*
        data = {
            lessonTitle,
            LessonDescription,
            LessonTaughtBy
        }
    */
    const resource = `/voteLessons/newLesson`;
    options = {
        method: "POST",
        body: data
    };
    return initFetchCall(resource, options);
}

function getInterviewQuestions() {
    const resource = "/interviewQs";
    options = {
        method: "GET"
    };
    return initFetchCall(resource, options);
}

function postInterviewQuestion(data) {
    /*
        data = {
            questionTitle,
            questionDescription,
            questionTags : ["Front End Development", "JavaScript", "HTML", "CSS" ...]
        }
    */
    const resource = "/interviewQs/newQuestion";
    options = {
        method: "POST",
        body: data
    };
    return initFetchCall(resource, options);
}

// Respond to an inverviewQuestion
function postInterviewQuestionResponse(questionId, data) {
    // Should data just be a string response?
    const resource = `/interviewQs/${questionId}`;
    options = {
        method: "POST",
        body: data
    }
    return initFetchCall(resource, options);
}

// Runs the fetch calls - can be called directly if you want to make unique fetch calls
async function initFetchCall(resource, options) {

    let token;
    await User.getUserSession((user) => {
        token = user.idToken.jwtToken;
    });

    options.headers = {
        Authorization: token,
        'Content-Type': 'application/json'
    }
    // The body needs to be stringified in order to be passed into the lambda function from API
    options.body = JSON.stringify(options.body);

    return fetch(apiUrl + resource, options)
        .then((data) => {
            // console.log(data);
            return data.json();
        })
        .then((response) => {
            console.log(`Successful call to ${resource}`, response);
            return response;
        })
        .catch((err) => {
            console.log(`error in call to ${resource}`, err);
            return error;
        });
}

export default {
    getDeveloperProfiles,
    postDeveloperById,
    getLessons,
    postLessonById,
    postUpcomingLessons,
    getVoteForLessons,
    postVoteForLessons,
    postVoteForLessonsSubmitLesson,
    getInterviewQuestions,
    postInterviewQuestion,
    postInterviewQuestionResponse,
    postEditProfile,
    initFetchCall,
    signUp
}
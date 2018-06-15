import {
    User
} from './auth';
import {cognitoCreds} from '../secrets/cognitoCreds.js';
// Austin's Api
// let apiUrl = "https://6a3h75mkhi.execute-api.us-east-1.amazonaws.com/Prod";

// Avsean's Api
let apiUrl = cognitoCreds.apiUrl;

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

// Get all developer profiles
async function getDeveloperProfiles() {

    const resource = "/developers";

    // let token = await User.getUserSession().idToken.jwtToken;

    const options = {
        method: "GET",
    };

    return initFetchCall(resource, options);
}

// Get all upcoming lessons
function getUpcomingLessons() {
    const resource = "/lessons";
    const options = {
        method: "GET"
    };
    return initFetchCall(resource, options);
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

function postEditProfile(developerId, profileInfo) {
    const resource = `/developers/${developerId}`;
    options = {
        method: "POST",
        body: profileInfo
    };
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
    postDeveloperById,
    getDeveloperProfiles,
    getUpcomingLessons,
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
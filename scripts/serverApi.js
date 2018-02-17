let apiUrl = "https://6a3h75mkhi.execute-api.us-east-1.amazonaws.com/Prod"

// Get all developer profiles
function getDeveloperProfiles() {
    const resource = "/developer";
    const options = {
        method: "GET"
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
function initFetchCall(resource, options) {
    fetch(apiUrl + resource, options)
        .then((data) => {
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
    getUpcomingLessons,
    postUpcomingLessons,
    getVoteForLessons,
    postVoteForLessons,
    postVoteForLessonsSubmitLesson,
    getInterviewQuestions,
    postInterviewQuestion,
    postInterviewQuestionResponse,
    postEditProfile,
    initFetchCall
}
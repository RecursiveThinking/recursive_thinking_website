// const Users = require('!json-loader!../../data_returns/RecursiveThinkingDeveloperProfiles.json')
// const Lessons = require('!json-loader!../../data_returns/RecursiveThinkingLessons.json')

// this is the entire object.
import { credentials } from '../../credentials/cognitoCreds'

const API_GATEWAY_INVOKE_URL = credentials.apiUrl

import ApiMethods from '../functions/apiMethods'
import LessonMethods from '../functions/lessonMethods';
import OrderMethods from '../functions/orderMethods';

export const FETCH_USERS = 'FETCH_USERS';
export const FETCH_LESSONS = 'FETCH_LESSONS';
export const FETCH_INTERVIEW_QUESTIONS = 'FETCH_INTERVIEW_QUESTIONS'
export const FETCH_INTERVIEW_QUESTIONS_ANSWERS = 'FETCH_INTERVIEW_QUESTIONS_ANSWERS';
export const FETCH_SKILLS = 'FETCH_SKILLS';
export const FETCH_HOMESCREEN_QUOTES = 'FETCH_HOMESCREEN_QUOTES';
export const FETCHING = 'FETCHING';

export const SELECTED_LESSON = 'SELECTED_LESSON';

const API_URL_AND_OPTIONS = {
  getAllUsers: {
    url: '/users',
    options: {
      method: 'GET'
    }
  },
  getAllLessons: {
    url: '/lessons',
    options: {
      method: 'GET'
    }
  },
  getAllInterviewQuestions: {
    url: '/interviewquestions',
    options: {
      method: 'GET'
    }
  },
  getAllInterviewQuestionsAnswers: {
    url: '/interviewquestionsanswers',
    options: {
      method: 'GET'
    }
  },
  getAllSkills: {
    url: '/skills',
    options: {
      method: 'GET'
    }
  },
  getAllHomeScreenQuotes: {
    url: '/homescreenquotes',
    options: {
      method: 'GET'
    }
  }
}

export function fetchUsers(){
  // API CALL HERE
  const URL = `${API_GATEWAY_INVOKE_URL}${API_URL_AND_OPTIONS.getAllUsers.url}`
  const response = ApiMethods.initFetchCall(URL, API_URL_AND_OPTIONS.getAllUsers.options)
    // .then(responseArr => {
    //   const allUsersButCurrent = 
    // })
  return {
    type: FETCH_USERS,
    payload: response
  }
}

export function fetchLessons(){
  // API CALL HERE
  const URL = `${API_GATEWAY_INVOKE_URL}${API_URL_AND_OPTIONS.getAllLessons.url}`
  const response = ApiMethods.initFetchCall(URL, API_URL_AND_OPTIONS.getAllLessons.options)
    .then( response => {
      // if well formed - this would be { body: , status: }
      if(response.body && response.status.statusCode === 200){
        // with this conditional we know the req was successful, and have an array back (but array could be empty)
        const scheduledLessons = LessonMethods.getArrayOfScheduledLessons(response.body, 'date')
        const unscheduledLessons = LessonMethods.getArrayOfUnscheduledLessons(response.body, 'date')
        return {
          body: response.body,
          status: response.status,
          scheduledLessons: scheduledLessons,
          unscheduledLessons: unscheduledLessons
        }
      } else {
        // we have an error
        return response;
      }
    })
  // console.log('response', response)
  return {
    type: FETCH_LESSONS,
    payload: response
  }
}

export function selectedLesson(lesson){
  // console.log('A Lesson has been selected', lesson.title)
  // return an action object, an object with a type property
  // two values, a type and a payload
  // console.log(lesson)
  return {
    type: SELECTED_LESSON,
    payload: lesson
  }
}

export function fetchInterviewQuestions(){
  const URL = `${API_GATEWAY_INVOKE_URL}${API_URL_AND_OPTIONS.getAllInterviewQuestions.url}`
  const response = ApiMethods.initFetchCall(URL, API_URL_AND_OPTIONS.getAllInterviewQuestions.options)
    // .then( responseObj => {
    //   if(responseObj.body.length){
    //     
    //     return allInterviewQuestionsOrdered;
    //   }
    //   else {
    //     return responseObj.body
    //   }
    // })
    // .catch(err => {console.log(err)})
  return {
    type: FETCH_INTERVIEW_QUESTIONS,
    payload: response
  }
}

export function fetchInterviewQuestionsAnswers(){
  const URL = `${API_GATEWAY_INVOKE_URL}${API_URL_AND_OPTIONS.getAllInterviewQuestionsAnswers.url}`
  const response = ApiMethods.initFetchCall(URL, API_URL_AND_OPTIONS.getAllInterviewQuestionsAnswers.options)

  return {
    type: FETCH_INTERVIEW_QUESTIONS_ANSWERS,
    payload: response
  }
}

export function fetchSkills(){
  const URL = `${API_GATEWAY_INVOKE_URL}${API_URL_AND_OPTIONS.getAllSkills.url}`
  const response = ApiMethods.initFetchCall(URL, API_URL_AND_OPTIONS.getAllSkills.options)
  return {
    type: FETCH_SKILLS,
    payload: response
  }
}

export function fetchHomeScreenQuotes(){
  const URL = `${API_GATEWAY_INVOKE_URL}${API_URL_AND_OPTIONS.getAllHomeScreenQuotes.url}`
  const response = ApiMethods.initFetchCall(URL, API_URL_AND_OPTIONS.getAllHomeScreenQuotes.options)
  return {
    type: FETCH_HOMESCREEN_QUOTES,
    payload: response
  }
}
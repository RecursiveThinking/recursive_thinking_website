// const Users = require('!json-loader!../../data_returns/RecursiveThinkingDeveloperProfiles.json')
// const Lessons = require('!json-loader!../../data_returns/RecursiveThinkingLessons.json')

// this is the entire object.
import { credentials } from '../../credentials/cognitoCreds'

const API_GATEWAY_INVOKE_URL = credentials.apiUrl

import ApiMethods from '../functions/apiMethods'
// import AWSSDKMethods from '../functions/AWSSDKMethods'
import LessonMethods from '../functions/lessonMethods';
import OrderMethods from '../functions/orderMethods';

// console.log('creds', credentials.apiUrl)

export const FETCH_USERS = 'FETCH_USERS';
export const FETCH_LESSONS = 'FETCH_LESSONS';
export const FETCH_INTERVIEW_QUESTIONS = 'FETCH_INTERVIEW_QUESTIONS'
export const FETCH_INTERVIEW_QUESTIONS_ANSWERS = 'FETCH_INTERVIEW_QUESTIONS_ANSWERS';
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
    .then( responseArr => {
      // responseArr = [];
      const scheduledLessons = LessonMethods.getArrayOfScheduledLessons(responseArr, 'date')
      const unscheduledLessons = LessonMethods.getArrayOfUnscheduledLessons(responseArr, 'date')
      return {
        allLessons: responseArr,
        scheduledLessons: scheduledLessons,
        unscheduledLessons: unscheduledLessons
      }
    })
  console.log(response)
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
    .then( responseObj => {
      // get an object with a status and a body
      // console.log('status', responseObj.statusCode)
      if(responseObj.body.length){
        const allInterviewQuestionsOrdered = OrderMethods.orderArrayByDateAscending(responseObj.body, 'createdAt')
        // console.log('order', allInterviewQuestionsOrdered)
        return allInterviewQuestionsOrdered;
      }
      else {
        return responseObj.body
      }
    })
    .catch(err => {console.log(err)})
  console.log('action - arr to state', response)
  return {
    type: FETCH_INTERVIEW_QUESTIONS,
    payload: response
  }
}

export function fetchInterviewQuestionsAnswers(){
  const URL = `${API_GATEWAY_INVOKE_URL}${API_URL_AND_OPTIONS.getAllInterviewQuestionsAnswers.url}`
  const response = ApiMethods.initFetchCall(URL, API_URL_AND_OPTIONS.getAllInterviewQuestionsAnswers.options)
    .then(responseObj => {
      // get an object with a statusCode and body
      if(responseObj.body.length){
        return responseObj.body;
      } else {
        return responseObj.body;
      }
    })
    .catch(err => console.log('ERR at Fetch IQ', err))
  return {
    type: FETCH_INTERVIEW_QUESTIONS_ANSWERS,
    payload: response
  }
}
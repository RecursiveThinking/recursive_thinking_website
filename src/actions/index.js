// this is the entire object.
import { CREDENTIALS } from '../_credentials/cognitoCreds'

// import ApiMethods from '../functions/apiMethods';
// import LessonMethods from '../functions/lessonMethods';
// import OrderMethods from '../functions/orderMethods';

import {
  SIGN_UP,
  SIGN_IN,
  // SIGN_OUT,
  FETCH_USERS,
  FETCH_LESSONS,
  SELECTED_LESSON,
  FETCH_INTERVIEW_QUESTIONS,
  FETCH_INTERVIEW_QUESTIONS_ANSWERS,
  FETCH_SKILLS,
  FETCH_HOMESCREEN_QUOTES
} from './action_types'

import { ROUTES_API } from '../standards/routes'

const API_GATEWAY_INVOKE_URL = CREDENTIALS.apiUrl;

// const API_URL_AND_OPTIONS = {
//   getAllUsers: {
//     url: '/users',
//     options: {
//       method: 'GET'
//     }
//   },
//   getAllLessons: {
//     url: '/lessons',
//     options: {
//       method: 'GET'
//     }
//   },
//   getAllInterviewQuestions: {
//     url: '/interviewquestions',
//     options: {
//       method: 'GET'
//     }
//   },
//   getAllInterviewQuestionsAnswers: {
//     url: '/interviewquestionsanswers',
//     options: {
//       method: 'GET'
//     }
//   },
//   getAllSkills: {
//     url: '/skills',
//     options: {
//       method: 'GET'
//     }
//   },
//   getAllHomeScreenQuotes: {
//     url: '/homescreenquotes',
//     options: {
//       method: 'GET'
//     }
//   }
// }

const HTTP_METHODS = {
  get: 'GET',
  post: 'POST',
  delete: 'DELETE',
  put: 'PUT',
  patch: 'PATCH'
}

const OPTIONS = {
  // mode: 'cors',
  // credentials: 'same-origin',
  // headers: {
  //   'Content-Type': 'application/json; charset=utf-8'
  // }
}

const initFetchCall = (urlPath, optionConfig) => {
  return fetch(urlPath, optionConfig)
    .then(response => response.json())
    // .catch(error => error)
}

export const signUp = () => {
  return {
    type: SIGN_UP,
    payload: {}
  }
}

export const signIn = (userId) => {
  return {
    type: SIGN_IN,
    payload: userId
  }
}

export const signOut = (userId) => {
  return {
    type: SIGN_IN,
    payload: userId
  }
}

export const fetchUsers = () => {
  const URL = `${API_GATEWAY_INVOKE_URL}${ROUTES_API.users}`
  let funcOptions = { ...OPTIONS };
  funcOptions.method = HTTP_METHODS.get;
  
  return async (dispatch) => {
    const response = await initFetchCall(URL, funcOptions)
    
    dispatch({
      type: FETCH_USERS,
      payload: response
    })
  }
}

export const fetchHomeScreenQuotes = () => {
  const URL = `${API_GATEWAY_INVOKE_URL}${ROUTES_API.homeScreenQuotes}`;
  let funcOptions = { ...OPTIONS }
  funcOptions.method = HTTP_METHODS.get
  
  return async (dispatch) => {
    const response = await initFetchCall(URL, funcOptions)
    dispatch({
      type: FETCH_HOMESCREEN_QUOTES,
      payload: response
    })
  }
}

export const fetchLessons = () => {
  // API CALL HERE
  const URL = `${API_GATEWAY_INVOKE_URL}${ROUTES_API.lessons}`
  let funcOptions = { ...OPTIONS }
  funcOptions.method = HTTP_METHODS.get
  
  return async (dispatch) => {
    const response = await initFetchCall(URL, funcOptions)
    
    dispatch({
      type: FETCH_LESSONS,
      payload: response
    })
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

export const fetchInterviewQuestions = () => {
  const URL = `${API_GATEWAY_INVOKE_URL}${ROUTES_API.interviewquestions}`
  let funcOptions = { ...OPTIONS };
  funcOptions.method = HTTP_METHODS.get;
  
  return async (dispatch) => {
    const response = await initFetchCall(URL, funcOptions);
    
    dispatch({
      type: FETCH_INTERVIEW_QUESTIONS,
      payload: response
    })
  }
}

export const fetchInterviewQuestionsAnswers = () => {
  const URL = `${API_GATEWAY_INVOKE_URL}${ROUTES_API.interviewquestionsanswers}`
  let funcOptions = { ...OPTIONS };
  funcOptions.method = HTTP_METHODS.get;
  
  return async (dispatch) => {
    const response = await initFetchCall(URL, funcOptions);
    
    dispatch({
      type: FETCH_INTERVIEW_QUESTIONS_ANSWERS,
      payload: response
    })
  }
}

export const fetchSkills = () => {
  const URL = `${API_GATEWAY_INVOKE_URL}${ROUTES_API.skills}`;
  let funcOptions = { ...OPTIONS };
  funcOptions.method = HTTP_METHODS.get;
  
  return async (dispatch) => {
    const response = await initFetchCall(URL, funcOptions);
    
    dispatch({
        type: FETCH_SKILLS,
        payload: response
    })
  }
}


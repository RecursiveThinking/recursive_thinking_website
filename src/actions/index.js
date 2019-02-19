// this is the entire object.
import { CREDENTIALS } from '../credentials/cognitoCreds'
import AWS from 'aws-sdk'
// import { browserHistory } from 'react-router'

import { getSignInUserSession, getCurrentAuthenticatedUser } from '../functions/authMethods';
// import LessonMethods from '../functions/lessonMethods';
import ModelConverterForUpdate from '../models/modelConverterForUpdate';

import dictModel from '../standards/dictModel'

import history from '../history'

import {
  // SIGN_UP,
  // SIGN_IN,
  // SIGN_OUT,
  FETCH_USERS, CREATE_USER,
  GET_USER_BY_ID, EDIT_USER_BY_ID, DELETE_USER_BY_ID,
  
  ERRORS_FETCH_USERS, ERRORS_CREATE_USER,
  ERRORS_GET_USER_BY_ID, ERRORS_EDIT_USER_BY_ID, ERRORS_DELETE_USER_BY_ID,
  
  GET_CURRENT_USER_BY_ID, 
  
  FETCH_LESSONS, CREATE_LESSON,
  GET_LESSON_BY_ID, EDIT_LESSON_BY_ID, DELETE_LESSON_BY_ID, SELECTED_LESSON,
  
  ERRORS_FETCH_LESSONS, ERRORS_CREATE_LESSON,
  ERRORS_GET_LESSON_BY_ID, ERRORS_EDIT_LESSON_BY_ID, ERRORS_DELETE_LESSON_BY_ID,
  
  FETCH_INTERVIEW_QUESTIONS, CREATE_INTERVIEW_QUESTION,
  GET_INTERVIEW_QUESTION_BY_ID, EDIT_INTERVIEW_QUESTION_BY_ID, DELETE_INTERVIEW_QUESTION_BY_ID,
  
  ERRORS_FETCH_INTERVIEW_QUESTIONS, ERRORS_CREATE_INTERVIEW_QUESTION,
  ERRORS_GET_INTERVIEW_QUESTION_BY_ID, ERRORS_EDIT_INTERVIEW_QUESTION_BY_ID, ERRORS_DELETE_INTERVIEW_QUESTION_BY_ID,
  
  FETCH_INTERVIEW_QUESTIONS_ANSWERS, CREATE_INTERVIEW_QUESTION_ANSWER, 
  GET_INTERVIEW_QUESTION_ANSWER_BY_ID, EDIT_INTERVIEW_QUESTION_ANSWER_BY_ID, DELETE_INTERVIEW_QUESTION_ANSWER_BY_ID,
  
  ERRORS_FETCH_INTERVIEW_QUESTIONS_ANSWERS, ERRORS_CREATE_INTERVIEW_QUESTION_ANSWER, 
  ERRORS_GET_INTERVIEW_QUESTION_ANSWER_BY_ID, ERRORS_EDIT_INTERVIEW_QUESTION_ANSWER_BY_ID, ERRORS_DELETE_INTERVIEW_QUESTION_ANSWER_BY_ID,
  
  FETCH_SKILLS, CREATE_SKILL,
  GET_SKILL_BY_ID, EDIT_SKILL_BY_ID, DELETE_SKILL_BY_ID,
  
  ERRORS_FETCH_SKILLS, ERRORS_CREATE_SKILL,
  ERRORS_GET_SKILL_BY_ID, ERRORS_EDIT_SKILL_BY_ID, ERRORS_DELETE_SKILL_BY_ID,
  
  FETCH_HOMESCREEN_QUOTES,
  
  ERRORS_FETCH_HOMESCREEN_QUOTES,
} from './action_types'

import { 
  ROUTES_API,
  ROUTES_REACT
} from '../standards/routes'

const API_GATEWAY_INVOKE_URL = CREDENTIALS.apiUrl;

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
  headers: {
  //   'Content-Type': 'application/json; charset=utf-8'
  }
}

// console.log('unscheduledlessons: ', unscheduledlessons)

const initFetchCall = async (urlPath, optionConfig, doesEndPointNeedAuth) => {

  if(doesEndPointNeedAuth === true){
    const userInfo = await getSignInUserSession();
    const token = userInfo.idToken.jwtToken;
    // console.log('token @ auth in initFetch', token)
    optionConfig.headers['Authorization'] = token;
    optionConfig.headers['Content-Type'] = 'application/json';
    // console.log('optionConfig', optionConfig)
  }
  // if(endPointNeedsACAOHeader === true){
  //   optionConfig.headers['Access-Control-Allow-Origin'] = '*'
  // }
  // console.log('optConfig', optionConfig)
  let status, url, ok = ''
  // { body: (json), ok: boolean, url: '' }
  return fetch(urlPath, optionConfig)
    .then(response => {
      console.log('response', response)
      // if(response.status === 200){ response.json().then(json => console.log('json', json)) }
      status = response.status;
      ok = response.ok;
      // return response.json();
      if(response.ok){
        console.log('response @ then(1 - json())', response)
        return response.json()
          // .catch(err => {
          //   console.log('error @ then(1 - json().catch())', err)
          //   return Promise.reject(Response.error('Invalid JSON: ', err)) 
          // })
      }
      // console.log('error @ then(1 - json())', response)
      // return Promise.reject(Response.error(response))      
      return Promise.reject(response)
    })
    .then(resData => {
      const returnObj = {
        status,
        ok,
        body: resData
      }
      console.log('returnObj @ fetch(2)', returnObj)
      return returnObj
    })
    .catch(error => {
      console.log('error', error)
      return error
    //   // { body: (...), bodyUsed: false, headers: Headers {}, ok: false, redirected: false, status: 0, statusText: "", type: "error", url: ""}
    //   console.log('error @ catch(1)', Response.error(error))
    //   return Promise.reject(Response.error(error))
    //   // return Promise.reject(error)
    //   // return error
    })
    // .then(response => {
    //   status = response.status;
    //   return response.json()
    // })
    // .then(data => {
    //   return { 
    //     status: status,
    //     body: data
    //   }
    // })
    // .catch(err => err)
  }

const errorNotExistPayload = {
  // status: 200,
  body: null
}

export const getCurrentUserById = () => {
  const URL = `${API_GATEWAY_INVOKE_URL}${ROUTES_API.users}`
  let funcOptions = {...OPTIONS}
  funcOptions.method = HTTP_METHODS.get
  // console.log('currentUser', currentUser)
  return async dispatch => {
    // const currentUser = await getCurrentAuthenticatedUser()
    const currentUser = await initFetchCall(URL, funcOptions, true)
    // console.log('userAtt', currentUser)
    dispatch({
      type: GET_CURRENT_USER_BY_ID,
      payload: currentUser
    })
  }
}

export const fetchUsers = () => {
  const URL = `${API_GATEWAY_INVOKE_URL}${ROUTES_API.users}`
  let funcOptions = { ...OPTIONS };
  funcOptions.method = HTTP_METHODS.get;
  
  return async (dispatch) => {
    const response = await initFetchCall(URL, funcOptions, false)
      .then(res => {
        const { status, body } = res;
        console.log('response @ fetchUsers', response)
        if(status === 200){
          dispatch({ type: FETCH_USERS, payload: res })
          dispatch({ type: ERRORS_FETCH_USERS, payload: errorNotExistPayload })
        }
        return res
      })
      .catch(err => {
        console.log('err @ fetchUsers', err)
        // should get an error object { status, ok, body }
        dispatch({ type: ERRORS_FETCH_USERS, payload: err })
        return err
      })
    
  }
}

export const createUser = (newUser) => {
  
}

export const getUserById = () => {
  
}

export const editUserById = () => {
  
}

export const deleteUserById = () => {
  
}

export const fetchLessons = () => {
  // API CALL HERE
  const URL = `${API_GATEWAY_INVOKE_URL}${ROUTES_API.lessons}`
  let funcOptions = { ...OPTIONS }
  funcOptions.method = HTTP_METHODS.get
  
  return async (dispatch) => {
    const response = await initFetchCall(URL, funcOptions, true)
      .then(res => {
        const { status, body } = res
        console.log('response @ fetchLessons', res)
        // should get a response object {status, ok, body}
        if(status === 200){
          dispatch({ type: FETCH_LESSONS, payload: res })
          dispatch({ type: ERRORS_FETCH_LESSONS, payload: errorNotExistPayload })
        }
        return res
      })
      .catch(err => {
        console.log('err @ fetchLessons', err)
        // should get an error object { status, ok, body }
        dispatch({ type: ERRORS_FETCH_LESSONS, payload: err })
        return err
      })
  }
}

export const createLesson = (newLesson) => {
  console.log('formValues @ createLesson action:', newLesson)
  const URL = `${API_GATEWAY_INVOKE_URL}${ROUTES_API.lessons}`
  let funcOptions = { ...OPTIONS };
  funcOptions.method = HTTP_METHODS.post;
  funcOptions.body = JSON.stringify(ModelConverterForUpdate.returnBodyObject(dictModel.lesson, newLesson));
  console.log(funcOptions.body)
  return async (dispatch) => {
    const response = await initFetchCall(URL, funcOptions, true)
      .then(res => {
        const { status } = res;
        if(status === 200){
          dispatch({ type: CREATE_LESSON, payload: res })
          dispatch({ type: ERRORS_CREATE_LESSON, payload: errorNotExistPayload })
        }
        return res;
      })
      .catch(err => {
        dispatch({ type: ERRORS_CREATE_LESSON, payload: err })
        return err;
      })
    history.push(ROUTES_REACT.unscheduledlessons)
  }
}

export const getLessonById = (lessonId) => {
  console.log('lessonId @ getLessonById action: ', lessonId)
  const URL = `${API_GATEWAY_INVOKE_URL}${ROUTES_API.lessons}/${lessonId}`
  let funcOptions = {...OPTIONS};
  funcOptions.method = HTTP_METHODS.get
  
  return async (dispatch) => {
    const response = await initFetchCall(URL, funcOptions, true)
      .then(res => {
        const { status } = res;
        console.log('res @ getLessonByID: ', res)
        if(status === 200){
          dispatch({ type: GET_LESSON_BY_ID, payload: res })
          dispatch({ type: ERRORS_GET_LESSON_BY_ID, payload: errorNotExistPayload })
        }
        return res;
      })
      .catch(err => {
        dispatch({ type: ERRORS_GET_LESSON_BY_ID, payload: err })
        return err;
      })
  }
}

export const editLessonById = (edittedLesson) => {
  console.log('lessonId @ editLessonById action: ', edittedLesson.Id)
  console.log('formVals @ editLessonById action: ', edittedLesson)
  const URL = `${API_GATEWAY_INVOKE_URL}${ROUTES_API.lessons}/${edittedLesson.Id}`;
  let funcOptions = {...OPTIONS};
  funcOptions.method = HTTP_METHODS.put;
  funcOptions.body = JSON.stringify(ModelConverterForUpdate.returnBodyObject(dictModel.lesson, edittedLesson))
  console.log(funcOptions.body)
  
  return async (dispatch) => {
    const response = await initFetchCall(URL, funcOptions, true)
      .then(res => {
        const { status } = res;
        if(status === 200){
          console.log('res @ edit', res)
          dispatch({ type: EDIT_LESSON_BY_ID, payload: res })
          dispatch({ type: ERRORS_EDIT_LESSON_BY_ID, payload: errorNotExistPayload })
        }
        return res;
      })
      .catch(err => {
        dispatch({ type: ERRORS_EDIT_LESSON_BY_ID, payload: err })
        return err;
      })
    console.log('history push?')
    history.push(ROUTES_REACT.unscheduledlessons) 
  }
}

export const deleteLessonById = (lessonId) => {
  console.log('lessonId @ deleteLessonById action: ', lessonId)
  const URL = `${API_GATEWAY_INVOKE_URL}${ROUTES_API.lessons}/${lessonId}`
  console.log('url', URL)
  let funcOptions = {...OPTIONS};
  funcOptions.method = HTTP_METHODS.delete;
  funcOptions.body = JSON.stringify({ Id: lessonId })
  console.log('funcOptions', funcOptions)
  return async (dispatch) => {
    const response = await initFetchCall(URL, funcOptions, true)
      .then(res => {
        const { status, body } = res
        console.log('deleteLessonIdResponse: ', res)
        // should get a response object {status, ok, body}
        if(status === 200){
          dispatch({ type: DELETE_LESSON_BY_ID, payload: response })
          dispatch({ type: ERRORS_DELETE_LESSON_BY_ID, payload: errorNotExistPayload })
        }
        return res;
      })
      .catch(err => {
        dispatch({ type: ERRORS_DELETE_LESSON_BY_ID, payload: err })
        return err;
      })
    console.log('right before redirect')
    // history.push(ROUTES_REACT.unscheduledlessons)    
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
    const response = await initFetchCall(URL, funcOptions, true)
      .then(res => {
        const { status, body } = res
        console.log('response @ fetchIntQuests', res)
        // should get a response object {status, ok, body}
        if(status === 200){
          dispatch({ type: FETCH_INTERVIEW_QUESTIONS, payload: res })
          dispatch({ type: ERRORS_FETCH_INTERVIEW_QUESTIONS, payload: errorNotExistPayload })
        }
        return res
      })
      .catch(err => {
        console.log('err @ fetchIntQuests', err)
        // should get an error object { status, ok, body }
        dispatch({ type: ERRORS_FETCH_INTERVIEW_QUESTIONS, payload: err })
        return err
      })
  }
}

export const createInterviewQuestion = (newInterviewQuestion) => {
  console.log('newIntQuest @ createIntQuestion action: ', newInterviewQuestion)
  const URL = `${API_GATEWAY_INVOKE_URL}${ROUTES_API.interviewquestions}`
  let funcOptions = {...OPTIONS};
  funcOptions.method = HTTP_METHODS.post;
  funcOptions.body = JSON.stringify(ModelConverterForUpdate.returnBodyObject(dictModel.intQuestion, newInterviewQuestion));
  console.log('funcOptions @ createIntQuestion: ', funcOptions);
  
  return async (dispatch) => {
    const response = await initFetchCall(URL, funcOptions, true)
      .then(res => {
        const { status } = res;
        if(status === 200){
          dispatch({ type: CREATE_INTERVIEW_QUESTION, payload: res })
          dispatch({ type: ERRORS_CREATE_INTERVIEW_QUESTION, payload: errorNotExistPayload })
        }
        return res;
      })
      .catch(err => {
        dispatch({ type: ERRORS_CREATE_INTERVIEW_QUESTION, payload: err })
        return err;
      })
    history.push(ROUTES_REACT.interviewquestions)
  }
}

export const getInterviewQuestionById = (interviewquestionId) => {
  console.log('intQuestId @ getInterviewQuestionById action: ', interviewquestionId);
  const URL = `${API_GATEWAY_INVOKE_URL}${ROUTES_API.interviewquestions}/${interviewquestionId}`
  let funcOptions = {...OPTIONS};
  funcOptions.method = HTTP_METHODS.get
  
  return async (dispatch) => {
    const response = await initFetchCall(URL, funcOptions, true)
      .then(res => {
        const { status } = res;
        console.log('response @ getIntQuestionByID: ', response)
        if(status === 200){
          dispatch({ type: GET_INTERVIEW_QUESTION_BY_ID, payload: res })
          dispatch({ type: ERRORS_GET_INTERVIEW_QUESTION_BY_ID, payload: errorNotExistPayload })
        }
        return res;
      })
      .catch(err => {
        dispatch({ type: ERRORS_GET_INTERVIEW_QUESTION_BY_ID, payload: err })
        return err;
      })
  }
}

export const editInterviewQuestionById = (edittedInterviewQuestion) => {
  console.log('InterviewQuestionId @ editInterviewQuestionById action: ', edittedInterviewQuestion.Id)
  console.log('formVals @ editInterviewQuestionById action: ', edittedInterviewQuestion)
  const URL = `${API_GATEWAY_INVOKE_URL}${ROUTES_API.interviewquestions}/${edittedInterviewQuestion.Id}`;
  let funcOptions = {...OPTIONS};
  funcOptions.method = HTTP_METHODS.put;
  funcOptions.body = JSON.stringify(ModelConverterForUpdate.returnBodyObject(dictModel.intQuestion, edittedInterviewQuestion))
  console.log(funcOptions.body)
  
  return async (dispatch) => {
    const response = await initFetchCall(URL, funcOptions, true)
      .then(res => {
        const { status } = res;
        if(status === 200){
          console.log('res @ edit', res)
          dispatch({ type: EDIT_INTERVIEW_QUESTION_BY_ID, payload: res })
          dispatch({ type: ERRORS_EDIT_INTERVIEW_QUESTION_BY_ID, payload: errorNotExistPayload })
        }
        return res;
      })
      .catch(err => {
        dispatch({ type: ERRORS_EDIT_INTERVIEW_QUESTION_BY_ID, payload: err })
        return err;
      })
    // console.log('history push?')
    history.push(ROUTES_REACT.interviewquestions) 
  }
}

export const deleteInterviewQuestionById = (interviewquestionId, intQuestToDelete) => {
  console.log('intQuestId @ deleteIQById action: ', interviewquestionId)
  const URL = `${API_GATEWAY_INVOKE_URL}${ROUTES_API.interviewquestions}/${interviewquestionId}`
  let funcOptions = {...OPTIONS};
  funcOptions.method = HTTP_METHODS.delete;
  
  return async (dispatch) => {
    const response = await initFetchCall(URL, funcOptions, true)
      .then(res => {
        const { status } = res
        console.log('deleteIntQuestIdResponse: ', res)
        if(status === 200){
          dispatch({ type: DELETE_INTERVIEW_QUESTION_BY_ID, payload: res })
          dispatch({ type: ERRORS_DELETE_INTERVIEW_QUESTION_BY_ID, payload: errorNotExistPayload})
        }
        return res;
      })
      .catch(err => {
        dispatch({ type: ERRORS_DELETE_INTERVIEW_QUESTION_BY_ID, payload: err })
        return err;
      })
    history.push(ROUTES_REACT.unscheduledlessons)
  }
}

export const fetchInterviewQuestionsAnswers = () => {
  const URL = `${API_GATEWAY_INVOKE_URL}${ROUTES_API.interviewquestionsanswers}`
  let funcOptions = { ...OPTIONS };
  funcOptions.method = HTTP_METHODS.get;
  
  return async (dispatch) => {
    const response = await initFetchCall(URL, funcOptions, true)
      .then(res => {
        const { status, body } = res
        console.log('response @ fetchIntQuestsAns', res)
        // should get a response object {status, ok, body}
        if(status === 200){
          dispatch({ type: FETCH_INTERVIEW_QUESTIONS_ANSWERS, payload: res })
          dispatch({ type: ERRORS_FETCH_INTERVIEW_QUESTIONS_ANSWERS, payload: errorNotExistPayload })
        }
        return res
      })
      .catch(err => {
        console.log('err @ fetchIntQuestsAns', err)
        // should get an error object { status, ok, body }
        dispatch({ type: FETCH_INTERVIEW_QUESTIONS_ANSWERS, payload: err })
        return err
      })
  }
}

export const createInterviewQuestionAnswer = (newInterviewQuestionAnswer) => {
  console.log('newIntQuestAnswer @ createIntQuestionAnswer action: ', newInterviewQuestionAnswer);
  const URL = `${API_GATEWAY_INVOKE_URL}${ROUTES_API.interviewquestionsanswers}`
  let funcOptions = {...OPTIONS};
  funcOptions.method = HTTP_METHODS.post;
  funcOptions.body = JSON.stringify(ModelConverterForUpdate.returnBodyObject(dictModel.intQuestionAnswer, newInterviewQuestionAnswer));
  console.log('funcOptions @ createIntQuestionAnswer: ', funcOptions);
  
  return async (dispatch) => {
    const response = await initFetchCall(URL, funcOptions, true)
      .then(res => {
        const { status } = res;
        if(status === 200){
          dispatch({ type: CREATE_INTERVIEW_QUESTION_ANSWER, payload: res })
          dispatch({ type: ERRORS_CREATE_INTERVIEW_QUESTION_ANSWER, payload: errorNotExistPayload })
        }
        return res;
      })
      .catch(err => {
        dispatch({ type: ERRORS_CREATE_INTERVIEW_QUESTION_ANSWER, payload: err })
        return err;
      })
    history.push(ROUTES_REACT.interviewquestions)
  }
}

export const getInterviewQuestionAnswerById = (interviewquestionanswerId) => {
  console.log('intQuestionAnswerId @ getInterviewQuestionAnswerById action: ', interviewquestionanswerId);
  const URL = `${API_GATEWAY_INVOKE_URL}${ROUTES_API.interviewquestionsanswers}/${interviewquestionanswerId}`;
  let funcOptions = {...OPTIONS};
  funcOptions.method = HTTP_METHODS.get;
  
  return async (dispatch) => {
    const response = await initFetchCall(URL, funcOptions, true);
    console.log('response @ getIntQuestionAnswerById: ', response);
    dispatch({
      type: GET_INTERVIEW_QUESTION_ANSWER_BY_ID,
      payload: response
    })
  }
}

export const editInterviewQuestionAnswerById = () => {
  
}

export const deleteInterviewQuestionAnswerById = (interviewquestionanswerId) => {
  console.log('intQuestAnswerId @ deleteIQAById action: ', interviewquestionanswerId);
  const URL = `${API_GATEWAY_INVOKE_URL}${ROUTES_API.interviewquestionsanswers}/${interviewquestionanswerId}`;
  let funcOptions = {...OPTIONS};
  funcOptions.method = HTTP_METHODS.delete;
  
  return async (dispatch) => {
    const response = await initFetchCall(URL, funcOptions, true);
    console.log('response @ deleteIntQuestionAnswerById: ', response);
    dispatch({
      type: DELETE_INTERVIEW_QUESTION_ANSWER_BY_ID,
      payload: response
    })
  }
  
}

export const fetchSkills = () => {
  const URL = `${API_GATEWAY_INVOKE_URL}${ROUTES_API.skills}`;
  let funcOptions = { ...OPTIONS };
  funcOptions.method = HTTP_METHODS.get;
  
  return async (dispatch) => {
    const response = await initFetchCall(URL, funcOptions, true)
      .then(res => {
        const { status, body } = res
        console.log('response @ fetchSkills', res)
        // should get a response object {status, ok, body}
        if(status === 200){
          dispatch({ type: FETCH_SKILLS, payload: res })
          dispatch({ type: ERRORS_FETCH_SKILLS, payload: errorNotExistPayload })
        }
        return res
      })
      .catch(err => {
        console.log('err @ fetchSkills', err)
        // should get an error object { status, ok, body }
        dispatch({ type: ERRORS_FETCH_SKILLS, payload: err })
        return err
      })
  }
}

export const createSkill = () => {

}

export const getSkillById = () => {
  
}

export const editSkillById = () => {
  
}

export const deleteSkillById = () => {
  
}

export const fetchHomeScreenQuotes = () => {
  const URL = `${API_GATEWAY_INVOKE_URL}${ROUTES_API.homeScreenQuotes}`;
  let funcOptions = { ...OPTIONS }
  funcOptions.method = HTTP_METHODS.get
  
  return async (dispatch) => {
    const response = await initFetchCall(URL, funcOptions, false)
      .then(res => {
        const { status, body } = res
        console.log('response @ fetchHomescreenQuotes', res)
        // should get a response object {status, ok, body}
        if(status === 200){
          dispatch({ type: FETCH_HOMESCREEN_QUOTES, payload: res })
          dispatch({ type: ERRORS_FETCH_HOMESCREEN_QUOTES, payload: errorNotExistPayload })
        }
        return res
      })
      .catch(err => {
        console.log('err @ fetchHomescreenQuotes', err)
        // should get an error object { status, ok, body }
        dispatch({ type: ERRORS_FETCH_HOMESCREEN_QUOTES, payload: err })
        return err
      })
  }
}

// this is the entire object.
import { CREDENTIALS } from '../credentials/cognitoCreds'
import AWS from 'aws-sdk'
// import { browserHistory } from 'react-router'

import { getSignInUserSession, getCurrentAuthenticatedUser } from '../functions/authMethods';
// import LessonMethods from '../functions/lessonMethods';
// import OrderMethods from '../functions/orderMethods';

import {
  // SIGN_UP,
  // SIGN_IN,
  // SIGN_OUT,
  FETCH_USERS,
  GET_CURRENT_USER_BY_ID,
  
  FETCH_LESSONS,
  CREATE_LESSON,
  GET_LESSON_BY_ID,
  EDIT_LESSON_BY_ID,
  DELETE_LESSON_BY_ID,
  SELECTED_LESSON,
  
  FETCH_INTERVIEW_QUESTIONS,
  CREATE_INTERVIEW_QUESTION,
  GET_INTERVIEW_QUESTION_BY_ID,
  EDIT_INTERVIEW_QUESTION_BY_ID,
  DELETE_INTERVIEW_QUESTION_BY_ID,
  
  FETCH_INTERVIEW_QUESTIONS_ANSWERS,
  CREATE_INTERVIEW_QUESTION_ANSWER,
  GET_INTERVIEW_QUESTION_ANSWER_BY_ID,
  EDIT_INTERVIEW_QUESTION_ANSWER_BY_ID,
  DELETE_INTERVIEW_QUESTION_ANSWER_BY_ID,
  
  FETCH_SKILLS,
  CREATE_SKILL,
  GET_SKILL_BY_ID,
  EDIT_SKILL_BY_ID,
  DELETE_SKILL_BY_ID,
  
  FETCH_HOMESCREEN_QUOTES,
} from './action_types'

import { ROUTES_API } from '../standards/routes'

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

const initFetchCall = async (urlPath, optionConfig, endPointNeedsAuth) => {

  if(endPointNeedsAuth === true){
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
  console.log('optConfig', optionConfig)
  return fetch(urlPath, optionConfig)
    .then(response => response.json())
    .catch(error => error)
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
    // console.log('response @ fetchUsers', response)
    dispatch({
      type: FETCH_USERS,
      payload: response
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
    
    dispatch({
      type: FETCH_LESSONS,
      payload: response
    })
  }
}

export const createLesson = (newLesson) => {
  // console.log('formValues @ createLesson action:', newLesson)
  const URL = `${API_GATEWAY_INVOKE_URL}${ROUTES_API.lessons}`
  let funcOptions = { ...OPTIONS };
  funcOptions.method = HTTP_METHODS.post;
  funcOptions.body = JSON.stringify(AWS.DynamoDB.Converter.marshall(newLesson));
  // console.log('funcOptions', funcOptions)
  return async (dispatch) => {
    const response = await initFetchCall(URL, funcOptions, true);
    
    dispatch({
      type: CREATE_LESSON,
      payload: response
    })
    // browserHistory.push('/lessons/unscheduledlessons')
    // dispatch(push('/lessons/unscheduledlessons'))
  }
  
}

export const getLessonById = (lessonId) => {
  console.log('lessonId @ getLessonById action: ', lessonId)
  const URL = `${API_GATEWAY_INVOKE_URL}${ROUTES_API.lessons}/${lessonId}`
  let funcOptions = {...OPTIONS};
  funcOptions.method = HTTP_METHODS.get
  
  return async (dispatch) => {
    const response = await initFetchCall(URL, funcOptions, true)
    console.log('response @ getLessonByID: ', response)
    dispatch({
      type: GET_LESSON_BY_ID,
      payload: response
    })
  }
}

export const editLessonById = (lessonId, formValues) => {
  console.log('lessonId @ editLessonById action: ', lessonId)
  console.log('formVals @ editLessonById action: ', formValues)
  const URL = `${API_GATEWAY_INVOKE_URL}${ROUTES_API.lessons}/${lessonId}`;
  let funcOptions = {...OPTIONS};
  funcOptions.method = HTTP_METHODS.put;
  
  return async (dispatch) => {
    const response = await initFetchCall(URL, funcOptions, true)
    dispatch({
      type: EDIT_LESSON_BY_ID,
      payload: response
    })
  }
}

export const deleteLessonById = (lessonId) => {
  console.log('lessonId @ deleteLessonById action: ', lessonId)
  const URL = `${API_GATEWAY_INVOKE_URL}${ROUTES_API.lessons}/${lessonId}`
  let funcOptions = {...OPTIONS};
  funcOptions.method = HTTP_METHODS.delete;
  
  return async(dispatch) => {
    const response = await initFetchCall(URL, funcOptions, true);
    dispatch({
      type: DELETE_LESSON_BY_ID,
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
    const response = await initFetchCall(URL, funcOptions, true);
    
    dispatch({
      type: FETCH_INTERVIEW_QUESTIONS,
      payload: response
    })
  }
}

export const createInterviewQuestion = (newInterviewQuestion) => {
  console.log('newIntQuest @ createIntQuestion action: ', newInterviewQuestion)
  const URL = `${API_GATEWAY_INVOKE_URL}${ROUTES_API.interviewquestions}`
  let funcOptions = {...OPTIONS};
  funcOptions.method = HTTP_METHODS.post;
  funcOptions.body = JSON.stringify(AWS.DynamoDB.Converter.marshall(newInterviewQuestion));
  console.log('funcOptions @ createIntQuestion: ', funcOptions);
  
  return async (dispatch) => {
    const response = await initFetchCall(URL, funcOptions, true);
    dispatch({
      type: CREATE_INTERVIEW_QUESTION,
      payload: response
    })
  }
}

export const getInterviewQuestionById = (interviewquestionId) => {
  console.log('intQuestId @ getInterviewQuestionById action: ', interviewquestionId);
  const URL = `${API_GATEWAY_INVOKE_URL}${ROUTES_API.interviewquestions}/${interviewquestionId}`;
  let funcOptions = {...OPTIONS};
  funcOptions.method = HTTP_METHODS.get;
  
  return async (dispatch) => {
    const response = await initFetchCall(URL, funcOptions, true);
    console.log('response @ getIntQuestionByID: ', response)
    dispatch({
      type: GET_INTERVIEW_QUESTION_BY_ID,
      payload: response
    })
  }
}

export const editInterviewQuestionById = (interviewquestionId, formValues) => {
  
}

export const deleteInterviewQuestionById = (interviewquestionId) => {
  console.log('intQuestId @ deleteIQById action: ', interviewquestionId)
  const URL = `${API_GATEWAY_INVOKE_URL}${ROUTES_API.interviewquestions}/${interviewquestionId}`
  let funcOptions = {...OPTIONS};
  funcOptions.method = HTTP_METHODS.delete;
  
  return async (dispatch) => {
    const response = await initFetchCall(URL, funcOptions, true);
    dispatch({
      type: DELETE_INTERVIEW_QUESTION_BY_ID,
      payload: response
    })
  }
}

export const fetchInterviewQuestionsAnswers = () => {
  const URL = `${API_GATEWAY_INVOKE_URL}${ROUTES_API.interviewquestionsanswers}`
  let funcOptions = { ...OPTIONS };
  funcOptions.method = HTTP_METHODS.get;
  
  return async (dispatch) => {
    const response = await initFetchCall(URL, funcOptions, true);
    
    dispatch({
      type: FETCH_INTERVIEW_QUESTIONS_ANSWERS,
      payload: response
    })
  }


}

export const createInterviewQuestionAnswer = (newInterviewQuestionAnswer) => {
  console.log('newIntQuestAnswer @ createIntQuestionAnswer action: ', newInterviewQuestionAnswer);
  const URL = `${API_GATEWAY_INVOKE_URL}${ROUTES_API.interviewquestionsanswers}`
  let funcOptions = {...OPTIONS};
  funcOptions.method = HTTP_METHODS.post;
  funcOptions.body = JSON.stringify(AWS.DynamoDB.Converter.marshall(newInterviewQuestionAnswer));
  console.log('funcOptions @ createIntQuestionAnswer: ', funcOptions);
  
  return async (dispatch) => {
    const response = await initFetchCall(URL, funcOptions, true);
    dispatch({
      type: CREATE_INTERVIEW_QUESTION_ANSWER,
      payload: response
    })
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
    const response = await initFetchCall(URL, funcOptions, true);
    
    dispatch({
        type: FETCH_SKILLS,
        payload: response
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
    dispatch({
      type: FETCH_HOMESCREEN_QUOTES,
      payload: response
    })
  }
}

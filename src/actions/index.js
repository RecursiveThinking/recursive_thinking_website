// this is the entire object.
import { CREDENTIALS } from '../credentials/cognitoCreds'
// import AWS from 'aws-sdk'
// import { browserHistory } from 'react-router'

import { getSignInUserSession } from '../functions/authMethods';
// import LessonMethods from '../functions/lessonMethods';
import ModelConverterForUpdate from '../models/modelConverterForUpdate';

import DM from '../standards/dictModel'

import {history} from '../index';

import {
  FETCH_USERS, 
  CREATE_USER,
  GET_USER_BY_ID, EDIT_USER_BY_ID, DELETE_USER_BY_ID,
  
  ERRORS_FETCH_USERS, 
  ERRORS_CREATE_USER,
  ERRORS_GET_USER_BY_ID, ERRORS_EDIT_USER_BY_ID, ERRORS_DELETE_USER_BY_ID,
  
  GET_CURRENT_USER_BY_ID,
  
  ERRORS_CURRENT_USER_BY_ID,
  
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
  
  FETCH_SKILLS, 
  // CREATE_SKILL,
  // GET_SKILL_BY_ID, EDIT_SKILL_BY_ID, DELETE_SKILL_BY_ID,
  
  ERRORS_FETCH_SKILLS, 
  // ERRORS_CREATE_SKILL,
  // ERRORS_GET_SKILL_BY_ID, ERRORS_EDIT_SKILL_BY_ID, ERRORS_DELETE_SKILL_BY_ID,
  
  FETCH_HOMESCREEN_QUOTES,
  
  ERRORS_FETCH_HOMESCREEN_QUOTES,
} from './action_types'

import { 
  ROUTES_API,
  ROUTES_REACT
} from '../standards/routes'
// import dash from '../containers/dash/dash';

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

const initFetchCall = async (urlPath, optionConfig, doesEndPointNeedAuth) => {

  if(doesEndPointNeedAuth === true){
    const userInfo = await getSignInUserSession();
    const token = userInfo.idToken.jwtToken;
    // console.log('token @ auth in initFetch', token)
    optionConfig.headers['Authorization'] = token;
    optionConfig.headers['Content-Type'] = 'application/json';
    // console.log('optionConfig', optionConfig)
  }
  let status, ok = ''
  // { body: (json), ok: boolean, url: '' }
  return fetch(urlPath, optionConfig)
    .then(response => {
      // if(response.status === 200){ response.json().then(json => console.log('json', json)) }
      status = response.status;
      ok = response.ok;
      if(response.ok){
        console.log('response @ then(1 - json())', response)
        return response.json()
          // .catch(err => {
          //   console.log('error @ then(1 - json().catch())', err)
          //   return Promise.reject(Response.error('Invalid JSON: ', err)) 
          // })
      }
      console.log('error @ then(1 - json())', response)
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
    })
  }

const errorNotExistPayload = {
  // status: 200,
  body: null
}

export const getAuthUserById = (currentUserId) => {
  const URL = `${API_GATEWAY_INVOKE_URL}${ROUTES_API.users}/${currentUserId}`
  let funcOptions = {...OPTIONS}
  funcOptions.method = HTTP_METHODS.get
  // console.log('currentUser', currentUser)
  return async dispatch => {
    // const currentUser = await getCurrentAuthenticatedUser()
    await initFetchCall(URL, funcOptions, true)
      .then(res => {
        const { status } = res;
        console.log('res @ getCurrentUserByID: ', res)
        if(status === 200){
          dispatch({ type: GET_CURRENT_USER_BY_ID, payload: res })
          dispatch({ type: ERRORS_CURRENT_USER_BY_ID, payload: errorNotExistPayload })
        }
        return res;
      })
      .catch(err => {
        dispatch({ type: ERRORS_CURRENT_USER_BY_ID, payload: err })
        return err;
      })
  }
}

export const getCurrentUserById = () => {
  
  return async (dispatch) => {
    await getSignInUserSession()
      .then(userInSesson => {
        console.log('currentAuthedUser: ', userInSesson)
        dispatch(currentUser(userInSesson.idToken.payload.sub))
        // console.log('user', user)
        return userInSesson;
      })
      .catch(err => {
        console.log('error at getCurrentUserById: ', err)
        return err;
      })
  }
}

export const currentUser = (userId) => {
  const URL = `${API_GATEWAY_INVOKE_URL}${ROUTES_API.users}/${userId}`
  let funcOptions = {...OPTIONS}
  funcOptions.method = HTTP_METHODS.get
  // console.log('currentUser', currentUser)
  return async (dispatch) => {
    // const currentUser = await getCurrentAuthenticatedUser()
    await initFetchCall(URL, funcOptions, true)
      .then(res => {
        const { status } = res;
        console.log('res @ getUserByID: ', res)
        if(status === 200){
          dispatch({ type: GET_CURRENT_USER_BY_ID, payload: res })
          dispatch({ type: ERRORS_CURRENT_USER_BY_ID, payload: errorNotExistPayload })
        }
        return res;
      })
      .catch(err => {
        dispatch({ type: ERRORS_CURRENT_USER_BY_ID, payload: err })
        return err;
      })
  }
}
  
export const fetchUsers = () => {
  const URL = `${API_GATEWAY_INVOKE_URL}${ROUTES_API.users}`
  let funcOptions = { ...OPTIONS };
  funcOptions.method = HTTP_METHODS.get;
  
  return async (dispatch) => {
    await initFetchCall(URL, funcOptions, false)
      .then(res => {
        const { status } = res;
        console.log('response @ fetchUsers', res)
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
  console.log('userValues @ createUser action: ', newUser);
  const URL = `${API_GATEWAY_INVOKE_URL}${ROUTES_API.users}`
  let funcOptions = { 
    ...OPTIONS,
    method: HTTP_METHODS.post,
    body: JSON.stringify(ModelConverterForUpdate.returnBodyObject(DM.user, newUser))
  };
  console.log('funcOptions', funcOptions);
  return async (dispatch) => {
    await initFetchCall(URL, funcOptions, false)
      .then(res => {
        const { status } = res;
        console.log('createUserIdResponse: ', res)
        if(status === 200){
          dispatch(currentUser(res.body.userId))
          dispatch({ type: CREATE_USER, payload: res })
          dispatch({ type: ERRORS_CREATE_USER, payload: errorNotExistPayload })
        }
        if(res.body.isProfileSetup){
          console.log('route from createUser to Dashboard')
          history.push(ROUTES_REACT.dashboard)
        } else {
          console.log('route from createUser to editUser')
          history.push(`${ROUTES_REACT.users_setup}/${res.body.userId}`)
        }
        return res
      })
      .err(err => {
        dispatch({ type: ERRORS_CREATE_USER, payload: err})
        history.push(ROUTES_REACT.profile_create)
        return err
      })
  }
}

export const getUserById = (userId) => {
  const URL = `${API_GATEWAY_INVOKE_URL}${ROUTES_API.users}/${userId}`
  let funcOptions = {...OPTIONS}
  funcOptions.method = HTTP_METHODS.get
  // console.log('currentUser', currentUser)
  return async dispatch => {
    // const currentUser = await getCurrentAuthenticatedUser()
    await initFetchCall(URL, funcOptions, false)
      .then(res => {
        const { status } = res;
        console.log('res @ getUserByID: ', res)
        if(status === 200){
          dispatch({ type: GET_USER_BY_ID, payload: res })
          dispatch({ type: ERRORS_GET_USER_BY_ID, payload: errorNotExistPayload })
        }
        return res;
      })
      .catch(err => {
        dispatch({ type: ERRORS_GET_USER_BY_ID, payload: err })
        return err;
      })
  }
}

export const editUserById = (edittedUser, thenPushPath, catchPushPath) => {
  const {
    user
  } = DM
  console.log('userObj @ editUserById action: ', edittedUser);
  const URL = `${API_GATEWAY_INVOKE_URL}${ROUTES_API.users}/${edittedUser.userId}`;
  let funcOptions = {...OPTIONS};
  funcOptions.method = HTTP_METHODS.put;
  edittedUser[user.updatedAt] = new Date().toString();
  funcOptions.body = JSON.stringify(ModelConverterForUpdate.returnBodyObject(DM.user, edittedUser));
  console.log('funcOptions @ editUserById: ', funcOptions.body);
  
  return async (dispatch) => {
    await initFetchCall(URL, funcOptions, false)
      .then(res => {
        const { status } = res;
        console.log('res @ editUserById: ', res);
        if(status === 200){
          dispatch({ type: EDIT_USER_BY_ID, payload: res });
          dispatch({ type: ERRORS_EDIT_USER_BY_ID, payload: errorNotExistPayload });
        }
        history.push(thenPushPath)
        return res;
      })
      .catch(err => {
        dispatch({ type: ERRORS_EDIT_USER_BY_ID, payload: err})
        history.push(catchPushPath)        
        return err;
      })
  }
}

export const deleteUserById = (userId) => {
  
}

export const fetchLessons = () => {
  // API CALL HERE
  const URL = `${API_GATEWAY_INVOKE_URL}${ROUTES_API.lessons}`
  let funcOptions = { ...OPTIONS }
  funcOptions.method = HTTP_METHODS.get
  
  return async (dispatch) => {
    await initFetchCall(URL, funcOptions, true)
      .then(res => {
        const { status } = res
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
  funcOptions.body = JSON.stringify(ModelConverterForUpdate.returnBodyObject(DM.lesson, newLesson));
  console.log(funcOptions.body)
  return async (dispatch) => {
    await initFetchCall(URL, funcOptions, true)
      .then(res => {
        const { status } = res;
        console.log('createLessonIdResponse: ', res)        
        if(status === 200){
          dispatch({ type: CREATE_LESSON, payload: res })
          dispatch({ type: ERRORS_CREATE_LESSON, payload: errorNotExistPayload })
        }
        console.log('createLesson before reroute to unscheduled lessons')
        console.log('this is history before history.push', history)        
        history.push(ROUTES_REACT.unscheduledlessons)
        console.log('this is history after history.push', history)
        return res;
      })
      .catch(err => {
        dispatch({ type: ERRORS_CREATE_LESSON, payload: err })
        history.push(ROUTES_REACT.lessons_create)        
        return err;
      })
  }
}

export const getLessonById = (lessonId) => {
  console.log('lessonId @ getLessonById action: ', lessonId)
  const URL = `${API_GATEWAY_INVOKE_URL}${ROUTES_API.lessons}/${lessonId}`
  let funcOptions = {...OPTIONS};
  funcOptions.method = HTTP_METHODS.get
  
  return async (dispatch) => {
    await initFetchCall(URL, funcOptions, true)
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
  // console.log('lessonId @ editLessonById action: ', edittedLesson.Id)
  console.log('lessonObj @ editLessonById action: ', edittedLesson)
  const URL = `${API_GATEWAY_INVOKE_URL}${ROUTES_API.lessons}/${edittedLesson.Id}`;
  let funcOptions = {...OPTIONS};
  funcOptions.method = HTTP_METHODS.put;
  funcOptions.body = JSON.stringify(ModelConverterForUpdate.returnBodyObject(DM.lesson, edittedLesson))
  console.log(funcOptions.body)
  
  return async (dispatch) => {
    await initFetchCall(URL, funcOptions, true)
      .then(res => {
        const { status } = res;
        if(status === 200){
          console.log('res @ edit', res)
          dispatch({ type: EDIT_LESSON_BY_ID, payload: res })
          dispatch({ type: ERRORS_EDIT_LESSON_BY_ID, payload: errorNotExistPayload })
        }
        console.log('history push to unsched @ editLessonId')
        history.push(ROUTES_REACT.unscheduledlessons) 
        return res;
      })
      .catch(err => {
        dispatch({ type: ERRORS_EDIT_LESSON_BY_ID, payload: err })
        console.log('history push to back to editLesson @ editLessonId')        
        history.push(`${ROUTES_REACT.lessons_edit}/${edittedLesson.Id}`)
        return err;
      })
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
    await initFetchCall(URL, funcOptions, true)
      .then(res => {
        const { status } = res
        console.log('deleteLessonIdResponse: ', res)
        // should get a response object {status, ok, body}
        if(status === 200){
          dispatch({ type: DELETE_LESSON_BY_ID, payload: res })
          dispatch({ type: ERRORS_DELETE_LESSON_BY_ID, payload: errorNotExistPayload })
        }
        console.log('history push to unsched @ deleteLessonId')
        history.push(ROUTES_REACT.unscheduledlessons)
        return res;
      })
      .catch(err => {
        dispatch({ type: ERRORS_DELETE_LESSON_BY_ID, payload: err })
        console.log('history push to back to delLesson @ delLessonId')        
        history.push(`${ROUTES_REACT.lessons_delete}/${lessonId}`)
        return err;
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
    await initFetchCall(URL, funcOptions, true)
      .then(res => {
        const { status } = res
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
  funcOptions.body = JSON.stringify(ModelConverterForUpdate.returnBodyObject(DM.intQuestion, newInterviewQuestion));
  console.log('funcOptions @ createIntQuestion: ', funcOptions);
  
  return async (dispatch) => {
    await initFetchCall(URL, funcOptions, true)
      .then(res => {
        const { status } = res;
        if(status === 200){
          dispatch({ type: CREATE_INTERVIEW_QUESTION, payload: res })
          dispatch({ type: ERRORS_CREATE_INTERVIEW_QUESTION, payload: errorNotExistPayload })
        }
        console.log('history push to intQuest @ createintQuestId')        
        history.push(ROUTES_REACT.interviewquestions)
        return res;
      })
      .catch(err => {
        dispatch({ type: ERRORS_CREATE_INTERVIEW_QUESTION, payload: err })
        console.log('history push to back to createIntQuest @ createintQuestId')                
        history.push(ROUTES_REACT.interviewquestions_create)        
        return err;
      })
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
  funcOptions.body = JSON.stringify(ModelConverterForUpdate.returnBodyObject(DM.intQuestion, edittedInterviewQuestion))
  console.log(funcOptions.body)
  
  return async (dispatch) => {
    await initFetchCall(URL, funcOptions, true)
      .then(res => {
        const { status } = res;
        if(status === 200){
          console.log('res @ edit', res)
          dispatch({ type: EDIT_INTERVIEW_QUESTION_BY_ID, payload: res })
          dispatch({ type: ERRORS_EDIT_INTERVIEW_QUESTION_BY_ID, payload: errorNotExistPayload })
        }
        console.log('history push to intQuest @ editLessonId')        
        history.push(ROUTES_REACT.interviewquestions)
        return res;
      })
      .catch(err => {
        dispatch({ type: ERRORS_EDIT_INTERVIEW_QUESTION_BY_ID, payload: err })
        console.log('history push to back to editIntQuest @ editLessonId')        
        history.push(`${ROUTES_REACT.interviewquestions_edit}/${edittedInterviewQuestion.Id}`)
        return err;
      })
  }
}

export const deleteInterviewQuestionById = (interviewquestionId) => {
  console.log('intQuestId @ deleteIQById action: ', interviewquestionId)
  const URL = `${API_GATEWAY_INVOKE_URL}${ROUTES_API.interviewquestions}/${interviewquestionId}`
  let funcOptions = {...OPTIONS};
  funcOptions.method = HTTP_METHODS.delete;
  
  return async (dispatch) => {
    await initFetchCall(URL, funcOptions, true)
      .then(res => {
        const { status } = res
        console.log('deleteIntQuestIdResponse: ', res)
        if(status === 200){
          dispatch({ type: DELETE_INTERVIEW_QUESTION_BY_ID, payload: res })
          dispatch({ type: ERRORS_DELETE_INTERVIEW_QUESTION_BY_ID, payload: errorNotExistPayload})
        }
        console.log('history push to intQuest @ deleteLessonId')        
        history.push(ROUTES_REACT.interviewquestions)
        return res;
      })
      .catch(err => {
        dispatch({ type: ERRORS_DELETE_INTERVIEW_QUESTION_BY_ID, payload: err })
        console.log('history push to back to deleteIntQuest @ deleteLessonId')        
        history.push(`${ROUTES_REACT.interviewquestions_delete}/${interviewquestionId}`)        
        return err;
      })
    history.push(ROUTES_REACT.interviewquestions)
  }
}

export const fetchInterviewQuestionsAnswers = () => {
  const URL = `${API_GATEWAY_INVOKE_URL}${ROUTES_API.interviewquestionsanswers}`
  let funcOptions = { ...OPTIONS };
  funcOptions.method = HTTP_METHODS.get;
  
  return async (dispatch) => {
    await initFetchCall(URL, funcOptions, true)
      .then(res => {
        const { status } = res
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

export const createInterviewQuestionAnswer = (newInterviewQuestionAnswer, intQuestId) => {
  console.log('newIntQuestAnswer @ createIntQuestionAnswer action: ', newInterviewQuestionAnswer);
  const URL = `${API_GATEWAY_INVOKE_URL}${ROUTES_API.interviewquestionsanswers}`
  let funcOptions = {...OPTIONS};
  funcOptions.method = HTTP_METHODS.post;
  funcOptions.body = JSON.stringify(ModelConverterForUpdate.returnBodyObject(DM.intQuestionAnswer, newInterviewQuestionAnswer));
  console.log('funcOptions @ createIntQuestionAnswer: ', funcOptions);
  
  return async (dispatch) => {
    await initFetchCall(URL, funcOptions, true)
      .then(res => {
        const { status } = res;
        if(status === 200){
          // dispatch(editInterviewQuestionById(edittedIntQuest))
          dispatch({ type: CREATE_INTERVIEW_QUESTION_ANSWER, payload: res })
          dispatch({ type: ERRORS_CREATE_INTERVIEW_QUESTION_ANSWER, payload: errorNotExistPayload })
        }
        history.push(ROUTES_REACT.interviewquestions)
        return res;
      })
      .catch(err => {
        dispatch({ type: ERRORS_CREATE_INTERVIEW_QUESTION_ANSWER, payload: err })
        console.log('history push to back to deleteIntQuest @ deleteLessonId')        
        history.push(`${ROUTES_REACT.interviewquestionsanswers_create}/${intQuestId}/answers/create`)
        return err;
      })
  }
}

export const getInterviewQuestionAnswerById = (interviewquestionanswerId) => {
  console.log('intQuestionAnswerId @ getInterviewQuestionAnswerById action: ', interviewquestionanswerId);
  const URL = `${API_GATEWAY_INVOKE_URL}${ROUTES_API.interviewquestionsanswers}/${interviewquestionanswerId}`;
  let funcOptions = {...OPTIONS};
  funcOptions.method = HTTP_METHODS.get;
  
  return async (dispatch) => {
    await initFetchCall(URL, funcOptions, true)
      .then(res => {
        const { status } = res;
        console.log('response @ getIntQuestionAnswerById: ', res);
        if(status === 200){
          dispatch({ type: GET_INTERVIEW_QUESTION_ANSWER_BY_ID, payload: res })
          dispatch({ type: ERRORS_GET_INTERVIEW_QUESTION_ANSWER_BY_ID, payload: errorNotExistPayload })
        }
        return res;
      })
      .catch(err => {
        dispatch({ type: ERRORS_GET_INTERVIEW_QUESTION_ANSWER_BY_ID, payload: err })
        return err;
      })
  }
}

export const editInterviewQuestionAnswerById = (edittedInterviewQuestionAnswer, intQuestId) => {
  console.log('InterviewQuestionAnswerId @ editInterviewQuestionById action: ', edittedInterviewQuestionAnswer.Id)
  console.log('edittedIntQuestAns @ editInterviewQuestionAnswerById action: ', edittedInterviewQuestionAnswer)
  const URL = `${API_GATEWAY_INVOKE_URL}${ROUTES_API.interviewquestionsanswers}/${edittedInterviewQuestionAnswer.Id}`
  let funcOptions = {...OPTIONS};
  funcOptions.method = HTTP_METHODS.put
  funcOptions.body = JSON.stringify(ModelConverterForUpdate.returnBodyObject(DM.intQuestionAnswer, edittedInterviewQuestionAnswer))
  console.log('funcOptions @ editIntQuestAnswer: ', funcOptions)
  
  return async (dispatch) => {
    // const response = 
    await initFetchCall(URL, funcOptions, true)
      .then(res => {
        const { status } = res;
        if(status === 200){
          dispatch({ type: EDIT_INTERVIEW_QUESTION_ANSWER_BY_ID, payload: res })
          dispatch({ type: ERRORS_EDIT_INTERVIEW_QUESTION_ANSWER_BY_ID, payload: errorNotExistPayload })
        }
        history.push(ROUTES_REACT.interviewquestions)        
        return res;
      })
      .catch(err => {
        dispatch({ type: ERRORS_EDIT_INTERVIEW_QUESTION_ANSWER_BY_ID, payload: err })
        history.push(`${ROUTES_REACT.interviewquestions}/${intQuestId}/answers/edit/${edittedInterviewQuestionAnswer.Id}`)        
      })
  }
}

export const deleteInterviewQuestionAnswerById = (interviewquestionanswerId, intQuestId) => {
  console.log('intQuestAnswerId @ deleteIQAById action: ', interviewquestionanswerId);
  const URL = `${API_GATEWAY_INVOKE_URL}${ROUTES_API.interviewquestionsanswers}/${interviewquestionanswerId}`;
  let funcOptions = {...OPTIONS};
  funcOptions.method = HTTP_METHODS.delete;
  
  return async (dispatch) => {
    // const response = 
    await initFetchCall(URL, funcOptions, true)
      .then(res => {
        const { status } = res
        console.log('deleteIntQuestAnsId Resopnse: ', res);
        if(status === 200){
          dispatch({ type: DELETE_INTERVIEW_QUESTION_ANSWER_BY_ID, payload: res })
          dispatch({ type: ERRORS_DELETE_INTERVIEW_QUESTION_ANSWER_BY_ID, payload: res })
        }
        return res;
      })
      .catch(err => {
        dispatch({ type: ERRORS_DELETE_INTERVIEW_QUESTION_ANSWER_BY_ID, payload: err })
        history.push(`${ROUTES_REACT.interviewquestions}/${intQuestId}/answers/delete/${interviewquestionanswerId}`)                
        return err
      })
    // console.log('response @ deleteIntQuestionAnswerById: ', response);
  }
  
}

export const fetchSkills = () => {
  const URL = `${API_GATEWAY_INVOKE_URL}${ROUTES_API.skills}`;
  let funcOptions = { ...OPTIONS };
  funcOptions.method = HTTP_METHODS.get;
  
  return async (dispatch) => {
    await initFetchCall(URL, funcOptions, true)
      .then(res => {
        const { status } = res
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
    await initFetchCall(URL, funcOptions, false)
      .then(res => {
        const { status } = res
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

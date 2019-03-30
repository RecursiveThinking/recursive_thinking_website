// this is the entire object.
import { CREDENTIALS } from '../credentials/cognitoCreds'
// import AWS from 'aws-sdk'
// import { browserHistory } from 'react-router'

import { getCurrentUserFromSession, signOut } from '../functions/authMethods';
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
  
  ERRORS_GET_CURRENT_USER_BY_ID,
  
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
  CREATE_SKILL,
  GET_SKILL_BY_ID, EDIT_SKILL_BY_ID, DELETE_SKILL_BY_ID,
  
  ERRORS_FETCH_SKILLS, 
  ERRORS_CREATE_SKILL,
  ERRORS_GET_SKILL_BY_ID, ERRORS_EDIT_SKILL_BY_ID, ERRORS_DELETE_SKILL_BY_ID,
  
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

export const isPayloadEmpty = (obj) => {
  for(var key in obj) {
    if(obj.hasOwnProperty(key))
      return false;
  }
  return true;
}

export const checkThenReturnAppropriateResBody = (responseBody) => {
  // this will check to see if the response body is an empty object ( because .get Dynamo method returns an empty object in the body id nothing is found.  Yeah, its stupid... )
  if(isPayloadEmpty(responseBody)){
    // the response body is an empty object, overwrite the body to evaluate falsy
    console.log('res body is empty, setting to null')
    responseBody = null;
  } else { 
    // the response body is a valid object, so return it of the key from the DB (Item)
    console.log('res body has return, set to .Item from DynamoDB')
    responseBody = responseBody.Item
  }
  return responseBody
}

const initFetchCall = async (urlPath, optionConfig, doesEndPointNeedAuth) => {

  if(doesEndPointNeedAuth === true){
    const userInfo = await getCurrentUserFromSession();
    console.log('userFromSession: ', userInfo)
    const token = userInfo.idToken.jwtToken;
    console.log('token @ auth in initFetch', token)
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

export const getCurrentUserById = () => {
  
  return async (dispatch) => {
    await getCurrentUserFromSession()
      .then(userInSesson => {
        console.log('@ getCurrentUserById Action - userInSesson: ', userInSesson)
        dispatch(currentUser(userInSesson.idToken.payload.sub))
        // dispatch()
        // console.log('user', user)
        return userInSesson;
      })
      .catch(err => {
        console.log('error at getCurrentUserById: ', err)
        // else we should signout and boot the person back to '/'?
        return err;
      })
  }
}

export const currentUser = (userId) => {
  console.log('userId @ currentUser action: ', userId)
  // userId = "9sdd7120-8ed0-11e8-b260-d5e4455e16bd"
  // \/ GOOD /\ BAD
  // userId = "9cdd7120-8ed0-11e8-b260-d5e4455e16bd"
  const URL = `${API_GATEWAY_INVOKE_URL}${ROUTES_API.users}/${userId}`
  let funcOptions = {...OPTIONS}
  funcOptions.method = HTTP_METHODS.get
  // console.log('currentUser', currentUser)
  return async (dispatch) => {
    // const currentUser = await getCurrentAuthenticatedUser()
    await initFetchCall(URL, funcOptions, false)
      .then(res => {
        const { status } = res;
        console.log('res @ getUserByID: ', res)
        // console.log('typeof res: ', typeof res)
        if(status === 200){
          res.body = checkThenReturnAppropriateResBody(res.body)
          console.log('res.body: ', res.body) 
          dispatch({ type: GET_CURRENT_USER_BY_ID, payload: res })
          dispatch({ type: ERRORS_GET_CURRENT_USER_BY_ID, payload: errorNotExistPayload })
        }
        return res;
        // if(typeof res === 'object'){
        //   // console.log('Then the request was invalid and did not get to the lambda');
        //   let customError = {
        //     body: {
        //       status: 502,
        //       message: 'The request was invalid, and failed at the Lambda. Typically, this is because the request payload was ill-formed. Check your Cloudwatch Logs for the full error.'
        //     }
        //   }
        //   dispatch({ type: ERRORS_GET_CURRENT_USER_BY_ID, payload: customError })
        //   return res;
        // }
        // return res;
      })
      .catch(err => {
        dispatch({ type: ERRORS_GET_CURRENT_USER_BY_ID, payload: err })
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
  let funcOptions = { ...OPTIONS };
  funcOptions.method = HTTP_METHODS.post;
  funcOptions.body = JSON.stringify(ModelConverterForUpdate.returnBodyObject(DM.user, newUser));
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
        // if(res.body.isProfileSetup){
        //   console.log('route from createUser to Dashboard')
        //   history.push(ROUTES_REACT.dashboard)
        // } else {
        //   console.log('route from createUser to editUser')
        //   history.push(`${ROUTES_REACT.users_setup}/${res.body.userId}`)
        // }
        return res
      })
      .catch(err => {
        dispatch({ type: ERRORS_CREATE_USER, payload: err})
        history.push(ROUTES_REACT.profile_create)
        return err
      })
  }
}

export const getUserById = (userId) => {
  console.log('userId @ getUserById action: ', userId)
  // userId = "9sdd7120-8ed0-11e8-b260-d5e4455e16bd"
  // \/ GOOD /\ BAD
  // userId = "9cdd7120-8ed0-11e8-b260-d5e4455e16bd"
  const URL = `${API_GATEWAY_INVOKE_URL}${ROUTES_API.users}/${userId}`
  let funcOptions = {...OPTIONS}
  funcOptions.method = HTTP_METHODS.get
  // console.log('currentUser', currentUser)
  return async (dispatch) => {
    // const currentUser = await getCurrentAuthenticatedUser()
    await initFetchCall(URL, funcOptions, false)
      .then(res => {
        const { status } = res;
        console.log('res @ getUserByID: ', res)
        if(status === 200){
          res.body = checkThenReturnAppropriateResBody(res.body)
          console.log('res.body: ', res.body)          
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

export const editUserLastLogout = (userObj, thenPushPath, catchPushPath) => {
  const { user: { lastLogout } } = DM;
  console.log('userObj @ editUserLastLogout action: ', userObj);
  let dupUserObj = { ...userObj };
  dupUserObj[lastLogout] = new Date().toString();
  //
  const URL = `${API_GATEWAY_INVOKE_URL}${ROUTES_API.users}/${userObj.userId}`;
  let funcOptions = {...OPTIONS};
  funcOptions.method = HTTP_METHODS.put;
  funcOptions.body = JSON.stringify(ModelConverterForUpdate.returnBodyObject(DM.user, dupUserObj));
  
  return async (dispatch) => {
    await initFetchCall(URL, funcOptions, false)
      .then(res => {
        console.log('res @ editUserLastLogout action then if: ', res);
        signOut()
          .then(data => {
            history.push(ROUTES_REACT.root);
            return data;
          })
          .catch(err => {
            return err;
          })
        return res;
      })
      .catch(err => {
        console.log('err: ', err);
        return err;
      })
  }
}

export const editUserById = (edittedUser, thenPushPath, catchPushPath, removeUserIdFromTheseSkillObjs, addUserIdToTheseSkillObjs) => {
  const { user: { updatedAt } } = DM
  console.log('userObj @ editUserById action: ', edittedUser);
  const URL = `${API_GATEWAY_INVOKE_URL}${ROUTES_API.users}/${edittedUser.userId}`;
  let funcOptions = {...OPTIONS};
  funcOptions.method = HTTP_METHODS.put;
  // revise updatedAt
  edittedUser[updatedAt] = new Date().toString();
  funcOptions.body = JSON.stringify(ModelConverterForUpdate.returnBodyObject(DM.user, edittedUser));
  // console.log('funcOptions @ editUserById: ', funcOptions.body);
  
  return async (dispatch) => {
    await initFetchCall(URL, funcOptions, false)
      .then(res => {
        const { status } = res;
        if(status === 200){
          console.log('res @ editUserById action then if: ', res);
          // re,pve userId to these skillObjs          
          if(removeUserIdFromTheseSkillObjs){
            if(removeUserIdFromTheseSkillObjs.length){
              removeUserIdFromTheseSkillObjs.forEach(skillObj => {
                let dupSkillObj = { ...skillObj };
                const { profileSkill: { _usersWithSkill, updatedAt }} = DM;
                // remove userId from skillObj
                console.log('editUserById - remove userId from skill (before): ', edittedUser.userId, dupSkillObj)
                dupSkillObj[_usersWithSkill] = dupSkillObj[_usersWithSkill].filter(userId => userId !== edittedUser.userId);
                console.log('editUserById - remove userId from skill (after): ', edittedUser.userId, dupSkillObj)
                dispatch(editSkillById(dupSkillObj, null, null))
              })
            }
          }
          // add userId to these skillObjs
          if(addUserIdToTheseSkillObjs){
            if(addUserIdToTheseSkillObjs.length){
              addUserIdToTheseSkillObjs.forEach(skillObj => {
                let dupSkillObj = { ...skillObj };
                const { profileSkill: { _usersWithSkill }} = DM;
                console.log('editUserById = add userId from skill (before): ', edittedUser.userId, dupSkillObj);
                dupSkillObj[_usersWithSkill].push(edittedUser.userId)
                console.log('editUserById = add userId from skill (after): ', edittedUser.userId, dupSkillObj);
                dispatch(editSkillById(dupSkillObj, null, null))
              })
            }
          }
          // then successfully updated user object before go to reducer, editskills
          dispatch(getCurrentUserById())
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
  // this should just make users inactive.
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
  // console.log('lessonId @ getLessonById action: ', lessonId)
  // lessonId = "8d57c8d7-8e19-11e8-924a-a70245d1837e"
  // \/ GOOD /\ BAD
  // lessonId = "8c57c8d7-8e19-11e8-924a-a70245d1837e"
  const URL = `${API_GATEWAY_INVOKE_URL}${ROUTES_API.lessons}/${lessonId}`
  let funcOptions = {...OPTIONS};
  funcOptions.method = HTTP_METHODS.get
  
  return async (dispatch) => {
    await initFetchCall(URL, funcOptions, true)
      .then(res => {
        const { status } = res;
        console.log('res @ getLessonByID: ', res)
        if(status === 200){
          res.body = checkThenReturnAppropriateResBody(res.body)
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

export const editLessonById = (edittedLesson, thenPushPath, catchPushPath) => {
  const { lesson: { updatedAt } } = DM
  // console.log('lessonId @ editLessonById action: ', edittedLesson.Id)
  console.log('lessonObj @ editLessonById action: ', edittedLesson)
  const URL = `${API_GATEWAY_INVOKE_URL}${ROUTES_API.lessons}/${edittedLesson.Id}`;
  let funcOptions = {...OPTIONS};
  funcOptions.method = HTTP_METHODS.put;
  edittedLesson[updatedAt] = new Date().toString();
  funcOptions.body = JSON.stringify(ModelConverterForUpdate.returnBodyObject(DM.lesson, edittedLesson))
  // console.log(funcOptions.body)
  
  return async (dispatch) => {
    await initFetchCall(URL, funcOptions, true)
      .then(res => {
        const { status } = res;
        if(status === 200){
          console.log('res @ editLesson if: ', res)
          dispatch({ type: EDIT_LESSON_BY_ID, payload: res })
          dispatch({ type: ERRORS_EDIT_LESSON_BY_ID, payload: errorNotExistPayload })
        }
        console.log(`@ editLesson then: ${thenPushPath}`)
        history.push(thenPushPath) 
        return res;
      })
      .catch(err => {
        dispatch({ type: ERRORS_EDIT_LESSON_BY_ID, payload: err })
        console.log(`@ editLesson catch: ${catchPushPath}`)        
        history.push(catchPushPath)
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
          // if interview question goes thorugh, we need to update the _interviewquestionsWithCategory for each Id in the newInterviewQuestion.categories
          if(newInterviewQuestion.categories.length){
            //
            newInterviewQuestion.categories.forEach(categoryid => {
              dispatch(editSkillById(categoryid, null, null, null, newInterviewQuestion.Id))
            })
          }
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
  // interviewquestionId = "870e9780-8e21-11e8-ad35-63bc93d0cda5"
  // \/ GOOD /\ BAD
  // interviewquestionId = "870d9780-8e21-11e8-ad35-63bc93d0cda5"
  const URL = `${API_GATEWAY_INVOKE_URL}${ROUTES_API.interviewquestions}/${interviewquestionId}`
  let funcOptions = {...OPTIONS};
  funcOptions.method = HTTP_METHODS.get
  
  return async (dispatch) => {
    await initFetchCall(URL, funcOptions, true)
      .then(res => {
        const { status } = res;
        console.log('response @ getIntQuestionByID: ', res)
        if(status === 200){
          // then got a response
          res.body = checkThenReturnAppropriateResBody(res.body)
          console.log('res.body: ', res.body)
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

export const editInterviewQuestionById = (edittedInterviewQuestion, thenPushPath, catchPushPath, removeTheseCategoryObjsFromIntQuest, addTheseCategoryObjsToIntQuest) => {
  const { intQuestion: { updatedAt }} = DM;
  // console.log('InterviewQuestionId @ editInterviewQuestionById action: ', edittedInterviewQuestion.Id)
  console.log('editIntQuestionObj @ editInterviewQuestionById action: ', edittedInterviewQuestion)
  const URL = `${API_GATEWAY_INVOKE_URL}${ROUTES_API.interviewquestions}/${edittedInterviewQuestion.Id}`;
  let funcOptions = {...OPTIONS};
  funcOptions.method = HTTP_METHODS.put;
  edittedInterviewQuestion[updatedAt] = new Date().toString();
  funcOptions.body = JSON.stringify(ModelConverterForUpdate.returnBodyObject(DM.intQuestion, edittedInterviewQuestion))
  // console.log(funcOptions.body)
  
  return async (dispatch) => {
    await initFetchCall(URL, funcOptions, true)
      .then(res => {
        const { status } = res;
        if(status === 200){
          console.log('res @ editIntQuestion if: ', res)
          if(removeTheseCategoryObjsFromIntQuest){
            if(removeTheseCategoryObjsFromIntQuest.length){
              removeTheseCategoryObjsFromIntQuest.forEach(categoryObj => {
                let dupCategoryObj = { ...categoryObj };
                const { profileSkill: { _interviewquestionsWithCategory, updatedAt }} = DM;
                // remove intQuestion(Id) from _interviewquestionsWithCategory
                console.log('editIntQuestion - remove intQuestId from category (before): ', dupCategoryObj, edittedInterviewQuestion.Id)
                dupCategoryObj[_interviewquestionsWithCategory] = dupCategoryObj[_interviewquestionsWithCategory].filter(intQuestionId => intQuestionId !== edittedInterviewQuestion.Id);
                // dupCategoryObj[updatedAt] = new Date().toString();
                console.log('editIntQuestion - remove intQuestId from category (after): ', dupCategoryObj, edittedInterviewQuestion.Id)
                dispatch(editSkillById(dupCategoryObj, null, null))
              })
            }
          }
          if(addTheseCategoryObjsToIntQuest){
            if(addTheseCategoryObjsToIntQuest.length){
              addTheseCategoryObjsToIntQuest.forEach(categoryObj => {
                let dupCategoryObj = { ...categoryObj };
                const { profileSkill: { _interviewquestionsWithCategory, updatedAt }} = DM;
                // add intQuestion(Id) to _interviewquestionsWithCategory
                dupCategoryObj[_interviewquestionsWithCategory].push(edittedInterviewQuestion.Id);
                // dupCategoryObj[updatedAt] = new Date().toString();
                dispatch(editSkillById(dupCategoryObj, null, null));
              })
            }
          }
          dispatch({ type: EDIT_INTERVIEW_QUESTION_BY_ID, payload: res })
          dispatch({ type: ERRORS_EDIT_INTERVIEW_QUESTION_BY_ID, payload: errorNotExistPayload })
        }
        console.log(`@ editIntQuestion then: ${ROUTES_REACT.interviewquestions}`)        
        history.push(ROUTES_REACT.interviewquestions)
        return res;
      })
      .catch(err => {
        dispatch({ type: ERRORS_EDIT_INTERVIEW_QUESTION_BY_ID, payload: err })
        console.log(`@ editIntQuestion then: ${ROUTES_REACT.interviewquestions_edit}/${edittedInterviewQuestion.Id}`)
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
          // if the question has answers, then delete them.
          if(res.body.answersToQuestion.length){
            res.body.answersToQuestion.forEach(intQuestAnswerId => {
              dispatch(deleteInterviewQuestionAnswerById(intQuestAnswerId, res.body.Id))
            })
          }
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
          res.body = checkThenReturnAppropriateResBody(res.body)
          console.log('res.body: ', res.body)
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
  const { intQuestionAnswer: { updatedAt } } = DM
  console.log('InterviewQuestionAnswerId @ editInterviewQuestionById action: ', edittedInterviewQuestionAnswer.Id)
  console.log('edittedIntQuestAns @ editInterviewQuestionAnswerById action: ', edittedInterviewQuestionAnswer)
  const URL = `${API_GATEWAY_INVOKE_URL}${ROUTES_API.interviewquestionsanswers}/${edittedInterviewQuestionAnswer.Id}`
  let funcOptions = {...OPTIONS};
  funcOptions.method = HTTP_METHODS.put;
  edittedInterviewQuestionAnswer[updatedAt] = new Date().toString();
  funcOptions.body = JSON.stringify(ModelConverterForUpdate.returnBodyObject(DM.intQuestionAnswer, edittedInterviewQuestionAnswer));
  console.log('funcOptions @ editIntQuestAnswer: ', funcOptions);
  
  return async (dispatch) => {
    // const response = 
    await initFetchCall(URL, funcOptions, true)
      .then(res => {
        const { status } = res;
        if(status === 200){
          dispatch(editInterviewQuestionById(intQuestId));
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

export const deleteInterviewQuestionAnswerById = (interviewquestionanswerId, intQuestObj) => {
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
        history.push(`${ROUTES_REACT.interviewquestions}/${intQuestObj.Id}/answers/delete/${interviewquestionanswerId}`)                
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

export const createSkill = (newSkill, thenPushPath, catchPushPath) => {
  console.log('newSkill @ createSkill action: ', newSkill);
  const URL = `${API_GATEWAY_INVOKE_URL}${ROUTES_API.skills}`
  let funcOptions = {...OPTIONS};
  funcOptions.method = HTTP_METHODS.post;
  funcOptions.body = JSON.stringify(ModelConverterForUpdate.returnBodyObject(DM.profileSkill, newSkill));
  console.log('funcOptions @ createSkill: ', funcOptions);
  
  return async (dispatch) => {
    await initFetchCall(URL, funcOptions, true)
      .then(res => {
        const { status } = res;
        if(status === 200){
          dispatch({ type: CREATE_SKILL, payload: res });
          dispatch({ type: ERRORS_CREATE_SKILL, payload: errorNotExistPayload });
        }
        // history.push()
        return res;
      })
      .catch(err => {
        dispatch({ type: ERRORS_CREATE_SKILL, payload: err })
        console.log('history push to back to createSkill @ createSkill')
        // history.push()
        return err;
      })
  }
}

export const getSkillById = () => {
  
}

export const editSkillById = (edittedSkill, thenPushPath, catchPushPath) => {
  const { profileSkill: { updatedAt } } = DM  
  console.log('skillId @ editSkillById action: ', edittedSkill.id)
  console.log('edittedSkill @ editSkillById action: ', edittedSkill)
  const URL = `${API_GATEWAY_INVOKE_URL}${ROUTES_API.skills}/${edittedSkill.id}`;
  let funcOptions = {...OPTIONS};
  funcOptions.method = HTTP_METHODS.put;
  edittedSkill[updatedAt] = new Date().toString();
  funcOptions.body = JSON.stringify(ModelConverterForUpdate.returnBodyObject(DM.profileSkill, edittedSkill));
  console.log('funcOptions @ editSkill: ', funcOptions);
  
  return async (dispatch) => {
    await initFetchCall(URL, funcOptions, true)
      .then(res => {
        const { status } = res;
        if(status === 200){
          dispatch({ type: EDIT_SKILL_BY_ID, payload: res });
          dispatch({ type: ERRORS_EDIT_SKILL_BY_ID, payload: errorNotExistPayload });
        }
      })
      .catch(err => {
        dispatch({ type: ERRORS_EDIT_SKILL_BY_ID, payload: err })
        history.push(`${ROUTES_REACT.skills_edit}/${edittedSkill.id}`)
      })
  }
  
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

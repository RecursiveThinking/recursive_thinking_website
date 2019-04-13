// this is the entire object.
import { CREDENTIALS } from '../credentials/cognitoCreds'

import { getCurrentUserFromSession, signOut } from '../functions/authMethods';
import ModelConverterForUpdate from '../models/modelConverterForUpdate';

import { LogService as ls, catObj as co, subObj as so, tableObj as to, methodObj as mo } from '../services/logService';

import DM from '../standards/dictModel'

import {history} from '../index';

import {
  
  USERS_GET_ALL_REQUEST, USERS_GET_ALL_SUCCESS, USERS_GET_ALL_ERRORS,
  USER_CREATE_BY_ID_REQUEST, USER_CREATE_BY_ID_SUCCESS, USER_CREATE_BY_ID_ERRORS,
  USER_GET_BY_ID_REQUEST, USER_GET_BY_ID_SUCCESS, USER_GET_BY_ID_ERRORS,
  USER_EDIT_BY_ID_REQUEST, USER_EDIT_BY_ID_SUCCESS, USER_EDIT_BY_ID_ERRORS,
  // USER_DELETE_BY_ID_REQUEST, USER_DELETE_BY_ID_SUCCESS, USER_DELETE_BY_ID_ERRORS,
  
  // GET_CURRENT_USER_BY_ID, ERRORS_GET_CURRENT_USER_BY_ID,
  
  CURRENT_USER_GET_BY_ID_REQUEST, CURRENT_USER_GET_BY_ID_SUCCESS, CURRENT_USER_GET_BY_ID_ERRORS,
  
  LESSONS_GET_ALL_REQUEST, LESSONS_GET_ALL_SUCCESS, LESSONS_GET_ALL_ERRORS,
  LESSON_CREATE_BY_ID_REQUEST, LESSON_CREATE_BY_ID_SUCCESS, LESSON_CREATE_BY_ID_ERRORS,
  LESSON_GET_BY_ID_REQUEST, LESSON_GET_BY_ID_SUCCESS, LESSON_GET_BY_ID_ERRORS,
  LESSON_EDIT_BY_ID_REQUEST, LESSON_EDIT_BY_ID_SUCCESS, LESSON_EDIT_BY_ID_ERRORS,
  LESSON_DELETE_BY_ID_REQUEST, LESSON_DELETE_BY_ID_SUCCESS, LESSON_DELETE_BY_ID_ERRORS,
  
  SELECTED_LESSON,
  
  INTERVIEW_QUESTIONS_GET_ALL_REQUEST, INTERVIEW_QUESTIONS_GET_ALL_SUCCESS, INTERVIEW_QUESTIONS_GET_ALL_ERRORS,
  INTERVIEW_QUESTION_CREATE_BY_ID_REQUEST, INTERVIEW_QUESTION_CREATE_BY_ID_SUCCESS, INTERVIEW_QUESTION_CREATE_BY_ID_ERRORS,
  INTERVIEW_QUESTION_GET_BY_ID_REQUEST, INTERVIEW_QUESTION_GET_BY_ID_SUCCESS, INTERVIEW_QUESTION_GET_BY_ID_ERRORS,
  INTERVIEW_QUESTION_EDIT_BY_ID_REQUEST, INTERVIEW_QUESTION_EDIT_BY_ID_SUCCESS, INTERVIEW_QUESTION_EDIT_BY_ID_ERRORS,
  INTERVIEW_QUESTION_DELETE_BY_ID_REQUEST, INTERVIEW_QUESTION_DELETE_BY_ID_SUCCESS, INTERVIEW_QUESTION_DELETE_BY_ID_ERRORS,
  
  INTERVIEW_QUESTION_ANSWERS_GET_ALL_REQUEST, INTERVIEW_QUESTION_ANSWERS_GET_ALL_SUCCESS, INTERVIEW_QUESTION_ANSWERS_GET_ALL_ERRORS,
  INTERVIEW_QUESTION_ANSWER_CREATE_BY_ID_REQUEST, INTERVIEW_QUESTION_ANSWER_CREATE_BY_ID_SUCCESS, INTERVIEW_QUESTION_ANSWER_CREATE_BY_ID_ERRORS,
  INTERVIEW_QUESTION_ANSWER_GET_BY_ID_REQUEST, INTERVIEW_QUESTION_ANSWER_GET_BY_ID_SUCCESS, INTERVIEW_QUESTION_ANSWER_GET_BY_ID_ERRORS,
  INTERVIEW_QUESTION_ANSWER_EDIT_BY_ID_REQUEST, INTERVIEW_QUESTION_ANSWER_EDIT_BY_ID_SUCCESS, INTERVIEW_QUESTION_ANSWER_EDIT_BY_ID_ERRORS,
  INTERVIEW_QUESTION_ANSWER_DELETE_BY_ID_REQUEST, INTERVIEW_QUESTION_ANSWER_DELETE_BY_ID_SUCCESS, INTERVIEW_QUESTION_ANSWER_DELETE_BY_ID_ERRORS,
  
  SKILLS_GET_ALL_REQUEST, SKILLS_GET_ALL_SUCCESS, SKILLS_GET_ALL_ERRORS,
  SKILL_CREATE_BY_ID_REQUEST, SKILL_CREATE_BY_ID_SUCCESS, SKILL_CREATE_BY_ID_ERRORS,
  // SKILL_GET_BY_ID_REQUEST, SKILL_GET_BY_ID_SUCCESS, SKILL_GET_BY_ID_ERRORS,
  SKILL_EDIT_BY_ID_REQUEST, SKILL_EDIT_BY_ID_SUCCESS, SKILL_EDIT_BY_ID_ERRORS,
  // SKILL_DELETE_BY_ID_REQUEST, SKILL_DELETE_BY_ID_SUCCESS, SKILL_DELETE_BY_ID_ERRORS,
  
  HOMESCREEN_QUOTES_GET_ALL_REQUEST, HOMESCREEN_QUOTES_GET_ALL_SUCCESS, HOMESCREEN_QUOTES_GET_ALL_ERRORS,
  RANKS_GET_ALL_REQUEST, RANKS_GET_ALL_SUCCESS, RANKS_GET_ALL_ERRORS
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
    responseBody = null;
  } else { 
    // the response body is a valid object, so return it of the key from the DB (Item)
    responseBody = responseBody.Item
  }
  return responseBody
}

const initFetchCall = async (urlPath, optionConfig, doesEndPointNeedAuth) => {

  if(doesEndPointNeedAuth === true){
    const userInfo = await getCurrentUserFromSession();
    // console.log('userFromSession: ', userInfo)
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
        console.log('response @ initFetchCall then(1 - json())', response)
        return response.json()
          // .catch(err => {
          //   console.log('error @ then(1 - json().catch())', err)
          //   return Promise.reject(Response.error('Invalid JSON: ', err)) 
          // })
      }
      console.log('error @ initFetchCall then(1 - json())', response)
      // return Promise.reject(Response.error(response))      
      return Promise.reject(response)
    })
    .then(resData => {
      const returnObj = {
        status,
        ok,
        body: resData
      }
      console.log('returnObj @ initFetchCall then(2)', returnObj)
      return returnObj
    })
    .catch(error => {
      console.log('error @ initFetchCall catch', error)
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
        // console.log('@ getCurrentUserById userInSesson - then: ', userInSesson)
        dispatch(currentUser(userInSesson.idToken.payload.sub))
        // dispatch()
        // console.log('user', user)
        return userInSesson;
      })
      .catch(err => {
        // console.log('@ getCurrentUserById userInSesson - err: ', err)
        // else we should signout and boot the person back to '/'?
        return err;
      })
  }
}

// CURRENT_USER_GET_BY_ID_REQUEST, CURRENT_USER_GET_BY_ID_SUCCESS, CURRENT_USER_GET_BY_ID_ERRORS,

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
    dispatch({ type: CURRENT_USER_GET_BY_ID_REQUEST })
    ls(co.act, so.req, to.currentUser, mo.bid)
    await initFetchCall(URL, funcOptions, true)
      .then(res => {
        const { status } = res;
        // console.log('typeof res: ', typeof res)
        if(status === 200){
          res.body = checkThenReturnAppropriateResBody(res.body)
          ls(co.act, so.res, to.currentUser, mo.bid, res);          
          dispatch({ type: CURRENT_USER_GET_BY_ID_SUCCESS, payload: res })
          // dispatch({ type: GET_CURRENT_USER_BY_ID, payload: res })
          // dispatch({ type: ERRORS_GET_CURRENT_USER_BY_ID, payload: errorNotExistPayload })
        }
        return res;
      })
      .catch(err => {
        ls(co.act, so.res, to.currentUser, mo.bid, err);      
        // dispatch({ type: ERRORS_GET_CURRENT_USER_BY_ID, payload: err })
        dispatch({ type: CURRENT_USER_GET_BY_ID_ERRORS, payload: err })
        return err;
      })
  }
}
  
export const usersGetAll = () => {
  const URL = `${API_GATEWAY_INVOKE_URL}${ROUTES_API.users}`
  let funcOptions = { ...OPTIONS };
  funcOptions.method = HTTP_METHODS.get;
  
  return async (dispatch) => {
    dispatch({ type: USERS_GET_ALL_REQUEST })
    ls(co.act, so.req, to.user, mo.gas)
    await initFetchCall(URL, funcOptions, true)
      .then(res => {
        const { status } = res;
        if(status === 200){
          ls(co.act, so.res, to.user, mo.gas, res);
          // dispatch({ type: GET_ALL_USERS, payload: res })
          // dispatch({ type: ERRORS_GET_ALL_USERS, payload: errorNotExistPayload })
          dispatch({ type: USERS_GET_ALL_SUCCESS, payload: res })
        }
        return res
      })
      .catch(err => {
        ls(co.act, so.err, to.user, mo.gas, err);
        // dispatch({ type: ERRORS_GET_ALL_USERS, payload: err })
        dispatch({ type: USERS_GET_ALL_ERRORS, payload: err })
        return err
      })
  }
}

export const userCreateById = (newUser) => {
  console.log('userValues @ createUser action: ', newUser);
  const URL = `${API_GATEWAY_INVOKE_URL}${ROUTES_API.users}`
  let funcOptions = { ...OPTIONS };
  funcOptions.method = HTTP_METHODS.post;
  funcOptions.body = JSON.stringify(ModelConverterForUpdate.returnBodyObject(DM.user, newUser));
  
  return async (dispatch) => {
    dispatch({ type: USER_CREATE_BY_ID_REQUEST });
    ls(co.act, so.req, to.user, mo.cbid);
    await initFetchCall(URL, funcOptions, true)
      .then(res => {
        const { status } = res;
        if(status === 200){
          dispatch(userGetById(res.body.userId));
          ls(co.act, so.res, to.user, mo.cbid, res);
          dispatch({ type: USER_CREATE_BY_ID_SUCCESS, payload: res });
          // history.push(`${ROUTES_REACT.users_setup}/${newUser.userId}`);
        }
        return res
      })
      .catch(err => {
        ls(co.act, so.err, to.user, mo.cbid, err);
        dispatch({ type: USER_CREATE_BY_ID_ERRORS, payload: err});
        history.push(ROUTES_REACT.users_setup);
        return err
      })
  }
}

export const userGetById = (userId) => {
  console.log('userId @ getUserById action: ', userId)
  // userId = "9sdd7120-8ed0-11e8-b260-d5e4455e16bd"
  // \/ GOOD /\ BAD
  // userId = "9cdd7120-8ed0-11e8-b260-d5e4455e16bd"
  const URL = `${API_GATEWAY_INVOKE_URL}${ROUTES_API.users}/${userId}`
  let funcOptions = {...OPTIONS}
  funcOptions.method = HTTP_METHODS.get
  
  return async (dispatch) => {
    dispatch({ type: USER_GET_BY_ID_REQUEST })
    ls(co.act, so.req, to.user, mo.gbid)
    await initFetchCall(URL, funcOptions, true)
      .then(res => {
        const { status } = res;
        if(status === 200){
          // ls(co.act, so.res, to.user, mo.gbid, res)
          res.body = checkThenReturnAppropriateResBody(res.body)
          ls(co.act, so.res, to.user, mo.gbid, res)
          dispatch({ type: USER_GET_BY_ID_SUCCESS, payload: res })
        }
        return res;
      })
      .catch(err => {
        ls(co.act, so.err, to.user, mo.gbid)
        dispatch({ type: USER_GET_BY_ID_ERRORS, payload: err })
        return err;
      })
  }
}

export const userEditByIdLastLogout = (userObj, thenPushPath, catchPushPath) => {
  const { user: { lastLogout } } = DM;
  
  let dupUserObj = { ...userObj };
  dupUserObj[lastLogout] = new Date().toString();
  //
  const URL = `${API_GATEWAY_INVOKE_URL}${ROUTES_API.users}/${userObj.userId}`;
  let funcOptions = {...OPTIONS};
  funcOptions.method = HTTP_METHODS.put;
  funcOptions.body = JSON.stringify(ModelConverterForUpdate.returnBodyObject(DM.user, dupUserObj));
  
  return async (dispatch) => {
    dispatch({ type: USER_EDIT_BY_ID_REQUEST })
    ls(co.act, so.req, to.user, mo.ebidll) 
    await initFetchCall(URL, funcOptions, true)
      .then(res => {
        ls(co.act, so.res, to.user, mo.ebidll, res)
        dispatch({ type: USER_EDIT_BY_ID_SUCCESS, payload: res });
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
        ls(co.act, so.err, to.user, mo.ebid, err)    
        dispatch({ type: USER_EDIT_BY_ID_ERRORS, payload: err})
        return err;
      })
  }
}

export const userEditById = (edittedUser, thenPushPath, catchPushPath, removeUserIdFromTheseSkillObjs, addUserIdToTheseSkillObjs) => {
  const { user: { updatedAt } } = DM
  const URL = `${API_GATEWAY_INVOKE_URL}${ROUTES_API.users}/${edittedUser.userId}`;
  let funcOptions = {...OPTIONS};
  funcOptions.method = HTTP_METHODS.put;
  edittedUser[updatedAt] = new Date().toString();
  funcOptions.body = JSON.stringify(ModelConverterForUpdate.returnBodyObject(DM.user, edittedUser));
  
  return async (dispatch) => {
    dispatch({ type: USER_EDIT_BY_ID_REQUEST })
    ls(co.act, so.req, to.user, mo.ebid)    
    await initFetchCall(URL, funcOptions, true)
      .then(res => {
        const { status } = res;
        if(status === 200){         
          if(removeUserIdFromTheseSkillObjs){
            if(removeUserIdFromTheseSkillObjs.length){
              removeUserIdFromTheseSkillObjs.forEach(skillObj => {
                let dupSkillObj = { ...skillObj };
                const { profileSkill: { _usersWithSkill, 
                  // updatedAt 
                }} = DM;
                // remove userId from skillObj
                console.log('editUserById - remove userId from skill (before): ', edittedUser.userId, dupSkillObj)
                dupSkillObj[_usersWithSkill] = dupSkillObj[_usersWithSkill].filter(userId => userId !== edittedUser.userId);
                console.log('editUserById - remove userId from skill (after): ', edittedUser.userId, dupSkillObj)
                dispatch(skillEditById(dupSkillObj, null, null))
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
                dispatch(skillEditById(dupSkillObj, null, null))
              })
            }
          }
          ls(co.act, so.res, to.user, mo.ebid, res)     
          dispatch({ type: USER_EDIT_BY_ID_SUCCESS, payload: res });
        }
        history.push(thenPushPath)
        return res;
      })
      // , {currentUser: edittedUser}
      .catch(err => {
        ls(co.act, so.err, to.user, mo.ebid, err)    
        dispatch({ type: USER_EDIT_BY_ID_ERRORS, payload: err})
        history.push(catchPushPath)        
        return err;
      })
  }
}

export const deleteUserById = (userId) => {
  // this should just make users inactive?
}

export const lessonsGetAll = () => {
  const URL = `${API_GATEWAY_INVOKE_URL}${ROUTES_API.lessons}`
  let funcOptions = { ...OPTIONS }
  funcOptions.method = HTTP_METHODS.get
  
  return async (dispatch) => {
    dispatch({ type: LESSONS_GET_ALL_REQUEST })
    ls(co.act, so.req, to.lesson, mo.gas)            
    await initFetchCall(URL, funcOptions, true)
      .then(res => {
        const { status } = res
        if(status === 200){
          ls(co.act, so.res, to.lesson, mo.gas, res)             
          dispatch({ type: LESSONS_GET_ALL_SUCCESS, payload: res })
        }
        return res
      })
      .catch(err => {
        ls(co.act, so.err, to.lesson, mo.gas, err)           
        dispatch({ type: LESSONS_GET_ALL_ERRORS, payload: err })
        return err
      })
  }
}
// LESSON_CREATE_REQUEST, LESSON_CREATE_SUCCESS, LESSON_CREATE_ERRORS,
export const lessonCreateById = (newLesson) => {
  console.log('formValues @ createLesson action:', newLesson)
  const URL = `${API_GATEWAY_INVOKE_URL}${ROUTES_API.lessons}`
  let funcOptions = { ...OPTIONS };
  funcOptions.method = HTTP_METHODS.post;
  funcOptions.body = JSON.stringify(ModelConverterForUpdate.returnBodyObject(DM.lesson, newLesson));
  
  return async (dispatch) => {
    dispatch({ type: LESSON_CREATE_BY_ID_REQUEST})
    ls(co.act, so.req, to.lesson, mo.cbid) 
    await initFetchCall(URL, funcOptions, true)
      .then(res => {
        const { status } = res;  
        if(status === 200){
          ls(co.act, so.res, to.lesson, mo.cbid, res) 
          dispatch({ type: LESSON_CREATE_BY_ID_SUCCESS, payload: res })
          // dispatch({ type: ERRORS_CREATE_LESSON, payload: errorNotExistPayload })
        }
        // console.log('this is history before history.push', history)        
        history.push(ROUTES_REACT.unscheduledlessons)
        return res;
      })
      .catch(err => {
        ls(co.act, so.err, to.lesson, mo.cbid, err)      
        // dispatch({ type: ERRORS_CREATE_LESSON, payload: err })
        dispatch({ type: LESSON_CREATE_BY_ID_ERRORS, payload: err })
        history.push(ROUTES_REACT.lessons_create)        
        return err;
      })
  }
}
// LESSON_GET_BY_ID_REQUEST, LESSON_GET_BY_ID_SUCCESS, LESSON_GET_BY_ID_ERRORS
export const lessonGetById = (lessonId) => {
  // console.log('lessonId @ getLessonById action: ', lessonId)
  // lessonId = "8d57c8d7-8e19-11e8-924a-a70245d1837e"
  // \/ GOOD /\ BAD
  // lessonId = "8c57c8d7-8e19-11e8-924a-a70245d1837e"
  const URL = `${API_GATEWAY_INVOKE_URL}${ROUTES_API.lessons}/${lessonId}`
  let funcOptions = {...OPTIONS};
  funcOptions.method = HTTP_METHODS.get
  
  return async (dispatch) => {
    dispatch({ type: LESSON_GET_BY_ID_REQUEST })
    ls(co.act, so.req, to.lesson, mo.gbid)
    await initFetchCall(URL, funcOptions, true)
      .then(res => {
        const { status } = res;
        if(status === 200){
          ls(co.act, so.res, to.lesson, mo.gbid, res)
          res.body = checkThenReturnAppropriateResBody(res.body)
          dispatch({ type: LESSON_GET_BY_ID_SUCCESS, payload: res })
          // dispatch({ type: GET_LESSON_BY_ID, payload: res })
          // dispatch({ type: ERRORS_GET_LESSON_BY_ID, payload: errorNotExistPayload })
        }
        return res;
      })
      .catch(err => {
        ls(co.act, so.err, to.lesson, mo.gbid, err)      
        dispatch({ type: LESSON_GET_BY_ID_ERRORS, payload: err })
        // dispatch({ type: ERRORS_GET_LESSON_BY_ID, payload: err })
        return err;
      })
  }
}
// LESSON_EDIT_BY_ID_REQUEST, LESSON_EDIT_BY_ID_SUCCESS, LESSON_EDIT_BY_ID_ERRORS,
export const lessonEditById = (edittedLesson, thenPushPath, catchPushPath) => {
  const { lesson: { updatedAt } } = DM
  // console.log('lessonId @ editLessonById action: ', edittedLesson.Id)
  console.log('@ lessonEditById - edittedLessonObj: ', edittedLesson)
  const URL = `${API_GATEWAY_INVOKE_URL}${ROUTES_API.lessons}/${edittedLesson.Id}`;
  let funcOptions = {...OPTIONS};
  funcOptions.method = HTTP_METHODS.put;
  edittedLesson[updatedAt] = new Date().toString();
  funcOptions.body = JSON.stringify(ModelConverterForUpdate.returnBodyObject(DM.lesson, edittedLesson))
  // console.log(funcOptions.body)
  
  return async (dispatch) => {
    dispatch({ type: LESSON_EDIT_BY_ID_REQUEST })
    ls(co.act, so.req, to.lesson, mo.ebid)
    await initFetchCall(URL, funcOptions, true)
      .then(res => {
        const { status } = res;
        if(status === 200){
          ls(co.act, so.res, to.lesson, mo.ebid, res) 
          dispatch({ type: LESSON_EDIT_BY_ID_SUCCESS, payload: res })
          // dispatch({ type: EDIT_LESSON_BY_ID, payload: res })
          // dispatch({ type: ERRORS_EDIT_LESSON_BY_ID, payload: errorNotExistPayload })
        }
        history.push(thenPushPath) 
        return res;
      })
      .catch(err => {
        ls(co.act, so.err, to.lesson, mo.ebid, err)
        dispatch({ type: LESSON_EDIT_BY_ID_ERRORS, payload: err })
        // dispatch({ type: ERRORS_EDIT_LESSON_BY_ID, payload: err })       
        history.push(catchPushPath)
        return err;
      })
  }
}
// LESSON_DELETE_BY_ID_REQUEST, LESSON_DELETE_BY_ID_SUCCESS, LESSON_DELETE_BY_ID_ERRORS,
export const lessonDeleteById = (lessonId) => {
  console.log('lessonId @ deleteLessonById action: ', lessonId)
  const URL = `${API_GATEWAY_INVOKE_URL}${ROUTES_API.lessons}/${lessonId}`
  console.log('url', URL)
  let funcOptions = {...OPTIONS};
  funcOptions.method = HTTP_METHODS.delete;
  funcOptions.body = JSON.stringify({ Id: lessonId })
  // console.log('funcOptions', funcOptions)
  return async (dispatch) => {
    dispatch({ type: LESSON_DELETE_BY_ID_REQUEST })
    ls(co.act, so.req, to.lesson, mo.dbid)
    await initFetchCall(URL, funcOptions, true)
      .then(res => {
        const { status } = res
        if(status === 200){
          ls(co.act, so.res, to.lesson, mo.dbid, res)
          dispatch({ type: LESSON_DELETE_BY_ID_SUCCESS, payload: res })
          // dispatch({ type: DELETE_LESSON_BY_ID, payload: res })
          // dispatch({ type: ERRORS_DELETE_LESSON_BY_ID, payload: errorNotExistPayload })
        }
        // console.log('history push to unsched @ deleteLessonId')
        history.push(ROUTES_REACT.unscheduledlessons)
        return res;
      })
      .catch(err => {
        ls(co.act, so.err, to.lesson, mo.dbid, err) 
        dispatch({ type: LESSON_DELETE_BY_ID_ERRORS, payload: err })
        // dispatch({ type: ERRORS_DELETE_LESSON_BY_ID, payload: err })      
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
export const interviewQuestionsGetAll = () => {
  const URL = `${API_GATEWAY_INVOKE_URL}${ROUTES_API.interviewquestions}`
  let funcOptions = { ...OPTIONS };
  funcOptions.method = HTTP_METHODS.get;

  return async (dispatch) => {
    dispatch({ type: INTERVIEW_QUESTIONS_GET_ALL_REQUEST })
    ls(co.act, so.req, to.intQuest, mo.gas)
    await initFetchCall(URL, funcOptions, true)
      .then(res => {
        const { status } = res
        if(status === 200){
          ls(co.act, so.res, to.intQuest, mo.gas, res) 
          dispatch({ type: INTERVIEW_QUESTIONS_GET_ALL_SUCCESS, payload: res })
          // dispatch({ type: INTERVIEW_QUESTIONS_GET_ALL_REQUEST, payload: res })
          // dispatch({ type: ERRORS_GET_ALL_INTERVIEW_QUESTIONS, payload: errorNotExistPayload })
        }
        return res
      })
      .catch(err => {
        ls(co.act, so.err, to.intQuest, mo.gas, err) 
        // dispatch({ type: ERRORS_GET_ALL_INTERVIEW_QUESTIONS, payload: err })
        dispatch({ type: INTERVIEW_QUESTIONS_GET_ALL_ERRORS, payload: err })
        return err
      })
  }
}
// INTERVIEW_QUESTION_CREATE_BY_ID_REQUEST, INTERVIEW_QUESTION_CREATE_BY_ID_SUCCESS, INTERVIEW_QUESTION_CREATE_BY_ID_ERRORS,
export const interviewQuestionCreateById = (newInterviewQuestion, thenPushPath, catchPushPath, addTheseCategoryObjsToIntQuest) => {
  // console.log('newIntQuest @ createIntQuestion action: ', newInterviewQuestion)
  const URL = `${API_GATEWAY_INVOKE_URL}${ROUTES_API.interviewquestions}`
  let funcOptions = {...OPTIONS};
  funcOptions.method = HTTP_METHODS.post;
  funcOptions.body = JSON.stringify(ModelConverterForUpdate.returnBodyObject(DM.intQuestion, newInterviewQuestion));
  // console.log('funcOptions @ createIntQuestion: ', funcOptions);
  
  return async (dispatch) => {
    dispatch({ type: INTERVIEW_QUESTION_CREATE_BY_ID_REQUEST })
    ls(co.act, so.req, to.intQuest, mo.cbid)
    await initFetchCall(URL, funcOptions, true)
      .then(res => {
        const { status } = res;
        if(status === 200){
          // if interview question goes thorugh, we need to update the _interviewquestionsWithCategory for each Id in the newInterviewQuestion.categories
          if(addTheseCategoryObjsToIntQuest){
            if(addTheseCategoryObjsToIntQuest.length){
              const { 
                profileSkill: { _interviewquestionsWithCategory },
                intQuestion: { Id }
              } = DM;
              addTheseCategoryObjsToIntQuest.forEach(categoryObj => {
                let dupCategoryObj = { ...categoryObj };
                dupCategoryObj[_interviewquestionsWithCategory].push(newInterviewQuestion[Id])
                dispatch(skillEditById(dupCategoryObj, null, null))
              })
            }
          }
          ls(co.act, so.res, to.intQuest, mo.cbid, res)
          dispatch({ type: INTERVIEW_QUESTION_CREATE_BY_ID_SUCCESS, payload: res })
          // dispatch({ type: CREATE_INTERVIEW_QUESTION, payload: res })
          // dispatch({ type: ERRORS_CREATE_INTERVIEW_QUESTION, payload: errorNotExistPayload })
        }
        // console.log('history push to intQuest @ createintQuestId')        
        history.push(ROUTES_REACT.interviewquestions)
        return res;
      })
      .catch(err => {
        ls(co.act, so.err, to.intQuest, mo.cbid, err) 
        dispatch({ type: INTERVIEW_QUESTION_CREATE_BY_ID_ERRORS, payload: err })
        // dispatch({ type: ERRORS_CREATE_INTERVIEW_QUESTION, payload: err })
        // console.log('history push to back to createIntQuest @ createintQuestId')                
        history.push(ROUTES_REACT.interviewquestions_create)        
        return err;
      })
  }
}
// INTERVIEW_QUESTION_GET_BY_ID_REQUEST, INTERVIEW_QUESTION_GET_BY_ID_SUCCESS, INTERVIEW_QUESTION_GET_BY_ID_ERRORS,
export const interviewQuestionGetById = (interviewquestionId) => {
  // console.log('intQuestId @ getInterviewQuestionById action: ', interviewquestionId);
  // interviewquestionId = "870e9780-8e21-11e8-ad35-63bc93d0cda5"
  // \/ GOOD /\ BAD
  // interviewquestionId = "870d9780-8e21-11e8-ad35-63bc93d0cda5"
  const URL = `${API_GATEWAY_INVOKE_URL}${ROUTES_API.interviewquestions}/${interviewquestionId}`
  let funcOptions = {...OPTIONS};
  funcOptions.method = HTTP_METHODS.get
  
  return async (dispatch) => {
    dispatch({ type: INTERVIEW_QUESTION_GET_BY_ID_REQUEST })
    ls(co.act, so.req, to.intQuest, mo.gbid)
    await initFetchCall(URL, funcOptions, true)
      .then(res => {
        const { status } = res;
        if(status === 200){
          // then got a response
          ls(co.act, so.res, to.intQuest, mo.gbid, res)
          res.body = checkThenReturnAppropriateResBody(res.body)
          dispatch({ type: INTERVIEW_QUESTION_GET_BY_ID_SUCCESS, payload: res })
          // dispatch({ type: GET_INTERVIEW_QUESTION_BY_ID, payload: res })
          // dispatch({ type: ERRORS_GET_INTERVIEW_QUESTION_BY_ID, payload: errorNotExistPayload })
        }
        return res;
      })
      .catch(err => {
        ls(co.act, so.err, to.intQuest, mo.gbid, err)     
        dispatch({ type: INTERVIEW_QUESTION_GET_BY_ID_ERRORS, payload: err })
        // dispatch({ type: ERRORS_GET_INTERVIEW_QUESTION_BY_ID, payload: err })
        return err;
      })
  }
}
// INTERVIEW_QUESTION_EDIT_BY_ID_REQUEST, INTERVIEW_QUESTION_EDIT_BY_ID_SUCCESS, INTERVIEW_QUESTION_EDIT_BY_ID_ERRORS,
export const interviewQuestionEditById = (edittedInterviewQuestion, thenPushPath, catchPushPath, removeTheseCategoryObjsFromIntQuest, addTheseCategoryObjsToIntQuest) => {
  const { intQuestion: { updatedAt }} = DM;
  const URL = `${API_GATEWAY_INVOKE_URL}${ROUTES_API.interviewquestions}/${edittedInterviewQuestion.Id}`;
  let funcOptions = {...OPTIONS};
  funcOptions.method = HTTP_METHODS.put;
  edittedInterviewQuestion[updatedAt] = new Date().toString();
  funcOptions.body = JSON.stringify(ModelConverterForUpdate.returnBodyObject(DM.intQuestion, edittedInterviewQuestion))
  
  return async (dispatch) => {
    dispatch({ type: INTERVIEW_QUESTION_EDIT_BY_ID_REQUEST })
    ls(co.act, so.req, to.intQuest, mo.ebid)
    await initFetchCall(URL, funcOptions, true)
      .then(res => {
        const { status } = res;
        if(status === 200){
          if(removeTheseCategoryObjsFromIntQuest){
            if(removeTheseCategoryObjsFromIntQuest.length){
              removeTheseCategoryObjsFromIntQuest.forEach(categoryObj => {
                let dupCategoryObj = { ...categoryObj };
                const { profileSkill: { _interviewquestionsWithCategory }} = DM;
                // remove intQuestion(Id) from _interviewquestionsWithCategory
                // console.log('editIntQuestion - remove intQuestId from category (before): ', dupCategoryObj, edittedInterviewQuestion.Id)
                dupCategoryObj[_interviewquestionsWithCategory] = dupCategoryObj[_interviewquestionsWithCategory].filter(intQuestionId => intQuestionId !== edittedInterviewQuestion.Id);
                // console.log('editIntQuestion - remove intQuestId from category (after): ', dupCategoryObj, edittedInterviewQuestion.Id)
                dispatch(skillEditById(dupCategoryObj, null, null))
              })
            }
          }
          if(addTheseCategoryObjsToIntQuest){
            if(addTheseCategoryObjsToIntQuest.length){
              addTheseCategoryObjsToIntQuest.forEach(categoryObj => {
                let dupCategoryObj = { ...categoryObj };
                const { profileSkill: { _interviewquestionsWithCategory }} = DM;
                // add intQuestion(Id) to _interviewquestionsWithCategory
                dupCategoryObj[_interviewquestionsWithCategory].push(edittedInterviewQuestion.Id);
                dispatch(skillEditById(dupCategoryObj, null, null));
              })
            }
          }
          ls(co.act, so.res, to.intQuest, mo.ebid, res)           
          dispatch({ type: INTERVIEW_QUESTION_EDIT_BY_ID_SUCCESS, payload: res })
          // dispatch({ type: EDIT_INTERVIEW_QUESTION_BY_ID, payload: res })
          // dispatch({ type: ERRORS_EDIT_INTERVIEW_QUESTION_BY_ID, payload: errorNotExistPayload })
        }
        // console.log(`@ editIntQuestion then: ${ROUTES_REACT.interviewquestions}`)        
        history.push(ROUTES_REACT.interviewquestions)
        return res;
      })
      .catch(err => {
          ls(co.act, so.err, to.intQuest, mo.ebid, err)        
          dispatch({ type: INTERVIEW_QUESTION_EDIT_BY_ID_ERRORS, payload: err })
          // dispatch({ type: ERRORS_EDIT_INTERVIEW_QUESTION_BY_ID, payload: err })
        // console.log(`@ editIntQuestion then: ${ROUTES_REACT.interviewquestions_edit}/${edittedInterviewQuestion.Id}`)
        history.push(`${ROUTES_REACT.interviewquestions_edit}/${edittedInterviewQuestion.Id}`)
        return err;
      })
  }
}
// INTERVIEW_QUESTION_DELETE_BY_ID_REQUEST, INTERVIEW_QUESTION_DELETE_BY_ID_SUCCESS, INTERVIEW_QUESTION_DELETE_BY_ID_ERRORS,
export const interviewQuestionDeleteById = (interviewquestionId) => {
  const URL = `${API_GATEWAY_INVOKE_URL}${ROUTES_API.interviewquestions}/${interviewquestionId}`
  let funcOptions = {...OPTIONS};
  funcOptions.method = HTTP_METHODS.delete;
  
  return async (dispatch) => {
    dispatch({ type: INTERVIEW_QUESTION_DELETE_BY_ID_REQUEST })
    ls(co.act, so.req, to.intQuest, mo.dbid)
    await initFetchCall(URL, funcOptions, true)
      .then(res => {
        const { status } = res
        if(status === 200){
          // if the question has answers, then delete them.
          if(res.body.answersToQuestion.length){
            res.body.answersToQuestion.forEach(intQuestAnswerId => {
              dispatch(interviewQuestionAnswerDeleteById(intQuestAnswerId, res.body.Id))
            })
          }
          // also need to remove interviewQuestionId from categories
          // do that here
          ls(co.act, so.res, to.intQuest, mo.dbid, res)                   
          dispatch({ type: INTERVIEW_QUESTION_DELETE_BY_ID_SUCCESS, payload: res })
          // dispatch({ type: DELETE_INTERVIEW_QUESTION_BY_ID, payload: res })
          // dispatch({ type: ERRORS_DELETE_INTERVIEW_QUESTION_BY_ID, payload: errorNotExistPayload})
        }
        // console.log('history push to intQuest @ deleteLessonId')        
        history.push(ROUTES_REACT.interviewquestions)
        return res;
      })
      .catch(err => {
        ls(co.act, so.err, to.intQuest, mo.dbid, err)                             
        dispatch({ type: INTERVIEW_QUESTION_DELETE_BY_ID_ERRORS, payload: err })
        // dispatch({ type: ERRORS_DELETE_INTERVIEW_QUESTION_BY_ID, payload: err })
        // console.log('history push to back to deleteIntQuest @ deleteLessonId')        
        history.push(`${ROUTES_REACT.interviewquestions_delete}/${interviewquestionId}`)        
        return err;
      })
    // history.push(ROUTES_REACT.interviewquestions)
  }
}

export const interviewQuestionAnswersGetAll = () => {
  const URL = `${API_GATEWAY_INVOKE_URL}${ROUTES_API.interviewquestionsanswers}`
  let funcOptions = { ...OPTIONS };
  funcOptions.method = HTTP_METHODS.get;
  
  return async (dispatch) => {
    dispatch({ type: INTERVIEW_QUESTION_ANSWERS_GET_ALL_REQUEST })
    ls(co.act, so.req, to.intQuestAns, mo.ga)
    await initFetchCall(URL, funcOptions, true)
      .then(res => {
        const { status } = res                            
        // should get a response object {status, ok, body}
        if(status === 200){
          ls(co.act, so.res, to.intQuestAns, mo.ga, res)
          dispatch({ type: INTERVIEW_QUESTION_ANSWERS_GET_ALL_SUCCESS, payload: res })
          // dispatch({ type: GET_ALL_INTERVIEW_QUESTIONS_ANSWERS, payload: res })
          // dispatch({ type: ERRORS_GET_ALL_INTERVIEW_QUESTIONS_ANSWERS, payload: errorNotExistPayload })
        }
        return res
      })
      .catch(err => {
        ls(co.act, so.err, to.intQuestAns, mo.ga, err)
        // should get an error object { status, ok, body }
        dispatch({ type: INTERVIEW_QUESTION_ANSWERS_GET_ALL_ERRORS, payload: err })
        // dispatch({ type: GET_ALL_INTERVIEW_QUESTIONS_ANSWERS, payload: err })
        return err
      })
  }
}

export const interviewQuestionAnswerCreateById = (newInterviewQuestionAnswer, intQuestId) => {
  const URL = `${API_GATEWAY_INVOKE_URL}${ROUTES_API.interviewquestionsanswers}`
  let funcOptions = {...OPTIONS};
  funcOptions.method = HTTP_METHODS.post;
  funcOptions.body = JSON.stringify(ModelConverterForUpdate.returnBodyObject(DM.intQuestionAnswer, newInterviewQuestionAnswer));
  
  return async (dispatch) => {
    dispatch({ type: INTERVIEW_QUESTION_ANSWER_CREATE_BY_ID_REQUEST })
    ls(co.act, so.req, to.intQuestAns, mo.cbid)
    await initFetchCall(URL, funcOptions, true)
      .then(res => {
        const { status } = res;
        if(status === 200){
          ls(co.act, so.res, to.intQuestAns, mo.cbid, res)
          // dispatch(editInterviewQuestionById(edittedIntQuest))
          dispatch({ type: INTERVIEW_QUESTION_ANSWER_CREATE_BY_ID_SUCCESS, payload: res })
          // dispatch({ type: CREATE_INTERVIEW_QUESTION_ANSWER, payload: res })
          // dispatch({ type: ERRORS_CREATE_INTERVIEW_QUESTION_ANSWER, payload: errorNotExistPayload })
        }
        history.push(ROUTES_REACT.interviewquestions)
        return res;
      })
      .catch(err => {
        ls(co.act, so.err, to.intQuestAns, mo.cbid, err)
        dispatch({ type: INTERVIEW_QUESTION_ANSWER_CREATE_BY_ID_ERRORS, payload: err })
        // dispatch({ type: ERRORS_CREATE_INTERVIEW_QUESTION_ANSWER, payload: err })
        // console.log('history push to back to deleteIntQuest @ deleteLessonId')        
        history.push(`${ROUTES_REACT.interviewquestionsanswers_create}/${intQuestId}/answers/create`)
        return err;
      })
  }
}

export const interviewQuestionAnswerGetById = (interviewquestionanswerId) => {
  const URL = `${API_GATEWAY_INVOKE_URL}${ROUTES_API.interviewquestionsanswers}/${interviewquestionanswerId}`;
  let funcOptions = {...OPTIONS};
  funcOptions.method = HTTP_METHODS.get;
  
  return async (dispatch) => {
    dispatch({ type: INTERVIEW_QUESTION_ANSWER_GET_BY_ID_REQUEST })
    ls(co.act, so.req, to.intQuestAns, mo.gbid)
    await initFetchCall(URL, funcOptions, true)
      .then(res => {
        const { status } = res;
        if(status === 200){
          res.body = checkThenReturnAppropriateResBody(res.body)
          ls(co.act, so.res, to.intQuestAns, mo.gbid, res)
          dispatch({ type: INTERVIEW_QUESTION_ANSWER_GET_BY_ID_SUCCESS, payload: res })
          // dispatch({ type: GET_INTERVIEW_QUESTION_ANSWER_BY_ID, payload: res })
          // dispatch({ type: ERRORS_GET_INTERVIEW_QUESTION_ANSWER_BY_ID, payload: errorNotExistPayload })
        }
        return res;
      })
      .catch(err => {
        ls(co.act, so.err, to.intQuestAns, mo.gbid, err)        
        dispatch({ type: INTERVIEW_QUESTION_ANSWER_GET_BY_ID_ERRORS, payload: err })
        // dispatch({ type: ERRORS_GET_INTERVIEW_QUESTION_ANSWER_BY_ID, payload: err })
        return err;
      })
  }
}

export const interviewQuestionAnswerEditById = (edittedInterviewQuestionAnswer, intQuestId) => {
  const { intQuestionAnswer: { updatedAt } } = DM
  const URL = `${API_GATEWAY_INVOKE_URL}${ROUTES_API.interviewquestionsanswers}/${edittedInterviewQuestionAnswer.Id}`
  let funcOptions = {...OPTIONS};
  funcOptions.method = HTTP_METHODS.put;
  edittedInterviewQuestionAnswer[updatedAt] = new Date().toString();
  funcOptions.body = JSON.stringify(ModelConverterForUpdate.returnBodyObject(DM.intQuestionAnswer, edittedInterviewQuestionAnswer));
  
  return async (dispatch) => {
    dispatch({ type: INTERVIEW_QUESTION_ANSWER_EDIT_BY_ID_REQUEST })
    ls(co.act, so.req, to.intQuestAns, mo.ebid)
    await initFetchCall(URL, funcOptions, true)
      .then(res => {
        const { status } = res;
        if(status === 200){
          dispatch(interviewQuestionEditById(intQuestId));
          ls(co.act, so.res, to.intQuestAns, mo.ebid, res)     
          dispatch({ type: INTERVIEW_QUESTION_ANSWER_EDIT_BY_ID_SUCCESS, payload: res })
          // dispatch({ type: EDIT_INTERVIEW_QUESTION_ANSWER_BY_ID, payload: res })
          // dispatch({ type: ERRORS_EDIT_INTERVIEW_QUESTION_ANSWER_BY_ID, payload: errorNotExistPayload })
        }
        history.push(ROUTES_REACT.interviewquestions)        
        return res;
      })
      .catch(err => {
        ls(co.act, so.err, to.intQuestAns, mo.ebid, err)        
        dispatch({ type: INTERVIEW_QUESTION_ANSWER_EDIT_BY_ID_ERRORS, payload: err })
        // dispatch({ type: ERRORS_EDIT_INTERVIEW_QUESTION_ANSWER_BY_ID, payload: err })
        history.push(`${ROUTES_REACT.interviewquestions}/${intQuestId}/answers/edit/${edittedInterviewQuestionAnswer.Id}`)        
      })
  }
}

export const interviewQuestionAnswerDeleteById = (interviewquestionanswerId, intQuestObj) => {
  const URL = `${API_GATEWAY_INVOKE_URL}${ROUTES_API.interviewquestionsanswers}/${interviewquestionanswerId}`;
  let funcOptions = {...OPTIONS};
  funcOptions.method = HTTP_METHODS.delete;
  
  return async (dispatch) => {
    dispatch({ type: INTERVIEW_QUESTION_ANSWER_DELETE_BY_ID_REQUEST })
    ls(co.act, so.req, to.intQuestAns, mo.dbid)
    await initFetchCall(URL, funcOptions, true)
      .then(res => {
        const { status } = res
        if(status === 200){
          ls(co.act, so.res, to.intQuestAns, mo.dbid, res)
          dispatch({ type: INTERVIEW_QUESTION_ANSWER_DELETE_BY_ID_SUCCESS, payload: res })
          // dispatch({ type: DELETE_INTERVIEW_QUESTION_ANSWER_BY_ID, payload: res })
          // dispatch({ type: ERRORS_DELETE_INTERVIEW_QUESTION_ANSWER_BY_ID, payload: res })
        }
        return res;
      })
      .catch(err => {
        ls(co.act, so.err, to.intQuestAns, mo.dbid, err)
        dispatch({ type: INTERVIEW_QUESTION_ANSWER_DELETE_BY_ID_ERRORS, payload: err })
        // dispatch({ type: ERRORS_DELETE_INTERVIEW_QUESTION_ANSWER_BY_ID, payload: err })
        history.push(`${ROUTES_REACT.interviewquestions}/${intQuestObj.Id}/answers/delete/${interviewquestionanswerId}`)                
        return err
      })
    // console.log('response @ deleteIntQuestionAnswerById: ', response);
  }
  
}

export const skillsGetAll = () => {
  const URL = `${API_GATEWAY_INVOKE_URL}${ROUTES_API.skills}`;
  let funcOptions = { ...OPTIONS };
  funcOptions.method = HTTP_METHODS.get;
  
  return async (dispatch) => {
    dispatch({ type: SKILLS_GET_ALL_REQUEST })
    ls(co.act, so.req, to.skill, mo.gas)
    await initFetchCall(URL, funcOptions, true)
      .then(res => {
        const { status } = res
        // should get a response object {status, ok, body}
        if(status === 200){
          ls(co.act, so.res, to.skill, mo.gas, res)
          dispatch({ type: SKILLS_GET_ALL_SUCCESS, payload: res })
        //   dispatch({ type: GET_ALL_SKILLS, payload: res })
        //   dispatch({ type: ERRORS_GET_ALL_SKILLS, payload: errorNotExistPayload })
        }
        return res
      })
      .catch(err => {
        ls(co.act, so.err, to.skill, mo.gas, err)
        // should get an error object { status, ok, body }
        dispatch({ type: SKILLS_GET_ALL_ERRORS, payload: err })
        // dispatch({ type: ERRORS_GET_ALL_SKILLS, payload: err })
        return err
      })
  }
}
// SKILL_CREATE_BY_ID_REQUEST, SKILL_CREATE_BY_ID_SUCCESS, SKILL_CREATE_BY_ID_ERRORS
export const skillCreateById = (newSkill, thenPushPath, catchPushPath) => {
  const URL = `${API_GATEWAY_INVOKE_URL}${ROUTES_API.skills}`
  let funcOptions = {...OPTIONS};
  funcOptions.method = HTTP_METHODS.post;
  funcOptions.body = JSON.stringify(ModelConverterForUpdate.returnBodyObject(DM.profileSkill, newSkill));
  
  return async (dispatch) => {
    dispatch({ type: SKILL_CREATE_BY_ID_REQUEST })
    ls(co.act, so.req, to.skill, mo.cbid)
    await initFetchCall(URL, funcOptions, true)
      .then(res => {
        const { status } = res;
        if(status === 200){
          ls(co.act, so.res, to.skill, mo.cbid, res)
          dispatch({ type: SKILL_CREATE_BY_ID_SUCCESS, payload: res });
          // dispatch({ type: CREATE_SKILL, payload: res });
          // dispatch({ type: ERRORS_CREATE_SKILL, payload: errorNotExistPayload });
        }
        // history.push()
        return res;
      })
      .catch(err => {
        ls(co.act, so.err, to.skill, mo.cbid, err)      
        dispatch({ type: SKILL_CREATE_BY_ID_ERRORS, payload: err })
        // dispatch({ type: ERRORS_CREATE_SKILL, payload: err })
        // console.log('history push to back to createSkill @ createSkill')
        // history.push()
        return err;
      })
  }
}
// SKILL_GET_BY_ID_REQUEST, SKILL_GET_BY_ID_SUCCESS, SKILL_GET_BY_ID_ERRORS,
export const skillGetById = () => {
  
}
// SKILL_EDIT_BY_ID_REQUEST, SKILL_EDIT_BY_ID_SUCCESS, SKILL_EDIT_BY_ID_ERRORS,
export const skillEditById = (edittedSkill, thenPushPath, catchPushPath) => {
  const { profileSkill: { updatedAt } } = DM  
  const URL = `${API_GATEWAY_INVOKE_URL}${ROUTES_API.skills}/${edittedSkill.id}`;
  let funcOptions = {...OPTIONS};
  funcOptions.method = HTTP_METHODS.put;
  edittedSkill[updatedAt] = new Date().toString();
  funcOptions.body = JSON.stringify(ModelConverterForUpdate.returnBodyObject(DM.profileSkill, edittedSkill));
  
  return async (dispatch) => {
    dispatch({ type: SKILL_EDIT_BY_ID_REQUEST })
    ls(co.act, so.req, to.skill, mo.ebid)
    await initFetchCall(URL, funcOptions, true)
      .then(res => {
        const { status } = res;
        if(status === 200){
          ls(co.act, so.res, to.skill, mo.ebid, res)         
          dispatch({ type: SKILL_EDIT_BY_ID_SUCCESS, payload: res });
          // dispatch({ type: EDIT_SKILL_BY_ID, payload: res });
          // dispatch({ type: ERRORS_EDIT_SKILL_BY_ID, payload: errorNotExistPayload });
        }
      })
      .catch(err => {
        ls(co.act, so.err, to.skill, mo.ebid, err)        
        dispatch({ type: SKILL_EDIT_BY_ID_ERRORS, payload: err })
        // dispatch({ type: ERRORS_EDIT_SKILL_BY_ID, payload: err })
        history.push(`${ROUTES_REACT.skills_edit}/${edittedSkill.id}`)
      })
  }
  
}
// SKILL_DELETE_BY_ID_REQUEST, SKILL_DELETE_BY_ID_SUCCESS, SKILL_DELETE_BY_ID_ERRORS,
export const skillDeleteById = () => {
  
}

export const homeScreenQuotesGetAll = () => {
  const URL = `${API_GATEWAY_INVOKE_URL}${ROUTES_API.homeScreenQuotes}`;
  let funcOptions = { ...OPTIONS }
  funcOptions.method = HTTP_METHODS.get
  
  return async (dispatch) => {
    dispatch({ type: HOMESCREEN_QUOTES_GET_ALL_REQUEST })
    ls(co.act, so.req, to.homeScreenQuotes, mo.ga)
    await initFetchCall(URL, funcOptions, false)
      .then(res => {
        const { status } = res
        if(status === 200){
          ls(co.act, so.res, to.homeScreenQuotes, mo.ga, res)
          dispatch({ type: HOMESCREEN_QUOTES_GET_ALL_SUCCESS, payload: res })
          // dispatch({ type: GET_ALL_HOMESCREEN_QUOTES, payload: res })
          // dispatch({ type: ERRORS_GET_ALL_HOMESCREEN_QUOTES, payload: errorNotExistPayload })
        }
        return res
      })
      .catch(err => {
        ls(co.act, so.err, to.homeScreenQuotes, mo.ga, err)
        dispatch({ type: HOMESCREEN_QUOTES_GET_ALL_ERRORS, payload: err })
        // dispatch({ type: ERRORS_GET_ALL_HOMESCREEN_QUOTES, payload: err })
        return err
      })
  }
}
// RANKS_GET_ALL_REQUEST, RANKS_GET_ALL_SUCCESS, RANKS_GET_ALL_ERRORS
export const ranksGetAll = () => {
  const URL = `${API_GATEWAY_INVOKE_URL}${ROUTES_API.ranks}`;
  let funcOptions = { ...OPTIONS }
  funcOptions.method = HTTP_METHODS.get
  
  return async (dispatch) => {
    dispatch({ type: RANKS_GET_ALL_REQUEST })
    ls(co.act, so.req, to.ranks, mo.ga)
    await initFetchCall(URL, funcOptions, true)
      .then(res => {
        const { status } = res
        if(status === 200){
          ls(co.act, so.res, to.ranks, mo.ga, res)
          dispatch({ type: RANKS_GET_ALL_SUCCESS, payload: res })
        }
        return res
      })
      .catch(err => {
        ls(co.act, so.err, to.ranks, mo.ga, err)
        dispatch({ type: RANKS_GET_ALL_ERRORS, payload: err })
        return err
      })
  }
}

// GET_ALL_USERS, CREATE_USER,
// GET_USER_BY_ID, EDIT_USER_BY_ID, DELETE_USER_BY_ID,

// ERRORS_GET_ALL_USERS, ERRORS_CREATE_USER,
// ERRORS_GET_USER_BY_ID, ERRORS_EDIT_USER_BY_ID, ERRORS_DELETE_USER_BY_ID,

// GET_ALL_LESSONS, CREATE_LESSON,
// GET_LESSON_BY_ID, EDIT_LESSON_BY_ID, DELETE_LESSON_BY_ID, 
// ERRORS_GET_ALL_LESSONS, ERRORS_CREATE_LESSON,
// ERRORS_GET_LESSON_BY_ID, ERRORS_EDIT_LESSON_BY_ID, ERRORS_DELETE_LESSON_BY_ID,

// GET_ALL_INTERVIEW_QUESTIONS, CREATE_INTERVIEW_QUESTION,
// GET_INTERVIEW_QUESTION_BY_ID, EDIT_INTERVIEW_QUESTION_BY_ID, DELETE_INTERVIEW_QUESTION_BY_ID,
// ERRORS_GET_ALL_INTERVIEW_QUESTIONS, ERRORS_CREATE_INTERVIEW_QUESTION,
// ERRORS_GET_INTERVIEW_QUESTION_BY_ID, ERRORS_EDIT_INTERVIEW_QUESTION_BY_ID, ERRORS_DELETE_INTERVIEW_QUESTION_BY_ID,

// GET_ALL_INTERVIEW_QUESTIONS_ANSWERS, CREATE_INTERVIEW_QUESTION_ANSWER, 
// GET_INTERVIEW_QUESTION_ANSWER_BY_ID, EDIT_INTERVIEW_QUESTION_ANSWER_BY_ID, DELETE_INTERVIEW_QUESTION_ANSWER_BY_ID,

// ERRORS_GET_ALL_INTERVIEW_QUESTIONS_ANSWERS, ERRORS_CREATE_INTERVIEW_QUESTION_ANSWER, 
// ERRORS_GET_INTERVIEW_QUESTION_ANSWER_BY_ID, ERRORS_EDIT_INTERVIEW_QUESTION_ANSWER_BY_ID, ERRORS_DELETE_INTERVIEW_QUESTION_ANSWER_BY_ID,

// GET_ALL_SKILLS, CREATE_SKILL,
// GET_SKILL_BY_ID, EDIT_SKILL_BY_ID, DELETE_SKILL_BY_ID,

// ERRORS_GET_ALL_SKILLS, ERRORS_CREATE_SKILL,
// ERRORS_GET_SKILL_BY_ID, ERRORS_EDIT_SKILL_BY_ID, ERRORS_DELETE_SKILL_BY_ID,

// GET_ALL_HOMESCREEN_QUOTES, ERRORS_GET_ALL_HOMESCREEN_QUOTES,
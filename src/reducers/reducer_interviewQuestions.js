import { LogService as ls, catObj as co, subObj as so, tableObj as to, methodObj as mo } from '../services/logService'

import UtilityMethods from '../functions/utilityMethods'

import {
  INTERVIEW_QUESTIONS_GET_ALL_REQUEST, INTERVIEW_QUESTIONS_GET_ALL_SUCCESS, INTERVIEW_QUESTIONS_GET_ALL_ERRORS,
  INTERVIEW_QUESTION_CREATE_BY_ID_REQUEST, INTERVIEW_QUESTION_CREATE_BY_ID_SUCCESS, INTERVIEW_QUESTION_CREATE_BY_ID_ERRORS,
  INTERVIEW_QUESTION_GET_BY_ID_REQUEST, INTERVIEW_QUESTION_GET_BY_ID_SUCCESS, INTERVIEW_QUESTION_GET_BY_ID_ERRORS,
  INTERVIEW_QUESTION_EDIT_BY_ID_REQUEST, INTERVIEW_QUESTION_EDIT_BY_ID_SUCCESS, INTERVIEW_QUESTION_EDIT_BY_ID_ERRORS,
  INTERVIEW_QUESTION_DELETE_BY_ID_REQUEST, INTERVIEW_QUESTION_DELETE_BY_ID_SUCCESS, INTERVIEW_QUESTION_DELETE_BY_ID_ERRORS
} from '../actions/action_types'

const initialState = {
  allInterviewQuestions: [],
  lookupTableAllInterviewQuestions: {},
  interviewQuestionById: null
}

export default function(state = initialState, action){
  // console.log('@ intQuestion reducer: ', 'state: ', state, 'action: ', action)
  switch(action.type){
    case INTERVIEW_QUESTIONS_GET_ALL_REQUEST:
      ls(co.red, so.req, to.intQuest, mo.ga)
      return {
        ...state,
        isFetchingInterviewQuestionsGetAll: true
      }
    case INTERVIEW_QUESTIONS_GET_ALL_SUCCESS:
      ls(co.red, so.res, to.intQuest, mo.ga, action.payload.body)
      return {
        ...state,
        isFetchingInterviewQuestionsGetAll: false,
        allInterviewQuestions: action.payload.body,
        lookupTableAllInterviewQuestions: UtilityMethods.createObjectFromArrayByProp(action.payload.body, 'Id')
      }
    case INTERVIEW_QUESTIONS_GET_ALL_ERRORS:
      ls(co.red, so.err, to.intQuest, mo.ga, action.payload.body)
      return {
        ...state,
        isFetchingInterviewQuestionsGetAll: false,
        errorMessageInterviewQuestionsGetAll: action.payload.body
      }
    case INTERVIEW_QUESTION_CREATE_BY_ID_REQUEST:
      ls(co.red, so.req, to.intQuest, mo.cbid)
      return {
        ...state,
        isCreatingInterviewQuestionById: true
      }
    case INTERVIEW_QUESTION_CREATE_BY_ID_SUCCESS:
      ls(co.red, so.res, to.intQuest, mo.cbid, action.payload.body)
      let createState = [ ...state.allInterviewQuestions, action.payload.body]
      return {
        ...state,
        isCreatingInterviewQuestionById: false,
        allInterviewQuestions: createState,
        lookupTableAllInterviewQuestions: UtilityMethods.createObjectFromArrayByProp(createState, 'Id')
      }
    case INTERVIEW_QUESTION_CREATE_BY_ID_ERRORS:
      ls(co.red, so.err, to.intQuest, mo.cbid, action.payload.body)
      return {
        ...state,
        isCreatingInterviewQuestionById: false,
        errorMessageInterviewQuestionCreateById: action.payload.body
      }
    case INTERVIEW_QUESTION_GET_BY_ID_REQUEST:
      ls(co.red, so.req, to.intQuest, mo.gbid) 
      return {
        ...state,
        isGettingInterviewQuestionById: true
      }
    case INTERVIEW_QUESTION_GET_BY_ID_SUCCESS:
      ls(co.red, so.res, to.intQuest, mo.gbid, action.payload.body)
      return {
        ...state,
        isGettingInterviewQuestionById: false,
        interviewQuestionById: action.payload.body
      }
    case INTERVIEW_QUESTION_GET_BY_ID_ERRORS:
      ls(co.red, so.err, to.intQuest, mo.gbid, action.payload.body)
      return {
        ...state,
        isGettingInterviewQuestionById: false,
        errorMessageGettingInterviewQuestionById: action.payload.body
      }
    case INTERVIEW_QUESTION_EDIT_BY_ID_REQUEST:
      ls(co.red, so.req, to.intQuest, mo.ebid)
      return {
        ...state,
        isEditingInterviewQuestionById: true
      }
    case INTERVIEW_QUESTION_EDIT_BY_ID_SUCCESS:
      ls(co.red, so.res, to.intQuest, mo.ebid, action.payload.body)
      let editState = [ ...state.allInterviewQuestions ].filter(intQuestion => intQuestion.Id !== action.payload.body.Id);
      editState.push(action.payload.body);
      return {
        ...state,
        isEditingInterviewQuestionById: false,
        allInterviewQuestions: editState,
        lookupTableAllInterviewQuestions: UtilityMethods.createObjectFromArrayByProp(editState, 'Id'),
      }
    case INTERVIEW_QUESTION_EDIT_BY_ID_ERRORS:
      ls(co.red, so.err, to.intQuest, mo.ebid, action.payload.body)
      return {
        ...state,
        isEditingInterviewQuestionById: false,
        errorMessageEditingInterviewQuestionById: action.payload.body
      }
    case INTERVIEW_QUESTION_DELETE_BY_ID_REQUEST:
      ls(co.red, so.req, to.intQuest, mo.dbid)
      return {
        ...state,
        isDeletingInterviewQuestionById: true,
      }
    case INTERVIEW_QUESTION_DELETE_BY_ID_SUCCESS:
      ls(co.red, so.res, to.intQuest, mo.dbid, action.payload.body)
      let deleteState = [ ...state.allInterviewQuestions ].filter(intQuestion => intQuestion.Id !== action.payload.body.Id)
      return {
        ...state,
        isDeletingInterviewQuestionById: false,        
        allInterviewQuestions: deleteState,
        lookupTableAllInterviewQuestions: UtilityMethods.createObjectFromArrayByProp(deleteState, 'Id')
      }
    case INTERVIEW_QUESTION_DELETE_BY_ID_ERRORS:
      ls(co.red, so.err, to.intQuest, mo.dbid, action.payload.body)
      return {
        ...state,
        isDeletingInterviewQuestionById: false,
        errorMessageDeletingInterviewQuestionById: action.payload.body
      }
    default:
      return state  
  }
}

// ,
// FETCHING,
// GET_ALL_INTERVIEW_QUESTIONS, CREATE_INTERVIEW_QUESTION,
// GET_INTERVIEW_QUESTION_BY_ID, EDIT_INTERVIEW_QUESTION_BY_ID, DELETE_INTERVIEW_QUESTION_BY_ID

// case GET_ALL_INTERVIEW_QUESTIONS:
//   console.log('at fetch allIntQuestion case reducer', action.payload.body)
//   return {
//     ...state,
//     allInterviewQuestions: action.payload.body,
//     lookupTableAllInterviewQuestions: UtilityMethods.createObjectFromArrayByProp(action.payload.body, 'Id')
//   }
// case CREATE_INTERVIEW_QUESTION:
//   console.log('at create intQuestion case reducer', action.payload.body)
//   let createState = [ ...state.allInterviewQuestions, action.payload.body]
//   return {
//     ...state,
//     allInterviewQuestions: createState,
//     lookupTableAllInterviewQuestions: UtilityMethods.createObjectFromArrayByProp(createState, 'Id')
//   }
// case EDIT_INTERVIEW_QUESTION_BY_ID:
//   console.log('@ interviewQuestionsEditById - ', action.payload.body)
//   let editState = [ ...state.allInterviewQuestions ].filter(intQuestion => intQuestion.Id !== action.payload.body.Id);
//   editState.push(action.payload.body);
//   return {
//     allInterviewQuestions: editState,
//     lookupTableAllInterviewQuestions: UtilityMethods.createObjectFromArrayByProp(editState, 'Id'),
//     interviewQuestionById: action.payload.body
//   }
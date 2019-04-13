import { LogService as ls, catObj as co, subObj as so, tableObj as to, methodObj as mo } from '../services/logService'

import UtilityMethods from '../functions/utilityMethods'

import {
  INTERVIEW_QUESTION_ANSWERS_GET_ALL_REQUEST, INTERVIEW_QUESTION_ANSWERS_GET_ALL_SUCCESS, INTERVIEW_QUESTION_ANSWERS_GET_ALL_ERRORS,
  INTERVIEW_QUESTION_ANSWER_CREATE_BY_ID_REQUEST, INTERVIEW_QUESTION_ANSWER_CREATE_BY_ID_SUCCESS, INTERVIEW_QUESTION_ANSWER_CREATE_BY_ID_ERRORS,
  INTERVIEW_QUESTION_ANSWER_GET_BY_ID_REQUEST, INTERVIEW_QUESTION_ANSWER_GET_BY_ID_SUCCESS, INTERVIEW_QUESTION_ANSWER_GET_BY_ID_ERRORS,
  INTERVIEW_QUESTION_ANSWER_EDIT_BY_ID_REQUEST, INTERVIEW_QUESTION_ANSWER_EDIT_BY_ID_SUCCESS, INTERVIEW_QUESTION_ANSWER_EDIT_BY_ID_ERRORS,
  INTERVIEW_QUESTION_ANSWER_DELETE_BY_ID_REQUEST, INTERVIEW_QUESTION_ANSWER_DELETE_BY_ID_SUCCESS, INTERVIEW_QUESTION_ANSWER_DELETE_BY_ID_ERRORS,
} from '../actions/action_types';

const initialState = {
  allInterviewQuestionAnswers: [],
  lookupTableAllInterviewQuestionAnswers: {},
  interviewQuestionAnswerById: null
}

export default function(state = initialState, action){
  switch(action.type){
    case INTERVIEW_QUESTION_ANSWERS_GET_ALL_REQUEST:
      ls(co.red, so.req, to.intQuestAns, mo.ga)
      return {
        ...state,
        isFetchingInterviewQuestionAnswersGetAll: true
      }
    case INTERVIEW_QUESTION_ANSWERS_GET_ALL_SUCCESS:
      ls(co.red, so.res, to.intQuestAns, mo.ga, action.payload.body)
      return {
        ...state,
        isFetchingInterviewQuestionAnswersGetAll: false,
        allInterviewQuestionAnswers: action.payload.body,
        lookupTableAllInterviewQuestionAnswers: UtilityMethods.createObjectFromArrayByProp(action.payload.body, 'Id')
      }
    case INTERVIEW_QUESTION_ANSWERS_GET_ALL_ERRORS:
      ls(co.red, so.err, to.intQuestAns, mo.ga, action.payload.body)
      return {
        ...state,
        isFetchingInterviewQuestionAnswersGetAll: false,
        errorMessageInterviewQuestionAnswersGetAll: action.payload.body
      }
    // INTERVIEW_QUESTION_ANSWER_CREATE_BY_ID_REQUEST, INTERVIEW_QUESTION_ANSWER_CREATE_BY_ID_SUCCESS, INTERVIEW_QUESTION_ANSWER_CREATE_BY_ID_ERRORS,
    case INTERVIEW_QUESTION_ANSWER_CREATE_BY_ID_REQUEST:
      ls(co.red, so.req, to.intQuestAns, mo.cbid)
      return {
        ...state,
        isCreatingInterviewQuestionAnswerById: true
      }
    case INTERVIEW_QUESTION_ANSWER_CREATE_BY_ID_SUCCESS:
      ls(co.red, so.res, to.intQuestAns, mo.cbid, action.payload.body)
      let createState = [ ...state.allInterviewQuestionAnswers, action.payload.body];
      return {
        ...state,
        isCreatingInterviewQuestionAnswerById: false,
        allInterviewQuestionAnswers: createState,
        lookupTableAllInterviewQuestionAnswers: UtilityMethods.createObjectFromArrayByProp(createState, 'Id')
      }
    case INTERVIEW_QUESTION_ANSWER_CREATE_BY_ID_ERRORS:
      ls(co.red, so.err, to.intQuestAns, mo.cbid, action.payload.body)
      return {
        ...state,
        isCreatingInterviewQuestionAnswerById: false,
        errorMessageInterviewQuestionAnswerGetAll: action.payload.body
      }
    // INTERVIEW_QUESTION_ANSWER_GET_BY_ID_REQUEST, INTERVIEW_QUESTION_ANSWER_GET_BY_ID_SUCCESS, INTERVIEW_QUESTION_ANSWER_GET_BY_ID_ERRORS,
    case INTERVIEW_QUESTION_ANSWER_GET_BY_ID_REQUEST:
      ls(co.red, so.req, to.intQuestAns, mo.gbid)
      return {
        ...state,
        isGettingInterviewQuestionAnswerById: true,
      }
    case INTERVIEW_QUESTION_ANSWER_GET_BY_ID_SUCCESS:
      ls(co.red, so.res, to.intQuestAns, mo.gbid, action.payload.body)
      return {
        ...state,
        isGettingInterviewQuestionAnswerById: false,
        allInterviewQuestionAnswers: [ ...state.allInterviewQuestionAnswers ],
        lookupTableAllInterviewQuestionAnswers: { ...state.lookupTableAllInterviewQuestionAnswers },
        interviewQuestionAnswerById: action.payload.body
      }
    case INTERVIEW_QUESTION_ANSWER_GET_BY_ID_ERRORS:
      ls(co.red, so.err, to.intQuestAns, mo.gbid, action.payload.body)
      return {
        ...state,
        isGettingInterviewQuestionAnswerById: false,
        errorMessageGettingInterviewQuestionAnswerById: action.payload.body
      }
    // INTERVIEW_QUESTION_ANSWER_EDIT_BY_ID_REQUEST, INTERVIEW_QUESTION_ANSWER_EDIT_BY_ID_SUCCESS, INTERVIEW_QUESTION_ANSWER_EDIT_BY_ID_ERRORS,
    case INTERVIEW_QUESTION_ANSWER_EDIT_BY_ID_REQUEST:
      ls(co.red, so.req, to.intQuestAns, mo.ebid)
      return {
        ...state,
        isEditingInterviewQuestionAnswerById: true
      }
    case INTERVIEW_QUESTION_ANSWER_EDIT_BY_ID_SUCCESS:
      ls(co.red, so.res, to.intQuestAns, mo.ebid, action.payload.body)
      let editState = [ ...state.allInterviewQuestionAnswers ].filter(intQuestionAns => intQuestionAns.Id !== action.payload.body.Id);
      editState.push(action.payload.body);
      return {
        ...state,
        isEditingInterviewQuestionAnswerById: false,
        allInterviewQuestionAnswers: editState,
        lookupTableAllInterviewQuestionAnswers: UtilityMethods.createObjectFromArrayByProp(editState, 'Id'),
      }
    case INTERVIEW_QUESTION_ANSWER_EDIT_BY_ID_ERRORS:
      ls(co.red, so.err, to.intQuestAns, mo.ebid, action.payload.body)
      return {
        ...state,
        isEditingInterviewQuestionAnswerById: false,
        errorMessageEdittingInterviewQuestionAnswerById: action.payload.body
      }
    // INTERVIEW_QUESTION_ANSWER_DELETE_BY_ID_REQUEST, INTERVIEW_QUESTION_ANSWER_DELETE_BY_ID_SUCCESS, INTERVIEW_QUESTION_ANSWER_DELETE_BY_ID_ERRORS,
    case INTERVIEW_QUESTION_ANSWER_DELETE_BY_ID_REQUEST:
      ls(co.red, so.req, to.intQuestAns, mo.dbid)
      return {
        ...state,
        isDeletingInterviewQuestionAnswerById: true,
      }
    case INTERVIEW_QUESTION_ANSWER_DELETE_BY_ID_SUCCESS:
      ls(co.red, so.res, to.intQuestAns, mo.ebid, action.payload.body)
      let deleteState = [ ...state.allInterviewQuestionAnswers ].filter(intQuestionAns => intQuestionAns !== action.payload.body.Id);
      return {
        ...state,
        isDeletingInterviewQuestionAnswerById: false,
        allInterviewQuestionAnswers: deleteState,
        lookupTableAllInterviewQuestionAnswers: UtilityMethods.createObjectFromArrayByProp(deleteState, 'Id'),
      }
    case INTERVIEW_QUESTION_ANSWER_DELETE_BY_ID_ERRORS:
      ls(co.red, so.err, to.intQuestAns, mo.dbid, action.payload.body)
      return {
        ...state,
        isDeletingInterviewQuestionAnswerById: true,
        errorMessageDeletingInterviewQuestionAnswerById: action.payload.body
      }
    default:
      return state;
  }
}


// FETCHING,
// GET_ALL_INTEsRVIEW_QUESTIONS_ANSWERS, CREATE_INTERVIEW_QUESTION_ANSWER,
// GET_INTERVIEW_QUESTION_ANSWER_BY_ID, EDIT_INTERVIEW_QUESTION_ANSWER_BY_ID, DELETE_INTERVIEW_QUESTION_ANSWER_BY_ID

// case GET_ALL_INTERVIEW_QUESTIONS_ANSWERS:
  //   console.log('at fetch allIntQuestAns case reducer', action.payload.body);
  //   return {
  //     allInterviewQuestionAnswers: action.payload.body,
  //     lookupTableAllInterviewQuestionAnswers: UtilityMethods.createObjectFromArrayByProp(action.payload.body, 'Id'),
  //     interviewQuestionAnswerById: null
//   //   }
// case CREATE_INTERVIEW_QUESTION_ANSWER:
//   console.log('at create intQuestAns case reducer', action.payload.body);
//   let createState = [ ...state.allInterviewQuestionAnswers, action.payload.body];
//   return {
//     allInterviewQuestionAnswers: createState,
//     lookupTableAllInterviewQuestionAnswers: UtilityMethods.createObjectFromArrayByProp(createState, 'Id'),
//     interviewQuestionAnswerById: null
//   }
// case GET_INTERVIEW_QUESTION_ANSWER_BY_ID:
//   console.log('at get intQuestAns case reducer', action.payload.body);
//   return {
//     allInterviewQuestionAnswers: [ ...state.allInterviewQuestionAnswers ],
//     lookupTableAllInterviewQuestionAnswers: { ...state.lookupTableAllInterviewQuestionAnswers },
//     interviewQuestionAnswerById: action.payload.body
//   }
// case EDIT_INTERVIEW_QUESTION_ANSWER_BY_ID:
//   console.log('at edit intQuestAns case reducer', action.payload.body);
//   let editState = [ ...state.allInterviewQuestionAnswers ].filter(intQuestionAns => intQuestionAns.Id !== action.payload.body.Id);
//   editState.push(action.payload.body);
//   return {
//     allInterviewQuestionAnswers: editState,
//     lookupTableAllInterviewQuestionAnswers: UtilityMethods.createObjectFromArrayByProp(editState, 'Id'),
//     interviewQuestionAnswerById: action.payload.body
//   }
// case DELETE_INTERVIEW_QUESTION_ANSWER_BY_ID:
//   console.log('at delete intQuestAns case reducer', action.payload.body);
//   let deleteState = [ ...state.allInterviewQuestionAnswers ].filter(intQuestionAns => intQuestionAns !== action.payload.body.Id);
//   return {
//     allInterviewQuestionAnswers: deleteState,
//     lookupTableAllInterviewQuestionAnswers: UtilityMethods.createObjectFromArrayByProp(deleteState, 'Id'),
//     interviewQuestionAnswerById: null
//   }
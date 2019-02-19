import UtilityMethods from '../functions/utilityMethods'

import { 
  FETCHING,
  FETCH_INTERVIEW_QUESTIONS_ANSWERS, CREATE_INTERVIEW_QUESTION_ANSWER,
  GET_INTERVIEW_QUESTION_ANSWER_BY_ID, EDIT_INTERVIEW_QUESTION_ANSWER_BY_ID, DELETE_INTERVIEW_QUESTION_ANSWER_BY_ID
} from '../actions/action_types';

const initialState = {
  allInterviewQuestionsAnswers: FETCHING,
  lookupTableInterviewQuestionsAnswers: {},
  interviewQuestionAnswerById: FETCHING
}

export default function(state = initialState, action){
  switch(action.type){
    case FETCH_INTERVIEW_QUESTIONS_ANSWERS:
      console.log('at fetch allIntQuestAns case reducer', action.payload.body);
      return {
        allInterviewQuestionsAnswers: action.payload.body,
        lookupTableInterviewQuestionsAnswers: UtilityMethods.createObjectFromArrayByProp(action.payload.body, 'Id'),
        interviewQuestionAnswerById: null
      }
    case CREATE_INTERVIEW_QUESTION_ANSWER:
      console.log('at create intQuestAns case reducer', action.payload.body);
      let createState = [ ...state.allInterviewQuestionsAnswers, action.payload.body];
      return {
        allInterviewQuestionsAnswers: createState,
        lookupTableInterviewQuestionsAnswers: UtilityMethods.createObjectFromArrayByProp(createState, 'Id'),
        interviewQuestionAnswerById: null
      }
    case GET_INTERVIEW_QUESTION_ANSWER_BY_ID:
      console.log('at get intQuestAns case reducer', action.payload.body);
      return {
        allInterviewQuestionsAnswers: [ ...state.allInterviewQuestionsAnswers ],
        lookupTableInterviewQuestionsAnswers: { ...state.lookupTableInterviewQuestionsAnswers },
        interviewQuestionAnswerById: action.payload.body
      }
    case EDIT_INTERVIEW_QUESTION_ANSWER_BY_ID:
      console.log('at edit intQuestAns case reducer', action.payload.body);
      let editState = [ ...state.allInterviewQuestionsAnswers ].filter(intQuestionAns => intQuestionAns.Id !== action.payload.body.Id);
      editState.push(action.payload.body);
      return {
        allInterviewQuestionsAnswers: editState,
        lookupTableInterviewQuestionsAnswers: UtilityMethods.createObjectFromArrayByProp(editState, 'Id'),
        interviewQuestionAnswerById: action.payload.body
      }
    case DELETE_INTERVIEW_QUESTION_ANSWER_BY_ID:
      console.log('at delete intQuestAns case reducer', action.payload.body);
      // let deleteState = [ ...state.allInterviewQuestionsAnswers ].filter(intQuestionAns => intQuestionAns !== action.payload.body.Id);
      // return {
      //   allInterviewQuestionsAnswers: deleteState,
      //   lookupTableInterviewQuestionsAnswers: UtilityMethods.createObjectFromArrayByProp(deleteState, 'Id'),
      //   interviewQuestionAnswerById: null
      // }
      return state
    default:
      return state;
  }
}
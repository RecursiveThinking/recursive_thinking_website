import UtilityMethods from '../functions/utilityMethods'

import {
  FETCHING,
  FETCH_INTERVIEW_QUESTIONS, CREATE_INTERVIEW_QUESTION,
  GET_INTERVIEW_QUESTION_BY_ID, EDIT_INTERVIEW_QUESTION_BY_ID, DELETE_INTERVIEW_QUESTION_BY_ID
} from '../actions/action_types'

const initialState = {
  allInterviewQuestions: FETCHING,
  lookupTableInterviewQuestions: {},
  interviewQuestionById: FETCHING
}

export default function(state = initialState, action){
  // console.log('@ intQuestion reducer: ', 'state: ', state, 'action: ', action)
  switch(action.type){
    case FETCH_INTERVIEW_QUESTIONS:
      console.log('at fetch allIntQuestion case reducer', action.payload.body)
      return {
        ...state,
        allInterviewQuestions: action.payload.body,
        lookupTableInterviewQuestions: UtilityMethods.createObjectFromArrayByProp(action.payload.body, 'Id')
      }
    case CREATE_INTERVIEW_QUESTION:
      console.log('at create intQuestion case reducer', action.payload.body)
      let createState = [ ...state.allInterviewQuestions, action.payload.body]
      return {
        ...state,
        allInterviewQuestions: createState,
        lookupTableInterviewQuestions: UtilityMethods.createObjectFromArrayByProp(createState, 'Id')
      }
    case GET_INTERVIEW_QUESTION_BY_ID:
      console.log('at get intQuestion case reducer', action.payload.body)
      return {
        allInterviewQuestions: [ ...state.allInterviewQuestions ],
        lookupTableInterviewQuestions: { ...state.lookupTableInterviewQuestions },
        interviewQuestionById: action.payload.body
      }
    case EDIT_INTERVIEW_QUESTION_BY_ID:
      console.log('at edit intQuestion case reducer', action.payload.body)
      let editState = [ ...state.allInterviewQuestions ].filter(intQuestion => intQuestion.Id !== action.payload.body.Id);
      editState.push(action.payload.body);
      return {
        allInterviewQuestions: editState,
        lookupTableInterviewQuestions: UtilityMethods.createObjectFromArrayByProp(editState, 'Id'),
        interviewQuestionById: action.payload.body
      }
    case DELETE_INTERVIEW_QUESTION_BY_ID:
      console.log('at delete intQuestion case reducer', action.payload.body)
      let deleteState = [ ...state.allInterviewQuestions ].filter(intQuestion => intQuestion.Id !== action.payload.body.Id)
      return {
        ...state,
        allInterviewQuestions: deleteState,
        lookupTableInterviewQuestions: UtilityMethods.createObjectFromArrayByProp(deleteState, 'Id')
      }
    default:
      return state  
  }
}
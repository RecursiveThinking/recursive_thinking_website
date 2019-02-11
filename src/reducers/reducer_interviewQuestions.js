import UtilityMethods from '../functions/utilityMethods'

import { FETCH_INTERVIEW_QUESTIONS, FETCHING } from '../actions/action_types'

const initialState = {
  allInterviewQuestions: FETCHING,
  allInterviewQuestionsAPIResponse: {},
  lookupTableInterviewQuestions: FETCHING
}

export default function(state = initialState, action){
  // console.log('action', action, action.payload)
  switch(action.type){
    case FETCH_INTERVIEW_QUESTIONS:
      // if(action.payload.body && action.payload.status.statusCode === 200){
      if(action.payload){
        return {
          allInterviewQuestions: action.payload,
          allInterviewQuestionsAPIResponse: 200,
          lookupTableInterviewQuestions: UtilityMethods.createObjectFromArrayByProp(action.payload, 'Id')
        }
      } else {
        // not properly formed so its an error
        return {
          allInterviewQuestions: null,
          allInterviewQuestionsAPIResponse: action.payload,
          lookupTableInterviewQuestions: null
        }
      }
    default:
      return state  
  }
}
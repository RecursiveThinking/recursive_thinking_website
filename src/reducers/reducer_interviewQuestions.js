import UtilityMethods from '../functions/utilityMethods'

import { FETCH_INTERVIEW_QUESTIONS, FETCHING } from '../actions/index'

const initialState = {
  allInterviewQuestions: FETCHING,
  allInterviewQuestionsAPIResponse: {},
  lookupTableInterviewQuestions: FETCHING
}

export default function(state = initialState, action){
  // console.log('action', action, action.payload)
  switch(action.type){
    case FETCH_INTERVIEW_QUESTIONS:
      if(action.payload.body && action.payload.status.statusCode === 200){
        return {
          allInterviewQuestions: action.payload.body,
          allInterviewQuestionsAPIResponse: action.payload.status,        
          lookupTableInterviewQuestions: UtilityMethods.createObjectFromArrayByProp(action.payload.body, 'Id')
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
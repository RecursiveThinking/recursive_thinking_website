import UtilityMethods from '../functions/utilityMethods'

import { FETCH_INTERVIEW_QUESTIONS } from '../actions/index'

const initialState = {
  allInterviewQuestions: [],
  lookupTableInterviewQuestions: {}
}

export default function(state = initialState, action){
  // console.log('action', action, action.payload)
  switch(action.type){
    case FETCH_INTERVIEW_QUESTIONS:
      return {
        allInterviewQuestions: action.payload,        
        lookupTableInterviewQuestions: UtilityMethods.createObjectFromArrayByProp(action.payload, 'Id')
      }
    default:
      return state  
  }
}
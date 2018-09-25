import UtilityMethods from '../functions/utilityMethods'

import { FETCH_INTERVIEW_QUESTIONS_ANSWERS } from '../actions/index';

const initialState = {
  allInterviewQuestionsAnswers: [],
  lookupTableInterviewQuestionsAnswers: {}
}

export default function(state = initialState, action){
  switch(action.type){
    case FETCH_INTERVIEW_QUESTIONS_ANSWERS:
      return {
        allInterviewQuestionsAnswers: action.payload,        
        lookupTableInterviewQuestionsAnswers: UtilityMethods.createObjectFromArrayByProp(action.payload, 'Id')
      }
    default:
      return state;
  }
}
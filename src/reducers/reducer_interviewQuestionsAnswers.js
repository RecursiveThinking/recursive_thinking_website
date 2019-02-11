import UtilityMethods from '../functions/utilityMethods'

import { FETCH_INTERVIEW_QUESTIONS_ANSWERS, FETCHING } from '../actions/action_types';

const initialState = {
  allInterviewQuestionsAnswers: FETCHING,
  allInterviewQuestionsAnswersAPIResponse: {},
  lookupTableInterviewQuestionsAnswers: FETCHING
}

export default function(state = initialState, action){
  switch(action.type){
    case FETCH_INTERVIEW_QUESTIONS_ANSWERS:
      // if(action.payload.body && action.payload.status.statusCode === 200){
      if(action.payload){
        return {
          allInterviewQuestionsAnswers: action.payload,
          allInterviewQuestionsAnswersAPIResponse: 200,        
          lookupTableInterviewQuestionsAnswers: UtilityMethods.createObjectFromArrayByProp(action.payload, 'Id')
        }
      } else {
        return {
          allInterviewQuestionsAnswers: null,
          allInterviewQuestionsAnswersAPIResponse: action.payload,
          lookupTableInterviewQuestionsAnswers: null
        }
      }
    default:
      return state;
  }
}
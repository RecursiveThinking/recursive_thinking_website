import UtilityMethods from '../functions/utilityMethods'
import LessonMethods from '../functions/lessonMethods'

import { FETCH_LESSONS, FETCHING, CREATE_LESSON } from '../actions/action_types'

const initialState = {
  allLessons: FETCHING,
  allLessonsAPIResponse: {},
  lookupTableAllLessons: FETCHING,
  scheduledLessons: FETCHING,
  unscheduledLessons: FETCHING
}

export default function(state = initialState, action){
  // console.log('aP', action.payload)
  switch(action.type){
    case FETCH_LESSONS:
      // if there is a well-formed payload { body: [] and status: <statusCode: >}
      // if we have a body and good status code.
      // if(action.payload.body && action.payload.statusCode === 200){
      if(action.payload){
        console.log('at action lessons', action.payload)
        return {
          allLessons: action.payload,
          allLessonsAPIResponse: 200,
          lookupTableAllLessons: UtilityMethods.createObjectFromArrayByProp(action.payload, 'Id'),
          scheduledLessons: LessonMethods.getArrayOfScheduledLessons(action.payload, 'date'),
          unscheduledLessons: LessonMethods.getArrayOfUnscheduledLessons(action.payload, 'date')
        }
      } else {
        // there is an error/error object to prevent the UI from rendering, return null for everything, but the API status code
        return {
          allLessons: null,
          allLessonsAPIResponse: action.payload,
          lookupTableAllLessons: null,
          scheduledLessons: null,
          unscheduledLessons: null
        }
      }
    case CREATE_LESSON:
      return state
    default: 
      return state
  }
}
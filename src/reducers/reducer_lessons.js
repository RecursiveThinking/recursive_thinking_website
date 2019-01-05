import UtilityMethods from '../functions/utilityMethods'
import LessonMethods from '../functions/lessonMethods'

import { FETCH_LESSONS, FETCHING } from '../actions/action_types'

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
      if(action.payload.body && action.payload.status.statusCode === 200){
        return {
          allLessons: action.payload.body,
          allLessonsAPIResponse: action.payload.status,
          lookupTableAllLessons: UtilityMethods.createObjectFromArrayByProp(action.payload.body, 'Id'),
          scheduledLessons: LessonMethods.getArrayOfScheduledLessons(action.payload.body, 'date'),
          unscheduledLessons: LessonMethods.getArrayOfUnscheduledLessons(action.payload.body, 'date')
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
    default: 
      return state
  }
}
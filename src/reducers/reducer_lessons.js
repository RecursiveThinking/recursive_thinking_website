// const Lessons = require('!json-loader!../../data_returns/RecursiveThinkingLessons.json');
// console.log('Lessons in Reducer', Lessons)

import UtilityMethods from '../functions/utilityMethods'

import { FETCH_LESSONS, FETCHING } from '../actions/index'

const initialState = {
  allLessons: [],
  allLessonsAPIResponse: FETCHING,
  lookupTableAllLessons: {},
  scheduledLessons: [],
  unscheduledLessons: []
}

// remember this comes in from the action creator as:

// {
//   allLessons: []
//   scheduledLessons: []
//   unscheduledLessons: []
// }

export default function(state = initialState, action){
  // console.log('aP', action.payload)
  switch(action.type){
    case FETCH_LESSONS:
      // if there is a well-formed payload { body: [] and status: <statusCode: >}
      // return Object.assign(action.payload, {lookupTableAllLessons: UtilityMethods.createObjectFromArrayByProp(action.payload.allLessons, 'Id')})
      // if we have a body and good status code.
      if(action.payload.body && action.payload.status.statusCode === 200){
        return {
          allLessons: action.payload.body,
          allLessonsAPIResponse: action.payload.status,
          lookupTableAllLessons: UtilityMethods.createObjectFromArrayByProp(action.payload.body, 'Id'),
          scheduledLessons: action.payload.scheduledLessons,
          unscheduledLessons: action.payload.unscheduledLessons
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
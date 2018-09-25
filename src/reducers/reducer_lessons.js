// const Lessons = require('!json-loader!../../data_returns/RecursiveThinkingLessons.json');
// console.log('Lessons in Reducer', Lessons)

import UtilityMethods from '../functions/utilityMethods'

import { FETCH_LESSONS } from '../actions/index'

const initialState = {
  allLessons: [],
  lookupTableAllLessons: {},
  scheduledLessons: [],
  unscheduledLessons: []
}

export default function(state = initialState, action){
  // console.log('aP', action.payload)
  switch(action.type){
    case FETCH_LESSONS:
      // return action.payload;
      return Object.assign(action.payload, {lookupTableAllLessons: UtilityMethods.createObjectFromArrayByProp(action.payload.allLessons, 'Id')})
    // case SET_ALL_SCHEDULED_LESSONS:
    //   return Object.assign(state, {scheduledLessons: action.payload})
    default: 
      return state
  }
}
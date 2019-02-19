import UtilityMethods from '../functions/utilityMethods'
import LessonMethods from '../functions/lessonMethods'

import { 
  FETCHING,
  FETCH_LESSONS, CREATE_LESSON, 
  GET_LESSON_BY_ID, EDIT_LESSON_BY_ID, DELETE_LESSON_BY_ID, 
} from '../actions/action_types'

const initialState = {
  allLessons: FETCHING,
  lookupTableAllLessons: {},
  scheduledLessons: [],
  unscheduledLessons: [],
  lessonById: FETCHING,
}

export default function(state = initialState, action){
  switch(action.type){
    case FETCH_LESSONS:
      console.log('at fetch alllessons case reducer', action.payload.body)
      return {
        allLessons: action.payload.body,
        lookupTableAllLessons: UtilityMethods.createObjectFromArrayByProp(action.payload.body, 'Id'),
        scheduledLessons: LessonMethods.getArrayOfScheduledLessons(action.payload.body, 'date'),
        unscheduledLessons: LessonMethods.getArrayOfUnscheduledLessons(action.payload.body, 'date'),
        lessonById: null
      }
    case CREATE_LESSON:
      console.log('at create lessons case reducer', action.payload)
      let newState = [...state.allLessons, action.payload.body]
      return {
        allLessons: newState,
        lookupTableAllLessons: UtilityMethods.createObjectFromArrayByProp(newState, 'Id'),
        scheduledLessons: LessonMethods.getArrayOfScheduledLessons(newState, 'date'),
        unscheduledLessons: LessonMethods.getArrayOfUnscheduledLessons(newState, 'date'),
        lessonById: null
      }
    case GET_LESSON_BY_ID:
      console.log('at get lesson case reducer', action.payload) 
      return {
        allLessons: [...state.allLessons],
        lookupTableAllLessons: {...state.lookupTableAllLessons},
        scheduledLessons: [...state.scheduledLessons],
        unscheduledLessons: [...state.unscheduledLessons],
        lessonById: action.payload.body
      }
    case EDIT_LESSON_BY_ID:
      console.log('at edit lesson case reducer', action.payload) 
      let editState = [ ...state.allLessons ].filter(lesson => lesson.Id !== action.payload.body.Id);
      editState.push(action.payload.body);
      return {
        allLessons: editState,
        lookupTableAllLessons: UtilityMethods.createObjectFromArrayByProp(editState, 'Id'),
        scheduledLessons: LessonMethods.getArrayOfScheduledLessons(editState, 'date'),
        unscheduledLessons: LessonMethods.getArrayOfUnscheduledLessons(editState, 'date'),
        lessonById: null
      }
      // return state
    case DELETE_LESSON_BY_ID:
      console.log('at delete lessons case reducer', action.payload)
      // let deleteState = [ ...state.allLessons ].filter(lesson => lesson.Id !== action.payload.body.Id);
      // return{
      //   allLessons: deleteState,
      //   lookupTableAllLessons: UtilityMethods.createObjectFromArrayByProp(deleteState, 'Id'),
      //   scheduledLessons: LessonMethods.getArrayOfScheduledLessons(deleteState, 'date'),
      //   unscheduledLessons: LessonMethods.getArrayOfUnscheduledLessons(deleteState, 'date'),
      //   lessonById: null
      // }
      return state
    default: 
      return state
  }
}
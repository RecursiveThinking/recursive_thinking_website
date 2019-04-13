import { LogService as ls, catObj as co, subObj as so, tableObj as to, methodObj as mo } from '../services/logService'

import UtilityMethods from '../functions/utilityMethods'
import LessonMethods from '../functions/lessonMethods'

import {
  LESSONS_GET_ALL_REQUEST, LESSONS_GET_ALL_SUCCESS, LESSONS_GET_ALL_ERRORS,
  LESSON_CREATE_BY_ID_REQUEST, LESSON_CREATE_BY_ID_SUCCESS, LESSON_CREATE_BY_ID_ERRORS,
  LESSON_GET_BY_ID_REQUEST, LESSON_GET_BY_ID_SUCCESS, LESSON_GET_BY_ID_ERRORS,
  LESSON_EDIT_BY_ID_REQUEST, LESSON_EDIT_BY_ID_SUCCESS, LESSON_EDIT_BY_ID_ERRORS,
  LESSON_DELETE_BY_ID_REQUEST, LESSON_DELETE_BY_ID_SUCCESS, LESSON_DELETE_BY_ID_ERRORS, 
} from '../actions/action_types'

const initialState = {
  allLessons: [],
  lookupTableAllLessons: {},
  scheduledLessons: [],
  unscheduledLessons: [],
  lessonById: null,
}

export default function(state = initialState, action){
  switch(action.type){
    case LESSONS_GET_ALL_REQUEST:
      ls(co.red, so.req, to.lesson, mo.ga)
      return {
        ...state,
        isFetchingLessonsGetAll: true
      }
    case LESSONS_GET_ALL_SUCCESS:
      ls(co.red, so.res, to.lesson, mo.ga, action.payload.body)
      return {
        ...state,
        isFetchingLessonsGetAll: false,
        allLessons: action.payload.body,
        lookupTableAllLessons: UtilityMethods.createObjectFromArrayByProp(action.payload.body, 'Id'),
        scheduledLessons: LessonMethods.getArrayOfScheduledLessons(action.payload.body, 'date'),
        unscheduledLessons: LessonMethods.getArrayOfUnscheduledLessons(action.payload.body, 'date'),
      }
    case LESSONS_GET_ALL_ERRORS:
      ls(co.red, so.err, to.lesson, mo.ga, action.payload.body)
      return {
        ...state,
        isFetchingLessonsGetAll: false,
        errorMessageLessonsGetAll: action.payload.body
      }
    
    case LESSON_CREATE_BY_ID_REQUEST:
      ls(co.red, so.req, to.lesson, mo.cbid)
      return {
        ...state,
        isCreatingLessonById: true
      }
    case LESSON_CREATE_BY_ID_SUCCESS:
      ls(co.red, so.res, to.lesson, mo.gbid, action.payload.body)
      let newState = [...state.allLessons, action.payload.body]
      return {
        ...state,
        isCreatingLessonById: false,
        allLessons: newState,
        lookupTableAllLessons: UtilityMethods.createObjectFromArrayByProp(newState, 'Id'),
        scheduledLessons: LessonMethods.getArrayOfScheduledLessons(newState, 'date'),
        unscheduledLessons: LessonMethods.getArrayOfUnscheduledLessons(newState, 'date'),
      }
    case LESSON_CREATE_BY_ID_ERRORS:
      ls(co.red, so.err, to.lesson, mo.gbid, action.payload.body)
      return {
        ...state,
        isCreatingLessonById: false,
        errorMessageCreatingLessonById: action.payload.body
      }
    case LESSON_GET_BY_ID_REQUEST:
      ls(co.red, so.req, to.lesson, mo.gbid)
      return {
        ...state,
        isGettingLessonById: true
      }
    case LESSON_GET_BY_ID_SUCCESS:
      ls(co.red, so.res, to.lesson, mo.gbid, action.payload.body) 
      return {
        ...state,
        isGettingLessonById: false,
        lessonById: action.payload.body
      }
    case LESSON_GET_BY_ID_ERRORS:
      ls(co.red, so.err, to.lesson, mo.gbid, action.payload.body)
      return {
        ...state,
        isGettingLessonById: false,
        errorMessageGettingLessonById: action.payload.body
      }
    case LESSON_EDIT_BY_ID_REQUEST:
      ls(co.red, so.req, to.lesson, mo.ebid) 
      return {
        ...state,
        isEdittingLessonById: true
      }
    case LESSON_EDIT_BY_ID_SUCCESS:
      ls(co.red, so.res, to.lesson, mo.ebid, action.payload.body)
      let editState = [ ...state.allLessons ].filter(lesson => lesson.Id !== action.payload.body.Id);
      editState.push(action.payload.body);
      return {
        ...state,
        isEdittingLessonById: false,
        allLessons: editState,
        lookupTableAllLessons: UtilityMethods.createObjectFromArrayByProp(editState, 'Id'),
        scheduledLessons: LessonMethods.getArrayOfScheduledLessons(editState, 'date'),
        unscheduledLessons: LessonMethods.getArrayOfUnscheduledLessons(editState, 'date')
      }
    case LESSON_EDIT_BY_ID_ERRORS:
      ls(co.red, so.err, to.lesson, mo.ebid, action.payload.body)
      return {
        ...state,
        isEdittingLessonById: false,
        errorMessageEditingLessonById: action.payload.body
      }
    case LESSON_DELETE_BY_ID_REQUEST:
      ls(co.red, so.req, to.lesson, mo.dbid)
      return {
        ...state,
        isDeletingLessonById: true
      }
    case LESSON_DELETE_BY_ID_SUCCESS:
      ls(co.red, so.res, to.lesson, mo.dbid, action.payload.body)
      let deleteState = [ ...state.allLessons ].filter(lesson => lesson.Id !== action.payload.body.Id);
      return{
        ...state,
        isDeletingLessonById: false,
        allLessons: deleteState,
        lookupTableAllLessons: UtilityMethods.createObjectFromArrayByProp(deleteState, 'Id'),
        scheduledLessons: LessonMethods.getArrayOfScheduledLessons(deleteState, 'date'),
        unscheduledLessons: LessonMethods.getArrayOfUnscheduledLessons(deleteState, 'date'),

      }
    case LESSON_DELETE_BY_ID_ERRORS:
      ls(co.red, so.err, to.lesson, mo.dbid, action.payload.body)
      return{
        ...state,
        isDeletingLessonById: false,
        errorMessageDeletingLessonById: action.payload.body
      }
    default: 
      return state
  }
}

  // GET_ALL_LESSONS, 
  // CREATE_LESSON, 
  // GET_LESSON_BY_ID,
  // EDIT_LESSON_BY_ID,
  // DELETE_LESSON_BY_ID,
    // case GET_ALL_LESSONS:
    //   console.log('at fetch getAllLessons case reducer', action.payload.body)
    //   return {
    //     allLessons: action.payload.body,
    //     lookupTableAllLessons: UtilityMethods.createObjectFromArrayByProp(action.payload.body, 'Id'),
    //     scheduledLessons: LessonMethods.getArrayOfScheduledLessons(action.payload.body, 'date'),
    //     unscheduledLessons: LessonMethods.getArrayOfUnscheduledLessons(action.payload.body, 'date'),
    //     lessonById: null
    //   }
    // case CREATE_LESSON:
    //   console.log('at create lessons case reducer', action.payload)
    //   let newState = [...state.allLessons, action.payload.body]
    //   return {
    //     allLessons: newState,
    //     lookupTableAllLessons: UtilityMethods.createObjectFromArrayByProp(newState, 'Id'),
    //     scheduledLessons: LessonMethods.getArrayOfScheduledLessons(newState, 'date'),
    //     unscheduledLessons: LessonMethods.getArrayOfUnscheduledLessons(newState, 'date'),
    //     lessonById: null
    //   }
    // case GET_LESSON_BY_ID:
    //   console.log('at get lesson case reducer', action.payload) 
    //   return {
    //     allLessons: [...state.allLessons],
    //     lookupTableAllLessons: {...state.lookupTableAllLessons},
    //     scheduledLessons: [...state.scheduledLessons],
    //     unscheduledLessons: [...state.unscheduledLessons],
    //     lessonById: action.payload.body
    //   }
    // case EDIT_LESSON_BY_ID:
    //   console.log('at edit lesson case reducer', action.payload) 
    //   let editState = [ ...state.allLessons ].filter(lesson => lesson.Id !== action.payload.body.Id);
    //   editState.push(action.payload.body);
    //   return {
    //     allLessons: editState,
    //     lookupTableAllLessons: UtilityMethods.createObjectFromArrayByProp(editState, 'Id'),
    //     scheduledLessons: LessonMethods.getArrayOfScheduledLessons(editState, 'date'),
    //     unscheduledLessons: LessonMethods.getArrayOfUnscheduledLessons(editState, 'date'),
    //     lessonById: null
    //   }
      // return state
    // case DELETE_LESSON_BY_ID:
    //   console.log('at delete lessons case reducer', action.payload)
    //   let deleteState = [ ...state.allLessons ].filter(lesson => lesson.Id !== action.payload.body.Id);
    //   return{
    //     allLessons: deleteState,
    //     lookupTableAllLessons: UtilityMethods.createObjectFromArrayByProp(deleteState, 'Id'),
    //     scheduledLessons: LessonMethods.getArrayOfScheduledLessons(deleteState, 'date'),
    //     unscheduledLessons: LessonMethods.getArrayOfUnscheduledLessons(deleteState, 'date'),
    //     lessonById: null
    //   }
      // return state
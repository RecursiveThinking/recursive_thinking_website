import { LogService as ls, catObj as co, subObj as so, tableObj as to, methodObj as mo } from '../services/logService'

import { 
  USERS_GET_ALL_REQUEST, USERS_GET_ALL_SUCCESS, USERS_GET_ALL_ERRORS,
  USER_CREATE_BY_ID_REQUEST, USER_CREATE_BY_ID_SUCCESS, USER_CREATE_BY_ID_ERRORS,
  USER_GET_BY_ID_REQUEST, USER_GET_BY_ID_SUCCESS, USER_GET_BY_ID_ERRORS,
  USER_EDIT_BY_ID_REQUEST, USER_EDIT_BY_ID_SUCCESS, USER_EDIT_BY_ID_ERRORS,
  // USER_DELETE_BY_ID_REQUEST, USER_DELETE_BY_ID_SUCCESS, USER_DELETE_BY_ID_ERRORS
} from '../actions/action_types'

import UtilityMethods from '../functions/utilityMethods';

let initialState = {
  allUsers: [],
  lookupTableAllUsers: {},
  userById: {}
}

export default function (state = initialState, action) {
  
  switch(action.type){
    case USERS_GET_ALL_REQUEST:
      ls(co.red, so.req, to.user, mo.ga)
      return {
        ...state,
        isFetchingUsersGetAll: true
      }
    case USERS_GET_ALL_SUCCESS:
      ls(co.red, so.res, to.user, mo.ga, action.payload.body)
      return {
        ...state,
        isFetchingUsersGetAll: false,
        allUsers: action.payload.body,
        lookupTableAllUsers: UtilityMethods.createObjectFromArrayByProp(action.payload.body, 'userId')
      }
    case USERS_GET_ALL_ERRORS:
      ls(co.red, so.err, to.user, mo.ga, action.payload.body)
      return {
        ...state,
        isFetchingUsersGetAll: false,
        errorMessageUsersGetAll: action.payload.body
      }
    case USER_CREATE_BY_ID_REQUEST:
      ls(co.red, so.req, to.user, mo.cbid)
      return {
        ...state,
        isCreatingUserById: true
      }
    case USER_CREATE_BY_ID_SUCCESS:
      ls(co.red, so.res, to.user, mo.cbid, action.payload.body)
      let createState = [ ...state.allUsers, action.payload.body]
      return {
        ...state,
        isCreatingUserById: false,
        allUsers: createState,
        lookupTableAllUsers: UtilityMethods.createObjectFromArrayByProp(createState, 'Id')
      }
    case USER_CREATE_BY_ID_ERRORS:
      ls(co.red, so.err, to.user, mo.cbid, action.payload.body)
      return {
        ...state,
        isCreatingUserById: false,
        errorMessageUserCreateById: action.payload.body
      }
    case USER_GET_BY_ID_REQUEST:
    ls(co.red, so.req, to.user, mo.gbid)
      return {
        ...state,
        isGettingUserById: true
      }
    case USER_GET_BY_ID_SUCCESS:
      ls(co.red, so.res, to.user, mo.gbid, action.payload.body)
      return {
        ...state,
        isGettingUserById: false,
        userById: action.payload.body
      }
    case USER_GET_BY_ID_ERRORS:
      ls(co.red, so.err, to.user, mo.gbid, action.payload.body)
      return {
        ...state,
        isGettingUserById: false,
        errorMessageGettingUserById: action.payload.body
      }
    case USER_EDIT_BY_ID_REQUEST:
      ls(co.red, so.req, to.user, mo.ebid)
      return {
        ...state,
        isEdittingUserById: true
      }
    case USER_EDIT_BY_ID_SUCCESS:
      ls(co.red, so.res, to.user, mo.ebid, action.payload.body)
      let editState = [ ...state.allUsers ].filter(user => user.userId !== action.payload.body.userId);
      editState.push(action.payload.body);
      return {
        ...state,
        isEdittingUserById: false,
        allUsers: editState,
        lookupTableAllUsers: UtilityMethods.createObjectFromArrayByProp(editState, 'Id'),
      }
    case USER_EDIT_BY_ID_ERRORS:
      ls(co.red, so.err, to.user, mo.ebid, action.payload.body)
      return {
        ...state,
        isEdittingUserById: false,
        errorMessageEdittingUserById: action.payload.body
      }
    default:
      return state
  }
}

// case GET_USER_BY_ID:
// console.log('at fetch getUserById case reducer', action.payload.body)
// return {
//   ...state,
//   userById: action.payload.body
// }
// case EDIT_USER_BY_ID:
//   console.log('@ userEditByID - ', action.payload.body)
//   let editState = [ ...state.allUsers ].filter(user => user.userId !== action.payload.body.userId);
//   editState.push(action.payload.body);
//   return {
//     ...state,
//     allUsers: editState,
//     lookupTableAllUsers: UtilityMethods.createObjectFromArrayByProp(editState, 'Id'),
//     userById: action.payload.body
//   }
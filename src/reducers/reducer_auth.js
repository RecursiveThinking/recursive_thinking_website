import { LogService as ls, catObj as co, subObj as so, tableObj as to, methodObj as mo } from '../services/logService'

import { CURRENT_USER_GET_BY_ID_REQUEST, CURRENT_USER_GET_BY_ID_SUCCESS, CURRENT_USER_GET_BY_ID_ERRORS,  } from '../actions/action_types'

// const USERARR_INDEX = 0;
// const USERARR_INDEX = 16;

const INITIAL_STATE = {
  isSignedIn: false,
  // currentUser: Users[USERARR_INDEX]
  // currentUser: {}
  currentUser: null,
  isGettingCurrentUserById: true
  // currentUserId: Users[Random.getRandomIndex(Users.length)]
}

export default function(state = INITIAL_STATE, action){
  // console.log('at authReducer: ', action.type, action.payload)
  switch(action.type){
    case CURRENT_USER_GET_BY_ID_REQUEST:
      ls(co.red, so.req, to.currentUser, mo.bid)
      return {
        isSignedIn: false,
        isGettingCurrentUserById: true
      }
    case CURRENT_USER_GET_BY_ID_SUCCESS:
      ls(co.red, so.res, to.currentUser, mo.bid, action.payload.body)
      return {
        isSignedIn: true,
        isGettingCurrentUserById: false,
        currentUser: action.payload.body
      }
    case CURRENT_USER_GET_BY_ID_ERRORS:
      ls(co.red, so.err, to.currentUser, mo.bid, action.payload.body)
      return {
        isSignedIn: false,
        isGettingCurrentUserById: false,
        errorMessageCurrentUserById: action.payload.body
      }
    default:
      return state;
  }
}
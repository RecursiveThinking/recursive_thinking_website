import { FETCH_USERS, FETCHING, GET_USER_BY_ID } from '../actions/action_types'

import UtilityMethods from '../functions/utilityMethods';

let initialState = {
  allUsers: FETCHING,
  lookupTableAllUsers: {},
  userById: FETCHING
}

export default function (state = initialState, action) {
  
  switch(action.type){
    case FETCH_USERS:
      console.log('at fetch allUsers case reducer', action.payload.body)
      return {
        allUsers: action.payload.body,     
        lookupTableAllUsers: UtilityMethods.createObjectFromArrayByProp(action.payload.body, 'userId'),
        userById: null
      }
    case GET_USER_BY_ID:
      console.log('at fetch allUsers case reducer', action.payload.body)
      return {
        ...state,
        userById: action.payload.body
      }
    default:
      return state
  }
}
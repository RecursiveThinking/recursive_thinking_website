import { FETCH_USERS, FETCHING } from '../actions/action_types'

import UtilityMethods from '../functions/utilityMethods';

let initialState = {
  allUsers: FETCHING,
  allUsersAPIResponse: {},
  lookupTableAllUsers: FETCHING
}

export default function (state = initialState, action) {
  
  switch(action.type){
    case FETCH_USERS:
      // if(action.payload.body && action.payload.statusCode === 200){
      if(action.payload){
        return {
          allUsers: action.payload.body,
          allUsersAPIResponse: action.payload.status,     
          lookupTableAllUsers: UtilityMethods.createObjectFromArrayByProp(action.payload.body, 'userId')
        }
      } else {
        console.log('is API Error Object', action.payload.body)
        return {
          allUsers: null,
          allUsersAPIResponse: action.payload.body,
          lookupTableAllUsers: null
        }
      }
    default:
      return state
  }
}
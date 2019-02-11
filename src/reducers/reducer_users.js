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
          allUsers: action.payload,
          allUsersAPIResponse: 200,     
          lookupTableAllUsers: UtilityMethods.createObjectFromArrayByProp(action.payload, 'userId')
        }
      } else {
        console.log('is API Error Object', action.payload)
        return {
          allUsers: null,
          allUsersAPIResponse: action.payload,
          lookupTableAllUsers: null
        }
      }
    default:
      return state
  }
}
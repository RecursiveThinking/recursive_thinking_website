// const Users = require('!json-loader!../../data_returns/RecursiveThinkingDeveloperProfiles.json')
// console.log('Users in Reducer', Users)

import { FETCH_USERS, FETCHING } from '../actions'

import UtilityMethods from '../functions/utilityMethods';

// let initialState = {
//   allUsers: [],
//   allUsersAPIResponse: {},
//   lookupTableAllUsers: {}
// }

let initialState = {
  allUsers: FETCHING,
  allUsersAPIResponse: {},
  lookupTableAllUsers: FETCHING
}

export default function (state = initialState, action) {
  
  switch(action.type){
    case FETCH_USERS:
      if(action.payload.body && action.payload.status.statusCode === 200){
        return {
          allUsers: action.payload.body,
          allUsersAPIResponse: action.payload.status,      
          lookupTableAllUsers: UtilityMethods.createObjectFromArrayByProp(action.payload.body, 'userId')
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
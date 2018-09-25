// const Users = require('!json-loader!../../data_returns/RecursiveThinkingDeveloperProfiles.json')
// console.log('Users in Reducer', Users)

import { FETCH_USERS } from '../actions'
import UtilityMethods from '../functions/utilityMethods';

let initialState = {
  allUsers: [],
  lookupTableAllUsers: {}
}

export default function (state = initialState, action) {
  
  switch(action.type){
    case FETCH_USERS:
      return {
        allUsers: action.payload,        
        lookupTableAllUsers: UtilityMethods.createObjectFromArrayByProp(action.payload, 'userId')
      }
    default:
      return state
  }
}
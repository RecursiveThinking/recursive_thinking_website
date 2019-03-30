import { FETCH_USERS, FETCHING, GET_USER_BY_ID, EDIT_USER_BY_ID } from '../actions/action_types'

import UtilityMethods from '../functions/utilityMethods';

let initialState = {
  allUsers: FETCHING,
  lookupTableAllUsers: {},
  userById: null
}

export default function (state = initialState, action) {
  
  switch(action.type){
    case FETCH_USERS:
      console.log('at fetch allUsers case reducer', action.payload.body)
      return {
        // ...state,
        allUsers: action.payload.body,     
        lookupTableAllUsers: UtilityMethods.createObjectFromArrayByProp(action.payload.body, 'userId'),
        userById: { ...state.userById }
      }
    case GET_USER_BY_ID:
      console.log('at fetch getUserById case reducer', action.payload.body)
      return {
        ...state,
        userById: action.payload.body
      }
    case EDIT_USER_BY_ID:
      console.log('at fetch editUserById case reducer', action.payload.body)
      let editState = [ ...state.allUsers ].filter(user => user.userId !== action.payload.body.userId);
      editState.push(action.payload.body);
      return {
        ...state,
        allUsers: editState,
        lookupTableAllUsers: UtilityMethods.createObjectFromArrayByProp(editState, 'Id'),
        userById: action.payload.body
      }
    default:
      return state
  }
}
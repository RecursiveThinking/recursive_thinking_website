// import Random from '../functions/random';
// import { SIGN_IN, SIGN_UP, SIGN_OUT } from '../actions/action_types';
import Users from '../_data_returns/RecursiveThinkingDeveloperProfiles.json'
import { 
  GET_CURRENT_USER_BY_ID
} from '../actions/action_types'

const USERARR_INDEX = 0;
// const USERARR_INDEX = 16;

const INITIAL_STATE = {
  isSignedIn: false,
  // currentUser: Users[USERARR_INDEX]
  currentUser: {}
  // currentUserId: Users[Random.getRandomIndex(Users.length)]
}

export default function(state = INITIAL_STATE, action){
  // console.log('at authReducer: ', action.type, action.payload)
  switch(action.type){
    case GET_CURRENT_USER_BY_ID:
      return {
        isSignedIn: true,
        currentUser: action.payload.body
      }
    default:
      return state;
  }
}
// import Random from '../functions/random';
// import { SIGN_IN, SIGN_UP, SIGN_OUT } from '../actions/action_types';
import Users from '../_data_returns/RecursiveThinkingDeveloperProfiles.json'
import { FETCH_CURRENT_USER } from '../actions/action_types'

// const USERARR_INDEX = 3;
const USERARR_INDEX = 16;

const INITIAL_STATE = {
  isSignedIn: true,
  currentUser: Users[USERARR_INDEX]
  // currentUserId: Users[Random.getRandomIndex(Users.length)]
}

export default function(state = INITIAL_STATE, action){
  // console.log('at authReducer: ', action.type, action.payload)
  switch(action.type){
    // case FETCH_CURRENT_USER:
    //   return {
    //     isSignedIn: true,
    //     currentUser: action.payload
    //   }
    default:
      return state;
  }
}
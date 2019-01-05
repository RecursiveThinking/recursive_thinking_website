// import Random from '../functions/random';
import { SIGN_IN, SIGN_UP, SIGN_OUT } from '../actions/action_types';
import Users from '../_data_returns/RecursiveThinkingDeveloperProfiles.json'

const USERARR_INDEX = 2;

const INITIAL_STATE = {
  isSignedIn: true,
  currentUser: Users[USERARR_INDEX]
  // currentUserId: Users[Random.getRandomIndex(Users.length)]
}

export default function(state = INITIAL_STATE, action){
  switch(action.type){
    case SIGN_UP:
      return {};
    case SIGN_IN:
      return {};
    case SIGN_OUT:
      return {};
    default:
      return state;
  }
}
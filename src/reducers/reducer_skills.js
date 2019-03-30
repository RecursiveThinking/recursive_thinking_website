import { 
  FETCHING,
  FETCH_SKILLS 
} from '../actions/action_types';
import UtilityMethods from '../functions/utilityMethods';

let initialState = {
  allSkills: FETCHING,
  lookupTableAllSkills: {},
  skillById: {}
}

export default function( state = initialState, action ){
  switch(action.type){
    case FETCH_SKILLS:
      console.log('at fetch allSkills case reducer', action.payload.body)
      return {
        allSkills: action.payload.body,
        lookupTableAllSkills: UtilityMethods.createObjectFromArrayByProp(action.payload.body, 'id'),
        skillById: null
      }
    default:
      return state
  }
  
}
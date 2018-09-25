// State arguement is not application state, but just the state this reducer is responsible for.
// state null for default
import { SELECTED_LESSON } from '../actions'

// export default function(state = null, action){
export default function(state = null, action){
  switch(action.type){
    case SELECTED_LESSON:
      return action.payload;
  }
  return state
}
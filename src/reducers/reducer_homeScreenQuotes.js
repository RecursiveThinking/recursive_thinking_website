import { FETCH_HOMESCREEN_QUOTES, FETCHING } from '../actions/action_types'

const initialState = {
  allHomeScreenQuotes: FETCHING,
}

export default function(state = initialState, action){
  switch(action.type){
    case FETCH_HOMESCREEN_QUOTES: 
      console.log('at fetch allHomeScreenQuotes case reducer', action.payload.body)
      return {
        ...state,
        allHomeScreenQuotes: action.payload.body,
        // allHomeScreenQuotesAPIResponse: 200
      }
    default: 
      return state
  }
}
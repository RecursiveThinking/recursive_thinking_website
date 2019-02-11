import { FETCH_HOMESCREEN_QUOTES, FETCHING } from '../actions/action_types'

const initialState = {
  allHomeScreenQuotes: FETCHING,
  allHomeScreenQuotesAPIResponse: FETCHING
}

export default function(state = initialState, action){
  switch(action.type){
    case FETCH_HOMESCREEN_QUOTES: 
      // if(action.payload.body && action.payload.status.statusCode === 200){
      if(action.payload){
        // if a well formed payload
        return {
          allHomeScreenQuotes: action.payload,
          allHomeScreenQuotesAPIResponse: 200
        }
      } else {
        return {
          allHomeScreenQuotes: null,
          allHomeScreenQuotesAPIResponse: action.payload
        }
      }
    default: 
      return state
  }
}
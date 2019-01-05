import { FETCH_HOMESCREEN_QUOTES, FETCHING } from '../actions/index'

const initialState = {
  allHomeScreenQuotes: [],
  allHomeScreenQuotesAPIResponse: FETCHING
}

export default function(state = initialState, action){
  switch(action.type){
    case FETCH_HOMESCREEN_QUOTES: 
      // console.log('action @ Homescreen', action.payload)
      if(action.payload.body && action.payload.status.statusCode === 200){
        // if a well formed payload
        return {
          allHomeScreenQuotes: action.payload.body,
          allHomeScreenQuotesAPIResponse: action.payload.status.statusCode
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
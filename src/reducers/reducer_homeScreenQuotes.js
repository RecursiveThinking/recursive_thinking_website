import { LogService as ls, catObj as co, subObj as so, tableObj as to, methodObj as mo } from '../services/logService'

import { HOMESCREEN_QUOTES_GET_ALL_REQUEST, HOMESCREEN_QUOTES_GET_ALL_SUCCESS, HOMESCREEN_QUOTES_GET_ALL_ERRORS } from '../actions/action_types'

import UtilityMethods from '../functions/utilityMethods';

const initialState = {
  allHomeScreenQuotes: [],
}

export default function(state = initialState, action){
  switch(action.type){
    case HOMESCREEN_QUOTES_GET_ALL_REQUEST:
      ls(co.red, so.req, to.homeScreenQuotes, mo.ga)
      return {
        ...state,
        isFetchingHomeScreenQuotesGetAll: true
      }
    case HOMESCREEN_QUOTES_GET_ALL_SUCCESS:
      ls(co.red, so.res, to.homeScreenQuotes, mo.ga, action.payload.body)
      return {
        ...state,
        isFetchingHomeScreenQuotesGetAll: false,
        allHomeScreenQuotes: action.payload.body,
        lookupTableAllHomeScreenQuotes: UtilityMethods.createObjectFromArrayByProp(action.payload.body, 'Id')
      }
    case HOMESCREEN_QUOTES_GET_ALL_ERRORS:
      ls(co.red, so.err, to.homeScreenQuotes, mo.ga, action.payload.body)
      return {
        ...state,
        isFetchingHomeScreenQuotesGetAll: false,
        errorMessageHomeScreenQuotesGetAll: action.payload.body
      }
    default: 
      return state
  }
}

// case GET_ALL_HOMESCREEN_QUOTES: 
//   console.log('at fetch allHomeScreenQuotes case reducer', action.payload.body)
//   return {
//     ...state,
//     allHomeScreenQuotes: action.payload.body,
//     // allHomeScreenQuotesAPIResponse: 200
//   }
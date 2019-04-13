import { LogService as ls, catObj as co, subObj as so, tableObj as to, methodObj as mo } from '../services/logService'

import { RANKS_GET_ALL_REQUEST, RANKS_GET_ALL_SUCCESS, RANKS_GET_ALL_ERRORS } from '../actions/action_types'

import UtilityMethods from '../functions/utilityMethods';

const initialState = {
  allRanks: [],
  lookupTableAllRanks: {},
  // isFetchingRanksGetAll: true
}

export default function(state = initialState, action){
  switch(action.type){
    case RANKS_GET_ALL_REQUEST:
      ls(co.red, so.req, to.ranks, mo.ga)
      return {
        ...state,
        isFetchingRanksGetAll: true
      }
    case RANKS_GET_ALL_SUCCESS:
      ls(co.red, so.res, to.ranks, mo.ga, action.payload.body)
      return {
        ...state,
        isFetchingRanksGetAll: false,
        allRanks: action.payload.body,
        lookupTableAllRanks: UtilityMethods.createObjectFromArrayByProp(action.payload.body, 'Id')
      }
    case RANKS_GET_ALL_ERRORS:
      ls(co.red, so.err, to.ranks, mo.ga, action.payload.body)
      return {
        ...state,
        isFetchingRanksGetAll: false,
        errorMessageRanksGetAll: action.payload.body
      }
    default: 
      return state
  }
}

// case GET_ALL_HOMESCREEN_QUOTES: 
//   console.log('at fetch allHomeScreenQuotes case reducer', action.payload.body)
//   return {
//     ...state,
//     allRanks: action.payload.body,
//     // allHomeScreenQuotesAPIResponse: 200
//   }
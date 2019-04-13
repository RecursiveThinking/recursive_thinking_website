import { LogService as ls, catObj as co, subObj as so, tableObj as to, methodObj as mo } from '../services/logService'

import { 
  SKILLS_GET_ALL_REQUEST, SKILLS_GET_ALL_SUCCESS, SKILLS_GET_ALL_ERRORS,
  SKILL_CREATE_BY_ID_REQUEST, SKILL_CREATE_BY_ID_SUCCESS, SKILL_CREATE_BY_ID_ERRORS,
  SKILL_GET_BY_ID_REQUEST, SKILL_GET_BY_ID_SUCCESS, SKILL_GET_BY_ID_ERRORS,
  // SKILL_EDIT_BY_ID_REQUEST, SKILL_EDIT_BY_ID_SUCCESS, SKILL_EDIT_BY_ID_ERRORS,
  // SKILL_DELETE_BY_ID_REQUEST, SKILL_DELETE_BY_ID_SUCCESS, SKILL_DELETE_BY_ID_ERRORS,
} from '../actions/action_types';
import UtilityMethods from '../functions/utilityMethods';

let initialState = {
  allSkills: [],
  lookupTableAllSkills: {},
  // skillById: null
}

export default function( state = initialState, action ){
  switch(action.type){
    case SKILLS_GET_ALL_REQUEST:
      ls(co.red, so.req, to.skill, mo.ga)
      return {
        ...state,
        isFetchingSkillsGetAll: true
      }
    case SKILLS_GET_ALL_SUCCESS:
      ls(co.red, so.res, to.skill, mo.ga, action.payload.body)
      return {
        ...state,
        isFetchingSkillsGetAll: false,
        allSkills: action.payload.body,
        lookupTableAllSkills: UtilityMethods.createObjectFromArrayByProp(action.payload.body, 'id'),
      }
    case SKILLS_GET_ALL_ERRORS:
      ls(co.red, so.err, to.skill, mo.ga, action.payload.body)
      return {
        ...state,
        isFetchingSkillsGetAll: false,
        errorMessageSkillsGetAll: action.payload.body
      }
    // SKILL_CREATE_BY_ID_REQUEST, SKILL_CREATE_BY_ID_SUCCESS, SKILL_CREATE_BY_ID_ERRORS,
    case SKILL_CREATE_BY_ID_REQUEST:
      ls(co.red, so.req, to.skill, mo.cbid)
      return {
        ...state,
        isCreatingSkillById: true,
      }
    case SKILL_CREATE_BY_ID_SUCCESS:
      ls(co.red, so.res, to.skill, mo.cbid, action.payload.body);
      let createState = [ ...state.allSkills, action.payload.body];
      return {
        ...state,
        isCreatingSkillById: false,
        allSkills: createState,
        lookupTableAllSkills: UtilityMethods.createObjectFromArrayByProp(createState, 'id')
      }
    case SKILL_CREATE_BY_ID_ERRORS:
      ls(co.red, so.err, to.skill, mo.cbid, action.payload.body);
      return {
        ...state,
        isCreatingSkillById: false,
        errorMessageCreatingSkillById: action.payload.body
      }
    // SKILL_GET_BY_ID_REQUEST, SKILL_GET_BY_ID_SUCCESS, SKILL_GET_BY_ID_ERRORS,
    case SKILL_GET_BY_ID_REQUEST:
      ls(co.red, so.req, to.skill, mo.gbid)
      return {
        ...state,
        isGettingSkillById: true,
      }
    case SKILL_GET_BY_ID_SUCCESS:
      ls(co.red, so.res, to.skill, mo.gbid, action.payload.body);
      return {
        ...state,
        isGettingSkillById: false,
        allSkills: [ ...state.allSkills ],
        lookupTableAllSkills: { ...state.lookupTableAllSkills },
        skillById: action.payload.body
      }
    case SKILL_GET_BY_ID_ERRORS:
      ls(co.red, so.err, to.skill, mo.gbid, action.payload.body);
      return {
        ...state,
        isGettingInterviewQuestionAnswerById: false,
        errorMessageGettingInterviewQuestionAnswerById: action.payload.body
      }
    // SKILL_EDIT_BY_ID_REQUEST, SKILL_EDIT_BY_ID_SUCCESS, SKILL_EDIT_BY_ID_ERRORS,
    
    // SKILL_DELETE_BY_ID_REQUEST, SKILL_DELETE_BY_ID_SUCCESS, SKILL_DELETE_BY_ID_ERRORS,
    
    default:
      return state;
  }
  
}

// FETCHING,
// GET_ALL_SKILLS,

// case GET_ALL_SKILLS:
//   console.log('at fetch allSkills case reducer', action.payload.body)
//   return {
//     allSkills: action.payload.body,
//     lookupTableAllSkills: UtilityMethods.createObjectFromArrayByProp(action.payload.body, 'id'),
//     skillById: null
//   }
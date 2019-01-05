import { FETCH_SKILLS } from '../actions/action_types';
import SKILL_MODEL from '../standards/skillModel'
import UtilityMethods from '../functions/utilityMethods';

let initialState = {
  allSkills: [],
  lookupTableAllSkills: {},
  allSkillsAPIResponse: {},
  allSkillsLanguage: {},
  allSkillsProfessional: {},
  allSkillsSoftware: {}
}

const { language, professional, software } = SKILL_MODEL
export default function( state = initialState, action ){
  switch(action.type){
    case FETCH_SKILLS:
      if(action.payload.body){
        return {
          allSkills: action.payload.body,
          lookupTableAllSkills: UtilityMethods.createObjectFromArrayByProp(action.payload.body, 'Id'),
          allSkillsAPIResponse: action.payload.status,
          allSkillsLanguage: action.payload.body.filter(item => item.type === SKILL_MODEL[language]),
          allSkillsProfessional: action.payload.body.filter(item => item.type === SKILL_MODEL[professional]),
          allSkillsSoftware: action.payload.body.filter(item => item.type === SKILL_MODEL[software])
        }
      } else {
        return {
          allSkills: null,
          lookupTableAllSkills: null,
          allSkillsAPIResponse: action.payload,
          allSkillsLanguage: null,
          allSkillsProfessional: null,
          allSkillsSoftware: null
        }
      }
    default:
      return state
  }
  
}
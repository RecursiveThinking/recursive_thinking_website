import { 
  ERRORS_GET_CURRENT_USER_BY_ID,
  ERRORS_FETCH_USERS, ERRORS_CREATE_USER,
  ERRORS_GET_USER_BY_ID, ERRORS_EDIT_USER_BY_ID, ERRORS_DELETE_USER_BY_ID,
  ERRORS_FETCH_LESSONS, ERRORS_CREATE_LESSON, 
  ERRORS_GET_LESSON_BY_ID, ERRORS_EDIT_LESSON_BY_ID, ERRORS_DELETE_LESSON_BY_ID,
  ERRORS_FETCH_INTERVIEW_QUESTIONS, ERRORS_CREATE_INTERVIEW_QUESTION,
  ERRORS_GET_INTERVIEW_QUESTION_BY_ID, ERRORS_EDIT_INTERVIEW_QUESTION_BY_ID, ERRORS_DELETE_INTERVIEW_QUESTION_BY_ID, ERRORS_FETCH_INTERVIEW_QUESTIONS_ANSWERS, ERRORS_CREATE_INTERVIEW_QUESTION_ANSWER,
  ERRORS_GET_INTERVIEW_QUESTION_ANSWER_BY_ID, ERRORS_EDIT_INTERVIEW_QUESTION_ANSWER_BY_ID, ERRORS_DELETE_INTERVIEW_QUESTION_ANSWER_BY_ID,
  ERRORS_FETCH_SKILLS, ERRORS_CREATE_SKILL,
  ERRORS_GET_SKILL_BY_ID, ERRORS_EDIT_SKILL_BY_ID, ERRORS_DELETE_SKILL_BY_ID,
  ERRORS_FETCH_HOMESCREEN_QUOTES
} from '../actions/action_types';

const errorDefState = null;

const initialState = {
  errorsCurrentUser: errorDefState,
  
  errorsGetAllUsers: errorDefState,
  errorsCreateUser: errorDefState,
  errorsGetUserById: errorDefState,
  errorsEditUserById: errorDefState,
  errorsDeleteUserById: errorDefState,
    
  errorsGetAllLessons: errorDefState,
  errorsCreateLesson: errorDefState,
  errorsGetLessonById: errorDefState,
  errorsEditLessonById: errorDefState,
  errorsDeleteLessonById: errorDefState,
    
  errorsGetAllIntQuests: errorDefState,
  errorsCreateIntQuest: errorDefState,
  errorsGetIntQuestById: errorDefState,
  errorsEditIntQuestById: errorDefState,
  errorsDeleteIntQuestById: errorDefState,
    
  errorsGetAllIntQuestAns: errorDefState,
  errorsCreateIntQuestAns: errorDefState,
  errorsGetIntQuestAnsById: errorDefState,
  errorsEditIntQuestAnsById: errorDefState,
  errorsDeleteIntQuestAnsById: errorDefState,
  
  errorsGetAllSkills: errorDefState,
  errorsCreateSkill: errorDefState,
  errorsGetSkillById: errorDefState,
  errorsEditSkillById: errorDefState,
  errorsDeleteSkillById: errorDefState,
  
  errorsGetAllHomescreenQuotes: errorDefState
}

export default function(state = initialState, action){
  // console.log('@ errors reducer: ', 'state: ', state, 'action: ', action)
  switch(action.type){
    // ERRORS_CURRENT_USER
    case ERRORS_GET_CURRENT_USER_BY_ID:
      console.log('at get currentUser Error case reducer', action.payload.body)
      return {
        ...state,
        errorsCurrentUser: action.payload.body
      }
    // ERRORS_USERS
    case ERRORS_FETCH_USERS:
      console.log('at getAllUsers Error case reducer', action.payload.body)
      return {
        ...state,
        errorsGetAllUsers: action.payload.body
      }
    case ERRORS_CREATE_USER:
      console.log('at createUser Error case reducer', action.payload.body)
      return {
        ...state,
        errorsCreateUser: action.payload.body
      }
    case ERRORS_GET_USER_BY_ID:
      console.log('at getByIdUser Error case reducer', action.payload.body)
      return {
        ...state,
        errorsGetUserById: action.payload.body
      }
    case ERRORS_EDIT_USER_BY_ID:
      console.log('at editUserById Error case reducer', action.payload.body)
      return { 
        ...state,
        errorsEditUserById: action.payload.body
      }
    case ERRORS_DELETE_USER_BY_ID:
      console.log('at deleteUserById Error case reducer', action.payload.body)
      return {
        ...state,
        errorsDeleteUserById: action.payload.body
      }
    // ERRORS_LESSONS
    case ERRORS_FETCH_LESSONS:
      console.log('at getAllLessons  Error case reducer', action.payload.body)
      return {
        ...state,
        errorsGetAllLessons: action.payload.body
      }
    case ERRORS_CREATE_LESSON:
      console.log('at createLesson Error case reducer', action.payload.body)
      return {
        ...state,
        errorsCreateLesson: action.payload.body
      }
    case ERRORS_GET_LESSON_BY_ID:
      console.log('at getLessonById Error case reducer', action.payload.body)
      return {
        ...state,
        errorsGetLessonById: action.payload.body
      }
    case ERRORS_EDIT_LESSON_BY_ID:
      console.log('at editLessonById Error case reducer', action.payload.body)
      return { 
        ...state,
        errorsEditLessonById: action.payload.body
      }
    case ERRORS_DELETE_LESSON_BY_ID:
      console.log('at deleteLessonById Error case reducer', action.payload.body)
      return {
        ...state,
        errorsDeleteLessonById: action.payload.body
      }
    // InterviewQuestions
    case ERRORS_FETCH_INTERVIEW_QUESTIONS:
      console.log('at getAllIntQuest Error case reducer', action.payload.body)
      return {
        ...state,
        errorsGetAllIntQuests: action.payload.body
      }
    case ERRORS_CREATE_INTERVIEW_QUESTION:
      console.log('at create Error case reducer', action.payload.body)
      return {
        ...state,
        errorsCreateIntQuest: action.payload.body
      }
    case ERRORS_GET_INTERVIEW_QUESTION_BY_ID:
      console.log('at getById Error case reducer', action.payload.body)
      return {
        ...state,
        errorsGetIntQuestById: action.payload.body
      }
    case ERRORS_EDIT_INTERVIEW_QUESTION_BY_ID:
      console.log('at editIntQuestById Error case reducer', action.payload.body)
      return { 
        ...state,
        errorsEditIntQuestById: action.payload.body
      }
    case ERRORS_DELETE_INTERVIEW_QUESTION_BY_ID:
      console.log('at deleteIntQuestById Error case reducer', action.payload.body)
      return {
        ...state,
        errorsDeleteIntQuestById: action.payload.body
      }
    case ERRORS_FETCH_INTERVIEW_QUESTIONS_ANSWERS:
      console.log('at getAllIntQuestAns Error case reducer', action.payload.body)
      return {
        ...state,
        errorsGetAllIntQuestAns: action.payload.body
      }
    case ERRORS_CREATE_INTERVIEW_QUESTION_ANSWER:
      console.log('at createIntQuestAns Error case reducer', action.payload.body)
      return {
        ...state,
        errorsCreateIntQuestAns: action.payload.body
      }
    case ERRORS_GET_INTERVIEW_QUESTION_ANSWER_BY_ID:
      console.log('at getIntQuestAnsById Error case reducer', action.payload.body)
      return {
        ...state,
        errorsGetIntQuestAnsById: action.payload.body
      }
    case ERRORS_EDIT_INTERVIEW_QUESTION_ANSWER_BY_ID:
      console.log('at editIntQuestAnsById Error case reducer', action.payload.body)
      return { 
        ...state,
        errorsEditIntQuestAnsById: action.payload.body
      }
    case ERRORS_DELETE_INTERVIEW_QUESTION_ANSWER_BY_ID:
      console.log('at deleteIntQuestAnsById Error case reducer', action.payload.body)
      return {
        ...state,
        errorsDeleteIntQuestAnsById: action.payload.body
      }
    case ERRORS_FETCH_SKILLS:
      console.log('at getAllSkills Error case reducer', action.payload.body)
      return {
        ...state,
        errorsGetAllSkills: action.payload.body
      }
    case ERRORS_CREATE_SKILL:
      console.log('at createSkill Error case reducer', action.payload.body)
      return {
        ...state,
        errorsCreateSkill: action.payload.body
      }
    case ERRORS_GET_SKILL_BY_ID:
      console.log('at getSkillById Error case reducer', action.payload.body)
      return {
        ...state,
        errorsGetSkillById: action.payload.body
      }
    case ERRORS_EDIT_SKILL_BY_ID:
      console.log('at editSkillById Error case reducer', action.payload.body)
      return { 
        ...state,
        errorsEditSkillById: action.payload.body
      }
    case ERRORS_DELETE_SKILL_BY_ID:
      console.log('at deleteSkillById Error case reducer', action.payload.body)
      return {
        ...state,
        errorsDeleteSkillById: action.payload.body
      }
    case ERRORS_FETCH_HOMESCREEN_QUOTES:
      console.log('at getAllHomescreenQuotes Error case reducer')
      return {
        ...state,
        errorsGetAllHomescreenQuotes: action.payload.body
      }
    default:
      return state;
  }
}
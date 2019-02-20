import { 
  ERRORS_FETCH_USERS, ERRORS_CREATE_USER,
  ERRORS_GET_USER_BY_ID, ERRORS_EDIT_USER_BY_ID, ERRORS_DELETE_USER_BY_ID,
  ERRORS_FETCH_LESSONS, ERRORS_CREATE_LESSON, 
  ERRORS_GET_LESSON_BY_ID, ERRORS_EDIT_LESSON_BY_ID, ERRORS_DELETE_LESSON_BY_ID,
  ERRORS_FETCH_INTERVIEW_QUESTIONS, ERRORS_CREATE_INTERVIEW_QUESTION,
  ERRORS_GET_INTERVIEW_QUESTION_BY_ID, ERRORS_EDIT_INTERVIEW_QUESTION_BY_ID, ERRORS_DELETE_INTERVIEW_QUESTION_BY_ID,
  // ERRORS_FETCH_INTERVIEW_QUESTIONS_ANSWERS, ERRORS_CREATE_INTERVIEW_QUESTION_ANSWER,
  // ERRORS_GET_INTERVIEW_QUESTION_ANSWER_BY_ID, ERRORS_EDIT_INTERVIEW_QUESTION_ANSWER_BY_ID, ERRORS_DELETE_INTERVIEW_QUESTION_ANSWER_BY_ID,
  // ERRORS_FETCH_SKILLS, ERRORS_CREATE_SKILL,
  // ERRORS_GET_SKILL_BY_ID, ERRORS_EDIT_SKILL_BY_ID, ERRORS_DELETE_SKILL_BY_ID
} from '../actions/action_types';

const errorDefState = null;

const initialState = {
  errorsUsers:{
    getAllUsers: errorDefState,
    createUser: errorDefState,
    getUserById: errorDefState,
    editUserById: errorDefState,
    deleteUserById: errorDefState
  },
  errorsLessons: {
    getAllLessons: errorDefState,
    createLesson: errorDefState,
    getLessonById: errorDefState,
    editLessonById: errorDefState,
    deleteLessonById: errorDefState
  },
  errorsIntQuest: {
    getAllIntQuests: errorDefState,
    createIntQuest: errorDefState,
    getIntQuestById: errorDefState,
    editIntQuestById: errorDefState,
    deleteIntQuestById: errorDefState
  },
  errorsIntQuestAns: {
    getAllIntQuestAns: errorDefState,
    createIntQuestAns: errorDefState,
    getIntQuestAnsById: errorDefState,
    editIntQuestAnsById: errorDefState,
    deleteIntQuestAnsById: errorDefState
  }
}

export default function(state = initialState, action){
  switch(action.type){
    // ERRORS_USERS
    case ERRORS_FETCH_USERS:
      let efuState = { ...state }
      efuState.errorsUsers.getAllUsers = action.payload.body
      return efuState
    case ERRORS_CREATE_USER:
      let ecuState = { ...state }
      ecuState.errorsUsers.createUser = action.payload.body
      return ecuState
    case ERRORS_GET_USER_BY_ID:
      let eguState = { ...state }
      eguState.errorsUsers.getUserById = action.payload.body
      return eguState
    case ERRORS_EDIT_USER_BY_ID:
      let eeuState = { ...state }
      eeuState.errorsUsers.editUserById = action.payload.body
      return eeuState
    case ERRORS_DELETE_USER_BY_ID:
      let eduState = { ...state }
      eduState.errorsUsers.deleteUserById = action.payload.body
      return eduState
    // ERRORS_LESSONS
    case ERRORS_FETCH_LESSONS:
      let eflState = { ...state }
      eflState.errorsLessons.getAllLessons = action.payload.body
      // console.log('eflState: ', eflState, action.payload.body)
      return eflState;
    case ERRORS_CREATE_LESSON:
      let eclState = { ...state }
      eclState.errorsLessons.createLesson = action.payload.body
      return eclState;
    case ERRORS_GET_LESSON_BY_ID:
      let eglState = { ...state }
      eglState.errorsLessons.getLessonById = action.payload.body
      return eglState;
    case ERRORS_EDIT_LESSON_BY_ID:
      let eelState = { ...state }
      eelState.errorsLessons.editLessonById = action.payload.body
      return eelState;
    case ERRORS_DELETE_LESSON_BY_ID:
      let edlState = { ...state }
      edlState.errorsLessons.deleteLessonById = action.payload.body
      return edlState;
    // InterviewQuestions
    case ERRORS_FETCH_INTERVIEW_QUESTIONS:
      let efiqState = { ...state }
      efiqState.errorsLessons.getAllIntQuests = action.payload.body
      // console.log('eflState: ', eflState, action.payload.body)
      return efiqState;
    case ERRORS_CREATE_INTERVIEW_QUESTION:
      let eciqState = { ...state }
      eciqState.errorsLessons.createIntQuest = action.payload.body
      return eciqState;
    case ERRORS_GET_INTERVIEW_QUESTION_BY_ID:
      let egiqState = { ...state }
      egiqState.errorsLessons.getIntQuestById = action.payload.body
      return egiqState;
    case ERRORS_EDIT_INTERVIEW_QUESTION_BY_ID:
      let eeiqState = { ...state }
      eeiqState.errorsLessons.editIntQuestById = action.payload.body
      return eeiqState;
    case ERRORS_DELETE_INTERVIEW_QUESTION_BY_ID:
      let ediqState = { ...state }
      ediqState.errorsLessons.deleteIntQuestById = action.payload.body
      return ediqState;
    default:
      return state;
  }
}
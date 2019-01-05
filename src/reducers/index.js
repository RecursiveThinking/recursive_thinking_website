import {
  combineReducers
} from 'redux';

import { reducer as formReducer } from 'redux-form'

import UsersReducer from './reducer_users';
import AuthReducer from './reducer_authReducer';
import LessonsReducer from './reducer_lessons';
import SelectedLessonReducer from './reducer_selectedLesson';
import InterviewQuestionsReducer from './reducer_interviewQuestions';
import InterviewQuestionsAnswersReducer from './reducer_interviewQuestionsAnswers';
import SkillsReducer from './reducer_skills';
import HomeScreenQuotesReducer from './reducer_homeScreenQuotes';

const rootReducer = combineReducers({
  // mapping of state.
  users: UsersReducer,
  auth: AuthReducer,
  lessons: LessonsReducer,
  interviewQuestions: InterviewQuestionsReducer,
  interviewQuestionsAnswers: InterviewQuestionsAnswersReducer,
  homescreenquotes: HomeScreenQuotesReducer,
  selectedLesson: SelectedLessonReducer,
  skills: SkillsReducer,
  form: formReducer
});

// console.log(rootReducer)

export default rootReducer;
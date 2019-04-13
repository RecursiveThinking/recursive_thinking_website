import {
  combineReducers
} from 'redux';

import { reducer as formReducer } from 'redux-form'

import UsersReducer from './reducer_users';
import AuthReducer from './reducer_auth';
// import ErrorsReducer from './reducer_errors';
import LessonsReducer from './reducer_lessons';
import SelectedLessonReducer from './reducer_selectedLesson';
import InterviewQuestionsReducer from './reducer_interviewQuestions';
import InterviewQuestionAnswersReducer from './reducer_interviewQuestionAnswers';
import SkillsReducer from './reducer_skills';
import HomeScreenQuotesReducer from './reducer_homeScreenQuotes';
import RanksReducer from './reducer_ranks';

const rootReducer = combineReducers({
  // mapping of state.
  users: UsersReducer,
  auth: AuthReducer,
  lessons: LessonsReducer,
  interviewQuestions: InterviewQuestionsReducer,
  interviewQuestionAnswers: InterviewQuestionAnswersReducer,
  homescreenquotes: HomeScreenQuotesReducer,
  selectedLesson: SelectedLessonReducer,
  skills: SkillsReducer,
  ranks: RanksReducer,
  form: formReducer
});

// console.log(rootReducer)

export default rootReducer;
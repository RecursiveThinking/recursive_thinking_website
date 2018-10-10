import {
  combineReducers
} from 'redux';

import { reducer as formReducer } from 'redux-form'

import UsersReducer from './reducer_users'
import CurrentUserReducer from './reducer_currentUser'
import LessonsReducer from './reducer_lessons'
import SelectedLessonReducer from './reducer_selectedLesson';
import InterviewQuestionsReducer from './reducer_interviewQuestions'
import InterviewQuestionsAnswersReducer from './reducer_interviewQuestionsAnswers'

const rootReducer = combineReducers({
  // mapping of state.
  users: UsersReducer,
  currentUser: CurrentUserReducer,
  lessons: LessonsReducer,
  interviewQuestions: InterviewQuestionsReducer,
  interviewQuestionsAnswers: InterviewQuestionsAnswersReducer,
  selectedLesson: SelectedLessonReducer,
  form: formReducer
});

// console.log(rootReducer)

export default rootReducer;
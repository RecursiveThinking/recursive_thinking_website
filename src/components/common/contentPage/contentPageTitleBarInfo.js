import { ROUTES_REACT } from '../../../standards/routes'

const {
  unscheduledlessons,
  lessons_create,
  lessons_edit,
  interviewquestions,
  interviewquestions_create,
  interviewquestions_edit,
  interviewquestionsanswers_create,
  interviewquestionsanswers_edit,
  profile_create,
  profile_edit,
  recursivedirectory
} = ROUTES_REACT

export const TITLE_BAR_USER_PROFILE_CREATE = {
  heading: 'Create Your User Profile',
  subheading: 'Please fill in all Fields Below and Submit Your Profile',
  buttontext: '',
  link: interviewquestions
}

export const TITLE_BAR_USER_PROFILE_EDIT = {
  heading: 'Edit Your User Profile',
  subheading: 'Please Edit the Required Fields and Resubmit Your Profile',
  buttontext: '',
  link: interviewquestions
}

export const TITLE_BAR_USER_PROFILE_VIEW = {
  heading: 'View Users Profiles',
  subheading: 'Otherwise Click the Button to Return to the Previous Page',
  buttontext: 'Return to Directory',
  link: recursivedirectory
}

export const TITLE_BAR_LESSONS = {
  heading: 'Submit a Lesson Request',
  subheading: 'Want to learn something specific? Have something to teach?',
  buttontext: 'Submit Lesson',
  link: lessons_create
}

export const TITLE_BAR_LESSONS_CREATE = {
  heading: 'Create A Lesson',
  subheading: 'Or Click on the Button to Return to All Lessons',
  buttontext: 'Go Back to Unscheduled Lessons',
  link: unscheduledlessons
}

export const TITLE_BAR_LESSONS_EDIT = {
  heading: 'Edit This Lesson Request',
  subheading: 'Or Click on the Button to Return to All Lessons',
  buttontext: 'Go Back to Unscheduled Lessons',
  link: unscheduledlessons
}

// export const TITLE_BAR_LESSONS_DELETE = {
//   heading: 'Delete This Lesson Request',
//   subheading: 'Or Click on the Button to Return to All Lessons',
//   buttontext: 'Go Back to Unscheduled Lessons',
//   link: unscheduledlessons
// }

export const TITLE_BAR_INTERVIEWQUESTIONS = {
  heading: 'Submit an Interview Question',
  subheading: 'Have you come across an interview question you would like to share?',
  buttontext: 'Submit Interview Question',
  link: interviewquestions_create
}

export const TITLE_BAR_INTERVIEWQUESTIONS_CREATE = {
  heading: 'Submit Your Interview Question Below',
  subheading: 'Or Click on the Button to Return to All Interview Questions',
  buttontext: 'Go Back to Interview Questions',
  link: interviewquestions
}

export const TITLE_BAR_INTERVIEWQUESTIONS_EDIT = {
  heading: 'Edit Your Interview Question Below',
  subheading: 'Or Click on the Button to Return to All Interview Questions',
  buttontext: 'Go Back to Interview Questions',
  link: interviewquestions
}

export const TITLE_BAR_INTERVIEWQUESTIONS_DELETE = {
  heading: 'Edit Your Interview Question Below',
  subheading: 'Or Click on the Button to Return to All Interview Questions',
  buttontext: 'Go Back to Interview Questions',
  link: interviewquestions
}

export const TITLE_BAR_INTERVIEWQUESTIONS_ANSWERS_CREATE = {
  heading: 'Submit Your Interview Question Answer Below',
  subheading: 'Or Click on the Button to Return to All Interview Questions',
  buttontext: 'Go Back to Interview Questions',
  link: interviewquestions
}

export const TITLE_BAR_INTERVIEWQUESTIONS_ANSWERS_EDIT = {
  heading: 'Edit Your Interview Question Answer Below',
  subheading: 'Or Click on the Button to Return to All Interview Questions',
  buttontext: 'Go Back to Interview Questions',
  link: interviewquestions
}
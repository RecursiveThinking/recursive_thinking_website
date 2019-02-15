export const ROUTES_API = {
  users: '/users',
  lessons:'/lessons',
  interviewquestions: '/interviewquestions',
  interviewquestionsanswers: '/interviewquestionsanswers',
  skills: '/skills',
  homeScreenQuotes: '/homescreenquotes'
}

export const CEDV = {
  create: '/create',
  view: '/view',
  edit: '/edit',
  delete: '/delete'
}

export const ROUTES_REACT = {
  root: '/',
  dashboard: '/dashboard',
  scheduledlessons: `${ROUTES_API.lessons}/scheduledlessons`,
  unscheduledlessons: `${ROUTES_API.lessons}/unscheduledlessons`,
  lessons_create: `${ROUTES_API.lessons}${CEDV.create}`,
  lessons_edit: `${ROUTES_API.lessons}${CEDV.edit}`,
  lessons_edit_id: `${ROUTES_API.lessons}${CEDV.edit}/:id`,
  lessons_delete: `${ROUTES_API.lessons}${CEDV.delete}`,
  lessons_delete_id: `${ROUTES_API.lessons}${CEDV.delete}/:id`,
  
  recursivedirectory: `${ROUTES_API.users}/recursivedirectory`,
  interviewquestions: `${ROUTES_API.interviewquestions}/all`,
  interviewquestions_id: `${ROUTES_API.interviewquestions}/:questId`,
  interviewquestions_create: `${ROUTES_API.interviewquestions}${CEDV.create}`,
  interviewquestions_edit: `${ROUTES_API.interviewquestions}${CEDV.edit}`,
  interviewquestions_edit_id: `${ROUTES_API.interviewquestions}${CEDV.edit}/:id`,
  interviewquestions_delete: `${ROUTES_API.interviewquestions}${CEDV.delete}`,
  interviewquestions_delete_id: `${ROUTES_API.interviewquestions}${CEDV.delete}/:id`,
  
  interviewquestionsanswers: `${ROUTES_API.interviewquestionsanswers}`,
  // interviewquestionsanswers_create: `${ROUTES_API.interviewquestionsanswers}${CEDV.create}`,
  interviewquestionsanswers_create: `${ROUTES_API.interviewquestions}`,
  // interviewquestionsanswers_create_id: `${ROUTES_API.interviewquestionsanswers}${CEDV.create}/:id`,
  interviewquestionsanswers_create_id: `${ROUTES_API.interviewquestions}/:id/answers${CEDV.create}`,
  interviewquestionsanswers_edit: `${ROUTES_API.interviewquestions}/:questId/answers${CEDV.edit}`,
  interviewquestionsanswers_edit_id: `${ROUTES_API.interviewquestions}/:questId/answers${CEDV.edit}/:ansId`,
  interviewquestionsanswers_delete: `${ROUTES_API.interviewquestions}/:questId/answers${CEDV.delete}`,
  interviewquestionsanswers_delete_id: `${ROUTES_API.interviewquestions}/:questId/answers${CEDV.delete}/:ansId`,
  
  profile_view: `${ROUTES_API.users}${CEDV.view}`,
  profile_view_id: `${ROUTES_API.users}${CEDV.view}/:id`,
  profile_edit: `${ROUTES_API.users}${CEDV.edit}`,
  profile_edit_id: `${ROUTES_API.users}${CEDV.edit}/:id`,
  profile_create: `${ROUTES_API.users}${CEDV.create}`,
  profile_create_id: `${ROUTES_API.users}${CEDV.create}/:id`,
  admindashboard: '/admindashboard',
  signout: '/signout'
}


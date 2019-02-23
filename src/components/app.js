import React, { Component } from 'react'
// import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
// import { BrowserRouter as Route, Switch, Redirect } from 'react-router-dom'
import { Router, Route, Redirect } from 'react-router-dom'

import HomeScreen from '../containers/public/HomeScreen/HomeScreen';
import CreateUser from '../containers/user/create/createUser';
import MainApp from '../containers/mainApp/mainApp';

import createBrowserHistory from 'history/createBrowserHistory';

import { ROUTES_REACT } from '../standards/routes';

import SetupUser from '../containers/user/setup/setupUser';

const {
  root,
  dashboard,
  scheduledlessons,
  unscheduledlessons,
  lessons_create,
  lessons_edit_id,
  lessons_delete_id,
  interviewquestions,
  interviewquestions_create,
  interviewquestions_edit,
  interviewquestionsanswers_create,
  interviewquestionsanswers_edit,
  recursivedirectory,
  users_edit,
  // users_edit_id,
  users_create,
  users_setup,  
  users_setup_id,
  // users_view,
  users_view_id,
  admindashboard,
  signout
} = ROUTES_REACT

export const history = createBrowserHistory();

class App extends Component {
  render(){
    return(
      <Router history={history}>
        <div className="mainApp">
          <Route path={root} exact component={HomeScreen} />
          <Route path={dashboard} exact component={MainApp}/>
          <Route path={scheduledlessons} component={MainApp}/>
          <Route path={unscheduledlessons} exact component={MainApp}/>
          <Route path={lessons_create} component={MainApp}/>
          <Route path={lessons_edit_id} component={MainApp}/>
          <Route path={lessons_delete_id} component={MainApp}/>
          <Route path={interviewquestions_create} exact component={MainApp}/>
          <Route path={interviewquestions_edit} exact component={MainApp}/>
          <Route path={interviewquestions} component={MainApp}/>
          <Route path={interviewquestionsanswers_create} exact component={MainApp} />
          <Route path={interviewquestionsanswers_edit} exact component={MainApp} />
          <Route path={recursivedirectory} component={MainApp}/>
          <Route path={users_edit} component={MainApp}/>
          <Route path={users_view_id} component={MainApp}/>
          <Route path={users_create} component={CreateUser}/>
          <Route path={users_setup} component={SetupUser}/>
          <Route path={users_setup_id} component={SetupUser}/>
          <Route path={admindashboard} component={MainApp}/>
          <Route path={signout} render={ () => ( <Redirect to="/" /> ) } />
        </div>
      </Router>
    )
  }
}

export default App
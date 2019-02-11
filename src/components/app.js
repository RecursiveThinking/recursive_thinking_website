import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'

import HomeScreen from '../containers/public/HomeScreen/HomeScreen';
import ProfileCreate from '../containers/profile/create/profileCreate';
import MainApp from '../containers/mainApp/mainApp';

import { ROUTES_REACT } from '../standards/routes';
const {
  root,
  dashboard,
  scheduledlessons,
  unscheduledlessons,
  lessons_create,
  lessons_edit_id,
  interviewquestions,
  interviewquestions_create,
  interviewquestions_edit,
  interviewquestionsanswers_create,
  interviewquestionsanswers_edit,
  recursivedirectory,
  profile_edit,
  // profile_edit_id,
  profile_create,
  // profile_setup_id,
  // profile_view,
  profile_view_id,
  admindashboard,
  signout
} = ROUTES_REACT



class App extends Component {
  render(){
    return(
      <Router>
        <Switch>
        <div className="mainApp">
          <Route path={root} exact component={HomeScreen} />
          <Route path={dashboard} component={MainApp}/>
          <Route path={scheduledlessons} component={MainApp}/>
          <Route path={unscheduledlessons} component={MainApp}/>
          <Route path={lessons_create} component={MainApp}/>
          <Route path={lessons_edit_id} component={MainApp}/>
          <Route path={interviewquestions_create} exact component={MainApp}/>
          <Route path={interviewquestions_edit} exact component={MainApp}/>
          <Route path={interviewquestions} component={MainApp}/>
          <Route path={interviewquestionsanswers_create} component={MainApp} />
          <Route path={interviewquestionsanswers_edit} component={MainApp} />
          <Route path={recursivedirectory} component={MainApp}/>
          <Route path={profile_edit} component={MainApp}/>
          <Route path={profile_view_id} component={MainApp}/>
          <Route path={profile_create} component={ProfileCreate}/>
          <Route path={admindashboard} component={MainApp}/>
          <Route path={signout} render={ () => ( <Redirect to="/" /> ) } />
        </div>
        </Switch>
      </Router>
    )
  }
}

export default App
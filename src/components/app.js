import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'

import HomeScreen from '../containers/public/HomeScreen/HomeScreen';
import ProfileSetup from './profile/setup/profileSetup';
import MainApp from '../containers/mainApp/mainApp';

import { ROUTES_REACT } from '../standards/routes';
const {
  root,
  dashboard,
  scheduledlessons,
  unscheduledlessons,
  interviewquestions,
  recursivedirectory,
  profile_edit,
  // profile_edit_id,
  profile_setup,
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
        <div className="mainApp">
          <Route exact path={root} component={HomeScreen} />
          <Route path={dashboard} component={MainApp}/>
          <Route path={scheduledlessons} component={MainApp}/>
          <Route path={unscheduledlessons} component={MainApp}/>
          <Route path={interviewquestions} component={MainApp}/>
          <Route path={recursivedirectory} component={MainApp}/>
          <Route path={profile_edit} component={MainApp}/>
          <Route path={profile_view_id} component={MainApp}/>
          <Route path={profile_setup} component={ProfileSetup}/>
          <Route path={admindashboard} component={MainApp}/>
          <Route path={signout} render={ () => ( <Redirect to="/" /> ) } />
        </div>
      </Router>
    )
  }
}

export default App
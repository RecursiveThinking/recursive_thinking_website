import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Link, Redirect, Switch } from 'react-router-dom'

// Component imports (that change)
import PublicHomeScreen from '../containers/publicHomeScreen/publicHomeScreen'
import ProfileSetup from './profile/setup/profileSetup'
import MainApp from '../containers/mainApp/mainApp'

import ROUTES from '../standards/routes'
// import Random from '../functions/random'
// loads our fake info from DB
// const Users = require('!json-loader!../../data_returns/RecursiveThinkingDeveloperProfiles.json')
// const Lessons = require('!json-loader!../../data_returns/RecursiveThinkingLessons.json')

// export default class App extends Component {
const {
  root,
  dashboard,
  scheduledlessons,
  unscheduledlessons,
  interviewquestions,
  recursivedirectory,
  profile_edit,
  profile_edit_id,
  profile_setup,
  profile_setup_id,
  profile_view,
  profile_view_id,
  admindashboard,
  signout
} = ROUTES
export default class App extends Component {
  render() {
    // get a Random User from User Object
    // const currentUser = Users[Random.getRandomIndex(Users.length)]
    return (
      <Router>
        <div className="mainApp">
          <Route exact path={root} component={PublicHomeScreen} />
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
          {/* <Route path="/signout" component={ () => ( <Redirect push to="/" />) }/> */}
        </div>
      </Router>
        
    )
  }
}

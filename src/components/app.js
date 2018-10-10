import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Link, Redirect, Switch } from 'react-router-dom'

// Component imports (that change)
import PublicHomeScreen from './homeScreen/homeScreen'
import ProfileSetup from './profile/setup/profileSetup'
import MainApp from './mainApp/mainApp'


// import Random from '../functions/random'
// loads our fake info from DB
// const Users = require('!json-loader!../../data_returns/RecursiveThinkingDeveloperProfiles.json')
// const Lessons = require('!json-loader!../../data_returns/RecursiveThinkingLessons.json')

// export default class App extends Component {
export default class App extends Component {
  render() {
    // get a Random User from User Object
    // const currentUser = Users[Random.getRandomIndex(Users.length)]
    // Optimize Data Model here
    // console.log(currentUser);
    return (
      <Router>
        <div className="mainApp">
          <Route exact path="/" component={PublicHomeScreen} />
          <Route path="/setupProfile" component={ProfileSetup}/>
          <Route path="/dashboard" component={MainApp}/>
          <Route path="/schedLessons" component={MainApp}/>
          <Route path="/unschedLessons" component={MainApp}/>
          <Route path="/interviewQuestions" component={MainApp}/>
          <Route path="/recursiveDirectory" component={MainApp}/>
          <Route path="/editProfile" component={MainApp}/>
          <Route path="/adminDash" component={MainApp}/>          
          <Route path="/signout" component={ () => ( <Redirect to="/" />) }/>
        </div>
      </Router>
        
    )
  }
}

import React, { Component } from 'react';

// Component imports
import HeaderApp from './headerApp/headerApp';
import Nav from '../containers/nav/nav';
import Content from './content/content';
import Footer from './footer/footer';

// Component imports (that change)
// import HomeScreen from './homeScreen/homeScreen'
import Dash from '../containers/dash/dash'
import RecursiveDirectory from '../containers/recursiveDirectory/recursiveDirectory'
import ScheduledLessons from '../containers/scheduledLessons/scheduledLessons'
import UnscheduledLessons from '../containers/unscheduledLessons/unscheduledLessons'
import InterviewQuestions from '../containers/interviewQuestions/interviewQuestions'
// import Modal from './common/modal/modal'
// import ProfileSetup from './profile/setup/profileSetup'
import AdminPanel from '../containers/adminPanel/adminPanel'


import Random from '../functions/random'
// loads our fake info from DB
const Users = require('!json-loader!../../data_returns/RecursiveThinkingDeveloperProfiles.json')
const Lessons = require('!json-loader!../../data_returns/RecursiveThinkingLessons.json')

// export default class App extends Component {
export default class App extends Component {
  render() {
    // get a Random User from User Object
    // const currentUser = Users[Random.getRandomIndex(Users.length)]
    // Optimize Data Model here
    // console.log(currentUser);
    return (
      <div className="mainApp">
        {/* <HomeScreen /> */}
        <HeaderApp />
        {/* <ProfileSetup /> */}
        <div className="mainContainer">
          <div className="grid grid--185">
            <Nav/>
            <div className="grid-cell">
                {/* <Dash /> */}
                {/* <ScheduledLessons /> */}
                {/* <UnscheduledLessons /> */}
                {/* <InterviewQuestions /> */}
                {/* <RecursiveDirectory /> */}
                {/* <main className="content">
                  <Modal show={this.state.show} handleClose={this.hideModal}>
                    <p>Modal</p>
                  </Modal>
                  <button
                    type="button"
                    onClick={this.showModal}
                  >Open</button>
                </main> */}
                <AdminPanel />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }
}

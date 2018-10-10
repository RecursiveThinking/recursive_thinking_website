import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from 'react-router-dom';

import Nav from '../nav/nav';

import Dash from '../dash/dash'
import RecursiveDirectory from '../recursiveDirectory/recursiveDirectory';
import ScheduledLessons from '../scheduledLessons/scheduledLessons';
import UnscheduledLessons from '../unscheduledLessons/unscheduledLessons';
import InterviewQuestions from '../interviewQuestions/interviewQuestions';
import EditProfile from '../../components/profile/edit/profileEdit';
import AdminPanel from '../adminPanel/adminPanel';

export const ROUTES_NAV = [
  {
    path: '/dashboard',
    main: () => { return <Dash /> }
  },
  {
    path: '/schedLessons',
    main: () => { return <ScheduledLessons /> }
  },
  {
    path: '/unSchedLessons',
    main: () => { return <UnscheduledLessons /> }
  },
  {
    path: '/interviewQuestions',
    main: () => { return <InterviewQuestions /> }
  },
  {
    path: '/recursiveDirectory',
    main: () => { return <RecursiveDirectory /> }
  },
  {
    path: '/editProfile',
    main: () => { return <EditProfile /> }
  }
]

class NavAndContent extends Component {
  render(){
    if(this.props.currentUser['admin'] === true){
      ROUTES_NAV.push({
        path: '/adminDash',
        main: () => { return (<AdminPanel />)}
      })
    }
    return (
      // Previously tried to do Router here
      <div className="mainContainer">
        <div className="grid grid--185">
          <div className="grid-cell">
            <Nav />
          </div>
          <div className="grid-cell">
            {
              ROUTES_NAV.map((route, index) => (
                  <Route 
                    key={index}
                    path={route.path}
                    component={route.main}
                  />
                )
              )
            }
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state){
  return {
    currentUser: state.currentUser
  }
}

export default connect(mapStateToProps)(NavAndContent)
import React, { Component } from 'react';
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route, Link } from "react-router-dom"

import HeaderApp from '../../components/headerApp/headerApp';
import Nav from '../nav/nav';
import Dash from '../dash/dash';
import ScheduledLessons from '../scheduledLessons/scheduledLessons';
import UnscheduledLessons from '../unscheduledLessons/unscheduledLessons';
import InterviewQuestions from '../interviewQuestions/interviewQuestions';
import RecursiveDirectory from '../recursiveDirectory/recursiveDirectory';
import ViewProfile from '../profile/view/profileView';
import EditProfile from '../../components/profile/edit/profileEdit';
import AdminPanel from '../adminPanel/adminPanel';
import Footer from '../../components/footer/footer';

import ROUTES from '../../standards/routes'

const {
  dashboard,
  scheduledlessons,
  unscheduledlessons,
  interviewquestions,
  recursivedirectory,
  profile_edit,
  profile_view_id
} = ROUTES

export const ROUTES_NAV = [
  {
    path: dashboard,
    main: () => { return (<Dash />)}
  },
  {
    path: scheduledlessons,
    main: () => { return (<ScheduledLessons />)}
  },
  {
    path: unscheduledlessons,
    main: () => { return (<UnscheduledLessons />)}
  },
  {
    path: interviewquestions,
    main: () => { return (<InterviewQuestions />)}
  },
  {
    path: recursivedirectory,
    main: () => { return (<RecursiveDirectory />)}
  },
  {
    path: profile_edit,
    main: () => { return (<EditProfile />)}
  },
  {
    path: profile_view_id,
    main: (props) => { return (<ViewProfile {...props} />)}
  }
]

class MainApp extends Component {
  render(){
    // if(this.props.currentUser['admin'] === true){
    //   ROUTES_NAV.push(  {
    //     path: '/adminDash',
    //     main: () => { return (<AdminPanel />)}
    //   })
    // }
    return (
      <main className="wrapper">
          <HeaderApp />
          <Router>
            <div className="grid grid--185">
              <div className="grid-cell">
                <div className="navWrapper">
                  <Nav />
                </div>
              </div>
              <div className="grid-cell">
                <div className="contentWrapper">
                  {
                    ROUTES_NAV.map((route, index) => (
                      <Route 
                        key={index}
                        path={route.path}
                        component={route.main}
                      />
                    ))
                  }
                </div>
              </div>
            </div>
          </Router>
          <Footer />
        </main>
    )
  }
}

function mapStateToProps(state){
  return {
    currentUser: state.currentUser
  }
}

export default connect(mapStateToProps)(MainApp);
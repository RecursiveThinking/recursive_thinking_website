import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { FETCHING } from '../../actions/action_types'
import { fetchUsers, fetchLessons, getCurrentUserById } from '../../actions/index'

import DefaultErrorPage from '../../components/defaults/errorPage/errorPage';
import DefaultLoadingPage from '../../components/defaults/loadingPage/loadingPage';

import DashboardProfileStatList from '../../components/dash/dashboardProfileStatList'
import UpComingLesson from '../../components/dash/upComingLesson'
import LessonsUserAttending from '../../components/dash/lessonsUserAttending'

import LessonMethods from '../../functions/lessonMethods'
import OrderMethods from '../../functions/orderMethods'

import DM from '../../standards/dictModel'

const { 
  user: { 
    profileStatsVisits, 
    profileStatsViewsGithub, 
    profileStatsViewsCodePen,
    profileStatsViewsPortfolio,
    profileStatsViewsLinkedIn,
    profileStatsViewsResume,
    lessonStatus
  },
  // lesson: {}
} = DM;

class Dash extends Component {
  
  componentDidMount(){
    this.props.fetchLessons();
    this.props.fetchUsers();
    this.props.getCurrentUserById();
  }
  
  render(){
    const { 
      currentUser, 
      scheduledLessons, 
      allUsers, 
      // lookupTableAllUsers 
    } = this.props;
    
    // make an array of profileStats
    const profileStats = [
      currentUser[profileStatsVisits],
      currentUser[profileStatsViewsGithub],
      currentUser[profileStatsViewsCodePen],
      currentUser[profileStatsViewsPortfolio],
      currentUser[profileStatsViewsLinkedIn],
      currentUser[profileStatsViewsResume]
    ]
    
    if(!scheduledLessons || !allUsers){
      return (
        <main className="content">
          <DefaultErrorPage />
        </main>
      )
    }
    else if(scheduledLessons === FETCHING || allUsers === FETCHING){
      return (
        <main className="content">
          <DefaultLoadingPage />
        </main>
      )
    }
    else {
      // turn this on to show default messages
      // scheduledLessons.length = 0
      // UpComing Lessons
      let lessonsAttending = OrderMethods.orderArrayByDateAscending(LessonMethods.getCurrentUserLessonsAttendingArray(currentUser[lessonStatus], scheduledLessons), 'date')
      // lessonsAttending.sort((a, b) => { 
      //   console.log('a: ', a.date, 'b: ', b.date)
      //   return a.date - b.date 
      // })
      console.log('upcoming: ', lessonsAttending)
      // limit to the next three lessons
      if(lessonsAttending.length > 3){
        lessonsAttending.length = 3
      }
      return (
        <main className="content">
          <div className="grid grid--full">
            <div className="grid-cell">
              {/* in this cell goes dashboardProfileStatList */}
              {/* recives profilesStats as props */}
              <DashboardProfileStatList userStats={profileStats} />
            </div>
          </div>
          <div className="grid grid--1of2">
            <div className="grid-cell">
              {/* in this cell goes the next upcoming lesson */}
              <UpComingLesson 
                upComingLessons={scheduledLessons}
                allUsersArr={allUsers}
              />
            </div>
            <div className="grid-cell">
              {/* in this cell goes a list of the next three lessons the user is attending  */}
              <LessonsUserAttending lessonsAttendingArr={lessonsAttending} />
            </div>
          </div>
        </main>
      ) 
    }
    
  }
}

function mapStateToProps(state){
  return {
    currentUser: state.auth.currentUser,
    allUsers: state.users.allUsers,
    lookupTableAllUsers: state.users.lookupTableAllUsers,
    allLessons: state.lessons.allLessons,
    scheduledLessons: state.lessons.scheduledLessons
  }
}

function mapDispatchToProps(dispatch){
  // return bindActionCreators({fetchLessons: fetchLessons}, dispatch);
  return bindActionCreators({fetchUsers, fetchLessons, getCurrentUserById}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Dash);
// export default connect(mapStateToProps, {fetchUsers, fetchLessons, getCurrentUserById})(Dash);
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { FETCHING } from '../../actions/action_types'
import { fetchUsers, fetchLessons, getCurrentUserById } from '../../actions/index'

import DefaultErrorPage from '../../components/defaults/errorPage/errorPage';
import DefaultLoadingPage from '../../components/defaults/loadingPage/loadingPage';
import SecondaryLoadingPage from '../../components/defaults/loadingPage/secondaryLoadingPage';

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
  
  renderStatList = (profileStats, currentUser) => {
    if(currentUser === FETCHING){
      return (
        <SecondaryLoadingPage />
      )
    }
    else if(!currentUser.userId){
      return (
        <SecondaryLoadingPage />
        // <DashboardProfileStatList />
      )
    }
    return (
      <DashboardProfileStatList userStats={profileStats} />
    )
  }
  
  renderUpComingLesson = (scheduledLessons, allUsers) => {
    console.log('schedLessons: ', scheduledLessons, 'allUsers: ', allUsers)
    if(scheduledLessons === FETCHING && allUsers === FETCHING){
      return (
        <SecondaryLoadingPage />
      )
    }
    else if(scheduledLessons === FETCHING || allUsers === FETCHING){
      return (
        <SecondaryLoadingPage />
      )
    } 
    return (
      <UpComingLesson 
        upComingLessons={scheduledLessons}
        allUsersArr={allUsers}
      />
    )
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
    // else if(scheduledLessons === FETCHING || allUsers === FETCHING || currentUser === FETCHING){
    else if(scheduledLessons === FETCHING && allUsers === FETCHING && currentUser === FETCHING){
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

      // console.log('upcoming: ', lessonsAttending)
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
              {/* <DashboardProfileStatList userStats={profileStats} /> */}
              {this.renderStatList(profileStats, currentUser)}
            </div>
          </div>
          <div className="grid grid--1of2">
            <div className="grid-cell">
              {/* in this cell goes the next upcoming lesson */}
              {/* <UpComingLesson 
                upComingLessons={scheduledLessons}
                allUsersArr={allUsers}
              /> */}
              {this.renderUpComingLesson(scheduledLessons, allUsers)}
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
  return bindActionCreators({fetchUsers, fetchLessons, getCurrentUserById}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Dash);
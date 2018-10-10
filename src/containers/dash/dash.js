import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';

import { fetchLessons } from '../../actions/index'
import DashboardProfileStatList from '../../components/dash/dashboardProfileStatList'
import UpComingLesson from '../../components/dash/upComingLesson'
import LessonsUserAttending from '../../components/dash/lessonsUserAttending'

import LessonMethods from '../../functions/lessonMethods'

import DM from '../../standards/dictModel'

class Dash extends Component {
  
  componentDidMount(){
    this.props.fetchLessons();
  }
  
  render(){
    const { currentUser, scheduledLessons } = this.props
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
      lesson: {}
    } = DM
    // make an array of profileStats
    const profileStats = [
      currentUser[profileStatsVisits],
      currentUser[profileStatsViewsGithub],
      currentUser[profileStatsViewsCodePen],
      currentUser[profileStatsViewsPortfolio],
      currentUser[profileStatsViewsLinkedIn],
      currentUser[profileStatsViewsResume]
    ]
    
    // UpComing Lessons
    const lessonsAttending = LessonMethods.getCurrentUserLessonsAttendingArray(currentUser[lessonStatus], scheduledLessons)
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
            <UpComingLesson upComingLesson={scheduledLessons}/>
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

function mapStateToProps(state){
  return {
    currentUser: state.currentUser,
    allUsers: state.users,
    allLessons: state.lessons.allLessons,
    scheduledLessons: state.lessons.scheduledLessons,
  }
}

// function mapDispatchToProps(dispatch){
//   return bindActionCreators({fetchLessons: fetchLessons})(dispatch);
// }

export default connect(mapStateToProps, {fetchLessons})(Dash);
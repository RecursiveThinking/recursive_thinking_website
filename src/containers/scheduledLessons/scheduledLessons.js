import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchLessons, fetchUsers } from '../../actions/index'

import ScheduledLessonsList from '../../components/scheduledLessons/scheduledLessonsList'
import SelectedLessonDetail from '../../components/scheduledLessons/selectedLessonDetail'
import DefaultErrorPage from '../../components/defaults/errorPage/errorPage'

class ScheduledLessons extends Component {
  
  componentDidMount(){
    this.props.fetchLessons();
    this.props.fetchUsers();
  }
  
  render(){
    // what happens if we have nothing?
    // let scheduledLessons = this.props.scheduledLessons;
    if(this.props.scheduledLessons.length === 0){
      return (
        <main className="content">
          <DefaultErrorPage />
        </main>
      )
    }
    else {
      const { currentUser, selectedLesson, scheduledLessons, allUsers } = this.props;
      return (
        <main className="content">
          <div className="grid grid--1of3">
            <div className="grid-cell">
              <ScheduledLessonsList currentUser={currentUser} scheduledLessons={scheduledLessons} />
            </div>
            <div className="grid-cell">
              <SelectedLessonDetail currentUser={currentUser} selectedLesson={selectedLesson} allUsers={allUsers} scheduledLessons={scheduledLessons}/>
            </div>
          </div>
        </main>
      )
    }
  }
}

function mapStateToProps(state){
  return {
    currentUser: state.currentUser,
    allUsers: state.users,
    allLessons: state.lessons.lessons,
    scheduledLessons: state.lessons.scheduledLessons,
    selectedLesson: state.selectedLesson
  }
}

// function mapDispatchToProps(dispatch){
//   return bindActionCreators({fetchAllLessons: fetchAllLessons}, dispatch)
// }

export default connect(mapStateToProps, { fetchLessons, fetchUsers })(ScheduledLessons);
// export default connect(mapStateToProps, mapDispatchToProps)(ScheduledLessons);

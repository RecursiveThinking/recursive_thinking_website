import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchLessons, fetchUsers } from '../../actions'
import { FETCHING } from '../../actions/action_types'

// import LessonMethods from '../../functions/lessonMethods'

import ScheduledLessonsList from '../../components/scheduledLessons/scheduledLessonsList'
import SelectedLessonDetail from '../../components/scheduledLessons/selectedLessonDetail'
import DefaultErrorPage from '../../components/defaults/errorPage/errorPage'
import DefaultLoadingPage from '../../components/defaults/loadingPage/loadingPage'

class ScheduledLessons extends Component {
  
  componentDidMount(){
    this.props.fetchLessons();
    this.props.fetchUsers();
  }
  
  updateSelectedLesson(lessonToUpdate, status){
    console.log('lessonToUpdate: ', lessonToUpdate, 'status: ', status)
  }
  
  render(){
    
    const { 
      currentUser, 
      selectedLesson, 
      scheduledLessons, 
      allUsers,
      // allLessonsAPIResponse
    } = this.props;
    
    // console.log('ScheduledLessons @ SL', scheduledLessons)
    
    if(!allUsers || !scheduledLessons ){
      // console.log('ScheduledLessons @ SL IF', scheduledLessons)
      
      return (
        <main className="content">
          <DefaultErrorPage />
        </main>
      )
    }
    // else if(allUsers === FETCHING || scheduledLessons === FETCHING || allLessonsAPIResponse === FETCHING){
    else if(allUsers === FETCHING || scheduledLessons === FETCHING){
      return (
        <main className="content">
          <DefaultLoadingPage />
        </main>
      )
    }
    else {
      return (
        <main className="content">
          <div className="grid grid--1of3">
            <div className="grid-cell">
              <ScheduledLessonsList 
                currentUser={currentUser} 
                scheduledLessons={scheduledLessons} 
              />
            </div>
            <div className="grid-cell">
              <SelectedLessonDetail 
                currentUser={currentUser} 
                selectedLesson={selectedLesson} 
                allUsers={allUsers} 
                scheduledLessons={scheduledLessons}
                updateSelectedLesson={() => this.updateSelectedLesson()}
              />
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
    allLessons: state.lessons.allLessons,
    allLessonsAPIResponse: state.lessons.allLessonsAPIResponse,
    scheduledLessons: state.lessons.scheduledLessons,
    selectedLesson: state.selectedLesson
  }
}

// function mapDispatchToProps(dispatch){
//   return bindActionCreators({fetchAllLessons: fetchAllLessons}, dispatch)
// }

export default connect(mapStateToProps, { fetchLessons, fetchUsers })(ScheduledLessons);
// export default connect(mapStateToProps, mapDispatchToProps)(ScheduledLessons);

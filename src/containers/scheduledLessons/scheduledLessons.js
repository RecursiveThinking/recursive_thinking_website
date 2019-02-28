import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';

import { FETCHING } from '../../actions/action_types'
import { fetchLessons, fetchUsers, getCurrentUserById, editUserById, editLessonById } from '../../actions'

import DefaultErrorPage from '../../components/defaults/errorPage/errorPage'
import DefaultLoadingPage from '../../components/defaults/loadingPage/loadingPage'

import ScheduledLessonsList from '../../components/scheduledLessons/scheduledLessonsList'
import SelectedLessonDetail from '../../components/scheduledLessons/selectedLessonDetail'

import { ROUTES_REACT } from '../../standards/routes'

class ScheduledLessons extends Component {
  constructor(props){
    super(props)
    
    this.state = {
      // scheduledLessons: this.props.scheduledLessons
    }
  }
  
  componentDidMount(){
    this.props.fetchLessons();
    this.props.fetchUsers();
    this.props.getCurrentUserById();
  }
  
  updateSelectedLesson = (lessonObjToAdd, status) => {
    // const { currentUser } = this.props;
    console.log('lessonObjToAdd: ', lessonObjToAdd, 'status: ', status)
    console.log('currentUser: ', this.props.currentUser);
    // need to do two things here, if attending, lessonToUpdate gets the currentUsers Id, and the Users status gets the lessonID with a value of 1
    // if not attending or maybe, users status gets a lessonID and appropriate value
    if(status === 1 && !lessonObjToAdd.lessonAttendees.includes(this.props.currentUser.userId)){
      console.log('update on status 1: ')
      let lessonToUpdate = { ...lessonObjToAdd };
      lessonToUpdate.lessonAttendees.push(this.props.currentUser.userId)
      this.props.editLessonById(lessonToUpdate, ROUTES_REACT.scheduledlessons, ROUTES_REACT.scheduledlessons)
    }
    if(status === 0 || status === 2){
      console.log('update on status 0 or 2: ', status)
      let lessonToUpdate = { ...lessonObjToAdd };
      if(lessonToUpdate.lessonAttendees.includes(this.props.currentUser.userId)){
        lessonToUpdate.lessonAttendees = lessonToUpdate.lessonAttendees.filter(userId => {
          return userId !== this.props.currentUser.userId
        })
        this.props.editLessonById(lessonToUpdate, ROUTES_REACT.scheduledlessons, ROUTES_REACT.scheduledlessons)
      }
    }
    
    let updateUserLessonStatus = { ...this.props.currentUser }
    updateUserLessonStatus.lessonStatus[lessonObjToAdd.Id] = status;
    this.props.editUserById(updateUserLessonStatus, ROUTES_REACT.scheduledlessons, ROUTES_REACT.scheduledlessons)
  }
  
  render(){
    
    const { 
      currentUser, 
      selectedLesson, 
      scheduledLessons, 
      allUsers,
    } = this.props;
    
    if(!allUsers || !scheduledLessons ){
      return (
        <main className="content">
          <DefaultErrorPage />
        </main>
      )
    }
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
                updateSelectedLesson={this.updateSelectedLesson}
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
    scheduledLessons: state.lessons.scheduledLessons,
    selectedLesson: state.selectedLesson
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({ fetchLessons, fetchUsers, getCurrentUserById, editUserById, editLessonById }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ScheduledLessons);

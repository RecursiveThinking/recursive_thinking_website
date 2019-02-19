import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';

import { fetchUsers, fetchLessons, getCurrentUserById } from '../../actions'
import { FETCHING } from '../../actions/action_types'
// import { ROUTES_REACT } from '../../standards/routes'

import UnscheduledLessonsList from '../../components/unscheduledLessons/unscheduledLessonsList';
import DefaultErrorPage from '../../components/defaults/errorPage/errorPage';
import DefaultLoadingPage from '../../components/defaults/loadingPage/loadingPage'

import { TITLE_BAR_LESSONS } from '../../components/common/contentPage/contentPageTitleBarInfo'
import ContentPageTitleBar from '../../components/common/contentPage/contentPageTitleBar'

class UnscheduledLessons extends Component {
  constructor(props){
    super(props)
    
    // init state
    this.state = {
    }
  }
  
  componentDidMount(){
    this.props.fetchUsers();
    this.props.fetchLessons();
    this.props.getCurrentUserById();
  }
  
  handleDeleteItem = (lessonId) => {
    console.log('log id of the lesson: ', lessonId)
  }
  
  render(){
    const {
      allUsers,
      allLessons,
      unscheduledLessons,
      currentUser
    } = this.props
    
    console.log('currentUser @ unscheduled Lessons: ', currentUser)
    
    if(!allUsers || !allLessons || !unscheduledLessons){
      return (
        <main className="content">
          <DefaultErrorPage />
        </main>
      )
    }
    else if(allUsers === FETCHING || allLessons === FETCHING || unscheduledLessons === FETCHING){
      return (
        <main className="content">
          <DefaultLoadingPage />
        </main>
      )
    }
    else {
      return (
        <main>
          <ContentPageTitleBar
            content={TITLE_BAR_LESSONS}
          />
          <div className="contentList"> 
            <UnscheduledLessonsList 
              currentUser={currentUser}
              allUsersArr = {allUsers}
              allUnscheduledLessonsArr={unscheduledLessons}
              handleDeleteItem={this.handleDeleteItem}
            />
          </div>
        </main>
      )
    }
  }
}

function mapStateToProps(state){
  return {
    allUsers: state.users.allUsers,
    allLessons: state.lessons.allLessons,
    unscheduledLessons: state.lessons.unscheduledLessons,
    currentUser: state.auth.currentUser
  }
}

export default connect(mapStateToProps, {fetchUsers, fetchLessons, getCurrentUserById })(UnscheduledLessons);
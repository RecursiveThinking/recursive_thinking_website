import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { fetchUsers, fetchLessons, getCurrentUserById, editLessonById } from '../../actions'
import { FETCHING } from '../../actions/action_types'
// import { ROUTES_REACT } from '../../standards/routes'

import UnscheduledLessonsList from '../../components/unscheduledLessons/unscheduledLessonsList';
import DefaultErrorPage from '../../components/defaults/errorPage/errorPage';
import DefaultLoadingPage from '../../components/defaults/loadingPage/loadingPage'

import { TITLE_BAR_LESSONS } from '../../components/common/contentPage/contentPageTitleBarInfo'
import ContentPageTitleBar from '../../components/common/contentPage/contentPageTitleBar'

import DM from '../../standards/dictModel'

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
  
  toggleLessonVote = (lesson, action) => {
    const { lesson: { lessonVotes }, user: { userId } } = DM;
    const { currentUser } = this.props;
    // console.log('lesson', lesson)
    let updatedLesson = { ...lesson };
    if(action === 'add'){
      // console.log('uL V A b', updatedLesson[lessonVotes])
      updatedLesson[lessonVotes].push(currentUser[userId])
      // console.log('uL V A a', updatedLesson[lessonVotes])
      this.props.editLessonById(updatedLesson)
    }
    else if(action === 'remove'){
      // splice
      // console.log('uL V R b', updatedLesson[lessonVotes])
      const newVoteArray = lesson[lessonVotes].filter( Id => Id !== currentUser[userId] )
      updatedLesson[lessonVotes] = newVoteArray
      // console.log('uL V R a', updatedLesson[lessonVotes])
      this.props.editLessonById(updatedLesson)
    }
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
              toggleLessonVote={this.toggleLessonVote}
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

export default withRouter(connect(mapStateToProps, {
  fetchUsers, 
  fetchLessons, 
  getCurrentUserById,
  editLessonById
})(UnscheduledLessons));
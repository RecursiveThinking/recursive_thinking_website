import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { FETCHING } from '../../actions/action_types'
import { fetchUsers, fetchLessons, getCurrentUserById, editLessonById } from '../../actions'

import DefaultErrorPage from '../../components/defaults/errorPage/errorPage';
import DefaultLoadingPage from '../../components/defaults/loadingPage/loadingPage'

import ContentPageTitleBar from '../../components/common/contentPage/contentPageTitleBar'
import { TITLE_BAR_LESSONS } from '../../components/common/contentPage/contentPageTitleBarInfo'
import UnscheduledLessonsList from '../../components/unscheduledLessons/unscheduledLessonsList';

import LessonMethods from '../../functions/lessonMethods';
import DateMethods from '../../functions/dateMethods';

import DM from '../../standards/dictModel'

class UnscheduledLessons extends Component {
  constructor(props){
    super(props)
    
    // init state
    this.state = {
      nextAvailableSaturday: ''
    }
  }
  
  componentDidMount(){
    this.props.fetchUsers();
    this.props.fetchLessons();
    this.props.getCurrentUserById();
  }
  
  componentDidUpdate(prevProps){
    if(this.props.allLessons !== prevProps.allLessons){
      this.nextAvailableSaturdayDate();
    }
    
  }
  
  nextAvailableSaturdayDate = () => {
    const {
      allLessons
    } = this.props;
    if(allLessons.length){
      // find the last scheduled lesson because we have lessons
      const lastScheduledDate = LessonMethods.getDateOfLastScheduledLesson(allLessons);
      console.log('LSD: ', lastScheduledDate)
      let nextAvailableSaturday = DateMethods.whenIsNextSaturdayNoon(lastScheduledDate.date)
      this.setState({nextAvailableSaturday: nextAvailableSaturday})
    } else {
      let nextAvailableSaturday = DateMethods.whenIsNextSaturdayNoon()
      this.setState({nextAvailableSaturday: nextAvailableSaturday})
    }
  }
  
  toggleLessonVote = (lesson, action) => {
    const { lesson: { lessonVotes, scheduled, date }, user: { userId } } = DM;
    const { currentUser } = this.props;
    // console.log('lesson', lesson)
    let updatedLesson = { ...lesson };
    if(action === 'add'){
      if(updatedLesson[lessonVotes].length === 9){
        updatedLesson[scheduled] = true;
        updatedLesson[date] = this.state.nextAvailableSaturday
      }
      updatedLesson[lessonVotes].push(currentUser[userId]);
      this.props.editLessonById(updatedLesson)
    }
    else if(action === 'remove'){
      const newVoteArray = lesson[lessonVotes].filter( Id => Id !== currentUser[userId] )
      updatedLesson[lessonVotes] = newVoteArray
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

function mapDispatchToProps(dispatch){
  return bindActionCreators({ fetchUsers, fetchLessons, getCurrentUserById, editLessonById }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(UnscheduledLessons);
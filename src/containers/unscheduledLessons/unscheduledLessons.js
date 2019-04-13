import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { usersGetAll, lessonsGetAll, lessonEditById } from '../../actions'

import DefaultErrorPage from '../../components/defaults/errorPage/errorPage';
import DefaultLoadingPage from '../../components/defaults/loadingPage/loadingPage'
import { CARD_TITLE_UNSCHEDULED_LESSONS_GET_ALL }  from '../../components/common/content/contentInfo'

// import ContentPageTitleBar from '../../components/common/contentPage/contentPageTitleBar'
// import { TITLE_BAR_LESSONS } from '../../components/common/contentPage/contentPageTitleBarInfo'
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
    this.props.usersGetAll();
    this.props.lessonsGetAll();
  }
  
  componentDidUpdate(prevProps){
    if(this.props.lessons.allLessons !== prevProps.lessons.allLessons){
      this.nextAvailableSaturdayDate();
    }
  }
  
  nextAvailableSaturdayDate = () => {
    const {
      allLessons
    } = this.props.lessons;
    if(allLessons.length){
      // find the last scheduled lesson because we have lessons
      const lastScheduledDate = LessonMethods.getDateOfLastScheduledLesson(allLessons);
      // console.log('LSD: ', lastScheduledDate)
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
      this.props.lessonEditById(updatedLesson)
    }
    else if(action === 'remove'){
      const newVoteArray = lesson[lessonVotes].filter( Id => Id !== currentUser[userId] )
      updatedLesson[lessonVotes] = newVoteArray
      this.props.lessonEditById(updatedLesson)
    }
  }
  
  renderContent = () => {
    let {
      currentUser,
      users: {
        allUsers,
        isFetchingUsersGetAll, errorMessageUsersGetAll
      },
      lessons: {
        unscheduledLessons,
        isFetchingLessonsGetAll, errorMessageLessonsGetAll
      }
    } = this.props;
    const {
      title
    } = CARD_TITLE_UNSCHEDULED_LESSONS_GET_ALL;
    // isFetchingLessonsGetAll = true;
    if(errorMessageUsersGetAll || errorMessageLessonsGetAll){
      return (
        <DefaultErrorPage />
      )
    }
    else if(isFetchingUsersGetAll || isFetchingLessonsGetAll){
      return (
        <DefaultLoadingPage
          title={title}
          classNameTxt='ta-cent'
        />
      )
    }
    else {
      return (
        <UnscheduledLessonsList 
          currentUser={currentUser}
          allUsersArr = {allUsers}
          allUnscheduledLessonsArr={unscheduledLessons}
          toggleLessonVote={this.toggleLessonVote}
        />
      )
    }
  }
  
  render(){
    return(
      <> 
        {this.renderContent()}
      </>
    )

  }
}

function mapStateToProps(state){
  return {
    users: state.users,
    lessons: state.lessons,
    // currentUser: state.auth.currentUser
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({ usersGetAll, lessonsGetAll, lessonEditById }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(UnscheduledLessons);
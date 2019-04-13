import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { SubmissionError } from 'redux-form';

import { lessonCreateById, usersGetAll } from '../../../actions/index';

import { FORM_HEADING_LESSON_CREATE } from '../../../components/forms/formContent/formContent';
import LessonForm from '../../../components/forms/form_lesson';

import DefaultLoadingPage from '../../../components/defaults/loadingPage/loadingPage'
import DefaultErrorPage from '../../../components/defaults/errorPage/errorPage'
import DefaultProcessingPage from '../../../components/defaults/processingPage/processingPage';
import { 
  CARD_TITLE_LESSON_CREATE_BY_ID, CARD_TITLE_SUBMITTING_LESSON_CREATE_BY_ID
} from '../../../components/common/content/contentInfo'

import { Lesson } from '../../../models/models';
// import { FETCHING } from '../../../actions/action_types';

class LessonCreate extends Component {
  componentDidMount(){
    this.props.usersGetAll();
  }
  
  onSubmit = (formValues, addToTaughtByUsers) => {
    if(addToTaughtByUsers.length === 0){
      console.log('no users teaching')
      throw new SubmissionError({ lessonTaughtBy: 'Please Specifiy at least one Member to Teach This Lesson'})
    } else {
      const createdByUserId = this.props.currentUser.userId;
      console.log('formVals @ lessonCreate Component', formValues, createdByUserId, addToTaughtByUsers)
      let taughtByUsers = []
      if(addToTaughtByUsers.length){
        addToTaughtByUsers.forEach(userObj => taughtByUsers.push(userObj.userId))
      }
      let newLesson = new Lesson(formValues.lessonTitle, formValues.lessonDescription, taughtByUsers, createdByUserId)
      console.log('newLesson: ', newLesson)
      // action creator
      this.props.lessonCreateById(newLesson);
      // redirect to /lessons/unscheduledlessons
    }
  }
  
  render(){
    let {
      users: { 
        allUsers, 
        // lookupTableAllUsers, 
        isFetchingUsersGetAll, errorMessageUsersGetAll 
      },
      lessons: { 
        isCreatingLessonById, errorMessageCreatingLessonById,
      }, 
      currentUser
    } = this.props;
    // get all users, get currentUser
    if(isFetchingUsersGetAll){
      const {
        title,
        classNameTxt
      } = CARD_TITLE_LESSON_CREATE_BY_ID;
      return (
        <DefaultLoadingPage 
          title={title}
          classNameTxt={classNameTxt}
        />
      )
    }
    // error if not get users or not createLessonById
    else if(errorMessageUsersGetAll || errorMessageCreatingLessonById){
      return (
        <DefaultErrorPage 
        />
      )
    }
    // show processing if creating
    else if(isCreatingLessonById){
      const {
        title,
        classNameTxt
      } = CARD_TITLE_SUBMITTING_LESSON_CREATE_BY_ID;
      return (
        <DefaultProcessingPage 
          title={title}
          classNameTxt={classNameTxt}
        />
      )
    }
    // else if(errorMessageCreatingLessonById){
    //   return (
    //     <DefaultErrorPage />
    //   )
    // }
    else if(!isFetchingUsersGetAll){
      return (
        <LessonForm
        onSubmit={this.onSubmit}
        content={FORM_HEADING_LESSON_CREATE}
        allUsers={allUsers}
        currentUser={this.props.currentUser}
        />
      )
    }
  }
}

function mapStateToProps(state){
  return {
    // currentUser: state.auth.currentUser,
    auth: state.auth,
    // allUsers: state.users.allUsers
    users: state.users,
    lessons: state.lessons
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({ lessonCreateById, usersGetAll }, dispatch)
}

export default connect ( mapStateToProps, mapDispatchToProps )(LessonCreate)
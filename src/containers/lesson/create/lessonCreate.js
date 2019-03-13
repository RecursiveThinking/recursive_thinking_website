import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { createLesson, getCurrentUserById, fetchUsers } from '../../../actions/index';

import { FORM_HEADING_LESSON_CREATE } from '../../../components/forms/formContent/formContent';
import LessonForm from '../../../components/forms/form_lesson';

import { Lesson } from '../../../models/models';


class LessonCreate extends Component {
  componentDidMount(){
    this.props.getCurrentUserById();
    this.props.fetchUsers();
  }
  
  onSubmit = (formValues, addToTaughtByUsers) => {
    // const createdByUserId = this.props.currentUser.attributes.sub;
    const createdByUserId = this.props.currentUser.userId;
    console.log('formVals @ lessonCreate Component', formValues, createdByUserId, addToTaughtByUsers)
    let taughtByUsers = []
    if(addToTaughtByUsers.length){
      addToTaughtByUsers.forEach(userObj => taughtByUsers.push(userObj.userId))
    }
    let newLesson = new Lesson(formValues.lessonTitle, formValues.lessonDescription, taughtByUsers, createdByUserId)
    console.log('newLesson: ', newLesson)
    // action creator
    this.props.createLesson(newLesson);
    // redirect to /lessons/unscheduledlessons
  }
  
  render(){
    return (
      <>
        <LessonForm 
          onSubmit={this.onSubmit}
          content={FORM_HEADING_LESSON_CREATE}
          allUsers={this.props.allUsers}
          currentUser={this.props.currentUser}
        />
      </>
    )
  }
}

function mapStateToProps(state){
  return {
    currentUser: state.auth.currentUser,
    allUsers: state.users.allUsers
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({ createLesson, getCurrentUserById, fetchUsers }, dispatch)
}

export default connect ( mapStateToProps, mapDispatchToProps )(LessonCreate)
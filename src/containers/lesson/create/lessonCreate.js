import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { createLesson, getCurrentUserById } from '../../../actions/index';

import { FORM_HEADING_LESSON_CREATE } from '../../../components/forms/formContent/formContent';
import LessonForm from '../../../components/forms/form_lesson';

import { Lesson } from '../../../models/models';


class LessonCreate extends Component {
  componentDidMount(){
    this.props.getCurrentUserById();
  }
  
  onSubmit = (formValues) => {
    // const createdByUserId = this.props.currentUser.attributes.sub;
    const createdByUserId = this.props.currentUser.userId;
    // console.log('formVals @ lessonCreate Component', formValues, createdByUserId)
    let newLesson = new Lesson(formValues.lessonTitle, formValues.lessonDescription, createdByUserId)
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
        />
      </>
    )
  }
}

function mapStateToProps(state){
  return {
    currentUser: state.auth.currentUser
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({ createLesson, getCurrentUserById }, dispatch)
}

export default connect ( mapStateToProps, mapDispatchToProps )(LessonCreate)
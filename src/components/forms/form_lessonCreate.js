import React, { Component } from 'react'

import { connect } from 'react-redux';
import { createLesson } from '../../actions'

import LessonForm from './form_lesson'
import { FORM_HEADING_LESSON_CREATE } from '../common/formContent/formContent'
import { Lesson } from '../../models/models';

import { getCurrentUserById } from '../../actions/index'


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

export default connect (
  mapStateToProps,
  { createLesson, getCurrentUserById }
)(LessonCreate)
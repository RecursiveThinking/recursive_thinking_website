import React, { Component } from 'react'

import { connect } from 'react-redux';
import { createLesson } from '../../actions'

import LessonForm from './form_lesson'
import { FORM_HEADING_LESSON_CREATE } from '../common/formContent/formContent'
import { Lesson } from '../../models/models';

import { fetchCurrentUser } from '../../actions/index'


class LessonCreate extends Component {
  componentDidMount(){
    this.props.fetchCurrentUser();
  }
  
  onSubmit = (formValues) => {
    const createdByUserId = this.props.currentUser.attributes.sub;
    // console.log('formVals @ lessonCreate Component', formValues, createdByUserId)
    let newLesson = new Lesson(formValues.lessonTitle, formValues.lessonDescription, createdByUserId)
    // action creator
    this.props.createLesson(newLesson);
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
  { createLesson, fetchCurrentUser }
)(LessonCreate)
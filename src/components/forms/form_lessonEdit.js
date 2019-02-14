import React, { Component } from 'react'

import { connect } from 'react-redux';
import { getLessonById, editLessonById } from '../../actions'

import LessonForm from './form_lesson'
import { FORM_HEADING_LESSON_EDIT } from '../common/formContent/formContent'

class LessonEdit extends Component {
  
  componentDidMount(){
    console.log('CDM @ lessonEdit: ', this.props.match.params.id)
    this.props.getLessonById(this.props.match.params.id)
  }
  
  onSubmit = (formValues) => {
    console.log('formVals @ Lesson Edit', formValues)
    //action creator
    // this.props.editLessonById(formValues);
  }
  
  render () {
    console.log('props @ LessonEdit', this.props);
    console.log('params', this.props.match.params.id)
    if(!this.props.lessonById){
      return (
        <div>
          Loading!
        </div>
      )
    } 
    // else {
    const {
      title,
      description
    } = this.props.lessonById
    return (
      <>
        <LessonForm 
          onSubmit={this.onSubmit}
          content={FORM_HEADING_LESSON_EDIT}
          initialValues={{
            lessonTitle: title,
            lessonDescription: description
          }}
        />
      </>
    )
    // }
  }
}

const mapStateToProps = (state, ownProps) => {
  console.log('MSTP @ Lesson: ', state, ownProps)
  return { 
    lessonById: state.lessons.lookupTableAllLessons[ownProps.match.params.id]
    // lesson: null
  }
}

export default connect (
  mapStateToProps,
  { getLessonById, editLessonById }
  //fetch and editlessons
)(LessonEdit)
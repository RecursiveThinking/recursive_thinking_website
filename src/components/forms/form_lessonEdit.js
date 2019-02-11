import React, { Component } from 'react'

import { connect } from 'react-redux';
import { getLessonById, editLessonById } from '../../actions'

import LessonForm from './form_lesson'
import { FORM_HEADING_LESSON_EDIT } from '../common/formContent/formContent'

class LessonEdit extends Component {
  
  componentDidMount(){
    this.props.getLessonById(this.props.match.params.id)
  }
  
  onSubmit = (formValues) => {
    console.log('formVals @ Lesson Edit', formValues)
    //action creator
    // this.props.editLessonById(formValues);
  }
  
  render () {
    // const {
    //   propsforId
    // } = this.props
    console.log('props @ LessonEdit', this.props, this.props);
    console.log('params', this.props.match.params.id)
    
    return (
      <>
        <LessonForm 
          onSubmit={this.onSubmit}
          content={FORM_HEADING_LESSON_EDIT}
          initialValues={{ 
            lessonTitle: 'Edit Me', 
            lessonDescription: 'Description'
          }}
        />
      </>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return { 
    lesson: state.lessons.lookupTableAllLessons[ownProps.match.params.id]
  }
}

export default connect (
  mapStateToProps,
  { getLessonById, editLessonById }
  //fetch and editlessons
)(LessonEdit)
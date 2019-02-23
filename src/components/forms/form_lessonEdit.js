import React, { Component } from 'react'

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getLessonById, editLessonById } from '../../actions'

import LessonForm from './form_lesson'
import { FORM_HEADING_LESSON_EDIT } from './formContent/formContent'

import DefaultLoadingPage from '../defaults/loadingPage/loadingPage';

class LessonEdit extends Component {
  
  componentDidMount(){
    console.log('CDM @ lessonEdit: ', this.props.match.params.id)
    this.props.getLessonById(this.props.match.params.id)
  }
  
  onSubmit = (formValues) => {
    console.log('formVals @ Lesson Edit', formValues)
    let newLesson = this.props.lessonById;
    newLesson.title = formValues.lessonTitle
    newLesson.description = formValues.lessonDescription
    newLesson.updatedAt = new Date().toString();
    console.log('newLesson', JSON.stringify(newLesson))
    this.props.editLessonById(newLesson);
  }
  
  render () {
    console.log('props @ LessonEdit', this.props);
    console.log('params', this.props.match.params.id)
    if(!this.props.lessonById){
      return (
        <>
          {/* <ContentPageTitleBar 
            content={TITLE_BAR_LESSONS_EDIT}
          /> */}
          <section style={{padding: '1.5rem 1.5rem'}}>
            <DefaultLoadingPage />
          </section>
        </>
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
          lesson={this.props.lessonById}
        />
      </>
    )
    // }
  }
}

const mapStateToProps = (state, ownProps) => {
  console.log('MSTP @ Lesson: ', state, ownProps)
  return { 
    lessonById: state.lessons.lessonById
    // lessonById: state.lessons.lookupTableAllLessons[ownProps.match.params.id]
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({ getLessonById, editLessonById }, dispatch);
}

export default connect (
  mapStateToProps,
  mapDispatchToProps
)(LessonEdit)
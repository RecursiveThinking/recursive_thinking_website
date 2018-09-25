import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectedLesson } from '../../actions/index'
import { bindActionCreators } from 'redux'

import ScheduledLessonsListItem from '../../components/scheduledLessons/scheduledLessonsListItem'

import LessonMethods from '../../functions/lessonMethods'

const ScheduledLessonsList = ({...props}) => {
  // map the lesson list to return JSX
  let allScheduledLessonsListItems = props.scheduledLessons.map(lessonItem => {
    let currentUserLessonStatus = LessonMethods.getSelectedLessonStatusForCurrentUser(props.currentUser['lessonStatus'], lessonItem.Id);
    return (
      <li
        key={lessonItem.Id}
        onClick = {() => props.actions.selectedLesson(lessonItem)}
      >
        <ScheduledLessonsListItem lesson={lessonItem} currentUserLessonStatus={currentUserLessonStatus} />
      </li>
    )
  })
  return (
    <article className="card">
      <h5 className="fw900 ls14 ttup fcGrey424041">Upcoming Lessons</h5>
      <hr className="mt10"/>
      <ul>
        {allScheduledLessonsListItems}
      </ul>
    </article>
  )
}

function mapDispatchToProps(dispatch){
  return {
    actions: bindActionCreators( {selectedLesson: selectedLesson}, dispatch)
  }
}

export default connect(null, mapDispatchToProps)(ScheduledLessonsList);

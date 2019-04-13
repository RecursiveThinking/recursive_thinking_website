import React from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';

import { selectedLesson } from '../../actions/index'

import ScheduledLessonsListItem from '../../components/scheduledLessons/scheduledLessonsListItem'

import LessonMethods from '../../functions/lessonMethods'

import DefaultMessage from '../../components/defaults/defaultMessage/defaultMessage';
import { DEFAULT_MESSAGE_SCHEDULED_LESSONS_UPCOMING_LESSONS_NOT_FOUND } from '../../components/defaults/defaultMessage/defaultMessageContent/defaultMessageContent';

import DM from '../../standards/dictModel'

const ScheduledLessonsList = ({scheduledLessons, currentUser, actions}) => {
  const { user: { lessonStatus }, lesson: { Id }} = DM;
  
  // scheduledLessons.length = 0;
  if(scheduledLessons.length){
    // map the lesson list to return JSX
    let allScheduledLessonsListItems = scheduledLessons.map(lessonItem => {
      let currentUserLessonStatus = LessonMethods.getSelectedLessonStatusForCurrentUser(currentUser[lessonStatus], lessonItem[Id]);
      return (
        <li
          key={lessonItem[Id]}
          onClick = {() => actions.selectedLesson(lessonItem)}
        >
          <ScheduledLessonsListItem lesson={lessonItem} currentUserLessonStatus={currentUserLessonStatus} />
        </li>
      )
    })
    
    return (
      <article className="card">
        <h5 className="fw600 ls14 fcGrey424041">Upcoming Lessons</h5>
        <hr className="mt10"/>
        <ul>
          {allScheduledLessonsListItems}
        </ul>
      </article>
    )
  } else {
    // the list has no length
    return (
      // <article className="card">
      //   <h5 className="fw600 ls14 fcGrey424041">Upcoming Lessons</h5>
      //   <hr className="mt10" />
      //   <h5 className="fw500 ls14 fcGrey424041 mt30 ta-cent">Uh Oh! There are no upcoming lessons!</h5>
      //   <p className="fs18 fw300 ls10 fcGrey81 mt15 ta-cent">
      //     To create a lesson, please select "Vote for Lessons" from the navigation panel.  On the subsequnet page, select the "Submit Lesson" and fill out the form.
      //     <br /><br />
      //     Afterwards, vote for lessons you would like to attend.  Lessons that receive 10 votes will be scheduled for the next available Saturday.
      //   </p>
      // </article>
      <DefaultMessage
        content={DEFAULT_MESSAGE_SCHEDULED_LESSONS_UPCOMING_LESSONS_NOT_FOUND}
      />
    )
  }
  
}

function mapDispatchToProps(dispatch){
  return {
    actions: bindActionCreators( {selectedLesson: selectedLesson}, dispatch)
  }
}

export default connect(null, mapDispatchToProps)(ScheduledLessonsList);

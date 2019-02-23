import React from 'react';
import { connect } from 'react-redux';
import { selectedLesson } from '../../actions/index'
import { bindActionCreators } from 'redux'

import ScheduledLessonsListItem from '../../components/scheduledLessons/scheduledLessonsListItem'

import LessonMethods from '../../functions/lessonMethods'

import DM from '../../standards/dictModel'

const ScheduledLessonsList = ({...props}) => {
  const { user: { lessonStatus }, lesson: { Id }} = DM;
  
  console.log('props @ scheduledLessons', props.scheduledLessons)
  console.log('object: ', props.currentUser[lessonStatus])
  // console.log('array length: ', Object.entries(props.currentUser[lessonStatus]).length === 0)
  // && props.currentUser[lessonStatus].constructor === Object
  
  // if(props.scheduledLessons.length && Object(props.currentUser[lessonStatus]).length){
  if(props.scheduledLessons.length){
    // map the lesson list to return JSX
    let allScheduledLessonsListItems = props.scheduledLessons.map(lessonItem => {
      // Object(props.currentUser[lessonStatus]).length
      let currentUserLessonStatus = LessonMethods.getSelectedLessonStatusForCurrentUser(props.currentUser[lessonStatus], lessonItem[Id]);
      return (
        <li
          key={lessonItem[Id]}
          onClick = {() => props.actions.selectedLesson(lessonItem)}
        >
          <ScheduledLessonsListItem lesson={lessonItem} currentUserLessonStatus={currentUserLessonStatus} />
        </li>
      )
    })
    
    return (
      <article className="card">
        <h5 className="fw700 ls14 ttup fcGrey424041">Upcoming Lessons</h5>
        <hr className="mt10"/>
        <ul>
          {allScheduledLessonsListItems}
        </ul>
      </article>
    )
  } else {
    // the list has no length
    return (
      <article className="card">
        <h5 className="fw700 ls14 ttup fcGrey424041">Upcoming Lessons</h5>
        <hr className="mt10" />
        <h5 className="fw500 ls14 fcGrey424041 mt30 ta-cent">Uh Oh! There are no upcoming lessons!</h5>
        <p className="fs18 fw300 ls10 fcGrey81 mt15 ta-cent">
          To create a lesson, please select "Vote for Lessons" from the navigation panel.  On the subsequnet page, select the "Submit Lesson" and fill out the form.
          <br /><br />
          Afterwards, vote for lessons you would like to attend.  Lessons that receive 10 votes will be scheduled for the next available Saturday.
        </p>
      </article>
    )
  }
  
}

function mapDispatchToProps(dispatch){
  return {
    actions: bindActionCreators( {selectedLesson: selectedLesson}, dispatch)
  }
}

export default connect(null, mapDispatchToProps)(ScheduledLessonsList);

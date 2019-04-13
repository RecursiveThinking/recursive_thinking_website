import React from 'react';

import UnscheduledLessonsListItem from './unscheduledLessonsListItem'

import DefaultMessage from '../../components/defaults/defaultMessage/defaultMessage';
import { DEFAULT_MESSAGE_UNSCHEDULED_LESSONS_NOT_FOUND } from '../../components/defaults/defaultMessage/defaultMessageContent/defaultMessageContent'

const unscheduledLesonsList = ({ allUnscheduledLessonsArr, currentUser, allUsersArr, toggleLessonVote }) => {
  
  // allUnscheduledLessonsArr.length = 0
  if(allUnscheduledLessonsArr.length){  
    let unscheduledListJSX = allUnscheduledLessonsArr.map(lesson => {
      return (
        <li key={lesson.Id} className="grid-cell">
          <UnscheduledLessonsListItem 
            currentUser={currentUser} 
            lesson={lesson} 
            allUsersArr={allUsersArr}
            toggleLessonVote={toggleLessonVote}
          />
        </li>
      )
    })
    
    return (
      <ul className="grid grid--cols-2">
        {unscheduledListJSX}
      </ul>
    )
  } else {
    return(
      // <article className="card">
      //   <h5 className="fw700 ls14 ttup fcGrey424041">Vote For Lessons</h5>
      //   <hr className="mt10" />
      //   <h5 className="fw500 ls14 fcGrey424041 mt30 ta-cent">Uh Oh! There are no lessons to vote on!</h5>
      //   <p className="fs18 fw300 ls10 fcGrey81 mt15 ta-cent">
      //     To create a lesson, select the "Submit Lesson" on the upper right and fill out the form.
      //     <br /><br />
      //     Afterwards, vote for lessons you would like to attend.  Lessons that receive 10 votes will be scheduled for the next available Saturday.
      //   </p>
      // </article>
      <DefaultMessage
        content={DEFAULT_MESSAGE_UNSCHEDULED_LESSONS_NOT_FOUND}
      />
    )
  }
}

export default unscheduledLesonsList;
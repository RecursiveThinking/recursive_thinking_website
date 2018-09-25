import React from 'react';

import UnscheduledLessonsListItem from './unscheduledLessonsListItem'

const unscheduledLesonsList = ({currentUser, allUnscheduledLessonsArray}) => {
  let unscheduledListJSX = allUnscheduledLessonsArray.map(lesson => {
    return (
      <li key={lesson.Id} className="grid-cell">
        <UnscheduledLessonsListItem currentUser={currentUser} lesson={lesson}/>
      </li>
    )
  })
  
  return (
    <ul className="grid grid--cols-2">
      {unscheduledListJSX}
    </ul>
  )
}

export default unscheduledLesonsList;
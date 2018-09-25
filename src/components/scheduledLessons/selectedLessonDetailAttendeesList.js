import React from 'react';

import SelectedLessonDetailAttendeesListItem from './selectedLessonDetailAttendeesListItem'

const selectedLessonAttendeesList = ({selectedLessonAttendeesArrayOfUserObj}) => {
  const lessonAttendingAllUsersList = selectedLessonAttendeesArrayOfUserObj.map(attendingUserObj => {
    return (
      <li key={attendingUserObj.userId} className="grid-cell">
        <SelectedLessonDetailAttendeesListItem attendingUserObj={attendingUserObj}/>
      </li>
    )
  })
  
  return (
    <ul className="grid grid--1of2">
      { lessonAttendingAllUsersList }
    </ul>
  )
}

export default selectedLessonAttendeesList;
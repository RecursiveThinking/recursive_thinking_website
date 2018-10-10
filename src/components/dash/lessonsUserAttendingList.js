import React from 'react';

import LessonsUserAttendingListItem from './lessonsUserAttendingListItem'

const lessonsUserAttendingList = ({lessonsAttending}) => {
  let attendingLessons = lessonsAttending.map(lessonToRender => {
    return (
      <li key={lessonToRender.Id}>
        <LessonsUserAttendingListItem lessonAttend={lessonToRender} />
      </li>
    )
  })
  return (
    <ul>
      {attendingLessons}
      <div className="fc-seeMore">
        <h5 className="ls14 fw900 ttup ta-right mt15"><a href="/schedLessons">See More</a></h5>
      </div>
    </ul>
  )
}

export default lessonsUserAttendingList;
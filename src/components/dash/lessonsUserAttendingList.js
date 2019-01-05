import React from 'react';
import { Link } from 'react-router-dom'

import LessonsUserAttendingListItem from './lessonsUserAttendingListItem'

import { ROUTES_REACT } from '../../standards/routes'

const {
  scheduledlessons
} = ROUTES_REACT
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
        <h5 className="ls14 fw700 ttup ta-right mt15">
          <Link to={scheduledlessons}>
            See More
          </Link>
        </h5>
      </div>
    </ul>
  )
}

export default lessonsUserAttendingList;
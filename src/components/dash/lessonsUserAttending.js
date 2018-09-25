import React from 'react';

import LessonsUserAttendingList from './lessonsUserAttendingList'

const lessonsUserAttending = ({lessonsAttendingArr}) => {
  if(lessonsAttendingArr.length > 0){
    return (
      <article className="card">
        <h5 className="fw900 ls14 ttup fcGreyb9">I'm Attending</h5>
        <hr className="mt10" />
        <LessonsUserAttendingList lessonsAttending={lessonsAttendingArr}/>
      </article>
    )
  }
  else {
    return (
      <article className="card">
        <h5 className="fw900 ls14 ttup fcGreyb9">I'm Attending</h5>
        <hr className="mt10" />
        <h5 className="fw500 ls14 fcGrey81 mt30 ta-cent">Uh Oh! You are not currently attending any lessons!</h5>
        <p className="fs18 fw300 ls10 fcGreyb9 mt15 ta-cent">
          To attend a lesson, please select "Upcoming Lessons" from the navigation panel.  On the subsequnet page, select a lesson from the list, then click the "Yes" button on the lesson's information page.
        </p>
      </article>
    )
  }
}

export default lessonsUserAttending;
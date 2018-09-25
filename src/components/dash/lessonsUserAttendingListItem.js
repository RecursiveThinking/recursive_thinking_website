import React from 'react';

import DateMethods from '../../functions/dateMethods'

const lessonsUserAttendingListItem = ({lessonAttend}) => {
  console.log('lesson title', lessonAttend['title']);
  // console.log('lesson date', lessonAttend.date);
  let formattedDate = DateMethods.getFormattedDate(lessonAttend.date);
  
  return (
    <article className="mt15">
      <div className="fc-dateRow fc--disp-flex fc--fdir-row fc--fwrap-no fc--aItem-ce">
        <h1 className="fs575 ls44 fw300 fcGreenRT">{formattedDate['dateOfMonth']}</h1>
        <div className="fc-dateRowMonthYear fc--disp-flex fc--fdir-col fc--fwrap-no fc--aCont-sb">
          <h5 className="fw500 ls14 ttup fcBlack">{formattedDate['monthAsString']}</h5>
          <h5 className="fw500 ls14 ttup fcBlack">{formattedDate['year']}</h5>
        </div>
      </div>
      <div className="fc-lessonInfoCont">
        <h5 className="fw300 ls14 fcGrey66 mtNeg10">{lessonAttend['title']}</h5>
      </div>
      <hr className="mt15" />
    </article>
  )
}

export default lessonsUserAttendingListItem;
import React from 'react';

import DateMethods from '../../functions/dateMethods'

import DM from '../../standards/dictModel'

const lessonsUserAttendingListItem = ({lessonAttend}) => {
  const { lesson: { date, title}} = DM
  let formattedDate = DateMethods.getFormattedDate(lessonAttend[date]);
  
  return (
    <article>
      <div className="fc-dateRow fc--disp-flex fc--fdir-row fc--fwrap-no fc--aItem-ce">
        <h1 className="fs575 ls44 fw300 fcGreenRT">{formattedDate['dateOfMonth']}</h1>
        <div className="fc-dateRowMonthYear fc--disp-flex fc--fdir-col fc--fwrap-no fc--aCont-sb">
          <h6 className="fw600 ls20 ttup fs22 fcBlack">{formattedDate['monthAsString']}</h6>
          <h6 className="fw600 ls20 ttup fs22 fcBlack">{formattedDate['year']}</h6>
        </div>
      </div>
      {/* <div className="fc-lessonInfoCont"> */}
        <h6 className="fw300 ls18 fs22 fcGrey66 mtNeg10">{lessonAttend[title]}</h6>
      {/* </div> */}
      <hr className="mt15" />
    </article>
  )
}

export default lessonsUserAttendingListItem;
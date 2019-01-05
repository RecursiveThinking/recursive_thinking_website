import React from 'react';

import DateMethods from '../../functions/dateMethods'
import LessonMethods from '../../functions/lessonMethods'

import DM from '../../standards/dictModel'

const scheduledLessonsListItem = ({lesson, currentUserLessonStatus}) => {
  const { lesson: { title, date } } = DM;
  let formattedDate = DateMethods.getFormattedDate(lesson[date])
  // style formatting for star
  let styleLessonStatusStar = LessonMethods.getStyleForLessonStatusStarString(currentUserLessonStatus)
  // console.log(lesson.Id, currentUserLessonStatus, styleLessonStatusStar);
  
  return (
    <article className="">
      <div className="fc-dateRow fc--disp-flex fc--fdir-row fc--fwrap-no fc--aItem-ce">
        <h1 className="fs60 ls44 fw300 fcGreenRT">{formattedDate['dateOfMonth']}</h1>
        <div className="fc-dateRowMonthYear fc--disp-flex fc--fdir-col fc--fwrap-no fc--aCont-sb">
          <h6 className="fw600 ls20 ttup fs22 fcGrey06">{formattedDate['monthAsString']}</h6>
          <h6 className="fw600 ls20 ttup fs22 fcGrey06">{formattedDate['year']}</h6>
        </div>
        <div className="fc-star fc--disp-flex fc--fdir-row fc--jCont-fe">
          <i className={styleLessonStatusStar}></i>
        </div>
      </div>
      <div className="fc-lessonInfoCont">
        <h6 className="fw300 fs22 ls18 fcGrey66 mtNeg10">{lesson[title]}</h6>
      </div>
      <hr className="mt15" />
    </article>
  )
}

export default scheduledLessonsListItem;
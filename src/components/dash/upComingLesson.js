import React from 'react';

import LessonTaughtByThumbList from '../common/lesson/lessonTaughtByThumbList'

import DateMethods from '../../functions/dateMethods'
import LessonMethods from '../../functions/lessonMethods'

const Users = require('!json-loader!../../../data_returns/RecursiveThinkingDeveloperProfiles.json')

const upComingLesson = ({upComingLesson}) => {
  // upComingLesson = []
  if(upComingLesson.length){
    const nextLesson = upComingLesson[0];
    let formattedDate = DateMethods.getFormattedDate(nextLesson.date)
    let taughtByArray = upComingLesson[0]['lessonTaughtBy'];
    let taughtByUserArray = LessonMethods.getArrayofTaughtByUserObjs(taughtByArray, Users);
    // taughtByUserArray is an array of our taughtBy Users (objects), so we can pass that to our LessonTaughtByThumbList
    
    return (
      <article className="card">
        <h5 className="fw900 ls14 ttup fcGreyb9">Upcoming Lesson</h5>
        <hr className="mt10"/>
        <div className="fc-dateRow fc--disp-flex fc--fdir-row fc--fwrap-no fc--aItem-ce">
          <h1 className="fs575 ls44 fw300 fcGreenRT">{formattedDate['dateOfMonth']}</h1>
          <div className="fc-dateRowMonthYear fc--disp-flex fc--fdir-col fc--fwrap-no fc--aCont-sb">
            <h5 className="fw500 ls14 ttup fcBlack">{formattedDate['monthAsString']}</h5>
            <h5 className="fw500 ls14 ttup fcBlack">{formattedDate['year']}</h5>
          </div>
        </div>
        <hr />
        <div className="fc-lessonInfoCont">
          <h5 className="fw300 ls14 fcBlack mt15">{nextLesson['title']}</h5>
          <p className="fs16 fw300 ls10 fcBlack mt10">{nextLesson['description']}</p>
        </div>
        <hr className="mt20" />
        <div className="fc-taughtBy">
          <h5 className="fw300 ls14 ttup fcBlack mt10">Taught By:</h5>
          <LessonTaughtByThumbList taughtByUserArray={taughtByUserArray}/>
        </div>
      </article>
    )
  } 
  // has no length
  else {
    return (
      <article className="card">
        <h5 className="fw900 ls14 ttup fcGreyb9">Upcoming Lessons</h5>
        <hr className="mt10" />
        <h5 className="fw500 ls14 fcGrey81 mt30 ta-cent">Uh Oh! There are no lessons currently scheduled!</h5>
        <p className="fs18 fw300 ls10 fcGreyb9 mt15 ta-cent">
          To submit a new lesson, please select Vote for Lessons from the Nav bar, then click "Submit a Lesson", located at the top of the page.
        </p>
      </article>
    )
  }
}

export default upComingLesson;
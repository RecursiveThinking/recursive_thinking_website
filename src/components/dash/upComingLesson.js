import React from 'react';

import LessonTaughtByThumbList from '../common/lesson/lessonTaughtByThumbList'

import DateMethods from '../../functions/dateMethods'
import LessonMethods from '../../functions/lessonMethods'

import DM from '../../standards/dictModel'

const upComingLesson = ({upComingLessons, allUsersArr}) => {
  const { lesson: {
      title,
      date,
      description,
      lessonTaughtBy
    }
  } = DM 
  
  // upComingLessons.length = 0;
  
  if(upComingLessons.length){
    const nextLesson = upComingLessons[0];
    let formattedDate = DateMethods.getFormattedDate(nextLesson[date])
    let taughtByArray = upComingLessons[0][lessonTaughtBy];
    // let taughtByUserArray = LessonMethods.getArrayofTaughtByUserObjs(taughtByArray, Users);
    let taughtByUserArray = LessonMethods.getArrayOfUserObjects(taughtByArray, allUsersArr);
    // console.log(taughtByUserArray)
    // taughtByUserArray is an array of our taughtBy Users (objects), so we can pass that to our LessonTaughtByThumbList
    
    return (
      <article className="card">
        {/* fcGreyb9 */}
        <h5 className="fw700 ls14 ttup fcGrey424041">Upcoming Lesson</h5>
        <hr className="mt10"/>
        <div className="fc-dateRow fc--disp-flex fc--fdir-row fc--fwrap-no fc--aItem-ce">
          <h1 className="fs60 ls44 fw300 fcGreenRT">{formattedDate['dateOfMonth']}</h1>
          <div className="fc-dateRowMonthYear fc--disp-flex fc--fdir-col fc--fwrap-no fc--aCont-sb">
            <h6 className="fw600 ls20 ttup fs22 fcGrey06">{formattedDate['monthAsString']}</h6>
            <h6 className="fw600 ls20 ttup fs22 fcGrey06">{formattedDate['year']}</h6>
          </div>
        </div>
        <hr />
        <div className="fc-lessonInfoCont">
          <h6 className="fw300 fs22 ls18 fcBlack mt15">{nextLesson[title]}</h6>
          <p className="fw300 fs16 ls10 fcGrey424041 mt10">{nextLesson[description]}</p>
        </div>
        <hr className="mt20" />
        <div className="fc-taughtBy">
          <h6 className="fw300 fs22 ls18 ttup fcBlack mt10">Taught By:</h6>
          <LessonTaughtByThumbList taughtByUserArray={taughtByUserArray}/>
        </div>
      </article>
    )
  } 
  // has no length
  else {
    return (
      <article className="card">
        <h5 className="fw700 ls14 ttup fcGrey424041">Upcoming Lessons</h5>
        <hr className="mt10" />
        <h5 className="fw500 ls14 fcGrey424041 mt30 ta-cent">Uh Oh! There are no lessons currently scheduled!</h5>
        <p className="fs18 fw300 ls12 fcGrey81 mt15 ta-cent">
        {/* fcGrey81 */}
          To submit a new lesson, please select Vote for Lessons from the Nav bar, then click "Submit a Lesson", located at the top of the page.
        </p>
      </article>
    )
  }
}

export default upComingLesson;
import React from 'react';

import LessonTaughtByThumbList from '../common/lesson/lessonTaughtByThumbList'
import SelectedLessonDetailAttendeesList from './selectedLessonDetailAttendeesList'

import DateMethods from '../../functions/dateMethods'
import LessonMethods from '../../functions/lessonMethods'

import DM from '../../standards/dictModel'

const SelectedLessonDetail = ({...props}) => {

    const { user: { lessonStatus }, lesson: { title, description, date, lessonTaughtBy, lessonAttendees }} = DM;
    let selectedLesson = {}
    if(props.scheduledLessons.length && !props.selectedLesson){
      selectedLesson = props.scheduledLessons[0]
    }
    else {
      selectedLesson = props.selectedLesson
    }
    // get formattedDate object for date
    let formattedDate = DateMethods.getFormattedDate(selectedLesson[date]);
    // returns an array of userObj beloing to people who are teaching
    let taughtByArrayOfUserObj = LessonMethods.getArrayOfUserObjects(selectedLesson[lessonTaughtBy], props.allUsers)
    // returns an array of userObj belonging to users who are attending
    let selectedLessonAttendeesArrayOfUserObj = LessonMethods.getArrayOfUserObjects(selectedLesson[lessonAttendees])
    // formats the styling for a viewed lesson, based on wether or not the currentUser's status with that lesson
    // if returns true, returns a number, if return null, then no status for lesson
    let userLessonStatus = LessonMethods.getSelectedLessonStatusForCurrentUser(props.currentUser[lessonStatus], selectedLesson.Id);
    // attending === 1, maybe === 2, not === 3 if null, then all buttons live
    let buttonStatusObj = LessonMethods.getButtonStatusForLesson(userLessonStatus)
    
    return(
      <article className="card">
        <h5 className="fw900 ls14 ttup fcGrey424041">Lesson Breakdown</h5>
        <hr className="mt10" />
        {/* <div className="fc-selectedLessonButtons"> */}
        <div className="grid grid--cols-3 fc-selectedLessonButtons">
          <div className={buttonStatusObj.btnStyleForAttending}>Attending</div>
          <div className={buttonStatusObj.btnStyleForMaybeAttending}>Maybe</div>
          <div className={buttonStatusObj.btnStyleForNotAttending}>Not Attending</div>
        </div>
        {/* </div> */}
        <hr className="mt10" />  
        <div className="fc-dateRow fc--disp-flex fc--fdir-row fc--fwrap-no fc--aItem-ce">
          <h1 className="fs575 ls44 fw300 fcGreenRT">{formattedDate['dateOfMonth']}</h1>
          <div className="fc-dateRowMonthYear fc--disp-flex fc--fdir-col fc--fwrap-no fc--aCont-sb">
            <h5 className="fw500 ls14 ttup fcBlack">{formattedDate['monthAsString']}</h5>
            <h5 className="fw500 ls14 ttup fcBlack">{formattedDate['year']}</h5>
          </div>
        </div>
        <hr />  
        <div className="fc-lessonInfoCont">
          <h5 className="fw300 ls14 fcBlack mt15">{selectedLesson[title]}</h5>
          <p className="fs16 fw300 ls10 fcBlack mt10">{selectedLesson[description]}</p>
        </div>
        <hr className="mt20" />
        <div className="fc-taughtBy">
          <h5 className="fw300 ls14 ttup fcBlack mt10">Taught By:</h5>
          <LessonTaughtByThumbList taughtByUserArray={taughtByArrayOfUserObj}/>
        </div>
        <hr className="mt20"/>
        <div className="fc-usersAttending">
          <h5 className="fw300 ls14 ttup fcBlack mt10">Attending:</h5>
          <div className="fc-usersAttendingPortraits">
            <SelectedLessonDetailAttendeesList selectedLessonAttendeesArrayOfUserObj={selectedLessonAttendeesArrayOfUserObj}/>
          </div>
        </div>
      </article>
    )
}

export default SelectedLessonDetail;
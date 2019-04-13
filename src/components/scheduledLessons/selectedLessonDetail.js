import React from 'react';

import LessonTaughtByThumbList from '../common/lesson/lessonTaughtByThumbList'
import SelectedLessonDetailAttendeesList from './selectedLessonDetailAttendeesList'

import DateMethods from '../../functions/dateMethods'
import LessonMethods from '../../functions/lessonMethods'

import DefaultMessage from '../defaults/defaultMessage/defaultMessage';
import { DEFAULT_MESSAGE_SCHEDULED_LESSONS_LESSON_BREAKDOWN_NOT_FOUND } from '../defaults/defaultMessage/defaultMessageContent/defaultMessageContent'

import DM from '../../standards/dictModel'

const SelectedLessonDetail = ({allUsers, currentUser, scheduledLessons, selectedLesson, updateSelectedLesson}) => {

    const { 
      user: { lessonStatus }, 
      lesson: { 
        title, 
        description, 
        date, 
        lessonTaughtBy, 
        lessonAttendees 
      }
    } = DM;

    // selectedLesson = {}
    if(scheduledLessons.length && !selectedLesson){
      selectedLesson = scheduledLessons[0]
    }
    else {
      selectedLesson = selectedLesson
    }
    // scheduledLessons.length = 0
    if(scheduledLessons.length){
      // get formattedDate object for date
      let formattedDate = DateMethods.getFormattedDate(selectedLesson[date]);
      // returns an array of userObj beloing to people who are teaching
      let taughtByArrayOfUserObj = LessonMethods.getArrayOfUserObjects(selectedLesson[lessonTaughtBy], allUsers)
      // returns an array of userObj belonging to users who are attending
      let selectedLessonAttendeesArrayOfUserObj = LessonMethods.getArrayOfUserObjects(selectedLesson[lessonAttendees], allUsers)
      // formats the styling for a viewed lesson, based on wether or not the currentUser's status with that lesson
      // if returns true, returns a number, if return null, then no status for lesson
      let userLessonStatus = LessonMethods.getSelectedLessonStatusForCurrentUser(currentUser[lessonStatus], selectedLesson.Id);
      // attending === 1, maybe === 2, not === 3 if null, then all buttons live
      let buttonStatusObj = LessonMethods.getButtonStatusForLesson(userLessonStatus)
      
      return(
        <article className="card">
          <h5 className="fw600 ls14 fcGrey424041">Lesson Breakdown</h5>
          <hr className="mt10" />
          {/* <div className="fc-selectedLessonButtons"> */}
          <div className="grid grid--cols-3 fc-selectedLessonButtons">
            <div 
              className={buttonStatusObj.btnStyleForAttending}
              onClick={() => {updateSelectedLesson(selectedLesson, 1)}}
            >Attending
            </div>
            <div 
              className={buttonStatusObj.btnStyleForMaybeAttending}
              onClick={() => {updateSelectedLesson(selectedLesson, 2)}}
            >Maybe
            </div>
            <div 
              className={buttonStatusObj.btnStyleForNotAttending}
              onClick={() => {updateSelectedLesson(selectedLesson, 0)}}
            >Not Attending
            </div>
          </div>
          {/* </div> */}
          <hr className="mt10" />  
          <div className="fc-dateRow fc--disp-flex fc--fdir-row fc--fwrap-no fc--aItem-ce">
            <h1 className="fs60 ls44 fw300 fcGreenRT">{formattedDate['dateOfMonth']}</h1>
            <div className="fc-dateRowMonthYear fc--disp-flex fc--fdir-col fc--fwrap-no fc--aCont-sb">
              <h5 className="fw600 ls20 fs22 ttup fcGrey06">{formattedDate['monthAsString']}</h5>
              <h5 className="fw600 ls20 fs22 ttup fcGrey06">{formattedDate['year']}</h5>
            </div>
          </div>
          <hr />  
          <div className="fc-lessonInfoCont">
            <h6 className="fw300 ls18 fs22 fcBlack mt15">{selectedLesson[title]}</h6>
            <p className="fs16 fw300 ls10 fcGrey424041 mt10 wspl">{selectedLesson[description]}</p>
          </div>
          <hr className="mt20" />
          <div className="fc-taughtBy">
            <h5 className="fw300 ls18 fs22 ttup fcBlack mt10">Taught By:</h5>
            <LessonTaughtByThumbList taughtByUserArray={taughtByArrayOfUserObj}/>
          </div>
          <hr className="mt20"/>
          <div className="fc-usersAttending">
            <h5 className="fw300 ls18 fs22 ttup fcBlack mt10">Attending:</h5>
            <div className="fc-usersAttendingPortraits">
              <SelectedLessonDetailAttendeesList selectedLessonAttendeesArrayOfUserObj={selectedLessonAttendeesArrayOfUserObj}/>
            </div>
          </div>
        </article>
      )
    } else {
      return (  
        // <article className="card">
        //   <h5 className="fw600 ls14 fcGrey424041">Lesson Breakdown</h5>
        //   <hr className="mt10" />
        //   <h5 className="fw500 ls14 fcGrey424041 mt30 ta-cent">Uh Oh! There are no selected lessons!</h5>
        //   <p className="fs18 fw300 ls10 fcGrey81 mt15 ta-cent">
        //     To create a lesson, please select "Vote for Lessons" from the navigation panel.  On the subsequnet page, select the "Submit Lesson" and fill out the form.
        //     <br /><br />
        //     Afterwards, vote for lessons you would like to attend.  Lessons that receive 10 votes will be scheduled for the next available Saturday.
        //     <br /><br />
        //     Once there are scheduled lessons, you may select them from the list to the left and the details of the Lesson will appear here.
        //   </p>
        // </article>
        <DefaultMessage
          content={DEFAULT_MESSAGE_SCHEDULED_LESSONS_LESSON_BREAKDOWN_NOT_FOUND}
        />
      )
    }
}

export default SelectedLessonDetail;
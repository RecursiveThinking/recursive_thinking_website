import React from 'react';

import LessonMethods from '../../functions/lessonMethods'
import UtilityMethods from '../../functions/utilityMethods'

import LessonTaughtByThumbList from '../common/lesson/lessonTaughtByThumbList'
import CurrentUserVotedOnLessonButton from './currentUserVotedOnLessonButton'

import DM from '../../standards/dictModel'
import { ROUTES_REACT } from '../../standards/routes'

const unscheduledLessonListItem = ({currentUser, lesson, allUsersArr}) => {
  
  const { 
    lesson: {
      Id, 
      title, 
      description, 
      lessonTaughtBy, 
      lessonVotes 
    }, 
    user: { 
      userId, 
      admin, 
      _lessonCreatedBy 
    }
  } = DM
  
  let taughtByUserArray = LessonMethods.getArrayofTaughtByUserObjs(lesson[lessonTaughtBy], allUsersArr);
  // let taughtByUserArray = LessonMethods.getArrayofTaughtByUserObjs(lesson[lessonTaughtBy], Users);
  let voteCount = lesson[lessonVotes].length;
  // this uses includes array method to return true or false
  let boolHasCurrentUserVotedOnLesson = LessonMethods.hasCurrentUserVotedOnLesson(lesson, currentUser[userId]);
  // console.log(boolHasCurrentUserVotedOnLesson)
  let optionList = UtilityMethods.generateOptionsList(currentUser[userId], currentUser[admin], ROUTES_REACT.lessons_edit, lesson[_lessonCreatedBy], lesson[Id], 'fs20')
  
  return (
    <article className="card fc--disp-flex fc--fdir-col">
      <div className="grid grid--3of4">
        <div className="grid-cell">
          <h5 className="fw600 ls14 fcGrey424041">{lesson[title]}</h5>
        </div>
        <div className="grid-cell fc--disp-flex fc--jCont-fe fc--aItem-ce">
          <div className="listOptions fc--disp-flex">
            {optionList}
          </div>
        </div>
      </div>
      <hr className="mt20" />
      <p className="fc-lessonText fs16 fw300 ls10 fcGrey424041 mt10">{lesson[description]}</p>
      <hr className="mt10" />
      <div className="fc-taughtBy">
        <h5 className="fw300 ls18 fs22 ttup fcBlack mt10">Taught By:</h5>
        <LessonTaughtByThumbList taughtByUserArray={taughtByUserArray}/>
      </div>
      <hr className="mt10" />        
      <div className="fc-informationButtonDisplay mt20">
        {/* this is # of votes */}
        <h5 className="fw900 ls14 fcGreenRT">{voteCount} Votes</h5>
        <CurrentUserVotedOnLessonButton boolHasCurrentUserVotedOnLesson={boolHasCurrentUserVotedOnLesson} />
      </div>
    </article>
  )
}

export default unscheduledLessonListItem;
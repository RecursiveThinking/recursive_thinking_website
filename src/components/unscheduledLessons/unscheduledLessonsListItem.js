import React from 'react';

const Users = require('!json-loader!../../../data_returns/RecursiveThinkingDeveloperProfiles.json')

import LessonMethods from '../../functions/lessonMethods'
import UtilityMethods from '../../functions/utilityMethods'

import LessonTaughtByThumbList from '../common/lesson/lessonTaughtByThumbList'
import CurrentUserVotedOnLessonButton from './currentUserVotedOnLessonButton'

import DM from '../../standards/dictModel'

const unscheduledLessonListItem = ({currentUser, lesson}) => {
  
  const { lesson: { title, description, lessonTaughtBy, lessonVotes }, user: { userId, admin, _lessonCreatedBy }} = DM
  
  let taughtByUserArray = LessonMethods.getArrayofTaughtByUserObjs(lesson[lessonTaughtBy], Users);
  let voteCount = lesson[lessonVotes].length;
  // this uses includes array method to return true or false
  let boolHasCurrentUserVotedOnLesson = LessonMethods.hasCurrentUserVotedOnLesson(lesson, currentUser[userId]);
  // console.log(boolHasCurrentUserVotedOnLesson)
  let optionList = UtilityMethods.generateOptionsList(currentUser[userId], currentUser[admin], lesson[_lessonCreatedBy], 'fs28')
  
  return (
    <article className="card fc--disp-flex fc--fdir-col">
      <div className="grid grid--3of4">
        <div className="grid-cell">
          <h4 className="fs28 fw500 ls14 fcBlack">{lesson[title]}</h4>
        </div>
        <div className="grid-cell">
          <div className="fc--disp-flex fc--fdir-row fc--jCont-fe fc--aItem-ce">
            <div className="listOptions">
              {optionList}
            </div>
          </div>
        </div>
      </div>
      <hr className="mt20" />
      <p className="fc-lessonText fs16 fw300 ls10 fcBlack mt10">{lesson[description]}</p>
      <hr className="mt10" />
      <div className="fc-taughtBy">
        <h5 className="fw300 ls14 ttup fcBlack mt10">Taught By:</h5>
        <LessonTaughtByThumbList taughtByUserArray={taughtByUserArray}/>
      </div>
      <hr className="mt10" />        
      <div className="fc-informationButtonDisplay mt20">
        {/* this is # of votes */}
        <h4 className="fs28 fw900 ls18 fcGreenRT">{voteCount} Votes</h4>
        <CurrentUserVotedOnLessonButton boolHasCurrentUserVotedOnLesson={boolHasCurrentUserVotedOnLesson} />
      </div>
    </article>
  )
}

export default unscheduledLessonListItem;
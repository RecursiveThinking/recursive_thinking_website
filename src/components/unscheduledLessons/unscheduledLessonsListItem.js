import React from 'react';

const Users = require('!json-loader!../../../data_returns/RecursiveThinkingDeveloperProfiles.json')

import LessonMethods from '../../functions/lessonMethods'
import LessonTaughtByThumbList from '../common/lesson/lessonTaughtByThumbList'
import CurrentUserVotedOnLessonButton from './currentUserVotedOnLessonButton'

const unscheduledLessonListItem = ({currentUser, lesson}) => {
  // console.log('currUser', currentUser, currentUser['userId']);
  let taughtByArray = lesson['lessonTaughtBy']
  let taughtByUserArray = LessonMethods.getArrayofTaughtByUserObjs(taughtByArray, Users);
  let voteCount = lesson.lessonVotes.length;
  // this uses includes array method to return true or false
  let boolHasCurrentUserVotedOnLesson = LessonMethods.hasCurrentUserVotedOnLesson(lesson, currentUser['userId']);
  // console.log(boolHasCurrentUserVotedOnLesson)
  return (
    <article className="card fc--disp-flex fc--fdir-col">
      <h4 className="fs28 fw500 ls14 fcBlack">{lesson['title']}</h4>
      <hr className="mt20" />
      <p className="fc-lessonText fs16 fw300 ls10 fcBlack mt10">{lesson['description']}</p>
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
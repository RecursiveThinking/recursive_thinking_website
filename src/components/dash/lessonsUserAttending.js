import React from 'react';

import LessonsUserAttendingList from './lessonsUserAttendingList'

import DefaultMessage from '../defaults/defaultMessage/defaultMessage';
import { DEFAULT_MESSAGE_DASHBOARD_LESSONS_USER_ATTENDING_NOT_FOUND } from '../defaults/defaultMessage/defaultMessageContent/defaultMessageContent'
import { CARD_TITLE_DASHBOARD_IM_ATTENDING } from '../../components/common/content/contentInfo';


const lessonsUserAttending = ({lessonsAttendingArr}) => {
  // lessonsAttendingArr.length = 0;
  if(lessonsAttendingArr.length){
    const {
      title
    } = CARD_TITLE_DASHBOARD_IM_ATTENDING;
    return (
      <article className="card">
        <h5 className="fw700 ls14 ttup fcGrey424041">{title}</h5>
        <hr className="mt10" />
        <LessonsUserAttendingList lessonsAttending={lessonsAttendingArr}/>
      </article>
    )
  }
  else {
    return (
      <DefaultMessage
        content={DEFAULT_MESSAGE_DASHBOARD_LESSONS_USER_ATTENDING_NOT_FOUND}
      />
    )
  }
}

export default lessonsUserAttending;
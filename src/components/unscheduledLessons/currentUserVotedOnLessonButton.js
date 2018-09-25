import React from 'react';

const currentUserVotedOnLessonButton = ({boolHasCurrentUserVotedOnLesson}) => {
  // in this component - we get a boolean if the currentUser is in lessonVotedArray
  if(boolHasCurrentUserVotedOnLesson){
    // true - btnVoted then grey standard and red hover
    return (
      <button className="btn btnFillClrSchWarn btnOutlineClrSchUnavailable btnVoted fs20 fw500 ls12 ta-cent pdTB2LR5">Remove Vote</button>
    )
  } else {
    // false
    return (
      <button className="btn btnFillClrSchGreen00b371 fs20 fw500 ls12 ta-cent pdTB2LR5">Add Vote!</button>
    )
  }
}

export default currentUserVotedOnLessonButton;
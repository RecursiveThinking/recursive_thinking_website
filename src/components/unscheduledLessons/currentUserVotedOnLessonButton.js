import React from 'react';

const currentUserVotedOnLessonButton = ({boolHasCurrentUserVotedOnLesson, toggleLessonVote, lesson}) => {
  // in this component - we get a boolean if the currentUser is in lessonVotedArray
  if(boolHasCurrentUserVotedOnLesson){
    // true - btnVoted then grey standard and red hover
    return (
      <button 
        className="btn btnFillClrSchWarn btnOutlineClrSchUnavailable btnVoted fs16 fw500 ls12 ta-cent pdTB1p25LR2p5"
        onClick={() => {toggleLessonVote(lesson, 'remove')}}
      >Remove Vote</button>
    )
  } else {
    // false
    return (
      <button 
        className="btn btnFillClrSchGreen00b371 fs16 fw500 ls12 ta-cent pdTB1p25LR2p5"
        onClick={() => {toggleLessonVote(lesson, 'add')}}        
      >Add Vote!</button>
    )
  }
}

export default currentUserVotedOnLessonButton;
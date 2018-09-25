import React from 'react';

import InterviewQuestionsListItem from './interviewQuestionsListItem'

const interviewQuestionsList = ({...props}) => {
  let allInterviewQuestionsListJSX = props.allInterviewQuestionsArr.map(intQuestion => {
    return (
      <li key={intQuestion.Id} className="grid-cell">
        <InterviewQuestionsListItem intQuestion={intQuestion} lookupTableInterviewQuestionsAnswers={props.lookupTableInterviewQuestionsAnswers}/>
      </li>
    )
  })
  return (
    <ul className="grid grid--full">{allInterviewQuestionsListJSX}</ul>
  )
}

export default interviewQuestionsList;
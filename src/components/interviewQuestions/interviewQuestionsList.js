import React from 'react';

import InterviewQuestionsListItem from './interviewQuestionsListItem'

const interviewQuestionsList = ({...props}) => {
  let allInterviewQuestionsListJSX = props.allInterviewQuestionsArr.map(intQuestion => {
    return (
      <li key={intQuestion.Id} className="grid-cell">
        <InterviewQuestionsListItem 
          allUsersArr={props.allUsersArr}
          lookupTableUsers={props.lookupTableUsers}
          intQuestion={intQuestion}
          currentUser={props.currentUser}
          allInterviewQuestionsAnswersArr={props.allInterviewQuestionsAnswers}
          lookupTableInterviewQuestionsAnswers={props.lookupTableInterviewQuestionsAnswers}
        />
      </li>
    )
  })
  return (
    <ul className="grid grid--full">{allInterviewQuestionsListJSX}</ul>
  )
}

export default interviewQuestionsList;
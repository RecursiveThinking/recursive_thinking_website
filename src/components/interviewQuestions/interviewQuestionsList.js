import React from 'react';

import InterviewQuestionsListItem from './interviewQuestionsListItem'

const interviewQuestionsList = ({...props}) => {
  const {
    allUsersArr,
    lookupTableUsers,
    currentUser, 
    allInterviewQuestionsAnswers,
    lookupTableInterviewQuestionsAnswers,
    allSkillsArr,
    lookupTableAllSkills,
  } = props
  
  let allInterviewQuestionsListJSX = props.allInterviewQuestionsArr.map(intQuestion => {
    return (
      <li key={intQuestion.Id} className="grid-cell">
        <InterviewQuestionsListItem 
          allUsersArr={allUsersArr}
          lookupTableUsers={lookupTableUsers}
          intQuestion={intQuestion}
          currentUser={currentUser}
          allInterviewQuestionsAnswersArr={allInterviewQuestionsAnswers}
          lookupTableInterviewQuestionsAnswers={lookupTableInterviewQuestionsAnswers}
          allSkillsArr={allSkillsArr}
          lookupTableAllSkills={lookupTableAllSkills}
        />
      </li>
    )
  })
  return (
    <ul className="grid grid--full">{allInterviewQuestionsListJSX}</ul>
  )
}

export default interviewQuestionsList;
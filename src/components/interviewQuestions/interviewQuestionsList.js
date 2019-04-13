import React from 'react';

import InterviewQuestionsListItem from './interviewQuestionsListItem'

import DefaultMessage from '../../components/defaults/defaultMessage/defaultMessage';
import { DEFAULT_MESSAGE_INTERVIEW_QUESTIONS_NOT_FOUND } from '../../components/defaults/defaultMessage/defaultMessageContent/defaultMessageContent';

const interviewQuestionsList = ({...props}) => {
  let {
    allUsersArr,
    lookupTableAllUsers,
    currentUser,
    allInterviewQuestionsArr,
    allInterviewQuestionAnswersArr,
    lookupTableAllInterviewQuestionAnswers,
    allSkillsArr,
    lookupTableAllSkills,
  } = props
  // console.log('props: ', props)
  // allInterviewQuestionsArr = 0;
  if(allInterviewQuestionsArr.length){
    let allInterviewQuestionsListJSX = allInterviewQuestionsArr.map(intQuestion => {
      return (
        <li key={intQuestion.Id} className="grid-cell">
          <InterviewQuestionsListItem 
            currentUser={currentUser}
            allUsersArr={allUsersArr}
            lookupTableAllUsers={lookupTableAllUsers}
            intQuestion={intQuestion}
            allInterviewQuestionAnswersArr={allInterviewQuestionAnswersArr}
            lookupTableAllInterviewQuestionAnswers={lookupTableAllInterviewQuestionAnswers}
            allSkillsArr={allSkillsArr}
            lookupTableAllSkills={lookupTableAllSkills}
          />
        </li>
      )
    })
    return (
      <ul className="grid grid--full">{allInterviewQuestionsListJSX}</ul>
    )
  } else {
    return (
      <DefaultMessage
        content={DEFAULT_MESSAGE_INTERVIEW_QUESTIONS_NOT_FOUND}
      />
    )
  }
}

export default interviewQuestionsList;
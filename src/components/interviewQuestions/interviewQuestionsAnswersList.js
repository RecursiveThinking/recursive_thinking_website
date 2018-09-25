import React from 'react'

// import InterviewQuestionsAnswersListItem from './interviewQuestionsAnswersListItem'

import UtilityMethods from '../../functions/utilityMethods'
import DateMethods from '../../functions/dateMethods'

const AnswersToInterviewQuestions = require('!json-loader!../../../data_returns/RecursiveThinkingInterviewQuestionsAnswers.json');
const Users = require('!json-loader!../../../data_returns/RecursiveThinkingDeveloperProfiles.json')

const interviewQuestionsAnswersList = ({intQuestionAnswers}) => {
  console.log(intQuestionAnswers)
  let allAnswersArray = UtilityMethods.getArrayOfObjectsByKey(AnswersToInterviewQuestions, intQuestionAnswers)
  
  console.log('allAnswers', allAnswersArray)
  
  if(allAnswersArray.length === 0){
    // then render a no answers message
    return (
      <h1>No Messages</h1>
    )
  } else {
    // we have messages    
    let allAnswers = allAnswersArray.map(answer => {
      // get date in custom format
      let formattedDate = DateMethods.getFormattedDate(answer['createdAt']);
      // matches user Id to user obj, returns userObj
      let answerWrittenBy = UtilityMethods.getObjectByKey(Users, 'userId', answer['_createdByUser'])
      // this returns each li
      return (
        <li key={answer.Id} className="fc-answers">
          <div className="fc-author">
            <h5 className="colorBlack fw900">{answerWrittenBy['name']}</h5>
            <h5 className="h5TitleDate colorGray55 fw300">{formattedDate['upComingDateStringAmericanWithSlash']}</h5>
          </div>
          <p className="colorGray55 fw300">{answer['description']}</p>
          <hr />
        </li>
      );
    }) 
    return (
      // compiled List
      <ul>
        {allAnswers}
      </ul>
    )
  }
  
}

export default interviewQuestionsAnswersList;
import React from 'react'

import UtilityMethods from '../../functions/utilityMethods'
import DateMethods from '../../functions/dateMethods'

import { ROUTES_REACT } from '../../standards/routes'
import DM from '../../standards/dictModel'

const interviewQuestionsAnswersList = ({...props}) => {
  const {
    lookupTableUsers,
    intQuestionAnswers,
    lookupTableInterviewQuestionsAnswers,
    currentUser,
    intQuestionId
  } = props;
  const {
    intQuestionAnswer: {
      Id,
      description,
      _createdByUser,
      createdAt
    }
  } = DM;
  const {
    interviewquestionsanswers_edit,
    interviewquestionsanswers_delete
  } = ROUTES_REACT;

  let allAnswersArray = UtilityMethods.getArrayOfObjectsByKey(lookupTableInterviewQuestionsAnswers, intQuestionAnswers)
  
  if(allAnswersArray.length === 0){
    // then render a no answers message
    return (
      <h1>No Answers</h1>
    )
  } else {
    // we have messages    
    let allAnswers = allAnswersArray.map(answer => {
      // get date in custom format
      let formattedDate = DateMethods.getFormattedDate(answer[createdAt]);

      let answerWrittenByUser = ''
      if(lookupTableUsers[answer[_createdByUser]]){
        answerWrittenByUser = lookupTableUsers[answer[_createdByUser]].name
      }

      let optionList = UtilityMethods.generateOptionsListAnswers(currentUser.userId, currentUser.admin, intQuestionId, interviewquestionsanswers_edit, interviewquestionsanswers_edit, interviewquestionsanswers_delete, answer[_createdByUser], answer[Id], 'fs14')

      return (
        <li key={answer[Id]} className="fc-answers">
          <div className="grid grid--cols-2">
            <div className="grid-cell">
              <h6 className="fs16 fw900 ls10 fcBlack">{answerWrittenByUser}</h6>
            </div>
            <div className="grid-cell fc--disp-flex fc--jCont-fe fc--aItem-ce">
              <ul className="listOptions fc--disp-flex">
                {optionList}
              </ul>
              <h6 className="fs16 fcGrey55 fw300 ml20">{formattedDate['upComingDateStringAmericanWithSlash']}</h6>
            </div>
          </div>
          <p className="fs14 colorGray55 ls08 fw300">{answer[description]}</p>
          <hr />
        </li>
      );
    }) 
    return (
      // compiled List
      <ul className="mt20">
        <hr className="mb20" />
        {allAnswers}
      </ul>
    )
  }
  
}

export default interviewQuestionsAnswersList;
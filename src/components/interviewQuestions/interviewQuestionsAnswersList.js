import React from 'react'

// import InterviewQuestionsAnswersListItem from './interviewQuestionsAnswersListItem'

import UtilityMethods from '../../functions/utilityMethods'
import DateMethods from '../../functions/dateMethods'

import DM from '../../standards/dictModel'

// const AnswersToInterviewQuestions = require('!json-loader!../../../data_returns/RecursiveThinkingInterviewQuestionsAnswers.json');
// const Users = require('!json-loader!../../../data_returns/RecursiveThinkingDeveloperProfiles.json')

const interviewQuestionsAnswersList = ({...props}) => {
  // console.log(intQuestionAnswers)
  let allAnswersArray = UtilityMethods.getArrayOfObjectsByKey(props.lookupTableInterviewQuestionsAnswers, props.intQuestionAnswers)
  
  // console.log('allAnswers', allAnswersArray)
  
  if(allAnswersArray.length === 0){
    // then render a no answers message
    return (
      <h1>No Answers</h1>
    )
  } else {
    // we have messages    
    let allAnswers = allAnswersArray.map(answer => {
      // get date in custom format
      let formattedDate = DateMethods.getFormattedDate(answer['createdAt']);

      let answerWrittenByUser = ''
      if(props.lookupTableUsers[answer['_createdByUser']]){
        answerWrittenByUser = props.lookupTableUsers[answer['_createdByUser']].name
      }

      let optionList = UtilityMethods.generateOptionsList(props.currentUser.userId, props.currentUser.admin, answer['_createdByUser'], 'fs14')
      // console.log(optionList)
      // this returns each li
      return (
        <li key={answer.Id} className="fc-answers">
          {/* <div className="fc--disp-flex fc--fdir-row"> */}
            <div className="grid grid--cols-2">
              <div className="grid-cell">
                {/* <h5 className="colorBlack fw900">{answerWrittenBy.name}</h5> */}
                <h6 className="fs16 fw900 ls10 fcBlack">{answerWrittenByUser}</h6>
              </div>
              <div className="grid-cell">
                <div className="fc--disp-flex fc--fdir-row fc--jCont-fe fc--aItem-ce">
                  <div className="listOptions fc--disp-flex">
                    <ul>
                      {optionList}
                    </ul>
                  </div>
                  <h6 className="fs16 fcGrey55 fw300 ml20">{formattedDate['upComingDateStringAmericanWithSlash']}</h6>
                </div>
              </div>
            </div>
          {/* </div> */}
          <p className="fs14 colorGray55 ls08 fw300">{answer['description']}</p>
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
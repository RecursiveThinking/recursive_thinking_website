import React, {Component} from 'react';

import CategoryList from '../../components/common/category/categoryList'
import InterviewQuestionsAnswersList from './interviewQuestionsAnswersList'

import DM from '../../standards/dictModel'

import DateMethods from '../../functions/dateMethods'

const interviewQuestionsListItem = ({...props}) => {
  // need to make an array to pass to the categoryList
  let formattedDate = DateMethods.getFormattedDate(props.intQuestion[DM.intQuestion.createdAt])
  console.log(formattedDate)
  return (
    <article className="card fc--disp-flex fc--fdir-col">
      <div className="fc--disp-flex fc--jCont-sb fc--aItem-ce">
        <h5 className="fw500 ls18 fcGreyb9">{props.intQuestion[DM.intQuestion.title]}</h5>
        <h6 className="fs20 fw300 ls18 fcGrey64 ta-right">{formattedDate['upComingDateStringAmericanNaming']}</h6>
      </div>
      <hr className="mt20" />
      <p className="fs20 fw300 fcBlack mt20">
        {props.intQuestion[DM.intQuestion.description]}
      </p>
      <hr className="mt30"/>
      
      {/* this will be a list of category list items */}
      <CategoryList lessonCategories={props.intQuestion[DM.intQuestion.categories]} />
      
      <div className="mt20">
        <div className="fc-replies open">
          <h4 className="fs28 fw900 ls18 fcGreenRT">{props.intQuestion.answersToQuestion.length} Answers</h4>
          {/* turn this on to see answers #2 of 2 */}
          <div className="answers">
            {/* style="display: block;" */}
            {/* turn this on to NOT see answers #2 of 2 */}
            {/* <div class="answers"> */}
            {/* this is an array of Ids */}
            <InterviewQuestionsAnswersList
            // eh?
              intQuestionAnswers={props.intQuestion['answersToQuestion']}
              lookupTableInterviewQuestionsAnswers={props.lookupTableInterviewQuestionsAnswers}
            />
          </div>
          <button className="btn btnFillClrSchGreen00b371 fs20 fw500 pdTB15LR4">Answer Question</button>
        </div>
      </div>
    </article>
  )
}

export default interviewQuestionsListItem
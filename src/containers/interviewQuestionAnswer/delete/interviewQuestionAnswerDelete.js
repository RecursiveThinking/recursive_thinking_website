import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { 
  interviewQuestionGetById, interviewQuestionEditById, 
  interviewQuestionAnswerGetById, interviewQuestionAnswerDeleteById 
} from '../../../actions/index';

import DefaultLoadingPage from '../../../components/defaults/loadingPage/loadingPage';
// import DefaultErrorPage from '../../../components/defaults/errorPage/errorPage';
import DefaultMessage from '../../../components/defaults/defaultMessage/defaultMessage'
import { DEFAULT_MESSAGE_INTERVIEW_QUESTION_ANSWER_BY_ID_ITEM_NOT_FOUND } from '../../../components/defaults/defaultMessage/defaultMessageContent/defaultMessageContent'

import { CARD_TITLE_INTERVIEW_QUESTION_ANSWER_EDIT_BY_ID } from '../../../components/common/content/contentInfo'

import { ROUTES_REACT } from '../../../standards/routes';

import DM from '../../../standards/dictModel';

class InterviewQuestionAnswerDelete extends Component {
  constructor(props){
    super(props);
    this.state = {
      // showModalIQAnswerDelete: true
    }
  }
  
  componentDidMount(){
    this.props.interviewQuestionGetById(this.props.match.params.questId)    
    this.props.interviewQuestionAnswerGetById(this.props.match.params.ansId)
    console.log('props @ CDM InterviewQuestionAnswerDelete: ', this.props)
  }
  
  deleteInterviewQuestionAnswer = (intQuest, intQuestAns) => {
    const { intQuestion: { answersToQuestion } } = DM;
    let intQuestToUpdate = { ...intQuest }
    // console.log('intQuest Ans Arr Before: ', temp)
    intQuestToUpdate[answersToQuestion] = intQuestToUpdate[answersToQuestion].filter(intQuestAnsArrItem =>
      intQuestAnsArrItem !== intQuestAns.Id
    )
    // console.log('intQuest Ans Arr After: ', temp)    
    this.props.interviewQuestionEditById(intQuestToUpdate);
    this.props.interviewQuestionAnswerDeleteById(intQuestAns, intQuest.Id);
  }
    
  render(){
    // console.log('================================================')
    // console.log('props @ IntQuestAnsDelete: ', this.props);
    // console.log('questId', this.props.match.params.questId, 'ansId', this.props.match.params.ansId);
    const {
      interviewQuestions: { isGettingInterviewQuestionById, interviewQuestionById },
      interviewQuestionAnswers: { isGettingInterviewQuestionAnswerById, interviewQuestionAnswerById }
    } = this.props
    console.log('What is : ', isGettingInterviewQuestionById || isGettingInterviewQuestionAnswerById)
    // this will need interviewQuestion, interviewQuestionAnswer, currentUser
    if(isGettingInterviewQuestionById || isGettingInterviewQuestionAnswerById){
      const { 
        title, classNameTxt
      } = CARD_TITLE_INTERVIEW_QUESTION_ANSWER_EDIT_BY_ID
      return (
        <DefaultLoadingPage 
          title={title}
          classNameTxt={classNameTxt}
        />
      )
    }
    else if(!interviewQuestionById || !interviewQuestionAnswerById){
      return (
        <DefaultMessage
          content={DEFAULT_MESSAGE_INTERVIEW_QUESTION_ANSWER_BY_ID_ITEM_NOT_FOUND}
        />
      )
    }
    else if(!isGettingInterviewQuestionById && !isGettingInterviewQuestionAnswerById){
      console.log('interviewQuestionAnswerById: ', interviewQuestionAnswerById)
      const { interviewquestions } = ROUTES_REACT;
      return (
        <article className="card">
          <div className="grid grid--full">
            <div className="grid-cell">
              <fieldset className="fc--disp-flex fc--fdir-col fc--aItem-ce noMargin">
                <h5 className="fw600 ls12 fcGrey424041">Interview Question Answer Information: </h5>
                <hr className="modalHR mt10" />
                  <div className="fc-fieldset">
                    <div className="fc-field fc--disp-flex fc--fdir-col fc--jCont-ce width100P">
                      <div className="fc-field-row-full fc--disp-flex fc--fdir-row mt10">
                        <label htmlFor="">Answer:</label>
                      </div>
                      <div className="fc-field-row-full fc--disp-flex fc--fdir-row mt10">
                        <p className="fs16 fw300 ls10 fcGrey424041 mt10">
                          {interviewQuestionAnswerById.description}
                        </p>
                      </div>                 
                    </div>
                  </div>
                  <hr className="modalHR mt80" />
                  <div className="ta-cent">
                    <Link
                      className=""
                      to={ interviewquestions }
                    >
                      <button className="btn btnFillGreyB9 pdTB2LR8 fs20 fw500 ls12 mt30">Cancel</button>
                    </Link>
                    <button 
                      className="btn btnFillClrSchWarn pdTB2LR8 fs20 fw500 ls12 ml20 mt30"
                      onClick={() => {this.deleteInterviewQuestionAnswer(interviewQuestionById, interviewQuestionAnswerById)}}
                    >Delete Answer</button>
                  </div>
              </fieldset>
            </div>
          </div>
        </article>
      )
    }
  }
}

function mapStateToProps(state, ownProps){
  return {
    // currentUser: state.auth.currentUser,    
    // interviewQuestionById: state.interviewQuestions.lookupTableInterviewQuestions[ownProps.match.params.questId],
    // interviewQuestionAnswerById: state.interviewQuestionsAnswers.lookupTableInterviewQuestionsAnswers[ownProps.match.params.ansId]
    interviewQuestions: state.interviewQuestions,
    interviewQuestionAnswers: state.interviewQuestionAnswers
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({ interviewQuestionGetById, interviewQuestionEditById, interviewQuestionAnswerGetById, interviewQuestionAnswerDeleteById }, dispatch)
}

export default connect( mapStateToProps, mapDispatchToProps )(InterviewQuestionAnswerDelete)
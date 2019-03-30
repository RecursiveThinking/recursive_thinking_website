import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { 
  getInterviewQuestionById,
  editInterviewQuestionById, 
  getInterviewQuestionAnswerById, 
  deleteInterviewQuestionAnswerById 
} from '../../../actions/index';

import DefaultLoadingPage from '../../../components/defaults/loadingPage/loadingPage';

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
    this.props.getInterviewQuestionById(this.props.match.params.questId)    
    this.props.getInterviewQuestionAnswerById(this.props.match.params.ansId)
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
    this.props.editInterviewQuestionById(intQuestToUpdate);
    this.props.deleteInterviewQuestionAnswerById(intQuestAns, intQuest.Id);
  }
  
  renderContent(){
    
    if(!this.props.interviewQuestionAnswerById || !this.props.interviewQuestionById){
      return (
        <DefaultLoadingPage />
      )
    } else {
      // const { questId, ansId } = this.props.match.params;
      // console.log('')
      // console.log('questionId: ', questId, 'answerId: ', ansId)
      const {
        interviewQuestionById,
        interviewQuestionAnswerById
      } = this.props;
      console.log('interviewQuestionAnswerById: ', interviewQuestionAnswerById)
      const { interviewquestions } = ROUTES_REACT;
      return(
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
    
  render(){
    console.log('================================================')
    console.log('props @ IntQuestAnsDelete: ', this.props);
    console.log('questId', this.props.match.params.questId, 'ansId', this.props.match.params.ansId);
    return (
      <section style={{padding: '1.5rem 1.5rem'}}>
        {this.renderContent()}
      </section>
    )
  //   return(
  //     <section>
  //       {
  //         this.state.showModalIQAnswerDelete &&
          
  //         <ModalDelete 
  //           onCloseRequest={() => this.handleToggleModalIQADelete()}
  //           content={this.renderContent()}
  //           buttons={this.renderModalButtons()}
  //         />
  //       }
  //     </section>
  //   )
  }
}

function mapStateToProps(state, ownProps){
  return {
    // interviewQuestionById: state.interviewQuestions.lookupTableInterviewQuestions[ownProps.match.params.questId],
    // interviewQuestionAnswerById: state.interviewQuestionsAnswers.lookupTableInterviewQuestionsAnswers[ownProps.match.params.ansId]
    interviewQuestionById: state.interviewQuestions.interviewQuestionById,
    interviewQuestionAnswerById: state.interviewQuestionsAnswers.interviewQuestionAnswerById
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({ getInterviewQuestionById, editInterviewQuestionById, getInterviewQuestionAnswerById, deleteInterviewQuestionAnswerById }, dispatch)
}

export default connect( mapStateToProps, mapDispatchToProps )(InterviewQuestionAnswerDelete)
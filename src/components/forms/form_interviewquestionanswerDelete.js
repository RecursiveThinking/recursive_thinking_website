import React, { Component } from 'react';
import ModalDelete from '../common/modal/modalDelete';

import { connect } from 'react-redux';
import { 
  getInterviewQuestionById, 
  getInterviewQuestionAnswerById, 
  deleteInterviewQuestionAnswerById 
} from '../../actions/index';

import { Link } from 'react-router-dom';

import { ROUTES_REACT } from '../../standards/routes';
import DM from '../../standards/dictModel';

class InterviewQuestionAnswerDelete extends Component {
  constructor(props){
    super(props);
    this.state = {
      showModalIQAnswerDelete: true
    }
  }
  
  handleToggleModalIQADelete(){
    this.setState({showModalIQAnswerDelete: !this.state.showModalIQAnswerDelete})
  }
  
  componentDidMount(){
    console.log('props @ CDM InterviewQuestionAnswerDelete: ', this.props)
    this.props.getInterviewQuestionById(this.props.match.params.questId)    
    this.props.getInterviewQuestionAnswerById(this.props.match.params.ansId)
  }
  
  deleteInterviewQuestionAnswer(questionId, questionObj, answerId){
    const {
      intQuestion: {
        answersToQuestion
      }
    } = DM;
    console.log('questionATQ: ', questionObj[answersToQuestion])
    // need a new method 
    // this.props.updateInterviewQuestionById(questionObj);
    this.props.deleteInterviewQuestionAnswerById(answerId);
  }
  
  renderModalButtons(){
    const { questId, ansId } = this.props.match.params;
    const {
      interviewQuestionById,
      interviewQuestionAnswerById
    } = this.props;
    const { interviewquestions } = ROUTES_REACT;
    return (
      <>
        <Link
          className=""
          to={interviewquestions}
        >Cancel</Link>
        <button
          className=""
          // onClick={() => {this.props.deleteInterviewQuestionAnswer(questId, interviewQuestionById, ansId)}}
        >Delete</button>
      </>
    )
  }
  
  renderContent(){
    
    if(!this.props.interviewQuestionAnswerById && !this.props.interviewQuestionById){
      return (
        <div>Loading!!!</div>
      )
    }
    const {
      interviewQuestionById,
      interviewQuestionAnswerById
    } = this.props;
    return(
      <fieldset className="fc--disp-flex fc--fdir-col fc--aItem-ce">
        <h2 className="fs33 fw300 ls24 fcBlack ta-cent">Delete An Interview Question Answer</h2>
        <hr className="modalHR mt10" />
        <h4 className="fs18 fw500 ls24 fcBlack ta-cent">Are you sure you want to delete the Interview Question Answer:</h4>
        <h3 className="fs22 fw300 ls24 fcBlack ta-cent">{interviewQuestionAnswerById.description}</h3>
      </fieldset>
    )
    
  }
  
  render(){
    console.log('================================================')
    console.log('props @ IntQuestAnsDelete: ', this.props);
    console.log('questId', this.props.match.params.questId, 'ansId', this.props.match.params.ansId);
    return(
      <section>
        {
          this.state.showModalIQAnswerDelete &&
          
          <ModalDelete 
            onCloseRequest={() => this.handleToggleModalIQADelete()}
            content={this.renderContent()}
            buttons={this.renderModalButtons()}
          />
        }
      </section>
    )
  }
}

function mapStateToProps(state, ownProps){
  return {
    interviewQuestionById: state.interviewQuestions.lookupTableInterviewQuestions[ownProps.match.params.questId],
    interviewQuestionAnswerById: state.interviewQuestionsAnswers.lookupTableInterviewQuestionsAnswers[ownProps.match.params.ansId]
  }
}

export default connect(mapStateToProps, { getInterviewQuestionById, getInterviewQuestionAnswerById, deleteInterviewQuestionAnswerById})(InterviewQuestionAnswerDelete)
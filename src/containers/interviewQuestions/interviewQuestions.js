import React, {Component} from 'react';
import { connect } from 'react-redux'

import { fetchInterviewQuestions, fetchInterviewQuestionsAnswers } from '../../actions/index'
import InterviewQuestionsList from '../../components/interviewQuestions/interviewQuestionsList';

// const InterviewQuestions = require('!json-loader!../../../data_returns/RecursiveThinkingInterviewQuestions.json');

class InterviewQuestions extends Component {
  componentDidMount(){
    this.props.fetchInterviewQuestions();
    this.props.fetchInterviewQuestionsAnswers();
  }
  
  render(){
    console.log('props', this.props)
    return (
      <main>
        <div className="dropdown">
          <div className="grid grid--full">
            <div className="grid-cell">
              <article className="cardFull ta-cent">
                <h3 className="fs33 fw300 ls14 fcBlack">Have you come across an interview question you would like to share?</h3>
                <h2 className="fs50 fw300 ls14 fcBlack mt15">Submit an Interview Question</h2>
                <button className="btn btnFillClrSchGreen00b371 pdTB2LR8 fs20 fw500 ls12 mt35">Submit Interview Question</button>
              </article>
            </div>
          </div>
        </div>
        <div className="contentList">
          <InterviewQuestionsList 
            allInterviewQuestionsArr={this.props.allInterviewQuestions} 
            lookupTableInterviewQuestions={this.props.lookupTableInterviewQuestions}
            allInterviewQuestionsAnswersArr={this.props.allInterviewQuestionsAnswers}
            lookupTableInterviewQuestionsAnswers={this.props.lookupTableInterviewQuestionsAnswers}
            currentUser={this.props.currentUser}
          />
        </div>
      </main>
    )
  }
}

function mapStateToProps(state){
  return {
    allInterviewQuestions: state.interviewQuestions.allInterviewQuestions,
    lookupTableInterviewQuestions: state.interviewQuestions.lookupTableInterviewQuestions,
    allInterviewQuestionsAnswers: state.interviewQuestionsAnswers.allInterviewQuestionsAnswers,
    lookupTableInterviewQuestionsAnswers: state.interviewQuestionsAnswers.lookupTableInterviewQuestionsAnswers,
    currentUser: state.currentUser
  }
}

export default connect(mapStateToProps, {fetchInterviewQuestions, fetchInterviewQuestionsAnswers})(InterviewQuestions);
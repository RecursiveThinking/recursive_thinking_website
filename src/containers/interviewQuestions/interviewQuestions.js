import React, {Component} from 'react';
import { connect } from 'react-redux'

import { fetchUsers, fetchInterviewQuestions, fetchInterviewQuestionsAnswers } from '../../actions/index'
import InterviewQuestionsList from '../../components/interviewQuestions/interviewQuestionsList';

import Modal from '../../components/common/modal/modal'
import { SubmitInterviewQuestionFormEx } from '../../components/forms/forms_modals'

class InterviewQuestions extends Component {
  constructor(props){
    super(props)
    
    this.state = {
      showModalQuestion: false,
    }
  }
  
  componentDidMount(){
    this.props.fetchUsers();
    this.props.fetchInterviewQuestions();
    this.props.fetchInterviewQuestionsAnswers();
  }
  
  handleToggleModalQuestion(){
    this.setState({ showModalQuestion: !this.state.showModalQuestion });
  }
  
  render(){
    const { allUsers, lookupTableUsers, allInterviewQuestions, lookupTableInterviewQuestions, allInterviewQuestionsAnswers, lookupTableInterviewQuestionsAnswers, currentUser } = this.props;
    return (
      <main>
        <div className="dropdown">
          <div className="grid grid--full">
            <div className="grid-cell">
              <article className="cardFull ta-cent">
                <h3 className="fs33 fw300 ls14 fcBlack">Have you come across an interview question you would like to share?</h3>
                <h2 className="fs50 fw300 ls14 fcBlack mt15">Submit an Interview Question</h2>
                <button onClick={() => this.handleToggleModalQuestion()} className="btn btnFillClrSchGreen00b371 pdTB2LR8 fs20 fw500 ls12 mt35">Submit Interview Question</button>
                { 
                  this.state.showModalQuestion &&
                    
                  <Modal 
                    onCloseRequest={() => this.handleToggleModalQuestion()}
                    content={<SubmitInterviewQuestionFormEx />}
                  />
                }
              </article>
            </div>
          </div>
        </div>
        <div className="contentList">
          <InterviewQuestionsList
            allUsersArr={allUsers}
            lookupTableUsers={lookupTableUsers}
            allInterviewQuestionsArr={allInterviewQuestions} 
            lookupTableInterviewQuestions={lookupTableInterviewQuestions}
            allInterviewQuestionsAnswersArr={allInterviewQuestionsAnswers}
            lookupTableInterviewQuestionsAnswers={lookupTableInterviewQuestionsAnswers}
            currentUser={currentUser}
          />
        </div>
      </main>
    )
  }
}

function mapStateToProps(state){
  return {
    allUsers: state.users.allUsers,
    lookupTableUsers: state.users.lookupTableAllUsers,
    allInterviewQuestions: state.interviewQuestions.allInterviewQuestions,
    lookupTableInterviewQuestions: state.interviewQuestions.lookupTableInterviewQuestions,
    allInterviewQuestionsAnswers: state.interviewQuestionsAnswers.allInterviewQuestionsAnswers,
    lookupTableInterviewQuestionsAnswers: state.interviewQuestionsAnswers.lookupTableInterviewQuestionsAnswers,
    currentUser: state.currentUser
  }
}

export default connect(mapStateToProps, {fetchUsers, fetchInterviewQuestions, fetchInterviewQuestionsAnswers})(InterviewQuestions);
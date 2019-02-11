import React, { Component } from 'react'

import { connect } from 'react-redux';
import { createInterviewQuestionAnswer } from '../../actions'

import InterviewQuestionAnswerForm from './form_interviewquestionanswer';
import { InterviewQuestionAnswer } from '../../models/models'
import { fetchCurrentUser } from '../../actions/index'

class InterviewQuestionCreate extends Component {
  componentDidMount(){
    this.props.fetchCurrentUser();
  }
  
  onSubmit = (formValues) => {
    const createdByUserId = this.props.currentUser.attributes.sub;
    console.log('formVals @ intQuestCreate Component: ', formValues, createdByUserId)
    const newInterviewQuestionAnswer = new InterviewQuestionAnswer(formValues.intQuestionTitle, formValues.intQuestionDescription, createdByUserId)
    this.props.createInterviewQuestionAnswer(newInterviewQuestionAnswer)
  }
  
  render(){
    return (
      <>
        <InterviewQuestionAnswerForm
          onSubmit={this.onSubmit}
        />
      </>
    )
  }
}

function mapStateToProps(state){
  return {
    currentUser: state.auth.currentUser
  }
}

export default connect(
  mapStateToProps,
  { createInterviewQuestionAnswer, fetchCurrentUser }
)(InterviewQuestionCreate)
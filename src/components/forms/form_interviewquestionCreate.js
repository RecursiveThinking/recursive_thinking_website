import React, { Component } from 'react'

import { connect } from 'react-redux';
// import { createInterviewQuestion } from '../../actions'

import InterviewQuestionForm from './form_interviewquestion';
import { FORM_HEADING_INTERVIEWQUESTION_CREATE } from '../common/formContent/formContent';
import { InterviewQuestion } from '../../models/models'

import { getCurrentUserById, createInterviewQuestion } from '../../actions/index'

class InterviewQuestionCreate extends Component {
  componentDidMount(){
    this.props.getCurrentUserById();
  }
  
  onSubmit = (formValues) => {
    // const createdByUserId = this.props.currentUser.attributes.sub;
    const createdByUserId = this.props.currentUser.userId;
    console.log('formVals @ intQuestCreate Component: ', formValues, createdByUserId)
    const newInterviewQuestion = new InterviewQuestion(formValues.interviewQuestionTitle, formValues.interviewQuestionDetails, [], createdByUserId)
    console.log('newIntQuest @ intQuestCreate: ', newInterviewQuestion)
    this.props.createInterviewQuestion(newInterviewQuestion)
  }
  
  render(){
    return (
      <>
        <InterviewQuestionForm
          onSubmit={this.onSubmit}
          content={FORM_HEADING_INTERVIEWQUESTION_CREATE}
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
  { createInterviewQuestion, getCurrentUserById }
)(InterviewQuestionCreate)
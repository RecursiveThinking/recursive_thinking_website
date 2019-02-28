import React, { Component } from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { getCurrentUserById, createInterviewQuestion } from '../../../actions/index'

import { FORM_HEADING_INTERVIEWQUESTION_CREATE } from '../../../components/forms/formContent/formContent';
import InterviewQuestionForm from '../../../components/forms/form_interviewquestion';

import { InterviewQuestion } from '../../../models/models'

class InterviewQuestionCreate extends Component {
  componentDidMount(){
    this.props.getCurrentUserById();
  }
  
  onSubmit = (formValues) => {
    // const createdByUserId = this.props.currentUser.attributes.sub;
    const createdByUserId = this.props.currentUser.userId;
    console.log('formVals @ intQuestCreate Component: ', formValues, createdByUserId)
    const newInterviewQuestion = new InterviewQuestion(formValues.interviewQuestionTitle, formValues.interviewQuestionDetails, [], createdByUserId)
    console.log('newIntQuest @ intQuestCreate: ', JSON.stringify(newInterviewQuestion))
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

function mapDispatchToProps(dispatch){
  return bindActionCreators({ createInterviewQuestion, getCurrentUserById }, dispatch);
}

export default connect( mapStateToProps, mapDispatchToProps )(InterviewQuestionCreate)
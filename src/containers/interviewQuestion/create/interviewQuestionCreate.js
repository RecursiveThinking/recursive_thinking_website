import React, { Component } from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { getCurrentUserById, createInterviewQuestion, fetchSkills } from '../../../actions/index'

import { FORM_HEADING_INTERVIEWQUESTION_CREATE } from '../../../components/forms/formContent/formContent';
import InterviewQuestionForm from '../../../components/forms/form_interviewquestion';

import { InterviewQuestion } from '../../../models/models'

class InterviewQuestionCreate extends Component {
  componentDidMount(){
    this.props.getCurrentUserById();
    this.props.fetchSkills();
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
    const {
      allSkills
    } = this.props;
    return (
      <>
        <InterviewQuestionForm
          onSubmit={this.onSubmit}
          content={FORM_HEADING_INTERVIEWQUESTION_CREATE}
          allSkills={allSkills}
        />
      </>
    )
  }
}

function mapStateToProps(state){
  return {
    currentUser: state.auth.currentUser,
    allSkills: state.skills.allSkills
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({ createInterviewQuestion, getCurrentUserById, fetchSkills }, dispatch);
}

export default connect( mapStateToProps, mapDispatchToProps )(InterviewQuestionCreate)
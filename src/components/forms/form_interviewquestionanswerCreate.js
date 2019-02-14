import React, { Component } from 'react'

import { connect } from 'react-redux';

import InterviewQuestionAnswerForm from './form_interviewquestionanswer';
import { InterviewQuestionAnswer } from '../../models/models'
import { getCurrentUserById, getInterviewQuestionById, createInterviewQuestionAnswer } from '../../actions/index'
import { FORM_HEADING_INTERVIEWQUESTIONANSWER_CREATE } from '../common/formContent/formContent'


class InterviewQuestionCreate extends Component {
  componentDidMount(){
    this.props.getCurrentUserById();
    this.props.getInterviewQuestionById(this.props.match.params.id);
  }
  
  onSubmit = (formValues) => {
    const createdByUserId = this.props.currentUser.userId;
    console.log('formVals @ intQuestAnswerCreate Component: ', formValues, createdByUserId)
    const newInterviewQuestionAnswer = new InterviewQuestionAnswer(formValues.interviewQuestionAnswerDescription, createdByUserId)
    this.props.createInterviewQuestionAnswer(newInterviewQuestionAnswer)
  }
  
  render(){
    console.log('props @ IntQuestAnswerCreate: ', this.props);
    console.log('params: ', this.props.match.params.id);
    if(!this.props.interviewQuestionById){
      return (
        <div>
          Loading!
        </div>
      )
    }
    const {
      allSkills,
      lookupTableAllSkills,
      currentUser,
      interviewQuestionById
    } = this.props;
    return (
      <>
        <InterviewQuestionAnswerForm
          onSubmit={this.onSubmit}
          content={FORM_HEADING_INTERVIEWQUESTIONANSWER_CREATE}
          intQuestion={interviewQuestionById}
          currentUser={currentUser}
          allSkillsArr={allSkills}
          lookupTableAllSkills={lookupTableAllSkills}
        />
      </>
    )
  }
}

function mapStateToProps(state, ownProps){
  return {
    currentUser: state.auth.currentUser,
    allSkills: state.skills.allSkills,
    lookupTableAllSkills: state.skills.lookupTableAllSkills,
    interviewQuestionById: state.interviewQuestions.lookupTableInterviewQuestions[ownProps.match.params.id]
  }
}

export default connect(
  mapStateToProps,
  { getCurrentUserById, getInterviewQuestionById, createInterviewQuestionAnswer }
)(InterviewQuestionCreate)
import React, { Component } from 'react';

import { connect } from 'react-redux';
import { getInterviewQuestionById, getInterviewQuestionAnswerById, editInterviewQuestionAnswerById } from '../../actions';

import InterviewQuestionAnswerForm from './form_interviewquestionanswer';
import { FORM_HEADING_INTERVIEWQUESTIONANSWER_EDIT } from './formContent/formContent'

import DefaultLoadingPage from '../defaults/loadingPage/loadingPage';

class InterviewQuestionAnswerEdit extends Component {
  componentDidMount(){
    this.props.getInterviewQuestionById(this.props.match.params.questId)
    this.props.getInterviewQuestionAnswerById(this.props.match.params.ansId)
  }
  
  onSubmit = (formValues) => {
    console.log('formVals @ InterviewQuestionAnswer Edit', formValues)
    // interviewQuestionAnswerDescription: "Here is an answer to build an accordian234234234"
    // get interview question answer
    console.log('intQuestAns @ onSubmit: ', this.props.interviewQuestionAnswerById)
    let newInterviewQuestionAnswer = { ...this.props.interviewQuestionAnswerById };
    newInterviewQuestionAnswer.description = formValues.interviewQuestionAnswerDescription;
    // action creator
    this.props.editInterviewQuestionAnswerById(newInterviewQuestionAnswer, this.props.interviewQuestionById.Id)
  }
  
  render(){
    console.log('props @ IntQuestAnsEdit: ', this.props);
    console.log('params', this.props.match.params.id);
    // if no intQuestionAnswer
    if(!this.props.interviewQuestionAnswerById || !this.props.interviewQuestionById){
      return (
        // <div>Loading!!!</div>
        <section style={{padding: '1.5rem 1.5rem'}}>
          <DefaultLoadingPage />
        </section>
      )
    }
    const {
      description
    } = this.props.interviewQuestionAnswerById
    const {
      interviewQuestionById,
      allSkills,
      lookupTableAllSkills
    } = this.props
    return(
      <>
        <InterviewQuestionAnswerForm
          onSubmit={this.onSubmit}
          content={FORM_HEADING_INTERVIEWQUESTIONANSWER_EDIT}
          intQuestion={interviewQuestionById}
          initialValues={{
            interviewQuestionAnswerDescription: description
          }}
          allSkillsArr={allSkills}
          lookupTableAllSkills={lookupTableAllSkills}
        />
      </>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    allSkills: state.skills.allSkills,
    lookupTableAllSkills: state.skills.lookupTableAllSkills,
    interviewQuestionById: state.interviewQuestions.lookupTableInterviewQuestions[ownProps.match.params.questId],
    interviewQuestionAnswerById: state.interviewQuestionsAnswers.lookupTableInterviewQuestionsAnswers[ownProps.match.params.ansId]
  }
}

export default connect(mapStateToProps, {
  getInterviewQuestionById, getInterviewQuestionAnswerById, editInterviewQuestionAnswerById
})(InterviewQuestionAnswerEdit)
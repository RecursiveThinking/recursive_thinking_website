import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { getCurrentUserById, getInterviewQuestionById, getInterviewQuestionAnswerById, editInterviewQuestionAnswerById, fetchSkills } from '../../../actions';
import { FETCHING } from '../../../actions/action_types'

import DefaultLoadingPage from '../../../components/defaults/loadingPage/loadingPage';

import { FORM_HEADING_INTERVIEWQUESTIONANSWER_EDIT } from '../../../components/forms/formContent/formContent'
import InterviewQuestionAnswerForm from '../../../components/forms/form_interviewquestionanswer';

class InterviewQuestionAnswerEdit extends Component {
  componentDidMount(){
    this.props.getInterviewQuestionById(this.props.match.params.questId);
    this.props.getInterviewQuestionAnswerById(this.props.match.params.ansId);
    this.props.fetchSkills();
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
    console.log('questId: ', this.props.match.params.questId, 'ansId: ', this.props.match.params.ansId);
    // if no intQuestionAnswer
    if(this.props.interviewQuestionAnswerById === FETCHING || this.props.interviewQuestionById === FETCHING || this.props.fetchSkills === FETCHING){
    // if(!this.props.interviewQuestionAnswerById || !this.props.interviewQuestionById || !this.props.fetchSkills){
      return (
        // <div>Loading!!!</div>
        <section style={{padding: '1.5rem 1.5rem'}}>
          <DefaultLoadingPage />
        </section>
      )
    } else {
      
      const {
        description
      } = this.props.interviewQuestionAnswerById
      const {
        allSkills,
        lookupTableAllSkills,
        currentUser,
        interviewQuestionById
      } = this.props
      return(
        <>
          <InterviewQuestionAnswerForm
            onSubmit={this.onSubmit}
            content={FORM_HEADING_INTERVIEWQUESTIONANSWER_EDIT}
            intQuestion={interviewQuestionById}
            currentUser={currentUser}
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
}

function mapStateToProps(state, ownProps){
  return {
    currentUser: state.auth.currentUser,
    allSkills: state.skills.allSkills,
    lookupTableAllSkills: state.skills.lookupTableAllSkills,
    // interviewQuestionById: state.interviewQuestions.lookupTableInterviewQuestions[ownProps.match.params.questId],
    // interviewQuestionAnswerById: state.interviewQuestionsAnswers.lookupTableInterviewQuestionsAnswers[ownProps.match.params.ansId]
    interviewQuestionById: state.interviewQuestions.interviewQuestionById,
    interviewQuestionAnswerById: state.interviewQuestionsAnswers.interviewQuestionAnswerById
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({ getCurrentUserById, getInterviewQuestionById, getInterviewQuestionAnswerById, editInterviewQuestionAnswerById, fetchSkills }, dispatch)
}

export default connect( mapStateToProps, mapDispatchToProps )(InterviewQuestionAnswerEdit)
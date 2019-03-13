import React, { Component } from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { getCurrentUserById, getInterviewQuestionById, createInterviewQuestionAnswer, editInterviewQuestionById, fetchSkills } from '../../../actions/index'
import { FETCHING } from '../../../actions/action_types'

import DefaultLoadingPage from '../../../components/defaults/loadingPage/loadingPage'

import { FORM_HEADING_INTERVIEWQUESTIONANSWER_CREATE } from '../../../components/forms/formContent/formContent'
import InterviewQuestionAnswerForm from '../../../components/forms/form_interviewquestionanswer';

import { InterviewQuestionAnswer } from '../../../models/models'

class InterviewQuestionCreate extends Component {
  componentDidMount(){
    this.props.getCurrentUserById();
    this.props.getInterviewQuestionById(this.props.match.params.id);
    this.props.fetchSkills();
  }
  
  onSubmit = (formValues) => {
    const createdByUserId = this.props.currentUser.userId;
    console.log('formVals @ intQuestAnswerCreate Component: ', formValues, createdByUserId)
    const newInterviewQuestionAnswer = new InterviewQuestionAnswer(formValues.interviewQuestionAnswerDescription, createdByUserId)
    console.log('newIntQuestAns JSON: ', JSON.stringify(newInterviewQuestionAnswer));
    
    let editInterviewQuestion = {...this.props.interviewQuestionById};
    editInterviewQuestion.answersToQuestion.push(newInterviewQuestionAnswer.Id)
    console.log('editIntQuest: ', editInterviewQuestion)
    this.props.editInterviewQuestionById(editInterviewQuestion);
    
    this.props.createInterviewQuestionAnswer(newInterviewQuestionAnswer, editInterviewQuestion.Id);
    
  }
  
  render(){
    console.log('props @ IntQuestAnswerCreate: ', this.props);
    console.log('params: ', this.props.match.params.id);
    if(this.props.interviewQuestionById === FETCHING || this.props.allSkills === FETCHING ){
      return (
        <>
          <section style={{padding: '1.5rem 1.5rem'}}>
            <DefaultLoadingPage />
          </section>
        </>
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
    // interviewQuestionById: state.interviewQuestions.lookupTableInterviewQuestions[ownProps.match.params.id]
    interviewQuestionById: state.interviewQuestions.interviewQuestionById
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({ getCurrentUserById, getInterviewQuestionById, editInterviewQuestionById, createInterviewQuestionAnswer, fetchSkills }, dispatch)
}

export default connect( mapStateToProps, mapDispatchToProps )(InterviewQuestionCreate)
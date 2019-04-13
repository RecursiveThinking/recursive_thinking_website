import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { getCurrentUserById, interviewQuestionGetById, interviewQuestionAnswerGetById, interviewQuestionAnswerEditById, skillsGetAll } from '../../../actions';
import { FETCHING } from '../../../actions/action_types'

import DefaultLoadingPage from '../../../components/defaults/loadingPage/loadingPage';
import DefaultErrorPage from '../../../components/defaults/errorPage/errorPage';
import DefaultMessage from '../../../components/defaults/defaultMessage/defaultMessage'
import { DEFAULT_MESSAGE_INTERVIEW_QUESTION_ANSWER_BY_ID_ITEM_NOT_FOUND } from '../../../components/defaults/defaultMessage/defaultMessageContent/defaultMessageContent'

import { CARD_TITLE_INTERVIEW_QUESTION_ANSWER_EDIT_BY_ID } from '../../../components/common/content/contentInfo'

import { FORM_HEADING_INTERVIEWQUESTIONANSWER_EDIT } from '../../../components/forms/formContent/formContent'
import InterviewQuestionAnswerForm from '../../../components/forms/form_interviewquestionanswer';

class InterviewQuestionAnswerEdit extends Component {
  componentDidMount(){
    console.log('CDM @ IQAE')
    this.props.interviewQuestionGetById(this.props.match.params.questId);
    this.props.interviewQuestionAnswerGetById(this.props.match.params.ansId);
    this.props.skillsGetAll();
  }
  
  onSubmit = (formValues) => {
    console.log('formVals @ InterviewQuestionAnswer Edit', formValues)
    // interviewQuestionAnswerDescription: "Here is an answer to build an accordian234234234"
    // get interview question answer
    let {
      interviewQuestions: { interviewQuestionById },
      interviewQuestionAnswers: { interviewQuestionAnswerById }
    } = this.props;
    console.log('intQuestAns @ onSubmit: ', interviewQuestionAnswerById)
    let newInterviewQuestionAnswer = { ...interviewQuestionAnswerById };
    newInterviewQuestionAnswer.description = formValues.interviewQuestionAnswerDescription;
    // action creator
    this.props.interviewQuestionAnswerEditById(newInterviewQuestionAnswer, interviewQuestionById.Id)
  }
  
  render(){
    let {
      skills: { isFetchingSkillsGetAll, errorMessageSkillsGetAll},
      interviewQuestions: { 
        isGettingInterviewQuestionById, errorMessageGettingInterviewQuestionById, 
        interviewQuestionById },
      interviewQuestionAnswers: { 
        isGettingInterviewQuestionAnswerById, errorMessageGettingInterviewQuestionAnswerById,
        interviewQuestionAnswerById },
      currentUser
    } = this.props
    console.log('props @ IntQuestAnsEdit: ', this.props);
    console.log('questId: ', this.props.match.params.questId, 'ansId: ', this.props.match.params.ansId);
    // this will need interviewQuestion, interviewQuestionAnswer, skillsGetAll, currentUser
    if(isGettingInterviewQuestionAnswerById || isGettingInterviewQuestionById || isFetchingSkillsGetAll || currentUser === FETCHING){
      const { 
        title, classNameTxt
      } = CARD_TITLE_INTERVIEW_QUESTION_ANSWER_EDIT_BY_ID
      return (
        <DefaultLoadingPage 
          title={title}
          classNameTxt={classNameTxt}
        />
      )
    } 
    else if(errorMessageGettingInterviewQuestionById || errorMessageGettingInterviewQuestionAnswerById || errorMessageSkillsGetAll){
      return (
        <DefaultErrorPage />
      )
    }
    else if(!interviewQuestionById || !interviewQuestionAnswerById){
      return (
        <DefaultMessage
          content={DEFAULT_MESSAGE_INTERVIEW_QUESTION_ANSWER_BY_ID_ITEM_NOT_FOUND}
        />
      )
    }
    else if(!isGettingInterviewQuestionById && !isGettingInterviewQuestionAnswerById && !isFetchingSkillsGetAll && currentUser !== FETCHING) {
      let {
        skills: { allSkills, lookupTableAllSkills },
        interviewQuestions: { interviewQuestionById  },
        interviewQuestionAnswers: { interviewQuestionAnswerById: { description } },
        currentUser
      } = this.props
      console.log('this.props: ', this.props)
      return(
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
      )
    }
    
  }
}

function mapStateToProps(state, ownProps){
  return {
    auth: state.auth,
    skills: state.skills,
    // allSkills: state.skills.allSkills,
    // lookupTableAllSkills: state.skills.lookupTableAllSkills,
    // interviewQuestionById: state.interviewQuestions.lookupTableInterviewQuestions[ownProps.match.params.questId],
    // interviewQuestionAnswerById: state.interviewQuestionsAnswers.lookupTableInterviewQuestionsAnswers[ownProps.match.params.ansId]
    interviewQuestions: state.interviewQuestions,
    interviewQuestionAnswers: state.interviewQuestionAnswers
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({ getCurrentUserById, interviewQuestionGetById, interviewQuestionAnswerGetById, interviewQuestionAnswerEditById, skillsGetAll }, dispatch)
}

export default connect( mapStateToProps, mapDispatchToProps )(InterviewQuestionAnswerEdit)
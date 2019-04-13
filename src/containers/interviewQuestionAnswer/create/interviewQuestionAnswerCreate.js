import React, { Component } from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { interviewQuestionGetById, interviewQuestionAnswerCreateById, interviewQuestionEditById, skillsGetAll } from '../../../actions/index';

import DefaultLoadingPage from '../../../components/defaults/loadingPage/loadingPage';
import DefaultErrorPage from '../../../components/defaults/errorPage/errorPage';
import DefaultProcessingPage from '../../../components/defaults/processingPage/processingPage';
import { 
  CARD_TITLE_INTERVIEW_QUESTION_ANSWER_CREATE_BY_ID,
  CARD_TITLE_SUBMITTING_INTERVIEW_QUESTION_ANSWER_CREATE_BY_ID
} from '../../../components/common/content/contentInfo'

import { FORM_HEADING_INTERVIEWQUESTIONANSWER_CREATE } from '../../../components/forms/formContent/formContent';
import InterviewQuestionAnswerForm from '../../../components/forms/form_interviewquestionanswer';

import { InterviewQuestionAnswer } from '../../../models/models';
import { FETCHING } from '../../../actions/action_types';

class InterviewQuestionCreate extends Component {
  componentDidMount(){
    this.props.interviewQuestionGetById(this.props.match.params.id);
    this.props.skillsGetAll();
  }
  
  onSubmit = (formValues) => {
    let {
      auth: { currentUser },
      interviewQuestions: { interviewQuestionById }
    } = this.props;
    const createdByUserId = currentUser.userId;
    console.log('formVals @ intQuestAnswerCreate Component: ', formValues, createdByUserId)
    const newInterviewQuestionAnswer = new InterviewQuestionAnswer(formValues.interviewQuestionAnswerDescription, createdByUserId)
    console.log('newIntQuestAns JSON: ', JSON.stringify(newInterviewQuestionAnswer));
    
    let editInterviewQuestion = {...interviewQuestionById};
    editInterviewQuestion.answersToQuestion.push(newInterviewQuestionAnswer.Id)
    console.log('editIntQuest: ', editInterviewQuestion)
    this.props.interviewQuestionEditById(editInterviewQuestion);
    
    this.props.interviewQuestionAnswerCreateById(newInterviewQuestionAnswer, editInterviewQuestion.Id);
  }
  
  render(){
    console.log('props @ IntQuestAnswerCreate: ', this.props);
    console.log('params: ', this.props.match.params.id);
    // to create, need the interviewQuestionId, skills, currentUser
    const {
      skills: { 
        isFetchingSkillsGetAll, errorMessageSkillsGetAll
      },
      interviewQuestions: {
        interviewQuestionById, 
        isGettingInterviewQuestionById, errorMessageGettingInterviewQuestionById,
      },
      interviewQuestionAnswers: {
        isCreatingInterviewQuestionAnswerById, 
        // errorMessageInterviewQuestionAnswerGetAll
      },
      currentUser
    } = this.props;
    
    if(isGettingInterviewQuestionById || isFetchingSkillsGetAll){
      const {
        title,
        classNameTxt
      } = CARD_TITLE_INTERVIEW_QUESTION_ANSWER_CREATE_BY_ID;
      return (
        <DefaultLoadingPage 
          title={title}
          classNameTxt={classNameTxt}
        />
      )
    }
    else if(errorMessageSkillsGetAll || errorMessageGettingInterviewQuestionById){
      return (
        <DefaultErrorPage />
      )
    }
    else if(interviewQuestionById === null){
      return (
        <div>loading</div>
      )
    }
    else if(isCreatingInterviewQuestionAnswerById){
      const {
        title,
        classNameTxt
      } = CARD_TITLE_SUBMITTING_INTERVIEW_QUESTION_ANSWER_CREATE_BY_ID;
      return (
        <DefaultProcessingPage 
          title={title}
          classNameTxt={classNameTxt}
        />
      )
    }
    else if(!isGettingInterviewQuestionById && !isFetchingSkillsGetAll) {
      const {
        skills: { allSkills, lookupTableAllSkills, },
        // interviewQuestions: {  }
      } = this.props;
      console.log('interviewQuestion before form: ', interviewQuestionById)
      return (
        <InterviewQuestionAnswerForm
          onSubmit={this.onSubmit}
          content={FORM_HEADING_INTERVIEWQUESTIONANSWER_CREATE}
          intQuestion={interviewQuestionById}
          currentUser={currentUser}
          allSkillsArr={allSkills}
          lookupTableAllSkills={lookupTableAllSkills}
        />
      )
    }
  }
}

function mapStateToProps(state, ownProps){
  return {
    // currentUser: state.auth.currentUser,
    auth: state.auth,
    skills: state.skills,
    // lookupTableAllSkills: state.skills.lookupTableAllSkills,
    // interviewQuestionById: state.interviewQuestions.lookupTableInterviewQuestions[ownProps.match.params.id]
    interviewQuestions: state.interviewQuestions,
    interviewQuestionAnswers: state.interviewQuestionAnswers
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({ interviewQuestionGetById, interviewQuestionEditById, interviewQuestionAnswerCreateById, skillsGetAll }, dispatch)
}

export default connect( mapStateToProps, mapDispatchToProps )(InterviewQuestionCreate)
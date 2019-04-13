import React, { Component } from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { SubmissionError } from 'redux-form';

import { getCurrentUserById, interviewQuestionCreateById, skillsGetAll } from '../../../actions/index'

import { FORM_HEADING_INTERVIEWQUESTION_CREATE } from '../../../components/forms/formContent/formContent';
import InterviewQuestionForm from '../../../components/forms/form_interviewquestion';

import DefaultLoadingPage from '../../../components/defaults/loadingPage/loadingPage';
import DefaultErrorPage from '../../../components/defaults/errorPage/errorPage';
import DefaultProcessingPage from '../../../components/defaults/processingPage/processingPage';
import { 
  CARD_TITLE_INTERVIEW_QUESTION_CREATE_BY_ID, CARD_TITLE_SUBMITTING_INTERVIEW_QUESTION_CREATE_BY_ID
} from '../../../components/common/content/contentInfo';

import { InterviewQuestion } from '../../../models/models'
import { FETCHING } from '../../../actions/action_types';

class InterviewQuestionCreate extends Component {
  componentDidMount(){
    // this.props.getCurrentUserById();
    this.props.skillsGetAll();
  }
  
  // addCategoriesToIntQuest
  onSubmit = (formValues, addTheseCategoryObjsToDatabase, removeIntQuestIdFromTheseCategoryObjs, addTheseCategoryObjsToIntQuest, localCategoriesForIntQuest) => {
    // const createdByUserId = this.props.currentUser.attributes.sub;
    console.log('formValues: ', formValues, 'addTheseCategoryObjsToIntQuest: ', addTheseCategoryObjsToIntQuest)
    if(addTheseCategoryObjsToIntQuest.length === 0){
      throw new SubmissionError({ interviewQuestionTags: 'Please Specifiy at least one Category for the Question'})
    } else {
      const createdByUserId = this.props.currentUser.userId;
      console.log('formVals @ intQuestCreate Component: ', formValues, createdByUserId, 'addTheseCategoryObjsToIntQuest: ', addTheseCategoryObjsToIntQuest)
      
      let intQuestCategoriesOfIds = [];
      if(addTheseCategoryObjsToIntQuest.length){
        addTheseCategoryObjsToIntQuest.forEach(categoryObj => intQuestCategoriesOfIds.push(categoryObj.id))
      }
      const newInterviewQuestion = new InterviewQuestion(formValues.interviewQuestionTitle, formValues.interviewQuestionDetails, intQuestCategoriesOfIds, createdByUserId)
      // console.log('newIntQuest @ intQuestCreate: ', JSON.stringify(newInterviewQuestion))
      console.log('newIntQuest @ intQuestCreate: ', newInterviewQuestion)
      this.props.interviewQuestionCreateById(newInterviewQuestion, null, null, addTheseCategoryObjsToIntQuest);
    }
  }
  
  render(){
    let {
      skills: { 
        isFetchingSkillsGetAll, errorMessageSkillsGetAll,
      },
      interviewQuestions: {
        isCreatingInterviewQuestionById, 
        // errorMessageInterviewQuestionCreateById
      },
      currentUser
    } = this.props;
    // get all skills, get currentUser
    if(isFetchingSkillsGetAll){
      const { 
        title, classNameTxt
      } = CARD_TITLE_INTERVIEW_QUESTION_CREATE_BY_ID
      return (
        <DefaultLoadingPage 
          title={title}
          classNameTxt={classNameTxt}
        />
      )
    }
    // err if not get
    else if(errorMessageSkillsGetAll){
      return (
        <DefaultErrorPage />
      )
    }
    else if(isCreatingInterviewQuestionById){
      const {
        title,
        classNameTxt
      } = CARD_TITLE_SUBMITTING_INTERVIEW_QUESTION_CREATE_BY_ID;
      return (
        <DefaultProcessingPage 
          title={title}
          classNameTxt={classNameTxt}
        />
      )
    }
    // if have allSkills, have currentUser
    else if(!isFetchingSkillsGetAll){
      let {
        skills: { allSkills }
      } = this.props;
      return (
        <InterviewQuestionForm
          onSubmit={this.onSubmit}
          content={FORM_HEADING_INTERVIEWQUESTION_CREATE}
          allSkills={allSkills}
        />
      )
    }
    
  }
}

function mapStateToProps(state){
  return {
    // currentUser: state.auth.currentUser,
    auth: state.auth,
    interviewQuestions: state.interviewQuestions,
    skills: state.skills,
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({ interviewQuestionCreateById, skillsGetAll }, dispatch);
}

export default connect( mapStateToProps, mapDispatchToProps )(InterviewQuestionCreate)
import React, { Component } from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { SubmissionError } from 'redux-form';

import { getCurrentUserById, interviewQuestionGetById, interviewQuestionEditById, skillsGetAll, skillCreateById, skillEditById } from '../../../actions'

import DefaultLoadingPage from '../../../components/defaults/loadingPage/loadingPage';
import DefaultErrorPage from '../../../components/defaults/errorPage/errorPage';
import DefaultMessage from '../../../components/defaults/defaultMessage/defaultMessage'
import DefaultProcessingPage from '../../../components/defaults/processingPage/processingPage';
import { DEFAULT_MESSAGE_INTERVIEW_QUESTION_BY_ID_ITEM_NOT_FOUND } from '../../../components/defaults/defaultMessage/defaultMessageContent/defaultMessageContent'

import { 
  CARD_TITLE_SELECTED_INTERVIEW_QUESTION_GET_BY_ID,
  CARD_TITLE_EDITING_INTERVIEW_QUESTION_EDIT_BY_ID
} from '../../../components/common/content/contentInfo';

import { FORM_HEADING_INTERVIEWQUESTION_EDIT } from '../../../components/forms/formContent/formContent';
import InterviewQuestionForm from '../../../components/forms/form_interviewquestion';

class InterviewQuestionEdit extends Component {
  componentDidMount(){
    // this.props.getCurrentUserById();
    this.props.interviewQuestionGetById(this.props.match.params.id)
    this.props.skillsGetAll();
  }
  
  onSubmit = (formValues, addTheseCategoryObjsToDatabase, removeIntQuestIdFromTheseCategoryObjs, addTheseCategoryObjsToIntQuest, localCategoriesForIntQuest) => {
    // console.log('formVals @ intQuestEdit Component: ', formValues, 'addTheseCategoryObjsToDatabase: ', addTheseCategoryObjsToDatabase, 'removeIntQuestIdFromTheseCategoryObjs: ', removeIntQuestIdFromTheseCategoryObjs, 'addTheseCategoryObjsToIntQuest: ', addTheseCategoryObjsToIntQuest, 'localCategoriesForIntQuest: ', localCategoriesForIntQuest)
    if(addTheseCategoryObjsToIntQuest.length === 0 && localCategoriesForIntQuest.length === 0){
      throw new SubmissionError({ interviewQuestionTags: 'Please Specifiy at least one Category for the Question'})
    } else {
      let {
        interviewQuestionById
      } = this.props.interviewQuestions
      console.log('formValues: ', formValues)
      let edittedInterviewQuestion = { ...interviewQuestionById };
      edittedInterviewQuestion.title = formValues.interviewQuestionTitle;
      edittedInterviewQuestion.description = formValues.interviewQuestionDetails;
      let updatedIntQuestionCategories = [];
      localCategoriesForIntQuest.forEach(categoryObj => updatedIntQuestionCategories.push(categoryObj.id));
      addTheseCategoryObjsToIntQuest.forEach(categoryObj => updatedIntQuestionCategories.push(categoryObj.id))
      edittedInterviewQuestion.categories = updatedIntQuestionCategories
      console.log('newIntQuestion: ', JSON.stringify(edittedInterviewQuestion))
      if(addTheseCategoryObjsToDatabase){
        // this means we have to create some new skills before we update/edit the intQuestion
        if(addTheseCategoryObjsToDatabase.length){
          addTheseCategoryObjsToDatabase.forEach(skillObj => {
            this.props.skillCreateById(skillObj)
          })
        }
      } 
      // else {
        this.props.interviewQuestionEditById(edittedInterviewQuestion, null, null, removeIntQuestIdFromTheseCategoryObjs, addTheseCategoryObjsToIntQuest)
      // }
    }
  }
  
  render(){
    console.log('props @ IntQuestEdit: ', this.props);
    console.log('params', this.props.match.params.id);    
    let {
      interviewQuestions: { 
        isGettingInterviewQuestionById, errorMessageGettingInterviewQuestionById,
        isEditingInterviewQuestionById, errorMessageEditingInterviewQuestionById,
        interviewQuestionById },
      skills: { 
        // allSkills,
        isFetchingSkillsGetAll, errorMessageSkillsGetAll,
      },
      // currentUser
    } = this.props;
    // isEditingIntQuestion - show process page
    if(isEditingInterviewQuestionById){
      const {
        title,
        classNameTxt
      } = CARD_TITLE_EDITING_INTERVIEW_QUESTION_EDIT_BY_ID;
      return (
        <DefaultProcessingPage 
          title={title}
          classNameTxt={classNameTxt}
        />
      )
    }
    // fetching information for one question - questionById and skillsGetAll
    else if(isGettingInterviewQuestionById || isFetchingSkillsGetAll){
      const { 
        title, classNameTxt
      } = CARD_TITLE_SELECTED_INTERVIEW_QUESTION_GET_BY_ID
      return (
        <DefaultLoadingPage 
          title={title}
          classNameTxt={classNameTxt}
        />
      )
    }
    // show any errors
    else if(errorMessageGettingInterviewQuestionById || errorMessageEditingInterviewQuestionById  || errorMessageSkillsGetAll){
      return (
        <DefaultErrorPage 
        
        />
      )
    }
    // if no intQuest
    else if(!interviewQuestionById){
      return (
        <DefaultMessage
          content={DEFAULT_MESSAGE_INTERVIEW_QUESTION_BY_ID_ITEM_NOT_FOUND}
        />
      )
    }
    else if(interviewQuestionById && !isGettingInterviewQuestionById){
      let {
        interviewQuestions: { interviewQuestionById },
        skills: { allSkills, lookupTableAllSkills }
      } = this.props;

      // fill in the categories Array with category objects, not just the Id
      let dupIntQuestion = { ...interviewQuestionById };
      dupIntQuestion.categories = dupIntQuestion.categories.map(categoryid => lookupTableAllSkills[categoryid])
      // console.log('dupIntQuestion: ', dupIntQuestion)
      return(
        <InterviewQuestionForm 
          onSubmit={this.onSubmit}
          content={FORM_HEADING_INTERVIEWQUESTION_EDIT}
          initialValues={{
            interviewQuestionTitle: interviewQuestionById.title,
            interviewQuestionDetails: interviewQuestionById.description
          }}
          intQuestion={dupIntQuestion}
          allSkills={allSkills}          
        />
      )
    }
  }
}

function mapStateToProps(state, ownProps){
  return {
    // currentUser: state.auth.currentUser,    
    auth: state.auth,    
    interviewQuestions: state.interviewQuestions,
    // interviewQuestionById: state.interviewQuestions.interviewQuestionById,
    skills: state.skills,
    // allSkills: state.skills.allSkills,
    // lookupTableAllSkills: state.skills.lookupTableAllSkills
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({ interviewQuestionGetById, interviewQuestionEditById, skillsGetAll, skillCreateById, skillEditById }, dispatch)
}

export default connect ( mapStateToProps, mapDispatchToProps )(InterviewQuestionEdit)
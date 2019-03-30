import React, { Component } from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { getCurrentUserById, getInterviewQuestionById, editInterviewQuestionById, fetchSkills, createSkill, editSkillById } from '../../../actions'
import { FETCHING } from '../../../actions/action_types';

import DefaultLoadingPage from '../../../components/defaults/loadingPage/loadingPage';
import DefaultMessage from '../../../components/defaults/defaultMessage/defaultMessage'
import { DEFAULT_MESSAGE_INTERVIEW_QUESTION_BY_ID_ITEM_NOT_FOUND } from '../../../components/defaults/defaultMessage/defaultMessageContent/defaultMessageContent'

import { FORM_HEADING_INTERVIEWQUESTION_EDIT } from '../../../components/forms/formContent/formContent';
import InterviewQuestionForm from '../../../components/forms/form_interviewquestion';

class InterviewQuestionEdit extends Component {
  componentDidMount(){
    this.props.getCurrentUserById();
    this.props.getInterviewQuestionById(this.props.match.params.id)
    this.props.fetchSkills();
  }
  
  onSubmit = (formValues, addTheseCategoryObjsToDatabase, removeIntQuestIdFromTheseCategoryObjs, addTheseCategoryObjsToIntQuest, localCategoriesForIntQuest) => {
    // console.log('formVals @ intQuestEdit Component: ', formValues, 'addTheseCategoryObjsToDatabase: ', addTheseCategoryObjsToDatabase, 'removeIntQuestIdFromTheseCategoryObjs: ', removeIntQuestIdFromTheseCategoryObjs, 'addTheseCategoryObjsToIntQuest: ', addTheseCategoryObjsToIntQuest, 'localCategoriesForIntQuest: ', localCategoriesForIntQuest)
    let edittedInterviewQuestion = this.props.interviewQuestionById;
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
          this.props.createSkill(skillObj)
        })
      }
    } 
    // else {
      this.props.editInterviewQuestionById(edittedInterviewQuestion, null, null, removeIntQuestIdFromTheseCategoryObjs, addTheseCategoryObjsToIntQuest)
    // }
  }
  
  render(){
    console.log('props @ IntQuestEdit: ', this.props);
    console.log('params', this.props.match.params.id);
    // if no intQuestion      
    if(this.props.interviewQuestionById === FETCHING || this.props.allSkills === FETCHING){
      return (
        <section style={{padding: '1.5rem 1.5rem'}}>
          <DefaultLoadingPage />
        </section>
      )
    }
    if(!this.props.interviewQuestionById){
      return (
        <section style={{padding: '1.5rem 1.5rem'}}>
          <DefaultMessage
            content={DEFAULT_MESSAGE_INTERVIEW_QUESTION_BY_ID_ITEM_NOT_FOUND}
          />
        </section>
      )
    }
    const {
      title,
      description
    } = this.props.interviewQuestionById;
    const {
      allSkills
    } = this.props;
    
    // fill in the categories Array with category objects, not just the Id
    let dupIntQuestion = { ...this.props.interviewQuestionById };
    dupIntQuestion.categories = dupIntQuestion.categories.map(categoryid => this.props.lookupTableAllSkills[categoryid])
    // console.log('dupIntQuestion: ', dupIntQuestion)
    return(
      <>
        <InterviewQuestionForm 
          onSubmit={this.onSubmit}
          content={FORM_HEADING_INTERVIEWQUESTION_EDIT}
          initialValues={{
            interviewQuestionTitle: title,
            interviewQuestionDetails: description
          }}
          intQuestion={dupIntQuestion}
          allSkills={allSkills}          
        />
      </>
    )
  }
}

function mapStateToProps(state, ownProps){
  return {
    currentUser: state.auth.currentUser,    
    interviewQuestionById: state.interviewQuestions.interviewQuestionById,
    allSkills: state.skills.allSkills,
    lookupTableAllSkills: state.skills.lookupTableAllSkills
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({ getCurrentUserById, getInterviewQuestionById, editInterviewQuestionById, fetchSkills, createSkill, editSkillById }, dispatch)
}

export default connect ( mapStateToProps, mapDispatchToProps )(InterviewQuestionEdit)
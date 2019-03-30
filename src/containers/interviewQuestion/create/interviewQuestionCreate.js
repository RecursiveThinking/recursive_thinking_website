import React, { Component } from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { getCurrentUserById, createInterviewQuestion, fetchSkills } from '../../../actions/index'

import { FORM_HEADING_INTERVIEWQUESTION_CREATE } from '../../../components/forms/formContent/formContent';
import InterviewQuestionForm from '../../../components/forms/form_interviewquestion';

import { InterviewQuestion } from '../../../models/models'
import { FETCHING } from '../../../actions/action_types';

class InterviewQuestionCreate extends Component {
  componentDidMount(){
    this.props.getCurrentUserById();
    this.props.fetchSkills();
  }
  
  onSubmit = (formValues, addToDatabase, addCategoriesToIntQuest, localCategoriesForIntQuest) => {
    // const createdByUserId = this.props.currentUser.attributes.sub;
    const createdByUserId = this.props.currentUser.userId;
    console.log('formVals @ intQuestCreate Component: ', formValues, createdByUserId, 'addCategoriesToIntQuest: ', addCategoriesToIntQuest)
    let intQuestCategoriesOfIds = [];
    if(addCategoriesToIntQuest.length){
      addCategoriesToIntQuest.forEach(categoryObj => intQuestCategoriesOfIds.push(categoryObj.id))
    }
    const newInterviewQuestion = new InterviewQuestion(formValues.interviewQuestionTitle, formValues.interviewQuestionDetails, intQuestCategoriesOfIds, createdByUserId)
    console.log('newIntQuest @ intQuestCreate: ', JSON.stringify(newInterviewQuestion))
    this.props.createInterviewQuestion(newInterviewQuestion);
  }
  
  render(){
    const {
      allSkills,
      currentUser
    } = this.props;
    if(allSkills !== FETCHING && currentUser !== FETCHING){
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
    return (
      <div>Nothing</div>
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
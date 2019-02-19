import React, { Component } from 'react'

import { connect } from 'react-redux';
import { getInterviewQuestionById, editInterviewQuestionById } from '../../actions'

import InterviewQuestionForm from './form_interviewquestion';
import { FORM_HEADING_INTERVIEWQUESTION_EDIT } from './formContent/formContent';

class InterviewQuestionEdit extends Component {
  componentDidMount(){
    this.props.getInterviewQuestionById(this.props.match.params.id)
  }
  
  onSubmit = (formValues) => {
    console.log('formVals @ InterviewQuestion Edit', formValues)
    let newInterviewQuestion = this.props.interviewQuestionById;
    newInterviewQuestion.title = formValues.interviewQuestionTitle;
    newInterviewQuestion.description = formValues.interviewQuestionDetails;
    newInterviewQuestion.updatedAt = new Date().toString();
    console.log('newIntQuestion: ', JSON.stringify(newInterviewQuestion))
    this.props.editInterviewQuestionById(newInterviewQuestion)
  }
  
  render(){
    console.log('props @ IntQuestEdit: ', this.props);
    console.log('params', this.props.match.params.id);
    // if no intQuestion
    if(!this.props.interviewQuestionById){
      return (
        <div>
          Loading!
        </div>
      )
    }
    const {
      title,
      description
    } = this.props.interviewQuestionById
    return(
      <>
        <InterviewQuestionForm 
          onSubmit={this.onSubmit}
          content={FORM_HEADING_INTERVIEWQUESTION_EDIT}
          initialValues={{
            interviewQuestionTitle: title,
            interviewQuestionDetails: description
          }}
          intQuestion={this.props.interviewQuestionById}
        />
      </>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    interviewQuestionById: state.interviewQuestions.lookupTableInterviewQuestions[ownProps.match.params.id]
  }
}

export default connect (
  mapStateToProps,
  { getInterviewQuestionById, editInterviewQuestionById}
)(InterviewQuestionEdit)
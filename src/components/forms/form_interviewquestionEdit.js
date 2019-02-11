import React, { Component } from 'react'

import { connect } from 'react-redux';
import { getInterviewQuestionById, editInterviewQuestionById } from '../../actions'

import InterviewQuestionForm from './form_interviewquestion';
import { FORM_HEADING_INTERVIEWQUESTION_EDIT } from '../common/formContent/formContent';

class InterviewQuestionEdit extends Component {
  componentDidMount(){
    this.props.getInterviewQuestionById(this.props.match.params.id)
  }
  
  onSubmit = (formValues) => {
    console.log('formVals @ InterviewQuestion Edit', formValues)
    // action creator
    // this.props.editLessonById(formValues)
  }
  
  render(){
    
    console.log('props @ IntQuestEdit: ', this.props);
    console.log('params', this.props.match.params.id);
    
    return(
      <>
        <InterviewQuestionForm 
          onSubmit={this.onSubmit}
          content={FORM_HEADING_INTERVIEWQUESTION_EDIT}
          initialValues={{
            interviewQuestionTitle: 'IntQuest Title',
            interviewQuestionDetails: 'IntQuest Details'
          }}
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
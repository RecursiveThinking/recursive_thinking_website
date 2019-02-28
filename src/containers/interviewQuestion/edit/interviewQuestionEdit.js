import React, { Component } from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { getInterviewQuestionById, editInterviewQuestionById } from '../../../actions'

import DefaultLoadingPage from '../../../components/defaults/loadingPage/loadingPage';

import { FORM_HEADING_INTERVIEWQUESTION_EDIT } from '../../../components/forms/formContent/formContent';
import InterviewQuestionForm from '../../../components/forms/form_interviewquestion';

class InterviewQuestionEdit extends Component {
  componentDidMount(){
    this.props.getInterviewQuestionById(this.props.match.params.id)
  }
  
  onSubmit = (formValues) => {
    console.log('formVals @ InterviewQuestion Edit', formValues)
    let newInterviewQuestion = this.props.interviewQuestionById;
    newInterviewQuestion.title = formValues.interviewQuestionTitle;
    newInterviewQuestion.description = formValues.interviewQuestionDetails;
    console.log('newIntQuestion: ', JSON.stringify(newInterviewQuestion))
    this.props.editInterviewQuestionById(newInterviewQuestion)
  }
  
  render(){
    console.log('props @ IntQuestEdit: ', this.props);
    console.log('params', this.props.match.params.id);
    // if no intQuestion
    if(!this.props.interviewQuestionById){
      return (
        // <div>Loading!</div>
        <section style={{padding: '1.5rem 1.5rem'}}>
          <DefaultLoadingPage />
        </section>
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

function mapStateToProps(state, ownProps){
  return {
    interviewQuestionById: state.interviewQuestions.lookupTableInterviewQuestions[ownProps.match.params.id]
    // interviewQuestionById: state.interviewQuestions.interviewQuestionById
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({ getInterviewQuestionById, editInterviewQuestionById }, dispatch)
}

export default connect ( mapStateToProps, mapDispatchToProps )(InterviewQuestionEdit)
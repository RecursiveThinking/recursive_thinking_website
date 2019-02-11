import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';

import FormAction from '../common/formAction/formAction'
import { FORM_ACTION_INTERVIEWQUESTIONS_CREATE } from '../common/formAction/formActionInfo'

import ValidationMethods from '../../functions/validationMethods'

class InterviewQuestionForm extends Component {
  onSubmit(formValues){
    console.log('formVals @ Interview Questions', formValues)
    this.props.onSubmit(formValues);
  }
  
  renderField(field){
    const { meta: { touched, error }} = field;
    const errorInput = `fc-field-row-full fc--disp-flex fc--fdir-row mt10 ${touched && error ? 'input-invalid' : ''}`
    return(
      <div className="fc-field fc--disp-flex fc--fdir-col fc--jCont-ce width100P">
        <div className="fc-field-row-full fc--disp-flex fc--fdir-row mt10">
          <label htmlFor={field.name} className={field.labelStyle}>{field.label}</label>
        </div>
        <div className={errorInput}>
          <input 
            {...field.input}
            className={field.inputStyle}
            type={field.type}
            placeholder={field.placeholder}
          />
        </div>
        <div className="error fc-field-row-full fc--disp-flex fc--fdir-row width100P">
          <div className="fc--disp-flex fc--fdir-row fc--jCont-fs fs16">
            { touched ? error : "" }
          </div>
        </div>
      </div>
    )
  }
  
  render(){
    return (
      <form
        className="height100P"
        onSubmit={this.props.handleSubmit(this.onSubmit)}
      >
          <article className="card">
            <fieldset className="fc--disp-flex fc--fdir-col fc--aItem-ce">
              <h2 className="fs33 fw300 ls24 fcBlack ta-cent">Submit an Interview Question</h2>
              <hr className="modalHR mt10" />
                <div className="fc-fieldset">
                  <Field 
                    label="Question Title:"
                    name="interviewQuestionTitle"
                    type="text"
                    placeholder="Question Title"
                    component={this.renderField}
                    labelStyle="width100P"
                    inputStyle="width100P"
                    />
                  <Field 
                    label="Question Details:"
                    name="interviewQuestionDetails"
                    type="text"
                    placeholder="Question Details"
                    component={this.renderField}
                    labelStyle="width100P"
                    inputStyle="width100P"
                    />
                  {/* <Field
                    label="Tag profession, skills and languages:"
                    name="interviewQuestionTags"
                    type="text"
                    placeholder="Enter at Least One Tag for this Interview Question"
                    component={this.renderField}
                    labelStyle="width100P"
                    inputStyle="width100P"
                  /> */}
                </div>
            </fieldset>
          </article>
      {
        this.props.anyTouched && !this.props.invalid &&
        <FormAction content={FORM_ACTION_INTERVIEWQUESTIONS_CREATE}/>
      }
      </form>
    )
  }
}

export default reduxForm({
  validate: validate,
  form: 'InterviewQuestionForm'
})(InterviewQuestionForm)

function validate(values){
  const errors = {};
  
  // interview question modal
  if(!values.interviewQuestionTitle){ errors.interviewQuestionTitle = 'Please enter a Valid Title for the Interview Question' }
  if(values.interviewQuestionTitle){
    const titleCharLimit = 4;
    if(!ValidationMethods.isWordOverCharLimit(values.interviewQuestionTitle, titleCharLimit)){
      errors.interviewQuestionTitle = `Please enter a Title with at Least ${titleCharLimit} Characters`
    }
  }
  if(!values.interviewQuestionDetails){ errors.interviewQuestionDetails = 'Please enter a Valid Description for the Interview Question' }
  if(values.interviewQuestionDetails){
    const detailsCharLimit = 10;
    if(!ValidationMethods.isWordOverCharLimit(values.interviewQuestionDetails, detailsCharLimit)){
      errors.interviewQuestionDetails = `Question Details should have at Least ${detailsCharLimit} Characters`
    }
  }
  // if(!values.interviewQuestionTags){ errors.interviewQuestionTags = 'Please enter a Minimum of One Tag' }
  
  return errors
}
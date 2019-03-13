import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';

import ReactTags from 'react-tag-autocomplete';

import ValidationMethods from '../../functions/validationMethods';

class InterviewQuestionForm extends Component {
  constructor(props){
    super(props)
    this.state = {
      allCategoriesForQuestion: [],
      filterCategories: this.props.allSkills
    }
  }
  
  onSubmit = (formValues) =>{
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
  
  renderTextArea(field){
    const { meta: { touched, error }} = field;
    const errorInput = `fc-field-row-full fc--disp-flex fc--fdir-row mt10 ${touched && error ? 'input-invalid' : ''}`
    return(
      <div className="fc-field fc--disp-flex fc--fdir-col fc--jCont-ce width100P">
        <div className="fc-field-row-full fc--disp-flex fc--fdir-row mt10">
          <label htmlFor={field.name} className={field.labelStyle}>{field.label}</label>
        </div>
        <div className={errorInput}>
          <textarea 
            {...field.input}
            className={field.textAreaStyle}
            placeholder={field.placeholder}
            cols={field.cols}
            rows={field.rows}
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
  
  renderReactTag(field){
    const { meta: { touched, error }} = field;
    const errorInput = `fc-field-row-full fc--disp-flex fc--fdir-row mt10 ${touched && error ? 'input-invalid' : ''}`;
    console.log('field: ', field)
    return(
      <div className="fc-field fc--disp-flex fc--fdir-col fc--jCont-ce width100P">
        <div className="fc-field-row-full fc--disp-flex fc--fdir-row mt10">
          <label htmlFor={field.name} className={field.labelStyle}>{field.label}</label>
        </div>
        <div className={errorInput}>
          <ReactTags
            {...field.input}
            placeholder={field.placeholder}
            tags={field.tags}
            suggestions={field.suggestions}
            // allowNew={field.allowNew}
            // autoresize={field.autoresize}
            autofocus={field.autofocus}
            minQueryLength={field.minQueryLength}
            maxSuggestionsLength={field.maxSuggestionsLength}
            delimiters={field.delimiters}
            delimiterChars={field.delimiterChars}
            handleAddition={field.handleAddition}
            handleDelete={field.handleDelete}
            classNames={field.classNames}
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
  
  renderHeadingContent(){
    const {
      content
    } = this.props;
    if(!this.props.intQuestion){
      return (
        <h5 className="fw600 ls12 fcGrey424041">{content.heading}</h5>
      )
    } else {
      return (
        <h5 className="fw600 ls12 fcGrey424041">{content.heading}{this.props.intQuestion['title']}</h5>
      )
    }
  }
  
  render(){
    const {
      content
    } = this.props
    
    return (
      <section style={{padding: '1.5rem 1.5rem'}}>
        <article className="card">
          <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
          <div className="grid grid--full">
            <div className="grid-cell">
            
          <fieldset className="fc--disp-flex fc--fdir-col fc--aItem-ce noMargin">
            {/* <h2 className="fs33 fw300 ls24 fcBlack ta-cent">{content.heading}</h2> */}
            {/* <h5 className="fw700 ls14 ttup fcGrey424041">{content.heading}</h5> */}
            <legend>
              {this.renderHeadingContent()}
            </legend>
            <hr className="modalHR mt10" />
              <div className="fc-fieldset">
                <Field 
                  label="Title:"
                  name="interviewQuestionTitle"
                  type="text"
                  placeholder="Enter Title"
                  component={this.renderField}
                  labelStyle="width100P"
                  inputStyle="width100P"
                  />
                <Field 
                  label="Description:"
                  name="interviewQuestionDetails"
                  type="text"
                  placeholder="Enter Description"
                  component={this.renderTextArea}
                  labelStyle="width100P"
                  textAreaStyle="width100P"
                  cols={"30"}
                  rows={"10"}
                />
                <Field
                  label="Tag Categories:"
                  name="interviewQuestionTags"
                  component={this.renderReactTag}
                  labelStyle="width100P"
                  inputStyle="width100P"
                  // classNames={userClassNames}
                  placeholder='Select Category Tags for this Interview Question'
                  tags={this.state.allCategoriesForQuestion}
                  suggestions={this.state.filterCategories}
                  // allowNew={false}
                  autoresize={true}
                  // autofocus={true}
                  minQueryLength={2}
                  maxSuggestionsLength={4}
                  delimiters={[9, 13]}
                  delimiterChars={[',']}
                  handleAddition={this.handleAddition}
                  handleDelete={this.handleDelete}
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
              <hr className="modalHR mt80" />
            <div className="ta-cent">
              {/* {
                this.props.anyTouched && !this.props.invalid &&
              } */}
                
                <button className="btn btnFillClrSchGreen00b371 pdTB2LR8 fs20 fw500 ls12 mt30">{content.buttonText}</button>
            </div>
          </fieldset>
          </div>
          </div>
          </form>
        </article>
      </section>
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
  if(!values.interviewQuestionTitle){ errors.interviewQuestionTitle = 'Interview Question Titles can not be Empty' };
  if(values.interviewQuestionTitle){
    const titleCharLimit = 4;
    if(!ValidationMethods.isWordOverCharLimit(values.interviewQuestionTitle, titleCharLimit)){
      errors.interviewQuestionTitle = `Interview Question Titles must contain at Least ${titleCharLimit} Characters`
    }
  };
  if(!values.interviewQuestionDetails){ errors.interviewQuestionDetails = 'Interview Question Descriptions can not be Empty' };
  if(values.interviewQuestionDetails){
    const detailsCharLimit = 10;
    if(!ValidationMethods.isWordOverCharLimit(values.interviewQuestionDetails, detailsCharLimit)){
      errors.interviewQuestionDetails = `Interview Question Descriptions must contain at Least ${detailsCharLimit} Characters`
    }
  };
  // if(!values.interviewQuestionTags){ errors.interviewQuestionTags = 'Please enter a Minimum of One Tag' }
  
  return errors
}
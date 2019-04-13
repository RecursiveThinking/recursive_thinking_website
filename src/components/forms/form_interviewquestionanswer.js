import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import CategoryList from '../common/category/categoryList'

// import FormAction from '../common/formAction/formAction';
// import { FORM_ACTION_INTERVIEWQUESTIONSANSWER_CREATE } from '../common/formAction/formActionInfo';

import ValidationMethods from '../../functions/validationMethods'

import DM from '../../standards/dictModel'

class InterviewQuestionAnswerForm extends Component {
  onSubmit = (formValues) => {
    console.log('formVals @ Interview Questions Answer', formValues)    
    this.props.onSubmit(formValues);
  }
  
  renderTextArea(field){
    const { meta: { touched, error }} = field;
    const errorInput = `fc-field-row-full fc--disp-flex fc--fdir-row mt10 ${touched && error ? 'input-invalid' : ''}`
    return(
      <div className="fc-field fc--disp-flex fc--fdir-col fc--jCont-ce width100P mt25">
        <div className="fc-field-row-full fc-disp-flex fc-fdir-row mt10">
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
        <div className="error fc-field-row-full fc-disp-flex fc-fdir-row width100P">
          <div className="fc--disp-flex fc--fdir-row fc--jCont-fs fs16">
            { touched ? error : ""}
          </div>
        </div>
      </div>
    )
  }
  
  render(){
    // const { allSkillsArr, lookupTableAllSkills } = this.props
    // const { intQuestion: { title, description, categories }} = DM
    const {
      content,
      intQuestion
    } = this.props;
    const {
      intQuestion: {
        title,
        categories
      }
    } = DM
    console.log('intQuest @ intQuestAns Form: ', intQuestion)
    return (
      <article className="card fc--disp-flex fc--fdir-col">
        {/* <fieldset className="fc--disp-flex fc--fdir-col fc--aItem-ce"> */}
          {/* <h2 className="fs40 fw300 ls24 fcBlack ta-cent">Reply to Interview Question</h2> */}
          {/* <hr className="modalHR mt35" /> */}
          <div className="">
            <h5 className="fw600 ls16 fcGrey424041">{content.heading}{intQuestion[title]}</h5>
            {/* <h5 className="fw500 ls18 fcGreyb9 mt30">{this.props.intQuestion[DM.intQuestion.title]}</h5> */}
            <hr className="mt20" />
            <p className="fs16 fw300 ls10 fcGrey424041 mt25 wspl">
              {this.props.intQuestion[DM.intQuestion.description]}
            </p>
            <hr className="mt25"/>
          
            <CategoryList 
              categories={intQuestion[categories]}
              allSkillsArr={this.props.allSkillsArr}
              lookupTableAllSkills={this.props.lookupTableAllSkills}
            />
          </div>
          
          <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
            <div className="fc-fieldset">
              <Field
                label={content.labelAnswer}
                name="interviewQuestionAnswerDescription"
                placeholder="Description"
                component={this.renderTextArea}
                cols={"30"}
                rows={"10"}
              />
            </div>
            <hr className="modalHR mt130" />
            <div className="ta-cent">
              {/* {
                this.props.anyTouched && !this.props.invalid &&
              } */}
                
                <button className="btn btnFillClrSchGreen00b371 pdTB2LR8 fs20 fw500 ls12 mt30">{content.buttonText}</button>
            </div>
          </form>
        {/* </fieldset> */}
      </article>
    )
  }
}

export default reduxForm({
  validate: validate,
  form: 'InterviewQuestionAnswerForm'
})(InterviewQuestionAnswerForm)

function validate(values){
  const errors = {};
  // logic
  // interview question answer modal
  if(!values.interviewQuestionAnswerDescription){ errors.interviewQuestionAnswerDescription = 'Please enter a Valid Reply to the Interview Question' }
  if(values.interviewQuestionAnswerDescription){
    const detailsWordLimit = 10;
    if(!ValidationMethods.doesContainNumberOfWords(values.interviewQuestionAnswerDescription, detailsWordLimit)){
      errors.interviewQuestionAnswerDescription = `Interview Question Descriptions must contain at Least ${detailsWordLimit} Words`
    }
  };
  // return object - if returns empty validation is good - submit.  if returns an object with something then it is bad.
  return errors
}
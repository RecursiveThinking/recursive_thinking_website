import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import CategoryList from '../common/category/categoryList'

// import FormAction from '../common/formAction/formAction';
// import { FORM_ACTION_INTERVIEWQUESTIONSANSWER_CREATE } from '../common/formAction/formActionInfo';

// import ValidationMethods from '../../functions/validationMethods'

import DM from '../../standards/dictModel'

class InterviewQuestionAnswerForm extends Component {
  onSubmit = (formValues) => {
    console.log('formVals @ Interview Questions Answer', formValues)    
    this.props.onSubmit(formValues);
  }
  
  renderField(field){
    const { meta: { touched, error }} = field;
    const errorInput = `fc-field-row-full fc--disp-flex fc--fdir-row mt10 ${touched && error ? 'input-invalid' : ''}`
    return(
      <div className="fc-field fc--disp-flex fc--fdir-col fc--jCont-ce width100P mt25">
        <div className="fc-field-row-full fc-disp-flex fc-fdir-row mt10">
          <label htmlFor={field.name}>{field.label}</label>
        </div>
        <div className={errorInput}>
          <input 
            {...field.input}
            type="text"
            placeholder={field.placeholder}
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
      <section style={{padding: '1.5rem 1.5rem'}}>
        <article className="card fc--disp-flex fc--fdir-col">
          {/* <fieldset className="fc--disp-flex fc--fdir-col fc--aItem-ce"> */}
            {/* <h2 className="fs40 fw300 ls24 fcBlack ta-cent">Reply to Interview Question</h2> */}
            {/* <hr className="modalHR mt35" /> */}
            <div className="">
              <h5 className="fw600 ls16 fcGrey424041">{content.heading}{intQuestion[title]}</h5>
              {/* <h5 className="fw500 ls18 fcGreyb9 mt30">{this.props.intQuestion[DM.intQuestion.title]}</h5> */}
              <hr className="mt20" />
              <p className="fs16 fw300 ls10 fcGrey424041 mt25">
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
                  component={this.renderField}
                  />
              </div>
              <hr className="modalHR mt130" />
              <div className="ta-cent">
                {
                  this.props.anyTouched && !this.props.invalid &&
                  
                  <button className="btn btnFillClrSchGreen00b371 pdTB2LR8 fs20 fw500 ls12 mt30">{content.buttonText}</button>
                }
              </div>
            </form>
          {/* </fieldset> */}
        </article>
      </section>
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
  
  // return object - if returns empty validation is good - submit.  if returns an object with something then it is bad.
  return errors
}
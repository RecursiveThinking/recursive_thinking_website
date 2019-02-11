import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';

import ValidationMethods from '../../functions/validationMethods';

class LessonForm extends Component {
  onSubmit = (formValues) => {
    // console.log('formValues @ lessonForm Comp: ', formValues)
    this.props.onSubmit(formValues)
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
          {/* <div className=" fc--disp-flex fc--fdir-row fc--jCont-fs width90P"> */}
            <div className="fc--disp-flex fc--fdir-row fc--jCont-fs fs16">
              { touched ? error : "" }
            </div>
          {/* </div> */}
        </div>
      </div>
    )
  }

  
  render(){
    const {
      content
    } = this.props;
    return (
      <section style={{padding: '1.5rem 1.5rem'}}>
        <article className="card">
          <fieldset className="fc--disp-flex fc--fdir-col fc--aItem-ce">
            <h2 className="fs33 fw300 ls24 fcBlack ta-cent">{content.heading}</h2>
            <hr className="modalHR mt10" />
            <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
              <div className="fc-fieldset">
                <Field
                  label="Title:"
                  name="lessonTitle"
                  type="text"
                  placeholder="Lesson Title"
                  component={this.renderField}
                  labelStyle="width100P"
                  inputStyle="width100P"
                />
                <Field
                  label="Description:"
                  name="lessonDescription"
                  type="text"
                  placeholder="Lesson Description"
                  component={this.renderField}
                  labelStyle="width100P"
                  inputStyle="width100P"
                />
                {/* <Field 
                  label="Taught by:"
                  name="lessonTaughtby"
                  type="text"
                  placeholder="Select Users To Teach This Lesson"
                  component={this.renderField}
                  labelStyle="width100P"
                  inputStyle="width100P"
                /> */}
              </div> 
              <hr className="modalHR mt80" />
              <div className="ta-cent">
                <button className="btn btnFillClrSchGreen00b371 pdTB2LR8 fs20 fw500 ls12 mt30">Submit Lesson</button>
              </div>
            </form>
          </fieldset>
        </article>
      </section>
    )
  }
}

export default reduxForm({
  validate: validate,
  form: 'LessonForm'
})(LessonForm)

function validate(values){
  const errors = {};
  
  if(!values.lessonTitle){ errors.lessonTitle = 'Please enter Lesson Title' }
  if(!values.lessonDescription){ errors.lessonDescription = 'Please enter a Lesson Description' }
  // if(!values.lessonTaughtby){ errors.lessonTaughtby = 'Please enter At Least one User Who will Teach this Lesson' }
  
  return errors
}
import React, { Component } from 'react'
import { reduxForm  } from 'redux-form';
// Field, SubmissionError
class SelectUserAvatarModalForm extends Component {
  // constructor(props){
  //   super(props)
  // }
  
  onSubmit = (formValues) => {
    console.log('onSubmit @ selectUserAvatarModal')
    this.props.onSubmit()
  }
  
  renderField(field){
    const { meta: { touched, error }} = field;
    const errorInput = `fc-field-row fc--disp-flex fc--fdir-row width100P ${touched && error ? 'input-invalid' : ''}`
    return (
      <div className="fc-field fc--disp-flex fc--fdir-col fc--jCont-ce width100P">
        <div className={errorInput}>
          <label className={field.labelStyle} htmlFor={field.name}>{field.label}</label>
          <input
            {...field.input}
            className={field.inputStyle}
            type={field.type}
            placeholder={field.placeholder}
          />
        </div>
        <div className="fc-field-row-error fc--disp-flex fc--fdir-row fc--jCont-fe width100P">
          <div className="error fc--disp-flex fc--fdir-row fc--jCont-fs width80P">
            <div className="fc--disp-flex fc--fdir-row fc--jCont-fs fs16">
              { touched ? error : ""}
            </div>
          </div>
        </div>
      </div>
    )
  }
  
  renderErrorIfExists = (error) => {
    if(error){
      return (
        <div className="mt20">
          <h6 className="fs16 fw300 fcError">{error}</h6>
        </div>
      )
    }
  }
  
  render(){
    const { error } = this.props;
    return (
      <div>
        <h2 className="fs40 fw300 ls24 fcBlack ta-cent">Avatar Selector</h2>
        <hr className="modalHR mt35" />
        <div className="grid grid--1of2">
          <div className="grid-cell">
            <fieldset className="fc--disp-flex fc--fdir-col fc--aItem-ce ta-cent" style={{marginTop: '4rem'}}>
            <h5 className="fw300 ls24 fcBlack ta-cent">Select From Our Library</h5>
              <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
                <div className="fc-fieldset" style={{padding: '0 3rem'}}>
                <h6 className="fs20 fw300 ls14 fcBlack ta-cent mt20">Coming Soon!</h6>
                  <p className="fs16 fw300 ls10 mt10">
                    We are currently working on this feature and hope to have it completed for the next version of the Recursive Thinking Website.
                  </p>
                  <p className="fs16 fw300 ls10 mt10">
                    Stay Tuned!
                  </p>
                  {this.renderErrorIfExists(error)}
                </div>
                <hr className="modalHR mt40" />
                <div className="ta-cent">
                  <button type="submit" className="btn btnFillClrSchGreen00b371 pdTB2LR8 fs20 fw500 ls12 mt30">Select Stock Avatar</button>
                </div>
              </form>
            </fieldset>
          </div>
          <div className="grid-cell">
            <fieldset className="fc--disp-flex fc--fdir-col fc--aItem-ce ta-cent" style={{marginTop: '4rem'}}>
            <h5 className="fw300 ls24 fcBlack ta-cent">Select Local File</h5>
              <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
                <div className="fc-fieldset" style={{padding: '0 3rem'}}>
                  <h6 className="fs20 fw300 ls14 fcBlack ta-cent mt20">Coming Soon!</h6>
                  <p className="fs16 fw300 ls10 mt10">
                    We are currently working on this feature and hope to have it completed for the next version of the Recursive Thinking Website.
                  </p>
                  <p className="fs16 fw300 ls10 mt10">
                    Stay Tuned!
                  </p>
                  {this.renderErrorIfExists(error)}
                </div>
                <hr className="modalHR mt40" />
                <div className="ta-cent">
                  <button type="submit" className="btn btnFillClrSchGreen00b371 pdTB2LR8 fs20 fw500 ls12 mt30">Select Local Avatar</button>
                </div>
              </form>
            </fieldset>
          </div>
        </div>
      </div>
      )
  }
}

export const SelectUserAvatarModalFormEx = reduxForm({
  validate: validate,
  form: 'SelectUserAvatarForm'
})(SelectUserAvatarModalForm)


function validate(values){
  
}
import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import CategoryList from '../common/category/categoryList'


import DM from '../../standards/dictModel'

class SignUpModalForm extends Component {
  constructor(props){
    super(props)
  }
  
  renderField(field){
    const { meta: { touched, error }} = field;
    const errorInput = `fc-field-row fc--disp-flex fc--fdir-row width100P ${touched && error ? 'input-invalid' : ''}`
    return(
      <div className='fc-field fc--disp-flex fc--fdir-col fc--jCont-ce width80P'>
        {/* <div className='fc-field-row fc--disp-flex fc--fdir-row width100P'> */}
        <div className={errorInput}>
          <label className="ta-right" htmlFor={field.name}>{field.label}</label>
          <input 
            {...field.input}
            type="text"
            placeholder={field.placeholder}
          />
        </div>
        <div className="fc-field-row-error fc--disp-flex fc--fdir-row fc--jCont-fe width100P">
          <div className="error fc--disp-flex fc--fdir-row fc--jCont-fs width80P">
            <div className="fc--disp-flex fc--fdir-row fc--jCont-fs fs16">
              {touched ? error : ''}
            </div>
          </div>
        </div>
      </div>
    )
  }
  
  render(){
    return (
      <fieldset className="fc--disp-flex fc--fdir-col fc--aItem-ce">
        <h2 className="fs40 fw300 ls24 fcBlack ta-cent">Sign Up</h2>
        <hr className="modalHR mt35" />
        <form action="">
          <div className="fc-fieldset">
            <Field
              label='Name:'
              name='name'
              placeholder='Name'
              component={this.renderField}
            />
            <Field 
              label='Username:'
              name='username'
              placeholder='Username'
              component={this.renderField}
            />
            <Field 
              label='Email:'
              name='email'
              placeholder='Email'
              component={this.renderField}
            />
            <Field 
              label='Password:'
              name='password'
              placeholder='Password'
              component={this.renderField}
            />
            <Field 
              label='Confirm Password:'
              name='confirmpassword'
              placeholder='Confirm Password'
              component={this.renderField}
            />
          </div>
          <hr className="modalHR mt130" />
          <div className="ta-cent">
            <button type="submit" className="btn btnFillClrSchGreen00b371 pdTB2LR8 fs20 fw500 ls12 mt30">Sign Up</button>
          </div>
        </form>
      </fieldset>
    )
  }
}

export const SignUpFormEx = reduxForm({
  validate: validate,
  form: 'SignUpForm'
})(SignUpModalForm)

export class VerifyAccountModalForm extends Component {
  constructor(props){
    super(props)
  }
  render(){
    return (
      <fieldset className="fc--disp-flex fc--fdir-col fc--aItem-ce">
        <h2 className="fs40 fw300 ls24 fcBlack ta-cent">Verify Your Account</h2>
        <hr className="modalHR mt35" />
        <form action="">
          <div className="fc-fieldset">
            <div className="fc-field fc--disp-flex fc--fdir-col fc--jCont-ce width80P">
              <div className="fc-field-row fc--disp-flex fc--fdir-row width100P">
                <label htmlFor="confirmUsername">Username:</label>
                <input type="text" name="confirmUsername" placeholder="Username" />
              </div>
            </div>
            <div className="fc-field fc--disp-flex fc--fdir-col fc--jCont-ce width80P">
              <div className="fc-field-row fc--disp-flex fc--fdir-row width100P">
                <label htmlFor="confirmCode">Verification Code:</label>
                <input type="text" name="confirmCode" placeholder="Confirmation Code" />
              </div>
            </div>
          </div>
          <hr className="modalHR mt130" />
          <div className="ta-cent">
            <button type="submit" className="btn btnFillClrSchGreen00b371 pdTB2LR8 fs20 fw500 ls12 mt30">Verify Your Account</button>
          </div>
        </form>
      </fieldset>
    )
  }
}

class SignInModalForm extends Component {
  constructor(props){
    super(props)
  }
  
  renderField(field){
    const { meta: { touched, error }} = field;
    const errorInput = `fc-field-row fc--disp-flex fc--fdir-row width100P ${touched && error ? 'input-invalid' : ''}`
    return (
      <div className="fc-field fc--disp-flex fc--fdir-col fc--jCont-ce width80P">
        <div className={errorInput}>
          <label htmlFor={field.name}>{field.label}</label>
          <input
            {...field.input}
            type="text"
            placeholder={field.placeholder}
          />
        </div>
        <div className="fc-field-row-error fc--disp-flex fc--fdir-row fc--jCont-fe width100P">
          <div className="error fc--disp-flex fc--fdir-row fc--jCont-fs width80P">
            <div className="fc--disp-flex fc--fdir-row fc--jCont-fs fs16">
              { touched ? error : ''}
            </div>
          </div>
        </div>
      </div>
    )
  }
  
  render(){
    return (
      <fieldset className="fc--disp-flex fc--fdir-col fc--aItem-ce">
        <h2 className="fs40 fw300 ls24 fcBlack ta-cent">Sign In</h2>
        <hr className="modalHR mt35" />
        <form action="">
          <div className="fc-fieldset">
            <Field 
              label='Email:'
              name='emailLogin'
              placeholder='Email'
              component={this.renderField}
            />
            <Field 
              label='Password:'
              name='passwordLogin'
              placeholder='Password'
              component={this.renderField}
            />
          </div>
          <hr className="modalHR mt130" />
          <div className="ta-cent">
            <button className="btn btnFillClrSchGreen00b371 pdTB2LR8 fs20 fw500 ls12 mt30">Sign In</button>
          </div>
        </form>
      </fieldset>
    )
  }
}

export const SignInFormEx = reduxForm({
  validate: validate,
  form: 'SignInForm'
})(SignInModalForm)

class SubmitLessonRequestModalForm extends Component {
  constructor(props){
    super(props)
  }
  
  renderField(field){
    const { meta: { touched, error }} = field;
    const errorInput = `fc-field-row-full fc--disp-flex fc--fdir-row mt10 ${touched && error ? 'input-invalid' : ''}`
    return(
      <div className="fc-field fc--disp-flex fc--fdir-col fc--jCont-ce width90P mt25">
        <div className="fc-field-row-full fc--disp-flex fc--fdir-row mt10">
          <label htmlFor={field.name}>{field.label}</label>
        </div>
        <div className={errorInput}>
          <input 
            {...field.input}
            type="text"
            placeholder={field.placeholder}
          />
        </div>
        <div className="error fc-field-row-full fc--disp-flex fc--fdir-row width100P">
          {/* <div className=" fc--disp-flex fc--fdir-row fc--jCont-fs width90P"> */}
            <div className="fc--disp-flex fc--fdir-row fc--jCont-fs fs16">
              { touched ? error : '' }
            </div>
          {/* </div> */}
        </div>
      </div>
    )
  }
  
  render(){
    return (
      <fieldset className="fc--disp-flex fc--fdir-col fc--aItem-ce">
        <h2 className="fs40 fw300 ls24 fcBlack ta-cent">Submit a Lesson Request</h2>
        <hr className="modalHR mt35" />
        <form action="">
          <div className="fc-fieldset">
            <Field
              label='Title:'
              name='lessonTitle'
              placeholder='Lesson Title'
              component={this.renderField}
            />
            <Field
              label='Description:'
              name='lessonDescription'
              placeholder='Lesson Description'
              component={this.renderField}
            />
            <Field 
              label='Taught by:'
              name='lessonTaughtby'
              placeholder='Select Users To Teach This Lesson'
              component={this.renderField}
            />
          </div> 
          <hr className="modalHR mt130" />
          <div className="ta-cent">
            <button className="btn btnFillClrSchGreen00b371 pdTB2LR8 fs20 fw500 ls12 mt30">Submit Lesson</button>
          </div>
        </form>
      </fieldset>
    )
  }
}

export const SubmitLessonRequestFormEx = reduxForm({
  validate: validate,
  form: 'SubmitLessonRequestForm'
})(SubmitLessonRequestModalForm)

class SubmitInterviewQuestionModalForm extends Component {
  constructor(props){
    super(props)
  }
  
  renderField(field){
    const { meta: { touched, error }} = field;
    const errorInput = `fc-field-row-full fc--disp-flex fc--fdir-row mt10 ${touched && error ? 'input-invalid' : ''}`
    return(
      <div className="fc-field fc--disp-flex fc--fdir-col fc--jCont-ce width90P mt25">
        <div className="fc-field-row-full fc--disp-flex fc--fdir-row mt10">
          <label htmlFor={field.name}>{field.label}</label>
        </div>
        <div className={errorInput}>
          <input 
            {...field.input}
            type="text"
            placeholder={field.placeholder}
          />
        </div>
        <div className="error fc-field-row-full fc--disp-flex fc--fdir-row width100P">
          <div className="fc--disp-flex fc--fdir-row fc--jCont-fs fs16">
            { touched ? error : '' }
          </div>
        </div>
      </div>
    )
  }
  
  render(){
    return (
      <fieldset className="fc--disp-flex fc--fdir-col fc--aItem-ce">
        <h2 className="fs40 fw300 ls24 fcBlack ta-cent">Submit an Interview Question</h2>
        <hr className="modalHR mt35" />
        <form action="">
          <div className="fc-fieldset">
            <Field 
              label='Question Title:'
              name='interviewQuestionTitle'
              placeholder='Question Title'
              component={this.renderField}
            />
            <Field 
              label='Question Details:'
              name='interviewQuestionDetails'
              placeholder='Question Details'
              component={this.renderField}
            />
            <Field
              label='Tag profession, skills and languages'
              name='interviewQuestionTags'
              placeholder='Enter at Least One Tag for this Interview Question'
              component={this.renderField}
            />
          </div>
          <hr className="modalHR mt130" />
          <div className="ta-cent">
            <button type="submit" className="btn btnFillClrSchGreen00b371 pdTB2LR8 fs20 fw500 ls12 mt30">Submit Interview Question</button>
          </div>
        </form>
      </fieldset>
    )
  }
}

export const SubmitInterviewQuestionFormEx = reduxForm({
  validate: validate,
  form: 'SubmitInterviewQuestionForm'
})(SubmitInterviewQuestionModalForm)
class SubmitInterviewQuestionAnswerModalForm extends Component {
  constructor(props){
    super(props)
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
            { touched ? error : ''}
          </div>
        </div>
      </div>
    )
  }
  
  render(){
    // const { intQuestion } = this.props
    // const { intQuestion: { title, description, categories }} = DM
    return (
      <fieldset className="fc--disp-flex fc--fdir-col fc--aItem-ce">
        <h2 className="fs40 fw300 ls24 fcBlack ta-cent">Reply to Interview Question</h2>
        <hr className="modalHR mt35" />
        <div className="">
          <h5 className="fw500 ls18 fcGreyb9 mt30">{this.props.intQuestion[DM.intQuestion.title]}</h5>
          <hr className="modalHR mt20" />
          <p className="fs16 ls10 fw300 fcBlack mt20">
            {this.props.intQuestion[DM.intQuestion.description]}
          </p>
          <hr className="modalHR mt30"/>
        
          <CategoryList lessonCategories={this.props.intQuestion[DM.intQuestion.categories]} />
        </div>
        
        <form action="">
          <div className="fc-fieldset">
            <Field
              label='Your Reply:'
              name='interviewQuestionAnswerDescription'
              placeholder='Please Enter Your Reply'
              component={this.renderField}
            />
          </div>
          <hr className="modalHR mt130" />
          <div className="ta-cent">
            <button className="btn btnFillClrSchGreen00b371 pdTB2LR8 fs20 fw500 ls12 mt30">Submit Answer</button>
          </div>
        </form>
      </fieldset>
    )
  }
}

export const SubmitInterviewQuestionAnswerFormEx = reduxForm({
  validate: validate,
  form: 'SubmitInterviewQuestionAnswerForm'
})(SubmitInterviewQuestionAnswerModalForm)

function validate(values){
  const errors = {};
  // logic
  if(!values.name){ errors.name = 'Please Enter Your Full Name' }
  if(!values.username){ errors.username = 'Please Enter A Username' }
  if(!values.email){ errors.email = 'Please Enter A Valid Email Address' }
  if(!values.password){ errors.password = 'Please Enter A Valid Password' }
  if(!values.confirmpassword){ errors.confirmpassword = 'Please Confirm Your Password' }
  // these are login modal
  if(!values.emailLogin){ errors.emailLogin = 'Please enter a Valid Email/Password Combination' }
  if(!values.passwordLogin){ errors.passwordLogin = 'Please enter a Valid Email/Password Combination' }
  // lesson modal
  if(!values.lessonTitle){ errors.lessonTitle = 'Please enter Lesson Title' }
  if(!values.lessonDescription){ errors.lessonDescription = 'Please enter a Lesson Description' }
  if(!values.lessonTaughtby){ errors.lessonTaughtby = 'Please enter At Least one User Who will Teach this Lesson' }
  // interview question modal
  if(!values.interviewQuestionTitle){ errors.interviewQuestionTitle = 'Please enter a Valid Title for the Interview Question' }
  if(!values.interviewQuestionDetails){ errors.interviewQuestionDetails = 'Please enter a Valid Description for the Interview Question' }
  if(!values.interviewQuestionTags){ errors.interviewQuestionTags = 'Please enter a Minimum of One Tag' }
  // interview question answer modal
  if(!values.interviewQuestionAnswerDescription){ errors.interviewQuestionAnswerDescription = 'Please enter a Valid Reply to the Interview Question' }
  
  // return object - if returns empty validation is good - submit.  if returns an object with something then it is bad.
  return errors
}
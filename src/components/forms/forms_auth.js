import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form';

import ValidationMethods from '../../functions/validationMethods'
import { signUp, confirmSignUp, signIn, signInGetUserInfo } from '../../functions/authMethods'

import { history } from '../App'

import { ROUTES_REACT } from '../../standards/routes'

const {
  // dashboard,
  users_create
} = ROUTES_REACT;
class SignUpModalForm extends Component {
  // constructor(props){
    // super(props);
    
    // this.handleModalCloseOnSubmit = this.handleModalCloseOnSubmit.bind(this);
    // this.closeModalSignup = this.closeModalSignup.bind(this);
    // this.openModalVerifyAccount = this.openModalVerifyAccount.bind();
  // }
  
  componentDidMount(){
  }
  
  
  onSubmit = (formValues) => {
    const params = {
      username: formValues.username,
      password: formValues.password,
      email: formValues.email,
      name: formValues.name
    }
    // this is async
    // {
    //   code: "UsernameExistsException"
    //   message: "User already exists"
    //   name: "UsernameExistsException"
    // }
    // console.log(this.props, 'IN ON SUBMITOUTSIDE SIGNUP')
    signUp(params)
      .then(data => {
        console.log('data: ', data);
        this.props.closeModalSignup();
        this.props.openModalVerifyAccount();
      })
      .catch(err => {
        // here don't close
        console.log('err: ', err)
      })
  }
  
  renderField(field){
    const { meta: { touched, error }} = field;
    const errorInput = `fc-field-row fc--disp-flex fc--fdir-row width100P ${touched && error ? 'input-invalid' : ''}`
    return(
      <div className="fc-field fc--disp-flex fc--fdir-col fc--jCont-ce width100P">
        {/* <div className="fc-field-row fc--disp-flex fc--fdir-row width100P"> */}
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
              {touched ? error : ""}
            </div>
          </div>
        </div>
      </div>
    )
  }
  
  render(){
    console.log('this.props in SignUp form', this.props)
    return (
      <fieldset className="fc--disp-flex fc--fdir-col fc--aItem-ce">
        <h2 className="fs33 fw300 ls24 fcBlack ta-cent">Sign Up</h2>
        <hr className="modalHR mt10" />
        <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
          <div className="fc-fieldset">
            <Field
              label="Name:"
              name="name"
              type="text"
              placeholder="Please Enter Your First and Last Name"
              component={this.renderField}
              labelStyle="width20P"
              inputStyle="width80P"
            />
            <Field 
              label="Username:"
              name="username"
              type="text"
              placeholder="Username"
              component={this.renderField}
              labelStyle="width20P"
              inputStyle="width80P"
            />
            <Field 
              label="Email:"
              name="email"
              type="text"
              placeholder="Email"
              component={this.renderField}
              labelStyle="width20P"
              inputStyle="width80P"
            />
            <Field 
              label="Password:"
              name="password"
              type="text"
              // type="password"
              placeholder="Password"
              component={this.renderField}
              labelStyle="width20P"
              inputStyle="width80P"
            />
            <Field 
              label="Confirm Password:"
              name="confirmPassword"
              // type="password"
              type="text"
              placeholder="Confirm Password"
              component={this.renderField}
              labelStyle="width20P"
              inputStyle="width80P"
            />
          </div>
          <hr className="modalHR mt80" />
          <div className="ta-cent">
            <button type="submit" className="btn btnFillClrSchGreen00b371 pdTB2LR8 fs20 fw500 ls12 mt30">Submit</button>
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
  onSubmit = (formValues) => {
    // {confirmUsername: "sethborne", confirmCode: "175433"}
    // console.log('formVals @ Verify Account', formValues)
    const params = {
      username: formValues.confirmUsername,
      code: formValues.confirmCode
    }
    
    // {
    //   code: "CodeMismatchException", 
    //   name: "CodeMismatchException", 
    //   message: "Invalid verification code provided, please try again."
    // }

    confirmSignUp(params)
      .then(data => {
        console.log('data: ', data);
        this.props.closeModalVerifyAccount();
        this.props.openModalSignin();
        return data
      })
      .catch(err => {
        console.log('err: ', err);
      })
  }
  
  renderField(field){
    const { meta: { touched, error }} = field;
    const errorInput = `fc-field-row fc--disp-flex fc--fdir-row width100P ${touched && error ? 'input-invalid' : ''}`
    return(
      <div className="fc-field fc--disp-flex fc--fdir-col fc--jCont-ce width100P">
        {/* <div className="fc-field-row fc--disp-flex fc--fdir-row width100P"> */}
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
              {touched ? error : ""}
            </div>
          </div>
        </div>
      </div>
    )
  }
  
  render(){
    return (
      <fieldset className="fc--disp-flex fc--fdir-col fc--aItem-ce">
        <h2 className="fs33 fw300 ls24 fcBlack ta-cent">Verify Account</h2>
        <hr className="modalHR mt10" />
        <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
          <div className="fc-fieldset">
            <Field
              label="Username:"
              name="confirmUsername"
              type="text"
              placeholder="Enter Username"
              component={this.renderField}
              labelStyle="width20P"
              inputStyle="width80P"
            />
            <Field 
              label="Verification Code:"
              name="confirmCode"
              type="text"
              placeholder="Enter Confirmation Code"
              component={this.renderField}
              labelStyle="width20P"
              inputStyle="width80P"
            />
          </div>
          <hr className="modalHR mt80" />
          <div className="ta-cent">
            <button type="submit" className="btn btnFillClrSchGreen00b371 pdTB2LR8 fs20 fw500 ls12 mt30">Submit</button>
          </div>
        </form>
      </fieldset>
    )
  }
}

export const VerifyAccountFormEx = reduxForm({
  validate: validate,
  form: 'VerifyAccountForm'
})(VerifyAccountModalForm)

class SignInModalForm extends Component {
  onSubmit = (formValues) => {
    console.log('formVals @ SignIn', formValues)
    // {emailLogin: "sethborne@gmail.com", passwordLogin: "sethseth"}
    const params = {
      username: formValues.usernameLogin,
      password: formValues.passwordLogin
    }
    
    signIn(params)
      .then(val => {
        console.log('val', val);
        // return val
        signInGetUserInfo(val)
          .then(userInfo => {
            console.log('userInfo', userInfo);
            // successful obj at this place.
            // { 
            //   attributes: {
            //     sub: "07c81143-9660-4737-a63a-e5ab1e14e7ef", 
            //     email_verified: true, 
            //     name: "Tim Tam", 
            //     email: "sethborne@gmail.com"
            //   }
            //   id: "us-west-2:f25eb9a3-3561-418b-99b4-0efdc9f99427"
            //   username: "timtam" 
            // }
            // need to make an action request here, if there is a user that has this id in the Database
            // if there is a userId that matches
              // then check if isProfileSetup is true
              // if true - then navigate to dashboard
              // if false - need to construct a new user
            
            // need to navigate away here
            history.push(users_create, { userInfo: userInfo})
            return userInfo;
          })
          .catch(err => {
            console.log('err', err);
            // this error would need to go to the signinform, how?
            return err;
          })
      })
      .catch(err => {
        console.log('err', err);
        // this error would need to go to the signinform
        return err;
      })
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
  
  render(){
    return (
      <fieldset className="fc--disp-flex fc--fdir-col fc--aItem-ce">
        <h2 className="fs40 fw300 ls24 fcBlack ta-cent">Sign In</h2>
        <hr className="modalHR mt35" />
        <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
          <div className="fc-fieldset">
            <Field 
              label="Username:"
              name="usernameLogin"
              type="text"
              placeholder="UserName"
              component={this.renderField}
              labelStyle="width20P"
              inputStyle="width80P"
            />
            <Field 
              label="Password:"
              name="passwordLogin"
              type="text"
              // type="password"
              placeholder="Password"
              component={this.renderField}
              labelStyle="width20P"
              inputStyle="width80P"
            />
          </div>
          <hr className="modalHR mt80" />
          <div className="ta-cent">
            <button type="submit" className="btn btnFillClrSchGreen00b371 pdTB2LR8 fs20 fw500 ls12 mt30">Submit</button>
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

function validate(values){
  const errors = {};
  // logic
  // signup
  // Name / Full Name
  if(!values.name){ errors.name = 'Please Enter Your Full Name' }
  if(values.name){
    if(!ValidationMethods.checkForFullName(values.name)){
      errors.name = 'Please Enter a Valid First and Last Name'
    }
    if(ValidationMethods.checkForFullName(values.name)){
      // then we have a valid name
      // 
      const charMin = 2;
      if(!ValidationMethods.isEachWordOverCharLimit(values.name.split(' '), charMin)){
        errors.name = `All Name Values Must Have at Least ${charMin} Characters`
      }
    }
  }
  if(!values.username){ errors.username = 'Please Enter A Username' }
  // if username values then validate
  const usernameCharLimit = 2;
  if(values.username){
    if(!ValidationMethods.isWordOverCharLimit(values.username, usernameCharLimit)){
      errors.username = `Usernames must be at Least ${usernameCharLimit} Characters`
    }
    if(ValidationMethods.doesHaveSpaces(values.username)){
      errors.username = 'Usernames can not have Spaces'
    }
  }
  if(!values.email){ errors.email = 'Please Enter A Valid Email Address' }
  if(values.email){
    // email regex
    if(!ValidationMethods.isEmailAddressValid(values.email)){
      errors.email = 'Please Enter A Valid Email Address'
    }
  }
  const passCharLimit = 6;
  if(!values.password){ errors.password = 'Please Enter A Valid Password' }
  if(values.password){
    if(!ValidationMethods.isWordOverCharLimit(values.password, passCharLimit)){
      errors.password = `Passwords must be over ${passCharLimit} Characters`
    }
  }
  if(!values.confirmPassword){ errors.confirmPassword = 'Please Confirm Your Password' }
  if(values.confirmPassword){
    if(!ValidationMethods.isWordOverCharLimit(values.confirmPassword, passCharLimit)){
      errors.confirmPassword = `Passwords must be over ${passCharLimit} characters`
    }
  }
  // if the password and confirm password do not match
  if(values.password !== values.confirmPassword){ errors.confirmPassword = `Password and Confirm Password must Match` }
  
  // validate modal
  if(!values.confirmUsername){ errors.confirmUsername = 'Please Enter Your Username'}
  if(values.confirmUsername){
    if(!ValidationMethods.isWordOverCharLimit(values.confirmUsername, usernameCharLimit)){
      errors.confirmUsername = `Usernames must be at Least ${usernameCharLimit} Characters`
    }
    if(ValidationMethods.doesHaveSpaces(values.confirmUsername)){
      errors.confirmUsername = 'Usernames can not have Spaces'
    }
  }
  if(!values.confirmCode){ errors.confirmCode = 'Please Enter Your Confirmation Code'}
  if(values.confirmCode){
    const confirmCodeCharLimit = 6
    if(!ValidationMethods.isWordOverCharLimit(values.confirmCode, confirmCodeCharLimit)){ errors.confirmCode = `Confirmation Codes must be at least ${confirmCodeCharLimit} Characters`}
    // if(!ValidationMethods.isValidVerificationCode(values.confirmCode)){ errors.confirmCode = `Invalid Confirmation Code`}
  }
  // these are signin modal
  if(!values.usernameLogin || !values.passwordLogin){ errors.passwordLogin = 'Please enter a Valid Username/Password Combination' }
  // if(!values.passwordLogin){ errors.passwordLogin = 'Please enter a Valid Email/Password Combination' }
  if(values.usernameLogin){
    // email regex
    if(!ValidationMethods.isWordOverCharLimit(values.usernameLogin, usernameCharLimit)){
      errors.usernameLogin = 'Please Enter a Valid Username'
    }
  }
  if(values.passwordLogin){
    if(!ValidationMethods.isWordOverCharLimit(values.passwordLogin, passCharLimit)){
      errors.passwordLogin = `Passwords must be over ${passCharLimit} Characters`
    }
  }
  // return object - if returns empty validation is good - submit.  if returns an object with something then it is bad.
  return errors
}


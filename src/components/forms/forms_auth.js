import React, { Component } from 'react'
import { Field, reduxForm, SubmissionError } from 'redux-form';

import ValidationMethods from '../../functions/validationMethods'
import { signUp, confirmSignUp, resendSignUp, signIn, changePassword, forgotPassword, forgotPasswordSubmit, verifyCurrentUserAttribute } from '../../functions/authMethods'

import { history } from '../../index'

import { ROUTES_REACT } from '../../standards/routes'

const {
  // dashboard,
  users_create,
  users_setup,
  users_setup_id
} = ROUTES_REACT;

class SignUpModalForm extends Component {
  constructor(props){
    super(props)
    this.state = {
      signUpSuccessful: false,
      collapseForm: false
    }
  }
  
  openModalVerifyAccount = () => {
    this.props.closeModalSignup();
    this.props.openModalVerifyAccount();
  }
  // onSubmit = (formValues) => {
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
    // ==================================================
    return signUp(params)
      .then(data => {
        console.log('@signUp data: ', data);
        // if data is successful:
        // {
        //   user: CognitoUser, 
        //   userConfirmed: false, 
        //   userSub: "4a3dabd5-9f14-4bdb-8810-d4548d45879a"
        // }
        if(data.user){
          // open the verification modal
          this.setState({ 
            signUpSuccessful: !this.state.signUpSuccessful,
            collapseForm: !this.state.collapseForm
          })
          // this.toggleForm();
        }
        // if data is an error, will look like:
        // {
        //   code: "UsernameExistsException"
        //   message: "User already exists"
        //   name: "UsernameExistsException"
        // }
        else if(data.code === 'UsernameExistsException'){
          // console.log('@signUp err then: ', data)
          throw new SubmissionError({ username: 'Username Already Exists, Please Enter a Different Username'})
        }
      })
      .catch(err => {
        console.log('@signUp err: ', err)
        // SubmissionError { 
        //   errors: {
        //     username: "Username Already Exists, Please Enter a Different Username" 
        //   }, 
        //   message: "Submit Validation Failed", 
        //   name: "SubmissionError", 
        //   stack: "SubmissionError: Submit Validation Failed↵    at e…al:///./src/components/forms/forms_auth.js:84:19)"
        // } 
        if(err.name === 'SubmissionError'){
          // console.log('@signUp err catch: ', err)
          throw new SubmissionError({ username: 'Username Already Exists, Please Enter a Different Username'})
        }
        return err
      })
    // ==================================================
    
  }
  
  renderField(field){
    const { meta: { touched, error }} = field;
    const errorInput = `fc-field-row fc--disp-flex fc--fdir-row width100P ${touched && error ? 'input-invalid' : ''}`
    // console.log('error @ renderField: ', error)
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
    // console.log('this.props in SignUp form', this.props)
    const { error } = this.props
    // console.log('error @ render signUp: ', error, 'this.props: ', this.props, 'this.state: ', this.state)
    return (
      <fieldset className="fc--disp-flex fc--fdir-col fc--aItem-ce">
      { this.state.signUpSuccessful === false && this.state.collapseForm === false &&
        <>
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
                labelStyle="ta-right width20P"
                inputStyle="width80P"
              />
              <Field 
                label="Username:"
                name="username"
                type="text"
                placeholder="Username"
                component={this.renderField}
                labelStyle="ta-right width20P"
                inputStyle="width80P"
              />
              {error && {error}}
              <Field 
                label="Email:"
                name="email"
                type="text"
                placeholder="Email"
                component={this.renderField}
                labelStyle="ta-right width20P"
                inputStyle="width80P"
              />
              <Field 
                label="Password:"
                name="password"
                type="text"
                // type="password"
                placeholder="Password"
                component={this.renderField}
                labelStyle="ta-right width20P"
                inputStyle="width80P"
              />
              <Field 
                label="Confirm Password:"
                name="confirmPassword"
                // type="password"
                type="text"
                placeholder="Confirm Password"
                component={this.renderField}
                labelStyle="ta-right width20P"
                inputStyle="width80P"
              />
            </div>
            <div className="ta-cent mt20">
              <h6
                className="modalNav fs14 fw300 ls10 fcGreenRT"
                onClick={() => this.openModalVerifyAccount()}
                >
                Need to Confirm Your Account? Just Click Here!
              </h6>
            </div>
            <hr className="modalHR mt40" />
            <div className="ta-cent">
              <button type="submit" className="btn btnFillClrSchGreen00b371 pdTB2LR8 fs20 fw500 ls12 mt30">Submit</button>
            </div>
          </form>
          </>
        }
        {
          this.state.signUpSuccessful &&
          <>
            <div className="ta-cent">
              <h2 className="fs33 fw300 ls24 fcBlack ta-cent">Sign Up Successful</h2>
              <hr className="modalHR mt10" />
              <p className="fs16 fw300 ls10 fcGrey424041 mt10 wspl">An email containing a confirmation code was sent to the address specified in the Sign Up Form.  Once recieved, please click below to proceed to the Account Verification page.</p>
              {/* <h5 className="fs20 fcGrey424041 mt20">Successful Signup</h5> */}
              <button 
                type="submit" 
                className="btn btnFillClrSchGreen00b371 pdTB2LR8 fs20 fw500 ls12 mt30"
                onClick={() => this.openModalVerifyAccount()}
                >Verify Your Account</button>
            </div>
          </>
        }
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
    this.state = {
      verificationSuccessful: false,
      collapseForm: false
    }
  }
  openModalResendVerifyAccount = () => {
    this.props.closeModalVerifyAccount();
    this.props.openModalResendVerifyAccount();
  }
  continueToModalSignIn = () => {
    this.props.closeModalVerifyAccount();
    this.props.openModalSignIn();
  }
  
  onSubmit = (formValues) => {
    // {confirmUsername: "sethborne", confirmCode: "175433"}
    // console.log('formVals @ Verify Account', formValues)
    const params = {
      username: formValues.confirmUsername,
      code: formValues.confirmCode
    }
    return confirmSignUp(params)
      .then(data => {
        console.log('data: ', data);
        if(data === 'SUCCESS'){
          // if promise was successful, looks like it comes back as 'SUCCESS'
          this.setState({
            verificationSuccessful: !this.state.verificationSuccessful,
            collapseForm: !this.state.collapseForm
          })
        }
        // if username is not found
        // {
        //   code: "UserNotFoundException", 
        //   name: "UserNotFoundException", 
        //   message: "Username/client id combination not found."
        // }
        // else 
        if(data.code === 'UserNotFoundException'){
          console.log('@ confirmSignUp err @ data UserNotFoundException: ', data)
          throw new SubmissionError({ _error: 'Username / Verification Code Combination is not Found'})
          // ,  _error: 'Username / Confirmation (Username) Global'
        }
        // if you submit an incorrect verification number
        // {
        //   code: "CodeMismatchException"
        //   message: "Invalid verification code provided, please try again."
        //   name: "CodeMismatchException"
        // }
        if(data.code === "CodeMismatchException"){
          console.log('@ confirmSignUp err @ data CodeMismatchException: ', data)
          throw new SubmissionError({ _error: 'Verification Code is Invalid'})
        }
        // if you submit to many times in a row!
        // {
        //   code: "LimitExceededException"
        //   message: "Attempt limit exceeded, please try after some time."
        //   name: "LimitExceededException"
        // }
        if(data.code === 'LimitExceededException'){
          console.log('@ confirmSignUp err @ data UserNotFoundException: ', data)
          throw new SubmissionError({ _error: 'Unable to Complete Request' })
          // confirmCode: 'Unable to Complete Request'
          // , _error: 'Unable to Complete Request'
        }
        // return data
      })
      // .catch(err => {
      //   console.log('err @ confirmSignUp: ', err);
      //   // return err
      // })
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
    const { error } = this.props
    
    console.log('error: ', error, 'this.props: ', this.props)
    return (
      <fieldset className="fc--disp-flex fc--fdir-col fc--aItem-ce">
      { this.state.verificationSuccessful === false && this.state.collapseForm === false &&
        <>
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
                labelStyle="ta-right width20P"
                inputStyle="width80P"
              />
              <Field 
                label="Verification Code:"
                name="confirmCode"
                type="text"
                placeholder="Enter Confirmation Code"
                component={this.renderField}
                labelStyle="ta-right width20P"
                inputStyle="width80P"
              />
              {/* {error && {error}} */}
              {this.renderErrorIfExists(error)}
            </div>
            <div className="ta-cent mt20">
              <h6
                className="modalNav fs14 ls10 fw300 fcGreenRT"
                onClick={() => this.openModalResendVerifyAccount()}
                >Click This to Resend Your Verification Code</h6>
            </div>
            <hr className="modalHR mt40" />
            <div className="ta-cent">
              <button type="submit" className="btn btnFillClrSchGreen00b371 pdTB2LR8 fs20 fw500 ls12 mt30">Submit</button>
            </div>
          </form>
        </>
      }
      {
        this.state.verificationSuccessful &&
        <>
          <div className="ta-cent">
            <h2 className="fs33 fw300 ls24 fcBlack ta-cent">Sign Up Successful</h2>
            <hr className="modalHR mt10" />
            {/* <h5 className="fs20 fcGrey424041 mt20">Successful Signup</h5> */}
            <button 
              type="submit" 
              className="btn btnFillClrSchGreen00b371 pdTB2LR8 fs20 fw500 ls12 mt30"
              onClick={() => this.continueToModalSignIn()}
              >Click to Login</button>
          </div>
        </>
      }
      </fieldset>
    )
  }
}

export const VerifyAccountFormEx = reduxForm({
  validate: validate,
  form: 'VerifyAccountForm'
})(VerifyAccountModalForm)

export class ResendVerifyAccountForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      resendVerificationSucessful: false,
      collapseForm: false
    }
  }
  returnToModalVerifyAccount = () => {
    this.props.closeModalResendVerifyAccount();
    this.props.openModalVerifyAccount();
  }
  onSubmit = (formValues) => {
    // const params = { username: formValues.resendUsername };
    return resendSignUp(formValues.resendUsername)
      .then(response => {
        console.log('response: ', response)
        if(response.code === 'UserFoundSuccessfully'){
          console.log('success @ resend Onsubmit then')
          this.setState({
            resendVerificationSucessful: !this.state.resendVerificationSucessful,
            collapseForm: !this.state.collapseForm
          })
        }
        // code: "UserNotFoundException", 
        // name: "UserNotFoundException", 
        // message: "Username/client id combination not found."
        else if(response.code === 'UserNotFoundException'){
          console.log('@ confirmSignUp err @ data UserNotFoundException: ', response)
          throw new SubmissionError({ _error: 'Specified User was not Found' })
        }
        // code: "SerializationException"
        // message: "Start of structure or map found where not expected."
        // name: "SerializationException"
        else if(response.code === 'SerializationException'){
          console.log('@ confirmSignUp err @ data SerializationException: ', response)
          throw new SubmissionError({ _error: 'Error Submitting Resend Request - Please Try Again'})
        }
        // code: "LimitExceededException"
        // message: "Attempt limit exceeded, please try after some time."
        // name: "LimitExceededException"
        else if(response.code === 'LimitExceededException'){
          console.log('@ confirmSignUp err @ data LimitExceededException: ', response)
          throw new SubmissionError({ _error: 'Error Submitting Resend Request - Please Try Again' })
        }
        // return response
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
    const { error } = this.props
    console.log('error: ', error, 'this.props: ', this.props)
    return (
      <fieldset className="fc--disp-flex fc--fdir-col fc--aItem-ce">
        { this.state.resendVerificationSucessful === false && this.state.collapseForm === false &&
          <>
          <h2 className="fs33 fw300 ls24 fcBlack ta-cent">Resend Verify Account Email</h2>
          <hr className="modalHR mt10"/>
          <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
            <div className="fc-fieldset">
              <Field
                label="Username:"
                name="resendUsername"
                type="text"
                placeholder="Enter Username"
                component={this.renderField}
                labelStyle="ta-right width20P"
                inputStyle="width80P"
              />
              {this.renderErrorIfExists(error)}
            </div>
            {/* <div className="ta-cent mt20">
              <h6
                className="modalNav fs14 ls10 fw300 fcGreenRT"
                onClick={() => this.openModalReturnToVerifyAccount()}
              >Click to Return to Account Verification</h6>
            </div> */}
            <hr className="modalHR mt40" />
            <div className="ta-cent">
              <button type="submit" className="btn btnFillClrSchGreen00b371 pdTB2LR8 fs20 fw500 ls12 mt30">Resend Verification Email</button>
            </div>
          </form>
          </>
        }
        {
          this.state.resendVerificationSucessful &&
          <>
            <div className="ta-cent">
              <h2 className="fs33 fw300 ls24 fcBlack ta-cent">Confirmation Email Successfully Resent</h2>
              <hr className="modalHR mt10" />
              <p className="fs16 fw300 ls10 fcGrey424041 mt10 wspl">A confirmation email was sent to the email address connected to the Username that you entered. Return to the Verify Account Modal and enter your Username and the Confirmation Code to finish verifying your account.</p>
              {/* <h5 className="fs20 fcGrey424041 mt20">Successful Signup</h5> */}
              <button 
                type="submit" 
                className="btn btnFillClrSchGreen00b371 pdTB2LR8 fs20 fw500 ls12 mt30"
                onClick={() => this.returnToModalVerifyAccount()}
                >Return to Verify Account Modal</button>
            </div>
          </>
        }
      </fieldset>
    )
  }
}

export const ResendVerifyAccountFormEx = reduxForm({
  validate: validate,
  form: 'ResendVerifyAccountForm'
})(ResendVerifyAccountForm)

class SignInModalForm extends Component {
  constructor(props){
    super(props)
    this.state = {
      numberOfLoginErrors: 0
    }
  }
  
  onSubmit = (formValues) => {
    console.log('formVals @ SignIn', formValues)
    // {emailLogin: "sethborne@gmail.com", passwordLogin: "sethseth"}
    const params = {
      username: formValues.usernameLogin,
      password: formValues.passwordLogin
    }
    
    return signIn(params)
      .then(response => {
        console.log('@ forms_auth signIn - response: ', response);
        // { Returns CognitoUser Object
          // signInUserSession: CognitoUserSession Obj {
          //   accessToken: CognitoAccessToken Obj {
          //     jwtToken: "AS_STRING"
          //     payload: {
          //       client_id: "AS_STRING"
          //       sub: "AS_STRING"
          //       username: "AS_STRING"
          //     }
          //   }
          //   idToken: CognitoIDToken {
          //      jwtToken: "AS_STRING"
          //      payload: {
          //        cognito:username: "AS_STRING"
          //        email: "AS_STRING"
          //        name: "AS_STRING"
          //        sub: "AS_STRING"
          //      }
          //   }
          //   refreshToken: CognitoRefreshToken {
          //     token: "AS_STRING"
          //   }
          //   }
        // }
        if(response.username && response.signInUserSession){
          // if the promise returns a CognitoUser Object, then form the data and send to users create
          const userObjFromCognito = {
            sub: response.signInUserSession.idToken.payload.sub,
            username: response.signInUserSession.idToken.payload['cognito:username'],
            name: response.signInUserSession.idToken.payload.name,
            email: response.signInUserSession.idToken.payload.email
          }
          const userId = response.signInUserSession.idToken.payload.sub
          // need to navigate away here so we can get to the create user page
          // history.push(users_create, {userObjFromCognito: userObjFromCognito})
          // history.push(users_setup, {userObjFromCognito: userObjFromCognito})
          history.push(`${users_setup}/${userId}`, {userObjFromCognito: userObjFromCognito})
        }
        
        // if the username is not in Cognito
        // code: "UserNotFoundException"
        // message: "User does not exist."
        // name: "UserNotFoundException"
        if(response.code === 'UserNotFoundException'){
          console.log('@ signIn err @ data UserNotFoundException: ', response)
          this.setState({ numberOfLoginErrors: this.state.numberOfLoginErrors + 1})
          throw new SubmissionError({ _error: 'Invalid Username / Password Combination' })
        }
        // return cogUserObj;
        
        // code: "NotAuthorizedException"
        // message: "Incorrect username or password."
        // name: "NotAuthorizedException"
        if(response.code === 'NotAuthorizedException'){
          this.setState({ numberOfLoginErrors: this.state.numberOfLoginErrors + 1})
          console.log('@ signIn err @ data NotAuthorizedException: ', response)
          throw new SubmissionError({ _error: 'Invalid Username / Password Combination' })
        }
      })
  }
  
  // openModalChangePassword = () => {
  //   this.props.closeModalSignIn();
  //   this.props.openModalChangePassword();
  // }
  
  openModalForgotPassword = () => {
    this.props.closeModalSignIn();
    this.props.openModalForgotPassword();
  }
  
  openModalRecoverAccount = () => {
    this.props.closeModalSignIn();
    this.props.openModalRecoverAccount();
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
    // console.log('this.state: ', this.state)
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
              placeholder="Enter Username"
              component={this.renderField}
              labelStyle="width20P"
              inputStyle="width80P"
            />
            <Field 
              label="Password:"
              name="passwordLogin"
              type="text"
              // type="password"
              placeholder="Enter Password"
              component={this.renderField}
              labelStyle="width20P"
              inputStyle="width80P"
            />
            {this.renderErrorIfExists(error)}
          </div>
          {/* {
            this.state.numberOfLoginErrors < 3 &&
            
            <div className="grid grid--full">
              <div className="grid-cell">
                <div className="ta-cent mt20">
                  <h6
                    className="modalNav fs14 ls10 fw300 fcGreenRT"
                    onClick={() => this.openModalChangePassword()}
                    >Click to Change Your Password</h6>
                </div>
              </div>
            </div>
          } */}
          {
            this.state.numberOfLoginErrors >= 3 &&
            // this.state.numberOfLoginErrors > -1 &&
            <div className="grid grid--full">
              <div className="grid-cell">
                <div className="ta-cent mt20">
                  <h6
                    className="modalNav fs14 ls10 fw300 fcGreenRT"
                    onClick={() => this.openModalForgotPassword()}
                    >Forgot Your Password</h6>
                </div>
              </div>
              {/* <div className="grid-cell">
                <div className="ta-cent mt20">
                  <h6
                    className="modalNav fs14 ls10 fw300 fcGreenRT"
                    onClick={() => this.openModalRecoverAccount()}
                    >Click to Recover Your Account</h6>
                </div>
              </div> */}
            </div>
          }
          <hr className="modalHR mt40" />
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


class ChangePasswordModalForm extends Component {
  constructor(props){
    super(props)
    
    this.state = {
      changePasswordSucessful: false,
      collapseForm: false
    }
  }
  
  onSubmit = (formValues) => {
    console.log('formValues @ ChangePasswordModalForm: ', formValues)
    return changePassword(formValues.oldPassword, formValues.newPassword)
      .then(data => {
        // no response comes back
        console.log('data @ ChangePasswordModalForm: ', data)
          // what comes back is 'SUCCESS'
        if(data === 'SUCCESS'){
          this.setState({
            changePasswordSucessful: !this.state.changePasswordSucessful,
            collapseForm: !this.state.collapseForm
          })
        }
        // - if you give the wrong old password
        // { 
          //   code: "NotAuthorizedException"
          //   message: "Incorrect username or password."
          //   name: "NotAuthorizedException"
        // }
        // else 
        if(data.code === 'NotAuthorizedException'){
          console.log('@ ChangePasswordModalForm response (err) @ data NotAuthorizedException: ', data)
          throw new SubmissionError({ _error: 'Password Combination is Incorrect'})
          // ,  _error: 'Username / Confirmation (Username) Global'
        }                 
      })      
  }
  
  returnToUserEditPage = () => {
    this.props.closeModalChangePassword();
  }
  
  renderField = (field) => {
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
    const { error } = this.props
    console.log('error: ', error, 'this.props: ', this.props)
    return (
      <fieldset className="fc--disp-flex fc--fdir-col fc--aItem-ce">
        { this.state.changePasswordSucessful === false && this.state.collapseForm === false &&
          <>
          <h2 className="fs33 fw300 ls24 fcBlack ta-cent">Change Account Password</h2>
          <hr className="modalHR mt10"/>
          <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
            <div className="fc-fieldset">
              <Field
                label="Old Password:"
                name="oldPassword"
                type="text"
                placeholder="Enter Old Password"
                component={this.renderField}
                labelStyle="ta-right width20P"
                inputStyle="width80P"
              />
              <Field
                label="New Password:"
                name="newPassword"
                type="text"
                placeholder="Enter New Password"
                component={this.renderField}
                labelStyle="ta-right width20P"
                inputStyle="width80P"
              />
              {this.renderErrorIfExists(error)}
            </div>
            {/* <div className="ta-cent mt20">
              <h6
                className="modalNav fs14 ls10 fw300 fcGreenRT"
                onClick={() => this.openModalReturnToVerifyAccount()}
              >Click to Return to Account Verification</h6>
            </div> */}
            <hr className="modalHR mt40" />
            <div className="ta-cent">
              <button type="submit" className="btn btnFillClrSchGreen00b371 pdTB2LR8 fs20 fw500 ls12 mt30">Change Password</button>
            </div>
          </form>
          </>
        }
        {
          this.state.changePasswordSucessful &&
          <>
            <div className="ta-cent">
              <h2 className="fs33 fw300 ls24 fcBlack ta-cent">Password Successfully Changed</h2>
              <hr className="modalHR mt10" />
              <p className="fs16 fw300 ls10 fcGrey424041 mt10 wspl">Your password was successfully changed. Please click the button below to return to your profile page.</p>
              <button 
                type="submit" 
                className="btn btnFillClrSchGreen00b371 pdTB2LR8 fs20 fw500 ls12 mt30"
                onClick={() => this.returnToUserEditPage()}
                >Return to Edit Profile</button>
            </div>
          </>
        }
      </fieldset>
    )
  }
}

export const ChangePasswordModalFormEx = reduxForm({
  validate: validate,
  form: 'ChangePasswordForm'
})(ChangePasswordModalForm)

class ForgotPasswordModalForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      resendVerificationSucessful: false,
      collapseForm: false
    }
  }
  
  proceedToModalForgotPasswordSubmit = () => {
    this.props.closeModalForgotPassword();
    this.props.openModalForgotPasswordSubmit();
  }
  
  onSubmit = (formValues) => {
    return forgotPassword(formValues.username)
      .then(response => {
        console.log('response: ', response)
        if(response.CodeDeliveryDetails){
          // object at success
          // CodeDeliveryDetails: {
          //   AttributeName: "email"
          //   DeliveryMedium: "EMAIL"
          //   Destination: "***@g***.com"
          // }
          console.log('success @ forgotPassword Onsubmit then')
          this.setState({
            resendVerificationSucessful: !this.state.resendVerificationSucessful,
            collapseForm: !this.state.collapseForm
          })
        }
        else if(response.code === 'UserNotFoundException'){
          // error at invalid username
          // code: "UserNotFoundException"
          // message: "Username/client id combination not found."
          // name: "UserNotFoundException"
          console.log('@ forgotPassword err @ data UserNotFoundException: ', response)
          throw new SubmissionError({ _error: 'Invalid Username / Client Id' })
        }
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
    const { error } = this.props
    console.log('error: ', error, 'this.props: ', this.props)
    return (
      <fieldset className="fc--disp-flex fc--fdir-col fc--aItem-ce">
        { this.state.resendVerificationSucessful === false && this.state.collapseForm === false &&
          <>
          <h2 className="fs33 fw300 ls24 fcBlack ta-cent">Verification Code to Reset Forgotten Password</h2>
          <hr className="modalHR mt10"/>
          <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
            <div className="fc-fieldset">
              <Field
                label="Username:"
                name="username"
                type="text"
                placeholder="Enter Username"
                component={this.renderField}
                labelStyle="ta-right width20P"
                inputStyle="width80P"
              />
              {this.renderErrorIfExists(error)}
            </div>
            <hr className="modalHR mt40" />
            <div className="ta-cent">
              <button type="submit" className="btn btnFillClrSchGreen00b371 pdTB2LR8 fs20 fw500 ls12 mt30">Submit</button>
            </div>
          </form>
          </>
        }
        {
          this.state.resendVerificationSucessful &&
          <>
            <div className="ta-cent">
              <h2 className="fs33 fw300 ls24 fcBlack ta-cent">Confirmation Email Successfully Resent</h2>
              <hr className="modalHR mt10" />
              <p className="fs16 fw300 ls10 fcGrey424041 mt10 wspl">A confirmation email was sent to the email address connected to the Username that you entered. Click the Button below to Proceed to the Forgot Password / Submit New Password Modal</p>
              <button 
                type="submit" 
                className="btn btnFillClrSchGreen00b371 pdTB2LR8 fs20 fw500 ls12 mt30"
                onClick={() => this.proceedToModalForgotPasswordSubmit()}
                >Proceed to Submit New Password</button>
            </div>
          </>
        }
      </fieldset>
    )
  }
}

export const ForgotPasswordModalFormEx = reduxForm({
  validate: validate,
  form: 'ForgotPasswordForm'
})(ForgotPasswordModalForm)

class ForgotPasswordSubmitModalForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      resendVerificationSucessful: false,
      collapseForm: false,
      showErrorMessage: false,
      numberOfForgotPasswordSubmitErrors: 0
    }
  }
  
  openModalSignIn = () => {
    this.props.closeModalForgotPasswordSubmit();
    this.props.openModalSignIn();
  }
  
  returnToModalForgottenPassword = () => {
    this.props.closeModalForgotPasswordSubmit();
    this.props.openModalForgotPassword();
  }
  
  onSubmit = (formValues) => {
    const {
      username,
      confirmCode,
      newPassword
    } = formValues;
    return forgotPasswordSubmit(username, confirmCode, newPassword)
      .then(response => {
        console.log('response @ onSubmit forgotPasswordSubmit: ', response)
        if(response === undefined){
          // then this has been successful.
          // collapse form, give a message, return to login to do username and login
          console.log('success @ onSubmit forgotPasswordSubmit then')
          this.setState({
            resendVerificationSucessful: !this.state.resendVerificationSucessful,
            collapseForm: !this.state.collapseForm
          })
        }
        else if(response.code === 'ExpiredCodeException'){
          // here return an error back to the modal. unfortunately, anything invalid (username or code, returns this error, and there is no mechanism to check if old pass & new pass match (odd!))
          console.log('@ forgotPasswordSubmit err @ data ExpiredCodeException: ', response)
          if(this.state.numberOfForgotPasswordSubmitErrors > 2){
            console.log('over 3: ')
            this.setState({
              resendVerificationSucessful: !this.state.showErrorMessage,
              collapseForm: !this.state.collapseForm
            })
          } else {
            this.setState({ numberOfForgotPasswordSubmitErrors: this.state.numberOfForgotPasswordSubmitErrors + 1 })
            throw new SubmissionError({ _error: 'Invalid Username / Confirmation Code, Please check both and resubmit' })
          }
        }
        else if(response.code === 'CodeMismatchException'){
          // code: "CodeMismatchException"
          // message: "Invalid verification code provided, please try again."
          // name: "CodeMismatchException"
          console.log('@ forgotPasswordSubmit err @ data CodeMismatchException: ', response)
          if(this.state.numberOfForgotPasswordSubmitErrors > 2){
            console.log('over 3: ')
            this.setState({
              resendVerificationSucessful: !this.state.showErrorMessage,
              collapseForm: !this.state.collapseForm
            })
          } else {
            this.setState({ numberOfForgotPasswordSubmitErrors: this.state.numberOfForgotPasswordSubmitErrors + 1 })
            throw new SubmissionError({ _error: 'Invalid Username / Confirmation Code, Please check both and resubmit' })
          }
        }
        // either reused or code is expired or code is wrong or username wrong
        // code: "ExpiredCodeException"
        // message: "Invalid code provided, please request a code again."
        // name: "ExpiredCodeException""
        else if(response.code === 'LimitExceededException'){
          // code: "LimitExceededException"
          // message: "Attempt limit exceeded, please try after some time."
          // name: "LimitExceededException"
          throw new SubmissionError({ _error: 'Unable to Process Your Request at this Time, Please try Again Later' })
        }
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
    const { error } = this.props
    console.log('this.state: ', this.state)
    // console.log('error: ', error, 'this.props: ', this.props)
    return (
      <fieldset className="fc--disp-flex fc--fdir-col fc--aItem-ce">
        { this.state.resendVerificationSucessful === false && this.state.collapseForm === false &&
          <>
          <h2 className="fs33 fw300 ls24 fcBlack ta-cent">Submit to Reset Password</h2>
          <hr className="modalHR mt10"/>
          <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
            <div className="fc-fieldset">
              <Field
                label="Username:"
                name="username"
                type="text"
                placeholder="Enter Username"
                component={this.renderField}
                labelStyle="ta-right width20P"
                inputStyle="width80P"
              />
              <Field
                label="Code:"
                name="confirmCode"
                type="text"
                placeholder="Enter Verification Code"
                component={this.renderField}
                labelStyle="ta-right width20P"
                inputStyle="width80P"
              />
              <Field
                label="Password:"
                name="newPassword"
                type="text"
                placeholder="Enter New Password"
                component={this.renderField}
                labelStyle="ta-right width20P"
                inputStyle="width80P"
              />
              <Field
                label="Confirm New Password:"
                name="confirmNewPassword"
                type="text"
                placeholder="Confirm New Password"
                component={this.renderField}
                labelStyle="ta-right width20P"
                inputStyle="width80P"
              />
              {this.renderErrorIfExists(error)}
            </div>
            <hr className="modalHR mt40" />
            <div className="ta-cent">
              <button type="submit" className="btn btnFillClrSchGreen00b371 pdTB2LR8 fs20 fw500 ls12 mt30">Submit</button>
            </div>
          </form>
          </>
        }
        {
          this.state.resendVerificationSucessful &&
          <>
            <div className="ta-cent">
              <h2 className="fs33 fw300 ls24 fcBlack ta-cent">Password Successfully Reset</h2>
              <hr className="modalHR mt10" />
              <p className="fs16 fw300 ls10 fcGrey424041 mt10 wspl">Your password was successfully reset. Please click the button below to return to the Sign In modal and sign in with your new password.</p>
              <button 
                type="submit" 
                className="btn btnFillClrSchGreen00b371 pdTB2LR8 fs20 fw500 ls12 mt30"
                onClick={() => this.openModalSignIn()}
                >Return to Sign In Modal</button>
            </div>
          </>
        }
        {
          this.state.numberOfForgotPasswordSubmitErrors > 2 && this.state.showErrorMessage &&
          <>
            <div className="ta-cent">
              <h2 className="fs33 fw300 ls24 fcBlack ta-cent">Number of Submission Attempts Exceeded</h2>
              <hr className="modalHR mt10" />
              <p className="fs16 fw300 ls10 fcGrey424041 mt10 wspl">The number of attempts for resetting your forgotten password was exceeded, please return to the Forgotten Password modal and resend yourself a new verification code.</p>
              <button 
                type="submit" 
                className="btn btnFillClrSchGreen00b371 pdTB2LR8 fs20 fw500 ls12 mt30"
                onClick={() => this.returnToModalForgottenPassword()}
                >Return to Forgotten Password Modal</button>
            </div>
          </>
        }
      </fieldset>
    )
  }
}

export const ForgotPasswordSubmitModalFormEx = reduxForm({
  validate: validate,
  form: 'ForgotPasswordSubmitForm'
})(ForgotPasswordSubmitModalForm)

class RecoverAccountModalForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      resendVerificationSucessful: false,
      collapseForm: false
    }
  }
  
  proceedToModalForgotPasswordSubmit = () => {
    this.props.closeModalForgotPassword();
    this.props.openModalForgotPasswordSubmit();
  }
  
  onSubmit = (formValues) => {
    return verifyCurrentUserAttribute(formValues.username)
      .then(response => {
        console.log('response: ', response)
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
    const { error } = this.props
    console.log('error: ', error, 'this.props: ', this.props)
    return (
      <fieldset className="fc--disp-flex fc--fdir-col fc--aItem-ce">
        { this.state.resendVerificationSucessful === false && this.state.collapseForm === false &&
          <>
          <h2 className="fs33 fw300 ls24 fcBlack ta-cent">Verification Code to Reset Forgotten Password</h2>
          <hr className="modalHR mt10"/>
          <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
            <div className="fc-fieldset">
              <Field
                label="Username:"
                name="username"
                type="text"
                placeholder="Enter Username"
                component={this.renderField}
                labelStyle="ta-right width20P"
                inputStyle="width80P"
              />
              {this.renderErrorIfExists(error)}
            </div>
            <hr className="modalHR mt40" />
            <div className="ta-cent">
              <button type="submit" className="btn btnFillClrSchGreen00b371 pdTB2LR8 fs20 fw500 ls12 mt30">Submit</button>
            </div>
          </form>
          </>
        }
        {/* {
          this.state.resendVerificationSucessful &&
          <>
            <div className="ta-cent">
              <h2 className="fs33 fw300 ls24 fcBlack ta-cent">Confirmation Email Successfully Resent</h2>
              <hr className="modalHR mt10" />
              <p className="fs16 fw300 ls10 fcGrey424041 mt10 wspl">A confirmation email was sent to the email address connected to the Username that you entered. Click the Button below to Proceed to the Forgot Password / Submit New Password Modal</p>
              <button 
                type="submit" 
                className="btn btnFillClrSchGreen00b371 pdTB2LR8 fs20 fw500 ls12 mt30"
                onClick={() => this.proceedToModalForgotPasswordSubmit()}
                >Proceed to Submit New Password</button>
            </div>
          </>
        } */}
      </fieldset>
    )
  }
}

export const RecoverAccountModalFormEx = reduxForm({
  validate: validate,
  form: 'RecoverAccountForm'
})(RecoverAccountModalForm)

function validate(values){
  // console.log('values: ', values)
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
  if(!values.resendUsername){ errors.resendUsername = 'Please Enter A Username' }
  // if username values then validate
  const usernameCharLimit = 2;
  if(values.username){
    if(!ValidationMethods.isWordOverCharLimit(values.username, usernameCharLimit)){
      errors.username = `Usernames must be at Least ${usernameCharLimit} Characters`
    }
    if(ValidationMethods.doesHaveSpaces(values.username)){
      errors.username = 'Usernames can not have Spaces'
    }
    if(values){
      if(values.errors){
        if(values.errors.username){
          console.log('values.code: ', values)
          errors.username = 'Username Already Exists, Please Choose Another';
          console.log('errors: ', errors)
        } else {
          
        }
      } else {
        
      }
    }
  }
  if(values.resendUsername){
    if(!ValidationMethods.isWordOverCharLimit(values.resendUsername, usernameCharLimit)){
      errors.resendUsername = `Usernames must be at Least ${usernameCharLimit} Characters`
    }
    if(ValidationMethods.doesHaveSpaces(values.resendUsername)){
      errors.resendUsername = 'Usernames can not have Spaces'
    }
  }
  // code: "UsernameExistsException"
  // message: "User already exists"
  // name: "UsernameExistsException"
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
  if(!values.oldPassword || !values.newPassword || !values.confirmNewPassword){
    if(!values.oldPassword){ errors.oldPassword = 'Please Enter A Valid Password' }
    if(!values.newPassword){ errors.newPassword = 'Please Enter A Valid Password' }
    if(!values.confirmNewPassword){ errors.confirmNewPassword = 'Please Enter A Valid Password' }
  }
  if(values.oldPassword){
    if(!ValidationMethods.isWordOverCharLimit(values.oldPassword, passCharLimit)){ errors.oldPassword = `Passwords must be over ${passCharLimit} Characters` }
  }
  if(values.newPassword){
    if(!ValidationMethods.isWordOverCharLimit(values.newPassword, passCharLimit)){ errors.newPassword = `Passwords must be over ${passCharLimit} Characters` }
  }
  if(values.confirmNewPassword){
    if(!ValidationMethods.isWordOverCharLimit(values.confirmNewPassword, passCharLimit)){ errors.confirmNewPassword = `Passwords must be over ${passCharLimit} Characters` }
  }
  if(values.oldPassword && values.newPassword){
    if(values.oldPassword === values.newPassword){
      errors.newPassword = 'Old Password and New Password can not be the Same'
    }
  }
  if(values.confirmNewPassword && values.newPassword){
    if(values.confirmNewPassword !== values.newPassword){
      errors.confirmNewPassword = 'New Password and Confirm New Password must be the Same'
    }
  }
  // return object - if returns empty validation is good - submit.  if returns an object with something then it is bad.
  return errors
}

// oldPassword, newPassword
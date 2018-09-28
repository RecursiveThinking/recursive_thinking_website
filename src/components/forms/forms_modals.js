import React, { Component } from 'react'

export class SignUpModalForm extends Component {
  constructor(props){
    super(props)
  }
  render(){
    return (
      <fieldset className="fc--disp-flex fc--fdir-col fc--aItem-ce">
        <h2 className="fs40 fw300 ls24 fcBlack ta-cent">Sign Up</h2>
        <hr className="modalHR mt35" />
        <form action="">
          <div className="fc-fieldset">
            <div className="fc-form-input fc-input-width80">
              <label htmlFor="name">Name:</label>
              <input type="text" name="name" placeholder="Name" />
            </div>
            <div className="fc-form-input fc-input-width80">
              <label htmlFor="username">Username:</label>
              <input type="text" name="username" placeholder="Username" />
            </div>
            <div className="fc-form-input fc-input-width80">
              <label htmlFor="email">Email: </label>
              <input type="email" name="email" placeholder="Email" />
            </div>
            <div className="fc-form-input fc-input-width80">
              <label htmlFor="password">Password:</label>
              <input type="password" name="password" placeholder="Password" />
            </div>
          </div>
          <hr className="modalHR mt130" />
          <div className="ta-cent">
            <button className="btn btnFillClrSchGreen00b371 pdTB2LR8 fs20 fw500 ls12 mt30">Sign Up</button>
          </div>
        </form>
      </fieldset>
    )
  }
}

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
            <div className="fc-form-input fc-input-width80">
              <label htmlFor="confirmUsername">Username:</label>
              <input type="text" name="confirmUsername" placeholder="Username" />
            </div>
            <div className="fc-form-input fc-input-width80">
              <label htmlFor="confirmCode">Verification Code:</label>
              <input type="text" name="confirmCode" placeholder="Confirmation Code" />
            </div>
          </div>
          <hr className="modalHR mt130" />
          <div className="ta-cent">
            <button className="btn btnFillClrSchGreen00b371 pdTB2LR8 fs20 fw500 ls12 mt30">Verify Your Account</button>
          </div>
        </form>
      </fieldset>
    )
  }
}

export class SignInModalForm extends Component {
  constructor(props){
    super(props)
  }
  render(){
    return (
      <fieldset className="fc--disp-flex fc--fdir-col fc--aItem-ce">
        <h2 className="fs40 fw300 ls24 fcBlack ta-cent">Sign In</h2>
        <hr className="modalHR mt35" />
        <form action="">
          <div className="fc-fieldset">
            <div className="fc-form-input fc-input-width80">
              <label htmlFor="email">Email: </label>
              <input type="email" name="email" placeholder="Email" />
            </div>
            <div className="fc-form-input fc-input-width80">
              <label htmlFor="password">Password:</label>
              <input type="password" name="password" placeholder="Password" />
            </div>
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

export class SubmitLessonRequestModalForm extends Component {
  constructor(props){
    super(props)
  }
  render(){
    return (
      <fieldset className="fc--disp-flex fc--fdir-col fc--aItem-ce">
        <h2 className="fs40 fw300 ls24 fcBlack ta-cent">Submit a Lesson Request</h2>
        <hr className="modalHR mt35" />
        <form action="">
          <div className="fc-fieldset">
            <div className="fc-form-input fc-input-width80">
              <label htmlFor="email">Email: </label>
              <input type="email" name="email" placeholder="Email" />
            </div>
            <div className="fc-form-input fc-input-width80">
              <label htmlFor="password">Password:</label>
              <input type="password" name="password" placeholder="Password" />
            </div>
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

export class SubmitInterviewQuestionModalForm extends Component {
  constructor(props){
    super(props)
  }
  render(){
    return (
      <fieldset className="fc--disp-flex fc--fdir-col fc--aItem-ce">
        <h2 className="fs40 fw300 ls24 fcBlack ta-cent">Submit an Interview Question</h2>
        <hr className="modalHR mt35" />
        <form action="">
          <div className="fc-fieldset">
            <div className="fc-form-input fc-input-width80">
              <label htmlFor="email">Email: </label>
              <input type="email" name="email" placeholder="Email" />
            </div>
            <div className="fc-form-input fc-input-width80">
              <label htmlFor="password">Password:</label>
              <input type="password" name="password" placeholder="Password" />
            </div>
          </div>
          <hr className="modalHR mt130" />
          <div className="ta-cent">
            <button className="btn btnFillClrSchGreen00b371 pdTB2LR8 fs20 fw500 ls12 mt30">Submit Interview Question</button>
          </div>
        </form>
      </fieldset>
    )
  }
}

export class SubmitInterviewQuestionAnswersModalForm extends Component {
  constructor(props){
    super(props)
  }
  render(){
    return (
      <fieldset className="fc--disp-flex fc--fdir-col fc--aItem-ce">
        <h2 className="fs40 fw300 ls24 fcBlack ta-cent">Submit an Interview Question Answer</h2>
        <hr className="modalHR mt35" />
        <form action="">
          <div className="fc-fieldset">
            <div className="fc-form-input fc-input-width80">
              <label htmlFor="email">Email: </label>
              <input type="email" name="email" placeholder="Email" />
            </div>
            <div className="fc-form-input fc-input-width80">
              <label htmlFor="password">Password:</label>
              <input type="password" name="password" placeholder="Password" />
            </div>
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
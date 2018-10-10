import React, { Component } from 'react';

import Modal from '../common/modal/modal'
import { SignUpFormEx, VerifyAccountModalForm, SignInFormEx } from '../forms/forms_modals'

class HeaderHome extends Component {
  constructor(props){
    super(props);
    this.state = {
      showModalSignUp: false,
      showModalSignIn: false,
    }
  }

  handleToggleModalSignUp(){
    this.setState( {showModalSignUp: !this.state.showModalSignUp} )
  }
  handleToggleModalSignIn(){
    this.setState( {showModalSignIn: !this.state.showModalSignIn} )
  }
  
  render(){
    return (
      <header>
        <div className="grid grid--1of2 lg-grid--fit">
          <div className="grid-cell fc--disp-flex">
            <div className = "fc-logo fc--disp-flex">
              <figure>
                <img src="../../../public/images/recursivelogo.png" />
              </figure>
            </div>
          </div>
          <div className="grid-cell fc--disp-flex fc--aItem-ce">
            <div className="fc-nav fc--disp-flex">
              <nav>
                <a href="/dashboard"><button type="button" className="btn btnOutlineClrSchGreen00b371 signIn fs20 ls12">Dash</button></a>
                <a href="/setupProfile"><button type="button" className="btn btnOutlineClrSchGreen00b371 signIn fs20 ls12">SetupProfile</button></a>
                <button onClick={() => this.handleToggleModalSignUp()} type="button" className="btn btnFillClrSchGreen00b371 signUp fs20 ls12">Sign Up</button>
                  {
                    this.state.showModalSignUp && 
                    
                    <Modal 
                      onCloseRequest={() => this.handleToggleModalSignUp()}
                      content={<SignUpFormEx />}
                    />
                  }
                <button onClick={() => this.handleToggleModalSignIn()} type="button" className="btn btnOutlineClrSchGreen00b371 signIn fs20 ls12">Sign In</button> 
                  {
                    this.state.showModalSignIn &&
                    
                    <Modal
                      onCloseRequest={() => this.handleToggleModalSignIn()}
                      content={<SignInFormEx />}
                    />
                  }
              </nav>
            </div>
          </div>
        </div>
      </header>
    )
  }
}

export default HeaderHome
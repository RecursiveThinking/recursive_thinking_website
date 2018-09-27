import React, { Component } from 'react';

import Modal from '../common/modal/modal'
import { SignUpModalForm, VerifyAccountModalForm, SignInModalForm } from '../forms/forms_modals'

class HeaderHome extends Component {
  constructor(props){
    super(props);
    this.state = {
      showSignUp: false,
      showSignIn: false,
    }
  }
  
  showModalSignUp = () => {
    this.setState({ showSignUp: true });
  };

  hideModalSignUp = () => {
    this.setState({ showSignUp: false });
  };
  
  showModalSignIn = () => {
    this.setState({ showSignIn: true });
  };

  hideModalSignIn = () => {
    this.setState({ showSignIn: false });
  };
  
  render(){
    // console.log('MC Sign Up', ModalContent.signUp)
    // console.log('MC Sign In', ModalContent.signIn)
    return (
      <header>
      {/* <div className="grid grid--full lg-grid--fit"> */}
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
                <button onClick={this.showModalSignUp} type="button" className="btn btnFillClrSchGreen00b371 signUp fs20 ls12">Sign Up</button>
                  <Modal 
                    content={<SignUpModalForm />}
                    show={this.state.showSignUp}
                    handleClose={this.hideModalSignUp}
                  />
                <button onClick={this.showModalSignIn} type="button" className="btn btnOutlineClrSchGreen00b371 signIn fs20 ls12">Sign In</button> 
                  <Modal 
                    content={<SignInModalForm />}
                    show={this.state.showSignIn}
                    handleClose={this.hideModalSignIn}
                  />
              </nav>
            </div>
          </div>
        </div>
      </header>
    )
  }
}

export default HeaderHome
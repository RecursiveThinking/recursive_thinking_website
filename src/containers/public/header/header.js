import React, { Component } from 'react';

import Modal from '../../../components/common/modal/modal'
import { SignUpFormEx, VerifyAccountFormEx, ResendVerifyAccountFormEx, SignInFormEx, ForgotPasswordModalFormEx, ForgotPasswordSubmitModalFormEx, 
  // ChangePasswordModalFormEx, RecoverAccountModalFormEx 
} from '../../../components/forms/forms_auth'

// import { ROUTES_REACT } from '../../../standards/routes'
import { PATH_FOR_IMAGES } from '../../../standards/publicPaths'

// const {
  // dashboard,
  // profile_create
// } = ROUTES_REACT

class Header extends Component {
  constructor(props){
    super(props);
    this.state = {
      showModalSignUp: false,
      showModalSignIn: false,
      showModalVerifyAccount: false,
      showModalResendVerifyAccount: false,
      showModalChangePassword: false,
      showModalForgotPassword: false,
      showModalForgotPasswordSubmit: false,
      showModalRecoverAccount: false
    }
  }

  handleToggleModalSignUp(){
    this.setState( {showModalSignUp: !this.state.showModalSignUp} )
  }
  handleToggleModalVerifyAccount(){
    this.setState( {showModalVerifyAccount: !this.state.showModalVerifyAccount} )
  }
  handleToggleModalSignIn(){
    this.setState( {showModalSignIn: !this.state.showModalSignIn} )
  }
  handleToggleModalResendVerifyAccount(){
    this.setState( {showModalResendVerifyAccount: !this.state.showModalResendVerifyAccount} )
  }
  handleToggleModalChangePassword(){
    this.setState( {showModalChangePassword: !this.state.showModalChangePassword} )
  }
  handleToggleModalForgotPassword(){
    this.setState( {showModalForgotPassword: !this.state.showModalForgotPassword} )
  }
  handleToggleModalForgotPasswordSubmit(){
    this.setState( {showModalForgotPasswordSubmit: !this.state.showModalForgotPasswordSubmit} )
  }
  // handleToggleModalRecoverAccount(){
  //   this.setState( {showModalRecoverAccount: !this.state.showModalRecoverAccount} )
  // }
  
  render(){
    return (
      <header>
        <div className="grid grid--1of2 lg-grid--fit">
          <div className="grid-cell fc--disp-flex">
            <div className = "fc-logo fc--disp-flex">
              <figure>
                <img 
                  src={`${PATH_FOR_IMAGES}recursivelogo.png`}
                  alt="Recursive Thinking Logo"
                />
              </figure>
            </div>
          </div>
          <div className="grid-cell fc--disp-flex fc--aItem-ce">
            <div className="fc-nav fc--disp-flex">
              <nav>
                {/* <Link to={dashboard}>
                  <button type="button" className="btn btnTemp btnPadTB1 btnPadLR1 fs16 ls12">Dash</button>
                </Link> */}
                {/* <Link to={profile_create}>
                  <button type="button" className="btn btnTemp btnPadTB1 btnPadLR1 fs16 ls12">SP</button>
                </Link> */}
                {/* <a href={dashboard}>
                  <button type="button" className="btn btnTemp btnPadTB1 btnPadLR1 fs16 ls12">Dash</button>
                </a> */}
                {/* <a href={profile_create}>
                  <button type="button" className="btn btnTemp btnPadTB1 btnPadLR1 fs16 ls12">SP</button>
                </a> */}
                <button 
                    onClick={() => this.handleToggleModalSignUp()} 
                    type="button" 
                    className="btn btnFillClrSchGreen00b371 btnPadTB1 btnPadLR3 fs16 ls12"
                >Sign Up</button>
                  {
                    this.state.showModalSignUp && 
                    
                    <Modal 
                      onCloseRequest={() => this.handleToggleModalSignUp()}
                      content={
                        <SignUpFormEx 
                          closeModalSignup={() => this.handleToggleModalSignUp()}
                          openModalVerifyAccount={() => this.handleToggleModalVerifyAccount()}
                        />
                      }
                    />
                  }
                {/* <button 
                  onClick={() => this.handleToggleModalVerifyAccount()}
                  type="button" 
                  className="btn btnTemp btnPadTB1 btnPadLR1 fs16 ls12">VA</button>  */}
                  {
                    this.state.showModalVerifyAccount &&
                    
                    <Modal
                      onCloseRequest={() => this.handleToggleModalVerifyAccount()}
                      content={
                        <VerifyAccountFormEx
                          {...this.props}
                          closeModalVerifyAccount={() => this.handleToggleModalVerifyAccount()}
                          openModalResendVerifyAccount={() => this.handleToggleModalResendVerifyAccount()}
                          openModalSignIn={() => this.handleToggleModalSignIn()}
                        />
                      }
                    />
                  }
                {/* <button
                  onClick={() => this.handleToggleModalResendVerifyAccount()}
                  type="button"
                  className="btn btnTemp btnPadTB1 btnPadLR1 fs16 ls12">RVA</button> */}
                  {
                    this.state.showModalResendVerifyAccount && 
                    <Modal 
                      onCloseRequest={() => this.handleToggleModalResendVerifyAccount()}
                      content={
                        <ResendVerifyAccountFormEx
                          closeModalResendVerifyAccount={() => this.handleToggleModalResendVerifyAccount()}
                          openModalVerifyAccount={() => this.handleToggleModalVerifyAccount()}
                        />
                      }
                    />
                  }
                <button 
                  onClick={() => this.handleToggleModalSignIn()} 
                  type="button" 
                  className="btn btnOutlineClrSchGreen00b371 btnPadTB1 btnPadLR3 fs16 ls12"
                >Sign In</button> 
                  {
                    this.state.showModalSignIn &&
                    
                    <Modal
                      onCloseRequest={() => this.handleToggleModalSignIn()}
                      content={
                        <SignInFormEx 
                          closeModalSignIn={() => this.handleToggleModalSignIn()}
                          // openModalChangePassword={() => this.handleToggleModalChangePassword()}
                          openModalForgotPassword={() => this.handleToggleModalForgotPassword()}
                          // openModalRecoverAccount={() => this.handleToggleModalRecoverAccount()}
                        />
                      }
                    />
                  }
                  {/* <button 
                    onClick={() => this.handleToggleModalChangePassword()} 
                    type="button" 
                    className="btn btnOutlineClrSchGreen00b371 btnPadTB1 btnPadLR3 fs16 ls12"
                  >CP</button>  */}
                  {/* {
                    this.state.showModalChangePassword &&
                    
                    <Modal
                      onCloseRequest={() => this.handleToggleModalChangePassword()}
                      content={
                        <ChangePasswordModalFormEx
                          closeModalChangePassword={() => this.handleToggleModalSignIn()}
                        />
                      }
                    />
                  } */}
                  {/* <button 
                    onClick={() => this.handleToggleModalForgotPassword()} 
                    type="button" 
                    className="btn btnOutlineClrSchGreen00b371 btnPadTB1 btnPadLR3 fs16 ls12"
                  >FP</button>  */}
                  {
                    this.state.showModalForgotPassword &&
                    
                    <Modal
                      onCloseRequest={() => this.handleToggleModalForgotPassword()}
                      content={
                        <ForgotPasswordModalFormEx 
                          closeModalForgotPassword={() => this.handleToggleModalForgotPassword()}
                          openModalForgotPasswordSubmit={() => this.handleToggleModalForgotPasswordSubmit()}
                        />
                      }
                    />
                  }
                  {/* <button 
                    onClick={() => this.handleToggleModalForgotPasswordSubmit()} 
                    type="button" 
                    className="btn btnOutlineClrSchGreen00b371 btnPadTB1 btnPadLR3 fs16 ls12"
                  >FPS</button>  */}
                  {
                    this.state.showModalForgotPasswordSubmit &&
                    
                    <Modal
                      onCloseRequest={() => this.handleToggleModalForgotPasswordSubmit()}
                      content={
                        <ForgotPasswordSubmitModalFormEx 
                          closeModalForgotPasswordSubmit={() => this.handleToggleModalForgotPasswordSubmit()}
                          openModalSignIn={() => this.handleToggleModalSignIn()}
                          openModalForgotPassword={() => {this.handleToggleModalForgotPassword()}}
                        />
                      }
                    />
                  }
                  {/* <button 
                    onClick={() => this.handleToggleModalRecoverAccount()} 
                    type="button" 
                    className="btn btnOutlineClrSchGreen00b371 btnPadTB1 btnPadLR3 fs16 ls12"
                  >RA</button> 
                  {
                    this.state.showModalRecoverAccount &&
                    
                    <Modal
                      onCloseRequest={() => this.handleToggleModalRecoverAccount()}
                      content={
                        <RecoverAccountModalFormEx 
                          closeModalRecoverAccount={() => this.handleToggleModalRecoverAccount()}
                        />
                      }
                    />
                  } */}
              </nav>
            </div>
          </div>
        </div>
      </header>
    )
  }
}

export default Header
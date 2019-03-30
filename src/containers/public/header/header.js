import React, { Component } from 'react';

import Modal from '../../../components/common/modal/modal'
import { SignUpFormEx, VerifyAccountFormEx, ResendVerifyAccountFormEx, SignInFormEx } from '../../../components/forms/forms_auth'

import { ROUTES_REACT } from '../../../standards/routes'
import { PATH_FOR_IMAGES } from '../../../standards/publicPaths'

const {
  dashboard,
  profile_create
} = ROUTES_REACT

class Header extends Component {
  constructor(props){
    super(props);
    this.state = {
      showModalSignUp: false,
      showModalSignIn: false,
      showModalVerifyAccount: false,
      showModalResendVerifyAccount: false
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
                          openModalSignin={() => this.handleToggleModalSignIn()}
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
                        />
                      }
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

export default Header
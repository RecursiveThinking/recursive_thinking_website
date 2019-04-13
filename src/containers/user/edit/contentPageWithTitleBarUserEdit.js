import React, { Component } from 'react'

import Modal from '../../../components/common/modal/modal';
import { ChangePasswordModalFormEx } from '../../../components/forms/forms_auth';

class ContentPageWithTitleBarUserEdit extends Component {
  constructor(props){
    super(props)
    
    this.state = {
      // this will be the modal
      showModalChangePassword: false
    }
  }
  
  handleToggleModalChangePassword(){
    console.log('in show modal change password: ')
    this.setState( {showModalChangePassword: !this.state.showModalChangePassword} )
  }
  
  render(){
    const {
      content,
      sectionClass,
      sectionStyle,
      titleBarContent: { heading, subheading }
    } = this.props;
    return(
      <main className="height100P">
      {/* --- ContentPageTitleBar --- Start */}
        <section className="contentPageTitleBar">
          <div className="grid grid--cols-2">
            <div className="grid-cell fc--disp-flex fc-contentPageTitleBarText">
              <h6 className="fs22 fw600 ls12 fcGrey424041">{heading}</h6>
              <h6 className="fs16 fw300 ls08 fcGrey424041">{subheading}</h6>
            </div>
            <div className="grid-cell fc--disp-flex fc-contentPageTitleBarButton">
              <button
                onClick={() => this.handleToggleModalChangePassword()}
                type="button"
                className="btn btnFillClrSchGreen00b371 pdTB1p25LR2p5 fs16 fw500 ls12"
              >Change Your Password</button>
              { 
                this.state.showModalChangePassword &&
                
                <Modal 
                  onCloseRequest={() => this.handleToggleModalChangePassword()}
                  content={
                    <ChangePasswordModalFormEx 
                      closeModalChangePassword={() => this.handleToggleModalChangePassword()}
                    />
                  }
                />
              }
            </div>
          </div>
        </section>
      {/* --- ContentPageTitleBar --- End */}
        <section className={sectionClass} style={sectionStyle}>
          {content}
        </section>
      </main>
    )
  }
}

export default ContentPageWithTitleBarUserEdit;
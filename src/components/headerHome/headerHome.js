import React from 'react';

const headerHome = () => {
  
  state = { show: false };
  
  showModal = () => {
    this.setState({ show: true });
  }
  
  hideModal = () => {
    this.setState({ show: false });
  }
  
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
              <Modal show={this.state.show} handleClose={this.hideModal}>
                <p>Modal</p>
              </Modal>
              {/* <button
                type="button"
                onClick={this.showModal}
              >Open</button> */}
              <button type="button" className="btn btnFillClrSchGreen00b371 signUp fs20 ls12">Sign Up</button>
              <button className="btn btnOutlineClrSchGreen00b371 signIn fs20 ls12">Sign In</button>
            </nav>
          </div>
        </div>
      </div>
    </header>
  )
}

export default headerHome
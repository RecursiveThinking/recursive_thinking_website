import React, { Component } from 'react'

import UtilityMethods from '../../../functions/utilityMethods'

class Modal extends Component {
  constructor(props){
    super(props);
    
    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.handleOutsideClick = this.handleOutsideClick.bind(this);
  }
  
  componentDidMount(){
    window.addEventListener('keyup', this.handleKeyUp, false);
    document.addEventListener('click', this.handleOutsideClick, false);
  }
  
  componentWillMount(){
    window.removeEventListener('keyup', this.handleKeyUp, false);
    document.removeEventListener('click', this.handleOutsideClick, false);
  }
  
  handleKeyUp(event) {
    const { onCloseRequest } = this.props;
    const keys = {
      27: () => {
        event.preventDefault();
        onCloseRequest();
        window.removeEventListener('keyup', this.handleKeyUp, false);
      },
    };
    
    if (keys[event.keyCode]) { keys[event.keyCode](); }
  }
  
  handleOutsideClick(event){
    const { onCloseRequest } = this.props;
    if(!UtilityMethods.isNil(this.modal)){
      if(!this.modal.contains(event.target)){
        onCloseRequest();
        document.removeEventListener('click', this.handleOutsideClick, false);
      }
    }
  }
  
  renderCloseButton(){
    return (
      <div className="modalClose">
        <i 
          onClick={this.props.onCloseRequest}
          className="fs33 fw300 fa fa-times">
        </i>
      </div>
    )
  }
  
  render(){
    console.log('props @ modal', this.props)
    // console.log('content', this.props.content.type)
    
    return (
      <div className="modal">
        <section className="modalCard" ref={node => (this.modal = node)}>
          {/* {
            this.props.showCloseButton && this.renderCloseButton()
          } */}
          <div className="modalClose">
            <i 
              onClick={this.props.onCloseRequest}
              className="fs33 fw300 fa fa-times">
            </i>
          </div>
          {this.props.content}
        </section>
      </div>
    )
  }
}

export default Modal;
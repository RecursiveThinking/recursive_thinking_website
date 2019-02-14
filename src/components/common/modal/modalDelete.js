import React, { Component } from 'react'



class ModalDelete extends Component {
  // constructor(props){
  //   super(props);
    
  // }
  
  render(){
    return (
      <div className="modal">
        <section className="modalCard">
          {/* <div className="modalClose">
            <i 
              onClick={this.props.onCloseRequest}
              className="fs33 fw300 fa fa-times">
            </i>
          </div> */}
          {this.props.content}
          <hr className="modalHR mt80" />
          <div className="ta-cent">
            {this.props.buttons}
          </div>
        </section>
      </div>      
    )
  }
}

export default ModalDelete;
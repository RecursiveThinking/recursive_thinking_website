import React, { Component } from 'react';
import ModalDelete from '../common/modal/modalDelete';

import { connect } from 'react-redux';
import { getInterviewQuestionById, deleteInterviewQuestionById } from '../../actions/index';

import { Link } from 'react-router-dom';

import { ROUTES_REACT } from '../../standards/routes';

class InterviewQuestionDelete extends Component {
  constructor(props){
    super(props);
    this.state = {
      showModalIQDelete: true
    }
  }
  
  handleToggleModalIQDelete(){
    this.setState({ showModalIQDelete: !this.state.showModalIQDelete })
  }
  
  componentDidMount(){
    console.log('props @ CDM InterviewQuestionDelete: ', this.props)
    this.props.getInterviewQuestionById(this.props.match.params.id)
  }
  
  renderModalButtons(){
    const { id } = this.props.match.params;
    const { interviewquestions } = ROUTES_REACT;
    return (
      <>
        <Link
          className=""
          to={interviewquestions}
        >Cancel</Link>
        <button
          className=""
          onClick={() => {this.props.deleteInterviewQuestionById(id)}}
        >Delete</button>
      </>
    )
  }
  
  renderContent(){
    const { interviewQuestionById } = this.props;
    if(!interviewQuestionById){
      return (
        <div>Loading!!!</div>
      )
    } else {
      return(
        <fieldset className="fc--disp-flex fc--fdir-col fc--aItem-ce">
          <h2 className="fs33 fw300 ls24 fcBlack ta-cent">Delete An Interview Question</h2>
          <hr className="modalHR mt10" />
          <h4 className="fs18 fw300 ls24 fcBlack ta-cent">Are you sure you want to delete the Interview Question titled:</h4>
          <h3 className="fs22 fw700 ls24 fcBlack ta-cent">{interviewQuestionById.title}</h3>
        </fieldset>
      )
    }
  }
  
  render(){
    return(
      <section>
        {
          this.state.showModalIQDelete &&
          
          <ModalDelete 
            onCloseRequest={() => this.handleToggleModalIQDelete()}
            content={this.renderContent()}
            buttons={this.renderModalButtons()}
          />
        }
      </section>
    )
  }
}

function mapStateToProps(state, ownProps){
  return {
    interviewQuestionById: state.interviewQuestions.lookupTableInterviewQuestions[ownProps.match.params.id]
  }
}

export default connect(mapStateToProps, { getInterviewQuestionById, deleteInterviewQuestionById })(InterviewQuestionDelete)

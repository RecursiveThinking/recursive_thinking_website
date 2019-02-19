import React, { Component } from 'react';
// import ModalDelete from '../common/modal/modalDelete';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getInterviewQuestionById, deleteInterviewQuestionById } from '../../actions/index';

import { ROUTES_REACT } from '../../standards/routes';

import DefaultLoadingPage from '../defaults/loadingPage/loadingPage';

class InterviewQuestionDelete extends Component {
  constructor(props){
    super(props);
    this.state = {
      // showModalIQDelete: true
    }
  }
  
  // handleToggleModalIQDelete(){
  //   this.setState({ showModalIQDelete: !this.state.showModalIQDelete })
  // }
  
  componentDidMount(){
    console.log('props @ CDM InterviewQuestionDelete: ', this.props)
    this.props.getInterviewQuestionById(this.props.match.params.id)
  }
  
  // renderModalButtons(){
  //   const { id } = this.props.match.params;
  //   const { interviewquestions } = ROUTES_REACT;
  //   return (
  //     <>
  //       <Link
  //         className=""
  //         to={interviewquestions}
  //       >Cancel</Link>
  //       <button
  //         className=""
  //         onClick={() => {this.props.deleteInterviewQuestionById(id)}}
  //       >Delete</button>
  //     </>
  //   )
  // }
  
  renderContent(){
    const { interviewQuestionById } = this.props;
    if(!interviewQuestionById){
      return (
        <DefaultLoadingPage />
      )
    } else {
      console.log('this props', this.props)
      const { id } = this.props.match.params;
      console.log('id', id)
      const { interviewquestions } = ROUTES_REACT;
      return(
        <article className="card">
          <fieldset className="fc--disp-flex fc--fdir-col fc--aItem-ce">
            <h5 className="fw700 ls14 ttup fcGrey424041">Delete Interview Question: {interviewQuestionById.title}</h5>
            <hr className="modalHR mt10" />
            <form>
              <div className="fc-fieldset">
                <div className="fc-field fc--disp-flex fc--fdir-col fc--jCont-ce width100P">
                  <div className="fc-field-row-full fc--disp-flex fc--fdir-row mt10">
                    <label htmlFor="">Title:</label>
                  </div>
                  <div className="fc-field-row-full fc--disp-flex fc--fdir-row mt10">
                    <p>
                      {interviewQuestionById.title}
                    </p>
                  </div>
                  <div className="fc-field-row-full fc--disp-flex fc--fdir-row mt10">
                    <label htmlFor="">Description:</label>
                  </div>                  
                  <div className="fc-field-row-full fc--disp-flex fc--fdir-row mt10">
                    {interviewQuestionById.description}
                  </div>                  
                </div>
              </div>
              <hr className="modalHR mt80" />
              <div className="ta-cent">
                <Link
                  className=""
                  to={ interviewquestions }
                >
                  <button className="btn btnFillGreyB9 pdTB2LR8 fs20 fw500 ls12 mt30">Cancel</button>
                
                </Link>
                <button 
                  className="btn btnFillClrSchWarn pdTB2LR8 fs20 fw500 ls12 mt30"
                  onClick={() => {this.props.deleteInterviewQuestionById(id)}}
                >Delete Interview Question</button>
              </div>
              {/* btn btnFillClrSchWarn btnOutlineClrSchUnavailable btnVoted fs16 fw500 ls12 ta-cent pdTB1p25LR2p5 */}
            </form>
          </fieldset>
        </article>
      )
    }
  }
  
  render(){
    return(
      <section style={{padding: '1.5rem 1.5rem'}}>
        {this.renderContent()}
      </section>
    )
  //   return(
  //     <section>
  //       {
  //         this.state.showModalIQDelete &&
          
  //         <ModalDelete 
  //           onCloseRequest={() => this.handleToggleModalIQDelete()}
  //           content={this.renderContent()}
  //           buttons={this.renderModalButtons()}
  //         />
  //       }
  //     </section>
  //   )
  }
}

function mapStateToProps(state, ownProps){
  return {
    // interviewQuestionById: state.interviewQuestions.lookupTableInterviewQuestions[ownProps.match.params.id]
    interviewQuestionById: state.interviewQuestions.interviewQuestionById
  }
}

export default connect(mapStateToProps, { getInterviewQuestionById, deleteInterviewQuestionById })(InterviewQuestionDelete)

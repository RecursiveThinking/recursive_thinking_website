import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { getInterviewQuestionById, deleteInterviewQuestionById } from '../../../actions/index';

import DefaultLoadingPage from '../../../components/defaults/loadingPage/loadingPage';

import { ROUTES_REACT } from '../../../standards/routes';

class InterviewQuestionDelete extends Component {
  constructor(props){
    super(props);
    this.state = {
    }
  }

  componentDidMount(){
    console.log('props @ CDM InterviewQuestionDelete: ', this.props)
    this.props.getInterviewQuestionById(this.props.match.params.id)
  }
  
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
          <div className="grid grid--full">
            <div className="grid-cell">
              <fieldset className="fc--disp-flex fc--fdir-col fc--aItem-ce noMargin">
                <h5 className="fw600 ls12 fcGrey424041">Interview Question Information: {interviewQuestionById.title}</h5>
                <hr className="modalHR mt10" />
                {/* <form> */}
                  <div className="fc-fieldset">
                    <div className="fc-field fc--disp-flex fc--fdir-col fc--jCont-ce width100P">
                      <div className="fc-field-row-full fc--disp-flex fc--fdir-row mt10">
                        <label htmlFor="">Title:</label>
                      </div>
                      <div className="fc-field-row-full fc--disp-flex fc--fdir-row mt10">
                        <p className="fs16 fw300 ls10 fcGrey424041 mt10">
                          {interviewQuestionById.title}
                        </p>
                      </div>
                      <div className="fc-field-row-full fc--disp-flex fc--fdir-row mt30">
                        <label htmlFor="">Description:</label>
                      </div>                  
                      <div className="fc-field-row-full fc--disp-flex fc--fdir-row mt10">
                        <p className="fs16 fw300 ls10 fcGrey424041 mt10">
                          {interviewQuestionById.description}
                        </p>
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
                      className="btn btnFillClrSchWarn pdTB2LR8 fs20 fw500 ls12 ml20 mt30"
                      onClick={() => {this.props.deleteInterviewQuestionById(id)}}
                    >Delete Interview Question</button>
                  </div>
                  {/* btn btnFillClrSchWarn btnOutlineClrSchUnavailable btnVoted fs16 fw500 ls12 ta-cent pdTB1p25LR2p5 */}
                {/* </form> */}
              </fieldset>
            </div>
          </div>
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

function mapDispatchToProps(dispatch){
  return bindActionCreators({ getInterviewQuestionById, deleteInterviewQuestionById }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(InterviewQuestionDelete)

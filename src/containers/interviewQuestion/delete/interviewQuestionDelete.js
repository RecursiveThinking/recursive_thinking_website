import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { interviewQuestionGetById, interviewQuestionDeleteById } from '../../../actions/index';

import DefaultLoadingPage from '../../../components/defaults/loadingPage/loadingPage';
import DefaultErrorPage from '../../../components/defaults/errorPage/errorPage';
import DefaultMessage from '../../../components/defaults/defaultMessage/defaultMessage'
import DefaultProcessingPage from '../../../components/defaults/processingPage/processingPage';
import { DEFAULT_MESSAGE_INTERVIEW_QUESTION_BY_ID_ITEM_NOT_FOUND } from '../../../components/defaults/defaultMessage/defaultMessageContent/defaultMessageContent'

import { 
  CARD_TITLE_SELECTED_INTERVIEW_QUESTION_GET_BY_ID,
  CARD_TITLE_DELETING_INTERVIEW_QUESTION_DELETE_BY_ID
} from '../../../components/common/content/contentInfo';

import { ROUTES_REACT } from '../../../standards/routes';

class InterviewQuestionDelete extends Component {
  constructor(props){
    super(props);
    this.state = {
    }
  }

  componentDidMount(){
    console.log('props @ CDM InterviewQuestionDelete: ', this.props)
    this.props.interviewQuestionGetById(this.props.match.params.id)
  }
  
  renderContent(){
    let { 
      interviewQuestions: { 
        isGettingInterviewQuestionById, errorMessageGettingInterviewQuestionById,
        isDeletingInterviewQuestionById, errorMessageDeletingInterviewQuestionById,
        interviewQuestionById,  
      } 
    } = this.props;
    
    if(isGettingInterviewQuestionById){
      let { 
        title, classNameTxt
      } = CARD_TITLE_SELECTED_INTERVIEW_QUESTION_GET_BY_ID
      return (
        <DefaultLoadingPage 
          title={title}
          classNameTxt={classNameTxt}
        />
      )
    }
    else if(errorMessageGettingInterviewQuestionById || errorMessageDeletingInterviewQuestionById){
      return (
        <DefaultErrorPage
          // title={title}
          // classNameTxt={classNameTxt}
        />        
      )
    }
    else if(isDeletingInterviewQuestionById){
      const {
        title,
        classNameTxt
      } = CARD_TITLE_DELETING_INTERVIEW_QUESTION_DELETE_BY_ID;
      return (
        <DefaultProcessingPage
          title={title}
          classNameTxt={classNameTxt}
        />        
      )
    }
    else if(!interviewQuestionById){
      return (
        <DefaultMessage
          content={DEFAULT_MESSAGE_INTERVIEW_QUESTION_BY_ID_ITEM_NOT_FOUND}
        />
      )
    } else {
      console.log('this props', this.props)
      const { id } = this.props.match.params;
      console.log('id', id)
      const { interviewquestions } = ROUTES_REACT;
      let { title, description } = interviewQuestionById
      return(
        <article className="card">
          <div className="grid grid--full">
            <div className="grid-cell">
              <fieldset className="fc--disp-flex fc--fdir-col fc--aItem-ce noMargin">
                <h5 className="fw600 ls12 fcGrey424041">Interview Question Information: {title}</h5>
                <hr className="modalHR mt10" />
                  <div className="fc-fieldset">
                    <div className="fc-field fc--disp-flex fc--fdir-col fc--jCont-ce width100P">
                      <div className="fc-field-row-full fc--disp-flex fc--fdir-row mt10">
                        <label htmlFor="">Title:</label>
                      </div>
                      <div className="fc-field-row-full fc--disp-flex fc--fdir-row mt10">
                        <p className="fs16 fw300 ls10 fcGrey424041 mt10">
                          {title}
                        </p>
                      </div>
                      <div className="fc-field-row-full fc--disp-flex fc--fdir-row mt30">
                        <label htmlFor="">Description:</label>
                      </div>                  
                      <div className="fc-field-row-full fc--disp-flex fc--fdir-row mt10">
                        <p className="fs16 fw300 ls10 fcGrey424041 mt10">
                          {description}
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
                      onClick={() => {this.props.interviewQuestionDeleteById(id)}}
                    >Delete Interview Question</button>
                  </div>
              </fieldset>
            </div>
          </div>
        </article>
      )
    }
  }
  
  render(){
    return(
      <>
        {this.renderContent()}
      </>
    )
  }
}

function mapStateToProps(state, ownProps){
  return {
    // interviewQuestionById: state.interviewQuestions.lookupTableInterviewQuestions[ownProps.match.params.id]
    interviewQuestions: state.interviewQuestions
    // interviewQuestionById: state.interviewQuestions.interviewQuestionById
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({ interviewQuestionGetById, interviewQuestionDeleteById }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(InterviewQuestionDelete)

import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { lessonGetById, lessonDeleteById } from '../../../actions/index'

import DefaultLoadingPage from '../../../components/defaults/loadingPage/loadingPage';
import DefaultErrorPage from '../../../components/defaults/errorPage/errorPage'
import DefaultProcessingPage from '../../../components/defaults/processingPage/processingPage';
import DefaultMessagePage from '../../../components/defaults/defaultMessage/defaultMessage'
import { DEFAULT_MESSAGE_LESSON_BY_ID_ITEM_NOT_FOUND } from '../../../components/defaults/defaultMessage/defaultMessageContent/defaultMessageContent'
import { 
  CARD_TITLE_SELECTED_LESSON_GET_BY_ID, CARD_TITLE_DELETING_LESSON_DELETE_BY_ID
} from '../../../components/common/content/contentInfo'

import { ROUTES_REACT } from '../../../standards/routes'

class LessonDelete extends Component {
  constructor(props){
    super(props);
    this.state = {
      // showModalLessonDelete: true
    }
  }
  
  componentDidMount(){
    // console.log('props @ lessonDelete', this.props)
    this.props.lessonGetById(this.props.match.params.id);
  }
  
  renderContent(){
    let { lessons: { 
      isGettingLessonById, errorMessageGettingLessonById,
      isDeletingLessonById, errorMessageDeletingLessonById,
      lessonById
    } } = this.props;
    // lessonById = null
    if(isGettingLessonById){
      const {
        title,
        classNameTxt
      } = CARD_TITLE_SELECTED_LESSON_GET_BY_ID;
      return (
        <DefaultLoadingPage
          title={title}
          classNameTxt={classNameTxt}
        />        
      )
    }
    else if(errorMessageGettingLessonById || errorMessageDeletingLessonById){
      return (
        <DefaultErrorPage 
          
        />
      )
    }
    else if(isDeletingLessonById){
      const {
        title,
        classNameTxt
      } = CARD_TITLE_DELETING_LESSON_DELETE_BY_ID;
      return (
        <DefaultProcessingPage 
          title={title}
          classNameTxt={classNameTxt}
        />
      )
    }
    else if(!lessonById){
      return (
        <DefaultMessagePage 
          content={DEFAULT_MESSAGE_LESSON_BY_ID_ITEM_NOT_FOUND}
        />
      )
    } else {
      console.log('this props', this.props)
      const { id } = this.props.match.params;
      // const { Id } = this.props.lessonById;
      console.log('id', id)
      // const { unscheduledlessons } = ROUTES_REACT;
      return(
        <article className="card">
          <div className="grid grid--full">
            <div className="grid-cell">
              <fieldset className="fc--disp-flex fc--fdir-col fc--aItem-ce noMargin">
                <h5 className="fw600 ls12 fcGrey424041">Lesson Information: {lessonById.title}</h5>
                <hr className="modalHR mt10" />
                {/* <form> */}
                  <div className="fc-fieldset">
                    <div className="fc-field fc--disp-flex fc--fdir-col fc--jCont-ce width100P">
                      <div className="fc-field-row-full fc--disp-flex fc--fdir-row mt10">
                        <label htmlFor="">Title:</label>
                      </div>
                      <div className="fc-field-row-full fc--disp-flex fc--fdir-row mt10">
                        <p className="fs16 fw300 ls10 fcGrey424041 mt10">
                          {lessonById.title}
                        </p>
                      </div>
                      <div className="fc-field-row-full fc--disp-flex fc--fdir-row mt30">
                        <label htmlFor="">Description:</label>
                      </div>                  
                      <div className="fc-field-row-full fc--disp-flex fc--fdir-row mt10">
                        <p className="fs16 fw300 ls10 fcGrey424041 mt10">
                          {lessonById.description}
                        </p>
                      </div>                  
                    </div>
                  </div>
                  <hr className="modalHR mt80" />
                  <div className="ta-cent">
                    <Link
                      className=""
                      to={ ROUTES_REACT.unscheduledlessons }
                    >
                      <button className="btn btnFillGreyB9 pdTB2LR8 fs20 fw500 ls12 mt30">Cancel</button>
                    
                    </Link>
                    <button 
                      className="btn btnFillClrSchWarn pdTB2LR8 fs20 fw500 ls12 ml20 mt30"
                      onClick={() => {this.props.lessonDeleteById(id)}}
                    >Delete Lesson</button>
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
      <>
        {this.renderContent()}
      </>
    )
  }
}

function mapStateToProps(state, ownProps){
  return {
    // lessonById: state.lessons.lookupTableAllLessons[ownProps.match.params.id]
    lessons: state.lessons
    // lessonById: state.lessons.lessonById
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({ lessonGetById, lessonDeleteById }, dispatch)
}

export default connect( mapStateToProps, mapDispatchToProps )(LessonDelete)

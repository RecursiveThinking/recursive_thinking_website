import React, { Component } from 'react';
// import ModalDelete from '../common/modal/modalDelete';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { getLessonById, deleteLessonById } from '../../actions/index'

import DefaultLoadingPage from '../defaults/loadingPage/loadingPage';

import { ROUTES_REACT } from '../../standards/routes'

class LessonDelete extends Component {
  constructor(props){
    super(props);
    this.state = {
      // showModalLessonDelete: true
    }
  }
  
  // handleToggleModalLessonDelete(){
  //   this.setState( { showModalLessonDelete: !this.state.showModalLessonDelete })
  // }
  
  componentDidMount(){
    console.log('props @ lessonDelete', this.props)
    this.props.getLessonById(this.props.match.params.id);
  }
  
  // renderModalButtons(){
  //   const { id } = this.props.match.params;
  //   const { unscheduledlessons } = ROUTES_REACT;
  //   return (
  //     <>
  //       <Link
  //         className=""
  //         to={ unscheduledlessons }
  //       >Cancel</Link>
  //       <button
  //         className=""
  //         onClick={() => {this.props.deleteLessonById(id)}}
  //       >Delete</button>
  //     </>
  //   )
  // }
  
  renderContent(){
    const { lessonById } = this.props;
    if(!lessonById){
      return (
        // <DefaultLoadingPage />
        <div>Loading</div>
      )
    } else {
      console.log('this props', this.props)
      const { id } = this.props.match.params;
      // const { Id } = this.props.lessonById;
      console.log('id', id)
      // const { unscheduledlessons } = ROUTES_REACT;
      return(
        <article className="card">
          <fieldset className="fc--disp-flex fc--fdir-col fc--aItem-ce">
            <h5 className="fw700 ls14 ttup fcGrey424041">Delete Lesson: {lessonById.title}</h5>
            <hr className="modalHR mt10" />
            {/* <form> */}
              <div className="fc-fieldset">
                <div className="fc-field fc--disp-flex fc--fdir-col fc--jCont-ce width100P">
                  <div className="fc-field-row-full fc--disp-flex fc--fdir-row mt10">
                    <label htmlFor="">Title:</label>
                  </div>
                  <div className="fc-field-row-full fc--disp-flex fc--fdir-row mt10">
                    <p>
                      {lessonById.title}
                    </p>
                  </div>
                  <div className="fc-field-row-full fc--disp-flex fc--fdir-row mt10">
                    <label htmlFor="">Description:</label>
                  </div>                  
                  <div className="fc-field-row-full fc--disp-flex fc--fdir-row mt10">
                    {lessonById.description}
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
                  className="btn btnFillClrSchWarn pdTB2LR8 fs20 fw500 ls12 mt30"
                  onClick={() => {this.props.deleteLessonById(id)}}
                >Delete Lesson</button>
              </div>
              {/* btn btnFillClrSchWarn btnOutlineClrSchUnavailable btnVoted fs16 fw500 ls12 ta-cent pdTB1p25LR2p5 */}
            {/* </form> */}
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
      // <section>
      //   {
      //     this.state.showModalLessonDelete &&
          
      //     <ModalDelete 
      //       onCloseRequest={() => this.handleToggleModalLessonDelete()}
      //       content={this.renderContent()}
      //       buttons={this.renderModalButtons()}
      //     />
      //   }
      // </section>
    )
  }
}

function mapStateToProps(state, ownProps){
  return {
    lessonById: state.lessons.lookupTableAllLessons[ownProps.match.params.id]
    // lessonById: state.lessons.lessonById
  }
}

export default connect(mapStateToProps, { getLessonById, deleteLessonById })(LessonDelete)

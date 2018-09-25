import React, { Component } from 'react';
import { connect } from 'react-redux';

import UnscheduledLessonsList from '../../components/unscheduledLessons/unscheduledLessonsList';
import { fetchLessons } from '../../actions/index'


class UnscheduledLessons extends Component {
  componentDidMount(){
    this.props.fetchLessons();
  }
  
  render(){
    
    // if(this.props.unscheduledLessons.length === 0){}
    return (
      <main>
      {/* modal probably here */}
        <div className="dropdown"> 
          <div className="grid grid--full">
            <div className="grid-cell">
              <article className="cardFull ta-cent">
                <h3 className="fs33 fw300 ls14 fcBlack">Want to learn something specific? Have something to teach?</h3>
                <h2 className="fs50 fw300 ls14 fcBlack my15">Submit a lesson request</h2>
                <button
                  onClick={this.handleClick}
                  className="btn btnFillClrSchGreen00b371 pdTB2LR8 fs20 fw500 ls12 mt35"
                >
                  Submit Lesson
                </button>
              </article>
            </div>
          </div>
        </div>
        {/* <Modal>
          
        </Modal> */}
        {/* here is where unscheduled  lessons List will go*/}
        <div className="contentList"> 
          <UnscheduledLessonsList currentUser={this.props.currentUser} allUnscheduledLessonsArray={this.props.unscheduledLessons}/>
        </div>
      </main>
    )
  }
}

function mapStateToProps(state){
  return {
    allLessons: state.lessons.allLessons,
    unscheduledLessons: state.lessons.unscheduledLessons,
    currentUser: state.currentUser
  }
}

export default connect(mapStateToProps, {fetchLessons})(UnscheduledLessons);
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchUsers, fetchLessons } from '../../actions'
import { FETCHING } from '../../actions/action_types'

import UnscheduledLessonsList from '../../components/unscheduledLessons/unscheduledLessonsList';
import DefaultErrorPage from '../../components/defaults/errorPage/errorPage';
import DefaultLoadingPage from '../../components/defaults/loadingPage/loadingPage'

import Modal from '../../components/common/modal/modal'
import { SubmitLessonRequestFormEx } from '../../components/forms/forms_modals'

class UnscheduledLessons extends Component {
  constructor(props){
    super(props)
    
    // init state
    this.state = {
      showModal: false,
    }
  }
  
  componentDidMount(){
    this.props.fetchUsers();
    this.props.fetchLessons();
  }
  
  handleToggleModal(){
    this.setState({ showModal: !this.state.showModal })
  }
  
  render(){
    const {
      allUsers,
      allLessons,
      unscheduledLessons,
      currentUser
    } = this.props
    
    if(!allUsers || !allLessons || !unscheduledLessons){
      return (
        <main className="content">
          <DefaultErrorPage />
        </main>
      )
    }
    else if(allUsers === FETCHING || allLessons === FETCHING || unscheduledLessons === FETCHING){
      return (
        <main className="content">
          <DefaultLoadingPage />
        </main>
      )
    }
    else {
      return (
        <main>
          <section className="submitNewBar">
            <div className="grid grid--cols-2">
              <div className="grid-cell fc--disp-flex fc-submitNewText">
                <h6 className="fs22 fw600 ls12 fcGrey424041">Submit a Lesson Request</h6>
                <h6 className="fs16 fw300 ls08 fcGrey424041">Want to learn something specific? Have something to teach?</h6>
              </div>
              <div className="grid-cell fc--disp-flex fc-submitNewButton">
                <button onClick={() => this.handleToggleModal()} className="btn btnFillClrSchGreen00b371 pdTB1p25LR2p5 fs16 fw500 ls12">Submit Lesson</button>
                  {
                    this.state.showModal &&
                    
                    <Modal
                      onCloseRequest={() => this.handleToggleModal()}
                      content={<SubmitLessonRequestFormEx />}
                    />
                  }
              </div>
            </div>
          </section>
          <div className="contentList"> 
            <UnscheduledLessonsList 
              currentUser={currentUser}
              allUsersArr = {allUsers}
              allUnscheduledLessonsArr={unscheduledLessons}
            />
          </div>
        </main>
      )
    }
  }
}

function mapStateToProps(state){
  return {
    allUsers: state.users.allUsers,
    allLessons: state.lessons.allLessons,
    unscheduledLessons: state.lessons.unscheduledLessons,
    currentUser: state.auth.currentUser
  }
}

export default connect(mapStateToProps, {fetchUsers, fetchLessons})(UnscheduledLessons);
import React, { Component } from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'

import { fetchUsers, fetchLessons, fetchInterviewQuestions, fetchInterviewQuestionsAnswers} from '../../actions/index';
import { FETCHING } from '../../actions/action_types';

import DefaultLoadingPage from '../../components/defaults/loadingPage/loadingPage'
import AdminPanelList from '../../components/adminPanel/adminPanelList'

import ContentPageTitleBar from '../../components/common/contentPage/contentPageTitleBar'
import { TITLE_BAR_ADMIN_PANEL } from '../../components/common/contentPage/contentPageTitleBarInfo';

class AdminPanel extends Component {
  componentDidMount(){
    this.props.fetchUsers();
    this.props.fetchLessons();
    this.props.fetchInterviewQuestions();
    this.props.fetchInterviewQuestionsAnswers();
  }
  render(){
    console.log('@ adminPanel Container - this.props: ', this.props)
    const {
      allUsers,
      lookupTableUsers,
      allLessons,
      allInterviewQuestions,
      allInterviewQuestionsAnswers
    } = this.props;
    if(allUsers === FETCHING || lookupTableUsers === FETCHING || allLessons === FETCHING || allInterviewQuestions === FETCHING || allInterviewQuestionsAnswers === FETCHING){
      return (
        <main>
          <div className="content">
            <DefaultLoadingPage />
          </div>
        </main>
      )
    } else {
      return(
        <main>
          <ContentPageTitleBar 
            content={TITLE_BAR_ADMIN_PANEL}
          />
          <div className="content">
            {/* <div>Howdy Partner</div> */}
            <AdminPanelList
              allUsers={this.props.allUsers}
              lookupTableUsers={this.props.lookupTableUsers}
              allLessons={this.props.allLessons}
              allInterviewQuestions={this.props.allInterviewQuestions}
              allInterviewQuestionsAnswers={this.props.allInterviewQuestionsAnswers}
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
    lookupTableUsers: state.users.lookupTableAllUsers,
    allLessons: state.lessons.allLessons,
    lookupTableLessons: state.lessons.lookupTableAllLessons,
    allInterviewQuestions: state.interviewQuestions.allInterviewQuestions,
    lookupTableInterviewQuestions: state.interviewQuestions.lookupTableInterviewQuestions,
    allInterviewQuestionsAnswers: state.interviewQuestionsAnswers.allInterviewQuestionsAnswers,
    lookupTableInterviewQuestionsAnswers: state.interviewQuestionsAnswers.lookupTableInterviewQuestionsAnswers,
    currentUser: state.auth.currentUser
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({fetchUsers, fetchLessons, fetchInterviewQuestions, fetchInterviewQuestionsAnswers}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminPanel)
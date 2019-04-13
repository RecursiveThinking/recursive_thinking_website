import { LogService as ls, catObj as co, subObj as so, tableObj as to, methodObj as mo } from '../../services/logService';

import React, { Component } from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'

import { usersGetAll, lessonsGetAll, interviewQuestionsGetAll, interviewQuestionAnswersGetAll} from '../../actions/index';

import DefaultLoadingPage from '../../components/defaults/loadingPage/loadingPage'
import DefaultErrorPage from '../../components/defaults/errorPage/errorPage'
import { CARD_TITLE_GETTING_APP_DATA } from '../../components/common/content/contentInfo'

import AdminPanelList from '../../components/adminPanel/adminPanelList'

class AdminPanel extends Component {
  componentDidMount(){
    this.props.usersGetAll();
    this.props.lessonsGetAll();
    this.props.interviewQuestionsGetAll();
    this.props.interviewQuestionAnswersGetAll();
  }
  
  renderContent = () => {
    
    let {
      users: { allUsers, lookupTableAllUsers, isFetchingUsersGetAll, errorMessageUsersGetAll },
      lessons: { allLessons, isFetchingLessonsGetAll, errorMessageLessonsGetAll},
      interviewQuestions: { allInterviewQuestions, isFetchingInterviewQuestionsGetAll, errorMessageInterviewQuestionsGetAll },
      interviewQuestionAnswers: { allInterviewQuestionAnswers, isFetchingInterviewQuestionsAnswersGetAll, errorMessageInterviewQuestionsAnswersGetAll }
    } = this.props;
    const {
      title
    } = CARD_TITLE_GETTING_APP_DATA;
    
    // isFetchingUsersGetAll = true;
    
    if(isFetchingUsersGetAll || isFetchingLessonsGetAll || isFetchingInterviewQuestionsGetAll || isFetchingInterviewQuestionsAnswersGetAll){
      return (
        <DefaultLoadingPage 
          title={title}
          classNameTxt='ta-cent'
        />
      )
    } 
    else if(errorMessageUsersGetAll || errorMessageLessonsGetAll || errorMessageInterviewQuestionsGetAll || errorMessageInterviewQuestionsAnswersGetAll){
      return (
        <DefaultErrorPage />
      )
    }
    else if(!isFetchingUsersGetAll || !isFetchingLessonsGetAll || !isFetchingInterviewQuestionsGetAll || !isFetchingInterviewQuestionsAnswersGetAll) {
      ls(co.cont, so.props, to.adminPanel, null, this.props)
      return(
        <AdminPanelList
          allUsers={allUsers}
          lookupTableAllUsers={lookupTableAllUsers}
          allLessons={allLessons}
          allInterviewQuestions={allInterviewQuestions}
          allInterviewQuestionAnswers={allInterviewQuestionAnswers}
        />
      )
    }
  }
  
  render(){
    return (
      <>
        {this.renderContent()}
      </>
    )
  }
}

function mapStateToProps(state){
  return {
    users: state.users,
    lessons: state.lessons,
    interviewQuestions: state.interviewQuestions,
    interviewQuestionAnswers: state.interviewQuestionAnswers,
    currentUser: state.auth.currentUser
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({usersGetAll, lessonsGetAll, interviewQuestionsGetAll, interviewQuestionAnswersGetAll}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminPanel)
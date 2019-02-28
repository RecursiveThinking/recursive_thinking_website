import React, { Component } from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'

import { fetchUsers, fetchLessons, fetchInterviewQuestions, fetchInterviewQuestionsAnswers} from '../../actions/index'

import AdminPanelList from '../../components/adminPanel/adminPanelList'

class AdminPanel extends Component {
  componentDidMount(){
    this.props.fetchUsers();
    this.props.fetchLessons();
    this.props.fetchInterviewQuestions();
    this.props.fetchInterviewQuestionsAnswers();
  }
  render(){
    // console.log('this.props', this.props)
    
    return(
      <main>
        <div className="content">
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
    currentUser: state.currentUser
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({fetchUsers, fetchLessons, fetchInterviewQuestions, fetchInterviewQuestionsAnswers}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminPanel)
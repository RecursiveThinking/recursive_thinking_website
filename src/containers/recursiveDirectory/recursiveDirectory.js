import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { FETCHING } from '../../actions/action_types';
import { fetchUsers } from '../../actions';

import DefaultErrorPage from '../../components/defaults/errorPage/errorPage';
import DefaultLoadingPage from '../../components/defaults/loadingPage/loadingPage';

import RecursiveDirectoryList from '../../components/recursiveDirectory/recursiveDirectoryList';

import { LogServices } from '../../services/logService'

import DM from '../../standards/dictModel'

const { 
  user: { userId }
} = DM;

class RecursiveDirectory extends Component {
  componentDidMount(){
    this.props.fetchUsers();
  }

  render(){
    const { 
      allUsers, 
      allUsersAPIResponse, 
      currentUser 
    } = this.props
    
    // need to map an array of users not including the current one
    // console.log(this.props)
    // if allUsers comes back null (error),
    // allUsers = null;
    if(!allUsers){
      LogServices.log(allUsersAPIResponse)
      //  render the error page
      return (
        <main className="content">
          <DefaultErrorPage />
        </main>
      )
    }
    else if(allUsers === FETCHING){
      return (
        <main className="content">
          <DefaultLoadingPage />
        </main>
      )
    }
    else {
      // allUsers.length = 0;
      let allUsersExcludingCurrent = allUsers.filter(user => user[userId] !== currentUser[userId])

      return (
        <main className="content">
          <RecursiveDirectoryList usersForDirectory={allUsersExcludingCurrent} />
        </main>
      )
    }
  }
}

// map state to props
function mapStateToProps(state){
  return {
    allUsers: state.users.allUsers,
    allUsersAPIResponse: state.users.allUsersAPIResponse,
    lookupTableUsers: state.users.lookupTableAllUsers,
    currentUser: state.auth.currentUser
  }
}

// map action to props
function mapDispatchToProps(dispatch){
  return bindActionCreators( { fetchUsers }, dispatch)
}

// connect react/redux
export default connect(mapStateToProps, mapDispatchToProps)(RecursiveDirectory)


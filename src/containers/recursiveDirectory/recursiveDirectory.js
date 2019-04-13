import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { usersGetAll } from '../../actions';

import DefaultErrorPage from '../../components/defaults/errorPage/errorPage';
import DefaultLoadingPage from '../../components/defaults/loadingPage/loadingPage';
import { CARD_TITLE_RECURSIVE_DIRECTORY_GET_ALL } from '../../components/common/content/contentInfo'

import RecursiveDirectoryList from '../../components/recursiveDirectory/recursiveDirectoryList';

import DM from '../../standards/dictModel'

const { user: { userId } } = DM;
class RecursiveDirectory extends Component {
  componentDidMount(){
    this.props.usersGetAll();
  }
  
  renderContent = () => {
    let {
      users: {
        allUsers,
        isFetchingUsersGetAll, errorMessageUsersGetAll
      },
      currentUser 
    } = this.props
    const {
      title
    } = CARD_TITLE_RECURSIVE_DIRECTORY_GET_ALL
    // isFetchingUsersGetAll = true;
    if(errorMessageUsersGetAll){
      return (
        <DefaultErrorPage 
          
        />
      )
    }
    else if(isFetchingUsersGetAll){
      return (
        <DefaultLoadingPage 
          title={title}
          classNameTxt='ta-cent'
        />
      )
    }
    else {
      let allUsersExcludingCurrent = allUsers.filter(user => user[userId] !== currentUser[userId])
      let allUsersWhoHaveSetupProfile = allUsersExcludingCurrent.filter(user => user.isProfileSetup === true)
      // allUsersWhoHaveSetupProfile = []
      return (
        <RecursiveDirectoryList usersForDirectory={allUsersWhoHaveSetupProfile} />
      )
    }
  }
  
  render(){
    return (
      <>
        {this.renderContent()}
      </>
    )
    
    // need to map an array of users not including the current one
    // console.log(this.props)
    // if allUsers comes back null (error),
    // allUsers = null;
    // if(errorMessageUsersGetAll){
    //   // LogServices.log(allUsersAPIResponse)
    //   //  render the error page
    //   return (
    //     <main className="content">
    //       <DefaultErrorPage />
    //     </main>
    //   )
    // }
    // else if(isFetchingUsersGetAll){
    //   return (
    //     <main className="content">
    //       <DefaultLoadingPage />
    //     </main>
    //   )
    // }
    // else {
    //   let allUsersExcludingCurrent = allUsers.filter(user => user[userId] !== currentUser[userId])
    //   let allUsersWhoHaveSetupProfile = allUsersExcludingCurrent.filter(user => user.isProfileSetup === true)
    //   // allUsersWhoHaveSetupProfile = []
    //   return (
    //     <main className="content">
    //       <RecursiveDirectoryList usersForDirectory={allUsersWhoHaveSetupProfile} />
    //     </main>
    //   )
    // }
  }
}

// map state to props
function mapStateToProps(state){
  return {
    users: state.users,
    // lookupTableAllUsers: state.users.lookupTableAllUsers,
    // isFetchingUsersGetAll: state.users.isFetchingUsersGetAll,
    // errorMessageUsersGetAll: state.users.errorMessageUsersGetAll,
    auth: state.auth
    // currentUser: state.auth.currentUser
  }
}

// map action to props
function mapDispatchToProps(dispatch){
  return bindActionCreators( { usersGetAll }, dispatch)
}

// connect react/redux
export default connect(mapStateToProps, mapDispatchToProps)(RecursiveDirectory)


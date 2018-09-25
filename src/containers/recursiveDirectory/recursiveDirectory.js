import React, {Component} from 'react';
import { connect } from 'react-redux'
import { fetchUsers } from '../../actions/index'

import RecursiveDirectoryList from '../../components/recursiveDirectory/recursiveDirectoryList'
// import { bindActionCreators } from 'redux';

class RecursiveDirectory extends Component {
  componentDidMount(){
    this.props.fetchUsers();
  }
  
  render(){    
    // need to map an array of users not including the current one
    let allUsersExcludingCurrent = this.props.allUsers.filter(user => user.userId !== this.props.currentUser.userId)
    console.log('allUsersButCurrent', allUsersExcludingCurrent);
    return (
      <main className="content">
        <RecursiveDirectoryList usersForDirectory={allUsersExcludingCurrent} />
      </main>
    )
  }
}

// map state to props
function mapStateToProps(state){
  return {
    allUsers: state.users.allUsers,
    lookupTableUsers: state.users.lookupTableUsers,
    currentUser: state.currentUser
  }
}

// map action to props
// function mapDispatchToProps(dispatch){
//   return bindActionCreators( {allUsers: allUsers}, dispatch)
// }

// connect react/redux
export default connect(mapStateToProps, {fetchUsers})(RecursiveDirectory)


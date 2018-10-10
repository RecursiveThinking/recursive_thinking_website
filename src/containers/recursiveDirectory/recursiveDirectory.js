import React, {Component} from 'react';
import { connect } from 'react-redux'
import { fetchUsers } from '../../actions/index'

import RecursiveDirectoryList from '../../components/recursiveDirectory/recursiveDirectoryList'

import DM from '../../standards/dictModel'
class RecursiveDirectory extends Component {
  componentDidMount(){
    this.props.fetchUsers();
  }
  
  render(){    
    const { allUsers, currentUser } = this.props
    const { user: { userId }} = DM;
    // need to map an array of users not including the current one
    let allUsersExcludingCurrent = allUsers.filter(user => user[userId] !== currentUser[userId])

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
    lookupTableUsers: state.users.lookupTableAllUsers,
    currentUser: state.currentUser
  }
}

// map action to props
// function mapDispatchToProps(dispatch){
//   return bindActionCreators( {allUsers: allUsers}, dispatch)
// }

// connect react/redux
export default connect(mapStateToProps, {fetchUsers})(RecursiveDirectory)


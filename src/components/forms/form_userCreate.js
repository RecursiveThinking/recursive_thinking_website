import React, { Component } from 'react'

import { connect } from 'react-redux';
import { createUser } from '../../actions';
import UserForm from './form_user';

import { FORM_HEADING_USER_CREATE } from './formContent';
import { User } from '../../models/models';

import { getCurrentUserById } from '../actions/index';

class UserCreate extends Component {
  
  componentDidMount(){
    this.props.getCurrentUserById();
  }
  
  
  
  render(){
    if(!this.props.currentUser){
      return (
        // and here make the user from the model
        <div>Loading!!!!</div>
      )
    } 
    return (
      // or here move to another page?
      <div>Loading!</div>
    )
  }
}

function mapStateToProps(state){
  return {
    currentUser: state.auth.currrentUser
  }
}

export default connect(mapStateToProps, { getCurrentUserById })(UserCreate)
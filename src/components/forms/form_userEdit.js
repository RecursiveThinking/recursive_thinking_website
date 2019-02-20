import React, { Component } from 'react'

import { connect } from 'react-redux';
import { createUser, editUserById } from '../../actions';

import UserForm from './form_user';
import { FORM_HEADING_USER_EDIT } from './formContent';

import { getCurrentUserById } from '../../actions/index';

import DefaultLoadingPage from '../defaults/loadingPage/loadingPage';

class UserEdit extends Component {
  componentDidMount(){
    this.props.getCurrentUserById();
  }
  
  onSubmit = (formValues) => {
    
  }
  
  mapInitialValues = (dictModel, currentUserObj) => {
    // this will need to return an object
    return {}
  }
  
  render(){
    console.log('props @ UserEdit', this.props);
    console.log('params @ UserEdit', this.props.match.params.id)
    if(!this.props.currentUser){
      return (
        <section style={{padding: '1.5rem 1.5rem'}}>
          <DefaultLoadingPage />
        </section>
      )
    }
    return (
      <>
        <UserForm 
          onSubmit={this.onSubmit}
          content={FORM_HEADING_USER_EDIT}
          initialValues={this.mapInitialValues}
          user={this.props.user}
        />
      </>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  console.log('MSTP @ UserEdit: ', state, ownProps);
  return {
    currentUser: state.auth.currentUser
  }
}

export default connect (
  mapStateToProps,
  { getCurrentUserById, editUserById}
)(UserEdit)
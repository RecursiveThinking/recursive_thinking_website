import React, { Component } from 'react'

import { connect } from 'react-redux';
import { editUserById, getCurrentUserById } from '../../actions';

import UserForm from './form_user';
import ContentPageWithTitleBar from '../../components/common/contentPage/contentPageWithTitleBar'
// import { TITLE_BAR_USER_EDIT } from '../../components/common/contentPage/contentPageTitleBarInfo'
import { FORM_HEADING_USER_EDIT } from './formContent/formContent';

import DefaultLoadingPage from '../defaults/loadingPage/loadingPage';
import DM from '../../standards/dictModel'

class UserEdit extends Component {
  componentDidMount(){
    this.props.getCurrentUserById();
  }
  
  onSubmit = (formValues) => {
    console.log('sdf')
  }
  
  mapInitialValues = (dictModel, currentUserObj) => {
    // this will need to return an object
    // return {}
  }
  
  render(){
    console.log('props @ userEdit', this.props);
    if(!this.props.currentUser){
      return (
        <section style={{padding: '1.5rem 1.5rem'}}>
          <DefaultLoadingPage />
        </section>
      )
    }
    const {
      currentUser
    } = this.props
    const {
      user
    } = DM
    console.log('user: ', user.name)
    console.log('currentUser: ', currentUser)
    console.log('currentUser Name: ', currentUser[user.name])
    // const initValues = {
    //   name: currentUser[user.name],
    //   email: currentUser[user.email]
    // }
    // console.log('initValues: ', initValues)
    const initName = currentUser['name'];
    return (
      <>
        <ContentPageWithTitleBar 
        {...this.props} 
        formContent={
          <UserForm 
            {...this.props}
            onSubmit={this.onSubmit}
            content={FORM_HEADING_USER_EDIT}
            initialValues={{
              userName: initName,
              email: 'seth@gmail.com'
            }}
            // initialValues={initValues}
            // lesson={this.props.lessonById}
          />}
        titleBarContent={this.props.titleBarContent}
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

export default connect( mapStateToProps, { getCurrentUserById, editUserById})(UserEdit)
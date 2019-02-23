import React, { Component } from 'react'

import { connect } from 'react-redux';
import { editUserById, getCurrentUserById } from '../../actions';

import UserForm from './form_user';
import ContentPageWithTitleBar from '../../components/common/contentPage/contentPageWithTitleBar'
// import { TITLE_BAR_USER_EDIT } from '../../components/common/contentPage/contentPageTitleBarInfo'
import { FORM_HEADING_USER_EDIT } from './formContent/formContent';

import DefaultLoadingPage from '../defaults/loadingPage/loadingPage';
import DM from '../../standards/dictModel'
import { bindActionCreators } from 'C:/Users/workstation/AppData/Local/Microsoft/TypeScript/3.3/node_modules/redux';
import { ROUTES_REACT } from '../../standards/routes';

class UserEdit extends Component {
  componentDidMount(){
    this.props.getCurrentUserById();
  }
  
  // {
  //   name: "Seth Borne"
  //   city: "SEATTLE"
  //   state: "WA"
  //   title: "asdf"
  //   employer: "asdfasdf"
  //   linkGithub: "asdf"
  //   linkCodepen: "asdfasdf"
  //   linkLinkedIn: "asdf"
  //   linkPortfolioWebsite: "asdfasdf"
  //   bio: 
  //   experience: "2019-02-06"
  // }
  
  onSubmit = (formValues) => {
    const {
      experience
    } = DM.user;
    // console.log('sdf')
    // edit user
    console.log('formValues @ userEdit onSubmit: ', formValues)
    let edittedUser = { ...this.props.currentUser };
    for(let key in formValues){
      edittedUser[key] = formValues[key]
    }
    //
    edittedUser[experience] = edittedUser[experience].toString();
    // pass object to actions - but first, check if the user is setup
    if(!edittedUser.isProfileSetup){
      edittedUser.isProfileSetup = true;
      this.props.editUserById(edittedUser, ROUTES_REACT.dashboard, ROUTES_REACT.dashboard)
    } 
    else if(edittedUser.isProfileSetup){
      this.props.editUserById(edittedUser, `${ROUTES_REACT.users_edit}/${edittedUser.userId}`, `${ROUTES_REACT.users_edit}/${edittedUser.userId}`)
    }
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
    const initValues = {
      name: currentUser[user.name],
      city: currentUser[user.city],
      state: currentUser[user.state],
      title: currentUser[user.title],
      employer: currentUser[user.employer],
      linkGithub: currentUser[user.linkGithub],
      linkCodepen: currentUser[user.linkCodepen],
      linkLinkedIn: currentUser[user.linkLinkedIn],
      linkPortfolioWebsite: currentUser[user.linkPortfolioWebsite],
      bio: currentUser[user.bio],
      experience: currentUser[user.experience],
    }
    // console.log('initValues: ', initValues)
    const initName = currentUser[user.name];
    return (
      <>
        <ContentPageWithTitleBar 
          {...this.props} 
          formContent={
            <UserForm 
              {...this.props}
              onSubmit={this.onSubmit}
              content={FORM_HEADING_USER_EDIT}
              initialValues={initValues}
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

function mapDispatchToProps(dispatch){
  return bindActionCreators({getCurrentUserById, editUserById}, dispatch)
}

export default connect( mapStateToProps, mapDispatchToProps)(UserEdit)
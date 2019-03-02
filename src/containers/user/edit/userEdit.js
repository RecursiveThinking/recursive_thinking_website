import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { fetchSkills, editUserById, getCurrentUserById, getUserById } from '../../../actions';

import DefaultLoadingPage from '../../../components/defaults/loadingPage/loadingPage';
import ContentPageWithTitleBar from '../../../components/common/contentPage/contentPageWithTitleBar';
import { FORM_HEADING_USER_EDIT } from '../../../components/forms/formContent/formContent';
import UserForm from '../../../components/forms/form_user';

import { ROUTES_REACT } from '../../../standards/routes';
import DM from '../../../standards/dictModel';

class UserEdit extends Component {
  componentDidMount(){
    this.props.getCurrentUserById();
    this.props.getUserById(this.props.match.params.id);
    this.props.fetchSkills();
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
  //   experience: "2019-02-06",
  //   skillsProfessional = [];
  //   skillsSoftware = [];
  //   skillsLanguages = [];
  // }
  
  onSubmit = (formValues) => {
    const {
      experience
    } = DM.user;
    
    // console.log('formValues @ userEdit onSubmit: ', formValues)
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
    // console.log('user: ', user.name)
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
      skillsProfessional: currentUser[user.skillsProfessional],
      skillsSoftware: currentUser[user.skillsSoftware],
      skillsLanguages: currentUser[user.skillsLanguages]
    }
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
              currentUser={this.props.currentUser}
              userById={this.props.userById}
            />}
          titleBarContent={this.props.titleBarContent}
        />
      </>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  // console.log('MSTP @ UserEdit: ', state, ownProps);
  return {
    currentUser: state.auth.currentUser,
    userById: state.users.userById,
    allSkills: state.skills
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({ fetchSkills, getCurrentUserById, editUserById, getUserById }, dispatch)
}

export default connect( mapStateToProps, mapDispatchToProps)(UserEdit)
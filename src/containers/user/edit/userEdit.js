import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { getCurrentUserById, fetchSkills, getUserById, editUserById } from '../../../actions';

import DefaultLoadingPage from '../../../components/defaults/loadingPage/loadingPage';
import ContentPageWithTitleBar from '../../../components/common/contentPage/contentPageWithTitleBar';
import { FORM_HEADING_USER_EDIT } from '../../../components/forms/formContent/formContent';
import UserForm from '../../../components/forms/form_user';

import FormMethods from '../../../functions/formMethods'

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
    if(this.props.currentUser === 'FETCHING' || this.props.allSkills === 'FETCHING'){
      return (
        <section style={{padding: '1.5rem 1.5rem'}}>
          <DefaultLoadingPage />
        </section>
      )
    } else if (this.props.currentUser !== 'FETCHING' && this.props.allSkills !== 'FETCHING') {
      const {
        currentUser
      } = this.props
      const {
        user
      } = DM
      // console.log('user: ', user.name)
      console.log('currentUser: ', currentUser)
      console.log('currentUser Name: ', currentUser[user.name])
      const processedCurrentUser = FormMethods.removeSpaceFromDatabaseEntries(currentUser);
      console.log('processedCurrentUser: ', processedCurrentUser)
      const initValues = {
        name: processedCurrentUser[user.name],
        city: processedCurrentUser[user.city],
        state: processedCurrentUser[user.state],
        title: processedCurrentUser[user.title],
        employer: processedCurrentUser[user.employer],
        linkGithub: processedCurrentUser[user.linkGithub],
        linkCodepen: processedCurrentUser[user.linkCodepen],
        linkLinkedIn: processedCurrentUser[user.linkLinkedIn],
        linkPortfolioWebsite: processedCurrentUser[user.linkPortfolioWebsite],
        bio: processedCurrentUser[user.bio],
        experience: processedCurrentUser[user.experience],
        skillsProfessional: processedCurrentUser[user.skillsProfessional],
        skillsSoftware: processedCurrentUser[user.skillsSoftware],
        skillsLanguages: processedCurrentUser[user.skillsLanguages]
      }
      console.log('initialValues: ', initValues)
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
                currentUser={processedCurrentUser}
                userById={this.props.userById}
                allSkills={this.props.allSkills}
              />}
            titleBarContent={this.props.titleBarContent}
          />
        </>
      )
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  // console.log('MSTP @ UserEdit: ', state, ownProps);
  return {
    currentUser: state.auth.currentUser,
    userById: state.users.userById,
    allSkills: state.skills.allSkills
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({ getCurrentUserById, fetchSkills, editUserById, getUserById }, dispatch)
}

export default connect( mapStateToProps, mapDispatchToProps)(UserEdit)
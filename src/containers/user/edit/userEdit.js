import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { getCurrentUserById, fetchSkills, getUserById, editUserById, createSkill } from '../../../actions';
import { FETCHING } from '../../../actions/action_types' 

// import { validateGitHubUsername, validateCodePenUsername } from '../../../functions/urlValidationMethods';

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
  
  componentDidUpdate(prevProps, prevState){
    console.log('update @: ')
    if(prevProps.currentUser !== this.props.currentUser){
      console.log('there was a change.')
      console.log('prevProps: ', prevProps.currentUser, 'currentUser: ', this.props.currentUser)
      // this.props.getCurrentUserById();
    }
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
  
  onSubmit = (formValues, addTheseSkillObjsToDatabase, removeUserIdFromTheseSkills, addTheseSkillObjsProfessional, localSkillsForProfessional, addTheseSkillObjsSoftware, localSkillsForSoftware, addTheseSkillObjsLanguages, localSkillsForLanguages) => {
    const {
      experience,
      skillsProfessional,
      skillsSoftware,
      skillsLanguages
    } = DM.user;
    
    // console.log('formValues @ userEdit onSubmit: ', formValues)
    let edittedUser = { ...this.props.currentUser };
    for(let key in formValues){
      if(formValues[key] === ""){
        formValues[key] = " ";
      }
      edittedUser[key] = formValues[key]
    }
    // experience is a date object
    edittedUser[experience] = new Date(edittedUser[experience]).toString();
    console.log('edittedUser: ', edittedUser)
    // let updated
    // add skillObjs to database
    if(addTheseSkillObjsToDatabase){
      console.log('addTheseSkillObjsToDatabase', addTheseSkillObjsToDatabase)
      if(addTheseSkillObjsToDatabase.length){
        addTheseSkillObjsToDatabase.forEach(skillObj => {
          this.props.createSkill(skillObj)
        })
      }
    }
    // update editted user skill arrays. this is done by pushing the skillObj ids for local and add into one update array.  after user submitted, skills will be updated with userId
    let addUserIdToTheseSkillObjs = [];
    let updatedUserSkillsProfessionalIdArr = [];
    localSkillsForProfessional.forEach(skillObj => updatedUserSkillsProfessionalIdArr.push(skillObj.id))
    addTheseSkillObjsProfessional.forEach(skillObj => {
      updatedUserSkillsProfessionalIdArr.push(skillObj.id);
      addUserIdToTheseSkillObjs.push(skillObj);
    })
    let updatedUserSkillsSoftwareIdArr = [];
    localSkillsForSoftware.forEach(skillObj => updatedUserSkillsSoftwareIdArr.push(skillObj.id))
    addTheseSkillObjsSoftware.forEach(skillObj => {
      updatedUserSkillsSoftwareIdArr.push(skillObj.id);
      addUserIdToTheseSkillObjs.push(skillObj);
    })
    let updatedUserSkillsLanguagesIdArr = [];
    localSkillsForLanguages.forEach(skillObj => updatedUserSkillsLanguagesIdArr.push(skillObj.id))
    addTheseSkillObjsLanguages.forEach(skillObj => {
      updatedUserSkillsLanguagesIdArr.push(skillObj.id);
      addUserIdToTheseSkillObjs.push(skillObj);
    })
    edittedUser[skillsProfessional] = updatedUserSkillsProfessionalIdArr;
    edittedUser[skillsSoftware] = updatedUserSkillsSoftwareIdArr;
    edittedUser[skillsLanguages] = updatedUserSkillsLanguagesIdArr;
    console.log('user @ userEdit onSubmit: ', edittedUser)
    // these will be our async operations
    // validateGitHubUsername(linkGithub)
    //   .then(data => {
    //     console.log('data @ validateGitHubUsername: ', data)
    //   })
    //   .catch(err => {
    //     console.log('err @ validateGitHubUsername: ', err)
    //   })
    // pass object to actions - but first, check if the user is setup (this should only occur once)
    if(!edittedUser.isProfileSetup){
      edittedUser.isProfileSetup = true;
      // happens when setting up User
      this.props.editUserById(edittedUser, ROUTES_REACT.dashboard, ROUTES_REACT.dashboard, null, addUserIdToTheseSkillObjs)
    } 
    // when user already setup
    else if(edittedUser.isProfileSetup){
      // this.props.editUserById(edittedUser, `${ROUTES_REACT.users_edit}/${edittedUser.userId}`, `${ROUTES_REACT.users_edit}/${edittedUser.userId}`)
      this.props.editUserById(edittedUser, `${ROUTES_REACT.users_edit}`, `${ROUTES_REACT.users_edit}`, removeUserIdFromTheseSkills, addUserIdToTheseSkillObjs)
    }
  }
  
  mapInitialValues = (dictModel, currentUserObj) => {
    // this will need to return an object
    // return {}
  }
  
  render(){
    console.log('props @ userEdit', this.props);
    if(this.props.currentUser === FETCHING || this.props.allSkills === FETCHING){
      return (
        <section style={{padding: '1.5rem 1.5rem'}}>
          <DefaultLoadingPage />
        </section>
      )
    } else if (this.props.currentUser !== FETCHING && this.props.allSkills !== FETCHING) {
      const {
        currentUser,
        lookupTableAllSkills
      } = this.props
      const {
        user
      } = DM
      // console.log('user: ', user.name)
      console.log('currentUser: ', currentUser)
      // console.log('currentUser Name: ', currentUser[user.name])
      const processedCurrentUser = FormMethods.removeSpaceFromDatabaseEntries(currentUser);
      // console.log('processedCurrentUser: ', processedCurrentUser)
      const extractUsername = (id, formValue) => {
        const splitFormValue = formValue.split('/').filter(item => item !== '')
        console.log('splitFormValue: ', splitFormValue);
        if(id === 'linkedIn'){
          return splitFormValue[2]
        }
        if(id === 'codePen'){
          return splitFormValue[2]
        }
      }
      const initValues = {
        name: processedCurrentUser[user.name],
        city: processedCurrentUser[user.city],
        state: processedCurrentUser[user.state],
        title: processedCurrentUser[user.title],
        employer: processedCurrentUser[user.employer],
        linkGithub: extractUsername('linkedIn',processedCurrentUser[user.linkGithub]),
        linkCodepen: extractUsername('linkedIn', processedCurrentUser[user.linkCodepen]),
        linkLinkedIn: processedCurrentUser[user.linkLinkedIn],
        linkPortfolioWebsite: processedCurrentUser[user.linkPortfolioWebsite],
        bio: processedCurrentUser[user.bio],
        experience: processedCurrentUser[user.experience],
        skillsProfessional: processedCurrentUser[user.skillsProfessional].map(skillObj => lookupTableAllSkills[skillObj]),
        skillsSoftware: processedCurrentUser[user.skillsSoftware].map(skillObj => lookupTableAllSkills[skillObj]),
        skillsLanguages: processedCurrentUser[user.skillsLanguages].map(skillObj => lookupTableAllSkills[skillObj])
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
    allSkills: state.skills.allSkills,
    lookupTableAllSkills: state.skills.lookupTableAllSkills
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({ getCurrentUserById, fetchSkills, editUserById, getUserById, createSkill }, dispatch)
}

export default connect( mapStateToProps, mapDispatchToProps)(UserEdit)
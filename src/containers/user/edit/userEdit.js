import { LogService as ls, catObj as co, subObj as so, tableObj as to, methodObj as mo } from '../../../services/logService';

import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { skillsGetAll, userGetById, userEditById, skillCreateById, ranksGetAll } from '../../../actions';
// getCurrentUserById, 
// import { FETCHING } from '../../../actions/action_types' 

import DefaultLoadingPage from '../../../components/defaults/loadingPage/loadingPage';
import DefaultErrorPage from '../../../components/defaults/errorPage/errorPage'
import { CARD_TITLE_GETTING_CURRENT_USER_PROFILE } from '../../../components/common/content/contentInfo'

import { FORM_HEADING_USER_EDIT } from '../../../components/forms/formContent/formContent';
import UserForm from '../../../components/forms/form_user';

import FormMethods from '../../../functions/formMethods'

import { ROUTES_REACT } from '../../../standards/routes';
import DM from '../../../standards/dictModel';

class UserEdit extends Component {
  componentDidMount(){
    // if(this.props.auth.currentUser.userId){
    //   console.log('Hey, in @userEdit, have a valid currentUser', this.props.auth)
    // }
    // if(!this.props.auth.currentUser.userId){
      // this.props.getCurrentUserById();
    // }
    // if(!this.props.currentUser){
    //   this.props.getCurrentUserById();
    // }
    // if(this.props.match.params.id){
    //   this.props.userGetById(this.props.match.params.id);
    // }
    this.props.skillsGetAll();
    if(!this.props.ranks.allRanks.length){
      this.props.ranksGetAll();
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
    console.log('@userEdit onSubmit (start): ', formValues)
    console.log('all submit values: ', formValues, addTheseSkillObjsToDatabase, removeUserIdFromTheseSkills, addTheseSkillObjsProfessional, localSkillsForProfessional, addTheseSkillObjsSoftware, localSkillsForSoftware, addTheseSkillObjsLanguages, localSkillsForLanguages)
    const {
      user: { experience, skillsProfessional, skillsSoftware, skillsLanguages }
    } = DM;
    const {
      currentUser
    } = this.props;
    
    let edittedUser = { ...currentUser };
    for(let key in formValues){
      if(formValues[key] === ""){
        formValues[key] = " ";
      }
      edittedUser[key] = formValues[key]
    }
    // experience is a date object
    edittedUser[experience] = new Date(edittedUser[experience]).toString();
    // console.log('edittedUser: ', edittedUser)
    // let updated
    // add skillObjs to database
    if(addTheseSkillObjsToDatabase){
      // console.log('addTheseSkillObjsToDatabase', addTheseSkillObjsToDatabase)
      if(addTheseSkillObjsToDatabase.length){
        addTheseSkillObjsToDatabase.forEach(skillObj => {
          this.props.skillCreateById(skillObj)
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
    console.log('@userEdit onSubmit (end): ', formValues)
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
      this.props.userEditById(edittedUser, ROUTES_REACT.dashboard, ROUTES_REACT.dashboard, null, addUserIdToTheseSkillObjs)
    } 
    // when user already setup
    else if(edittedUser.isProfileSetup){
      // this.props.userEditById(edittedUser, `${ROUTES_REACT.users_edit}/${edittedUser.userId}`, `${ROUTES_REACT.users_edit}/${edittedUser.userId}`)
      this.props.userEditById(edittedUser, `${ROUTES_REACT.users_edit}`, `${ROUTES_REACT.users_edit}`, removeUserIdFromTheseSkills, addUserIdToTheseSkillObjs)
    }
  }
  
  // mapInitialValues = (dictModel, currentUserObj) => {
    // this will need to return an object
    // return {}
  // }
  
  render(){

    let {
      auth: {
        isSignedIn, isGettingCurrentUserById, errorMessageCurrentUserById
      },
      skills: { allSkills, lookupTableAllSkills, 
        isFetchingSkillsGetAll, errorMessageSkillsGetAll
      },
      users: {
        userById, 
        isGettingUserById, errorMessageGettingUserById        
      },
      ranks: {
        allRanks, lookupTableAllRanks,
        isFetchingRanksGetAll, errorMessageRanksGetAll
      },
      currentUser
    } = this.props;
    const { 
      title, classNameTxt
    } = CARD_TITLE_GETTING_CURRENT_USER_PROFILE;
    // isFetchingSkillsGetAll = true
    if(isFetchingSkillsGetAll || isFetchingRanksGetAll){
      return (
        <DefaultLoadingPage 
          title={title}
          classNameTxt={classNameTxt}
        />
      )
    }
    else if (errorMessageSkillsGetAll || errorMessageRanksGetAll){
      return (
        <DefaultErrorPage />
      )
    }
    else if (isFetchingSkillsGetAll === false && isFetchingRanksGetAll === false) {
      console.log('@ final condition, render userEdit: - this.props ', this.props)
      console.log('conditions: ', isGettingCurrentUserById, isFetchingSkillsGetAll, isFetchingRanksGetAll)
      
      const {
        user
      } = DM
      const processedCurrentUser = FormMethods.removeSpaceFromDatabaseEntries(currentUser);
      console.log('processedCurrentUser: ', processedCurrentUser)
      const extractUsername = (id, formValue) => {
        if(formValue){
          const splitFormValue = formValue.split('/').filter(item => item !== '')
          if(id === 'linkedIn'){
            return splitFormValue[2]
          }
          if(id === 'codePen'){
            return splitFormValue[2]
          }
        } else {
          return '';
        }
      }
      
      const initValues = {
        name: processedCurrentUser[user.name],
        city: processedCurrentUser[user.city],
        state: processedCurrentUser[user.state],
        title: processedCurrentUser[user.title],
        employer: processedCurrentUser[user.employer],
        linkGithub: extractUsername('linkedIn', processedCurrentUser[user.linkGithub]),
        linkCodepen: extractUsername('codePen', processedCurrentUser[user.linkCodepen]),
        linkLinkedIn: processedCurrentUser[user.linkLinkedIn],
        linkPortfolioWebsite: processedCurrentUser[user.linkPortfolioWebsite],
        bio: processedCurrentUser[user.bio],
        experience: processedCurrentUser[user.experience],
        rank: processedCurrentUser[user.rank],
        skillsProfessional: processedCurrentUser[user.skillsProfessional].map(skillObj => lookupTableAllSkills[skillObj]),
        skillsSoftware: processedCurrentUser[user.skillsSoftware].map(skillObj => lookupTableAllSkills[skillObj]),
        skillsLanguages: processedCurrentUser[user.skillsLanguages].map(skillObj => lookupTableAllSkills[skillObj])
      }
      // console.log('initValues: ', initValues)
      // skillsProfessional: processedCurrentUser[user.skillsProfessional].map(skillObj => lookupTableAllSkills[skillObj]),
      // skillsSoftware: processedCurrentUser[user.skillsSoftware].map(skillObj => lookupTableAllSkills[skillObj]),
      // skillsLanguages: processedCurrentUser[user.skillsLanguages].map(skillObj => lookupTableAllSkills[skillObj])
      ls(co.cont, so.props, to.user, mo.ebid, this.props)
      return (
        <UserForm 
          {...this.props}
          onSubmit={this.onSubmit}
          content={FORM_HEADING_USER_EDIT}
          initialValues={initValues}
          currentUser={processedCurrentUser}
          // userById={userById}
          allSkills={allSkills}
          lookupTableAllRanks={lookupTableAllRanks}
        />
      )
      // return (
      //   <div>User Edit</div>
      // )
    } else {
      return (
        <div>Waiting</div>
      )
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    auth: state.auth,
    users: state.users,
    skills: state.skills,
    ranks: state.ranks
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({ skillsGetAll, userEditById, userGetById, skillCreateById, ranksGetAll }, dispatch)
}
// getCurrentUserById, 
export default connect( mapStateToProps, mapDispatchToProps)(UserEdit)
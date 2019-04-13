import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
// , SubmissionError
import ReactTags from 'react-tag-autocomplete'
import DateTimePicker from 'react-widgets/lib/DateTimePicker'
import ValidationMethods  from '../../functions/validationMethods'

import { SkillOrCategory } from '../../models/models';
import { validateGitHubUsername, validateCodePenUsername, validateLinkedIn, validatePortfolioURL } from '../../functions/urlValidationMethods'
import { PUBLIC_S3_URL } from '../../standards/publicPaths'

import { SelectUserAvatarModalFormEx } from '../../components/forms/form_selectUserAvatar'

import Modal from '../../components/common/modal/modal';
import DM from '../../standards/dictModel'

import '../../css/react-widgets/react-widgets.css'
import Moment from 'moment'
import momentLocalizer from 'react-widgets-moment';

Moment.locale('en')
momentLocalizer()

const {
  user: {
    name,
    city,
    state,
    title,
    employer,
    linkGithub,
    linkCodepen,
    linkLinkedIn,
    linkPortfolioWebsite,
    // linkResume,
    bio,
    experience,
    rank,
    // skillsProfessional,
    // skillsSoftware,
    // skillsLanguages
  }
} = DM

const SKILLS_PROFESSIONAL = 'addTheseSkillObjsProfessional'
const SKILLS_SOFTWARE = 'addTheseSkillObjsSoftware'
const SKILLS_LANGUAGES = 'addTheseSkillObjsLanguages'

const asyncValidate = (values) => {
  const promiseGitHub = new Promise((resolve, reject) => {
    // console.log('resolve @ promise 1: ')
    resolve(validateGitHubUsername(values.linkGithub))
  })
  const promiseCodePen = new Promise((resolve, reject) => {
    // console.log('resolve @ promise 2: ')
    resolve(validateCodePenUsername(values.linkCodepen))
  })
  return Promise.all([promiseGitHub, promiseCodePen])
    .then(val => {
      if(val[0] === false){
        // console.log('github is false: ')
        throw ({ linkGithub: 'GitHub Username Not Found'})        
      }
      if(val[1] === false){
        // console.log('codepen is false: ')
        throw ({ linkCodepen: 'CodePen Username Not Found'})        
      }
      return val
    })
}

class UserForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      localSkillsForProfessional: this.props.initialValues.skillsProfessional,
      addTheseSkillObjsProfessional: [],
      localSkillsForSoftware: this.props.initialValues.skillsSoftware,
      addTheseSkillObjsSoftware: [],
      localSkillsForLanguages: this.props.initialValues.skillsLanguages,
      addTheseSkillObjsLanguages: [],
      addTheseSkillObjsToDatabase: [],
      removeUserIdFromTheseSkills: [],
      allSkills: this.props.allSkills,
      filterSkills: this.props.allSkills,
      
      showModalUserAvatar: false
    }
  }
  
  handleToggleModalUserAvatar = () => {
    this.setState({ showModalUserAvatar: !this.state.showModalUserAvatar })
  }
  
  updateFilteredArray = () => {
    const {
      localSkillsForProfessional,
      addTheseSkillObjsProfessional,
      localSkillsForSoftware,
      addTheseSkillObjsSoftware,
      localSkillsForLanguages,
      addTheseSkillObjsLanguages,
      allSkills
    } = this.state;
    
    let allSkillsForUser = [];
    if(localSkillsForProfessional.length){
      localSkillsForProfessional.forEach(item => allSkillsForUser.push(item.id))
    }
    if(addTheseSkillObjsProfessional.length){
      addTheseSkillObjsProfessional.forEach(item => allSkillsForUser.push(item.id))
    }
    if(localSkillsForSoftware.length){
      localSkillsForSoftware.forEach(item => allSkillsForUser.push(item.id))
    }
    if(addTheseSkillObjsSoftware.length){
      addTheseSkillObjsSoftware.forEach(item => allSkillsForUser.push(item.id))
    }
    if(localSkillsForLanguages.length){
      localSkillsForLanguages.forEach(item => allSkillsForUser.push(item.id))
    }
    if(addTheseSkillObjsLanguages.length){
      addTheseSkillObjsLanguages.forEach(item => allSkillsForUser.push(item.id))
    }
    // console.log('allSkillsForUser', allSkillsForUser)
    // allSkillsForUser [ "skill.id as string" ]
    let updatedFilterSkills = [ ...allSkills ];
    // filterSkills = [ skillObj{ id: "string" }]
    // filter the updated array so it only contains objects whose ids are NOT in the allSkillsForUser
    updatedFilterSkills = updatedFilterSkills.filter(item => !allSkillsForUser.includes(item.id))
    // console.log('updatedFilterSkills: ', updatedFilterSkills)
    this.setState({filterSkills: updatedFilterSkills})
    // return null;
  }
  
  handleAllSkillAdditions = (tag, string) => {
    if(string === SKILLS_PROFESSIONAL){
      if(!tag.id){
        tag = new SkillOrCategory(tag, this.props.currentUser.userId);
        const addTheseSkillObjsToDatabase = [].concat(this.state.addTheseSkillObjsToDatabase, tag)
        const addTheseSkillObjsProfessional = [].concat(this.state.addTheseSkillObjsProfessional, tag)
        // const filterSkills = do something to filter
        this.setState({ addTheseSkillObjsToDatabase, addTheseSkillObjsProfessional }, () => this.updateFilteredArray())
      } else {
        // this tag exists
        tag._usersWithSkill = [ ...tag._usersWithSkill, this.props.currentUser.userId]
        const addTheseSkillObjsProfessional = [].concat(this.state.addTheseSkillObjsProfessional, tag)
        this.setState({ addTheseSkillObjsProfessional }, () => this.updateFilteredArray())
      }
      
    }
    else if(string === SKILLS_SOFTWARE){
      if(!tag.id){
        // this is a new tag
        tag = new SkillOrCategory(tag, this.props.currentUser.userId);
        const addTheseSkillObjsToDatabase = [].concat(this.state.addTheseSkillObjsToDatabase, tag)
        const addTheseSkillObjsSoftware = [].concat(this.state.addTheseSkillObjsSoftware, tag)
        this.setState({ addTheseSkillObjsToDatabase, addTheseSkillObjsSoftware }, () => this.updateFilteredArray())
      } else {
        // this tag exists
        tag._usersWithSkill = [ ...tag._usersWithSkill, this.props.currentUser.userId]
        const addTheseSkillObjsSoftware = [].concat(this.state.addTheseSkillObjsSoftware, tag)
        this.setState({ addTheseSkillObjsSoftware }, () => this.updateFilteredArray())
      }
    }
    else if(string === SKILLS_LANGUAGES){
      if(!tag.id){
        // this is a new tag
        tag = new SkillOrCategory(tag, this.props.currentUser.userId);
        const addTheseSkillObjsToDatabase = [].concat(this.state.addTheseSkillObjsToDatabase, tag)
        const addTheseSkillObjsLanguages = [].concat(this.state.addTheseSkillObjsLanguages, tag)
        // const filterSkills = do something to filter
        this.setState({ addTheseSkillObjsToDatabase, addTheseSkillObjsLanguages }, () => this.updateFilteredArray())
      } else {
        // this tag exists
        tag._usersWithSkill = [ ...tag._usersWithSkill, this.props.currentUser.userId]
        const addTheseSkillObjsLanguages = [].concat(this.state.addTheseSkillObjsLanguages, tag)
        this.setState({ addTheseSkillObjsLanguages }, () => this.updateFilteredArray())
      }
    }
  }
  
  handleAllSkillDeletions = (i, string) => {
    const {
      addTheseSkillObjsToDatabase,
      addTheseSkillObjsProfessional,
      addTheseSkillObjsSoftware,
      addTheseSkillObjsLanguages
    } = this.state;
    
    // i is index in the array it is in for display
    if(string === SKILLS_PROFESSIONAL){
      // if in addToDatabase, remove
      const updatedAddToDatabase = addTheseSkillObjsToDatabase.filter(item => item.id !== addTheseSkillObjsProfessional[i].id)
      this.setState({ addToDatabase: updatedAddToDatabase}, () => this.updateFilteredArray())
      // remove from addToSkillProfessional
      const removeSkillProfessional = this.state.addTheseSkillObjsProfessional.slice(0)
      removeSkillProfessional.splice(i, 1)
      this.setState({ addTheseSkillObjsProfessional: removeSkillProfessional }, () => this.updateFilteredArray())
    }
    else if(string === SKILLS_SOFTWARE){
      // if in addToDatabase, remove
      const updatedAddToDatabase = addTheseSkillObjsToDatabase.filter(item => item.id !== addTheseSkillObjsSoftware[i].id)
      this.setState({ addToDatabase: updatedAddToDatabase}, () => this.updateFilteredArray())
      // remove from addToSkillSoftware
      const removeSkillSoftware = addTheseSkillObjsSoftware.slice(0)
      removeSkillSoftware.splice(i, 1)
      this.setState({ addTheseSkillObjsSoftware: removeSkillSoftware }, () => this.updateFilteredArray())
    }
    else if(string === SKILLS_LANGUAGES){
      // if in addToDatabase, remove
      const updatedAddToDatabase = addTheseSkillObjsToDatabase.filter(item => item.id !== addTheseSkillObjsLanguages[i].id)
      this.setState({ addToDatabase: updatedAddToDatabase}, () => this.updateFilteredArray())
      // remove from addToSkillLanguages
      const removeSkillLanguages = addTheseSkillObjsLanguages.slice(0)
      removeSkillLanguages.splice(i, 1)
      this.setState({ addTheseSkillObjsLanguages: removeSkillLanguages }, () => this.updateFilteredArray())
    }
  }
  
  handleAdditionSkillsProfessional = (tag) => {
    this.handleAllSkillAdditions(tag, SKILLS_PROFESSIONAL);
  }
  
  handleDeleteSkillsProfessional = (i) => {
    this.handleAllSkillDeletions(i, SKILLS_PROFESSIONAL);
  }
  
  handleAdditionSkillsSoftware = (tag) => {
    this.handleAllSkillAdditions(tag, SKILLS_SOFTWARE);    
  }
  
  handleDeleteSkillsSoftware = (i) => {
    this.handleAllSkillDeletions(i, SKILLS_SOFTWARE);
  }
  
  handleAdditionSkillsLanguages = (tag) => {
    this.handleAllSkillAdditions(tag, SKILLS_LANGUAGES);    
  }
  
  handleDeleteSkillsLanguages = (i) => {
    this.handleAllSkillDeletions(i, SKILLS_LANGUAGES);
  }
  
  handleDeleteCurrentCategory = (stateArray, identifier, index) => {
    // console.log('stateArray: ', stateArray, 'identifier: ', identifier, 'index: ', index, 'this: ', this)
    // state array is a copy of the particular piece of state, so can generically dup it here:
    let dupStateArray = stateArray.slice(0);
    // copy remove array, and add to it the item removing from particular state array
    let dupRemoveUserIdFromTheseSkills = this.state.removeUserIdFromTheseSkills.slice(0);
    dupRemoveUserIdFromTheseSkills.push(dupStateArray.splice(index, 1)[0])
    if(identifier === SKILLS_PROFESSIONAL){
      // set stateProfessional here
      this.setState({
        localSkillsForProfessional: dupStateArray,
        removeUserIdFromTheseSkills: dupRemoveUserIdFromTheseSkills
      }, () => { 
        console.log('state after delete from UI (professional): ', this.state)
        this.updateFilteredArray() 
      })
    }
    else if(identifier === SKILLS_SOFTWARE){
      // set stateSoftware here
      this.setState({
        localSkillsForSoftware: dupStateArray,
        removeUserIdFromTheseSkills: dupRemoveUserIdFromTheseSkills
      }, () => { 
        console.log('state after delete from UI (software): ', this.state)
        this.updateFilteredArray() 
      })
    }
    else if(identifier === SKILLS_LANGUAGES){
      // set stateLanguages here
      this.setState({
        localSkillsForLanguages: dupStateArray,
        removeUserIdFromTheseSkills: dupRemoveUserIdFromTheseSkills
      }, () => { 
        console.log('state after delete from UI (languages): ', this.state)
        this.updateFilteredArray() 
      })
    }
  }
  
  componentDidMount(){
    // need to filter out any existing skills from the filter skills
    this.updateFilteredArray();
  }
  
  onSubmit = (formValues) => {
    // console.log('formValues @ userForm Edit: ', formValues)
    if(formValues.linkGithub !== ''){
      const GITHUB_URL = `https://github.com/`
      formValues.linkGithub = `${GITHUB_URL}${formValues.linkGithub}/`
    }
    if(formValues.linkCodepen !== ''){
      const CODEPEN_URL = `https://codepen.io/`
      formValues.linkCodepen = `${CODEPEN_URL}${formValues.linkCodepen}/`
    }
    const {
      addTheseSkillObjsToDatabase,
      removeUserIdFromTheseSkills,
      addTheseSkillObjsProfessional,
      localSkillsForProfessional,
      addTheseSkillObjsSoftware,
      localSkillsForSoftware,
      addTheseSkillObjsLanguages,
      localSkillsForLanguages
    } = this.state;
    this.props.onSubmit(formValues, addTheseSkillObjsToDatabase, removeUserIdFromTheseSkills, addTheseSkillObjsProfessional, localSkillsForProfessional, addTheseSkillObjsSoftware, localSkillsForSoftware, addTheseSkillObjsLanguages, localSkillsForLanguages)
  }
  
  renderField(field){
    const { meta: {asyncValidating, touched, error, warning }} = field;
    
    const inputStyle = `fc-field-row fc--disp-flex fc--fdir-row width100P ${touched && ((error ? 'input-invalid' : '') || (warning ? 'input-warning' : '') )} ${asyncValidating ? 'async-validating' : ''}`
    const returnErrorJSX = (styleType, message) => {
      return (
        <div className={styleType}>
          <div className="fc--disp-flex fc--fdir-row fc--jCont-fs fs16">
            {touched ? message : ''}
          </div>
        </div>
      )
    }
    
    return(
      <div className='fc-field fc--disp-flex fc--fdir-col fc--jCont-ce width100P'>
        {/* <div className='fc-field-row fc--disp-flex fc--fdir-row width100P'> */}
        <div className={inputStyle}>
          <label className={field.labelStyle} htmlFor={field.name}>{field.label}</label>
          <input 
            {...field.input}
            className={field.inputStyle}
            type={field.type}
            placeholder={field.placeholder}
          />
        </div>
        <div className="fc-field-row-error fc--disp-flex fc--fdir-row fc--jCont-fe width100P">
          { touched && (( error && returnErrorJSX(field.errorStyle, error) ) || ( warning && returnErrorJSX(field.warnStyle, warning) )) }
        </div>
      </div>
    )
  }
  
  onSubmitAvatarSelector = () => {
    console.log('onSubmitAvatarSelector @ form_user')
  }
  
  renderTextArea(field){
    const { meta: { touched, error }} = field;
    const errorInput = `width100P ${touched && error ? 'input-invalid' : ''}`
    // console.log('field @ renderTextArea: ', field)
    return(
      <>
        <div className={errorInput}>
          <textarea
            {...field.input}
            className={field.textAreaStyle}
            placeholder={field.placeholder}
            cols={field.cols}
            rows={field.rows}
          />
        </div>
        <div className="fc-field-row-error fc--disp-flex fc--fdir-row fc--jCont-fe width100P">
          <div className="error fc--disp-flex fc--fdir-row fc--jCont-fs width100P">
            <div className="fc--disp-flex fc--fdir-row fc--jCont-fs fs16">
              {touched ? error : ''}
            </div>
          </div>
        </div>
      </>
    )
  }
  
  returnSkillJSXPerCategory = (stateArray, identifier) => {
    // console.log('stateArray: ', stateArray)
    // stateArray = [];
    let defaultSkillHeading = '';
    if(!stateArray.length){
      // default message
      if(identifier === SKILLS_PROFESSIONAL){
        defaultSkillHeading = 'You have not added any professional skills yet.'
      }
      else if(identifier === SKILLS_SOFTWARE){
        defaultSkillHeading = 'You have not added any software skills yet.'
      }
      else if(identifier === SKILLS_LANGUAGES){
        defaultSkillHeading = 'You have not added any language skills yet.'        
      }
      return (
        <div className="fc-field-row-full fc--disp-flex fc--fdir-col mt70 mb70 pdLR3 ta-cent">
          <h6 className="fw500 fs20 ls12 fcGrey424041">{defaultSkillHeading}</h6>
          <h6 className="fw300 fs14 ls10 fcGrey81 mt20">Search for a skill to add it to your profile.</h6>
          <h6 className="fw300 fs14 ls10 fcGrey81 mt10">If you do not see the skill you are looking for, simply type out the new skill, then hit Tab or Enter to add the skill to the list.</h6>
        </div>
      )
    } else {
      // this is for the map
      let returnSkillJSX = stateArray.map((categoryObj, index) => {
        // console.log('identifier: ', identifier, 'categoryObj: ', categoryObj, 'index: ', index)
        return (
          <li 
            className="fc--disp-flex fc--fdir-row fc--fwrap-no fc--jCont-fe fc--aItem-ce skillItem"
            key={categoryObj.id}
          >
            <h5 className="fw300 fs16 ls10 fcGrey424041 ta-right">{categoryObj.name}</h5>
            <h5 className="fw300 fs18 ls10 fcGrey424041">|</h5>
            <h5 
              className="fw300 fs20 ls12 fcGreenRT"
              onClick={() => this.handleDeleteCurrentCategory(stateArray, identifier, index)}
            >X</h5>
          </li>
        )
      })
      return (
        <>
          <div className="fc-field-row-full fc--disp-flex fc--fdir-row mt20 mb20">
            <ul className="fc--disp-flex fc--fdir-row fc--fwrap-yes fc--jCont-fs mt20 width100P">
              {returnSkillJSX}
            </ul>
          </div>
        </>
      )
    }
  }
  
  returnSkillSections = (skillArray) => {
    // console.log('skillArray', skillArray)
    let skillSectionJSX = skillArray.map(skillCategory => {
      const {
        id,
        headingText,
        labelText,
        // inputName,
        placeholder,
        tags,
        suggestions,
        inputAttributes,
        allowNew,
        autoresize,
        // autofocus,
        minQueryLength,
        maxSuggestionsLength,
        delimiters,
        delimiterChars,
        handleAddition,
        handleDelete,
        stateArray,
        identifier
      } = skillCategory
      return (
        <div key={id} className="fieldsetSkills">
          <div className="grid grid--full">
            <div className="grid-cell">
              <legend>
                <h5 className="fw600 ls12 fcGrey424041">{headingText}</h5>
              </legend>
              <hr className="mt10" />
              <div className="grid grid--1of2 fc--disp-flex fc--fdir-row fc--jCont-ce">
                <div className="grid-cell">
                  <div className="fc-form-input-col width90P">
                    <label htmlFor="" className="fs20 fw300 ls14 fcGrey424041 mt45 mb20">{labelText}</label>
                    <ReactTags
                      tags={tags}
                      suggestions={suggestions}
                      placeholder={placeholder}
                      inputAttributes={inputAttributes}
                      allowNew={allowNew}
                      autoresize={autoresize}
                      // autofocus={autofocus}
                      minQueryLength={minQueryLength}
                      maxSuggestionsLength={maxSuggestionsLength}
                      delimiters={delimiters}
                      delimiterChars={delimiterChars}
                      handleAddition={handleAddition}
                      handleDelete={handleDelete}
                    />
                  </div>
                </div>
                <div className="grid-cell">{this.returnSkillJSXPerCategory(stateArray, identifier)}</div>
              </div>
            </div>
          </div>
        </div>
      )
    })
    return skillSectionJSX;
  }
  
  renderDateTimePicker = (field) => {
    const { meta: { touched, error, warning }, input: { onChange, value }, showTime} = field;
    
    const inputStyle = `fc--disp-flex fc--fdir-row fc--jCont-ce fc--aItem-ce width100P ${touched && ((error ? 'input-invalid' : '') || (warning ? 'input-warning' : '') )}`
    const returnErrorJSX = (styleType, message) => {
      return (
        <div className={styleType}>
          <div className="fc--disp-flex fc--fdir-row fc--jCont-fs fs16">
            {touched ? message : ''}
          </div>
        </div>
      )
    }
    return (
      <div className='dateField fc--disp-flex fc--fdir-col fc--jCont-ce fc--aItem-ce width100P'>
        <div className={inputStyle}>
          <label className="width50P ta-right">When Did you Start Programming?</label>
          <div className="datePicker width50P">
            <DateTimePicker
              onChange={onChange}
              format="DD MMM YYYY"
              time={showTime}
              value={!value ? null : new Date(value)}
              max={new Date()}
            />
          </div>
        </div>
        <div className="fc-field-row-error fc--disp-flex fc--fdir-row fc--jCont-fe width100P">
          { touched && (( error && returnErrorJSX(field.errorStyle, error) ) || ( warning && returnErrorJSX(field.warnStyle, warning) )) }
        </div>
      </div>
      
    )
  }
  
  render(){
    const {
      content,
      currentUser,
      // auth: { currentUser },
      lookupTableAllRanks
    } = this.props;
    
    // console.log('@formUser: this.props (RIGHT AT RENDER())', this.props)
    
    const {
      localSkillsForProfessional,
      addTheseSkillObjsProfessional,
      localSkillsForSoftware,
      addTheseSkillObjsSoftware,
      localSkillsForLanguages,
      addTheseSkillObjsLanguages,
      filterSkills
    } = this.state
    
    const skillArray = [
      {
        id: 'skillsProfessional',
        headingText: 'Professional Skills',
        labelText: 'Search For Professional Skills',
        inputName: 'skillsProfessional',
        placeholder: 'Select a Professional Skill',
        tags: addTheseSkillObjsProfessional,
        suggestions: filterSkills,
        allowNew: true,
        autoresize: true,
        autofocus: false,
        minQueryLength: 2,
        maxSuggestionsLength: 4,
        delimiters: [9, 13],
        delimiterChars: [','],
        handleAddition: this.handleAdditionSkillsProfessional,
        handleDelete: this.handleDeleteSkillsProfessional,
        stateArray: localSkillsForProfessional,
        // identifier: arrayIdentifier[addTheseSkillObjsProfessional]
        identifier: SKILLS_PROFESSIONAL
      },
      {
        id: 'skillsSoftware',
        headingText: 'Software Skills',
        labelText: 'Search For Software Skills',
        inputName: 'skillsSoftware',
        placeholder: 'Select a Software Skill',
        tags: addTheseSkillObjsSoftware,
        suggestions: filterSkills,
        allowNew: true,
        autoresize: true,
        autofocus: false,
        minQueryLength: 2,
        maxSuggestionsLength: 4,
        delimiters: [9, 13],
        delimiterChars: [','],
        handleAddition: this.handleAdditionSkillsSoftware,
        handleDelete: this.handleDeleteSkillsSoftware,
        stateArray: localSkillsForSoftware,
        identifier: SKILLS_SOFTWARE
      },
      {
        id: 'skillsLanguages',
        headingText: 'Language Skills',
        labelText: 'Search For Language Skills',
        inputName: 'skillsLanguages',
        placeholder: 'Select a Language Skill',
        tags: addTheseSkillObjsLanguages,
        suggestions: filterSkills,
        allowNew: true,
        autoresize: true,
        autofocus: false,
        minQueryLength: 2,
        maxSuggestionsLength: 4,
        delimiters: [9, 13],
        delimiterChars: [','],
        handleAddition: this.handleAdditionSkillsLanguages,
        handleDelete: this.handleDeleteSkillsLanguages,
        stateArray: localSkillsForLanguages,
        identifier: SKILLS_LANGUAGES
      }
    ]
    
    const CURR_USER_ID = `${currentUser.userId}/`;
    const AVATAR_FOLDER = `avatar/`;
    const USER_AVATAR = `${currentUser.avatar}`
    
    const AVATAR_PATH_FINAL = `${PUBLIC_S3_URL}${CURR_USER_ID}${AVATAR_FOLDER}${USER_AVATAR}`
    
    // console.log('this.props: form_user: ', this.props)
    
    return(
      <article className="card" style={this.props.cardStyle}>
        <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
          <div className="grid grid--1of4">
            <div className="grid-cell">
              {/* this would come from the setup/avatardefault */}
              <div className="fc--fdir-col fc--jCont-ce ta-cent">
                {/* <div className="rankCont">
                  <label className="rank fs14 fw300 ls12 fcGrey424041">
                    {lookupTableAllRanks[currentUser[rank]].rank}
                  </label>
                </div> */} 
                <img className="avatarL" name="avatar" src={AVATAR_PATH_FINAL} alt=""/>
                <div className="caption">
                  <label id="profile-picture">
                    <span 
                      onClick={() => this.handleToggleModalUserAvatar()}
                      className="fs20 fw500 ls12"
                    >Add Profile Picture</span>
                    {/* <input id="file" type="file" style={{visibility: 'hidden'}}/> */}
                    {
                      this.state.showModalUserAvatar &&
                      
                      <Modal 
                        onCloseRequest={() => this.handleToggleModalUserAvatar()}
                        content={
                          <SelectUserAvatarModalFormEx
                            onSubmit={this.onSubmitAvatarSelector}
                          />
                        }
                      />
                    }
                  </label>
                </div>
              </div>
            </div>
            <div className="grid-cell">  
              <fieldset className="fc--disp-flex fc--fdir-col fc--aItem-ce">
                <legend>
                  <h5 className="fw600 ls12 fcGrey424041">Basic Information</h5>
                </legend>
                <hr className="mt10" />
                <div className="fc-fieldset">
                  <Field
                    label="Name:"
                    name={name}
                    type="text" 
                    placeholder="Your First and Last Name"
                    component={this.renderField}
                    labelStyle="width20P ta-right"
                    inputStyle="width80P"
                    errorStyle="error fc--disp-flex fc--fdir-row fc--jCont-fs width80P"
                    warnStyle="warn fc--disp-flex fc--fdir-row fc--jCont-fs width80P"
                  />
                  <Field
                    label="City:"
                    name={city}
                    type="text" 
                    placeholder="Your City"
                    component={this.renderField}
                    labelStyle="width20P ta-right"
                    inputStyle="width80P"
                    errorStyle="error fc--disp-flex fc--fdir-row fc--jCont-fs width80P"
                  />
                  <Field
                    label="State:"
                    name={state}
                    type="text" 
                    placeholder="Your State"
                    component={this.renderField}
                    labelStyle="width20P ta-right"
                    inputStyle="width80P"
                    errorStyle="error fc--disp-flex fc--fdir-row fc--jCont-fs width80P"
                  />
                </div>
              </fieldset>
            </div>
          </div>
            {/* Professional Status */}
          <div className="grid grid--full">
            <div className="grid-cell">
              <fieldset className="fc--disp-flex fc--fdir-col fc--aItem-ce">
                <legend>
                  <h5 className="fw600 ls12 fcGrey424041">Professional Status</h5>
                </legend>
                <hr className="mt10" />
                <div className="fc-fieldset">
                  <Field 
                    label="Job Title:"
                    name={title}
                    type="text" 
                    placeholder="Your Current Job Title"
                    component={this.renderField}
                    labelStyle="width15P ta-right"
                    inputStyle="width85P"
                    errorStyle="error fc--disp-flex fc--fdir-row fc--jCont-fs width85P"
                  />
                  <Field 
                    label="Employer:"
                    name={employer}
                    type="text" 
                    placeholder="Your Current Employer"
                    component={this.renderField}
                    labelStyle="width15P"
                    inputStyle="width85P"
                    errorStyle="error fc--disp-flex fc--fdir-row fc--jCont-fs width85P"
                  />  
                </div>
              </fieldset>
            </div>
          </div>
          {/* Links */}
          <div className="grid grid--full">
            <div className="grid-cell">
              <fieldset className="fc--disp-flex fc--fdir-col fc--aItem-ce">
                <legend>
                  <h5 className="fw600 ls12 fcGrey424041">Links</h5>
                </legend>
                <hr className="mt10" />
                <div className="fc-fieldset">
                    <Field 
                      label="GitHub:"
                      name={linkGithub}
                      type="text"                               
                      placeholder="Your GitHub Username"
                      component={this.renderField}
                      labelStyle="width15P"
                      inputStyle="width85P"
                      errorStyle="error fc--disp-flex fc--fdir-row fc--jCont-fs width85P"
                      warnStyle="warn fc--disp-flex fc--fdir-row fc--jCont-fs width85P"
                    />
                    <Field 
                      label="CodePen:"
                      name={linkCodepen}
                      type="text"                                
                      placeholder="Your CodePen Username"
                      component={this.renderField}
                      labelStyle="width15P"
                      inputStyle="width85P"
                      errorStyle="error fc--disp-flex fc--fdir-row fc--jCont-fs width85P"
                      warnStyle="warn fc--disp-flex fc--fdir-row fc--jCont-fs width85P"
                    />
                    <Field 
                      label="LinkedIn:"
                      name={linkLinkedIn}
                      type="text"
                      placeholder="Your LinkedIn URL"
                      component={this.renderField}
                      labelStyle="width15P"
                      inputStyle="width85P"
                      errorStyle="error fc--disp-flex fc--fdir-row fc--jCont-fs width85P"
                      warnStyle="warn fc--disp-flex fc--fdir-row fc--jCont-fs width85P"
                    />
                    <Field 
                      label="Portfolio:"
                      name={linkPortfolioWebsite}
                      type="text"
                      placeholder="Your Portfolio URL"
                      component={this.renderField}
                      labelStyle="width15P"
                      inputStyle="width85P"
                      errorStyle="error fc--disp-flex fc--fdir-row fc--jCont-fs width85P"
                      warnStyle="warn fc--disp-flex fc--fdir-row fc--jCont-fs width85P"
                    /> 
                    {/* <Field 
                      label="Resume:"
                      name={linkResume}
                      type="text"
                      placeholder="Upload your Resume"
                      component={this.renderField}
                      labelStyle="width15P"
                      inputStyle="width85P"
                      errorStyle="error fc--disp-flex fc--fdir-row fc--jCont-fs width85P"
                      warnStyle="warn fc--disp-flex fc--fdir-row fc--jCont-fs width85P"
                    /> */}
                  {/* 
                  <div className="fc-form-input">
                    <label htmlFor="name">Resume</label>
                    <div className="fc-form-input-with-button">
                      <input type="text" name="title" placeholder="Your Resume" />
                      <button className="btn btnFillClrSchGreen00b371">Upload</button>
                    </div>
                  </div> */}
                </div>
              </fieldset> 
            </div>
          </div>
          {/* About */}
          <div className="grid grid--full">
            <div className="grid-cell">
              <fieldset>
                <legend>
                  <h5 className="fw600 ls12 fcGrey424041">About</h5>
                </legend>
                <hr className="mt10" />
                <div className="grid grid--1of2 mt30">
                  <div className="grid-cell">
                    {/* <textarea name="bio" cols="30" rows="10" placeholder="Write your about statement here"></textarea> */}
                    {/* <Field */}
                    <Field
                      name={bio}
                      cols={"30"}
                      rows={"10"} 
                      component={this.renderTextArea}
                      placeholder="Write Your About Statement Here"
                      textAreaStyle=""
                    />
                  </div>
                  <div className="grid-cell fc--disp-flex fc--fdir-col fc--jCont-ce">
                    <div className="fc-fieldset">
                      <Field
                        // name="dob"
                        name={experience}
                        showTime={false}
                        component={this.renderDateTimePicker}
                        // containerClassName=""
                      />
                    </div>
                  </div>
                </div>
              </fieldset>
            </div>
          </div>
          {/* This function renders the three skill inputs */}
          {this.returnSkillSections(skillArray)}
          <hr className="modalHR mt80" />
            <div className="ta-cent">
              {/* {
                this.props.anyTouched && !this.props.invalid &&
              } */}
                
                <button className="btn btnFillClrSchGreen00b371 pdTB2LR8 fs20 fw500 ls12 mt30">{content.buttonText}</button>
            </div>
        </form>
      </article>
    )
  }
}

export default reduxForm({
  validate: validate,
  asyncValidate: asyncValidate,
  warn: warn,
  form: 'UserForm'
})(UserForm)

// name, - required
// city, - required
// state, - required
// title, - required
// employer, - required
// linkGithub, - suggested
// linkCodepen, - suggested
// linkLinkedIn, - suggested
// linkPortfolioWebsite, - suggested
// linkResume, - suggested
// bio, - required
// experience, - required

function validate(values){
  const errors = {};
  if(!values.name){ errors.name = 'Please Enter Your Full Name'}
  if(values.name){
    if(!ValidationMethods.checkForFullName(values.name)){
      errors.name = 'Please Enter a Valid First and Last Name'
    }
    if(ValidationMethods.checkForFullName(values.name)){
      const charMin = 2;
      if(!ValidationMethods.isEachWordOverCharLimit(values.name.split(' '), charMin)){
        errors.name = `All Name Values Must Have at Least ${charMin} Characters`
      }
    }
  }
  // city
  if(!values.city){ errors.city = 'Please Enter the Name of the City in Which you Reside'}
  if(values.city){
    const cityNameCharLimit = 2;
    if(!ValidationMethods.isWordOverCharLimit(values.city, cityNameCharLimit)){
      errors.city = `All City Names Must Have at Least ${cityNameCharLimit} Characters`
    }
  }
  // state - come back to this
  
  // title
  if(!values.title){ errors.title = 'Please Enter Your Current Job Title'};
  if(values.title){
    const titleCharLimit = 2;
    if(!ValidationMethods.isWordOverCharLimit(values.title, titleCharLimit)){
      errors.title = `All Titles Must have at Least ${titleCharLimit} Characters`;
    }
  }
  if(!values.employer){ errors.employer = 'Please Enter the Name of Your Current Employer' }
  if(values.employer){
    const employerCharMin = 2;
    if(!ValidationMethods.isWordOverCharLimit(values.employer, employerCharMin)){
      errors.employer = `All Employer Names Must have at Least ${employerCharMin} Characters`;
    }
  }
  if(!values.bio){ errors.bio = 'Please Enter a Short Description about Yourself'}
  if(values.bio){
    const bioWordLimit = 2;
    if(!ValidationMethods.doesContainNumberOfWords(values.bio, bioWordLimit)){
      errors.bio = `All Bios Must Have at Least ${bioWordLimit} words`
    }
  }
  
  if(!values.experience){ errors.experience = 'Please Enter a Date'}
  
  return errors;
}

function warn(values){
  const warnings = {};
  // github - linkGithub
  if(!values.linkGithub){ warnings.linkGithub = 'Please Enter your Github Username' }
  // codepen
  if(!values.linkCodepen){ warnings.linkCodepen = 'Please Enter your Codepen Username'}
  // linkedIn
  if(!values.linkLinkedIn){ warnings.linkLinkedIn = 'Please Enter your LinkedIn URL'}
  // then run the validation
  if(values.linkLinkedIn){
    const validLinkedInURL = 'https://www.linkedin.com/in/<username>'
    const validation = validateLinkedIn(values.linkLinkedIn);
    // console.log('validation @ linkLinkedIn: ', validation)
    if(!validation.protocol || !validation.hostname || !validation.pathname){ warnings.linkLinkedIn = `The URL provided does not match:  ${validLinkedInURL}`}
  }
  
  // portfolio
  if(!values.linkPortfolioWebsite){ warnings.linkPortfolioWebsite = 'Please Enter your Portfolio Website URL'}
  if(values.linkPortfolioWebsite){
    const validation = validatePortfolioURL(values.linkPortfolioWebsite);
    // console.log('validation @ portfolio: ', validation)
    if(!validation.protocol || !validation.hostname){
      warnings.linkPortfolioWebsite = 'Valid Website Urls should match: http://www.website.com';
    }
  }
  
  // resume
  if(!values.linkResume){ warnings.linkResume = 'Please Upload a Current Resume (pdf)'}
  
  return warnings;
}
import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';

import ReactTags from 'react-tag-autocomplete'

import { SkillOrCategory } from '../../models/models';

import Modal from '../../components/common/modal/modal';
import DM from '../../standards/dictModel'

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
    linkResume,
    bio,
    experience,
    skillsProfessional,
    skillsSoftware,
    skillsLanguages
  }
} = DM

const SKILLS_PROFESSIONAL = 'skillsProfessional'
const SKILLS_SOFTWARE = 'skillsSoftware'
const SKILLS_LANGUAGES = 'skillsLanguage'

class UserForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      skillsProfessional: this.props.currentUser.skillsProfessional,
      addToSkillsProfessional: [],
      skillsSoftware: this.props.currentUser.skillsSoftware,
      addToSkillsSoftware: [],
      skillsLanguages: this.props.currentUser.skillsLanguages,
      addToSkillsLanguages: [],
      allSkills: this.props.allSkills,
      filterSkills: this.props.allSkills,
      addToDatabase: [],
      
      showModalUserAvatar: false
    }
  }
  
  handleToggleModalUserAvatar = () => {
    this.setState({ showModalUserAvatar: !this.state.showModalUserAvatar })
  }
  
  // handleDelete (i) {
  //   const tags = this.state.tags.slice(0)
  //   tags.splice(i, 1)
  //   this.setState({ tags })
  // }
  
  // handleAddition (tag) {
  //   const tags = [].concat(this.state.tags, tag)
  //   this.setState({ tags })
  // }
  
  updateFilteredArray = () => {
    console.log('this.state: ', this.state)
    const {
      skillsProfessional,
      addToSkillsProfessional,
      skillsSoftware,
      addToSkillsSoftware,
      skillsLanguages,
      addToSkillsLanguages,
      allSkills
    } = this.state;
    
    let allSkillsForUser = [];
    if(skillsProfessional.length){
      skillsProfessional.forEach(item => allSkillsForUser.push(item.id))
    }
    if(addToSkillsProfessional.length){
      addToSkillsProfessional.forEach(item => allSkillsForUser.push(item.id))
    }
    if(skillsSoftware.length){
      skillsSoftware.forEach(item => allSkillsForUser.push(item.id))
    }
    if(addToSkillsSoftware.length){
      addToSkillsSoftware.forEach(item => allSkillsForUser.push(item.id))
    }
    if(skillsLanguages.length){
      skillsLanguages.forEach(item => allSkillsForUser.push(item.id))
    }
    if(addToSkillsLanguages.length){
      addToSkillsLanguages.forEach(item => allSkillsForUser.push(item.id))
    }
    console.log('allSkillsForUser', allSkillsForUser)
    // allSkillsForUser [ "skill.id as string" ]
    let updatedFilterSkills = [ ...allSkills ];
    // filterSkills = [ skillObj{ id: "string" }]
    // filter the updated array so it only contains objects whose ids are NOT in the allSkillsForUser
    updatedFilterSkills = updatedFilterSkills.filter(item => !allSkillsForUser.includes(item.id))
    console.log('updatedFilterSkills: ', updatedFilterSkills)
    this.setState({filterSkills: updatedFilterSkills})
    // return null;
  }
  
  handleAllSkillAdditions = (tag, string) => {
    if(string === SKILLS_PROFESSIONAL){
      if(!tag.id){
        // this is a new tag
        tag = new SkillOrCategory(tag, this.props.currentUser.userId);
        const addToDatabase = [].concat(this.state.addToDatabase, tag)
        const addToSkillsProfessional = [].concat(this.state.addToSkillsProfessional, tag)
        // const filterSkills = do something to filter
        this.setState({ addToDatabase, addToSkillsProfessional }, () => this.updateFilteredArray())
        // this.setState({ addToDatabase, addToSkillsProfessional }, this.updateFilteredArray)
        // this.updateFilteredArray();
      } else {
        // this tag exists
        tag._usersWithSkill = [ ...tag._usersWithSkill, this.props.currentUser.userId]
        const addToSkillsProfessional = [].concat(this.state.addToSkillsProfessional, tag)
        this.setState({ addToSkillsProfessional }, () => this.updateFilteredArray())
        // this.setState({ addToSkillsProfessional }, this.updateFilteredArray)
        // this.updateFilteredArray();
      }
      
    }
    else if(string === SKILLS_SOFTWARE){
      if(!tag.id){
        // this is a new tag
        tag = new SkillOrCategory(tag, this.props.currentUser.userId);
        const addToDatabase = [].concat(this.state.addToDatabase, tag)
        const addToSkillsSoftware = [].concat(this.state.addToSkillsSoftware, tag)
        this.setState({ addToDatabase, addToSkillsSoftware }, () => this.updateFilteredArray())
      } else {
        // this tag exists
        tag._usersWithSkill = [ ...tag._usersWithSkill, this.props.currentUser.userId]
        const addToSkillsSoftware = [].concat(this.state.addToSkillsSoftware, tag)
        this.setState({ addToSkillsSoftware }, () => this.updateFilteredArray())
      }
    }
    else if(string === SKILLS_LANGUAGES){
      if(!tag.id){
        // this is a new tag
        tag = new SkillOrCategory(tag, this.props.currentUser.userId);
        const addToDatabase = [].concat(this.state.addToDatabase, tag)
        const addToSkillsLanguages = [].concat(this.state.addToSkillsLanguages, tag)
        // const filterSkills = do something to filter
        this.setState({ addToDatabase, addToSkillsLanguages }, () => this.updateFilteredArray())
      } else {
        // this tag exists
        tag._usersWithSkill = [ ...tag._usersWithSkill, this.props.currentUser.userId]
        const addToSkillsLanguages = [].concat(this.state.addToSkillsLanguages, tag)
        this.setState({ addToSkillsLanguages }, () => this.updateFilteredArray())
      }
    }
  }
  
  handleAllSkillDeletions = (i, string) => {
    const {
      addToDatabase,
      addToSkillsProfessional,
      addToSkillsSoftware,
      addToSkillsLanguages
    } = this.state;
    
    // i is index in the array it is in for display
    if(string === SKILLS_PROFESSIONAL){
      // if in addToDatabase, remove
      const updatedAddToDatabase = addToDatabase.filter(item => item.id !== addToSkillsProfessional[i].id)
      this.setState({ addToDatabase: updatedAddToDatabase}, () => this.updateFilteredArray())
      // remove from addToSkillProfessional
      const removeSkillProfessional = this.state.addToSkillsProfessional.slice(0)
      removeSkillProfessional.splice(i, 1)
      this.setState({ addToSkillsProfessional: removeSkillProfessional }, () => this.updateFilteredArray())
    }
    else if(string === SKILLS_SOFTWARE){
      // if in addToDatabase, remove
      const updatedAddToDatabase = addToDatabase.filter(item => item.id !== addToSkillsSoftware[i].id)
      this.setState({ addToDatabase: updatedAddToDatabase}, () => this.updateFilteredArray())
      // remove from addToSkillSoftware
      const removeSkillSoftware = addToSkillsSoftware.slice(0)
      removeSkillSoftware.splice(i, 1)
      this.setState({ addToSkillsSoftware: removeSkillSoftware }, () => this.updateFilteredArray())
    }
    else if(string === SKILLS_LANGUAGES){
      // if in addToDatabase, remove
      const updatedAddToDatabase = addToDatabase.filter(item => item.id !== addToSkillsLanguages[i].id)
      this.setState({ addToDatabase: updatedAddToDatabase}, () => this.updateFilteredArray())
      // remove from addToSkillLanguages
      const removeSkillLanguages = addToSkillsLanguages.slice(0)
      removeSkillLanguages.splice(i, 1)
      this.setState({ addToSkillsLanguages: removeSkillLanguages }, () => this.updateFilteredArray())
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
  
  onSubmit = formValues => {
    // console.log('formValues @ userForm Edit: ', formValues)
    this.props.onSubmit(formValues)
  }
  
  renderField(field){
    const { meta: { touched, error }} = field;
    const errorInput = `fc-field-row fc--disp-flex fc--fdir-row width100P ${touched && error ? 'input-invalid' : ''}`
    return(
      <div className='fc-field fc--disp-flex fc--fdir-col fc--jCont-ce width100P'>
        {/* <div className='fc-field-row fc--disp-flex fc--fdir-row width100P'> */}
        <div className={errorInput}>
          <label className={field.labelStyle} htmlFor={field.name}>{field.label}</label>
          <input 
            {...field.input}
            className={field.inputStyle}
            type={field.type}
            placeholder={field.placeholder}
          />
        </div>
        <div className="fc-field-row-error fc--disp-flex fc--fdir-row fc--jCont-fe width100P">
          <div className="error fc--disp-flex fc--fdir-row fc--jCont-fs width90P">
            <div className="fc--disp-flex fc--fdir-row fc--jCont-fs fs16">
              {touched ? error : ''}
            </div>
          </div>
        </div>
      </div>
    )
  }
  
  renderTextArea(field){
    const { meta: { touched, error }} = field;
    const errorInput = `width100P ${touched && error ? 'input-invalid' : ''}`
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
          <div className="error fc--disp-flex fc--fdir-row fc--jCont-fs width90P">
            <div className="fc--disp-flex fc--fdir-row fc--jCont-fs fs16">
              {touched ? error : ''}
            </div>
          </div>
        </div>
      </>
    )
  }
  
  returnSkillSections = (skillArray) => {
    console.log('skillArray', skillArray)
    let skillSectionJSX = skillArray.map(skillCategory => {
      const {
        id,
        headingText,
        labelText,
        inputName,
        placeholder,
        tags,
        suggestions,
        inputAttributes,
        allowNew,
        autoresize,
        autofocus,
        minQueryLength,
        maxSuggestionsLength,
        delimiters,
        delimiterChars,
        handleAddition,
        handleDelete,
      } = skillCategory
      // console.log('skillCategory: ', skillCategory)
      return (
        <fieldset className="fieldsetSkills">
          <div className="grid grid--full">
            <div className="grid-cell">
              <legend>
                <h5 className="fw700 ls14 ttup fcGrey424041">{headingText}</h5>
              </legend>
              <hr className="mt10" />
              <div className="grid grid--1of2">
                <div className="grid-cell">
                  <div className="fc-form-input-col">
                    <label htmlFor="" className="fs24 fw300 ls14 fcGrey424041 mt45">{labelText}</label>
                    {/* <input id={id} className="mt20" type="search" name={inputName} placeholder={placeholder}/> */}
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
                    {/* <pre><code>{JSON.stringify(this.state.tags, null, 2)}</code></pre> */}
                  </div>
                </div>
                <div className="grid-cell">{}</div>
              </div>
            </div>
          </div>
        </fieldset>
      )
    })
    // console.log('skillSectionJSX: ', skillSectionJSX)
    return skillSectionJSX;
  }
  
  render(){
    const {
      content,
      currentUser,
    } = this.props;
    
    const {
      skillsProfessional,
      skillsToAddProfessional,
      skillsSoftware,
      skillsLanguages,
      filterSkills
    } = this.state
    
    const skillArray = [
      {
        id: 'skillsProfessional',
        headingText: 'Professional Skills',
        labelText: 'Search For Professional Skills',
        inputName: 'skillsProfessional',
        placeholder: 'Select a Professional Skill',
        tags: this.state.addToSkillsProfessional,
        suggestions: filterSkills,
        allowNew: true,
        autoresize: true,
        autofocus: false,
        minQueryLength: 2,
        maxSuggestionsLength: 4,
        delimiters: [9, 13],
        delimiterChars: [','],
        handleAddition: this.handleAdditionSkillsProfessional,
        handleDelete: this.handleDeleteSkillsProfessional
      },
      {
        id: 'skillsSoftware',
        headingText: 'Software Skills',
        labelText: 'Search For Software Skills',
        inputName: 'skillsSoftware',
        placeholder: 'Select a Software Skill',
        tags: this.state.addToSkillsSoftware,
        suggestions: filterSkills,
        allowNew: true,
        autoresize: true,
        autofocus: false,
        minQueryLength: 2,
        maxSuggestionsLength: 4,
        delimiters: [9, 13],
        delimiterChars: [','],
        handleAddition: this.handleAdditionSkillsSoftware,
        handleDelete: this.handleDeleteSkillsSoftware
      },
      {
        id: 'skillsLanguages',
        headingText: 'Language Skills',
        labelText: 'Search For Language Skills',
        inputName: 'skillsLanguages',
        placeholder: 'Select a Language Skill',
        tags: this.state.addToSkillsLanguages,
        suggestions: filterSkills,
        allowNew: true,
        autoresize: true,
        autofocus: false,
        minQueryLength: 2,
        maxSuggestionsLength: 4,
        delimiters: [9, 13],
        delimiterChars: [','],
        handleAddition: this.handleAdditionSkillsLanguages,
        handleDelete: this.handleDeleteSkillsLanguages
      }
    ]
    
    // function getNoSkillMessage(skillType){
    //   let titleString = ''
    //   if(skillType === STRING_OBJ.professional || skillType === STRING_OBJ.software){
    //     titleString = `You have not added any ${skillType} skills yet.`
    //   }
    //   else if(skillType === STRING_OBJ.language){
    //     titleString = `You have not added any ${skillType}s yet.`
    //   }
    //   return (
    //     <div className="fc-noSkillMessage">
    //       <h5 className="fw600 ls14 fcGrey424041">{titleString}</h5>
    //       <br />
    //       <p className="fs18 fw300 ls10 fcGrey81 mt15 ta-cent">
    //         Search for a skill to add it to your profile.
    //         <br /><br />
    //         If you do not see the skill you are looking for simply hit enter to add to the list.
    //       </p>
    //     </div>
    //   )
    // }
    // console.log('this.props @ userForm: ', this.props)
    
    // https://s3-us-west-2.amazonaws.com/
    // recursivethinking-rct-user-assets-us-west-2-sethborne-gmail-com/
    // 2392a91b-bf90-4569-b2f1-9d81e8a845c1/
    // avatar/
    // avatar_default.png
    
    const S3_PATH = 'https://s3-us-west-2.amazonaws.com/';
    const S3_BUCKET = 'recursivethinking-rct-user-assets-us-west-2-sethborne-gmail-com/';
    const CURR_USER_ID = `${currentUser.userId}/`;
    const AVATAR_FOLDER = `avatar/`;
    const USER_AVATAR = `${currentUser.avatar}`
    
    const AVATAR_PATH_FINAL = `${S3_PATH}${S3_BUCKET}${CURR_USER_ID}${AVATAR_FOLDER}${USER_AVATAR}`
    
    console.log('===============================')
    console.log('@ formUser this.props: ', this.props, 'this.state: ', this.state)
    console.log('right before return in form_user')
    
    return(
      <section style={this.props.sectionStyle}>
        <article className="card" style={this.props.cardStyle}>
          <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
            <div className="grid grid--1of4">
              <div className="grid-cell">
                {/* this would come from the setup/avatardefault */}
                <div className="fc--fdir-col fc--jCont-ce ta-cent">
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
                      labelStyle="width20P"
                      inputStyle="width80P"
                    />
                    <Field
                      label="City:"
                      name={city}
                      type="text" 
                      placeholder="Your City"
                      component={this.renderField}
                      labelStyle="width20P"
                      inputStyle="width80P"
                    />
                    <Field
                      label="State:"
                      name={state}
                      type="text" 
                      placeholder="Your State"
                      component={this.renderField}
                      labelStyle="width20P"
                      inputStyle="width80P"
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
                      labelStyle="width15P"
                      inputStyle="width85P"
                    />
                    <Field 
                      label="Employer:"
                      name={employer}
                      type="text" 
                      placeholder="Your Current Employer"
                      component={this.renderField}
                      labelStyle="width15P"
                      inputStyle="width85P"
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
                        placeholder="Your GitHub URL"
                        component={this.renderField}
                        labelStyle="width15P"
                        inputStyle="width85P"
                      />
                      <Field 
                        label="CodePen:"
                        name={linkCodepen}
                        type="text"                                
                        placeholder="Your CodePen URL"
                        component={this.renderField}
                        labelStyle="width15P"
                        inputStyle="width85P"
                      />
                      <Field 
                        label="LinkedIn:"
                        name={linkLinkedIn}
                        type="text"
                        placeholder="Your LinkedIn URL"
                        component={this.renderField}
                        labelStyle="width15P"
                        inputStyle="width85P"
                      />
                      <Field 
                        label="Portfolio:"
                        name={linkPortfolioWebsite}
                        type="text"
                        placeholder="Your Portfolio URL"
                        component={this.renderField}
                        labelStyle="width15P"
                        inputStyle="width85P"
                      /> 
                      <Field 
                        label="Resume:"
                        name={linkResume}
                        type="text"
                        placeholder="Upload your Resume"
                        component={this.renderField}
                        labelStyle="width15P"
                        inputStyle="width85P"
                      />
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
                          label="When Did you Start Programming?"
                          name={experience}
                          type="date"                                  
                          // placeholder="Enter Date"
                          component={this.renderField}
                          labelStyle="width65P"
                          inputStyle="width35P"
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
      </section> 
    )
  }
}

export default reduxForm({
  validate: validate,
  form: 'UserForm'
})(UserForm)

function validate(values){
  const errors = {};
  
  return errors;
}
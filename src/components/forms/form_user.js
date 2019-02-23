import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';

import { PATH_FOR_IMAGES } from '../../standards/publicPaths'

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
    experience
  }
} = DM
class UserForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      avatar: `${PATH_FOR_IMAGES}avatar1.png`,
    }
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
  
  render(){
    const STRING_OBJ = {
      professional: 'professional',
      software: 'software',
      language: 'language'
    }
    
    let allProfessionalSkills = returnSkillsArray(STRING_OBJ.professional);
    let allSoftwareSkills = returnSkillsArray(STRING_OBJ.software);
    let allLanguageSkills = returnSkillsArray(STRING_OBJ.language);
    
    function returnSkillsArray(type) {
      // is this an api call?
      let skillArray = [];
      if(type === STRING_OBJ.professional){
        skillArray = getArrayOfSkills();
        if(skillArray.length === 0){
          return getNoSkillMessage(STRING_OBJ.professional)
        }
      }
      else if(type === STRING_OBJ.software){
        skillArray = getArrayOfSkills();
        if(skillArray.length === 0){
          return getNoSkillMessage(STRING_OBJ.software)
        }
      }
      else if(type === STRING_OBJ.language){
        skillArray = getArrayOfSkills();
        if(skillArray.length === 0){
          return getNoSkillMessage(STRING_OBJ.language)
        }
      }
    }
    
    function getArrayOfSkills(type){
      let array = []
      return array;
    }
    
    function getNoSkillMessage(skillType){
      let titleString = ''
      if(skillType === STRING_OBJ.professional || skillType === STRING_OBJ.software){
        titleString = `You have not added any ${skillType} skills yet.`
      }
      else if(skillType === STRING_OBJ.language){
        titleString = `You have not added any ${skillType}s yet.`
      }
      return (
        <div className="fc-noSkillMessage">
          <h5 className="fw600 ls14 fcGrey424041">{titleString}</h5>
          <br />
          <p className="fs18 fw300 ls10 fcGrey81 mt15 ta-cent">
            Search for a skill to add it to your profile.
            <br /><br />
            If you do not see the skill you are looking for simply hit enter to add to the list.
          </p>
        </div>
      )
    }
    console.log('this.props @ userForm: ', this.props)
    return(
      <section style={this.props.sectionStyle}>
        <article className="card" style={this.props.cardStyle}>
          <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
            <div className="grid grid--1of4">
              <div className="grid-cell">
                {/* this would come from the setup/avatardefault */}
                <div className="fc--fdir-col fc--jCont-ce">
                  <img className="avatarL" name="avatar" src={this.state.avatar} alt=""/>
                  <div className="caption ta-cent">
                    <label id="profile-picture">
                      <span className="fs20 fw500 ls12 ">Add Profile Picture</span>
                      {/* style={{visibility: 'hidden'}}  */}
                      {/* {{marginRight: spacing + 'em'}} */}
                      {/* type="file" */}
                      {/* <input id="file" style={{visibility: 'hidden'}}  /> */}
                    </label>
                  </div>
                </div>
              </div>
              <div className="grid-cell">  
                <fieldset className="fc--disp-flex fc--fdir-col fc--aItem-ce">
                  <legend>
                    <h5 className="fw700 ls14 ttup fcGrey424041">Basic Information</h5>
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
                    <h5 className="fw700 ls14 ttup fcGrey424041">Professional Status</h5>
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
                    <h5 className="fw700 ls14 ttup fcGrey424041">Links</h5>
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
                    <h5 className="fw700 ls14 ttup fcGrey424041">About</h5>
                  </legend>
                  <hr className="mt10" />
                  <div className="grid grid--1of2 mt30">
                    <div className="grid-cell">
                      <textarea name="bio" cols="30" rows="10" placeholder="Write your about statement here"></textarea>
                    </div>
                    <div className="grid-cell fc--disp-flex fc--fdir-col fc--jCont-ce">
                      {/* <div className="fc--disp-flex fc--fdir-col fc--jCont-ce"> */}
                      <div className="fc-fieldset">
                        <Field 
                          label="When Did you Start Programming?"
                          name={experience}
                          type="date"                                  
                          placeholder="Enter Date"
                          component={this.renderField}
                          labelStyle="width65P"
                          inputStyle="width35P"
                        />
                        {/* <Field 
                          label="When Did you Start Coming to Recursive Thinking?"
                          name={timeWithRT}
                          type="date"
                          placeholder="Enter Date"
                          component={this.renderField}
                          labelStyle="width65P"
                          inputStyle="width35P"
                        /> */}
                      </div>
                    </div>
                  </div>
                </fieldset>
              </div>
            </div>
            <fieldset className="fieldsetSkills">
              {/* Professional Skills */}
              <div className="grid grid--full">
                <div className="grid-cell">
                  <legend>
                    <h5 className="fw700 ls14 ttup fcGrey424041">Professional Skills</h5>
                  </legend>
                  <hr className="mt10" />
                  <div className="grid grid--1of2">
                    <div className="grid-cell">
                      <div className="fc-form-input-col">
                        <label htmlFor="" className="fs24 fw300 ls14 fcGrey424041 mt45">Search For Professional Skills</label>
                        <input className="mt20" type="search" name="skillsProfessional" placeholder="Find Professional Skill"/>
                      </div>
                    </div>
                    <div className="grid-cell">
                      {allProfessionalSkills}
                    </div>
                  </div>
                </div>
              </div>
            </fieldset>
            <fieldset className="fieldsetSkills">
              {/* Software Skills */}
              <div className="grid grid--full">
                <div className="grid-cell">
                  <legend>
                    <h5 className="fw700 ls14 ttup fcGrey424041">Software Skills</h5>
                  </legend>
                  <hr className="mt10" />
                  <div className="grid grid--1of2">
                    <div className="grid-cell">
                      <div className="fc-form-input-col">
                        <label htmlFor="" className="fs24 fw300 ls14 fcGrey424041 mt45">Search For Software Skills</label>
                        <input className="mt20" type="search" name="skillsProfessional" placeholder="Find Software Skill"/>
                      </div>
                    </div>
                    <div className="grid-cell">
                      {allSoftwareSkills}
                    </div>
                  </div>                     
                </div>
              </div>
            </fieldset>
            <fieldset className="fieldsetSkills">
              {/* Language */}
              <div className="grid grid--full">
                <div className="grid-cell">
                  <legend>
                    <h5 className="fw700 ls14 ttup fcGrey424041">Languages</h5>
                  </legend>
                  <hr className="mt10" />
                  <div className="grid grid--1of2">
                    <div className="grid-cell">
                      <div className="fc-form-input-col">
                        <label htmlFor="" className="fs24 fw300 ls14 fcGrey424041 mt45">Search For Coding Languages</label>
                        <input className="mt20" type="search" name="skillsProfessional" placeholder="Find Language"/>
                      </div>
                    </div>
                    <div className="grid-cell">
                      {allLanguageSkills}
                    </div>
                  </div>                      
                </div>
              </div>
            </fieldset>
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
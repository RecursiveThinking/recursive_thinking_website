import React, {Component} from 'react'

class ProfileSetup extends Component {
  constructor(props){
    super(props);
    // would get some fields from auth/cognito - so some api call.
    // how does this fit in profile setup?
    this.state = {
      avatar: '../../../../public/images/avatar_default.png',
      name: '',
      city: '',
      state: ''
    }
    this.onInputChange = this.onInputChange.bind(this)
  }
  
  onInputChange(event){
    console.log('event', event.target.value)
  }
  
  onFormSubmit(event){
    event.preventDefault();
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
          <h5 className="fw900 ls14 fcGrey81">{titleString}</h5>
          <h6 className="fs20 fw500 ls12 fcGrey81">Search for a skill to add it to your profile</h6>
          <h6 className="fs20 fw500 ls12 fcGrey81">If you do not see the skill you are looking for simply hit enter to add to the list</h6>
        </div>
      )
    }
    
    return (
      <main>
        <div className="dropdown"> 
          <div className="grid grid--full">
            <div className="grid-cell">
              <article className="cardFullDark pdTB5LR1 ta-cent">
                <h2 className="fs48 fw500 ls30 fcWhite">Profile Setup</h2>
              </article>
            </div>
          </div>
        </div>
        <div className="contentList">
          <div className="grid grid--full">
            <div className="grid-cell">
              <article className="cardProfileSetup">
                <form onSubmit={this.onFormSubmit} className="" action="">
                  <fieldset>
                    <div className="grid grid--1of4">
                      <div className="grid-cell">
                        {/* this would come from the setup/avatardefault */}
                        <div className="fc--fdir-col ta-cent">
                          <img className="avatarL" name="avatar" src={this.state.avatar} alt=""/>
                          {/* <div class="caption card"> */}
                            {/* <label id="profile-picture"> */}
                              {/* <span class="profileTitle fw500">Add Profile Picture</span> */}
                              {/* style={visibility: 'hidden'}  */}
                              {/* {{marginRight: spacing + 'em'}} */}
                              {/* type="file" */}
                              {/* <input id="file"  /> */}
                            {/* </label> */}
                          {/* </div> */}
                        </div>
                      </div>
                      <div className="grid-cell">  
                        <legend className="fs24 fw900 ls14 fcGrey424041 ttup">Basic Information</legend>
                        <hr className="mt10" />
                        <div className="fc-form-input">
                          <label className="" htmlFor="name">Name</label>
                          <input 
                            placeholder="Your first and last name" 
                            type="text"
                            name="name"
                            value={this.state.name}
                            onChange={this.onInputChange}
                          />
                        </div>
                        <div className="fc-form-input">
                          <label htmlFor="name">City</label>                    
                          <input
                            placeholder="Your city"
                            type="text"
                            name="city"
                            value={this.state.city}
                            onChange={this.onInputChange}
                          />
                        </div>
                        <div className="fc-form-input">
                          <label htmlFor="name">State</label>                    
                          <input 
                            placeholder="Your state"
                            type="text"
                            name="state"
                            value={this.state.state}
                            onChange={this.onInputChange}
                          />
                        </div>
                      </div>
                    </div>
                  </fieldset>
                  <fieldset>
                    {/* Professional Status */}
                    <div className="grid grid--full">
                      <div className="grid-cell">
                        <legend className="fs24 fw900 ls14 fcGrey424041 ttup">Professional Status</legend>
                        <hr className="mt10" />
                        <div className="fc-form-input">
                          <label htmlFor="name">Job Title</label>
                          <input type="text" name="title" placeholder="Your current job title" />
                        </div>
                        <div className="fc-form-input">
                          <label htmlFor="name">Employeer</label>                    
                          <input type="text" name="employeer" placeholder="Your current employeer" />
                        </div>
                      </div>
                    </div>
                  </fieldset>
                  <fieldset>
                    {/* Links */}
                    <div className="grid grid--full">
                      <div className="grid-cell">
                        <legend className="fs24 fw900 ls14 fcGrey424041 ttup">Links</legend>
                        <hr className="mt10" />
                        <div className="fc-fieldset">
                          <div className="fc-form-input">
                            <label htmlFor="name">GitHub</label>
                            <input type="text" name="title" placeholder="Your GitHub URL" />
                          </div>
                          <div className="fc-form-input">
                            <label htmlFor="name">CodePen</label>                    
                            <input type="text" name="employeer" placeholder="Your CodePen URL" />
                          </div>
                          <div className="fc-form-input">
                            <label htmlFor="name">LinkedIn</label>
                            <input type="text" name="title" placeholder="Your LinkedIn URL" />
                          </div>
                          <div className="fc-form-input">
                            <label htmlFor="name">Portfolio</label>                    
                            <input type="text" name="employeer" placeholder="Your Portfolio URL" />
                          </div>
                          <div className="fc-form-input">
                            <label htmlFor="name">Resume</label>
                            <div className="fc-form-input-with-button">
                              <input type="text" name="title" placeholder="Your Resume" />
                              <button className="btn btnFillClrSchGreen00b371">Upload</button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </fieldset>
                  <fieldset>
                    {/* About */}
                    <legend className="fs24 fw900 ls14 fcGrey424041 ttup">About</legend>
                    <hr className="mt10 mb30" />
                    <div className="grid grid--1of2">
                      <div className="grid-cell">
                        <textarea name="bio" cols="30" rows="10" placeholder="Write your about statement here"></textarea>
                      </div>
                      <div className="grid-cell fc--disp-flex fc--fdir-col fc--jCont-ce">
                        <div className="fc-about-exp">
                          <div className="fc-form-input-full">
                            <label htmlFor="experience">When Did you Start Programming?</label>
                            <input className="input-30P" type="date" placeholder="Enter date" />
                          </div>
                          <div className="fc-form-input-full">
                            <label htmlFor="time">When Did you Start Coming to Recursive Thinking?</label>
                            <input className="input-30P" type="date" placeholder="Enter date" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </fieldset>
                  <fieldset className="fieldsetSkills">
                    {/* Professional Skills */}
                    <div className="grid grid--full">
                      <div className="grid-cell">
                        <legend className="fs24 fw900 ls14 fcGrey424041 ttup">Professional Skills</legend>
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
                        <legend className="fs24 fw900 ls14 fcGrey424041 ttup">Software Skills</legend>
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
                        <legend className="fs24 fw900 ls14 fcGrey424041 ttup">Languages</legend>
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
            </div>
          </div>
        </div>
        <div className="fullBarSave">
          <div className="grid grid--full">
            <div className="grid-cell fc--disp-flex fc--jCont-ce">
              <button className="btn btnOutlineClrSchGreen00b371 fs26 fw500 ls16 pdTB2LR8 ttup">Save Changes</button>
            </div>
          </div>
        </div>
      </main>
    )
  }
}

export default ProfileSetup;
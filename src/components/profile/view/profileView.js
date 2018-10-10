import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchUsers } from '../../../actions/index'

import CategoryList from '../../common/category/categoryList'
import DM from '../../../standards/dictModel'

class ViewProfile extends Component{
  componentDidMount(){
    this.props.fetchUsers()
  }

  render(){
    console.log(this.props.currentUser)
    // destructuring
    const { currentUser } = this.props;
    const selectedUser = currentUser
    const { 
      user: { 
              avatar, name, title, city, state, employer, linkGithub, linkCodepen, linkLinkedIn, linkPortfolioWebsite, linkResume, bio, experience, timeWithRT, skillsProfessional, skillsSoftware, skillsLanguages
            }
    } = DM
    // end destructuring
    
    // set avatar link
    const imageSrc = `../../../../public/images/${selectedUser[avatar]}`
    
    // this makes the link list (Github, Codepen, etc.)
    const icons = [ 
                    ['Github', 'fa fa fa-git-square', selectedUser[linkGithub]],
                    ['CodePen', 'fa fa fa-codepen', selectedUser[linkCodepen]],
                    ['LinkeIn', 'fa fa-linkedin-square', selectedUser[linkLinkedIn]],
                    ['Resume', 'fa fa-id-card-o', selectedUser[linkResume]]
                  ]
    
    const iconList = icons.map(iconItem => {
      let iconClass, headingClass, hrefLink = ''
      // console.log('II', iconItem[2], iconItem[2] === ' ')
      // iconItem[2] = 'https://www.google.com'
      if(iconItem[2] === ' '){
        iconClass = `fs45 fcGreyc6 ${iconItem[1]} mb10`
        headingClass = `fs12 fw300 ls08 fcGreyc6`
        return (
          <li className="icon fc--disp-flex fc--fdir-col fc--jCont-ce fc--aItem-ce height50P width50P">
            <div className="fc--disp-flex fc--fdir-col fc--jCont-ce fc--aItem-ce">
              <i className={iconClass}></i>
              <h6 className={headingClass}>{iconItem[0]}</h6>
            </div>
          </li>
        )

      }
      else {
        iconClass = `fs45 fcGreenRT ${iconItem[1]} mb10`
        headingClass = `fs12 fw300 ls08 fcGrey424041`
        hrefLink = iconItem[2]
        return (
          <li className="icon fc--disp-flex fc--fdir-col fc--jCont-ce fc--aItem-ce height50P width50P">
            <a href={hrefLink} target="_blank" className="fc--disp-flex fc--fdir-col fc--jCont-ce fc--aItem-ce">
              <i className={iconClass}></i>
              <h6 className={headingClass}>{iconItem[0]}</h6>
            </a>
          </li>
        )
      }
    })
    // end link list
    
    // this makes the portfolio link
    function checkPortValue(linkValue){
      // linkValue = ' '
      if(linkValue === ' '){
        return (
          <div className="port fc--disp-flex fc--fdir-row fc--jCont-ce fc--aItem-ce height25P">  
            <h6 className="fs18 ls12 fcGreyc6">Portfolio</h6>
          </div>
        )
      } else {
        return (
          <div className="port fc--disp-flex fc--fdir-row fc--jCont-ce fc--aItem-ce height25P"> 
            <a href={linkValue} >
              <h6 className="fs18 ls 12">Portfolio</h6>
            </a>
          </div>
        )
      }
    }
    let portText = checkPortValue(selectedUser[linkPortfolioWebsite])
    // end portfolio link
    
    
    // this gets 
    function getDateForProfile(date, profileItem){
      const DATE_SECS = {
        solarYear: 31556952000,
        avgMonth: 2629746000
      }
      
      if(typeof date !== 'date'){
        date = new Date(date);
      }
      let now = new Date();
      let diff = now - date;
      let years = 0;
      let months = 0;
      while(diff > DATE_SECS['avgMonth']){
        if(diff > DATE_SECS['solarYear']){
          diff -= DATE_SECS['solarYear']
          years += 1;
        } else {
          diff -= DATE_SECS['avgMonth'];
          months += 1;
        }
      }
      // console.log(profileItem, years, months)
      if(profileItem === experience){
        let experienceString = ''
        let textString = years < 2 ? 'Years of Experience' : 'Year of Experience'
        // years = 0
        // months = 1
        // diff = 1
        if(years < 1 && diff > 0){
          experienceString = '< 1'
        }
        else {
          experienceString = years
        }
        return (
          <div className="fc-profileAboutExp fc--disp-flex fc--fdir-col fc--jCont-ce fc--aCont-ce fc--aItem-ce height50P width100P">
            <h2 className="fs48 fw300 ls30 fcGrey424041">{experienceString}</h2>
            <h6 className="fs18 fw500 ls12 fcGreyb9">{textString}</h6>
          </div>
        )
      }
      else if(profileItem === timeWithRT){
        let yearString = years === 1 ? 'year' : 'years'
        let monthString = months === 1 ? 'month' : 'months'
        // more than a year
        // years = 0
        // months = 0
        // diff = 1
        if(years > 0){
          return (
            <div className="fc-profileAboutExp fc--disp-flex fc--fdir-col fc--jCont-ce fc--aCont-ce fc--aItem-ce height50P width100P">
              <div className="fc--disp-flex fc--jCont-ce fc--aItem-ce width100P">
                <h2 className="fc--disp-flex fs48 fw300 ls30 fcGrey424041">{years}</h2>
                <span className="fc--disp-flex fc--fdir-col fs10 ls20 fw700 fcGrey424041 ttlow mt25 pdl05">{yearString}</span>
                <h2 className="fc--disp-flex fs48 fw300 ls30 fcGrey424041 pdl10">{months}</h2>
                <span className="fc--disp-flex fc--fdir-col fs10 ls20 fw700 fcGrey424041 ttlow mt25 pdl05">{monthString}</span>
              </div>
              <h6 className="fs18 fw500 ls12 fcGreyb9">Time with Recursive Thinking</h6>
            </div>
          )
        }
        // more than one month but less than one year
        else if(months > 1){
          return (
            <div className="fc-profileAboutExp fc--disp-flex fc--fdir-col fc--jCont-ce fc--aCont-ce fc--aItem-ce height50P width100P">
              <div className="fc--disp-flex fc--jCont-ce fc--aItem-ce width100P">
                <h2 className="fs48 fw300 ls30 fcGrey424041">{months}</h2>
                <span className="fc--disp-flex fc--fdir-col fs10 ls20 fw700 fcGrey424041 ttlow mt25 pdl05">{monthString}</span>
              </div>
              <h6 className="fs18 fw500 ls12 fcGreyb9">Time with Recursive Thinking</h6>
            </div>
          )
        }
        // less than one month
        else if(months === 0 && diff > 0){
          let timeString = '< 1'
          monthString = 'month'
          return (
            <div className="fc-profileAboutExp fc--disp-flex fc--fdir-col fc--jCont-ce fc--aCont-ce fc--aItem-ce height50P width100P">
              <div className="fc--disp-flex fc--jCont-ce fc--aItem-ce width100P">
                <h2 className="fs48 fw300 ls30 fcGrey424041">{timeString}</h2>
                <span className="fc--disp-flex fc--fdir-col fs10 ls20 fw700 fcGrey424041 ttlow mt25 pdl05">{monthString}</span>
              </div>
              <h6 className="fs18 fw500 ls12 fcGreyb9">Time with Recursive Thinking</h6>
            </div>
          )
        }
      }
      else {
        return (
          <div>
            <p className="">
              Something Went Wrong...
            </p>
          </div>
        )
      }
    }
    
    let experienceJSX = getDateForProfile(selectedUser[experience], experience)
    let timeWithRTJSX = getDateForProfile(selectedUser[timeWithRT], timeWithRT)
    
    return(
      <main className="content">
        <button className="btn btnFillClrSchGreen00b371 pdTB1LR2 mt15 mb15 ml15 fs20 fw500 ls12">&#60;   Return to Directory</button>
        <article className="cardNoPadding">
          <div className="grid grid--full">
            <div className="grid-cell">
              <div className="grid grid--2of3">
                <div className="grid-cell">
                  {/* avatar and text */}
                  <div className="fc-twothirdsLeftViewProfile fc--disp-flex fc--fdir-row fc--jCont-fs fc--aItems-ce ">
                    <img className="avatarM avatarBS" src={imageSrc} />
                    <div className="fc-twothirdsLeftViewProfile-sub fc--disp-flex fc--fdir-col fc--fwrap-yes fc--jCont-ce fc--aItems-fs">
                      <h3 className="fs33 fw500 ls22 fcGrey424041">{selectedUser[name]}</h3>
                      <h5 className="fw300 ls14 fcGrey424041">{selectedUser[title]}</h5>
                      <div className="fc--disp-flex fc-fdir-row fc--aItems-ce width100P mt10">
                        <h6 className="fs14 fw900 ls08 fcGrey424041 ttup">
                          Location:
                        </h6>
                        <h6 className="fs14 fw500 ls08 fcGrey424041">
                          {selectedUser[city]}, {selectedUser[state]}
                        </h6>
                      </div>
                      <div className="fc--disp-flex fc-fdir-row fc--aItems-ce width100P mt0125">
                        <h6 className="fs14 fw900 ls08 fcGrey424041 ttup">
                          Company:
                        </h6>
                        <h6 className="fs14 fw500 ls08 fcGrey424041">
                          {selectedUser[employer]}
                        </h6>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="grid-cell">
                  {/* links */}
                  <div className="fc--disp-flex fc--fdir-col height100P">
                    <ul className="fc--disp-flex fc--fdir-row fc--fwrap-yes height75P">
                      {/* icon list */}
                      {iconList}
                    </ul>
                    {/* portfolio link */}
                    {portText}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </article>
        <article className="cardNoPadding mt30">
          <div className="grid grid--2of3">
            <div className="grid-cell">
              <div className="fc-twothirdsLeftViewProfile">
                <h5 className="fw900 ls14 fcGreyb9 ttup">About</h5>
                <hr />
                <p className="fs14 fw500 ls08 ta-just fcGrey424041 mt15">
                  {selectedUser[bio]}
                </p>
              </div>
            </div>
            <div className="grid-cell">
              <div className="fc--disp-flex fc--fdir-col fc--jCont-ce height100P">
                  {/* years */}
                  {experienceJSX}
                  {/* {selectedUser[experience]} */}
                
                  {/* time rec */}
                  {timeWithRTJSX}
              </div>
            </div>
          </div>
        </article>
        <article className="card mt30">
          <h5 className="fw900 ls14 fcGreyb9 ttup">Professional Skills</h5>
          <hr />
          <div className="">
            <CategoryList categories={currentUser[skillsProfessional]} />
          </div>
        </article>
        <article className="card mt30">
          <h5 className="fw900 ls14 fcGreyb9 ttup">Software Skills</h5>
          <hr />
          <div className="">
            <CategoryList categories={currentUser[skillsSoftware]} />
          </div>
        </article>
        <article className="card mt30">
          <h5 className="fw900 ls14 fcGreyb9 ttup">Languages</h5>
          <hr />
          <div className="">
            <CategoryList categories={currentUser[skillsLanguages]} />
          </div>
        </article>
      </main>
    )
  }
}

function mapStateToProps(state){
  return {
    allUsers: state.users.allUsers,
    currentUser: state.currentUser
  }
}

export default connect(mapStateToProps, { fetchUsers })(ViewProfile)
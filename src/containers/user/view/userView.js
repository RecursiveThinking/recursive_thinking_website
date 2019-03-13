import React, { Component } from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'

import { fetchUsers, fetchSkills, getCurrentUserById, getUserById, editUserById } from '../../../actions'

import DefaultLoadingPage from '../../../components/defaults/loadingPage/loadingPage';

import ContentPageTitleBar from '../../../components/common/contentPage/contentPageTitleBar';
import { TITLE_BAR_USER_VIEW } from '../../../components/common/contentPage/contentPageTitleBarInfo';
import CategoryList from '../../../components/common/category/categoryList';
import RecursiveDirectoryListItemSm from '../../../components/recursiveDirectory/recursiveDirectoryListItemSm';

import { ROUTES_REACT } from '../../../standards/routes';
import { PATH_FOR_IMAGES } from '../../../standards/publicPaths';
import DM from '../../../standards/dictModel';

const {
  users_view
} = ROUTES_REACT

class UserView extends Component{
  constructor(props){
    super(props)
    
    this.state = {
      contentHeight: ''
    }
  }

  componentDidMount(){
    this.props.getUserById(this.props.match.params.id);
    this.props.fetchUsers();
    this.props.fetchSkills();
    this.props.getCurrentUserById();
    this.handleWindowResize()
    // window.addEventListener('load', this.handleWindowResize)
    window.addEventListener('resize', this.handleWindowResize);
    window.addEventListener('onbeforeunload', this.handleWindowResize)
  }
  
  componentDidUpdate(prevProps, prevState){
    this.handleWindowResize();
    if(prevProps.userById.userId !== this.props.match.params.id){
      this.props.getUserById(this.props.match.params.id);
    }
  }
  
  componentWillUnmount(){
    // window.removeEventListener('load', this.handleWindowResize)
    window.removeEventListener('resize', this.handleWindowResize);
    window.removeEventListener('onbeforeunload', this.handleWindowResize)
  }
  
  handleWindowResize = () => {
    if(this.state.contentHeight !== this.contentTarget.clientHeight){
      this.setState({
        contentHeight: this.contentTarget.clientHeight
      })
    }
  }
  
  iterateUserProfileLinks = (userObj, propToUpdate) => {
    // console.log('updateUser: (before): ', userObj, propToUpdate, userObj[propToUpdate])
    let updateUserObj = { ...userObj };
    updateUserObj[propToUpdate] += 1;
    // console.log('updateUser: (after): ', userObj, propToUpdate, userObj[propToUpdate], updateUserObj[propToUpdate])
    this.props.editUserById(updateUserObj, `${users_view}/${updateUserObj.userId}`, `${users_view}/${updateUserObj.userId}`);
    this.props.getUserById(updateUserObj.userId);
  }
  
  renderContent = () => {
    
  }
  
  render(){
    const {
      contentHeight
    } = this.state;
    
    // const currentUserId = this.props.match.params.id;
    
    const { 
      user: { 
              userId, avatar, name, title, city, state, employer, linkGithub, linkCodepen, linkLinkedIn, linkPortfolioWebsite, linkResume, bio, profileStatsVisits, profileStatsViewsGithub, profileStatsViewsCodePen, profileStatsViewsPortfolio, profileStatsViewsLinkedIn, profileStatsViewsResume, experience, timeWithRT, skillsProfessional, skillsSoftware, skillsLanguages
            }
    } = DM
    
    // let selectedUser = '';
    
    // if(this.props.userById){
    //   selectedUser = this.props.userById;
    //   // update profileStatsVisits
      
    // } else {
    //   console.log('No User')
    // }
    
    // const selectedUser = currentUser
    
    if(contentHeight === 0){
      return (
        <div className="content"
          ref={ node => { if(node !== null){this.contentTarget = node}}}
        > 
          <section style={{padding: '1.5rem 1.5rem'}}>
            <DefaultLoadingPage />
          </section>
        </div>
      )
    }
    else if(this.props.userById === 'FETCHING' || this.props.allUsers === 'FETCHING' || this.props.allSkills === 'FETCHING' || this.props.currentUser === 'FETCHING' || this.props.userById.userId !== this.props.match.params.id){
      return (
        <div className="content"
          ref={ node => { if(node !== null){this.contentTarget = node}}}
        >
          <section style={{padding: '1.5rem 1.5rem'}}>
            <DefaultLoadingPage />
          </section>
        </div>
      )
    }
    else {
      
    // if(this.props.userById){
    console.log('userById: ', this.props.userById)
    // selectedUser = this.props.userById;
    const {
      userById
    } = this.props
      // update profileStatsVisits
      
    // } else {
      // console.log('No User')
    // }
    
    // console.log('hit here', contentHeight)
    // destructuring
    const { allSkills, lookupTableAllSkills } = this.props;
    
    // end destructuring
    
    // test links
    // userById[linkGithub] = 'https://github.com/sethborne'
    // userById[linkCodepen] = 'https://codepen.io/sethborne/'
    // userById[linkLinkedIn] = ' '
    // userById[linkResume] = ' '
    
    // set avatar link
    const imageSrc = `${PATH_FOR_IMAGES}${userById[avatar]}`
    
    // this makes the link list (Github, Codepen, etc.)
    const icons = [ 
      ['Github', 'fa fa fa-git-square', userById[linkGithub], profileStatsViewsGithub],
      ['CodePen', 'fa fa fa-codepen', userById[linkCodepen], profileStatsViewsCodePen],
      ['LinkedIn', 'fa fa-linkedin-square', userById[linkLinkedIn], profileStatsViewsLinkedIn],
      ['Resume', 'fa fa-id-card-o', userById[linkResume], profileStatsViewsResume]
    ]
    
    const iconList = icons.map(iconItem => {
      let iconClass, headingClass, hrefLink = ''
      if(iconItem[2] === ' '){
        iconClass = `linkNotSetup fs45 ${iconItem[1]} mb10`
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
        // this link is setup
        iconClass = `fs45 ${iconItem[1]} mb10`
        headingClass = `fs12 fw300 ls08`
        hrefLink = iconItem[2]
        // console.log('link', hrefLink, iconItem)
        return (
          <li className="icon fc--disp-flex fc--fdir-col fc--jCont-ce fc--aItem-ce height50P width50P">
            <a 
              className="fc--disp-flex fc--fdir-col fc--jCont-ce fc--aItem-ce" 
              href={hrefLink} 
              target="_blank" 
              rel="noopener noreferrer"
              onClick={() => this.iterateUserProfileLinks(userById, iconItem[3])}
            >
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
        // this has a link
        return (
          <div className="port fc--disp-flex fc--fdir-row fc--jCont-ce fc--aItem-ce height25P"> 
            <a 
              href={linkValue} 
              target="/"
              onClick={() => this.iterateUserProfileLinks(userById, profileStatsViewsPortfolio)}
            >
              <h6 className="fs18 ls 12">Portfolio</h6>
            </a>
          </div>
        )
      }
    }
    // userById[linkPortfolioWebsite] = ' '
    let portText = checkPortValue(userById[linkPortfolioWebsite])
    // end portfolio link
    
    // this gets 
    function getDateForProfile(date, profileItem){
      const DATE_SECS = {
        solarYear: 31556952000,
        avgMonth: 2629746000
      }
      
      if(typeof date !== 'object'){
      // if(date instanceof Date){
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
        let textString = years < 2 ? 'Year of Experience' : 'Years of Experience'
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
            <h6 className="fs18 fw500 ls12 fcGrey81">{textString}</h6>
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
              <h6 className="fs18 fw500 ls12 fcGrey81">Time with Recursive Thinking</h6>
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
              <h6 className="fs18 fw500 ls12 fcGrey81">Time with Recursive Thinking</h6>
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
              <h6 className="fs18 fw500 ls12 fcGrey81">Time with Recursive Thinking</h6>
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
    
    let experienceJSX = getDateForProfile(userById[experience], experience)
    let timeWithRTJSX = getDateForProfile(userById[timeWithRT], timeWithRT)
    
    // let otherProfilesArr = this.props.allUsers.filter((userObj) => {
    //   return userObj.userId !== userId
    // })
    
    const contentSideStyle = {
      height: contentHeight
    }
    
    // const contentSideStyleChild = {
    //   height: (contentHeight * .99)
    // }
    
      const profileArray = this.props.allUsers.filter(user => user[userId] !== this.props.currentUser[userId])
    
      let profilesToRender = profileArray.map((user) => {
        return (
          <li key={user[userId]} className="fc--disp-flex fc--fdir-row">
            <RecursiveDirectoryListItemSm user={user}/>
          </li>
        )
      })
    
      return(
        <main>
          <ContentPageTitleBar content={TITLE_BAR_USER_VIEW}/>
          <div className="grid grid--3of4">
            <div className="grid-cell"
              // ref={ node => { if(node !== null){this.contentTarget = node}}}
            >
              {/* need this height */}
              {/* this.renderContent(); */}
              <div className="content"
                ref={ node => { if(node !== null){this.contentTarget = node}}}
              >              
                <article className="cardNoPadding">
                  <div className="grid grid--full">
                    <div className="grid-cell">
                      <div className="grid grid--2of3">
                        <div className="grid-cell">
                          {/* avatar and text */}
                          <div className="fc-twothirdsLeftViewProfile fc--disp-flex fc--fdir-row fc--jCont-fs fc--aItems-ce ">
                            <img 
                              className="avatarM avatarBS" 
                              src={imageSrc}
                              alt={userById[name]}
                            />
                            <div className="fc-twothirdsLeftViewProfile-sub fc--disp-flex fc--fdir-col fc--fwrap-yes fc--jCont-ce fc--aItems-fs">
                              <h3 className="fs33 fw500 ls22 fcGrey424041">{userById[name]}</h3>
                              <h5 className="fw300 ls14 fcGrey424041">{userById[title]}</h5>
                              <div className="fc--disp-flex fc-fdir-row fc--aItems-ce width100P mt10">
                                <h6 className="fs14 fw700 ls08 fcGrey424041 ttup">
                                  Location:
                                </h6>
                                <h6 className="fs14 fw500 ls08 fcGrey424041">
                                  {userById[city]}, {userById[state]}
                                </h6>
                              </div>
                              <div className="fc--disp-flex fc-fdir-row fc--aItems-ce width100P mt0125">
                                <h6 className="fs14 fw700 ls08 fcGrey424041 ttup">
                                  Company:
                                </h6>
                                <h6 className="fs14 fw500 ls08 fcGrey424041">
                                  {userById[employer]}
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
                        <h5 className="fw700 ls14 ttup fcGrey424041">About</h5>
                        <hr />
                        <p className="fs14 fw500 ls08 ta-just fcGrey424041 mt15 wspl">
                          {userById[bio]}
                        </p>
                      </div>
                    </div>
                    <div className="grid-cell">
                      <div className="fc--disp-flex fc--fdir-col fc--jCont-ce height100P">
                          {/* years */}
                          {experienceJSX}
                          {/* {userById[experience]} */}
                        
                          {/* time rec */}
                          {timeWithRTJSX}
                      </div>
                    </div>
                  </div>
                </article>
                <article className="card mt30">
                  <h5 className="fw700 ls14 ttup fcGrey424041">Professional Skills</h5>
                  <hr />
                  <div className="">
                    <CategoryList 
                      categories={userById[skillsProfessional]}
                      allSkillsArr={allSkills}
                      lookupTableAllSkills={lookupTableAllSkills}
                    />
                  </div>
                </article>
                <article className="card mt30">
                  <h5 className="fw700 ls14 ttup fcGrey424041">Software Skills</h5>
                  <hr />
                  <div className="">
                    <CategoryList 
                      categories={userById[skillsSoftware]}
                      allSkillsArr={allSkills}
                      lookupTableAllSkills={lookupTableAllSkills}
                    />
                  </div>
                </article>
                <article className="card mt30">
                  <h5 className="fw700 ls14 ttup fcGrey424041">Languages</h5>
                  <hr />
                  <div className="">
                    <CategoryList 
                      categories={userById[skillsLanguages]}
                      allSkillsArr={allSkills}
                      lookupTableAllSkills={lookupTableAllSkills}
                    />
                  </div>
                </article>
              </div>
            </div>
            <div className="grid-cell">
              {/* <h1>HERE</h1> */}
              <aside className="fc-directoryCardSmContParent" style={contentSideStyle} >
              {/*  */}
                {/* <div className="fc-directoryCardSmContChild"> */}
                  <ul className="fc-directoryCardSmContChild" style={contentSideStyle} >
                    {profilesToRender}
                  </ul>
                {/* </div> */}
              </aside>
            </div>
          </div>
        </main>
      )
    }
  }
}

function mapStateToProps(state){
  return {
    allUsers: state.users.allUsers,
    currentUser: state.auth.currentUser,
    lookupTableAllUsers: state.users.lookupTableAllUsers,
    allSkills: state.skills.allSkills,
    lookupTableAllSkills: state.skills.lookupTableAllSkills,
    userById: state.users.userById
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({ fetchUsers, fetchSkills, getCurrentUserById, getUserById, editUserById }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(UserView)
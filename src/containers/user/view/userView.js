import React, { Component } from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'

import { usersGetAll, skillsGetAll, userGetById, userEditById, ranksGetAll } from '../../../actions'

import DefaultLoadingPage from '../../../components/defaults/loadingPage/loadingPage';
import { CARD_TITLE_GETTING_SELECTED_USER_PROFILE } from '../../../components/common/content/contentInfo'

import CategoryList from '../../../components/common/category/categoryList';
import RecursiveDirectoryListItemSm from '../../../components/recursiveDirectory/recursiveDirectoryListItemSm';

import { ROUTES_REACT } from '../../../standards/routes';
// import { PATH_FOR_IMAGES } from '../../../standards/publicPaths';
import { PUBLIC_S3_URL } from '../../../standards/publicPaths';
import DM from '../../../standards/dictModel';
// import { FETCHING } from '../../../actions/action_types';

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
    this.props.userGetById(this.props.match.params.id);
    if(!this.props.users.allUsers.length){
      this.props.usersGetAll();
    }
    this.props.skillsGetAll();
    if(!this.props.ranks.allRanks.length){
      this.props.ranksGetAll();
    }
    // this.props.getCurrentUserById();
    this.handleWindowResize();
    // window.addEventListener('load', this.handleWindowResize)
    window.addEventListener('resize', this.handleWindowResize);
    window.addEventListener('onbeforeunload', this.handleWindowResize);
  }
  
  componentDidUpdate(prevProps, prevState){
    this.handleWindowResize();
    if(prevProps.users.userById){
      // console.log('@ ComponentDidUpdate: prev !== match.params', 'prevProps.userId: ', prevProps.users.userById.userId, prevProps.users.userById.userId !== this.props.match.params.id, 'this.props.match.params.id: ', this.props.match.params.id)
      if(prevProps.users.userById.userId !== this.props.match.params.id){
        const {
          isGettingUserById
        } = prevProps.users
        // console.log('isGettingUserById === false: ', !isGettingUserById)
        if(!isGettingUserById){
          this.props.userGetById(this.props.match.params.id);
        }
      }
    }
    // if(prevProps.ranks.allRanks.length){
    //   if(prevProps.ranks.allRanks.length !== this.props.ranks.allRanks.length){
    //     this.props.usersGetAll();
    //   }
    // }
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
    this.props.userEditById(updateUserObj, `${users_view}/${updateUserObj.userId}`, `${users_view}/${updateUserObj.userId}`);
    this.props.userGetById(updateUserObj.userId);
  }
      // this gets 
  getDateForProfile = (date, profileItem) =>{
    const DATE_SECS = {
      solarYear: 31556952000,
      avgMonth: 2629746000
    }
    const {
      user: {
        experience,
        timeWithRT
      }
    } = DM
    
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
            <h6 className="fs18 fw500 ls12 fcGrey81 ta-cent">Time with Recursive Thinking</h6>
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
            <h6 className="fs18 fw500 ls12 fcGrey81 ta-cent">Time with Recursive Thinking</h6>
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
  
  // this makes the portfolio link
  checkPortValue = (linkValue) =>{
    const {
      users: { userById }
    } = this.props;
    const {
      user: {
        profileStatsViewsPortfolio
      }
    } = DM
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
      
  renderContent = () => {
    const {
      users: { userById },
      skills: { 
        allSkills, lookupTableAllSkills,
        isFetchingSkillsGetAll, errorMessageSkillsGetAll
      },
      ranks: { lookupTableAllRanks },
      currentUser
    } = this.props
    const { 
      user: 
        { 
          userId, avatar, name, title, city, state, employer, linkGithub, linkCodepen, linkLinkedIn, linkPortfolioWebsite, linkResume, bio, 
          // profileStatsVisits, 
          profileStatsViewsGithub, profileStatsViewsCodePen, 
          // profileStatsViewsPortfolio, 
          profileStatsViewsLinkedIn, profileStatsViewsResume, experience, timeWithRT, rank, skillsProfessional, skillsSoftware, skillsLanguages
        }
    } = DM
    
    // this makes the link list (Github, Codepen, etc.)
    const icons = [ 
      ['Github', 'fa fa fa-git-square', userById[linkGithub], profileStatsViewsGithub],
      ['CodePen', 'fa fa fa-codepen', userById[linkCodepen], profileStatsViewsCodePen],
      ['LinkedIn', 'fa fa-linkedin-square', userById[linkLinkedIn], profileStatsViewsLinkedIn],
      ['Resume', 'fa fa-id-card-o', userById[linkResume], profileStatsViewsResume]
    ]
    
    // test links
    // userById[linkGithub] = 'https://github.com/sethborne'
    // userById[linkCodepen] = 'https://codepen.io/sethborne/'
    // userById[linkLinkedIn] = ' '
    // userById[linkResume] = ' '
    
    const iconList = icons.map((iconItem, index) => {
      let iconClass, headingClass, hrefLink = ''
      if(iconItem[2] === ' '){
        iconClass = `linkNotSetup fs45 ${iconItem[1]} mb10`
        headingClass = `fs12 fw300 ls08 fcGreyc6`
        return (
          <li key={index} className="icon fc--disp-flex fc--fdir-col fc--jCont-ce fc--aItem-ce height50P width50P">
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
          <li key={index} className="icon fc--disp-flex fc--fdir-col fc--jCont-ce fc--aItem-ce height50P width50P">
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
    
    // userById[linkPortfolioWebsite] = ' '
    let portText = this.checkPortValue(userById[linkPortfolioWebsite])
    // end portfolio link
    
    let experienceJSX = this.getDateForProfile(userById[experience], experience)
    let timeWithRTJSX = this.getDateForProfile(userById[timeWithRT], timeWithRT)
    
    const skillsArray = [userById[skillsProfessional], userById[skillsSoftware], userById[skillsLanguages]]
    const skillTitleArray = [ 'Professional Skills', 'Software Skills', 'Languages']
    
    
    // console.log('renderContent - first if: do ids NOT match: ')
    if(userById[userId] !== this.props.match.params.id || isFetchingSkillsGetAll){
      // console.log('renderContent - in first if: userById[userId]: ', userById[userId], userById[userId] !== this.props.match.params.id, 'this.props.match.params.id', this.props.match.params.id )
      const {
        title
      } = CARD_TITLE_GETTING_SELECTED_USER_PROFILE
      return (
        <DefaultLoadingPage 
          title={title}
          classNameTxt='ta-cent'
        />
      )
    } 
    else if(userById[userId] === this.props.match.params.id && !isFetchingSkillsGetAll){
      // console.log('renderContent - in else: can render')
      // set avatar link
      const imageSrc = `${PUBLIC_S3_URL}${userById[userId]}/avatar/${userById[avatar]}`
      
      let returnSkillsJSX = skillsArray.map((skillArray, index) => {
        if(skillArray.length){
          return (
            <article key={index} className="card mt30">
              <h5 className="fw600 ls14 fcGrey424041">{skillTitleArray[index]}</h5>
              <hr className="mt10" />
              <div className="">
                <CategoryList 
                  categories={skillArray}
                  allSkillsArr={allSkills}
                  lookupTableAllSkills={lookupTableAllSkills}
                />
              </div>
            </article>
          )
        } else {
          return (
            null
          )
        }
      }
    )
      return (
        <>
          <article className="cardNoPadding">
            <div className="grid grid--full">
              <div className="grid-cell">
                <div className="grid grid--2of3">
                  <div className="grid-cell">
                    {/* avatar and text */}
                    <div className="fc-twothirdsLeftViewProfile fc--disp-flex fc--fdir-row fc--jCont-fs fc--aItems-ce">
                      <div className="fc--disp-flex fc--fdir-col fc--aItem-ce">
                        <img 
                          className="avatarM avatarBS" 
                          src={imageSrc}
                          alt={userById[name]}
                        />
                        <div className="userViewRank">
                          <div className="rankNavTxt fs12 fw300 ls10 fcGrey424041 ta-cent">
                            {lookupTableAllRanks[userById[rank]].rank}
                            {/* Title */}
                          </div>
                        </div>
                      </div>
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
                  <h5 className="fw600 ls14 fcGrey424041">About</h5>
                  <hr className="mt10" />
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
          {returnSkillsJSX}
        </>
      )
    }
  }
  
  render(){
    const {
      contentHeight
    } = this.state;
    
    let {
      users: { 
        allUsers, 
        // lookupTableAllUsers, 
        isFetchingUsersGetAll, 
        // errorMessageUsersGetAll,
        userById, 
        isGettingUserById, 
        // errorMessageGettingUserById 
      },
      skills: { 
        
      },
      ranks: {
        isFetchingRanksGetAll,
        errorMessageRanksGetAll
      },
      currentUser
    } = this.props
    
    const {
      title
    } = CARD_TITLE_GETTING_SELECTED_USER_PROFILE
    // const selectedUser = currentUser
    // console.log('@ userView - this.props: ', this.props)
    if(contentHeight === 0){
      // console.log('@ first if - setting content height')
      return (
        <div className="content"
          ref={ node => { if(node !== null){this.contentTarget = node}}}
        > 
          <DefaultLoadingPage 
            title={title}
            classNameTxt='ta-cent'
          />
        </div>
      )
    }
    // else if(isGettingUserById || isFetchingUsersGetAll || isFetchingSkillsGetAll || currentUser === FETCHING){
    else if(isFetchingUsersGetAll || isFetchingRanksGetAll){
      // console.log('=== isGettingUserById: ', isGettingUserById, 'isFetchingUsersGetAll: ', isFetchingUsersGetAll, 'isFetchingSkillsGetAll: ',  isFetchingSkillsGetAll,  'currentUser: ', currentUser)
      // this.props.userById.userId !== this.props.match.params.id
      // console.log('@ first else if - fetching all information')      
      return (
        <div className="content"
          ref={ node => { if(node !== null){this.contentTarget = node}}}
        >
          <DefaultLoadingPage 
            title={title}
            classNameTxt='ta-cent'
          />
        </div>
      )
    }
    else if(!userById){
      // Default Error Message
      // console.log('@ second else if - there is no userById')
      return (
        <div className="content"
          ref={ node => { if(node !== null){this.contentTarget = node}}}
        >
          <DefaultLoadingPage 
            title={title}
            classNameTxt='ta-cent'
          />
        </div>
      )
    }
    else if(!isFetchingUsersGetAll && !isFetchingRanksGetAll) {
      // console.log('@ third else if - have the information to render')      
      const { user: { userId } } = DM;
      
      const profileArray = allUsers.filter(user => user[userId] !== this.props.currentUser[userId]).filter(user => user.isProfileSetup === true)
      
      let profilesToRender = profileArray.map((user) => {
        return (
          <li key={user[userId]} className="fc--disp-flex fc--fdir-row">
            <RecursiveDirectoryListItemSm user={user}/>
          </li>
        )
      })
      
      const contentSideStyle = {
        height: contentHeight
      }

      return(
        <main>
          {/* <ContentPageTitleBar content={TITLE_BAR_USER_VIEW}/> */}
          <div className="grid grid--3of4">
            <div className="grid-cell"
              // ref={ node => { if(node !== null){this.contentTarget = node}}}
            >
              {/* need this height */}
              {/* this.renderContent(); */}
              <div className="content"
                ref={ node => { if(node !== null){this.contentTarget = node}}}
              >    
                {this.renderContent()}
              </div>
            </div>
            <div className="grid-cell">
              <aside className="fc-directoryCardSmContParent" style={contentSideStyle} >
                <ul className="fc-directoryCardSmContChild" style={contentSideStyle} >
                  {profilesToRender}
                </ul>
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
    auth: state.auth,
    users: state.users,
    skills: state.skills,
    ranks: state.ranks
    // userById: state.users.userById
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({ usersGetAll, skillsGetAll, userGetById, userEditById, ranksGetAll }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(UserView)
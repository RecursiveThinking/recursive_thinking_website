import React, {Component} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { userCreateById, userEditById, userGetById  } from '../../../actions/index'
// getCurrentUserById,
import HeaderApp from '../../../components/headerApp/headerApp';
import Footer from '../../../components/footer/footer';

import DefaultLoadingPage from '../../../components/defaults/loadingPage/loadingPage';
import DefaultProcessingPage from '../../../components/defaults/processingPage/processingPage';
import DefaultErrorPage from '../../../components/defaults/errorPage/errorPage';

import UserEdit from '../edit/userEdit';
import ContentPageWithTitleBar from '../../../components/common/contentPage/contentPageWithTitleBar';
import { TITLE_BAR_USER_SETUP } from '../../../components/common/contentPage/contentPageTitleBarInfo';
import { 
  CARD_TITLE_AUTH_GET_USER_BY_ID,
  CARD_TITLE_AUTH_CREATING_USER_BY_ID,
  CARD_TITLE_AUTH_GOING_TO_DASHBOARD
} from '../../../components/common/content/contentInfo'

import { createAssetFoldersForUser } from '../../../functions/s3Methods'

import { history } from '../../../index'

import { ROUTES_REACT } from '../../../standards/routes'
import DM from '../../../standards/dictModel'

import { CogUser, User } from '../../../models/models'

class SetupUser extends Component {
  constructor(props){
    super(props)
    
    this.state = {
      headerHeight: '',
      footerHeight: '', 
      contentHeight: '',
      windowHeight: window.outerHeight,
      windowWidth: window.innerWidth
    }
  }
  
  componentDidMount(){
    // window.addEventListener('load', this.handleWindowResize)
    // window.addEventListener('resize', this.handleWindowResize);
    // window.addEventListener('onbeforeunload', this.handleWindowResize)
    // this.props.getCurrentUserById();
    // or userObjFromCognito???
    // this.props.userGetById(this.props.match.params.id);
    this.props.userGetById(this.props.location.state.userObjFromCognito.sub);
    this.handleWindowResize();
  }

  componentWillUnmount(){
    // window.removeEventListener('load', this.handleWindowResize)
    // window.removeEventListener('resize', this.handleWindowResize);
    // window.removeEventListener('onbeforeunload', this.handleWindowResize)
  }
  
  handleWindowResize = () => {
    this.setState({
      headerHeight: this.headerTarget.clientHeight,
      footerHeight: this.footerTarget.clientHeight,
      contentHeight: (window.innerHeight - (this.headerTarget.clientHeight + this.footerTarget.clientHeight)),
      windowHeight: window.innerHeight,
      windowWidth: window.innerWidth
    })
  }
  
  createNewUser = (sub, username, name, email) => {
    let newCogUser = new CogUser(sub, username, name, email);
    console.log('newCogUser: ', newCogUser)
    let newUser = new User(newCogUser)
    console.log('newUser: ', newUser)
    // createAvatarFolder();
    // s3
    createAssetFoldersForUser(newUser.userId, 'avatar');
    createAssetFoldersForUser(newUser.userId, 'resume');
    // dynamo
    this.props.userCreateById(newUser)
  }
  
  renderContent(headerHeight, footerHeight){
    // let {
    //   auth: {
    //     currentUser,
    //     isSignedIn, isGettingCurrentUserById, errorMessageCurrentUserById
    //   }
    // } = this.props;
    let {
      dashboard
    } = ROUTES_REACT
    let {
      users: {
        userById,
        isGettingUserById, errorMessageGettingUserById,
        isCreatingUserById, errorMessageUserCreateById
      }
    } = this.props
    let {
      user: {
        userId,
        isProfileSetup
      }
    } = DM
    // console.log('@userSetup - in renderContent - above all conditionals - this.props - ', this.props)
    if(isCreatingUserById){
      const {
        title,
        classNameTxt
      } = CARD_TITLE_AUTH_CREATING_USER_BY_ID;
      return (
        <DefaultProcessingPage
          title={title}
          classNameTxt={classNameTxt}
        />
        // <div><h1>Creating</h1></div>
      )
    }
    // if(headerHeight === 0 || footerHeight === 0 || isGettingUserById){
    else if(isGettingUserById){
      const {
        title,
        classNameTxt
      } = CARD_TITLE_AUTH_GET_USER_BY_ID;
      // console.log('@userSetup - in renderContent - if: isGettingUserById: true', isGettingUserById)
      return (
        <DefaultLoadingPage 
          title={title}
          classNameTxt={classNameTxt}
        />
        // <div><h1>Getting</h1></div>
      )
    }
    else if(errorMessageGettingUserById || errorMessageUserCreateById){
      // console.log('@userSetup - in renderContent - Error')
      return (
        <DefaultErrorPage
          
        />
        // <div><h1>Errors</h1></div>
      )
    }
    else if(!isGettingUserById && userById === null){
      // console.log('@userSetup - in renderContent - else if (userById(current) === null): ', 'userById[userId]: ', this.props, this.props.location.state.userObjFromCognito, 'userById: ', userById)
      const {
        sub, username, name, email
      } = this.props.location.state.userObjFromCognito;
      this.createNewUser(sub, username, name, email);
      const {
        title,
        classNameTxt
      } = CARD_TITLE_AUTH_CREATING_USER_BY_ID;
      return (
        <DefaultProcessingPage
          title={title}
          classNameTxt={classNameTxt}
        />
      )
    }
    else if(!isGettingUserById && !isCreatingUserById && userById){
      if(userById[isProfileSetup] === false){
        // console.log('@userSetup - in renderContent - @GoToUserEdit: ', '!isGettingCurrentUserById (false): ', !isGettingUserById, 'currentUser[userId]: ', userById[userId], this.props)
        return (
          <UserEdit 
            {...this.props}
            currentUser={userById}
            cardStyle={{padding: '5.5rem 5.5rem'}}
          />
          // <div><h1>CurrentUser Exists, but Profile Not Setup - Go to User Edit</h1></div>
        )
      }
      else if(userById[isProfileSetup]){
        // console.log('@userSetup - in renderContent - @GoToDash: ', 'currentUser[isProfileSetup]: ', userById[isProfileSetup])
        //   console.log('user setup: go to dashboard')
          // const { user: { lastLogin }} = DM;
          // let dupUserObj = { ...userById };
          // dupUserObj[lastLogin] = new Date().toString();
          // this.props.userEditById(dupUserObj, ROUTES_REACT.dashboard, null)
          history.push(ROUTES_REACT.dashboard)
          const {
            title,
            classNameTxt
          } = CARD_TITLE_AUTH_GOING_TO_DASHBOARD;
          // console.log('@userSetup - in renderContent - if: isGettingUserById: true', isGettingUserById)
          return (
            <DefaultLoadingPage 
              title={title}
              classNameTxt={classNameTxt}
            />
            // <div><h1>CurrentUser Exists, Profile Setup, Moving to Dashboard!</h1></div>
        )
      }
    }
    // const { user: { lastLogin }} = DM;
    // let dupUserObj = { ...userById };
    // dupUserObj[lastLogin] = new Date().toString();
    // history.push(`${users_setup}/${userId}`, {userObjFromCognito: userObjFromCognito})
    // history.push(dashboard)
    
    // else if(!isGettingCurrentUserById && currentUser[isProfileSetup]){
    //   console.log('user setup: go to dashboard')
    //   const { user: { lastLogin }} = DM;
    //   let dupUserObj = { ...currentUser };
    //   dupUserObj[lastLogin] = new Date().toString();
    //   this.props.userEditById(dupUserObj, ROUTES_REACT.dashboard, null)
    //   return (
    //     // <UserEdit 
    //     //   {...this.props}
    //     //   cardStyle={{padding: '5.5rem 5.5rem'}}
    //     // />
    //     <div>Dashboard!</div>
    //   )
    // }
  }
  
  render(){
    const {
      headerHeight,
      contentHeight,
      footerHeight
    } = this.state;
    
    let contentWrapper = {
      marginTop: headerHeight,
      marginBottom: footerHeight,
      height: (contentHeight)
    }
    console.log('@userSetup - before renderContent: this.props - ', this.props)
    return (
      <main className="wrapper">
        <header ref={ node => { if(node !== null){this.headerTarget = node} }}>
          <HeaderApp />
        </header>
        <div className="grid grid--full">
          <div className="grid-cell">
            <div className="contentWrapper" 
              style={contentWrapper}
              ref={ node => { if(node !== null){this.contentTarget = node}}}
            >
              <ContentPageWithTitleBar
                content={this.renderContent(headerHeight, footerHeight)}
                sectionStyle={{ 
                  width: '80%',
                  marginLeft: 'auto',
                  marginRight: 'auto'
                }}
                sectionClass='content'
                titleBarContent={TITLE_BAR_USER_SETUP} 
              />
              
            </div>
          </div>
        </div>
        <footer ref={ node => { if(node !== null){this.footerTarget = node}}}>
          <Footer />
        </footer>
      </main>
    )
  }
}

function mapStateToProps(state){
  return {
    // auth: state.auth
    users: state.users
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({ userCreateById, userEditById, userGetById }, dispatch)
}
// getCurrentUserById, 
export default connect(mapStateToProps, mapDispatchToProps)(SetupUser);
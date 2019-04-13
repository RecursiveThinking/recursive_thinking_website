import React, {Component} from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { history } from '../../../index';

import { userGetById, userCreateById, userEditById } from '../../../actions/index'
import { FETCHING } from '../../../actions/action_types'

import HeaderApp from '../../../components/headerApp/headerApp';
import Footer from '../../../components/footer/footer'

import DefaultLoadingPage from '../../../components/defaults/loadingPage/loadingPage'

import ContentPageWithTitleBar from '../../../components/common/contentPage/contentPageWithTitleBar';
import { TITLE_BAR_USER_CREATE } from '../../../components/common/contentPage/contentPageTitleBarInfo'
// import { CARD_TITLE_SIGNING_IN } from '../../../components/common/content/contentInfo'

import { createAssetFoldersForUser } from '../../../functions/s3Methods'

import { ROUTES_REACT } from '../../../standards/routes'
import DM from '../../../standards/dictModel'

import { CogUser, User } from '../../../models/models'


class CreateUser extends Component {
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
    // // window.addEventListener('load', this.checkIfUserSetup)
    // window.addEventListener('resize', this.handleWindowResize);
    // window.addEventListener('onbeforeunload', this.handleWindowResize)
    // this.props.getAuthUserById(this.props.location.state.userObjForCognito.sub);
    this.props.userGetById(this.props.location.state.userObjFromCognito.sub);
    this.handleWindowResize();
  }

  componentDidUpdate(){
    // this.checkIfUserSetup();
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
  
  renderContent(headerHeight, footerHeight, contentWrapper){
    let {
      users: { 
        userById,
        isGettingUserById,
        isCreatingUserById
      }
    } = this.props
    
    // const {
    //   title
    // } = CARD_TITLE_SIGNING_IN
    console.log('@ userCreate comp @ renderContent Funcion: showing passed userObjForCognito passed from forms_auth',this.props.location.state.userObjForCognito)
    // else if(this.props.currentUser === FETCHING){
    if(isCreatingUserById){
      return (
        // <DefaultLoadingPage 
        //   title={title}
        //   classNameTxt='ta-cent'
        // />
        <div><h1>Creating</h1></div>
      )
    }
    else if(isGettingUserById){
      return (
        // <DefaultLoadingPage 
        //   title={title}
        //   classNameTxt='ta-cent'
        // />
        <div><h1>Getting</h1></div>
      )
    }
    // if(headerHeight === 0 || footerHeight === 0 || !this.props.currentUser.userId){
    // if(headerHeight === 0 || footerHeight === 0 || this.props.currentUser === null){
    else if(!isGettingUserById && userById === null){
      const {
        sub,
        username,
        name,
        email
      } = this.props.location.state.userObjFromCognito;
      this.createNewUser(sub, username, name, email)
      return (
        <div><h1>Got, None, Need to Create</h1></div>
        
        // <DefaultLoadingPage 
        //   title={title}
        //   classNameTxt='ta-cent'
        // />
      )
    }
    // else if(this.props.currentUser.userId && !this.props.currentUser.isProfileSetup){
    else if(!isGettingUserById && !isCreatingUserById && userById &&userById.isProfileSetup === false){
      const { currentUser } = this.props;
      console.log('user it not setup: go to userEdit')
      // history.push(`${ROUTES_REACT.users_setup}/${currentUser.userId}`)
      return (
        <div>
          Moving on to UserEdit!
        </div>
      )
    }
    // else if(this.props.currentUser.userId && this.props.currentUser.isProfileSetup){
    else if(!isGettingUserById && !isCreatingUserById && userById && userById.isProfileSetup){
      // console.log('user setup: go to dashboard')
      // const { user: { lastLogin }} = DM;
      // let dupUserObj = { ...this.props.currentUser };
      // dupUserObj[lastLogin] = new Date().toString();
      // this.props.userEditById(dupUserObj, ROUTES_REACT.dashboard, null)
      // history.push(ROUTES_REACT.dashboard)
      return (
        // <DefaultLoadingPage 
        //   title={title}
        //   classNameTxt='ta-cent'
        // />
        <div>Dashboard</div>
      )
    }
    else {
      return (
        <>
          Hopefully we never get here!
        </>
      )
    }
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
    
    console.log('props @ render: ', this.props, this.props.location.state.userObjFromCognito)
    
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
                {...this.props} 
                content={
                  this.renderContent(headerHeight, footerHeight, contentWrapper)
                }
                sectionStyle={{ 
                  width: '80%',
                  marginLeft: 'auto',
                  marginRight: 'auto'
                }}
                sectionClass='content'
                titleBarContent={TITLE_BAR_USER_CREATE} 
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
    // currentUser: state.auth.currentUser
    users: state.users
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({ userGetById, userCreateById, userEditById }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateUser);
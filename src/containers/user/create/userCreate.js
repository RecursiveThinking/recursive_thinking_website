import React, {Component} from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { history } from '../../../index';

import { createUser, getAuthUserById, getCurrentUserById } from '../../../actions/index'

import HeaderApp from '../../../components/headerApp/headerApp';
import Footer from '../../../components/footer/footer'

import DefaultLoadingPage from '../../../components/defaults/loadingPage/loadingPage'

import ContentPageTitleBar from '../../../components/common/contentPage/contentPageTitleBar';
import { TITLE_BAR_USER_CREATE } from '../../../components/common/contentPage/contentPageTitleBarInfo'

import { createAssetFoldersForUser } from '../../../functions/s3Methods'

import { ROUTES_REACT } from '../../../standards/routes'

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
    this.props.getAuthUserById(this.props.location.state.userInfo.attributes.sub);
    this.handleWindowResize();
  }

  componentDidUpdate(){
    this.checkIfUserSetup();
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
  
  // {
  //   attributes:
  //     email: "sethborne@gmail.com"
  //     email_verified: true
  //     name: "Seth Borne"
  //     sub: "b3cb6ece-b05d-4a22-b50f-1281d710e847"
  //   id: "us-west-2:063d1912-a95e-48ed-a09d-2af690fb8f0d"
  //   username: "sethborne"
  // }
  
  checkIfUserSetup = () => {
    const {
      attributes: {
        name,
        sub,
        email
      },
      username
    } = this.props.location.state.userInfo
    // not setup
    if(!this.props.currentUser.userId){
      const cogId = sub;
      const cogUsername = username;
      const cogName = name;
      const cogEmail = email
      let newCogUser = new CogUser(cogId, cogUsername, cogName, cogEmail)
      console.log('newCogUser: ', newCogUser)
      let newUser = new User(newCogUser)
      console.log('newUser: ', newUser)
      // create s3 buckets for user avatar/resume
      
      // // action creator - create user
      this.props.createUser(newUser)
        // .then(res => {
        //   console.log('will this log?')
        //   return res
        // })
        // .catch(err => err)
      createAssetFoldersForUser(newUser.userId, 'avatar');
      createAssetFoldersForUser(newUser.userId, 'resume')
    }
    else if(!this.props.currentUser.isProfileSetup){
      const {
        currentUser
      } = this.props
      history.push(`${ROUTES_REACT.users_setup}/${currentUser.userId}`)
      // , { setupUserId: currentUser.userId }
      console.log('current user', this.props.currentUser)
    }
    else if(this.props.currentUser.isProfileSetup){
      console.log('USER IS SETUP!')
      history.push(ROUTES_REACT.dashboard)
    }
  }
  
  renderContent(headerHeight, footerHeight){
    
    
    if(headerHeight === 0 || footerHeight === 0 || !this.props.currentUser.userId){
      return (
        <article style={{padding: '1.5rem 1.5rem'}}>
          <DefaultLoadingPage />
        </article>
      )
    } else {
      return (
        <article className="profileSetup">
        
        </article>
      )
    }
  }
  
  render(){
    console.log('this.props @ createUser: ', this.props.location.state.userInfo.attributes.sub)
    
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
              <ContentPageTitleBar content={TITLE_BAR_USER_CREATE} />
              {this.renderContent(headerHeight, footerHeight)}
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
    currentUser: state.auth.currentUser
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({ getAuthUserById, createUser, getCurrentUserById }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateUser);
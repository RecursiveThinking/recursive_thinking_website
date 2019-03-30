import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { history } from '../../index';

import { getCurrentUserById, editUserLastLogout } from '../../actions/';
import { FETCHING } from '../../actions/action_types';

import HeaderApp from '../../components/headerApp/headerApp';
import Footer from '../../components/footer/footer';

import { signOut } from '../../functions/authMethods';

import ContentPageWithTitleBar from '../../components/common/contentPage/contentPageWithTitleBar'
import { TITLE_BAR_SIGN_OUT } from '../../components/common/contentPage/contentPageTitleBarInfo'

import DefaultLoadingPage from '../../components/defaults/loadingPage/loadingPage';

// import { ROUTES_REACT } from '../../standards/routes';
// import DM from '../../standards/dictModel';

class SignOut extends Component {
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
    this.handleWindowResize();    
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
  
  renderContent(headerHeight, footerHeight){
    console.log('user signout: go back to index');
    this.props.editUserLastLogout(this.props.currentUser)
    return (
      <>
        <DefaultLoadingPage />
      </>
    )
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
    
    if(this.props.currentUser === FETCHING){
      // console.log('=========================')
      // console.log('User Is Fetching: ')
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
                titleBarContent={TITLE_BAR_SIGN_OUT}
                formContent={
                  <DefaultLoadingPage />
                }
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
                titleBarContent={TITLE_BAR_SIGN_OUT} 
                formContent={this.renderContent(headerHeight, footerHeight, contentWrapper)}
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
    currentUser: state.auth.currentUser
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({ getCurrentUserById, editUserLastLogout }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SignOut);
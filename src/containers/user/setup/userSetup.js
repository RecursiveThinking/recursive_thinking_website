import React, {Component} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { editUserById, getCurrentUserById } from '../../../actions/index'

import HeaderApp from '../../../components/headerApp/headerApp';
import Footer from '../../../components/footer/footer';

import DefaultLoadingPage from '../../../components/defaults/loadingPage/loadingPage';

import UserEdit from '../edit/userEdit';
import ContentPageTitleBar from '../../../components/common/contentPage/contentPageTitleBar';
import { TITLE_BAR_USER_SETUP } from '../../../components/common/contentPage/contentPageTitleBarInfo';

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
    this.props.getCurrentUserById();
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
  
  renderContent(headerHeight, footerHeight){
    if(headerHeight === 0 || footerHeight === 0 || !this.props.currentUser){
      return (
        <main>
          <article style={{padding: '1.5rem 1.5rem'}}>
            <ContentPageTitleBar content={TITLE_BAR_USER_SETUP} />
            <DefaultLoadingPage />
          </article>
        </main>
      )
    } else {
      return (
        <>
          <UserEdit 
            {...this.props}
            titleBarContent={TITLE_BAR_USER_SETUP}
            sectionStyle={{ 
              width: '80%',
              marginLeft: 'auto',
              marginRight: 'auto'
            }}
            cardStyle={{padding: '5.5rem 5.5rem'}}
          />
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
  return bindActionCreators({ getCurrentUserById, editUserById }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(SetupUser);
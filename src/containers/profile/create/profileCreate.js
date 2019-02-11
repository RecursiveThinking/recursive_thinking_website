import React, {Component} from 'react'

import HeaderApp from '../../../components/headerApp/headerApp';
import Footer from '../../../components/footer/footer'

import { ProfileFormEx } from '../../../components/forms/form_profile'
import ContentPageTitleBar from '../../../components/common/contentPage/contentPageTitleBar';
import { TITLE_BAR_USER_PROFILE_CREATE } from '../../../components/common/contentPage/contentPageTitleBarInfo'

class ProfileCreate extends Component {
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
    window.addEventListener('load', this.handleWindowResize)
    window.addEventListener('resize', this.handleWindowResize);
    window.addEventListener('onbeforeunload', this.handleWindowResize)
  }
  
  componentWillUnmount(){
    window.removeEventListener('load', this.handleWindowResize)
    window.removeEventListener('resize', this.handleWindowResize);
    window.removeEventListener('onbeforeunload', this.handleWindowResize)
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
  
  render(){
    const {
      headerHeight,
      contentHeight,
      footerHeight
    } = this.state;
    
    if(headerHeight === 0 || footerHeight === 0){
      return (
        <main className="wrapper">
          <header ref={ node => { if(node !== null){this.headerTarget = node}}}></header>
            Loading!!!
          <footer ref={ node => { if(node !== null){this.footerTarget = node}}}></footer>
        </main>
      )
    } else {
      // have info now pass
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
                {/* <article className="barFull bgColorDarkGreen pdTB5LR3 ta-cent">
                  <h3 className="fs33 fw500 ls30 fcWhite">Profile Setup</h3>
                </article> */}
                <ContentPageTitleBar content={TITLE_BAR_USER_PROFILE_CREATE} />
                <article className="profileSetup">
                  <ProfileFormEx />
                </article>
                <div className="barFull bgColorSiteGreen pdTB5LR3 ta-cent">
                  <button className="btn btnFillClrSchGreen00b371OutlineWhite fs24 fw500 ls16 pdTB3LR5 ttup">Save Changes</button>
                </div>
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
}

export default ProfileCreate;
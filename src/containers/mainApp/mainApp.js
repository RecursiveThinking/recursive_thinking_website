import React, { Component } from 'react';
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route } from "react-router-dom"

import HeaderApp from '../../components/headerApp/headerApp';
import Nav from '../nav/nav';
import Dash from '../dash/dash';
import ScheduledLessons from '../scheduledLessons/scheduledLessons';
import UnscheduledLessons from '../unscheduledLessons/unscheduledLessons';
import InterviewQuestions from '../interviewQuestions/interviewQuestions';
import RecursiveDirectory from '../recursiveDirectory/recursiveDirectory';
import ViewProfile from '../profile/view/profileView';
import EditProfile from '../../components/profile/edit/profileEdit';
import Footer from '../../components/footer/footer';

import { ROUTES_REACT } from '../../standards/routes'

const {
  dashboard,
  scheduledlessons,
  unscheduledlessons,
  interviewquestions,
  recursivedirectory,
  profile_edit,
  profile_view_id
} = ROUTES_REACT

export const ROUTES_NAV = [
  {
    path: dashboard,
    main: () => { return (<Dash />)}
  },
  {
    path: scheduledlessons,
    main: () => { return (<ScheduledLessons />)}
  },
  {
    path: unscheduledlessons,
    main: () => { return (<UnscheduledLessons />)}
  },
  {
    path: interviewquestions,
    main: () => { return (<InterviewQuestions />)}
  },
  {
    path: recursivedirectory,
    main: () => { return (<RecursiveDirectory />)}
  },
  {
    path: profile_edit,
    main: () => { return (<EditProfile />)}
  },
  {
    path: profile_view_id,
    main: (props) => { return (<ViewProfile {...props} />)}
  }
]

class MainApp extends Component {
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
    // console.log('window', window)
  }
  
  componentWillUnmount(){
    window.removeEventListener('load', this.handleWindowResize)
    window.removeEventListener('resize', this.handleWindowResize);
  }
  
  handleWindowResize = () => {
    // console.log('state b4', this.state)
    // console.log('headerTarget', this.headerTarget)
    // console.log('H', this.headerTarget.clientHeight, 'F', this.footerTarget.clientHeight, 'CH', this.contentTarget.clientHeight, 'WOH', window.innerHeight,'WIW', window.innerWidth)
    
    this.setState({
      headerHeight: this.headerTarget.clientHeight,
      footerHeight: this.footerTarget.clientHeight,
      navHeight:(window.innerHeight - (this.headerTarget.clientHeight + this.footerTarget.clientHeight)),
      contentHeight: (window.innerHeight - (this.headerTarget.clientHeight + this.footerTarget.clientHeight)),
      windowHeight: window.innerHeight,
      windowWidth: window.innerWidth
    })
    // console.log('state after', this.state)
  }
  
  render(){
    const {
      currentUser
    } = this.props;
    
    const renderContent = () => {
      const {
        headerHeight,
        contentHeight,
        footerHeight
      } = this.state
      
      if(!currentUser){
        return (
          <div>
            Loading!!!!
          </div>
        )
      } else if(headerHeight === 0 || footerHeight === 0){
        return (
          
          <div>
            <header ref={ node => { if(node !== null){this.headerTarget = node}}}>
            </header>
              Loading!!!
            <footer ref={ node => { if(node !== null){this.footerTarget = node}}}>
            </footer>
          </div>
        )
      } else {
        
        let navWrapper = {
          marginTop: headerHeight,
          height: (contentHeight),
        }
        let contentWrapper = {
          marginTop: headerHeight,
          marginBottom: footerHeight,
          height: (contentHeight),
        }
        return (
          <>
            <header ref={ node => { if(node !== null){this.headerTarget = node}}}>
              <HeaderApp  />
            </header>
            <Router>
              <div className="grid grid--185" >
                <div className="grid-cell">
                  <div className="navWrapper"
                    style={navWrapper}
                    ref={ node => { if(node !== null){this.navTarget = node}}}
                  >
                    <Nav />
                  </div>
                </div>
                <div className="grid-cell">
                  <div className="contentWrapper" 
                    style={contentWrapper}
                    ref={ node => { if(node !== null){this.contentTarget = node}}}
                  >
                    {
                      ROUTES_NAV.map((route, index) => (
                        <Route 
                          key={index}
                          path={route.path}
                          component={route.main}
                        />
                      ))
                    }
                  </div>
                </div>
              </div>
            </Router>
            <footer ref={ node => { if(node !== null){this.footerTarget = node}}}>
              <Footer />
            </footer>
          </>
        )
      }
    }
    return (
      <main className="wrapper">
        {renderContent()}
      </main>
    )
  }
}

function mapStateToProps(state){
  return {
    currentUser: state.auth.currentUser
  }
}

export default connect(mapStateToProps)(MainApp);
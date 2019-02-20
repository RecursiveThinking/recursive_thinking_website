import React, { Component } from 'react';
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route } from "react-router-dom"
// import { Router, Route } from 'react-router-dom'

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
import ContentPageWithTitleBar from '../../components/common/contentPage/contentPageWithTitleBar'
import { 
  TITLE_BAR_LESSONS_CREATE,
  TITLE_BAR_LESSONS_EDIT,
  TITLE_BAR_LESSONS_DELETE,
  TITLE_BAR_INTERVIEWQUESTIONS_CREATE, 
  TITLE_BAR_INTERVIEWQUESTIONS_EDIT, 
  TITLE_BAR_INTERVIEWQUESTIONS_DELETE, 
  TITLE_BAR_INTERVIEWQUESTIONS_ANSWERS_CREATE,
  TITLE_BAR_INTERVIEWQUESTIONS_ANSWERS_EDIT,
  TITLE_BAR_INTERVIEWQUESTIONS_ANSWERS_DELETE
} from '../../components/common/contentPage/contentPageTitleBarInfo'


// form Components
import LessonCreate from '../../components/forms/form_lessonCreate';
import LessonEdit from '../../components/forms/form_lessonEdit';
import LessonDelete from '../../components/forms/form_lessonDelete';

import InterviewQuestionCreate from '../../components/forms/form_interviewquestionCreate';
import InterviewQuestionEdit from '../../components/forms/form_interviewquestionEdit';
import InterviewQuestionDelete from '../../components/forms/form_interviewquestionDelete';

import InterviewQuestionAnswerCreate from '../../components/forms/form_interviewquestionanswerCreate'
import InterviewQuestionAnswerEdit from '../../components/forms/form_interviewquestionanswerEdit'
import InterviewQuestionAnswerDelete from '../../components/forms/form_interviewquestionanswerDelete'

import { ROUTES_REACT } from '../../standards/routes'

// action
import { getCurrentUserById } from '../../actions/index'

const {
  dashboard,
  scheduledlessons,
  unscheduledlessons,
  lessons_create,
  // lessons_edit,
  lessons_edit_id,
  lessons_delete_id,
  interviewquestions_create,
  // interviewquestions_edit,
  interviewquestions_edit_id,
  interviewquestions_delete_id,
  // interviewquestionsanswers_create,
  interviewquestionsanswers_create_id,
  // interviewquestionsanswers_edit,
  interviewquestionsanswers_edit_id,
  interviewquestionsanswers_delete_id,
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

export const REST_ROUTES_COMPONENTS = [
  {
    path: lessons_create,
    main: (props) => { return (
      <ContentPageWithTitleBar 
        {...props}
        titleBarContent={TITLE_BAR_LESSONS_CREATE}
        formContent={
          <LessonCreate />
        }
      />
    )}
  },
  {
    path: lessons_edit_id,
    main: (props) => { return (
      <ContentPageWithTitleBar 
        {...props} 
        formContent={
          <LessonEdit 
            {...props}
          />}
        titleBarContent={TITLE_BAR_LESSONS_EDIT}
      />
    )}
  },
  {
    path: lessons_delete_id,
    main: (props) => { return (
      <ContentPageWithTitleBar 
        {...props} 
        formContent={
          <LessonDelete 
            {...props}
          />}
        titleBarContent={TITLE_BAR_LESSONS_DELETE}
      />
    )}
  },
  {
    path: interviewquestions_create,
    main: (props) => { return (
      <ContentPageWithTitleBar 
        {...props}
        formContent={<InterviewQuestionCreate />}
        titleBarContent={TITLE_BAR_INTERVIEWQUESTIONS_CREATE}
      />
    )}
  },
  {
    path: interviewquestions_edit_id,
    main: (props) => { return (
      <ContentPageWithTitleBar 
        {...props} 
        formContent={
          <InterviewQuestionEdit 
            {...props}
          />}
        titleBarContent={TITLE_BAR_INTERVIEWQUESTIONS_EDIT}
      />
    )}
  },
  {
    path: interviewquestions_delete_id,
    main: (props) => { return (
      <ContentPageWithTitleBar 
        {...props} 
        formContent={
          <InterviewQuestionDelete 
            {...props}
          />}
        titleBarContent={TITLE_BAR_INTERVIEWQUESTIONS_DELETE}
      />
    )}
  },
  {
    path: interviewquestionsanswers_create_id,
    main: (props) => { return (
      <ContentPageWithTitleBar 
        {...props} 
        formContent={
          <InterviewQuestionAnswerCreate 
            {...props}
          />
        }
        titleBarContent={TITLE_BAR_INTERVIEWQUESTIONS_ANSWERS_CREATE}
      />
    )}
  },
  {
    path: interviewquestionsanswers_edit_id,
    main: (props) => { return (
      <ContentPageWithTitleBar 
        {...props} 
        formContent={
          <InterviewQuestionAnswerEdit 
            {...props}
          />
        }
        titleBarContent={TITLE_BAR_INTERVIEWQUESTIONS_ANSWERS_EDIT}
      />
    )}
  },
  {
    path: interviewquestionsanswers_delete_id,
    main: (props) => { return (
      <ContentPageWithTitleBar 
        {...props} 
        formContent={
          <InterviewQuestionAnswerDelete
            {...props}
          />}
        titleBarContent={TITLE_BAR_INTERVIEWQUESTIONS_ANSWERS_DELETE}
      />
    )}
  }
]

class MainApp extends Component {
  constructor(props){
    super(props)
    
    // console.log('init props', props)
    
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
    window.addEventListener('onbeforeunload', this.handleWindowResize)
    // console.log('compDidMount', this.props, 'state', this.state)
    this.props.getCurrentUserById();
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
      navHeight:(window.innerHeight - (this.headerTarget.clientHeight + this.footerTarget.clientHeight)),
      contentHeight: (window.innerHeight - (this.headerTarget.clientHeight + this.footerTarget.clientHeight)),
      windowHeight: window.innerHeight,
      windowWidth: window.innerWidth
    })
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
          
          <>
            <header ref={ node => { if(node !== null){this.headerTarget = node}}}>
            </header>
              Loading!!!
            <footer ref={ node => { if(node !== null){this.footerTarget = node}}}>
            </footer>
          </>
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
                          key={`RN_${index}`}
                          path={route.path}
                          component={route.main}
                        />
                      ))
                    }
                    {
                      REST_ROUTES_COMPONENTS.map((route, index) => (
                        <Route 
                          key={`RRC_${index}`}
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

export default connect(mapStateToProps, { getCurrentUserById })(MainApp);
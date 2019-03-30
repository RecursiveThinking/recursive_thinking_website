import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
// import { BrowserRouter as Route } from 'react-router-dom';

// action
import { getCurrentUserById } from '../../actions/index'

import HeaderApp from '../../components/headerApp/headerApp';
import Nav from '../nav/nav';
import Footer from '../../components/footer/footer';
// Containers
import Dash from '../dash/dash';
import ScheduledLessons from '../scheduledLessons/scheduledLessons';
import UnscheduledLessons from '../unscheduledLessons/unscheduledLessons';
import InterviewQuestions from '../interviewQuestions/interviewQuestions';
import RecursiveDirectory from '../recursiveDirectory/recursiveDirectory';
import UserView from '../user/view/userView';
import UserEdit from '../user/edit/userEdit';
import ContentPageWithTitleBar from '../../components/common/contentPage/contentPageWithTitleBar'
import {
  TITLE_BAR_USER_EDIT, 
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

// Components
import LessonCreate from '../lesson/create/lessonCreate';
import LessonEdit from '../lesson/edit/lessonEdit';
import LessonDelete from '../lesson/delete/lessonDelete';

import InterviewQuestionCreate from '../interviewQuestion/create/interviewQuestionCreate';
import InterviewQuestionEdit from '../interviewQuestion/edit/interviewQuestionEdit';
import InterviewQuestionDelete from '../interviewQuestion/delete/interviewQuestionDelete';

import InterviewQuestionAnswerCreate from '../interviewQuestionAnswer/create/interviewQuestionAnswerCreate'
import InterviewQuestionAnswerEdit from '../interviewQuestionAnswer/edit/interviewQuestionAnswerEdit'
import InterviewQuestionAnswerDelete from '../interviewQuestionAnswer/delete/interviewQuestionAnswerDelete'

import AdminPanel from '../adminPanel/adminPanel';

import SignOut from '../../containers/signOut/signOut'

import { ROUTES_REACT } from '../../standards/routes'

const {
  dashboard,
  scheduledlessons,
  unscheduledlessons,
  lessons_create,
  lessons_edit_id,
  lessons_delete_id,
  interviewquestions_create,
  interviewquestions_edit_id,
  interviewquestions_delete_id,
  interviewquestionsanswers_create_id,
  interviewquestionsanswers_edit_id,
  interviewquestionsanswers_delete_id,
  interviewquestions,
  recursivedirectory,
  users_edit,
  users_edit_id,
  users_view_id,
  admindashboard,
  signout
} = ROUTES_REACT

export let ROUTES_NAV = [
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
    path: users_edit,
    main: (props) => { return (<UserEdit 
      {...props} 
      titleBarContent={TITLE_BAR_USER_EDIT}
      sectionStyle={{padding: '1.5rem 1.5rem'}}
      cardStyle={{padding: '5.5rem 5.5rem'}}
    />)}
  },
  {
    path: users_view_id,
    main: (props) => { return (<UserView {...props} />)}
  },
  {
    path: admindashboard,
    main: (props) => { return (<AdminPanel />)}
  },
  {
    path: signout,
    main: (props) => { return (<SignOut />)}
  }
]

export const REST_ROUTES_COMPONENTS = [
  {
    path: lessons_create,
    main: (props) => { return (
      <ContentPageWithTitleBar 
        {...props}
        formContent={
          <LessonCreate />
        }
        titleBarContent={TITLE_BAR_LESSONS_CREATE}
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
        formContent={
          <InterviewQuestionCreate />
        }
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

    // this.headerTarget = React.createRef();
    // this.footerTarget = React.createRef(); 
    
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
    // window.addEventListener('onbeforeunload', this.handleWindowResize)
    this.props.getCurrentUserById();
    this.handleWindowResize();
  }
  
  componentWillUnmount(){
    window.removeEventListener('load', this.handleWindowResize)
    window.removeEventListener('resize', this.handleWindowResize);
    // window.removeEventListener('onbeforeunload', this.handleWindowResize)
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
        console.log('this.state; ', this.state)
        return (
          <>
            <header ref={ node => { if(node !== null){this.headerTarget = node}}}>
              <HeaderApp  />
            </header>
            {/* <Router> */}
              <div className="grid grid--185" >
                <div className="grid-cell">
                  <div className="navWrapper"
                    style={navWrapper}
                    // ref={ node => { if(node !== null){this.navTarget = node}}}
                  >
                    <Nav />
                  </div>
                </div>
                <div className="grid-cell">
                  <div className="contentWrapper" 
                    style={contentWrapper}
                    // ref={ node => { if(node !== null){this.contentTarget = node}}}
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
            {/* </Router> */}
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

function mapDispatchToProps(dispatch){
  return bindActionCreators({ getCurrentUserById }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(MainApp);
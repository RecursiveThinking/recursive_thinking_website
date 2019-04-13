import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
// /\-- Do not remove Router or the app breaks???

// action
// import { getCurrentUserById } from '../../actions/index'
import { getCurrentUserById, ranksGetAll } from '../../actions/index'

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
import ContentPageWithTitleBarUserEdit from '../user/edit/contentPageWithTitleBarUserEdit';
import ContentPageWithTitleBar from '../../components/common/contentPage/contentPageWithTitleBar'
import {
  TITLE_BAR_USER_EDIT,
  TITLE_BAR_USER_VIEW,
  TITLE_BAR_LESSONS,
  TITLE_BAR_INTERVIEWQUESTIONS,
  TITLE_BAR_RECURSIVE_DIRECTORY, 
  TITLE_BAR_LESSONS_CREATE,
  TITLE_BAR_LESSONS_EDIT,
  TITLE_BAR_LESSONS_DELETE,
  TITLE_BAR_INTERVIEWQUESTIONS_CREATE, 
  TITLE_BAR_INTERVIEWQUESTIONS_EDIT, 
  TITLE_BAR_INTERVIEWQUESTIONS_DELETE, 
  TITLE_BAR_INTERVIEWQUESTIONS_ANSWERS_CREATE,
  TITLE_BAR_INTERVIEWQUESTIONS_ANSWERS_EDIT,
  TITLE_BAR_INTERVIEWQUESTIONS_ANSWERS_DELETE,
  TITLE_BAR_ADMIN_PANEL
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

import DefaultLoadingPage from '../../components/defaults/loadingPage/loadingPage'

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
  // users_edit_id,
  users_view_id,
  admindashboard,
  signout
} = ROUTES_REACT

// export let ROUTES_NAV = [
//   {
//     path: dashboard,
//     main: () => { return (<Dash />)}
//   },
//   {
//     path: scheduledlessons,
//     main: () => { return (<ScheduledLessons />)}
//   },
//   {
//     path: unscheduledlessons,
//     main: (props) => { return (
//       <ContentPageWithTitleBar
//         {...props}
//         content={
//           <UnscheduledLessons
//             {...props}
//           />
//         }
//         sectionClass='content'
//         titleBarContent={TITLE_BAR_LESSONS}
//       />
//     )}
//   },
//   {
//     path: interviewquestions,
//     main: (props) => { return (
//       <ContentPageWithTitleBar
//         {...props}
//         content={
//           <InterviewQuestions
//             {...props}
//           />
//         }
//         sectionClass='content'
//         titleBarContent={TITLE_BAR_INTERVIEWQUESTIONS}
//       />
//     )}
//   },
//   {
//     path: recursivedirectory,
//     main: (props) => { return (
//       <ContentPageWithTitleBar
//         {...props}
//         content={
//           <RecursiveDirectory
//             {...props}
//           />
//         }
//         sectionClass='content'
//         titleBarContent={TITLE_BAR_RECURSIVE_DIRECTORY}        
//       />
//     )}
//   },
//   {
//     path: users_edit,
//     main: (props) => { return (
//       <ContentPageWithTitleBarUserEdit
//         {...props}
//         content={ 
//           <UserEdit
//             {...props}
//             cardStyle={{padding: '5.5rem 5.5rem'}}
//           />
//         }
//         sectionClass='content'
//         titleBarContent={TITLE_BAR_USER_EDIT}
//       />
//     )}
//   },
//   {
//     path: users_view_id,
//     main: (props) => { return (
//       <ContentPageWithTitleBar
//         {...props}
//         content={
//           <UserView 
//             {...props}
//           />
//         }
//         sectionClass=''
//         titleBarContent={TITLE_BAR_USER_VIEW}        
//       />
//     )}
//   },
//   {
//     path: admindashboard,
//     main: (props) => { return (
//       <ContentPageWithTitleBar
//         {...props}
//         content={
//           <AdminPanel />
//         }
//         sectionClass='content'
//         titleBarContent={TITLE_BAR_ADMIN_PANEL} 
//       />
//     )}
//   },
//   {
//     path: signout,
//     main: (props) => { return ( <SignOut /> )}
//   }
// ]

// export const REST_ROUTES_COMPONENTS = [
//   {
//     path: lessons_create,
//     main: (props) => { return (
//       <ContentPageWithTitleBar 
//         {...props}
//         content={
//           <LessonCreate />
//         }
//         sectionClass='content'
//         titleBarContent={TITLE_BAR_LESSONS_CREATE}
//       />
//     )}
//   },
//   {
//     path: lessons_edit_id,
//     main: (props) => { return (
//       <ContentPageWithTitleBar 
//         {...props} 
//         content={
//           <LessonEdit 
//             {...props}
//           />
//         }
//         sectionClass='content'
//         titleBarContent={TITLE_BAR_LESSONS_EDIT}
//       />
//     )}
//   },
//   {
//     path: lessons_delete_id,
//     main: (props) => { return (
//       <ContentPageWithTitleBar 
//         {...props} 
//         content={
//           <LessonDelete 
//             {...props}
//           />
//         }
//         sectionClass='content'
//         titleBarContent={TITLE_BAR_LESSONS_DELETE}
//       />
//     )}
//   },
//   {
//     path: interviewquestions_create,
//     main: (props) => { return (
//       <ContentPageWithTitleBar 
//         {...props}
//         content={
//           <InterviewQuestionCreate />
//         }
//         sectionClass='content'        
//         titleBarContent={TITLE_BAR_INTERVIEWQUESTIONS_CREATE}
//       />
//     )}
//   },
//   {
//     path: interviewquestions_edit_id,
//     main: (props) => { return (
//       <ContentPageWithTitleBar 
//         {...props} 
//         content={
//           <InterviewQuestionEdit 
//             {...props}
//           />
//         }
//         sectionClass='content'          
//         titleBarContent={TITLE_BAR_INTERVIEWQUESTIONS_EDIT}
//       />
//     )}
//   },
//   {
//     path: interviewquestions_delete_id,
//     main: (props) => { return (
//       <ContentPageWithTitleBar 
//         {...props} 
//         content={
//           <InterviewQuestionDelete 
//             {...props}
//         />}
//         sectionClass='content'        
//         titleBarContent={TITLE_BAR_INTERVIEWQUESTIONS_DELETE}
//       />
//     )}
//   },
//   {
//     path: interviewquestionsanswers_create_id,
//     main: (props) => { return (
//       <ContentPageWithTitleBar 
//         {...props} 
//         content={
//           <InterviewQuestionAnswerCreate 
//             {...props}
//           />
//         }
//         sectionClass='content'        
//         titleBarContent={TITLE_BAR_INTERVIEWQUESTIONS_ANSWERS_CREATE}
//       />
//     )}
//   },
//   {
//     path: interviewquestionsanswers_edit_id,
//     main: (props) => { return (
//       <ContentPageWithTitleBar 
//         {...props} 
//         content={
//           <InterviewQuestionAnswerEdit 
//             {...props}
//           />
//         }
//         sectionClass='content'        
//         titleBarContent={TITLE_BAR_INTERVIEWQUESTIONS_ANSWERS_EDIT}
//       />
//     )}
//   },
//   {
//     path: interviewquestionsanswers_delete_id,
//     main: (props) => { return (
//       <ContentPageWithTitleBar 
//         {...props} 
//         content={
//           <InterviewQuestionAnswerDelete
//             {...props}
//           />
//         }
//         sectionClass='content'
//         titleBarContent={TITLE_BAR_INTERVIEWQUESTIONS_ANSWERS_DELETE}
//       />
//     )}
//   }
// ]

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
    // this.props.auth.currentUser === undefined || 
    if(!this.props.auth.currentUser){
      this.props.getCurrentUserById();
    }
    if(!this.props.ranks.allRanks.length){
    // if(this.props.ranks.allRanks === undefined){
      this.props.ranksGetAll();
    }
    // if(!this.props.currentUser){
    //   this.props.getCurrentUserById();
    // }
    this.handleWindowResize();
  }
  
  componentDidUpdate(prevProps, prevState, snapshot){
    if(this.state.headerHeight !== prevState.headerHeight){
      this.handleWindowResize();
    }
    if(this.state.footerHeight !== prevState.footerHeight){
      this.handleWindowResize();
    }
    if(this.state.contentHeight !== prevState.contentHeight){
      this.handleWindowResize();
    }
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
  
  renderContent = () => {
    const {
      headerHeight,
      contentHeight,
      footerHeight
    } = this.state
    
    // if(headerHeight === 0 || footerHeight === 0){
    let {
      auth: {
        isGettingCurrentUserById, errorMessageCurrentUserById
      },
      ranks: {
        isFetchingRanksGetAll, errorMessageRanksGetAll
      }
    } = this.props
    // isGettingCurrentUserById = true;
    // isFetchingRanksGetAll = true;
    if(!headerHeight && !contentHeight && !footerHeight){
      return (
        <div>Loading</div>
      )
    }
    else if(isGettingCurrentUserById || isFetchingRanksGetAll){
      let contentWrapper = {
        marginTop: headerHeight,
        marginBottom: footerHeight,
        height: (contentHeight),
      }
      return (
        <>
          <div style={contentWrapper}>
            <div style={{ padding: '1rem' }}>
              <DefaultLoadingPage 
                title='Loading App'
                classNameTxt='ta-cent'
              />
            </div>
          </div>
        </>
      )
    } 
    // else if(!isGettingCurrentUserById){
    else if(!isGettingCurrentUserById && !isFetchingRanksGetAll){
      
      let navWrapper = {
        marginTop: headerHeight,
        height: (contentHeight),
      }
      let contentWrapper = {
        marginTop: headerHeight,
        marginBottom: footerHeight,
        height: (contentHeight),
      }
      const {
        auth: { currentUser },
        ranks: { allRanks, lookupTableAllRanks }
      } = this.props
      console.log('who is current?: ', currentUser)
      let ROUTES_NAV = [
        {
          path: dashboard,
          main: () => { return (
            <Dash 
              currentUser={currentUser}
            />
          )}
        },
        {
          path: scheduledlessons,
          main: () => { return (
            <ScheduledLessons 
              currentUser={currentUser}
            />
          )}
        },
        {
          path: unscheduledlessons,
          main: (props) => { return (
            <ContentPageWithTitleBar
              {...props}
              content={
                <UnscheduledLessons
                  {...props}
                  currentUser={currentUser}
                />
              }
              sectionClass='content'
              titleBarContent={TITLE_BAR_LESSONS}
            />
          )}
        },
        {
          path: interviewquestions,
          main: (props) => { return (
            <ContentPageWithTitleBar
              {...props}
              content={
                <InterviewQuestions
                  {...props}
                  currentUser={currentUser}
                />
              }
              sectionClass='content'
              titleBarContent={TITLE_BAR_INTERVIEWQUESTIONS}
            />
          )}
        },
        {
          path: recursivedirectory,
          main: (props) => { return (
            <ContentPageWithTitleBar
              {...props}
              content={
                <RecursiveDirectory
                  {...props}
                  currentUser={currentUser}
                />
              }
              sectionClass='content'
              titleBarContent={TITLE_BAR_RECURSIVE_DIRECTORY}        
            />
          )}
        },
        {
          path: users_edit,
          main: (props) => { return (
            <ContentPageWithTitleBarUserEdit
              // {...props}
              content={ 
                <UserEdit
                  {...props}
                  currentUser={currentUser}
                  cardStyle={{padding: '5.5rem 5.5rem'}}
                />
              }
              sectionClass='content'
              titleBarContent={TITLE_BAR_USER_EDIT}
            />
          )}
        },
        {
          path: users_view_id,
          main: (props) => { return (
            <ContentPageWithTitleBar
              {...props}
              content={
                <UserView 
                  {...props}
                  currentUser={currentUser}
                />
              }
              sectionClass=''
              titleBarContent={TITLE_BAR_USER_VIEW}        
            />
          )}
        },
        {
          path: admindashboard,
          main: (props) => { return (
            <ContentPageWithTitleBar
              {...props}
              content={
                <AdminPanel 
                  currentUser={currentUser}
                />
              }
              sectionClass='content'
              titleBarContent={TITLE_BAR_ADMIN_PANEL} 
            />
          )}
        },
        {
          path: signout,
          main: (props) => { return ( <SignOut /> )}
        }
      ]
      
      const REST_ROUTES_COMPONENTS = [
        {
          path: lessons_create,
          main: (props) => { return (
            <ContentPageWithTitleBar 
              {...props}
              content={
                <LessonCreate 
                  currentUser={currentUser}
                />
              }
              sectionClass='content'
              titleBarContent={TITLE_BAR_LESSONS_CREATE}
            />
          )}
        },
        {
          path: lessons_edit_id,
          main: (props) => { return (
            <ContentPageWithTitleBar 
              {...props} 
              content={
                <LessonEdit 
                  {...props}
                  currentUser={currentUser}
                />
              }
              sectionClass='content'
              titleBarContent={TITLE_BAR_LESSONS_EDIT}
            />
          )}
        },
        {
          path: lessons_delete_id,
          main: (props) => { return (
            <ContentPageWithTitleBar 
              {...props} 
              content={
                <LessonDelete 
                  {...props}
                  currentUser={currentUser}
                />
              }
              sectionClass='content'
              titleBarContent={TITLE_BAR_LESSONS_DELETE}
            />
          )}
        },
        {
          path: interviewquestions_create,
          main: (props) => { return (
            <ContentPageWithTitleBar 
              {...props}
              content={
                <InterviewQuestionCreate 
                  currentUser={currentUser}
                />
              }
              sectionClass='content'        
              titleBarContent={TITLE_BAR_INTERVIEWQUESTIONS_CREATE}
            />
          )}
        },
        {
          path: interviewquestions_edit_id,
          main: (props) => { return (
            <ContentPageWithTitleBar 
              {...props} 
              content={
                <InterviewQuestionEdit 
                  {...props}
                  currentUser={currentUser}
                />
              }
              sectionClass='content'          
              titleBarContent={TITLE_BAR_INTERVIEWQUESTIONS_EDIT}
            />
          )}
        },
        {
          path: interviewquestions_delete_id,
          main: (props) => { return (
            <ContentPageWithTitleBar 
              {...props} 
              content={
                <InterviewQuestionDelete 
                  {...props}
                  currentUser={currentUser}
              />}
              sectionClass='content'        
              titleBarContent={TITLE_BAR_INTERVIEWQUESTIONS_DELETE}
            />
          )}
        },
        {
          path: interviewquestionsanswers_create_id,
          main: (props) => { return (
            <ContentPageWithTitleBar 
              {...props} 
              content={
                <InterviewQuestionAnswerCreate 
                  {...props}
                  currentUser={currentUser}
                />
              }
              sectionClass='content'        
              titleBarContent={TITLE_BAR_INTERVIEWQUESTIONS_ANSWERS_CREATE}
            />
          )}
        },
        {
          path: interviewquestionsanswers_edit_id,
          main: (props) => { return (
            <ContentPageWithTitleBar 
              {...props} 
              content={
                <InterviewQuestionAnswerEdit 
                  {...props}
                  currentUser={currentUser}
                />
              }
              sectionClass='content'        
              titleBarContent={TITLE_BAR_INTERVIEWQUESTIONS_ANSWERS_EDIT}
            />
          )}
        },
        {
          path: interviewquestionsanswers_delete_id,
          main: (props) => { return (
            <ContentPageWithTitleBar 
              {...props} 
              content={
                <InterviewQuestionAnswerDelete
                  {...props}
                  currentUser={currentUser}
                />
              }
              sectionClass='content'
              titleBarContent={TITLE_BAR_INTERVIEWQUESTIONS_ANSWERS_DELETE}
            />
          )}
        }
      ]
      
      // console.log('this.state; ', this.state)
      return (
        <>
          <div className="grid grid--185" >
              <div className="grid-cell">
                <div className="navWrapper"
                  style={navWrapper}
                  // ref={ node => { if(node !== null){this.navTarget = node}}}
                >
                  <Nav 
                    currentUser={currentUser}
                    lookupTableAllRanks={lookupTableAllRanks}
                    routes={ROUTES_NAV}
                  />
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
        </>
      )
    }
  }
  render(){
    return (
      <main className="wrapper">
        <header ref={ node => { if(node !== null){this.headerTarget = node}}}>
          <HeaderApp  />
        </header>
        {/* <Router> */}
          {this.renderContent()}
        {/* </Router> */}
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
    auth: state.auth,
    ranks: state.ranks
  }
}

function mapDispatchToProps(dispatch){
  // return bindActionCreators({ getCurrentUserById }, dispatch)
  return bindActionCreators({ getCurrentUserById, ranksGetAll }, dispatch)
}
// , ranksGetAll
export default connect(mapStateToProps, mapDispatchToProps)(MainApp);
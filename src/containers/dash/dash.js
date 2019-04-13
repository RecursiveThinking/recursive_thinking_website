import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { FETCHING } from '../../actions/action_types'
import { usersGetAll, lessonsGetAll } from '../../actions/index'
// , getCurrentUserById
import DefaultErrorPage from '../../components/defaults/errorPage/errorPage';
import DefaultErrorMessage from '../../components/defaults/errorMessage/errorMessage'
// import DefaultLoadingPage from '../../components/defaults/loadingPage/loadingPage';
import SecondaryLoadingPage from '../../components/defaults/loadingPage/secondaryLoadingPage';

import { 
  CARD_TITLE_DASHBOARD_PROFILE_STATISTICS,
  CARD_TITLE_DASHBOARD_UPCOMING_LESSON,
  CARD_TITLE_DASHBOARD_IM_ATTENDING,
  // CARD_TITLE_DASHBOARD_IM_ATTENDING
} from '../../components/common/content/contentInfo'

import DashboardProfileStatList from '../../components/dash/dashboardProfileStatList'
import UpComingLesson from '../../components/dash/upComingLesson'
import LessonsUserAttending from '../../components/dash/lessonsUserAttending'

import LessonMethods from '../../functions/lessonMethods'
import OrderMethods from '../../functions/orderMethods'

import DM from '../../standards/dictModel'

const { 
  user: { 
    profileStatsVisits, 
    profileStatsViewsGithub, 
    profileStatsViewsCodePen,
    profileStatsViewsPortfolio,
    profileStatsViewsLinkedIn,
    profileStatsViewsResume,
    lessonStatus
  }
} = DM;

class Dash extends Component {
  
  componentDidMount(){
    // this.props.getCurrentUserById();
    this.props.usersGetAll();
    this.props.lessonsGetAll();
  }
  
  renderStatList = () => {
    let {
      // auth: { 
      //   currentUser,
      //   isGettingCurrentUserById, errorMessageCurrentUserById
      // }
      currentUser,
    } = this.props;

    // if(isGettingCurrentUserById){
    //   return (
    //     <SecondaryLoadingPage 
    //       title={CARD_TITLE_DASHBOARD_PROFILE_STATISTICS.title}
    //       classNameTxt='width100P ta-cent'
    //     />
    //   )
    // }
    // else if(errorMessageCurrentUserById){
    //   return (
    //     <DefaultErrorMessage 
    //       heading='Current User By Id'
    //       // errorObj={errorsCurrentUser}
    //     />
    //   )
    // }
    // else if(!isGettingCurrentUserById){  
      const profileStats = [
        currentUser[profileStatsVisits],
        currentUser[profileStatsViewsGithub],
        currentUser[profileStatsViewsCodePen],
        currentUser[profileStatsViewsPortfolio],
        currentUser[profileStatsViewsLinkedIn],
        currentUser[profileStatsViewsResume]
      ]
      return (
        <DashboardProfileStatList userStats={profileStats} />
      )
    // }
  }
  
  renderUpComingLesson = () => {
    let {
      isFetchingUsersGetAll,
      errorMessageUsersGetAll,
      allUsers,
    } = this.props.users;
    let {
      isFetchingLessonsGetAll,
      errorMessageLessonsGetAll,
      scheduledLessons,
    } = this.props.lessons;
    
    if(isFetchingUsersGetAll || isFetchingLessonsGetAll){
      const {
        title
      } = CARD_TITLE_DASHBOARD_UPCOMING_LESSON
      return (
        <SecondaryLoadingPage 
          title={title}
          classNameTxt='width100P ta-cent'
        />
      )
    } 
    else if(errorMessageUsersGetAll || errorMessageLessonsGetAll){
      return (
        <DefaultErrorPage />
      )
    }
    else if(!isFetchingUsersGetAll || !isFetchingLessonsGetAll) {
      return (
        <UpComingLesson 
          upComingLessons={scheduledLessons}
          allUsersArr={allUsers}
        />
      )
    }
  }
  
  renderLessonsUserAttending = () => {
    let {
      // auth: { 
      //   currentUser,
      //   isGettingCurrentUserById, errorMessageCurrentUserById
      // },
      currentUser,
      users: {
        allUsers,
        isFetchingUsersGetAll, errorMessageUsersGetAll,
      },
      lessons: {
        scheduledLessons,
        isFetchingLessonsGetAll, errorMessageLessonsGetAll,
      }
    } = this.props;
    // if(isFetchingUsersGetAll || isFetchingLessonsGetAll || isGettingCurrentUserById){
    if(isFetchingUsersGetAll || isFetchingLessonsGetAll){
      const {
        title
      } = CARD_TITLE_DASHBOARD_IM_ATTENDING
      return (
        <SecondaryLoadingPage 
          title={title}
          classNameTxt='width100P ta-cent'
        />
      )
    } 
    // else if(errorMessageUsersGetAll || errorMessageLessonsGetAll || errorMessageCurrentUserById){
    else if(errorMessageUsersGetAll || errorMessageLessonsGetAll){
      return (
        <DefaultErrorPage />
      )
    }
    // else if(!isFetchingUsersGetAll && !isFetchingLessonsGetAll && !isGettingCurrentUserById) {
    else if(!isFetchingUsersGetAll && !isFetchingLessonsGetAll) {
      // turn this on to show default messages
      // scheduledLessons.length = 0
      // UpComing Lessons
      let lessonsAttending = OrderMethods.orderArrayByDateAscending(LessonMethods.getCurrentUserLessonsAttendingArray(currentUser[lessonStatus], scheduledLessons), 'date')
      // limit to the next three lessons
      if(lessonsAttending.length > 3){
        lessonsAttending.length = 3
      }
      return (
        <LessonsUserAttending 
          lessonsAttendingArr={lessonsAttending} 
        />
      )
    }
  }
  
  render(){
    const { 
      // auth: { 
      //   currentUser,
      //   isGettingCurrentUserById, errorMessageCurrentUserById
      // },
      currentUser,
      lessons: {
        scheduledLessons, 
      }
    } = this.props;
    
    // if(isGettingCurrentUserById){
    //   return (
    //     <div>Getting User</div>
    //   )
    // } 
    // else 
    // if(!isGettingCurrentUserById) {
      // make an array of profileStats
      
      // turn this on to show default messages
      // scheduledLessons.length = 0
      // UpComing Lessons
      // let lessonsAttending = OrderMethods.orderArrayByDateAscending(LessonMethods.getCurrentUserLessonsAttendingArray(currentUser[lessonStatus], scheduledLessons), 'date')

      // console.log('upcoming: ', lessonsAttending)

      return (
        // <div>Dashboard</div>
        <main className="content">
          <div className="grid grid--full">
            <div className="grid-cell">
              {/* in this cell goes dashboardProfileStatList */}
              {/* recives profilesStats as props */}
              {this.renderStatList()}
            </div>
          </div>
          <div className="grid grid--1of2">
            <div className="grid-cell">
              {/* in this cell goes the next upcoming lesson */}
              {this.renderUpComingLesson()}
            </div>
            <div className="grid-cell">
              {/* in this cell goes a list of the next three lessons the user is attending  */}
              {this.renderLessonsUserAttending()}
              {/* <LessonsUserAttending lessonsAttendingArr={lessonsAttending} /> */}
            </div>
          </div>
        </main>
      )
    // }
  }
}
// errorsCurrentUser, errorsGetAllUsers, errorsGetAllLessons
function mapStateToProps(state){
  return {
    // currentUser: state.auth.currentUser,
    // auth: state.auth,
    users: state.users,
    lessons: state.lessons,
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({usersGetAll, lessonsGetAll}, dispatch);
}
// , getCurrentUserById
export default connect(mapStateToProps, mapDispatchToProps)(Dash);
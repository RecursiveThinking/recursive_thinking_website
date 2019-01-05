import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchLessons, fetchUsers, FETCHING } from '../../actions/index'

import ScheduledLessonsList from '../../components/scheduledLessons/scheduledLessonsList'
import SelectedLessonDetail from '../../components/scheduledLessons/selectedLessonDetail'
import DefaultErrorPage from '../../components/defaults/errorPage/errorPage'
import DefaultLoadingPage from '../../components/defaults/loadingPage/loadingPage'
class ScheduledLessons extends Component {
  constructor(props){
    super(props)
    
    this.state = {
      isComponentLoading: true
    }
  }
  
  componentDidMount(){
    this.props.fetchLessons();
    this.props.fetchUsers();
  }

  // shouldComponentUpdate(nextProps, nextState){
  //   console.log('Status SCU', 'this.props', this.props, 'nextProps', nextProps, 'this.state', this.state, 'nextState', nextState)
  //   console.log('testcond - props not eq', this.props !== nextProps)
  //   console.log('testcond - state not eq', this.state.isComponentLoading !== nextState.isComponentLoading)
  //   console.log('test conditional all not eq ICL true', this.props !== nextProps || this.state !== nextState)
  //   console.log('curr state Loading val', this.state.isComponentLoading)
  //   if(this.props === nextProps && this.state !== nextState){
  //     console.log('ret - true')
  //     return true
  //   }
  //   else{  
  //     console.log('ret - false')
  //     return false
  //   }
  // }
  
  // UNSAFE_componentWillUpdate(nextProps, nextState){
  //   console.log('HIT COMP WILL UPDATE')
  //   console.log('Status CDU', 'this.props', this.props, 'nextProps', nextProps, 'this.state', this.state, 'nextState', nextState)
  //   console.log('testcond - props eq', this.props === nextProps)
  //   console.log('test conditional all eq', this.props === nextProps)
  //   console.log('CDU - isCompLoading', this.state.isComponentLoading)
  //   console.log('test conditional', this.props === nextProps && this.state.isComponentLoading === true)
  //   console.log('nextState', nextState)
  //   if(this.props === nextProps && this.state.isComponentLoading === true){
  //     console.log('now can update state')
  //     console.log('state before', this.state.isComponentLoading)
  //     this.setState({isComponentLoading: false}, () => console.log('state after', this.state.isComponentLoading))
  //   }
  // }
  // componentDidUpdate(prevProps, prevState){
  //   console.log('HIT COMP DID UPDATE')
  //   console.log('Status CDU', 'this.props', this.props, 'prevProps', prevProps, 'this.state', this.state, 'prevState', prevState)
  //   console.log('testcond - props eq', this.props === prevProps)
  //   console.log('test conditional all eq', this.props === prevProps)
  //   console.log('CDU - isCompLoading', this.state.isComponentLoading)
  //   console.log('test conditional', this.props === prevProps && this.state.isComponentLoading === true)
  //   console.log('nextState', prevState)
  //   if(this.props === prevProps && this.state.isComponentLoading === true){
  //     console.log('now can update state')
  //     console.log('state before', this.state.isComponentLoading)
  //     this.setState({isComponentLoading: false}, () => console.log('state after', this.state.isComponentLoading))
  //   }
      
  // }
  
  render(){
    
    const { 
      currentUser, 
      selectedLesson, 
      scheduledLessons, 
      allUsers,
      allLessonsAPIResponse,
      allLessons
    } = this.props;
    const {
      isComponentLoading
    } = this.state;
    
    // console.log('=====================================')
    // console.log('this.props (RENDER)', this.props, 'this.state', this.state)
    // // scheduledLessons = false;
    // console.log('=====================================')
    
    if(!allUsers || !scheduledLessons ){
      return (
        <main className="content">
          <DefaultErrorPage />
        </main>
      )
    }
    else if(allUsers && allLessonsAPIResponse === FETCHING || scheduledLessons && allLessonsAPIResponse === FETCHING){
      return (
        <main className="content">
          <DefaultLoadingPage />
        </main>
      )
    }
    else {
      // scheduledLessons.length = 0;
      return (
        <main className="content">
          <div className="grid grid--1of3">
            <div className="grid-cell">
              <ScheduledLessonsList currentUser={currentUser} scheduledLessons={scheduledLessons} />
            </div>
            <div className="grid-cell">
              <SelectedLessonDetail currentUser={currentUser} selectedLesson={selectedLesson} allUsers={allUsers} scheduledLessons={scheduledLessons}/>
            </div>
          </div>
        </main>
      )
    }
  }
}

function mapStateToProps(state){
  return {
    currentUser: state.currentUser,
    allUsers: state.users.allUsers,
    allLessons: state.lessons.allLessons,
    allLessonsAPIResponse: state.lessons.allLessonsAPIResponse,
    scheduledLessons: state.lessons.scheduledLessons,
    selectedLesson: state.selectedLesson
  }
}

// function mapDispatchToProps(dispatch){
//   return bindActionCreators({fetchAllLessons: fetchAllLessons}, dispatch)
// }

export default connect(mapStateToProps, { fetchLessons, fetchUsers })(ScheduledLessons);
// export default connect(mapStateToProps, mapDispatchToProps)(ScheduledLessons);

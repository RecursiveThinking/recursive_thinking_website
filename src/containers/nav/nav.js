import React, {Component} from 'react';
import { connect } from 'react-redux'
import { BrowserRouter as Route} from 'react-router-dom'
import { NavLink } from 'react-router-dom'

import { fetchUsers } from '../../actions'

import { ROUTES_NAV } from '../mainApp/mainApp'
import AdminPanel from '../adminPanel/adminPanel'

import DM from '../../standards/dictModel'
import { ROUTES_REACT } from '../../standards/routes'
import { PATH_FOR_IMAGES } from '../../standards/publicPaths'

const {
  dashboard,
  scheduledlessons,
  unscheduledlessons,
  interviewquestions,
  recursivedirectory,
  profile_edit,
  admindashboard,
  signout
} = ROUTES_REACT;

const { 
  user: { 
    avatar, 
    name, 
    title, 
    admin 
  }
} = DM;

class Nav extends Component {
  
  render(){
    // destructure currentUser off props
    const { currentUser } = this.props;
    
    if(!currentUser){
      console.log('No Current User')
      return (
        <div>Loading... </div>
      )
    }
    // console.log('currUser - Nav', currentUser)
    // construct image path string
    const userPicturePath = `${PATH_FOR_IMAGES}${currentUser[avatar]}`;
    
    const NAV_BAR = [
      // class, id, Title, icon class
      [ 'sidebar-item', dashboard, 'Dashboard', 'fa fa-tachometer fs20'],
      [ 'sidebar-item', scheduledlessons, 'Scheduled Lessons', 'fa fa-calendar fs20'],
      [ 'sidebar-item', unscheduledlessons, 'Vote For Lessons', 'fa fa-thumbs-up fs20'],
      [ 'sidebar-item', interviewquestions, 'Interview Prep', 'fa fa-object-group fs20'],
      [ 'sidebar-item', recursivedirectory, 'Recursive Directory', 'fa fa-address-book-o fs20'],
      [ 'sidebar-item', profile_edit, 'Edit Profile', 'fa fa-user fs20'],
      // [ 'sidebar-item', signout, 'Sign Out', 'fa fa-sign-out fs24']
    ]
    if(this.props.currentUser[admin] === true){
      NAV_BAR.push([ 'sidebar-item', admindashboard, 'Admin Panel', 'fa fa-lock fs20'])
      ROUTES_NAV.push({
        path: admindashboard,
        main: () => { return (<AdminPanel />)}
      })
    }
    
    // return <div className="grid grid--full lg-grid--fit">
    let allMenuItems = NAV_BAR.map((item, index) => {
      return (
        <NavLink key={index} to={item[1]} activeClassName="active">
          <article  className={item[0]}>
            <h6 className="fs14 fw500 ls18 ttup fcWhite">{item[2]}</h6>
            <span><i className={item[3]}></i></span>
          </article>
        </NavLink>
      )
    })
    
    // console.log('currentUser @ Nav', currentUser)
    
    return (
      <nav className="navMain">
        {/* <aside id="sidebar" className="sidebar" style="visibility:hidden"> */}
        <aside id="sidebar" className="sidebar fc--disp-flex fc--fdir-col">
          <article>
            <div className="fc-devInfo fc--disp-flex fc--fdir-col fc--aItem-ce">
              <img className="sidebarImage avatarS avatarBS" src={userPicturePath} alt={currentUser[name]}/>
              <h5 className="devName fs24 fw300 ls14 ta-cent">{currentUser[name]}</h5>
              <h6 className="devTitle fs16 fw100 fcWhite ls10 ta-cent">{currentUser[title]}</h6>
            </div>
          </article>
          <div className="sidebarLinksContainer fc--disp-flex fc--fdir-col">
            {allMenuItems}
            {/* <NavLink key={allMenuItems.length} to={signout} activeClassName="active" aria-current="true"> */}
            <a href="/">
              <article  className="sidebar-item">
                <h6 className="fs14 fw500 ls18 ttup fcWhite">Sign Out</h6>
                <span><i className="fa fa-sign-out fs24"></i></span>
              </article>
            </a>
            {/* </NavLink> */}
            {/* MAP ROUTES */}
            {
              ROUTES_NAV.map((route, index) => (
                <Route
                  key={index}
                  path={route.path}
                />
              ))
            }
            <Route key={ROUTES_NAV.length} path={signout} />
          </div>
        </aside>
      </nav>
    )
  }
}

// map state to props
function mapStateToProps(state){
  return {
    currentUser: state.auth.currentUser
  }
}

// connect react/redux
export default connect(mapStateToProps, { fetchUsers })(Nav)
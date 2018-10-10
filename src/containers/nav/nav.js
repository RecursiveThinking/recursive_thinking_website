import React, {Component} from 'react';
import { connect } from 'react-redux'
import { BrowserRouter as Route, Link} from 'react-router-dom'

import { ROUTES_NAV } from '../navAndContent/navAndContent'



import DM from '../../standards/dictModel'

class Nav extends Component {
  render(){
    // destructure currentUser off props
    const { currentUser } = this.props;
    const { user: { avatar, name, title, admin }} = DM;
    // construct image path string
    const userPicturePath = `../../../public/images/${currentUser[avatar]}`;
    
    const NAV_BAR = [
      // class, id, Title, icon class
      [ 'sidebar-item', '/dashboard', 'Dashboard', 'fa fa-tachometer fs24'],
      [ 'sidebar-item', '/schedLessons', 'Scheduled Lessons', 'fa fa-calendar fs24'],
      [ 'sidebar-item', '/unSchedLessons', 'Vote For Lessons', 'fa fa-thumbs-up fs24'],
      [ 'sidebar-item', '/interviewQuestions', 'Interview Prep', 'fa fa-object-group fs24'],
      [ 'sidebar-item', '/recursiveDirectory', 'Recursive Directory', 'fa fa-address-book-o fs24'],
      [ 'sidebar-item', '/editProfile', 'Edit Profile', 'fa fa-user fs24'],
      // ,
    ]
    if(this.props.currentUser['admin'] === true){
      NAV_BAR.push([ 'sidebar-item', '/adminDash', 'Admin Panel', 'fa fa-lock fs24'])
    }
    
    // return <div className="grid grid--full lg-grid--fit">
    let allMenuItems = NAV_BAR.map((item, index) => {
      return (
        <Link to={item[1]}>
          <article key={index} className={item[0]}>
            <h6 className="sidebarTitle">{item[2]}</h6>
            <span><i className={item[3]}></i></span>
          </article>
        </Link>
      )
    })
    return (
      <nav className="navMain">
        {/* <aside id="sidebar" className="sidebar" style="visibility:hidden"> */}
        <aside id="sidebar" className="sidebar fc--disp-flex fc--fdir-col">
          <article>
            <div className="fc-devInfo fc--disp-flex fc--fdir-col fc--aItem-ce">
              <img className="sidebarImage avatarS avatarBS" src={userPicturePath} />
              <h2 className="devName fs24 fw300 ls14 ta-cent">{currentUser[name]}</h2>
              <h3 className="devTitle fs16 fw100 fcWhite ls10 ta-cent">{currentUser[title]}</h3>
            </div>
          </article>
          <div className="sidebarLinksContainer fc--disp-flex fc--fdir-col">
            {allMenuItems}
            <Link to="/signout">
              <article key={allMenuItems.length} className="sidebar-item">
                <h6 className="sidebarTitle">Sign Out</h6>
                <span><i className="fa fa-sign-out fs24"></i></span>
              </article>
            </Link>
            {/* MAP ROUTES */}
            {
              ROUTES_NAV.map((route, index) => (
                <Route
                  key={index}
                  path={route.path}
                />
              ))
            }
            <Route key={ROUTES_NAV.length} path="/signout" />
          </div>
        </aside>
      </nav>
    )
  }
}

// map state to props
function mapStateToProps(state){
  return {
    currentUser: state.currentUser
  }
}

// connect react/redux
export default connect(mapStateToProps)(Nav)
import React, {Component} from 'react';
import { connect } from 'react-redux'

// destructure currentUser off props
class Nav extends Component {
  render(){
    // construct image path string
    const userPicturePath = `../../../public/images/${this.props.currentUser.avatar}`;
    
    const NAV_BAR = [
      // class, id, Title, icon class
      [ 'sidebar-item', 'dashboard', 'Dashboard', 'fa fa-tachometer fs24'],
      [ 'sidebar-item', 'scheduled-lessons', 'Scheduled Lessons', 'fa fa-calendar fs24'],
      [ 'sidebar-item', 'unscheduled-lessons', 'Vote For Lessons', 'fa fa-thumbs-up fs24'],
      [ 'sidebar-item', 'interview-prep', 'Interview Prep', 'fa fa-object-group fs24'],
      [ 'sidebar-item', 'recursive-directory', 'Recursive Directory', 'fa fa-address-book-o fs24'],
      [ 'sidebar-item', 'edit-profile', 'Edit Profile', 'fa fa-user fs24'],
      // [ 'sidebar-item', 'home', 'Home Screen', 'fa fa-home fs24'],
      [ 'sidebar-item', 'sign-out', 'Sign Out', 'fa fa-sign-out fs24'],
      [ 'sidebar-item', 'admin-panel', 'Admin Panel', 'fa fa-lock fs24'],
    ]
    // return <div className="grid grid--full lg-grid--fit">
    let allMenuItems = NAV_BAR.map(item => {
      if(item[2] ==='Admin Panel'){
        if(this.props.currentUser['admin'] === true){
          return (
            <article className={item[0]} data-pageid={item[1]}>
              <h6 className="sidebarTitle">{item[2]}</h6>
              <span><i className={item[3]}></i></span>
            </article>
          )
        }
      }
      else {      
        return (
          <article className={item[0]} data-pageid={item[1]}>
            <h6 className="sidebarTitle">{item[2]}</h6>
            <span><i className={item[3]}></i></span>
          </article>
        )
      }
    })
    
    return <div className="grid-cell">
      <nav className="navMain">
        {/* <aside id="sidebar" className="sidebar" style="visibility:hidden"> */}
        <aside id="sidebar" className="sidebar fc--disp-flex fc--fdir-col">
          <article>
            <div className="fc-devInfo fc--disp-flex fc--fdir-col fc--aItem-ce">
              <img className="sidebarImage avatarS avatarBS" src={userPicturePath} />
              <h2 className="devName fs24 fw300 ls14 ta-cent">{this.props.currentUser.name}</h2>
              <h3 className="devTitle fs16 fw100 fcWhite ls10 ta-cent">{this.props.currentUser.title}</h3>
            </div>
          </article>
          <div className="sidebarLinksContainer fc--disp-flex fc--fdir-col">
            {allMenuItems}

          </div>
        </aside>
      </nav>
    </div>
    {/* </div> */}
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

{/* <article className="sidebar-item" data-pageid="dashboard">
  <h6 className="sidebarTitle">Dashboard</h6>
  <span><i className="fa fa-tachometer fs24"></i></span>
</article>
<article className="sidebar-item" data-pageid="upcoming-lessons">
  <h6 className="sidebarTitle">Upcoming Lessons</h6>
  <span><i className="fa fa-calendar fs24"></i></span>
</article>
<article id="btnSidebarVoteLessons" className="sidebar-item" data-pageid="vote-for-lessons">
  <h6 className="sidebarTitle">Vote For Lessons</h6>
  <span><i className="fa fa-thumbs-up fs24"></i></span>
</article>
<article id="btnSidebarInterviewPrep" className="sidebar-item" data-pageid="interview-prep">
  <h6 className="sidebarTitle">Interview Prep</h6>
  <span><i className="fa fa-object-group fs24"></i></span>
</article>
<article className="sidebar-item" data-pageid="recursive-directory">
  <h6 className="sidebarTitle">Recursive Directory</h6>
  <span><i className="fa fa-address-book-o fs24"></i></span>
</article>
<article className="sidebar-item" data-pageid="edit-profile">
  <h6 className="sidebarTitle">Edit Profile</h6>
  <span><i className="fa fa-user fs24"></i></span>
</article>
<article className="sidebar-item home" data-pageid="home">
  <h6 className="sidebarTitle">Home Screen</h6>
  <span><i className="fa fa-home fs24"></i></span>
</article>
<article className="sidebar-item" data-pageid="sign-out">
  <h6 className="sidebarTitle">Sign Out</h6>
  <span><i className="fa fa-sign-out fs24"></i></span>
</article> */}
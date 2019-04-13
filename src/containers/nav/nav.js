import React, {Component} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import { BrowserRouter as Route} from 'react-router-dom'
import { NavLink } from 'react-router-dom'

// import { ranksGetAll } from '../../actions'

// import { ROUTES_NAV } from '../mainApp/mainApp'
import { ROUTES_REACT } from '../../standards/routes'
import { PUBLIC_S3_URL } from '../../standards/publicPaths'
// import { PUBLIC_S3_URL } from '../../functions/s3Methods'

import DM from '../../standards/dictModel'
// import { FETCHING } from '../../actions/action_types';

const {
  dashboard,
  scheduledlessons,
  unscheduledlessons,
  interviewquestions,
  recursivedirectory,
  users_edit,
  // users_edit_id,
  admindashboard,
  signout
} = ROUTES_REACT;

const { 
  user: { 
    userId,
    avatar, 
    name, 
    title, 
    admin,
    rank 
  }
} = DM;

class Nav extends Component {
  componentDidMount(){
    // this.props.getCurrentUserById();
    // if(!this.props.ranks.allRanks.length){
    //   this.props.ranksGetAll();
    // }
  }
  render(){
    // const {
    //   ranks: { isFetchingRanksGetAll }
    // } = this.props;
    // if(isFetchingRanksGetAll){
    //   return (
    //     <div>Loading</div>
    //   )
    // }
    // else if(!isFetchingRanksGetAll && this.props.currentUser){
      const { 
        currentUser,
        ranks: { lookupTableAllRanks },
        // lookupTableAllRanks,
        routes
      } = this.props;
      
      console.log('props @ nav: ', this.props)
      
      const userPicturePath = `${PUBLIC_S3_URL}${currentUser[userId]}/avatar/${currentUser[avatar]}`;

      const NAV_BAR = [
        // class, id, Title, icon class
        [ 'sidebar-item', dashboard, 'Dashboard', 'fa fa-tachometer fs20'],
        [ 'sidebar-item', scheduledlessons, 'Scheduled Lessons', 'fa fa-calendar fs20'],
        [ 'sidebar-item', unscheduledlessons, 'Vote For Lessons', 'fa fa-thumbs-up fs20'],
        [ 'sidebar-item', interviewquestions, 'Interview Prep', 'fa fa-object-group fs20'],
        [ 'sidebar-item', recursivedirectory, 'Recursive Directory', 'fa fa-address-book-o fs20'],
        [ 'sidebar-item', users_edit, 'Edit Profile', 'fa fa-user fs20'],
      ]
      
      if(currentUser[admin] === true){
        NAV_BAR.push([ 'sidebar-item', admindashboard, 'Admin Panel', 'fa fa-lock fs20'])
      }
    
      let allMenuItems = NAV_BAR.map((item, index) => {
        return (
          <NavLink key={index} to={item[1]}>
            <article  className={item[0]}>
              <h6 className="fs14 fw500 ls18 ttup fcWhite">{item[2]}</h6>
              <span><i className={item[3]}></i></span>
            </article>
          </NavLink>
        )
      })
      // console.log('!isGettingCurrentUserById: ', !isGettingCurrentUserById, '!isFetchingRanksGetAll', !isFetchingRanksGetAll)
      // console.log('!isGettingCurrentUserById && !isFetchingRanksGetAll', !isGettingCurrentUserById && !isFetchingRanksGetAll)
      // console.log('currentUser: ', lookupTableAllRanks, currentUser[rank])
      console.log('before render: ', this.props)
      return (
        <nav className="navMain">
          <aside id="sidebar" className="sidebar fc--disp-flex fc--fdir-col">
            <article>
              <div className="fc-devInfo fc--disp-flex fc--fdir-col fc--aItem-ce">
                <img className="sidebarImage avatarS avatarBS" src={userPicturePath} alt={currentUser[name]}/>
                <div className="rankNav">
                  {/* <div className="fc--disp-flex fc--fdir-row fc--aItem-ce"> */}
                    <div className="rankNavTxt fs12 fw300 ls10 fcGrey424041 ta-cent">
                      {/* <i className="fa fa-circle rankIcon r01"></i> */}
                      {lookupTableAllRanks[currentUser[rank]].rank}
                      {/* <i className="fa fa-circle rankIcon r01"></i> */}
                    </div>
                  {/* </div> */}
                </div>
                <h5 className="devName fs24 fw300 ls14 ta-cent mt15">{currentUser[name]}</h5>
                <h6 className="devTitle fs16 fw100 fcWhite ls10 ta-cent">{currentUser[title]}</h6>
              </div>
            </article>
            <div className="sidebarLinksContainer fc--disp-flex fc--fdir-col">
              {allMenuItems}
              <NavLink key={allMenuItems.length} to={signout} activeClassName="active" aria-current="true">
                <article  className="sidebar-item">
                  <h6 className="fs14 fw500 ls18 ttup fcWhite">Sign Out</h6>
                  <span><i className="fa fa-sign-out fs24"></i></span>
                </article>
              </NavLink>
              {
                // ROUTES_NAV.map((route, index) => (
                  routes.map((route, index) => (
                  <Route
                    key={index}
                    path={route.path}
                  />
                ))
              }
              {/* <Route key={ROUTES_NAV.length} path={signout} /> */}
              <Route key={routes.length} path={signout} />
            </div>
          </aside>
        </nav>
      )
    // }
  }
}

// map state to props
function mapStateToProps(state){
  return {
    // auth: state.auth,
    ranks: state.ranks
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators( {  }, dispatch)
  // return bindActionCreators( { ranksGetAll }, dispatch)
}
// ranksGetAll
// connect react/redux
export default connect(mapStateToProps, mapDispatchToProps)(Nav)
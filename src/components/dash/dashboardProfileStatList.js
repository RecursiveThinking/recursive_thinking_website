import React from 'react';
import DashboardProfileStatListItem from './dashboardProfileStatListItem'

// import DM from '../../standards/dictModel'

const dashboardProfileStatList = ({...props}) => {
  // const { 
    // user: {
      // profileStatsVisits,
      // profileStatsViewsGithub,
      // profileStatsViewsCodePen,
      // profileStatsViewsPortfolio,
      // profileStatsViewsLinkedIn,
      // profileStatsViewsResume
    // }
  // } = DM;
  
  if(!props.userStats){
    return (
      <article className="card fc--disp-flex fc--fdir-col">
      {/* fcGreyb9 */}
        <h5 className="fw700 ls14 ttup fcGrey424041 mb10">Profile Statistics</h5>
        <h5 className="fw500 ls14 fcGrey424041 mt30 ta-cent">Uh Oh! There is not currently a Current User!</h5>
        <p className="fs18 fw300 ls12 fcGrey81 mt15 ta-cent">
        {/* fcGrey81 */}
          To submit a new lesson, please select Vote for Lessons from the Nav bar, then click "Submit a Lesson", located at the top of the page.
        </p>
    </article>
    )
  }
  const {
    userStats
  } = props
  
  // userStats[0] = -1;
  // userStats[1] = -1;
  // userStats[2] = -1;
  // userStats[3] = -1;
  // userStats[4] = -1;
  // userStats[5] = -1;
  
  // userStats[2] = 1;
  // userStats[4] = 5;
  
  
  const stats1 = [
    [userStats[0], 'Profile Visits', 'profileStatsVisits'],
    [userStats[1], 'GitHub Views', 'profileStatsViewsGithub'],
    [userStats[2], 'CodePen Views', 'profileStatsViewsCodePen']
  ]
  const stats2 = [
    [userStats[3], 'Portfolio Views', 'profileStatsViewsPortfolio'],
    [userStats[4], 'LinkedIn Views', 'profileStatsViewsLinkedIn'],
    [userStats[5], 'Resume Views', 'profileStatsViewsResume']
  ]
  
  const firstThree = stats1.map( (stat, index) => {
      return (
        <li key={stat[2]} className="grid-cell">
          <DashboardProfileStatListItem stat={stat} />
        </li>
      )
    }
  )
  const lastThree = stats2.map( (stat) => {
      return (
        <li key={stat[2]} className="grid-cell">
          <DashboardProfileStatListItem stat={stat} />
        </li>
      )
    }
  )
  return (
    <article className="card fc--disp-flex fc--fdir-col">
      {/* fcGreyb9 */}
      <h5 className="fw700 ls14 ttup fcGrey424041 mb10">Profile Statistics</h5>
      <ul className="grid gutters grid--cols-3">
        {firstThree}
      </ul>
      <ul className="grid gutters grid--cols-3">
        {lastThree}
      </ul>
    </article>
  )
}

export default dashboardProfileStatList
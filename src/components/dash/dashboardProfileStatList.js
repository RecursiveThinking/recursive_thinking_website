import React from 'react';
import DashboardProfileStatListItem from './dashboardProfileStatListItem'

const dashboardProfileStatList = ({userStats}) => {
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
      console.log(stat)
      return (
        // <li key={stat[2]} className="grid-cell">
          <DashboardProfileStatListItem stat={stat} key={index}/>
        // </li>
      )
    }
  )
  const lastThree = stats2.map( (stat, index) => {
      return (
        // <li key={stat[2]} className="grid-cell">
          <DashboardProfileStatListItem stat={stat} key={index} />
        // </li>
      )
    }
  )
  return (
    <article className="card fc--disp-flex fc--fdir-col">
      <h5 className="fw900 ls14 ttup fcGreyb9 mb10">Profile Statistics</h5>
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
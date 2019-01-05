import React from 'react';

import RecursiveDirectoryListItem from './recursiveDirectoryListItem'

import DM from '../../standards/dictModel'

const recursiveDirectoryList = ({usersForDirectory}) => {
  const { user: { userId }} = DM
  
  // usersForDirectory.length = 0;
  if(usersForDirectory.length){
    const allDirectory = usersForDirectory.map(user => {
      return (
        <li key={user[userId]} className="grid-cell">
          <RecursiveDirectoryListItem user={user} />
        </li>
      )
    })
    return (
      <ul className="grid grid--cols-4">
        {/* return the mapped Tiles here */}
        { allDirectory }
      </ul>
    )
  } else {
    // the list has no length
    return (
      <article className="card">
        <h5 className="fw700 ls14 ttup fcGrey424041">Recursive Directory</h5>
        <hr className="mt10" />
        <h5 className="fw500 ls14 fcGrey424041 mt30 ta-cent">Uh Oh! There are no registered users, other than yourself!</h5>
        <p className="fs18 fw300 ls10 fcGrey81 mt15 ta-cent">
          Seems like you may need to go out, make some friends and invite them to join the organization!
          <br /><br />
          Then you'll feel better and will never see this page again! (Well, unless everyone abandons the organization but you...but lets not think about that.)
        </p>
      </article>
    )
  }
}

export default recursiveDirectoryList;
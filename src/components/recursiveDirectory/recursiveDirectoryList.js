import React from 'react';

import RecursiveDirectoryListItem from './recursiveDirectoryListItem'

const recursiveDirectoryList = ({usersForDirectory}) => {
  const allDirectory = usersForDirectory.map(user => {
    return (
      <li key={user.userId} className="grid-cell">
        <RecursiveDirectoryListItem user={user} />
      </li>
    )
  })
  return (
    <ul className="grid grid--cols-3">
      {/* return the mapped Tiles here */}
      { allDirectory }
    </ul>
  )
}

export default recursiveDirectoryList;
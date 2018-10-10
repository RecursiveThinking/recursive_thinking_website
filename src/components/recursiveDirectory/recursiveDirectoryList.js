import React from 'react';

import RecursiveDirectoryListItem from './recursiveDirectoryListItem'

import DM from '../../standards/dictModel'

const recursiveDirectoryList = ({usersForDirectory}) => {
  const { user: { userId }} = DM
  const allDirectory = usersForDirectory.map(user => {
    return (
      <li key={user[userId]} className="grid-cell">
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
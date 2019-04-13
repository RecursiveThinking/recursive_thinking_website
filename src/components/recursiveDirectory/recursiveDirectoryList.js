import React from 'react';

import RecursiveDirectoryListItem from './recursiveDirectoryListItem'

import DefaultMessage from '../../components/defaults/defaultMessage/defaultMessage'
import { DEFAULT_MESSAGE_RECURSIVE_DIRECTORY_NO_USERS } from '../../components/defaults/defaultMessage/defaultMessageContent/defaultMessageContent'

import DM from '../../standards/dictModel'

const recursiveDirectoryList = ({usersForDirectory}) => {
  const { user: { userId }} = DM
  
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
      <DefaultMessage
        content={DEFAULT_MESSAGE_RECURSIVE_DIRECTORY_NO_USERS}
      />
    )
  }
}

export default recursiveDirectoryList;
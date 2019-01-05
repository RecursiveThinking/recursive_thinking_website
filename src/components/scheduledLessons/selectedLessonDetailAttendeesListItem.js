import React from 'react';

import { Link } from 'react-router-dom'

import DM from '../../standards/dictModel'
import ROUTES from '../../standards/routes'

const {
  profile_view
} = ROUTES

const selectedLessonDetailAttendeesListItem = ({attendingUserObj}) => {
  const { user: { userId, name, avatar}} = DM;
  let avatarSrcPath = `/public/images/${attendingUserObj[avatar]}`
  let altString = `A Photo of ${attendingUserObj[name]}`
  return (
    <div className="fc--disp-flex">
      <Link to={`${profile_view}/${attendingUserObj[userId]}`}>
        <img className="avatarXXS fi--aSelf-ce" src={avatarSrcPath} alt={altString} />
      </Link>
      <h5 className="fw300 ls18 fs22 fcGrey424041 fi--aSelf-ce">{attendingUserObj[name]}</h5>
    </div>
  )
}

export default selectedLessonDetailAttendeesListItem;
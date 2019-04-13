import React from 'react';

import { Link } from 'react-router-dom'

import { ROUTES_REACT } from '../../../standards/routes'
import { PUBLIC_S3_URL } from '../../../standards/publicPaths'

const {
  users_view
} = ROUTES_REACT

const lessonTaughtByThumbListItem = ({userId, avatar, altName}) => {
  // console.log(avatar);
  const altString = `A Photo of ${altName}`;
  
  // let splitNameString = avatar.split('/');
  // let imageName = splitNameString[splitNameString.length - 1]  
  let avatarSrcPath = `${PUBLIC_S3_URL}${userId}/avatar/${avatar}`
  
  return (
    <figure className="avatarTip">
      <Link to={`${users_view}/${userId}`}>
        <img className="avatarXXS" src={avatarSrcPath} alt={altString} />
      </Link>
      <span className="fs10 ls10 avatarTipText">{altName}</span>
    </figure>
  )
}

export default lessonTaughtByThumbListItem;
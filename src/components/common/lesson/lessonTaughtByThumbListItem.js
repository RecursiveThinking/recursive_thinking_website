import React from 'react';

import { Link } from 'react-router-dom'

import { ROUTES_REACT } from '../../../standards/routes'
import { PATH_FOR_IMAGES } from '../../../standards/publicPaths'

const {
  profile_view
} = ROUTES_REACT

const lessonTaughtByThumbListItem = ({userId, avatar, altName}) => {
  // console.log(avatar);
  const altString = `A Photo of ${altName}`;
  
  // let splitNameString = avatar.split('/');
  // let imageName = splitNameString[splitNameString.length - 1]  
  let avatarSrcPath = `${PATH_FOR_IMAGES}${avatar}`
  
  return (
    <figure className="avatarTip">
      <Link to={`${profile_view}/${userId}`}>
        <img className="avatarXXS" src={avatarSrcPath} alt={altString} />
      </Link>
      <span className="fs10 ls10 avatarTipText">{altName}</span>
    </figure>
  )
}

export default lessonTaughtByThumbListItem;
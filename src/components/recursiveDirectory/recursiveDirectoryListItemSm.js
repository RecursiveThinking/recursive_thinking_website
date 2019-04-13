import React from 'react'

import { NavLink } from 'react-router-dom'

import { ROUTES_REACT } from '../../standards/routes';
// import { PATH_FOR_IMAGES } from '../../standards/publicPaths';
import { PUBLIC_S3_URL } from '../../standards/publicPaths';
import DM from '../../standards/dictModel';

const {
  users_view
} = ROUTES_REACT;

const recursiveDirectoryListItemSm = ({user}) => {
  const {
    user: {
      userId,
      avatar,
      name,
      city,
      state,
      title
    }
  } = DM;
  const imagePathBuild = `${PUBLIC_S3_URL}${user[userId]}/avatar/${user[avatar]}`;
  const altDescript = `Avatar of ${user[name]}`
  const concatLocation = `${user[city]}, ${user[state]}`
  return (
    <NavLink to={`${users_view}/${user[userId]}`} >
      <article className="fc-directoryCardSm fc--disp-flex fc--fdir-row fc--aItem-ce">
        <img src={imagePathBuild} alt={altDescript} className="avatarXXS"/>
        <div className="fc--disp-flex fc--fdir-col ml15">
          {/* <Link to={`/viewProfile/${user[userId]}`}> */}
            <h6 className="fs16 ls12 fw700">{user[name]}</h6>
          {/* </Link> */}
          <h6 className="fs14 ls10 fw300">{user[title]}</h6>
          <h6 className="fs12 ls08 fw300">{concatLocation}</h6>
        </div>
      </article>
    </NavLink>
  )
}

export default recursiveDirectoryListItemSm;
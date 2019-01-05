import React from 'react';

import { Link } from "react-router-dom"

import DM from '../../standards/dictModel'
import { ROUTES_REACT } from '../../standards/routes'
import { PATH_FOR_IMAGES } from '../../standards/publicPaths'

const {
  profile_view
} = ROUTES_REACT;

const recursiveDirectoryListItem = ({user}) => {
  const { user: { userId, avatar, name, city, state, title}} = DM;
  const imagePathBuild = `${PATH_FOR_IMAGES}${user[avatar]}`
  const concatLocation = `${user[city]}, ${user[state]}`
  return (
    <article className="card fc-directoryCard fc--disp-flex fc--fdir-col">
      <Link to={`${profile_view}/${user[userId]}`} className="fc--disp-flex fc--fdir-col">
        {/* <div className="fi--aSelf-ce">
        </div> */}
        <img 
          className="avatarM avatarBS fi--aSelf-ce" 
          src={imagePathBuild}
          alt={`${user[name]}`}
          />
      </Link>
      <Link to={`${profile_view}/${user[userId]}`}>
        <h4 className="fs24 ls16 fw500 ta-cent mt25">{user[name]}</h4>
      </Link>
      <hr className=" mtp125" />
      <h5 className="fs20 ls12 fw500 fcGrey424041 ta-cent mtp125">{user[title]}</h5>
      <h6 className="fs16 ls10 fw300 fcGrey424041 ta-cent">{concatLocation}</h6>
    </article>
  )
}

export default recursiveDirectoryListItem;


import React from 'react';

import DM from '../../standards/dictModel'

const recursiveDirectoryListItem = ({user}) => {
  const { user: { avatar, name, city, state, title}} = DM;
  const imagePathBuild = `/public/images/${user[avatar]}`
  const concatLocation = `${user[city]}, ${user[state]}`
  return (
    <article  className="card fc-directoryCard fc--disp-flex fc--fdir-col">
      <img className="avatarXL avatarBS fi--aSelf-ce" src={imagePathBuild} />
      <h3 className="fs36 ls22 fw500 fc-Grey424041 ta-cent mt35"><a href="#">{user[name]}</a></h3>
      <hr className="mt05" />
      <h4 className="fs28 ls16 fw300 fc-Grey424041 ta-cent mt05">{user[title]}</h4>
      <h6 className="fs20 ls12 fw300 fc-Grey424041 ta-cent mt05">{concatLocation}</h6>
    </article>
  )
}

export default recursiveDirectoryListItem;


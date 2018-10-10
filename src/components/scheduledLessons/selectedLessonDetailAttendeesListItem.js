import React from 'react';

import DM from '../../standards/dictModel'

const selectedLessonDetailAttendeesListItem = ({attendingUserObj}) => {
  const { user: { name, avatar}} = DM;
  let avatarSrcPath = `/public/images/${attendingUserObj[avatar]}`
  let altString = `A Photo of ${attendingUserObj[name]}`
  return (
    <div className="fc--disp-flex">
      <img className="avatarXXS fi--aSelf-ce" src={avatarSrcPath} alt={altString} />
      <h5 className="fw300 ls14 fcBlack fi--aSelf-ce">{attendingUserObj[name]}</h5>
    </div>
  )
}

export default selectedLessonDetailAttendeesListItem;
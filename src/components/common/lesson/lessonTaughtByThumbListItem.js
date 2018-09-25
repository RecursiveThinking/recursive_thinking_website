import React from 'react';

const lessonTaughtByThumbListItem = ({avatar, altName}) => {
  // console.log(avatar);
  const altString = `A Photo of ${altName}`;
  // let splitNameString = avatar.split('/');
  // let imageName = splitNameString[splitNameString.length - 1]  
  let avatarSrcPath = `/public/images/${avatar}`
  
  return (
    <img className="avatarXXS" src={avatarSrcPath} alt={altString} />
  )
}

export default lessonTaughtByThumbListItem;
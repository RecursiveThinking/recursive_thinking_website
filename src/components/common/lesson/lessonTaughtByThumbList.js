import React from 'react';

import LessonTaughtByThumbListItem from './lessonTaughtByThumbListItem'

const lessonTaughtByThumbList = ({taughtByUserArray}) => {
  // console.log('lessonTaughtByThumb', taughtByUserArray);
  let lessonAvatars = taughtByUserArray.map(userTeach => {
    return (
      <li key={userTeach.userId} >
        <LessonTaughtByThumbListItem 
          avatar={userTeach.avatar} 
          altName={userTeach.name} 
          userId={userTeach.userId}
        />
      </li>
    )
  })
  
  return (
    <ul className="fc--disp-flex fc--fwrap--yes">
      {lessonAvatars}
    </ul>  
  )
};

export default lessonTaughtByThumbList;
import React from 'react'

import { PATH_FOR_ANIMATIONS } from '../../../standards/publicPaths'

const processingPage = ({...props}) => {
  const imgSrcPath = `${PATH_FOR_ANIMATIONS}bathRoomCat-opt.gif`
  // console.log('path', imgSrcPath)
  return (
    // <div className="grid grid--full">
      // <div className="grid-cell">
        <article className="card">
          <h5 className="fw600 ls14 fcGrey424041">{props.title}</h5>
          <hr className="mt10"/>
          <figure className={props.classNameTxt}>
            <img className="loadingScreenAnimation" src={imgSrcPath} alt=""/>
          </figure>
        </article>
      // </div>/
    // </div>
  )
}

export default processingPage;
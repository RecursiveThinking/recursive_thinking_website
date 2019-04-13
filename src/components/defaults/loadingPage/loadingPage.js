import React from 'react'

import { PATH_FOR_ANIMATIONS } from '../../../standards/publicPaths'

const loadingPage = ({...props}) => {
  const imgSrcPath = `${PATH_FOR_ANIMATIONS}robot-loading-dance-opt.gif`
  return (
    <article className="card">
      <h5 className="fw600 ls14 fcGrey424041">{props.title}</h5>
      {/* <h6 className="fs20 fw600 ls12 fcGrey424041">{props.title}</h6> */}
      <hr className="mt10"/>
      <figure className={props.classNameTxt}>
        <img className="loadingScreenAnimation" src={imgSrcPath} alt=""/>
      </figure>
    </article>
  )
}

export default loadingPage;
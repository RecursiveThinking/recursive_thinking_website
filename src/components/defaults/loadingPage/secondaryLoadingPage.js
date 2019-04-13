import React from 'react'

import { PATH_FOR_ANIMATIONS } from '../../../standards/publicPaths'

const secondaryLoadingPage = ({...props}) => {
  const imgSrcPath = `${PATH_FOR_ANIMATIONS}spinning-person-opt.gif`
  return (
    <article className="card">
      <h5 className="fw600 ls14 fcGrey424041">{props.title}</h5>
      <hr className="mt10"/>
      <figure className={props.classNameTxt}>
        <img className="loadingScreenAnimationSecondary" src={imgSrcPath} alt=""/>
      </figure>
    </article>
  )
}

export default secondaryLoadingPage;
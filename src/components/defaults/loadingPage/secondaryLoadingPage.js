import React from 'react'

import { PATH_FOR_ANIMATIONS } from '../../../standards/publicPaths'

const secondaryLoadingPage = () => {
  const imgSrcPath = `${PATH_FOR_ANIMATIONS}spinning-person-opt.gif`
  console.log('path', imgSrcPath)
  return (
    // <div className="grid grid--full">
      // <div className="grid-cell">
        <article className="card ta-cent">
          <figure className="loadingScreenSecondary">
          {/* <figure> */}
            <img className="loadingScreenAnimationSecondary" src={imgSrcPath} alt=""/>
          </figure>
        </article>
      // </div>
    // </div>
  )
}

export default secondaryLoadingPage;
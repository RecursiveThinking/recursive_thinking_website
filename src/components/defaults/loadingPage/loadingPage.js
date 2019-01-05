import React from 'react'

import { PATH_FOR_ANIMATIONS } from '../../../standards/publicPaths'

const loadingPage = () => {
  const imgSrcPath = `${PATH_FOR_ANIMATIONS}robot-loading-dance-opt.gif`
  // console.log('path', imgSrcPath)
  return (
    <div className="grid grid--full">
      <div className="grid-cell">
        <main className="card ta-cent">
          <figure className="loadingScreen">
            <img className="loadingScreenAnimation" src={imgSrcPath} alt=""/>
          </figure>
        </main>
      </div>
    </div>
  )
}

export default loadingPage;
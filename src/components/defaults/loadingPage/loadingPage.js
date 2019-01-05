import React from 'react'

const loadingPage = () => {
  return (
    <div className="grid grid--full">
      <div className="grid-cell">
        <main className="card ta-cent">
          <figure className="loadingScreen">
            <img className="loadingScreenAnimation" src="../../../../public/animations/robot-loading-dance-opt.gif" alt=""/>
          </figure>
        </main>
      </div>
    </div>
  )
}

export default loadingPage;
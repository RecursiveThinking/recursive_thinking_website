import React from 'react';
import { PATH_FOR_IMAGES } from '../../standards/publicPaths'

// const headerApp = () => {
  const headerApp = () => {
    return (
      <div className="grid grid--cols-2">
        <div className="grid-cell fc--disp-flex fc-logo">
          <div className="fc--disp-flex ">
            <figure>
              <img 
                src={`${PATH_FOR_IMAGES}recursivelogo.png`}
                alt="Recursive Thinking Logo"
                />
            </figure>
          </div>
        </div>
        <div className="grid-cell fc--disp-flex fc-search">
          <a href="/"><button type="button" className="btn btnTemp btnPadTB1 btnPadLR1 fs16 ls12">Home</button></a>
          <a href="/dashboard"><button type="button" className="btn btnTemp btnPadTB1 btnPadLR1  fs16 ls12">Dash</button></a>
          <a href="/setupProfile"><button type="button" className="btn btnTemp btnPadTB1 btnPadLR1 fs16 ls12">SetupProfile</button></a>
          <div className="fc--disp-flex search">
            <div className="searchBar">
              <input className="inputSearch" type="search" placeholder="Search" />
            </div>
          </div>
        </div>
      </div>
    )
}

export default headerApp
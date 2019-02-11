import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTES_REACT } from '../../standards/routes';
import { PATH_FOR_IMAGES } from '../../standards/publicPaths';

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
          <Link to={ROUTES_REACT.root}>
            <button type="button" className="btn btnTemp btnPadTB1 btnPadLR1 fs16 ls12">Home</button>
          </Link>
          <Link to={ROUTES_REACT.dashboard}>
            <button type="button" className="btn btnTemp btnPadTB1 btnPadLR1  fs16 ls12">Dash</button>
          </Link>
          <Link to={ROUTES_REACT.profile_create}>
            <button type="button" className="btn btnTemp btnPadTB1 btnPadLR1 fs16 ls12">SetupProfile</button>
          </Link>
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
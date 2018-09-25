import React from 'react';

const headerApp = () => {
  return <header>
    <div className="grid grid--cols-2">
      <div className="grid-cell fc--disp-flex fc-logo">
        <div className="fc--disp-flex ">
          <figure>
            <img src="../../../public/images/recursivelogo.png" />
          </figure>
        </div>
      </div>
      <div className="grid-cell fc--disp-flex fc-search">
        <div className="fc--disp-flex search">
          <div className="searchBar">
            <input className="inputSearch" type="search" placeholder="Search" />
          </div>
        </div>
      </div>
    </div>
  </header>
}

export default headerApp
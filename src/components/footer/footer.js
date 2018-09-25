import React from 'react';

const footer = () => {
  return <footer>
    <div className="grid grid--cols-2">
      <div className="grid-cell fc--disp-flex fc-copyright fc--aItem-ce">
        <div className="fc--disp-flex copyright">
          <p className="fs14 fw500">&#169; Recursive Thinking, All Rights Reserved</p>
        </div>
      </div>
      <div className="grid-cell fc--disp-flex fc-mediaIcons fc--aItem-ce">
        <div className="fc--disp-flex mediaIcons fs33">
          <figure>
            <a href="https://github.com/RecursiveThinking/" target="_blank"><i className="fa fa-github"></i></a>
          </figure>
          <figure>
            <a href="https://www.linkedin.com/company/18067985/" target="_blank"><i className="fa fa-linkedin-square"></i></a>
          </figure>
        </div>
      </div>
    </div>
  </footer>
}

export default footer
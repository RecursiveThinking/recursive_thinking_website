import React from 'react'

import HeaderApp from '../../headerApp/headerApp';
import Footer from '../../footer/footer'

import { ProfileFormEx } from '../../forms/form_profile'

// import DM from '../../../standards/dictModel'

const profileSetup = () => {
  return (
    <main className="wrapper">
      <HeaderApp />
      <div className="contentFullWrapper">
        <div className="dropdown"> 
          <div className="grid grid--full">
            <div className="grid-cell">
              <article className="barFull bgColorDarkGreen pdTB5LR3 ta-cent">
                <h3 className="fs33 fw500 ls30 fcWhite">Profile Setup</h3>
              </article>
            </div>
          </div>
        </div>
        <div className="contentList">
          <div className="grid grid--full">
            <div className="grid-cell">
              <article className="profileSetup">
                <ProfileFormEx />
              </article>
            </div>
          </div>
        </div>
        <div className="barFull bgColorSiteGreen pdTB5LR3 ta-cent">
          <div className="grid grid--full">
            <div className="grid-cell fc--disp-flex fc--jCont-ce">
              <button className="btn btnFillClrSchGreen00b371OutlineWhite fs24 fw500 ls16 pdTB3LR5 ttup">Save Changes</button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}

export default profileSetup;
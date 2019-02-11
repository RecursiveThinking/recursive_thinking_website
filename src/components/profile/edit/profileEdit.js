import React from 'react'
import { ProfileFormEx } from '../../forms/form_profile'

import ContentPageTitleBar from '../../common/contentPage/contentPageTitleBar';
import { TITLE_BAR_USER_PROFILE_EDIT } from '../../common/contentPage/contentPageTitleBarInfo'


const editProfile = () => {
  return (
    <main>
      <ContentPageTitleBar content={TITLE_BAR_USER_PROFILE_EDIT} />
      <div className="contentList">
        <div className="grid grid--full">
          <div className="grid-cell">
            <article className="profileEdit">
              <ProfileFormEx />
            </article>
          </div>
        </div>
      </div>
    </main>
  )
}

export default editProfile;
import React from 'react'
import { ProfileFormEx } from '../../forms/form_profile'

const editProfile = () => {
  return (
    <main>
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
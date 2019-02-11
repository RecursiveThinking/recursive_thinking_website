import React from 'react'
import ContentPageTitleBar from './contentPageTitleBar';

const ContentPageWithTitleBar = ({...props}) => {
  console.log('props @ CPWTB', props)
  const {
    formContent,
    titleBarContent
  } = props
  return (
    <main className="height100P">
      <ContentPageTitleBar content={titleBarContent}/>
      {/* <div className="contentList"> */}
        {/* <div className="grid grid--full"> */}
          {/* <div className="grid-cell"> */}
            {/* <article className="card"> */}
              {formContent}
            {/* </article> */}
          {/* </div> */}
        {/* </div> */}
      {/* </div> */}
    </main>
  )
}

export default ContentPageWithTitleBar;
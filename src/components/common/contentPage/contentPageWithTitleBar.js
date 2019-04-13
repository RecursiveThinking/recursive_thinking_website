import React from 'react'
import ContentPageTitleBar from './contentPageTitleBar';

const ContentPageWithTitleBar = ({...props}) => {
  // console.log('props @ CPWTB', props)
  const {
    content,
    sectionClass,
    sectionStyle,
    titleBarContent
  } = props
  return (
    <main className="height100P">
      <ContentPageTitleBar content={titleBarContent}/>
      <section className={sectionClass} style={sectionStyle}>
        {content}
      </section>
    </main>
  )
}

export default ContentPageWithTitleBar;
import React from 'react';

const defaultMessage = ({...props}) => {
  const {
    heading,
    subheading,
    paragraph
  } = props.content
  return (
    <article className="card">
      <h5 className="fw600 ls14 fcGrey424041">{heading}</h5>
      <hr className="mt10" />
      <h5 className="fw500 ls14 fcGrey424041 mt30 ta-cent">{subheading}</h5>
      <p 
        className="fs18 fw300 ls10 fcGrey81 mt15 ta-cent wspl"
        style={{ padding: '0 4rem'}}
      >{paragraph}</p>
    </article>
  )
}

export default defaultMessage;
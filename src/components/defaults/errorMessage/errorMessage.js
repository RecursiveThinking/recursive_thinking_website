import React from 'react'

const defaultErrorMessage = ({...props}) => {
  const {
    heading,
    errorObj
  } = props
  let errorArr = Object.entries(errorObj);
  let errorDetails = errorArr.map(errorItem => {
    return (
      <div className="errorTxtRow mt05">
        <h5 className="fs16 fw600 ls12 fcGrey424041">{`${errorItem[0]}: `}</h5><h5 className="fs16 fw300 ls12 fcGrey424041">{errorItem[1]}</h5>
      </div>
    )
  })
  return (
    <article className="card">
      <h5 className="fs22 fw600 ls12 fcGrey424041">{`Error Occured at:  ${heading}`}</h5>
      <hr className="mt10" />
      {/* <h5 className="fw500 ls14 fcGrey424041 mt30 ta-cent">{subheading}</h5> */}
      <p className="fs18 fw300 ls10 fcGrey81 mt15">{errorDetails}</p>   
    </article>
  )
}

export default defaultErrorMessage;
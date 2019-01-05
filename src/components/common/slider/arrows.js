import React from 'react'

export const RightArrow = (props) => {
  return (
    <div className="rightArrow" onClick={props.goToNextSlide}>
      <i className="fa fa-angle-right fa-2x" aria-hidden="true"></i>
    </div>
  )
}

export const LeftArrow = (props) => {
  return (
    <div className="leftArrow" onClick={props.goToPrevSlide}>
      <i className="fa fa-angle-left fa-2x" aria-hidden="true"></i>
    </div>
  )
}




import React from 'react'

const fontAwesomeIcon = ({...props}) => {
  return (
    // style={props.style}
    <i className={props.iconNameForClass}></i>
  )
}

export default fontAwesomeIcon;
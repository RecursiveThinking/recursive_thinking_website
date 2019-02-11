import React from 'react'

const formAction = ({...props}) => {
  // console.log('props @ formAction', props.content)
  const {
    buttonClass,
    buttonText,
    outerDivClass
  } = props.content
  return (
    <div className={outerDivClass}>
      <button type="submit" className={buttonClass}>{buttonText}</button>
    </div>
  )
}

export default formAction
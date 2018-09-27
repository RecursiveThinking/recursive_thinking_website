import React from 'react'

const modal = (props) => {
  // console.log(props)
  const showHideClassName = props.show ? "modal display-block" : "modal display-none"
  return (
    <div className={showHideClassName}>
      <section className="modalCard">
        <div onClick={props.handleClose} className="modalClose"><i className="fs33 fw300 fa fa-times"></i></div>
        {props.content}
      </section>
    </div>
  )
}

export default modal;
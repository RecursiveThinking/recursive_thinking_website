import React from 'react'

const categoryListItem = ({catItem}) => {
  return (
    <div className="tag ta-cent">
      {/* <div className="tag"> */}
        {catItem.name}
      {/* </div> */}
    </div>
  )
}

export default categoryListItem;
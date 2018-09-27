import React from 'react'

const personQuoteListItem = (obj) => {
  let imagePath = `../../../public/images/${obj.user.image}`;
  let alt = `A Photo of ${obj.user.name}`;
  return (
    // <li className="contentPersonQuote">
      <section className="fc--disp-flex fc--fdir-col fc--aItem-ce ta-cent">
      {/* avatarBS */}
        <img className="avatarXL" src={imagePath} alt={alt} />
        <h3 className="fs36 fw500 mt40">{obj.user.title}</h3>
        <p className="fs24 fw300 mt15">{obj.user.quote}</p>
      </section>
    // </li>
  )
}

export default personQuoteListItem
import React from 'react'

import { PATH_FOR_IMAGES } from '../../../standards/publicPaths'

const personQuoteListItem = ({user, index}) => {
  let imagePath = `${PATH_FOR_IMAGES}${user.image}`;
  // let imagePath = user.image[`avatar${index + 1}`];
  let alt = `A Photo of ${user.name}`;
  // console.log('user', user, imagePath)
  return (
    <section className="fc--disp-flex fc--fdir-col fc--aItem-ce ta-cent">
      <img className="avatarM" src={`.${imagePath}`} alt={alt} />
      <h3 className="fs30 fw500 ls20 mt40">{user.title}</h3>
      <p className="fs20 fw300 ls14 mt15">{user.quote}</p>
    </section>
  )
}

export default personQuoteListItem
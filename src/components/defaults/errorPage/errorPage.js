import React from 'react'

const errorPage = () => {
  let imagePath = `../../../../public/images/error/error_domo.png`
  return (
    <article className='card ta-cent'>
      <img className='errorPhoto' src={imagePath} alt=""/>
      <h1 className='fcGrey64 fs80 ls44 fw300'>We are sorry!</h1>
      <h4 className='fcGrey64 fs16 ls18 fw300'>but the page you are looking for is not available! <a href="/">Return to the Homepage?</a> Or <a href="https://en.wikipedia.org/wiki/Domo_(NHK)" target="/">Learn about Domo?</a></h4>
    </article>
  )
}

export default errorPage;
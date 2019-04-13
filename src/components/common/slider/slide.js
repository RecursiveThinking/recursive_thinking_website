import React from 'react'
// import { PATH_FOR_IMAGES } from '../../../standards/publicPaths'
import { PUBLIC_S3_URL } from '../../../standards/publicPaths'

const Slide = (props) => {
  if(!props.userArray.length){
    return(
      <div>Loading</div>
      )
  } else {
    // console.log('p userArr', props.userArray, 'p currIndex', props.currentIndex)
    const currentSlide = props.userArray[props.currentIndex];
    const {
      userId,
      avatar,
      title,
      name,
      quote
    } = currentSlide;
    let srcString = `${PUBLIC_S3_URL}${userId}/avatar/${avatar}`;
    let altString = `Avatar of ${name}`
    return(
      <div className="slide">
        <div className="grid grid--1of3 fc--jCont-ce fc--aItem-ce">
          <div className="grid-cell fc--disp-flex fc--jCont-ce">
            <img className="avatarXL avatarBS" src={srcString} alt={altString}/>
          </div>
          <div className="grid-cell">
            <div className="c-quote">
              <p className="fcWhite fs26 fw100 ls16">{quote}</p>
              <br />
              <p className="fcWhite fs33 fw300 ls22">{name}, {title}</p>
            </div>
          </div>  
        </div>
      </div>
    )
  }
}

export default Slide;
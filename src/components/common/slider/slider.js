import React, { Component } from 'react'
import { LeftArrow, RightArrow } from './arrows';
import Slide from './slide'


class Slider extends Component {
  constructor(props){
    super(props)
    
    this.state = {
      currentIndex: 0,
      translateValue: 0,
    }
  }
  
  componentDidMount(){
    window.setInterval(() => {
      this.goToNextSlide()
    }, 5000)
  }
  
  goToPrevSlide = () => {
    if(this.state.currentIndex === 0){
      this.setState({
        currentIndex: this.props.userInfoQuoteArr.length - 1
      })
    } else {
      this.setState(prevState => ({
        currentIndex: prevState.currentIndex - 1
      }))
    }
  }
  
  goToNextSlide = () => {
    if(this.state.currentIndex === this.props.userInfoQuoteArr.length - 1){
      this.setState({
        currentIndex: 0,
        translateValue: 0
      })
    }
    else {      
      this.setState(prevState => ({
        currentIndex: prevState.currentIndex + 1,
        // translateValue: prevState.translateValue + (this.slideWidth())
      }))
    }
  }
  
  slideWidth = () => {
    console.log('slide', document.querySelector('.slide').clientWidth)
    return document.querySelector('.slide').clientWidth;
  }
  
  render(){
    // console.log('props @ slider', this.props)
    const { userInfoQuoteArr } = this.props;
    console.log('user', userInfoQuoteArr)
    console.log('curr', this.state.currentIndex)
    
    let renderDots = userInfoQuoteArr.map((item, index) => {
      let dotClass = '';
      if(index !== this.state.currentIndex){
        dotClass = 'dot'
      } else {
        dotClass = 'dot selected'
      }
      return (
        <li key={index} className={dotClass}></li>
      )
    })
    
    // window.setInterval(() => {
    //   this.goToNextSlide()
    // }, 3000)
    
    return (
      <section className="secCarouselQuotes">
        <div className="slider">
          <div className="slider-wrapper"
            style={{
              // transform: `translateX(${this.state.translateValue}px)`,
              transition: 'transform ease-out 0.45s'
            }}
            >
            <Slide key={this.state.currentIndex} userArray={userInfoQuoteArr} currentIndex={this.state.currentIndex} />
            {/* user={userInfoQuoteArr[this.state.currentIndex]} */}
          </div>
        </div>
        <LeftArrow  
          goToPrevSlide={this.goToPrevSlide}
        />
        <RightArrow 
          goToNextSlide={this.goToNextSlide}
        />
        <ul className="fc--disp-flex fc--jCont-ce">
          {renderDots}
        </ul>
      </section>
    )
  }
}

export default Slider
import React from 'react'
import { Link } from 'react-router-dom'

const ContentPageTitleBar = (props) => {
  const {
    content: {
      heading,
      subheading,
      buttontext,
      link
    }
  } = props
  
  return (
    <section className="contentPageTitleBar">
      <div className="grid grid--cols-2">
        <div className="grid-cell fc--disp-flex fc-contentPageTitleBarText">
          <h6 className="fs22 fw600 ls12 fcGrey424041">{heading}</h6>
          <h6 className="fs16 fw300 ls08 fcGrey424041">{subheading}</h6>
        </div>
        <div className="grid-cell fc--disp-flex fc-contentPageTitleBarButton">
          {
            buttontext !== '' &&
            <Link to={link}>
              <button className="btn btnFillClrSchGreen00b371 pdTB1p25LR2p5 fs16 fw500 ls12">{buttontext}</button>
              {/* { 
                this.state.showModalQuestion &&
                
                <Modal 
                onCloseRequest={() => this.handleToggleModalQuestion()}
                content={<SubmitInterviewQuestionFormEx />}
                />
              } */}
            </Link>
          }
        </div>
      </div>
    </section>
  )
}

export default ContentPageTitleBar;
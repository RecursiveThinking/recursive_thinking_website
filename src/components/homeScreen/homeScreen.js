import React, {Component} from 'react'

import HeaderHome from '../headerHome/headerHome';
import Modal from '../common/modal/modal'
import { SignUpModalForm } from '../forms/forms_modals'
import PersonQuoteListItem from './personQuoteListItem';

import Footer from '../footer/footer'

class HomeScreen extends Component {
  constructor(props){
    super(props);
    this.state = {
      showModal: false,
    }
  }
  
  handleToggleModal(){
    this.setState({ showModal: !this.state.showModal})
  }
  
  render(){
    let userArray = [
      { id: 'userArray1', name: 'Person 1', image: 'avatar1.png', title: 'Really Great Title1', quote: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
      { id: 'userArray2', name: 'Person 2', image: 'avatar2.png', title: 'Really Great Title2', quote: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
      { id: 'userArray3', name: 'Person 3', image: 'avatar3.png', title: 'Really Great Title3', quote: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' }
    ]
    const personQuoteList = userArray.map(user => {
      return (
        <li key={user.id} className="grid-cell contentPersonQuote">
          <PersonQuoteListItem user={user} />
        </li>
      )
    })
    return (
      <div>
        <HeaderHome />
        <section>
          <div className="grid grid--full">
            <div className="grid-cell">
              <div className="contentHome">
                <div className="bannerImage ta-cent">
                  <h1>Recursive Thinking</h1>
                </div>  
              </div>  
            </div>
          </div>   
        </section>
        <section className="secJoinRecursiveThinking">
          <div className="grid grid--full">
            <div className="grid-cell">
              <div className="width100P ta-cent">
                <h5 className="ls14 fw300">Learning to Code? Learning UX Design? Furthering your Skills?</h5>
                <h2 className="fs50 mt10 fw300">Join Recursive Thinking!</h2>
                <nav>
                  <button onClick={() => this.handleToggleModal()} type="button" className="btn btnFillClrSchGreen00b371 signUpLrg fs30 fw500 mt35">Sign Up</button>
                  {
                    this.state.showModal &&
                    
                    <Modal 
                    onCloseRequest={() => this.handleToggleModal()}
                    content={<SignUpModalForm />}
                    />
                  }
                </nav>
                
              </div>  
            </div>
          </div>   
        </section>
        <section className="secWhatIsRecursiveThinking">
          <div className="grid grid--full">
            <div className="grid-cell ta-cent">
              <div className="width100P">
                <h2 className="fs50 fw300">What is Recursive Thinking?</h2>
                <p className="fs24 fw300 mt50 mch">Recursive Thinking is a brain share of developers and designers participating in career development and mentorship. <span className="fs24 fw600">We are 75+ people strong with 15-25 individuals attending our weekly events.</span> We have a variety of full time and part time teachers from Amazon, Microsoft, Expedia, Code Fellows, Coding Dojo, General Assembly and many more.</p> 
              </div>  
            </div>
          </div>  
        </section>
        <section className="secThreePeople">
          <ul className="grid grid--cols-3">
            {personQuoteList}
          </ul>
        </section>
        <section className="secCarouselQuotes">
          <div className="grid grid--1of3 fc--jCont-ce fc--aItem-ce">
            <div className="grid-cell fc--disp-flex fc--jCont-ce">
              <img className="avatarXXL avatarBS" src="../../../public/images/avatar1.png"/>
            </div>
            <div className="grid-cell">
              <div className="c-quote">
                <p className="fcWhite fs36 fw300 ls22">"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat"</p>
                <br />
                <p className="fcWhite fs36 fw300 ls22">-Hailey Skelcher, UX Designer</p>
              </div>
            </div>  
          </div>
        </section>
        <Footer /> 
      </div>
    )
  }
}

export default HomeScreen;
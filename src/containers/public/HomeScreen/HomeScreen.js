import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { FETCHING } from '../../../actions/action_types';
import { fetchHomeScreenQuotes } from '../../../actions/index';

import Header from '../header/header';
import Footer from '../../../components/footer/footer';

import Slider from '../../../components/common/slider/slider';
import PersonQuoteListItem from '../../../components/public/personQuoteListItem/personQuoteListItem';
import Modal from '../../../components/common/modal/modal';

import { SignUpFormEx } from '../../../components/forms/forms_auth';

import DM from '../../../standards/dictModel';

class PublicHomeScreen extends Component {
  constructor(props){
    super(props);
    this.state = {
      showModalSignUp: false,
    }
  }
  
  componentDidMount(){
    // this.props.fetchUsers();
    this.props.fetchHomeScreenQuotes();
  }
  
  handleToggleModalSignUp(){
    this.setState( {showModalSignUp: !this.state.showModalSignUp} )
  }
  
  renderSlider = () => {
    if(this.props.allHomeScreenQuotes === FETCHING){
      return (
        <div>Loading</div>
      )
    } 
    else if (!this.props.allHomeScreenQuotes){
      return (
        <div>Hello</div>
      )
    }
    else {
      return (
        <Slider userInfoQuoteArr={this.props.allHomeScreenQuotes}/>
      )
    }
  }
  
  render(){
    // console.log('props', this.props)
    const {
      allHomeScreenQuotes,
      // lookupTableAllUsers
    } = this.props;
    const {
      user: {
        userId,
        avatar,
        name,
        title
      }
    } = DM
    
    let userArray = [
      { 
        name: 'Person 1', 
        image: 'avatar1.png', 
        title: 'Really Great Title1', 
        quote: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' 
      },
      { 
        name: 'Person 2', 
        image: 'avatar2.png',
        title: 'Really Great Title2', 
        quote: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' 
      },
      { 
        name: 'Person 3', 
        image: 'avatar3.png', 
        title: 'Really Great Title3', 
        quote: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' 
      }
    ]
    // this makes a user 
    // let userInfoQuoteArray = [];
    // for(let i = 0; i < allHomeScreenQuotes.length; i += 1){
    //   if(lookupTableAllUsers[allHomeScreenQuotes[i]['_createdByUser']]){
    //     let tempUser = lookupTableAllUsers[allHomeScreenQuotes[i]['_createdByUser']]
    //     let pushUser = {}
    //       pushUser[userId] = tempUser[userId]
    //       pushUser[avatar] = tempUser[avatar]
    //       pushUser[name] = tempUser[name]
    //       pushUser[title] = tempUser[title]
    //       pushUser['quote'] = allHomeScreenQuotes[i]['quote']
    //     userInfoQuoteArray.push(pushUser)
    //   }
    // }
    
    const personQuoteList = userArray.map((user, index) => {
      return (
        <li key={index} className="grid-cell contentPersonQuote">
          <PersonQuoteListItem user={user} index={index} />
        </li>
      )
    })

    console.log('this.props: ', this.props)
    
    return (
      <main>
        <Header />
        <section>
          <div className="grid grid--full">
            <div className="grid-cell">
              <div className="contentHome">
                <div className="bannerImage ta-cent">
                  <h1 className="fs66 ls48 fcWhite">Recursive Thinking</h1>
                </div>  
              </div>  
            </div>
          </div>   
        </section>
        <section className="secJoinRecursiveThinking">
          <div className="grid grid--full">
            <div className="grid-cell">
              <div className="width100P ta-cent">
                <h6 className="fs22 fw300 ls14">Learning to Code? Learning UX Design? Furthering your Skills?</h6>
                <h2 className="fs48 fw300 ls28 mt10">Join Recursive Thinking!</h2>
                <nav>
                  <button onClick={() => this.handleToggleModalSignUp()} type="button" className="btn btnFillClrSchGreen00b371 btnPadTB1p5 btnPadLR10 fs22 fw500 mt35">Sign Up</button>
                  {
                    this.state.showModalSignUp &&
                    
                    <Modal 
                      onCloseRequest={() => this.handleToggleModalSignUp()}
                      content={<SignUpFormEx />}
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
                <h2 className="fs48 fw300 ls28">What is Recursive Thinking?</h2>
                <p className="fs22 fw300 mt35 ls14 mch">Recursive Thinking is a brain share of developers and designers participating in career development and mentorship. <span className="fs22 fw600 ls14">We are 75+ people strong with 15-25 individuals attending our weekly events.</span> We have a variety of full time and part time teachers from Amazon, Microsoft, Expedia, Code Fellows, Coding Dojo, General Assembly and many more.</p> 
              </div>  
            </div>
          </div>  
        </section>
        <section className="secThreePeople">
          <ul className="grid grid--cols-3">
            {personQuoteList}
          </ul>
        </section>
        {this.renderSlider()}
        {/* <Slider userInfoQuoteArr={allHomeScreenQuotes}/> */}
        <footer>
          <Footer /> 
        </footer>
      </main>
    )
  }
}

function mapStateToProps(state){
  return {
    // allUsers: state.users.allUsers,
    allHomeScreenQuotes: state.homescreenquotes.allHomeScreenQuotes
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({ fetchHomeScreenQuotes }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(PublicHomeScreen);
import React, {Component} from 'react';

import CategoryList from '../../components/common/category/categoryList'
import InterviewQuestionsAnswersList from './interviewQuestionsAnswersList'

import Modal from '../../components/common/modal/modal'
import { SubmitInterviewQuestionAnswersModalForm } from '../forms/forms_modals'

import DM from '../../standards/dictModel'

import DateMethods from '../../functions/dateMethods'
import UtilityMethods from '../../functions/utilityMethods';

class InterviewQuestionsListItem extends Component {
  constructor(props){
    super(props)
    
    this.state = {
      isIntQuestAnswerClassOpen: 'fc-replies',
      answerBlockClassString: 'answers display-none',
      showIntQuestionAnswerModal: false,
    }
  }
  
  toggleIntQuestAnswers = () => {
    if(this.state.isIntQuestAnswerClassOpen === 'fc-replies open'){
      this.setState({ 
        isIntQuestAnswerClassOpen: 'fc-replies',
        answerBlockClassString: 'answers display-none'
      })
    } else {
      this.setState({ 
        isIntQuestAnswerClassOpen: 'fc-replies open',
        answerBlockClassString: 'answers display-block'
      })
    }
  }
  
  showModalIntQuestAnswers = () => {
    this.setState({ showIntQuestionAnswerModal: true})
  }
  
  hideModalIntQuestAnswers = () => {
    this.setState({ showIntQuestionAnswerModal: false})
  }
  
  buildListOptions = () => {
    
  }
  

  render(){
    let ANSWER_STRING = '';
    if(this.state.isIntQuestAnswerClassOpen === 'fc-replies open'){
      ANSWER_STRING = `Answers`
    } else {
      ANSWER_STRING = `${this.props.intQuestion.answersToQuestion.length} Answers`
    }
    let optionList = UtilityMethods.generateOptionsList(this.props.currentUser.userId, this.props.currentUser.admin, this.props.intQuestion._createdByUser, 'fs20')
    // need to make an array to pass to the categoryList
    let formattedDate = DateMethods.getFormattedDate(this.props.intQuestion[DM.intQuestion.createdAt])
    return (
      <article className="card fc--disp-flex fc--fdir-col">
        <div className="grid grid--cols-2">
          <div className="grid-cell">
            <h5 className="fw500 ls18 fcGreyb9">{this.props.intQuestion[DM.intQuestion.title]}</h5>
          </div>
          <div className="grid-cell">
            <div className="fc--disp-flex fc--fdir-row fc--jCont-fe fc--aItem-ce">
              <div className="listOptions">
                {optionList}
              </div>
              <h6 className="fs20 fw300 ls18 fcGrey64 ml40">{formattedDate['upComingDateStringAmericanNaming']}</h6>
            </div>
          </div>
        </div>
        <div className="fc--disp-flex fc--jCont-sb fc--aItem-ce">
        </div>
        <hr className="mt20" />
        <p className="fs20 fw300 fcBlack mt40">
          {this.props.intQuestion[DM.intQuestion.description]}
        </p>
        <hr className="mt30"/>
        
        <CategoryList lessonCategories={this.props.intQuestion[DM.intQuestion.categories]} />
        
        <div className="mt20">
          <div className={this.state.isIntQuestAnswerClassOpen}>
          <h4 onClick={this.toggleIntQuestAnswers} className="fs28 fw900 ls18 fcGreenRT">{ANSWER_STRING}</h4>
            <div className={this.state.answerBlockClassString}>
            
              <InterviewQuestionsAnswersList
                allUsersArr={this.props.allUsersArr}
                currentUser={this.props.currentUser}
                lookupTableUsers={this.props.lookupTableUsers}
                intQuestionAnswers={this.props.intQuestion['answersToQuestion']}
                allInterviewQuestionsAnswersArr={this.props.allInterviewQuestionsAnswers}
                lookupTableInterviewQuestionsAnswers={this.props.lookupTableInterviewQuestionsAnswers}
              />
              
            </div>
            <button onClick={this.showModalIntQuestAnswers} className="btn btnFillClrSchGreen00b371 fs20 fw500 pdTB15LR4">Answer Question</button>
              <Modal 
                content={<SubmitInterviewQuestionAnswersModalForm />}
                show={this.state.showIntQuestionAnswerModal}
                handleClose={this.hideModalIntQuestAnswers}
              />
          </div>
        </div>
      </article>
    )
  }
}

export default InterviewQuestionsListItem
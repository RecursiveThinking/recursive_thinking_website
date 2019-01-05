import React, {Component} from 'react';

import CategoryList from '../../components/common/category/categoryList'
import InterviewQuestionsAnswersList from './interviewQuestionsAnswersList'

import Modal from '../../components/common/modal/modal'
import { SubmitInterviewQuestionAnswerFormEx } from '../forms/forms_modals'

import DM from '../../standards/dictModel'

import DateMethods from '../../functions/dateMethods'
import UtilityMethods from '../../functions/utilityMethods';

class InterviewQuestionsListItem extends Component {
  constructor(props){
    super(props)
    
    this.state = {
      isIntQuestAnswerClassOpen: 'fc-replies',
      answerBlockClassString: 'answers display-none',
      showModalAnswer: false,
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
  
  handleToggleModalAnswer(){
    this.setState({ showModalAnswer: !this.state.showModalAnswer})
  }
  

  render(){
    const {
      allUsersArr,
      lookupTableUsers,
      intQuestion,
      allInterviewQuestionsAnswers,
      lookupTableInterviewQuestionsAnswers,
      currentUser,
      allSkillsArr,
      lookupTableAllSkills
    } = this.props;
    
    const {
      user: {
        userId,
        admin
      },
      intQuestion: {
        title,
        description,
        categories,
        answersToQuestion,
        createdAt,
        _createdByUser
      }
    } = DM;
    
    let ANSWER_STRING = '';
    if(this.state.isIntQuestAnswerClassOpen === 'fc-replies open'){
      ANSWER_STRING = `Answers`
    } else {
      ANSWER_STRING = `${intQuestion.answersToQuestion.length} Answers`
    }
    let optionList = UtilityMethods.generateOptionsList(currentUser[userId], currentUser[admin], intQuestion[_createdByUser], 'fs18')
    // need to make an array to pass to the categoryList
    let formattedDate = DateMethods.getFormattedDate(intQuestion[createdAt])
    return (
      <article className="card fc--disp-flex fc--fdir-col">
        <div className="grid grid--cols-2">
          <div className="grid-cell">
            <h5 className="fw600 ls16 fcGrey424041">{intQuestion[title]}</h5>
          </div>
          <div className="grid-cell fc--disp-flex fc--jCont-fe fc--aItem-ce">
            <div className="listOptions fc--disp-flex">
              {optionList}
            </div>
            <h6 className="fs18 fw300 ls16 fcGrey64 ml40">{formattedDate['upComingDateStringAmericanNaming']}</h6>
          </div>
        </div>
        <div className="fc--disp-flex fc--jCont-sb fc--aItem-ce">
        </div>
        <hr className="mt20" />
        <p className="fs16 fw300 ls10 fcGrey424041 mt25">
          {intQuestion[description]}
        </p>
        <hr className="mt25"/>
        
        <CategoryList 
          categories={intQuestion[categories]} 
          allSkillsArr={allSkillsArr}
          lookupTableAllSkills={lookupTableAllSkills}
        />
        
        <div className="mt20">
          <div className={this.state.isIntQuestAnswerClassOpen}>
          <h5 onClick={this.toggleIntQuestAnswers} className="fw900 ls14 fcGreenRT">{ANSWER_STRING}</h5>
            <div className={this.state.answerBlockClassString}>
            
              <InterviewQuestionsAnswersList
                allUsersArr={allUsersArr}
                currentUser={currentUser}
                lookupTableUsers={lookupTableUsers}
                intQuestionAnswers={intQuestion[answersToQuestion]}
                allInterviewQuestionsAnswersArr={allInterviewQuestionsAnswers}
                lookupTableInterviewQuestionsAnswers={lookupTableInterviewQuestionsAnswers}
              />
              
            </div>
            <button onClick={() => this.handleToggleModalAnswer()} className="btn btnFillClrSchGreen00b371 fs16 fw500 ls12 ta-cent pdTB1p25LR2p5">Answer Question</button>
              {
                this.state.showModalAnswer && 
                
                <Modal 
                  onCloseRequest={() => this.handleToggleModalAnswer()}
                  content={
                    <SubmitInterviewQuestionAnswerFormEx 
                      intQuestion={intQuestion} 
                      allSkillsArr={allSkillsArr}
                      lookupTableAllSkills={lookupTableAllSkills}
                    />
                  }
                />
              }
          </div>
        </div>
      </article>
    )
  }
}

export default InterviewQuestionsListItem
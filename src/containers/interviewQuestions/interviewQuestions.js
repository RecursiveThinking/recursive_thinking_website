import React, {Component} from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { fetchUsers, fetchInterviewQuestions, fetchInterviewQuestionsAnswers, fetchSkills } from '../../actions'
import { FETCHING } from '../../actions/action_types'
import InterviewQuestionsList from '../../components/interviewQuestions/interviewQuestionsList';
import DefaultErrorPage from '../../components/defaults/errorPage/errorPage';
import DefaultLoadingPage from '../../components/defaults/loadingPage/loadingPage';

import OrderMethods from '../../functions/orderMethods'

// import Modal from '../../components/common/modal/modal'
// import { CreateInterviewQuestionAnswerFormEx } from '../../components/forms/forms_interviewquestionanswer'
import { DropDownSort, DropDownFilter } from '../../components/common/dropdown/sortAndFilter';
import ContentPageTitleBar from '../../components/common/contentPage/contentPageTitleBar'
import { ROUTES_REACT } from '../../standards/routes';
import { TITLE_BAR_INTERVIEWQUESTIONS } from '../../components/common/contentPage/contentPageTitleBarInfo'

class InterviewQuestions extends Component {
  constructor(props){
    super(props)
    
    this.handleSelect = this.handleSelect.bind(this);
    
    this.state = {
      showModalQuestion: false,
      type: '',
      sortByKey: 'ascending',
      sortBy: [
        {
          id: 0,
          title: 'Date - Ascending',
          selected: false,
          orderType: 'ascending',
          key: 'sortBy'
        },
        {
          id: 1,
          title: 'Date - Decending',
          selected: false,
          orderType: 'decending',
          key: 'sortBy'
        }
      ],
      filterBy: [
        {
          id: 0,
          title: 'Category',
          items: [],
          selected: false,
          key: 'category'
        },
        {
          id: 1,
          title: 'Author',
          items: [],
          selected: false,
          key: 'author'
        }
      ]
    };
  }
  
  componentDidMount(){
    this.props.fetchUsers();
    this.props.fetchInterviewQuestions();
    this.props.fetchInterviewQuestionsAnswers();
    this.props.fetchSkills();
  }
  
  handleToggleModalQuestion(){
    this.setState({ showModalQuestion: !this.state.showModalQuestion });
  }
  
  handleSelect(event){
    this.setState({ [event.target.name]: event.target.value })
  }
  
  orderArray(orderType){
    let temp = JSON.parse(JSON.stringify(this.state.interviewQuestions))
    if(orderType === 'ascending'){
      return OrderMethods.orderArrayByDateAscending(temp, 'createdAt')
    }
    else if(orderType === 'decending'){
      return OrderMethods.orderArrayByDateDecending(temp, 'createdAt')
    }
    else {
      return temp
    }
  }
  
  toggleSelected = (id, key) => {
    console.log('toggleSelected', id, key, this.state)
    let temp = this.state[key];
    temp[id].selected = !temp[id].selected
    this.setState({
      [key]: temp
    })
  }
  
  resetThenSet = (id, key) => {
    let temp = JSON.parse(JSON.stringify(this.state[key]))
    temp.forEach(item => item.selected = false);
    temp[id].selected = true;
    let orderedArray = this.orderArray(temp[id]['orderType'])
    console.log(temp[id]['orderType'], orderedArray)
    this.setState({ [key]: temp })
  }
  
  updateFilterCategoriesForUI(newArray, key){
    // console.log(newArray, key)
    let tempFilterBy = JSON.parse(JSON.stringify(this.state.filterBy));
    let tempIndex = tempFilterBy.findIndex((item) => {
      return item.key === key
    })
    console.log(tempIndex)
    let temp = tempFilterBy[tempIndex]
    temp['items'] = newArray;
    tempFilterBy[tempIndex] = temp
    console.log('temp', temp)
    this.setState({
      filterBy: tempFilterBy
    })
  }
  
  render(){
    const { 
      allUsers, 
      lookupTableUsers, 
      allInterviewQuestions, 
      lookupTableInterviewQuestions, 
      allInterviewQuestionsAnswers, 
      lookupTableInterviewQuestionsAnswers, 
      allSkills, 
      lookupTableAllSkills, 
      currentUser 
    } = this.props;
    
    
    if(!allUsers || !allInterviewQuestions || !allInterviewQuestionsAnswers || !allSkills ){
      // LogServices.log(allUsersAPIResponse)
      return (
        <main className="content">
          <DefaultErrorPage />
        </main>
      )
    }
    // || allInterviewQuestions === FETCHING
    
    else if(allUsers === FETCHING || allInterviewQuestions === FETCHING || allInterviewQuestionsAnswers === FETCHING || allSkills === FETCHING){
      return (
        <main className="content">
          <DefaultLoadingPage />
        </main>
      )
    }
    else{
      let allInterviewQuestionsToRender = allInterviewQuestions;
      // allInterviewQuestionsToRender = OrderMethods.orderArrayFromAttrByParam(allInterviewQuestionsToRender, <param>, 'createdAt')
      return (
        <main>
          <ContentPageTitleBar content={TITLE_BAR_INTERVIEWQUESTIONS} />
          <div className="contentList">
            <div className="fc-sortFilter">
              <div className="grid grid--1of2">
                <div className="grid-cell">
                  <article className="fc-sortBar-row">
                    <DropDownSort 
                      title="Sort By:"
                      list={this.state.sortBy}
                      resetThenSet={this.resetThenSet}
                    />
                  </article>
                </div>
                <div className="grid-cell">
                  <article className="fc-filterBar-row">
                    <DropDownFilter 
                      headerTitle=''
                      title="Filter By:"
                      list={this.state.filterBy}
                      toggleItem={this.toggleSelected}
                    />
                  </article>
                </div>
              </div>
            </div>

            <InterviewQuestionsList
              allUsersArr={allUsers}
              lookupTableUsers={lookupTableUsers}
              allInterviewQuestionsArr={allInterviewQuestionsToRender} 
              lookupTableInterviewQuestions={lookupTableInterviewQuestions}
              allInterviewQuestionsAnswersArr={allInterviewQuestionsAnswers}
              lookupTableInterviewQuestionsAnswers={lookupTableInterviewQuestionsAnswers}
              allSkillsArr={allSkills}
              lookupTableAllSkills={lookupTableAllSkills}
              currentUser={currentUser}
            />
          </div>
        </main>
      )
    }
  }
}

function mapStateToProps(state){
  return {
    allUsers: state.users.allUsers,
    lookupTableUsers: state.users.lookupTableAllUsers,
    allInterviewQuestions: state.interviewQuestions.allInterviewQuestions,
    lookupTableInterviewQuestions: state.interviewQuestions.lookupTableInterviewQuestions,
    allInterviewQuestionsAnswers: state.interviewQuestionsAnswers.allInterviewQuestionsAnswers,
    lookupTableInterviewQuestionsAnswers: state.interviewQuestionsAnswers.lookupTableInterviewQuestionsAnswers,
    allSkills: state.skills.allSkills,
    lookupTableAllSkills: state.skills.lookupTableAllSkills,
    currentUser: state.auth.currentUser,
  }
}

export default connect(mapStateToProps, {fetchUsers, fetchInterviewQuestions, fetchInterviewQuestionsAnswers, fetchSkills})(InterviewQuestions);
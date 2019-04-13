import React, {Component} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'

import { usersGetAll, interviewQuestionsGetAll, interviewQuestionAnswersGetAll, skillsGetAll } from '../../actions'

import DefaultErrorPage from '../../components/defaults/errorPage/errorPage';
import DefaultLoadingPage from '../../components/defaults/loadingPage/loadingPage';
import { 
  CARD_TITLE_INTERVIEW_QUESTIONS_GET_ALL
} from '../../components/common/content/contentInfo'

import InterviewQuestionsList from '../../components/interviewQuestions/interviewQuestionsList';
import { DropDownSort } from '../../components/common/dropdown/sort';
import { DropDownFilter } from '../../components/common/dropdown/filter';

import OrderMethods from '../../functions/orderMethods'

class InterviewQuestions extends Component {
  constructor(props){
    super(props)
    
    this.handleSelect = this.handleSelect.bind(this);
    
    this.state = {
      sortBy: [
        {
          id: 0,
          title: 'Default - None',
          selected: false,
          orderType: '',
          key: 'sortBy'
        },
        {
          id: 1,
          title: 'Date - Ascending',
          selected: false,
          orderType: 'ascending',
          key: 'sortBy'
        },
        {
          id: 2,
          title: 'Date - Decending',
          selected: false,
          orderType: 'decending',
          key: 'sortBy'
        },
        {
          id: 3,
          title: 'Alphabetical - AZ',
          selected: false,
          orderType: 'alphabeticalAZ',
          key: 'sortBy'
        },
        {
          id: 4,
          title: 'Alphabetical - ZA',
          selected: false,
          orderType: 'alphabeticalZA',
          key: 'sortBy'
        },
        // {
        //   id: 4,
        //   title: 'Most UpVoted',
        //   selected: false,
        //   orderType: 'mostUpVoted',
        //   key: 'sortBy'
        // },
        // {
        //   id: 5,
        //   title: 'Most DownVoted',
        //   selected: false,
        //   orderType: 'mostDownVoted',
        //   key: 'sortBy'
        // }
      ],
      sortByOrderType: '',
      filterIntQuestBy: [],
      filterBy: [
        {
          id: 0,
          title: 'Category',
          items: [],
          parentKey: 'category'
        },
        {
          id: 1,
          title: 'Author',
          items: [],
          parentKey: 'author'
        }
      ],
      allInterviewQuestionsToRender: []
    };
  }
  
  handleSelect = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }
  
  toggleSelected = (parentid, parentKey, childId, childIndex, childKey, name) => {
    // console.log('inside ToggleSelected: ', parentid, parentKey, childId, childIndex, childKey, name)
    let filterByArray = JSON.parse(JSON.stringify(this.state.filterBy))
    // console.log('filterByArray: ', filterByArray)
    let parentItem = { ...filterByArray[parentid]}
    // console.log('parentItem before: ', parentItem)
    parentItem.items[childIndex].selected = !parentItem.items[childIndex].selected;
    // console.log('parentItem after: ', parentItem)
    filterByArray[parentid] = parentItem;
    // need to update filterIntQuestBy Array
    // console.log('final filterByArray: ', filterByArray)
    // need to update filterIntQuestBy (this is the array that gets rendered on screen)
    let updatefilterIntQuest = JSON.parse(JSON.stringify(this.state.filterIntQuestBy))
    // console.log('updatefilterIntQuest: ', updatefilterIntQuest)
    let objIndex = updatefilterIntQuest.findIndex(obj => {
      return obj[childId] ? true : false
    })
    // console.log('objIndex: ', objIndex)
    if(objIndex !== -1){
      // so an object with parentKey passed exists, so push in the id
      updatefilterIntQuest.splice(objIndex, 1)
    } else {
      // otherwise, we need to create an object, with parentKey as key and an array, with the childId spread as value
      updatefilterIntQuest.push({
        [childId]: {
          filterType: parentKey,
          // HERE
          Id: childId,
          // id: childId,
          name: name,
        }
      })
    }
    // console.log('updatefilterIntQuest: ', updatefilterIntQuest)
    this.setState({
      filterIntQuestBy: [ ...updatefilterIntQuest ],
      filterBy: [ ...filterByArray ] 
    })
  }
  
  resetThenSet = (id, key) => {
    // deep clone
    // console.log('this.state: (before): ', this.state)    
    let temp = JSON.parse(JSON.stringify(this.state[key]))
    // console.log('id: ', id, 'key: ', key, 'temp: ', temp)
    // sets all items to false ?
    temp.forEach(item => item.selected = false);
    // console.log('temp: ', temp)
    temp[id].selected = true;
    // console.log('temp[id]', temp[id], 'temp[id].selected: ', temp[id].selected)
    // set into state the type of ordering
    this.setState({ sortByOrderType: temp[id].orderType })
    this.setState({ [key]: temp})
    // console.log('this.state: (after): ', this.state)
    // let orderedArray = this.orderArray(temp[id]['orderType'])
    // console.log(temp[id]['orderType'], orderedArray)
  }
  
  componentDidMount(){
    this.props.usersGetAll();
    this.props.interviewQuestionsGetAll();
    this.props.interviewQuestionAnswersGetAll();
    this.props.skillsGetAll();
  }
  
  static getDerivedStateFromProps(props, state){
    // console.log('GDSFP: ', 'props: ', props, 'state: ', state)
    let { 
      users: {  lookupTableAllUsers, isFetchingUsersGetAll, errorMessageUsersGetAll },
      skills: { allSkills, isFetchingSkillsGetAll, errorMessageSkillsGetAll },
      interviewQuestions: { allInterviewQuestions, isFetchingInterviewQuestionsGetAll, errorMessageInterviewQuestionsGetAll }
    } = props
    if(errorMessageSkillsGetAll){
      
    }
    else if(!isFetchingSkillsGetAll){
      // console.log('props: ', allSkills)
      // if(!state.filterBy[0].items.length){
        if(!state.filterBy[0].items.length){        
          let skillDropDown = allSkills.map((skillItem, index) => {
            return {
                // index: index,
                // Id: skillItem.Id,
                Id: skillItem.id,
                name: skillItem.name,
                count: skillItem._interviewquestionsWithCategory.length,
                selected: false,
                childKey: 'categoryItem'
              }
          }).filter(skillItem => skillItem.count > 0)
          skillDropDown = skillDropDown.sort((a, b) => {
            // console.log('a: ', a.count, 'b: ', b.count)
            return b.count - a.count;
          })
          // reassign indexes so they are clean
          // skillDropDown.forEach((item, index) => {
          //   item.index = index;
          // })
          let filterByUpdate = { ...state.filterBy }
          filterByUpdate[0].items = skillDropDown;
          // console.log('finished making category filter state: ', state)
          // this.setState({filterBy: filterByUpdate})
          // console.log('state: ', state)
        }
      }
    if(errorMessageUsersGetAll && errorMessageInterviewQuestionsGetAll){
      
    }
    else if(!isFetchingUsersGetAll && !isFetchingInterviewQuestionsGetAll){
      // make a map of intQuestions _createdBy
      if(!state.filterBy[1].items.length){
        let intQuestCreatedMap = {}
        allInterviewQuestions.forEach(intQuestion => {
          if(intQuestCreatedMap[intQuestion._createdByUser]){
            intQuestCreatedMap[intQuestion._createdByUser] += 1;
          } else {
            intQuestCreatedMap[intQuestion._createdByUser] = 1;
          }
        })
        // console.log('GDSFP: intQuestCreatedMap: ', intQuestCreatedMap)
        let userFilterItems = [];
        // let index = 0
        for(let key in intQuestCreatedMap){
          // console.log('key: ', key, 'vs: ', intQuestCreatedMap[key])
          let tempObj = {
            Id: key,
            name: lookupTableAllUsers[key]['name'],
            count: intQuestCreatedMap[key],
            selected: false,
            childKey: 'authorItem'
          }
          userFilterItems.push(tempObj)
        }
        // console.log('userFilterList: ', userFilterList)
        userFilterItems = userFilterItems.sort((a, b) => b.count - a.count)
        let filterByUpdate = { ...state.filterBy }
        filterByUpdate[1].items = userFilterItems;
        // console.log('finished making author filter state: ', state)
      }
      
    }
    if(errorMessageInterviewQuestionsGetAll){
      
    }
    else if(!isFetchingInterviewQuestionsGetAll){
      // let allIntQuestToRender = [ ...state.allInterviewQuestionsToRender ]
      state.allInterviewQuestionsToRender = [ ...allInterviewQuestions ]
    }
  }

  sortArrayBy = (allIntQuestions, sortByString) => {
    // console.log('sortArrayBy: ', sortByString, 'in: ', allIntQuestions)
    if(sortByString === this.state.sortBy[1].orderType){
      return OrderMethods.orderArrayByDateAscending(allIntQuestions, 'createdAt')
    }
    if(sortByString === this.state.sortBy[2].orderType){
      return OrderMethods.orderArrayByDateDecending(allIntQuestions, 'createdAt')
    }
    if(sortByString === this.state.sortBy[3].orderType){
      return OrderMethods.orderByAlphaAscending(allIntQuestions, 'title')
    }
    if(sortByString === this.state.sortBy[4].orderType){
      return OrderMethods.orderByAlphaDecending(allIntQuestions, 'title')
    }
    return allIntQuestions;
  }
  
  filterArrayBy = (orderedIntQuestions, filterIntQuestByArray) => {
    // new array instance
    // console.log('oIQ: ', orderedIntQuestions, 'fIQA: ', filterIntQuestByArray)
    let filteredIntQuestionsArray = [...orderedIntQuestions];
    let filterArrayCopy = [...filterIntQuestByArray]
    // as long as the filterIntQuestByArray has a length, we'll pull the first value and filter the filterArray
    while(filterArrayCopy.length){
      // console.log('should not go here')
      // console.log('will go here: ')
      let itemFromArray = filterArrayCopy.shift();
      // console.log('itemFromArray: ', itemFromArray)
      // process the item
      let itemToFilter = {}
      for(let key in itemFromArray){
        itemToFilter = { ...itemFromArray[key]}
      }
      // console.log('itemToFilter: ', itemToFilter)
      filteredIntQuestionsArray = filteredIntQuestionsArray.filter(intQuestion => {
        // if the type of the filter object = 'category'
        if(itemToFilter.filterType === this.state.filterBy[0].parentKey){
          // use the intQuestion category to get only quests with this items ID in the category array
          return intQuestion.categories.includes(itemToFilter.Id)
        }
        // if the type of the filter object = 'author'
        if(itemToFilter.filterType === this.state.filterBy[1].parentKey){
          // then return the items that match the items ID in the _createdByUser category
          return intQuestion._createdByUser === itemToFilter.Id
        }
        return [];
      })
    }
    // console.log('will just return')
    // console.log('will return after first filter: ')
    return filteredIntQuestionsArray
  }
  
  renderContent = () => {
    let { 
      users: { allUsers, lookupTableAllUsers, isFetchingUsersGetAll, errorMessageUsersGetAll },
      interviewQuestions: { 
        // allInterviewQuestions, 
        lookupTableAllInterviewQuestions, isFetchingInterviewQuestionsGetAll, errorMessageInterviewQuestionsGetAll },
      interviewQuestionAnswers: { allInterviewQuestionAnswers, lookupTableAllInterviewQuestionAnswers, isFetchingInterviewQuestionAnswersGetAll, errorMessageInterviewQuestionAnswersGetAll},
      skills: { allSkills, lookupTableAllSkills, isFetchingSkillsGetAll, errorMessageSkillsGetAll },
      currentUser 
    } = this.props;
    const {
      title
    } = CARD_TITLE_INTERVIEW_QUESTIONS_GET_ALL;
    // isFetchingUsersGetAll = true;
    if(errorMessageUsersGetAll || errorMessageInterviewQuestionsGetAll || errorMessageInterviewQuestionAnswersGetAll || errorMessageSkillsGetAll ){
      return (
        <DefaultErrorPage 
        
        />
      )
    }
    else if(isFetchingUsersGetAll || isFetchingInterviewQuestionsGetAll || isFetchingInterviewQuestionAnswersGetAll || isFetchingSkillsGetAll){
      return (
        <DefaultLoadingPage 
          title={title}
          classNameTxt='ta-cent'
        />
      )
    }
    // else if(isFetchingUserGetAll && isFetchingInterviewQuestionsGetAll){
    //   return (
    //     <DefaultLoadingPage />
    //   )
    // }
    else{
      let questionsToRenderOrdered = this.sortArrayBy(this.state.allInterviewQuestionsToRender, this.state.sortByOrderType)
      // console.log('ordered: ', questionsToRenderOrdered )
      let questionsToRenderOrderedAndFiltered = this.filterArrayBy(questionsToRenderOrdered, this.state.filterIntQuestBy)
      // console.log('filtered Array: ', questionsToRenderOrderedAndFiltered)
      // console.log('this.state to child: ', this.state.filterBy)
      return (
        <>
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
                    toggleSelected={this.toggleSelected}
                  />
                </article>
              </div>
            </div>
          </div>

          <InterviewQuestionsList
            allUsersArr={allUsers}
            lookupTableAllUsers={lookupTableAllUsers}
            allInterviewQuestionsArr={questionsToRenderOrderedAndFiltered} 
            lookupTableAllInterviewQuestions={lookupTableAllInterviewQuestions}
            allInterviewQuestionAnswersArr={allInterviewQuestionAnswers}
            lookupTableAllInterviewQuestionAnswers={lookupTableAllInterviewQuestionAnswers}
            allSkillsArr={allSkills}
            lookupTableAllSkills={lookupTableAllSkills}
            currentUser={currentUser}
          />
        </>
      )
    }
  }
  
  render(){
    return (
      <>
        {this.renderContent()}
      </>
    )
  }
}

function mapStateToProps(state){
  return {
    users: state.users,
    interviewQuestions: state.interviewQuestions,
    interviewQuestionAnswers: state.interviewQuestionAnswers,
    skills: state.skills,
    auth: state.auth,
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({usersGetAll, interviewQuestionsGetAll, interviewQuestionAnswersGetAll, skillsGetAll}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(InterviewQuestions);
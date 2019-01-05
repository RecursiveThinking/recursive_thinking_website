import DM from '../standards/dictModel'

import OrderMethods from '../functions/orderMethods'

const {
  intQuestion: {
    categories
  }
} = DM

class FilterMethods {
  constructor(){
    
  }
  static buildCategoryCountForFilterDropDown(allInterviewQuestionsArr){
    // console.log("log", allInterviewQuestionsArr)
    let countMap = {}
    // each item
    for(let i = 0; i < allInterviewQuestionsArr.length; i += 1){
      for(let j = 0; j < allInterviewQuestionsArr[i][categories].length; j += 1){
        // let item = allInterviewQuestionsArr[i][categories][j]
        if(countMap[allInterviewQuestionsArr[i][categories][j]]){
          countMap[allInterviewQuestionsArr[i][categories][j]] += 1;
        } else {
          countMap[allInterviewQuestionsArr[i][categories][j]] = 1;
        }
      }
      // console.log('count', countMap)
    }
    // make an array of objects
    let filterArrayCategories = [];
    for(let key in countMap){
      let tempObj = {};
      tempObj[key] = key;
      tempObj['count'] = countMap[key];
      filterArrayCategories.push(tempObj)
    }
    // array of objs { Id: "dlkdslsd", count: # } now just order it highest to lowest
    return OrderMethods.orderArrayDecendingByAttr(filterArrayCategories, 'count')
  }
  static filterArrayByCategoryId(arrayToFilter, categoryId){
    console.log(arrayToFilter, categoryId)
    for(let i = 0; i < arrayToFilter.length; i += 1){
      
    }
  }
}

export default FilterMethods;
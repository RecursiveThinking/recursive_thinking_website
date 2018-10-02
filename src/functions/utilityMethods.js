import React from 'react'

export default class utilityMethods {
  static getArrayOfObjectsByKey(lookupTable, arrayOfKeys){
    let returnArray = [];
    arrayOfKeys.forEach((key) => {
      if(lookupTable[key]){
        returnArray.push(lookupTable[key])
      }
    })
    return returnArray;
  }
  static createObjectFromArrayByProp(arrayToObj, arrayProp){
    let returnObj = {}
    arrayToObj.forEach((item) => {
      returnObj[item[arrayProp]] = item;
    })
    return returnObj;
  }
  static getObjectByKey(lookupTable, keyValueToMatch){
    if(lookupTable[keyValueToMatch]){
      return lookupTable[keyValueToMatch]
    } 
    // else {
    //   return null
    // }
  }
  static generateOptionsList(currentUserId, isCurrentUserAdmin, itemCreatedByUserId, size){
    let optionListVar = [ 'ban', 'edit', 'delete']
    function returnOptionsList(item, currentUser, isCurrentUserAdmin, itemCreatedBy){
      if(item === 'ban'){
        let classString = `${size} fcAlert fa fa-ban`
        return (
          <i className={classString}></i>
        )
      }
      else if(item === 'edit'){
        if(currentUser === itemCreatedBy || isCurrentUserAdmin){
          let classString = `${size} fcGreenRT fa fa-pencil`
          return (
            <i className={classString}></i>
          )
        }
      }
      else if(item === 'delete'){
        if(currentUser === itemCreatedBy || isCurrentUserAdmin){
          let classString = `${size} fcWarn fa fa-trash-o`
          return (
            <i className={classString}></i>
          )
        }
      }
    }
    let createOptionList = optionListVar.map(listItem => {
      return returnOptionsList(listItem, currentUserId, isCurrentUserAdmin, itemCreatedByUserId, size)
    })
    return createOptionList
  }
  static isNil(value) {
    return value == null;
  }
}
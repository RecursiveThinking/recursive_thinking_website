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
    function returnOptionsList(item, currentUser, isCurrentUserAdmin, itemCreatedBy, sizeP, indexP){
      if(item === 'ban'){
        let classString = `${sizeP} fcAlert fa fa-ban`
        return (
          <li key={indexP}>
            <i className={classString}></i>
          </li>
        )
      }
      else if(item === 'edit'){
        if(currentUser === itemCreatedBy || isCurrentUserAdmin){
          let classString = `${sizeP} fcGreenRT fa fa-pencil`
          return (
            <li key={indexP}>
              <i className={classString}></i>
            </li>
          )
        }
      }
      else if(item === 'delete'){
        if(currentUser === itemCreatedBy || isCurrentUserAdmin){
          let classString = `${sizeP} fcWarn fa fa-trash-o`
          return (
            <li key={indexP}>
              <i className={classString}></i>
            </li>
          )
        }
      }
    }
    let createOptionList = optionListVar.map((listItem, index) => {
      return returnOptionsList(listItem, currentUserId, isCurrentUserAdmin, itemCreatedByUserId, size, index)
    })
    return createOptionList
  }
  static isNil(value) {
    return value == null;
  }
}
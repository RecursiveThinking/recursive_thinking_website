import React from 'react'
import { Link } from 'react-router-dom'

import { ROUTES_REACT } from '../standards/routes'

const {
  lessons_edit,
  lessons_edit_id
} = ROUTES_REACT

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
  static generateOptionsList(currentUserId, isCurrentUserAdmin, pathForLink, itemCreatedByUserId, itemId, size){
    let optionListVar = [ 'ban', 'edit', 'delete']
    function returnOptionsList(item, currentUser, isCurrentUserAdmin, pathForLink, itemCreatedBy, itemIdent, sizeP, indexP){
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
              <Link to={`${pathForLink}/${itemIdent}`}>
                <i className={classString}></i>
              </Link>
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
      return returnOptionsList(listItem, currentUserId, isCurrentUserAdmin, pathForLink, itemCreatedByUserId, itemId, size, index)
    })
    return createOptionList
  }
  static isNil(value) {
    return value == null;
  }
}
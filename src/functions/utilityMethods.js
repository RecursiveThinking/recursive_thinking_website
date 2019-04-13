import React from 'react'
import { Link } from 'react-router-dom'

// import { ROUTES_REACT } from '../standards/routes'

// const {
  // lessons_edit,
  // lessons_edit_id
// } = ROUTES_REACT

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
    if(!arrayToObj){
      return null;
    }
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
  static generateOptionsList(currentUserId, isCurrentUserAdmin, pathForBanLink, pathForEditLink, pathForDeleteLink, itemCreatedByUserId, itemId, size){
    console.log('lesson created by: ', itemCreatedByUserId)
    let optionListVar = [ 'ban', 'edit', 'delete']
    function returnOptionsList(item, currentUserId, isCurrentUserAdmin, pathForBanLink, pathForEditLink, pathForDeleteLink, itemCreatedBy, itemIdent, sizeP, indexP){
      if(item === 'ban'){
        // let classString = `${sizeP} fcWarn fa fa-ban`
        return (
          // <li key={indexP}>
          //   <i className={classString}></i>
          // </li>
          null
        )
      }
      else if(item === 'edit'){
        console.log(currentUserId, itemCreatedBy, isCurrentUserAdmin)
        if(currentUserId === itemCreatedBy || isCurrentUserAdmin){
          let classString = `${sizeP} fcGreenRT fa fa-pencil`
          return (
            <li key={indexP}>
              <Link to={`${pathForEditLink}/${itemIdent}`}>
                <i className={classString}></i>
              </Link>
            </li>
          )
        }
      }
      else if(item === 'delete'){
        if(currentUserId === itemCreatedBy || isCurrentUserAdmin){
          let classString = `${sizeP} fcError fa fa-trash-o`
          return (
            <li key={indexP}>
              <Link to={`${pathForDeleteLink}/${itemIdent}`}>
                <i className={classString}></i>
              </Link>
            </li>
          )
        }
      }
    }
    let createOptionList = optionListVar.map((listItem, index) => {
      return returnOptionsList(listItem, currentUserId, isCurrentUserAdmin, pathForBanLink, pathForEditLink, pathForDeleteLink, itemCreatedByUserId, itemId, size, index)
    })
    return createOptionList
  }
  static generateOptionsListAnswers(currentUserId, isCurrentUserAdmin, questionId, pathForBanLink, pathForEditLink, pathForDeleteLink, itemCreatedByUserId, itemId, size){
    let optionListVar = [ 'ban', 'edit', 'delete']
    function returnOptionsListAnswers(item, currentUserId, isCurrentUserAdmin, questionId, pathForBanLink, pathForEditLink, pathForDeleteLink, itemCreatedBy, answerId, sizeP, indexP){
      if(item === 'ban'){
        // let classString = `${sizeP} fcWarn fa fa-ban`
        return (
          // <li key={indexP}>
          //   <i className={classString}></i>
          // </li>
          null
        )
      }
      else if(item === 'edit'){
        if(currentUserId === itemCreatedBy || isCurrentUserAdmin){
          let classString = `${sizeP} fcGreenRT fa fa-pencil`
          return (
            <li key={indexP}>
              <Link to={`/interviewquestions/${questionId}/answers/edit/${answerId}`}>
                <i className={classString}></i>
              </Link>
            </li>
          )
        }
      }
      else if(item === 'delete'){
        if(currentUserId === itemCreatedBy || isCurrentUserAdmin){
          let classString = `${sizeP} fcError fa fa-trash-o`
          return (
            <li key={indexP}>
              <Link to={`/interviewquestions/${questionId}/answers/delete/${answerId}`}>
                <i className={classString}></i>
              </Link>
            </li>
          )
        }
      }
    }
    let createOptionList = optionListVar.map((listItem, index) => {
      return returnOptionsListAnswers(listItem, currentUserId, isCurrentUserAdmin, questionId, pathForBanLink, pathForEditLink, pathForDeleteLink, itemCreatedByUserId, itemId, size, index)
    })
    return createOptionList
  }
  static isNil(value) {
    return value == null;
  }
}
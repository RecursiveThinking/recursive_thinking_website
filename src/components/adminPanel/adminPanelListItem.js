import React from 'react'

import DM from '../../standards/dictModel'

import {TABLE_NAMES} from './adminPanelList'

const adminPanelListItem = ({...props}) => {
  const {
    user: { email },
    lesson: { scheduled, lessonVotes, _lessonCreatedBy }
  } = DM;
  const { users, lessons, interviewQuestions, interviewQuestionsAnswers} = TABLE_NAMES;
  
  let tableHeadingJSX  = props.tableHeadingArr.map(attr => {
    return (
      <th className="ta-cent">{attr}</th>
      )
    })
    
    let tableBodyJSX = props.tableBodyArr.map((obj, index) => {
      let tableData = props.tableHeadingArr.map(attr => {
        function genRenderString(attr){
          if(props.table === users){
            if(attr === email){
              return (
                <a href="#">{obj[attr]}</a>
                )
              }
              else if(obj[attr] === true || obj[attr] === false){
                let boolString = returnTrueOrFalse(obj[attr])
                return boolString
              }
              else if(!obj[attr]){
                return 'Does Not Exist'
              }
              else {
                return obj[attr]
              }
            }
        else if(props.table === lessons){
          if(attr === scheduled){
            return returnTrueOrFalse(obj[attr])
          } 
          else if(attr === lessonVotes){
            return obj[attr].length
          }
          else if(attr === _lessonCreatedBy){
            let content = getUserObjById(obj[attr], props.lookupTableUsers)
            if(typeof(content) === 'string'){
              return content;
            } else {
              return content.name
            }
          }
          else {
            return obj[attr]
          }
        }
        else {
          return obj[attr]
        }
      }
      function genClassName(attr){
        if(props.table === users){
          if(attr === email){
            return "ta-cent"
          } 
          else if(obj[attr] === true || obj[attr] === false){
            return "ta-cent"
          } 
          else if(!obj[attr]){
            return "ta-cent"
          }
          else {
            return "ta-left"
          }
        }
        if(props.table === lessons){
          if(attr === lessonVotes || attr === scheduled){
            // return "ta-cent"
          }
          else {
            return "ta-left"
          }
        }
        return "ta-left"
      }
      return (
        <td className={genClassName(attr)}>
          {genRenderString(attr)}
        </td>
      )
    })
    
    return (
      <tr>
        { tableData }
      </tr>
    )
  })
  
  function returnTrueOrFalse(attr){
    if(attr === true){
      return 'True'
    } else {
      return 'False'
    }
  }
  function getUserObjById(userId, lookupTable){
    if(lookupTable[userId]){
      return lookupTable[userId]
    } else {
      return 'User Does Not Exist'
    }
  }
  return (
    // <li className="grid grid--full">
      <article className="card width100P">
        <h5 className="fw700 ls14 ttup fcGrey424041 mb10">{props.title}</h5>
        <hr />
        <table className="width100P">
          <thead>
            <tr>
              {tableHeadingJSX}
            </tr>
          </thead>
          <tbody>
            {tableBodyJSX}
          </tbody>
        </table>
      </article>
    // </li>
  )
}

export default adminPanelListItem;
import React from 'react'

import DM from '../../standards/dictModel'

import {TABLE_NAMES} from './adminPanelList'

const adminPanelListItem = ({...props}) => {
  const {
    user: { email },
    lesson: { scheduled, lessonVotes, _lessonCreatedBy }
  } = DM;
  const { users, lessons } = TABLE_NAMES;
  
  let tableHeadingJSX  = props.tableHeadingArr.map((attr, index) => {
    return (
      <th
        key={index}
        className="ta-cent">{attr}</th>
      )
    })
    
    let tableBodyJSX = props.tableBodyArr.map((obj, objIndex) => {
      let tableData = props.tableHeadingArr.map((attr, attrIndex) => {
        function genRenderString(attr, index){
          if(props.table === users){
            if(attr === email){
              return (
                <a href="/">{obj[attr]}</a>
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
            let content = getUserObjById(obj[attr], props.lookupTableAllUsers)
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
      function genClassName(attr, attrIndex){
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
        <td
          key={`${attr}${attrIndex}`}
          className={genClassName(attr, attrIndex)}
        >
          {genRenderString(attr, attrIndex)}
        </td>
      )
    })
    
    return (
      <tr key={`${obj}${objIndex}`}>
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
        <h5 className="fw600 ls14 fcGrey424041 mb10">{props.title}</h5>
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
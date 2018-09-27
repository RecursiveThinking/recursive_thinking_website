import React from 'react'

// import CategoryListItem from './categoryListItem'

const ProfileSkillsLanguages = require('!json-loader!../../../../data_returns/RecursiveThinkingProfileSkillsLanguage.json');
const ProfileSkillsProfessional = require('!json-loader!../../../../data_returns/RecursiveThinkingProfileSkillsProfessional.json');
const ProfileSkillsSoftware = require('!json-loader!../../../../data_returns/RecursiveThinkingProfileSkillsSoftware.json');

const categoriesArray = [...ProfileSkillsLanguages, ...ProfileSkillsProfessional, ...ProfileSkillsSoftware];
const categoriesObj = {};

categoriesArray.forEach(item => {
  categoriesObj[item['Id']] = item
})

console.log(categoriesObj)

const categoryList = ({lessonCategories}) => {
  
  if(!lessonCategories.length){
    // console.log('there is nothing to render')
    return (
      ""
      // <h1>There are no Answers</h1>
      // <hr className="mt10" />
    )
  } else {
    // create empty array
    let catsToRenderArr = [];
    lessonCategories.forEach((lesson, index) => {
        if(categoriesObj[lessonCategories[index]]){
          catsToRenderArr.push(categoriesObj[lessonCategories[index]])
        }
      }
    )
    console.log('catsRenderArr', catsToRenderArr)
      
    let allCats = catsToRenderArr.map(catItem => {
      return (
        <li key={catItem.Id} className="tag ta-cent">
          {/* <CategoryListItem catItem={catItem} /> */}
          {catItem.name}
        </li>
      )
    })
    return (
      <div>        
        <ul className="fc-Tags">
          {allCats}
        </ul>
        <hr />
      </div>
    )
  }
}

export default categoryList;
import React from 'react'

// import CategoryListItem from './categoryListItem'

// const ProfileSkillsLanguages = require('!json-loader!../../../../data_returns/RecursiveThinkingProfileSkillsLanguage.json');
// const ProfileSkillsProfessional = require('!json-loader!../../../../data_returns/RecursiveThinkingProfileSkillsProfessional.json');
// const ProfileSkillsSoftware = require('!json-loader!../../../../data_returns/RecursiveThinkingProfileSkillsSoftware.json');

// const categoriesArray = [...ProfileSkillsLanguages, ...ProfileSkillsProfessional, ...ProfileSkillsSoftware];
// const categoriesObj = {};

// categoriesArray.forEach(item => {
//   categoriesObj[item['Id']] = item
// })

// console.log(categoriesObj)

const categoryList = ({categories, allSkillsArr, lookupTableAllSkills}) => {
  if(!categories.length){
    // console.log('there is nothing to render')
    return (
      ""
      // <h1>There are no Categories</h1>
      // <hr className="mt10" />
    )
  } else {
    // create empty array
    let catsToRenderArr = [];
    categories.forEach((category, index) => {
        if(lookupTableAllSkills[categories[index]]){
          catsToRenderArr.push(lookupTableAllSkills[categories[index]])
        }
      }
    )
    // console.log('catsRenderArr', catsToRenderArr)
      
    let allCats = catsToRenderArr.map(catItem => {
      return (
        <li key={catItem.Id} className="tag fs16 ls10 fcGrey424041 ta-cent">
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
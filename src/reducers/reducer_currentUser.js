import Random from '../functions/random'

const Users = require('!json-loader!../../data_returns/RecursiveThinkingDeveloperProfiles.json')

export default function(){
  return Users[Random.getRandomIndex(Users.length)]
  // return Users[2]
}
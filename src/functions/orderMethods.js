export default class OrderMethods {
  // constructor(){
    
  // }
  // closest first
  static orderArrayByDateAscending = (inputArray, attr) => {
    let orderArraysAscend = inputArray.sort((itemA, itemB) => {
      return new Date(itemA[attr]) - new Date(itemB[attr])
    })
    return orderArraysAscend
  }
  // farthest first
  static orderArrayByDateDecending = (inputArray, attr) => {
    let orderArraysDecend = inputArray.sort((itemA, itemB) => {
      return new Date(itemB[attr]) - new Date(itemA[attr])
    })
    return orderArraysDecend
  }
  static orderByAlphaAscending = (inputArray, attr) => {
    let orderAlphaAscend = inputArray.sort((itemA, itemB) => {
      let itemAFirstWord = itemA[attr].toLowerCase().split(' ');
      let itemBFirstWord = itemB[attr].toLowerCase().split(' ');
      console.log('iA: ', itemAFirstWord, 'iB: ', itemBFirstWord)      
      if(itemAFirstWord < itemBFirstWord){ return -1 }
      if(itemAFirstWord > itemBFirstWord){ return 1 }
      return 0;
    })
    console.log('alphascend: ', orderAlphaAscend)
    return orderAlphaAscend
  }
  static orderByAlphaDecending = (inputArray, attr) => {
    let orderAlphaDecend = inputArray.sort((itemA, itemB) => {
      let itemAFirstWord = itemA[attr].toLowerCase().split(' ');
      let itemBFirstWord = itemB[attr].toLowerCase().split(' ');
      console.log('iA: ', itemAFirstWord, 'iB: ', itemBFirstWord)
      if(itemAFirstWord > itemBFirstWord){ return -1 }
      if(itemAFirstWord < itemBFirstWord){ return 1 }
      return 0;
    })
    console.log('alphascend: ', orderAlphaDecend)
    return orderAlphaDecend
    
  }
  static orderArrayAscendingByAttr = (inputArray, attr) => {
    return inputArray.sort((itemA, itemB) => itemA[attr] - itemB[attr])
  }
  static orderArrayDecendingByAttr = (inputArray, attr) => {
    return inputArray.sort((itemA, itemB) => itemB[attr] - itemA[attr])
  }
}
export default class OrderMethods {
  constructor(){
    
  }
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
  static orderArrayAscendingByAttr = (inputArray, attr) => {
    return inputArray.sort((itemA, itemB) => itemA[attr] - itemB[attr])
  }
  static orderArrayDecendingByAttr = (inputArray, attr) => {
    return inputArray.sort((itemA, itemB) => itemB[attr] - itemA[attr])
  }
}
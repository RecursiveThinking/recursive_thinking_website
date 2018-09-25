export default class orderMethods {
  constructor(){
    
  }
  // closest first
  static orderArrayByDateAscending = (inputArray, dateProp) => {
    let orderArraysAscend = inputArray.sort((itemA, itemB) => {
      return new Date(itemA[dateProp]) > new Date(itemB[dateProp])
    })
    return orderArraysAscend
  }
  // farthest first
  static orderArrayByDateDecending = (inputArray) => {
    let orderArraysDecend = inputArray.sort((itemA, itemB) => {
      return new Date(itemA.date) < new Date(itemB.date)
    })
    return orderArraysDecend
  }
}
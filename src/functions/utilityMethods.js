export default class utilityMethods {
  static getArrayOfObjectsByKey(allArray, arrayOfKeys){
    let returnArray = [];
    let allArrayLookupObj = this.createObjectFromArrayByProp(allArray, 'Id');
    // console.log('allArrLookupObj', allArrayLookupObj)
    arrayOfKeys.forEach((key) => {
      if(allArrayLookupObj[key]){
        returnArray.push(allArrayLookupObj[key])
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
  static getObjectByKey(fullArrayOfItems, key, keyValueToMatch){
    let itemIndex = fullArrayOfItems.findIndex(item => {
      // console.log(item, item[key], item[key[keyValueToMatch]], keyValueToMatch )
      return item[key] === keyValueToMatch;
    })
    return fullArrayOfItems[itemIndex]
  }
}
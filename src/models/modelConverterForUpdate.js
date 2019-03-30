
class ModelConverterForUpdate {
  static returnBodyObject(dictModelObject, object){
    const genObj = {
      Key: {},
      ExpressionAttributeNames: {},
      ExpressionAttributeValues: {},
      UpdateExpression: ""
    }
    // console.log('in model converter: ', dictModelObject, object)
    if(object.userId){
      genObj.Key.userId = object.userId
    }
    else if(object.id){
      genObj.Key.id = object.id
    } else {
      genObj.Key.Id = object.Id
    }
    // make both EAN and EAV
    for(let key in object){
      if(key === dictModelObject.Id || key === dictModelObject.userId || key === dictModelObject.id){
        // don't do anything because you can't put the ID in with the names/values, its already the key
      } else { 
        let tempEAN = `#${key}`;
        genObj.ExpressionAttributeNames[tempEAN] = dictModelObject[key];
        let tempEAV = `:${key}`;
        genObj.ExpressionAttributeValues[tempEAV] = object[key];
      }
    }
    
    let array = [];
    for(let key in genObj.ExpressionAttributeNames){
      array.push(`${key} = :${genObj.ExpressionAttributeNames[key]}`)
    }
    array = array.toString().split(',').join(', ');
    let UEString = 'SET ';
    genObj.UpdateExpression = UEString += array;
    // console.log('genObj @ end', genObj)
    return genObj;
  }
}

export default ModelConverterForUpdate;
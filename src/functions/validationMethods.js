class ValidationMethods {
  static checkForFullName(inputName){
    // this function checks for a first and last name. 
    // current is this input will accept first middle last or first last
    if(inputName.split(' ').length > 1 && inputName.split(' ').length < 4){
      // console.log('split', inputName.split(' '))
      return true
    }
    // console.log('split', inputName.split(' '))
    return false
  }
  
  static doesHaveSpaces(inputValue){
    // if you split the input, and it has a length (> 0) then return true
    if(inputValue.split(' ').length > 1){
      return true
    }
    return false
  }
  
  static isEachWordOverCharLimit(arrayOfWords, charLimit){
    const boolArray = [];
    
    arrayOfWords.forEach(word => {
      if(word.length >= charLimit){
        boolArray.push(true)
      } else {
        boolArray.push(false)
      }
    })
    
    return boolArray.every(arrItem => arrItem === true)
  }
  
  static isWordOverCharLimit(word, charLimit){
    if(word.length >= charLimit){
      return true;
    } else {
      return false;
    }
  }
  
  static isEmailAddressValid(emailValue){
    // const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(emailValue).toLowerCase());
  }
  
  static isValidVerificationCode(inputCode){
    const re = /^[0-9]{6}$/
    return re.test(Number(inputCode));
  }
}

export default ValidationMethods
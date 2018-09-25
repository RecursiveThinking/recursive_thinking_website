export default class Random {
  
  static getRandomIndex(inputArrayLength){
    const min = 0;
    const max = inputArrayLength;
    // return random
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  
}
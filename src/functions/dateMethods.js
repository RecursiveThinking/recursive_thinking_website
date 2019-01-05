let arrayOfDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
let arrayOfMonths = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export default class dateMethods {
  // constructor(){
  // }

  static getDayOfWeek(index){
    let dateString = arrayOfDays[index];
    return dateString;
  }
  
  static getMonthOfYear(index){
    let monthString = arrayOfMonths[index];
    return monthString;
  }
  
  static getFormattedDate(dateToFormat){
    dateToFormat = new Date(dateToFormat)
    const dayOfWeek = this.getDayOfWeek(dateToFormat.getDay());
    let dateOfMonth = dateToFormat.getDate();
    const year = dateToFormat.getFullYear();
    const monthAsNumberIndex = dateToFormat.getMonth();
    const monthAsNumber = monthAsNumberIndex + 1;
    const monthAsString = this.getMonthOfYear(monthAsNumberIndex);
    const upComingDateStringEuroNamingNumber = `${year} ${monthAsNumber} ${dateOfMonth}`
    const upComingDateStringAmericanNaming = `${monthAsString} ${dateOfMonth}, ${year}`
    const upComingDateStringAmericanWithSlash = `${monthAsNumber}/${dateOfMonth}/${year}`
    
    if(Number(dateOfMonth) < 10){
      // console.log('type of', typeof dateOfMonth)
      dateOfMonth = `0${dateOfMonth}`
    }
    
    return {
        dayOfWeek: dayOfWeek,
        dateOfMonth: dateOfMonth,
        year: year,
        monthAsNumberIndex: monthAsNumberIndex,
        monthAsNumber: monthAsNumber,
        monthAsString: monthAsString,
        upComingDateStringEuroNamingNumber: upComingDateStringEuroNamingNumber,
        upComingDateStringAmericanNaming: upComingDateStringAmericanNaming,
        upComingDateStringAmericanWithSlash: upComingDateStringAmericanWithSlash
    };
  }
}
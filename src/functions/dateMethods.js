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
  
  static whenIsNextSaturdayNoon(optionalDate){
    let referenceDay;
    // If no date is entered as an argument, function will create a current timestamp to find the next Saturday
    if (!optionalDate){
      referenceDay = Date.now();
    }
    // First checks to see if the user submitted date argument is valid. If it isn't it will return an error message. If it is, the function will use that date to find next Saturday. The date needs to be converted to milliseconds first 
    else {
      let checkBadDate = Date.parse(optionalDate);
      // was ==
      if (isNaN(checkBadDate) === true){
        return 'Error, please check your date';
      }
      let dateConversion = new Date(optionalDate);
      referenceDay = dateConversion.getTime();
    }
    console.log('referenceDay: ', referenceDay)
    let millisecondsPerDay = 86400000;
    // Gets the day of the week for the entered date (user submitted or default)
    let dayOfWeek = new Date(referenceDay).getDay();
    // Takes the day of the week, adds (in milliseconds) x days to get the date of the upcoming Saturday. Can delete the day variables, I left them in to help read the getDay output (Sunday=0, Saturday=6)
    let upcomingSaturday, day;
    switch (dayOfWeek) {
      case 0:
        day = "Sunday";
        upcomingSaturday = new Date(referenceDay + 6*(millisecondsPerDay));
        break;
      case 1:
        day = "Monday";
        upcomingSaturday = new Date(referenceDay + 5*(millisecondsPerDay));
        break;
      case 2:
        day = "Tuesday";
        upcomingSaturday = new Date(referenceDay + 4*(millisecondsPerDay));
        break;
      case 3:
        day = "Wednesday";
        upcomingSaturday = new Date(referenceDay + 3*(millisecondsPerDay));
        break;
      case 4:
        day = "Thursday";
        upcomingSaturday = new Date(referenceDay + 2*(millisecondsPerDay));
        break;
      case 5:
        day = "Friday";
        upcomingSaturday = new Date(referenceDay + 1*(millisecondsPerDay));
        break;
      case 6:
        day = "Saturday";
        // Checks to see if it is past noon already on Saturday. If so, returns the following Saturday
        if (new Date(referenceDay).getHours() === 12){
          console.log('move day')
          upcomingSaturday = new Date(referenceDay + 7*(millisecondsPerDay));
        }
        else {
          console.log('do not move day')
          upcomingSaturday = new Date(referenceDay + 0*(millisecondsPerDay));
        }
    }
    // Splits the date output up for the return statement
    // console.log('upcomingSaturday', upcomingSaturday)
    // convert back to date object so can use methods
    upcomingSaturday = new Date(upcomingSaturday)
    // sets time (no matter what it is, to noon)
    upcomingSaturday.setHours('12', '00', '00', '00')
    // console.log(typeof upcomingSaturday)
    
    return upcomingSaturday;
  }
}
import OrderMethods from './orderMethods'
import DateMethods from './dateMethods';

export default class LessonMethods {
  // constructor(){
  // }
  static getArrayOfScheduledLessons = (lessonArray) => {
    if(!lessonArray.length){
      return lessonArray;
    }
    // console.log(lessonArray)
    // scheduledLessons
    let scheduledLessonsArr = lessonArray.filter(lesson => lesson.scheduled === true);
    // filter any that have passed
    let validLessonsArr = LessonMethods.filterScheduledLessonsByToday(scheduledLessonsArr)
    // order by most recent first
    let orderSchedLessonsAscend = OrderMethods.orderArrayByDateAscending(validLessonsArr, 'date');
    // how many lessons
    const numberOfLessonsToRenderInList = 6
    // return an array of that many (limit)
    let scheduledLessonListArray = orderSchedLessonsAscend.filter((item, index) => {
      return index < numberOfLessonsToRenderInList;
    })
    return scheduledLessonListArray;
  }
  static getArrayOfUnscheduledLessons = (lessonArray) => {
    if(!lessonArray.length){
      return lessonArray;
    }
    // lessons which are not scheduled
    let unscheduledLessonsArr = lessonArray.filter(lesson => lesson.scheduled === false);
    // filter any that are too old
    let unschedLessonsWithinTimeFrame = LessonMethods.getValidUnscheduledLessons(unscheduledLessonsArr)
    // limit?  No!
    // order ascending?  YES!
    let orderedUnscheduledLessAscend = OrderMethods.orderArrayByDateAscending(unschedLessonsWithinTimeFrame, 'createdAt')
    return orderedUnscheduledLessAscend;
  }
  static getDateOfLastScheduledLesson = (allLessons) => {
    // filter all lessons that are scheduled
    let scheduledLessonsArr = allLessons.filter(lesson => lesson.scheduled === true);
    // filter any that have passed
    let validLessonsArr = LessonMethods.filterScheduledLessonsByToday(scheduledLessonsArr)
    // order by most recent first
    let orderSchedLessonsAscend = OrderMethods.orderArrayByDateAscending(validLessonsArr, 'date');
    if(orderSchedLessonsAscend.length){
      return orderSchedLessonsAscend.pop();
    } else {
      return DateMethods.whenIsNextSaturdayNoon();
    }
  }
  
  static getValidUnscheduledLessons = (unscheduledLessonArray) => {
    
    // method recieves an array of lessons and returns an array of those lessons that are within X number of days from now
    let currentDate = new Date();
    let dayOffset = 30
    let comparisonDate = new Date();
    // gives us a day 30 days before now
    comparisonDate.setDate(currentDate.getDate() - dayOffset)
    let validUnscheduledLessonsAfterXDate = unscheduledLessonArray.filter(lesson => {
      return new Date(lesson.createdAt) > comparisonDate;
    })
    return validUnscheduledLessonsAfterXDate;
  }
  static filterScheduledLessonsByToday = (scheduledLessonArray) => {
    let currentDate = new Date();
    let dayOffset = 1
    let validLessonsAfterToday = scheduledLessonArray.filter(lesson => {
      let comparisonDate = new Date(lesson.date) - dayOffset;
      return currentDate < comparisonDate
    })
    return validLessonsAfterToday;
  }
  static getCurrentUserLessonsAttendingArray = (lessonStatusObj, lessonsArray) => {
    // Object
    let lessonsAttendingArray = [];
    for (var key in lessonStatusObj) {
      if (lessonStatusObj.hasOwnProperty(key)) {
        if(lessonStatusObj[key] === 1){
          let attendingLessonObjIndex = lessonsArray.findIndex(lesson => {
            return lesson.Id === key;
          })
          if(attendingLessonObjIndex !== -1){
            lessonsAttendingArray.push(lessonsArray[attendingLessonObjIndex])
          }
        }
      }
    }
    return lessonsAttendingArray;
  }
  static getArrayOfUserObjects = (inputArray, allUsersArray) => {
    let taughtByUserArray = []
    // console.log('log', allUsersArray)
    // console.log(inputArray.length, taughtByUserArray);
    inputArray.forEach(lessonId => {
      let foundIndex = allUsersArray.findIndex(user => {
        return user['userId'] === lessonId
      })
      taughtByUserArray.push(allUsersArray[foundIndex])
    })
    return taughtByUserArray;
  }
  static getArrayofTaughtByUserObjs = (taughtByArray, allUsers) => {
    let returnArray = [];
    taughtByArray.forEach(lessonId => {
      let foundIndex = allUsers.findIndex(user => {
        return user['userId'] === lessonId;
      })
      returnArray.push(allUsers[foundIndex])
    });
    return returnArray;
  }
  static getSelectedLessonStatusForCurrentUser = (objectOfLessonStatus, selectedLessonId) => {
    // getting an object
    if(objectOfLessonStatus[selectedLessonId] || objectOfLessonStatus[selectedLessonId] === 0){
      // console.log('exists');
      //return a number
      return objectOfLessonStatus[selectedLessonId]
    } else {
      // it doesn't exist
      return null;
    }
  }
  static getStyleForLessonStatusStarString = (status) => {
    // recieves either null, or a number (0 = no) (1 = yes) (2 = maybe)
    let returnString = ''
    if(status === null){
      // haven't clicked
      returnString = "fa fa-star-o fs48 fcGreyb9 op50"
    }
    else if(status === 0){
      returnString = "fa fa-times fcGreyb9 fs48 mtNeg125"
    }
    else if(status === 1){
      returnString = "fa fa-star fs48 fcOrangeff9a23"
    }
    else if(status === 2){
      returnString = "fa fa-star-half-o fs48 fcOrangeff9a23 op50"
    }
    return returnString;
  }
  static hasCurrentUserVotedOnLesson = (lesson, currentUserId) => {
    // return lesson['vote']
    // console.log(lesson['lessonVotes'], currentUserId);
    return lesson['lessonVotes'].includes(currentUserId)
  }
  static getButtonStatusForLesson = (status) => {
    let btnStyleForAttending = ''
    let btnStyleForMaybeAttending = ''
    let btnStyleForNotAttending = ''
    if (status === null) {
      btnStyleForAttending = `grid-cell fc--disp-flex fc--jCont-ce fc--aItem-ce btn btnFillClrSchGreen00b371 fs16 ls12 fw500 ta-cent`
      btnStyleForMaybeAttending = `grid-cell fc--disp-flex fc--jCont-ce fc--aItem-ce btn btnFillClrSchGreen006842 fs16 ls12 fw500 ta-cent`
      btnStyleForNotAttending = `grid-cell fc--disp-flex fc--jCont-ce fc--aItem-ce btn btnFillClrSchGreen2d3134 fs16 ls12 fw500 ta-cent`
    } else if (status === 0) {
      //then not attending
      btnStyleForAttending = `grid-cell fc--disp-flex fc--jCont-ce fc--aItem-ce btn btnFillClrSchGreen00b371 btnOutlineClrSchUnavailable fs16 ls12 fw500 ta-cent`
      btnStyleForMaybeAttending = `grid-cell fc--disp-flex fc--jCont-ce fc--aItem-ce btn btnFillClrSchGreen006842 btnOutlineClrSchUnavailable fs16 ls12 fw500 ta-cent`
      btnStyleForNotAttending = `grid-cell fc--disp-flex fc--jCont-ce fc--aItem-ce btn btnFillClrSchGreen2d3134 btnSelected fs16 ls12 fw500 ta-cent`
    } else if (status === 1) {
      // then attending
      btnStyleForAttending = `grid-cell fc--disp-flex fc--jCont-ce fc--aItem-ce btn btnFillClrSchGreen00b371 btnSelected fs16 ls12 fw500 ta-cent`
      btnStyleForMaybeAttending = `grid-cell fc--disp-flex fc--jCont-ce fc--aItem-ce btn btnFillClrSchGreen006842 btnOutlineClrSchUnavailable fs16 ls12 fw500 ta-cent`
      btnStyleForNotAttending = `grid-cell fc--disp-flex fc--jCont-ce fc--aItem-ce btn btnFillClrSchGreen2d3134 btnOutlineClrSchUnavailable fs16 ls12 fw500 ta-cent`
    } else if (status === 2) {
      // then maybe attending
      btnStyleForAttending = `grid-cell fc--disp-flex fc--jCont-ce fc--aItem-ce btn btnFillClrSchGreen00b371 btnOutlineClrSchUnavailable fs16 ls12 fw500 ta-cent`
      btnStyleForMaybeAttending = `grid-cell fc--disp-flex fc--jCont-ce fc--aItem-ce btn btnFillClrSchGreen006842 btnSelected fs16 ls12 fw500 ta-cent`
      btnStyleForNotAttending = `grid-cell fc--disp-flex fc--jCont-ce fc--aItem-ce btn btnFillClrSchGreen2d3134 btnOutlineClrSchUnavailable fs16 ls12 fw500 ta-cent`
    }

    return {
      btnStyleForAttending: btnStyleForAttending,
      btnStyleForMaybeAttending: btnStyleForMaybeAttending,
      btnStyleForNotAttending: btnStyleForNotAttending
    }
  }
}
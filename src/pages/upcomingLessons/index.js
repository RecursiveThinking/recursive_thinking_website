import { utils, data } from '../../global';
import { importTemplate, templates, fill } from '../../templater';
import { Store } from '../../store.js';
import serverApi from '../../serverApi.js';

import lessonsFromData from '../../../data_returns/RecursiveThinkingLessons.json'

import upcomingLessonsHtml from './upcomingLessons.html'
importTemplate("upcomingLessons", upcomingLessonsHtml)

export function setup(renderFunction) {
  renderFunction(
    fill(templates.upcomingLessons.page, getUpcomingLessonsModel())
  );
};

export const getUpcomingLessonsModel = () => {
    
  // #TODO: API Call - Users - goes here
  const currentUser = Store.currentUser;
  // #TODO: API Call - Lessons - goes here
  // const allLessons = Object.values(Store.lessons);
  const allLessons = lessonsFromData                                                     ;
  console.log('allLessons', allLessons);
  // only scheduled lessons that are before todays date
  const scheduledLessons = allLessons.filter(item => item.scheduled === true)
  // console.log('scheduledLessons', scheduledLessons);
  // order lessons, earliest first...
  // 
  const orderedScheduledLessons = scheduledLessons.sort((a, b) => new Date(a.date) > new Date(b.date))
  // console.log('ordered', orderedScheduledLessons);
  
  let allUpComingLessons = document.querySelectorAll('.fc-upComingLesson');
  console.log(allUpComingLessons);
  
  // function that returns an index
  // lessontodisplay(arrayofUpcomingLessons, id)
  // if 
  
  return {
      upcomingLessons: orderedScheduledLessons.map(lesson => {
          let formattedDate = utils.getFormattedDate(new Date(lesson.date));
          return fill(templates.upcomingLessons.lessonSummary, {
              day: formattedDate.dateOfMonth,
              month: formattedDate.monthAsString,
              year: formattedDate.year,
              // this function
              title: lesson.title,
              divAttr: {
                class: utils.getBoolIfUserAttending(lesson.Id, currentUser.lessonsAttending),
                data: lesson.Id
              }
          })
      })
      // selectedLesson:
  }
};
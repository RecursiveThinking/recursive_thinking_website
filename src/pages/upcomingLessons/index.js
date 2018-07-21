import { utils, data } from '../../global';
import { importTemplate, templates, fill } from '../../templater';
import { Store } from '../../store.js';
import serverApi from '../../serverApi.js';

import upcomingLessonsHtml from './upcomingLessons.html'
importTemplate("upcomingLessons", upcomingLessonsHtml)

export function setup(renderFunction) {
  renderFunction(
    fill(templates.upcomingLessons.page, getUpcomingLessonsModel())
  );
};

export const getUpcomingLessonsModel = () => {
    
  // #TODO: API Call goes here
  // const allLessons = JSON.parse(localStorage.getItem('allLessons'));
  // const currentUser = data.getCurrentUser();
  const currentUser = Store.currentUser;
  // console.log(currentUser);
  // const allLessons = Object.entries(serverApi.getLessons());
  const allLessons = Object.values(Store.lessons);

  // only scheduled lessons that are before todays date
  const scheduledLessons = allLessons.filter(item => item.scheduled === true)
  // console.log('scheduledLessons', scheduledLessons);
  // order lessons, earliest first...
  // 
  const orderedScheduledLessons = scheduledLessons.sort((a, b) => new Date(a.date) > new Date(b.date))
  // console.log('ordered', orderedScheduledLessons);
  
  return {
      upcomingLessons: orderedScheduledLessons.map(lesson => {
          let formattedDate = utils.getFormattedDate(new Date(lesson.date));
          return fill(templates.upcomingLessons.lessonSummary, {
              day: formattedDate.dateOfMonth,
              month: formattedDate.monthAsString,
              year: formattedDate.year,
              // this function
              isStar: utils.getBoolIfUserAttending(lesson._id, currentUser.lessonsAttending),
              title: lesson.title
          })
      })
  }
};
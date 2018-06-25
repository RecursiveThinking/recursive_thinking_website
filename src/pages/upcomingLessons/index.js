import { utils, data } from '../../global';
import { importTemplate, templates, fill } from '../../templater'

import upcomingLessonsHtml from './upcomingLessons.html'
importTemplate("upcomingLessons", upcomingLessonsHtml)

export function setup(renderFunction) {
  renderFunction(
    fill(templates.upcomingLessons.page, getUpcomingLessonsModel())
  );
};

export const getUpcomingLessonsModel = () => {
    
  // #TODO: API Call goes here
  const allLessons = JSON.parse(localStorage.getItem('allLessons'));
  const currentUser = data.getCurrentUser();
  return {
      upcomingLessons: allLessons.map(lesson => {
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
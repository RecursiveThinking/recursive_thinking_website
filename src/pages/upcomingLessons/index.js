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
  const allLessons = JSON.parse(localStorage.getItem('allLessons'));
  // const currentUser = data.getCurrentUser();
  const currentUser = Store.currentUser;
  // console.log(currentUser);
  // const allLessons = Object.entries(serverApi.getLessons());
  console.log('allLessons', allLessons);
  // fs.writeFileSync(`./allLessons.json`, allLessons, 'utf8')
  
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
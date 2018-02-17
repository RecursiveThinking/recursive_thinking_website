import { utils } from '../scripts/global';
import { templates, fill } from '../scripts/templater';

export const getUpcomingLessonsModel = () => {
    
    // #TODO: API Call goes here
    const allLessons = JSON.parse(localStorage.getItem('allLessons'));
    
    return {
        upcomingLessons: allLessons.map(lesson => {
            let formattedDate = utils.getFormattedLessonDate(new Date(lesson.date));
            return fill(templates.upcomingLessons.lessonSummary, {
                day: formattedDate.dateOfMonth,
                month: formattedDate.monthAsString,
                year: formattedDate.year,
                title: lesson.title
            })
        })
    }
};
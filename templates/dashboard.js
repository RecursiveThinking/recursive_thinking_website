import {
    importTemplate,
    templates, 
    fill
} from '../scripts/templater'

import {
    utils,
    data
} from '../scripts/global';

import dashboardHtml from './dashboard.html'
importTemplate("dashboard", dashboardHtml)

export const setup = () => {
    // this line takes the import html and builds templates out of it
    return fill(templates.dashboard.page, getDashboardModel())
};

/*
Overall Model Shape

const profileStats = {
    stats1: [{statCount, statTitle}],
    stats2: [{statCount, statTitle}]
}

const upComingLesson = {
    lessonTitle: string,
    lessonDateDay: num,
    lessonDateMonth: string,
    lessonDateYear: num,
    lessonDescription: string,
    lessonsTaughtBy: [{
        src: string (for image source)
        alt: string
    }]
}

const lessonsAttending = {
    individualLessons: [{
        lessonTitle: string,
        lessonDateDay: num,
        lessonDateMonth: string,
        lessonDateYear: num
    }]
}
*/

export const getDashboardModel = () => {

    // #TODO: API Call goes here
    const profileStats = JSON.parse(localStorage.getItem('allProfileStatistics'));

    const stats1 = profileStats.slice(0, 3);
    const stats2 = profileStats.slice(3);

    // All Upcoming lesson data should come from the user profile, for now we are simply using generic dummy lesson data
    const upComingLessons = data.getAllLessons();
    const upComingLessonDate = utils.getFormattedDate(new Date(upComingLessons[0].date));
    const filteredTaughtByUserArray = utils.returnFilteredTaughtByUserArray(upComingLessons[0].lessonTaughtBy);

    // Individual Lesson for upComingLesson Template
    const upComingLesson = {
        lessonTitle: upComingLessons[0].title,
        lessonDateDay: upComingLessonDate.dateOfMonth,
        lessonDateMonth: upComingLessonDate.monthAsString,
        lessonDateYear: upComingLessonDate.year,
        lessonDescription: upComingLessons[0].description,
        lessonTeachers: filteredTaughtByUserArray.map((userObj) => fill(templates.voteForLesson.displayTaughtByLessons, {
            imgAttrs: {
                src: `${userObj["image"]}`,
                alt: `Lesson will be taught by ${userObj["name"]}`
            }
        }))
    };

    let lessonsAttending = upComingLessons.slice(0, 3);

    return {
        profileStats: fill(templates.dashboard.profileStats, {
            stats1: stats1.map((stat) => {
                return fill(templates.dashboard.individualStat, {
                    statCount: stat.totalCount,
                    statTitle: stat.title
                });
            }),
            stats2: stats2.map((stat) => {
                return fill(templates.dashboard.individualStat, {
                    statCount: stat.totalCount,
                    statTitle: stat.title
                });
            })
        }),

        upComingLesson: fill(templates.dashboard.upComingLesson, {
            lessonTitle: upComingLesson.lessonTitle,
            lessonDateDay: upComingLesson.lessonDateDay,
            lessonDateMonth: upComingLesson.lessonDateMonth,
            lessonDateYear: upComingLesson.lessonDateYear,
            lessonDescription: upComingLesson.lessonDescription,
            lessonTaughtBy: upComingLesson.lessonTeachers,
        }),

        lessonsAttending: fill(templates.dashboard.lessonsAttending, {
            individualLessons: lessonsAttending.map((lesson) => {
                const lessonDate = utils.getFormattedDate(new Date(lesson.date));
                return fill(templates.dashboard.individualLesson, {
                    lessonTitle: lesson.title,
                    lessonDateDay: lessonDate.dateOfMonth,
                    lessonDateMonth: lessonDate.monthAsString,
                    lessonDateYear: lessonDate.year
                });
            })
        })
    }
}
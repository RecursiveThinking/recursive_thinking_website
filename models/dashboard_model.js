import {
    utils,
    data
} from '../scripts/global';
import {
    templates,
    fill
} from '../scripts/templater';

export const getDashboardModel = () => {

    // #TODO: API Call goes here
    const profileStats = JSON.parse(localStorage.getItem('allProfileStatistics'));

    const stats1 = profileStats.slice(0, 3);
    const stats2 = profileStats.slice(3);

    // All Upcoming lesson data should come from the user profile, for now we are simply using generic dummy lesson data
    const upComingLessons = data.getAllLessons();
    const upComingLessonDate = utils.getFormattedDate(new Date(upComingLessons[0].date));

    // Individual Lesson for upComingLesson Template
    const upComingLesson = {
        lessonTitle: upComingLessons[0].title,
        lessonDateDay: upComingLessonDate.dateOfMonth,
        lessonDateMonth: upComingLessonDate.monthAsString,
        lessonDateYear: upComingLessonDate.year,
        lessonDescription: upComingLessons[0].description,
        // lessonTaughtBy: upComingLessons[0].lessonTaughtBy.map((developer) => {
        //     console.log(avatars[developer])
        //     return fill(templates.dashboard.lessonTaughtBy, {
        //         src="public/images/"
        //     })
        // })
    };

    let lessonsAttending = upComingLessons.slice(0, 3);

    /*Overall Model Shape
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
            // lessonTaughtBy: {

            // }
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
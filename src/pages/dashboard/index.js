import { importTemplate, templates, fill } from '../../templater';
import { utils, data } from '../../global';
import {Store} from '../../store.js';
import dashboardHtml from './dashboard.html';
importTemplate("dashboard", dashboardHtml)

export function setup(renderFunction) {
    renderFunction(
        fill(templates.dashboard.page, getDashboardModel())
    );
};

/* Dashboard Model

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
    // const profileStats = JSON.parse(localStorage.getItem('allProfileStatistics'));
    let classValueLinkVisits;
    let valueLinkGitHub;
    let classValueLinkGitHub;
    let valueLinkCodePen;
    let classValueLinkCodePen;
    let valueLinkPortfolio;
    let classValueLinkPortfolio;
    let valueLinkLinkedIn;
    let classValueLinkLinkedIn;
    let valueLinkResume;
    let classValueLinkResume;
    
    if(Store.currentUser.profileStatsVisits > 0){
        classValueLinkVisits = "h1Data fw300 colorGreen"
    } else {
        classValueLinkVisits = "h1Data fw300 colorGrayb9"
    }
    
    if(!Store.currentUser.github){
        valueLinkGitHub = "N/A"
        classValueLinkGitHub = "h1Data fw300 colorGrayb9"
    }
    else {
        valueLinkGitHub = Store.currentUser.profileStatsViewGithub;
        if(valueLinkGitHub > 0){
            classValueLinkGitHub = "h1Data fw300 colorGreen"
        } else {
            classValueLinkGitHub = "h1Data fw300 colorGrayb9"
        }
    }
    
    if(!Store.currentUser.codepen){
        valueLinkCodePen = "N/A"
        classValueLinkCodePen = "h1Data fw300 colorGrayb9"
    }
    else {
        valueLinkCodePen = Store.currentUser.profileStatsViewCodePen;
        if(valueLinkCodePen > 0){
            classValueLinkCodePen = "h1Data fw300 colorGreen"
        } else {
            classValueLinkCodePen = "h1Data fw300 colorGrayb9"
        }
    }
        
    if(!Store.currentUser.linkedin){
        valueLinkLinkedIn = "N/A"
        classValueLinkLinkedIn = "h1Data fw300 colorGrayb9"
    }
    else {
        valueLinkLinkedIn = Store.currentUser.profileStatsViewLinkedIn;
        if(valueLinkLinkedIn > 0){
            classValueLinkLinkedIn = "h1Data fw300 colorGreen"
        } else {
            classValueLinkLinkedIn = "h1Data fw300 colorGrayb9"
        }
    }
    
    if(!Store.currentUser.portfolioWebsite){
        valueLinkPortfolio = "N/A"
        classValueLinkPortfolio = "h1Data fw300 colorGrayb9"
    }
    else {
        valueLinkPortfolio = Store.currentUser.profileStatsViewPortfolio;
        if(valueLinkPortfolio > 0){
            classValueLinkPortfolio = "h1Data fw300 colorGreen"
        } else {
            classValueLinkPortfolio = "h1Data fw300 colorGrayb9"
        }
    }
    
    if(!Store.currentUser.resume){
        valueLinkResume = "N/A"
        classValueLinkResume = "h1Data fw300 colorGrayb9"
    }
    else {
        valueLinkResume = Store.currentUser.profileStatsViewResume;
        if(valueLinkResume > 0){
            classValueLinkResume = "h1Data fw300 colorGreen"
        } else {
            classValueLinkResume = "h1Data fw300 colorGrayb9"
        }
    }
    
    const profileStats = [
        {
            totalCount: Store.currentUser.profileStatsVisits,
            title: 'Profile Visits',
            classValue: classValueLinkVisits
        },
        {
            totalCount: valueLinkGitHub,
            title: 'GitHub Views',
            classValue: classValueLinkGitHub            
        },
        {
            totalCount: valueLinkCodePen,
            title: 'CodePen Views',
            classValue: classValueLinkCodePen            
        },
        {
            totalCount: valueLinkPortfolio,
            title: 'Portfolio Views',
            classValue: classValueLinkPortfolio            
        },
        {
            totalCount: valueLinkLinkedIn,
            title: 'LinkedIn Views',
            classValue: classValueLinkLinkedIn            
        },
        {
            totalCount: valueLinkResume,
            title: 'Resume Views',
            classValue: classValueLinkResume            
        }
    ]

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
                    statTitle: stat.title,
                    profileStatClass: {
                        class: stat.classValue
                    }
                });
            }),
            stats2: stats2.map((stat) => {
                return fill(templates.dashboard.individualStat, {
                    statCount: stat.totalCount,
                    statTitle: stat.title,
                    profileStatClass: {
                        class: stat.classValue
                    }
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
import { importTemplate, templates, fill } from '../../templater';
import { utils, data } from '../../global';
import {Store} from '../../store.js';

// turn off once Api Call is made
import lessonsFromData from '../../../data_returns/RecursiveThinkingLessons.json'

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
    // const upComingLessons = data.getAllLessons();
    // const upComingLessonDate = utils.getFormattedDate(new Date(upComingLessons[0].date));
    // const filteredTaughtByUserArray = utils.returnFilteredTaughtByUserArray(upComingLessons[0].lessonTaughtBy);
    
    const allLessons = lessonsFromData;
    // for upcoming lessons, filter out all lessons that scheduled, orderd by date, then just take the first.
    // all scheduled lessons
    let allUpComingLessons = allLessons.filter(item => item.scheduled === true)
    // order lessons
    let orderedUpComingLessons = allUpComingLessons.sort((a, b) => new Date(a.date) > new Date(b.date));
    // take only first from orderedUpComingLessons
    let upComingLesson = orderedUpComingLessons[0];
    console.log(upComingLesson);
    // return formated date to be used how we want
    const upComingLessonDate = utils.getFormattedDate(new Date(upComingLesson.date));
    console.log(upComingLessonDate);
    // const filteredTaughtByUserArray = utils.returnFilteredTaughtByUserArray(upComingLesson.lessonTaughtBy);
    
    // Individual Lesson for upComingLesson Template
    const upComingLessonModel = {
        lessonTitle: upComingLesson.title,
        lessonDateDay: upComingLessonDate.dateOfMonth,
        lessonDateMonth: upComingLessonDate.monthAsString,
        lessonDateYear: upComingLessonDate.year,
        lessonDescription: upComingLesson.description,
        // lessonTeachers: filteredTaughtByUserArray.map((userObj) => fill(templates.voteForLesson.displayTaughtByLessons, {
        //     imgAttrs: {
        //         src: `${userObj["image"]}`,
        //         alt: `Lesson will be taught by ${userObj["name"]}`
        //     }
        // }))
    };
    // console.log('model', upComingLessonModel);
    
    // Build Array of Lessons Attending
    let lessonsAttending = Store.currentUser.lessonsAttending;
    console.log('lessAttend', lessonsAttending);
    // empty lesson attending array
    let getAllLessonsAttending = [];
    // loop through all stored lessons attending (they are just Ids)
    for(let i = 0; i < lessonsAttending.length; i += 1){
        // find value of index of this id
        let allLessonIndex = allLessons.findIndex(allLessItem => allLessItem['Id'] === lessonsAttending[i]);
        // if all lessons has an index for the lessonAttending id, then push it into the array
        if(allLessonIndex !== -1){
            getAllLessonsAttending.push(allLessons[allLessonIndex])
        }
        else {
            console.log('Not Found');
        }
    }
    // only show the three most recent
    let nearestThreeLessonsAttending;
    // so if the array is longer than three, slice it
    if(getAllLessonsAttending.length > 3){
        nearestThreeLessonsAttending = getAllLessonsAttending.slice(0, 3);
    } else {
        // otherwise, set it equal
        nearestThreeLessonsAttending = getAllLessonsAttending
    }
    console.log('nearThree', nearestThreeLessonsAttending);

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
            lessonTitle: upComingLessonModel.lessonTitle,
            lessonDateDay: upComingLessonModel.lessonDateDay,
            lessonDateMonth: upComingLessonModel.lessonDateMonth,
            lessonDateYear: upComingLessonModel.lessonDateYear,
            lessonDescription: upComingLessonModel.lessonDescription,
            // lessonTaughtBy: upComingLessonModel.lessonTeachers,
        }),

        lessonsAttending: fill(templates.dashboard.lessonsAttending, {
            individualLessons: nearestThreeLessonsAttending.map((lesson) => {
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
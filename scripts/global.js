
// represents database call for all users
var allUsers = [
    {
        _id: 0000000001,
        name: 'Porg Dev1',
        title: 'Dev1 Title',
        location: 'Dev1 Location',
        lecturesAttending: []
    },
    {
        _id: 0000000002,
        name: 'Porg Dev2',
        title: 'Dev2 Title',
        location: 'Dev2 Location',
        lecturesAttending: []
    },
    {
        _id: 0000000003,
        name: 'Porg Dev3',
        title: 'Dev3 Title',
        location: 'Dev3 Location',
        lecturesAttending: []
    },
    {
        _id: 0000000004,
        name: 'Porg Dev4',
        title: 'Dev4 Title',
        location: 'Dev4 Location',
        lecturesAttending: []
    },
    {
        _id: 0000000005,
        name: 'Porg Dev5',
        title: 'Dev5 Title',
        location: 'Dev5 Location',
        lecturesAttending: []
    },
    {
        _id: 0000000006,
        name: 'Porg Dev6',
        title: 'Dev6 Title',
        location: 'Dev6 Location',
        lecturesAttending: []
    },
    {
        _id: 0000000007,
        name: 'Porg Dev7',
        title: 'Dev7 Title',
        location: 'Dev7 Location',
        lecturesAttending: []
    },
    {
        _id: 0000000010,
        name: 'Porg Dev8',
        title: 'Dev8 Title',
        location: 'Dev8 Location',
        lecturesAttending: []
    },
    {
        _id: 0000000011,
        name: 'Porg Dev9',
        title: 'Dev9 Title',
        location: 'Dev9 Location',
        lecturesAttending: []
    }
]
localStorage.setItem('allUsers', JSON.stringify(allUsers));
// database call for Lessons
var allLessons = [
    {
        _id: 1000000001,
        title: 'Designing with A-Frame VR',
        date: '11/25/2017',
        description: 'Words, words, words and more words go right here in this space. Words, words, words and more words go right here in this space. Words, words, words and more words go right here in this space. Words, words, words and more words go right here in this space. Words, words, words and more words go right here in this space.',
        lessonTaughtBy: [],
        lessonAttendees: [],
        lessonVotes: []
    },
    {
        _id: 1000000002,
        title: 'Building a city with HTML & CSS',
        date: '12/02/2017',
        description: 'Words, words, words and more words go right here in this space. Words, words, words and more words go right here in this space. Words, words, words and more words go right here in this space. Words, words, words and more words go right here in this space. Words, words, words and more words go right here in this space.',
        lessonTaughtBy: [],
        lessonAttendees: [],
        lessonVotes: []
        
    },
    {
        _id: 1000000003,
        title: 'Building a calculator with HTML, CSS & JavaScript',
        date: '12/09/2017',
        description: 'Words, words, words and more words go right here in this space. Words, words, words and more words go right here in this space. Words, words, words and more words go right here in this space. Words, words, words and more words go right here in this space. Words, words, words and more words go right here in this space.',
        lessonTaughtBy: [],
        lessonAttendees: [],
        lessonVotes: []
    },
    {
        _id: 1000000004,
        title: 'Building a timer with HTML, CSS & JavaScript',
        date: '12/16/2017',
        description: 'Words, words, words and more words go right here in this space. Words, words, words and more words go right here in this space. Words, words, words and more words go right here in this space. Words, words, words and more words go right here in this space. Words, words, words and more words go right here in this space.',
        lessonTaughtBy: [],
        lessonAttendees: [],
        lessonVotes: []
    },
    {
        _id: 1000000005,
        title: 'Building a website with HTML, CSS & JavaScript',
        date: '12/23/2017',
        description: 'Words, words, words and more words go right here in this space. Words, words, words and more words go right here in this space. Words, words, words and more words go right here in this space. Words, words, words and more words go right here in this space. Words, words, words and more words go right here in this space.',
        lessonTaughtBy: [],
        lessonAttendees: [],
        lessonVotes: []
    },
    {
        _id: 1000000006,
        title: 'Building a web application with HTML, CSS & JavaScript',
        date: '12/30/2017',
        description: 'Words, words, words and more words go right here in this space. Words, words, words and more words go right here in this space. Words, words, words and more words go right here in this space. Words, words, words and more words go right here in this space. Words, words, words and more words go right here in this space.',
        lessonTaughtBy: [],
        lessonAttendees: [],
        lessonVotes: []
    }
]
localStorage.setItem('allLessons', JSON.stringify(allLessons));

// variables that represent database calls
const profileVisitsTotal = 27;
const profileGitHubViews = 10;
const profileCodePenViews = 8;
const profilePortfolioViews = 13;
const profileLinkedInViews = 17;
const profileResumeViews = 9;

var profileStatistics = [
    {
        totalCount: profileVisitsTotal,
        title: 'Profile Visits'
    },
    {
        totalCount: profileGitHubViews,
        title: 'GitHub Views'
    },
    {
        totalCount: profileCodePenViews,
        title: 'CodePen Views'
    },
    {
        totalCount: profilePortfolioViews,
        title: 'Portfolio Views'
    },
    {
        totalCount: profileLinkedInViews,
        title: 'LinkedIn Views'
    },
    {
        totalCount: profileResumeViews,
        title: 'Resume Views'
    }
]

localStorage.setItem('allProfileStatistics', JSON.stringify(profileStatistics));
// console.log(profileStatistics);

var arrayOfAvatars = [ 'avatar1.png', 'avatar2.png', 'avatar3.png', 'avatar4.png', 'avatar5.png', 'avatar6.png' ]

function randomAvatar(){
    let min = 0;
    let max = arrayOfAvatars.length;
    let index = getRandomNumber(min, max);
    // console.log(arrayOfAvatars[index]);
    return arrayOfAvatars[index];
}

function getRandomNumber(min, max){
    // let min = min || 0;
    // let max = max;
    let randomNumber = Math.floor(Math.random()*(max-min)+min);
    // console.log(randomNumber);
    return randomNumber;
}

var arrayOfDays =  [ 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday' ];
var arrayOfMonths = [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ];

function getDayOfWeek(index){
    let dateString = arrayOfDays[index];
    return dateString;
}

function getMonthOfYear(index){
    let monthString = arrayOfMonths[index];
    return monthString;
}

function getFormattedLessonDate(dateToFormat){
    
    let dayOfWeek = getDayOfWeek(dateToFormat.getDay());
    let dateOfMonth = dateToFormat.getDate();
    let year = dateToFormat.getFullYear();
    let monthAsNumberIndex = dateToFormat.getMonth();
    let monthAsNumber = monthAsNumberIndex + 1;
    let monthAsString = getMonthOfYear(monthAsNumberIndex);
    let upComingDateString = `${year} ${monthAsNumber} ${dateOfMonth}`
    
    let finalDateObject = {
        dayOfWeek: dayOfWeek,
        dateOfMonth: dateOfMonth,
        year: year,
        monthAsNumberIndex: monthAsNumberIndex,
        monthAsNumber: monthAsNumber,
        monthAsString: monthAsString,
        upComingDateString: upComingDateString
    };
    return finalDateObject;
}

// getRandomNumber(0, 6)
// randomAvatar(arrayOfAvatars);

function generateTaughtByThumbs(loopNumber, containerHTML, lessonTitleForAlt, ){
    for(let i = 0; i < loopNumber; i += 1){
        // create image
        let imgTaughtByThumbs = document.createElement('img');
        imgTaughtByThumbs.className = `avatarThumbRound`;
        // get random Image
        let randImage = randomAvatar();
        let randImageName = randImage.replace('.png', '');
        imgTaughtByThumbs.setAttribute('src', `../public/images/${randImage}`);
        imgTaughtByThumbs.setAttribute('alt', `lesson ${lessonTitleForAlt} taught by developer ${randImageName}`)
        // connect
        containerHTML.appendChild(imgTaughtByThumbs);
        // console.log(containerHTML);
        // return containerHTML.appendChild(imgTaughtByThumbs);
    }
}


function displayMessage(){
    
}

class Random {
    static randomPrint(){
        return 'Print My Static Method';
    }
    // static randomAvatar(){
    //     let min = 0;
    //     let max = arrayOfAvatars.length;
    //     let index = Random.getRandomNumber(min, max);
    //     console.log(arrayOfAvatars[index]);
    //     return arrayOfAvatars[index];
    // }
    
    // static getRandomNumber(min, max){
    //     let randomNumber = Math.floor(Math.random()*(max-min)+min);
    //     // console.log(randomNumber);
    //     return randomNumber;
    // }
}

localStorage.setItem('arrayOfAvatars', JSON.stringify(arrayOfAvatars))
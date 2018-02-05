
// represents database call for all users
var allUsers = [
    {
        _id: 0000000001,
        name: 'Porg Dev1',
        title: 'Dev1 Title',
        location: 'Dev1 Location',
        attending: []
    },
    {
        _id: 0000000002,
        name: 'Porg Dev2',
        title: 'Dev2 Title',
        location: 'Dev2 Location'
    },
    {
        _id: 0000000003,
        name: 'Porg Dev3',
        title: 'Dev3 Title',
        location: 'Dev3 Location'
    },
    {
        _id: 0000000004,
        name: 'Porg Dev4',
        title: 'Dev4 Title',
        location: 'Dev4 Location'
    },
    {
        _id: 0000000005,
        name: 'Porg Dev5',
        title: 'Dev5 Title',
        location: 'Dev5 Location'
    },
    {
        _id: 0000000006,
        name: 'Porg Dev6',
        title: 'Dev6 Title',
        location: 'Dev6 Location'
    },
    {
        _id: 0000000007,
        name: 'Porg Dev7',
        title: 'Dev7 Title',
        location: 'Dev7 Location'
    },
    {
        _id: 0000000010,
        name: 'Porg Dev8',
        title: 'Dev8 Title',
        location: 'Dev8 Location'
    },
    {
        _id: 0000000011,
        name: 'Porg Dev9',
        title: 'Dev9 Title',
        location: 'Dev9 Location'
    }
]

localStorage.setItem('allUsers', JSON.stringify(allUsers));

var allLessons = [
    {
        title: 'Designing with A-Frame VR',
        date: '11/25/2017',
        description: 'Words, words, words and more words go right here in this space. Words, words, words and more words go right here in this space. Words, words, words and more words go right here in this space. Words, words, words and more words go right here in this space. Words, words, words and more words go right here in this space.'
    },
    {
        title: 'Building a city with HTML & CSS',
        date: '12/02/2017',
        description: 'Words, words, words and more words go right here in this space. Words, words, words and more words go right here in this space. Words, words, words and more words go right here in this space. Words, words, words and more words go right here in this space. Words, words, words and more words go right here in this space.'
    },
    {
        title: 'Building a calculator with HTML, CSS & JavaScript',
        date: '12/09/2017',
        description: 'Words, words, words and more words go right here in this space. Words, words, words and more words go right here in this space. Words, words, words and more words go right here in this space. Words, words, words and more words go right here in this space. Words, words, words and more words go right here in this space.'
    },
    {
        title: 'Building a timer with HTML, CSS & JavaScript',
        date: '12/16/2017',
        description: 'Words, words, words and more words go right here in this space. Words, words, words and more words go right here in this space. Words, words, words and more words go right here in this space. Words, words, words and more words go right here in this space. Words, words, words and more words go right here in this space.'
    },
    {
        title: 'Building a website with HTML, CSS & JavaScript',
        date: '12/23/2017',
        description: 'Words, words, words and more words go right here in this space. Words, words, words and more words go right here in this space. Words, words, words and more words go right here in this space. Words, words, words and more words go right here in this space. Words, words, words and more words go right here in this space.'
    },
    {
        title: 'Building a web application with HTML, CSS & JavaScript',
        date: '12/30/2017',
        description: 'Words, words, words and more words go right here in this space. Words, words, words and more words go right here in this space. Words, words, words and more words go right here in this space. Words, words, words and more words go right here in this space. Words, words, words and more words go right here in this space.'
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
    let randomNumber = Math.floor(Math.random()*(max-min)+min);
    // console.log(randomNumber);
    return randomNumber;
}

// getRandomNumber(0, 6)
// randomAvatar(arrayOfAvatars);

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
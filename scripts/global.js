
const allUsers = [
    {
        _id: '0000000001',
        name: 'Porg Dev1',
        title: 'Dev1 Title',
        location: 'Dev1 Location',
        image: './public/images/avatar1.png',
        lecturesAttending: []
    },
    {
        _id: '0000000002',
        name: 'Porg Dev2',
        title: 'Dev2 Title',
        location: 'Dev2 Location',
        image: './public/images/avatar2.png',
        lecturesAttending: []
    },
    {
        _id: '0000000003',
        name: 'Porg Dev3',
        title: 'Dev3 Title',
        location: 'Dev3 Location',
        image: './public/images/avatar3.png',
        lecturesAttending: []
    },
    {
        _id: '0000000004',
        name: 'Porg Dev4',
        title: 'Dev4 Title',
        location: 'Dev4 Location',
        image: './public/images/avatar4.png',
        lecturesAttending: []
    },
    {
        _id: '0000000005',
        name: 'Porg Dev5',
        title: 'Dev5 Title',
        location: 'Dev5 Location',
        image: './public/images/avatar5.png',
        lecturesAttending: []
    },
    {
        _id: '0000000006',
        name: 'Porg Dev6',
        title: 'Dev6 Title',
        location: 'Dev6 Location',
        image: './public/images/avatar6.png',
        lecturesAttending: []
    },
    {
        _id: '0000000007',
        name: 'Porg Von Porghoven',
        title: 'Porgy Porg Porg',
        location: 'Porgsville - Population Porg',
        image: './public/images/porg_sq.jpeg',
        lecturesAttending: []
    },
    {
        _id: '0000000008',
        name: 'Porg Dev8',
        title: 'Dev8 Title',
        location: 'Dev8 Location',
        image: './public/images/avatar1.png',
        lecturesAttending: []
    },
    {
        _id: '0000000009',
        name: 'Porg Dev9',
        title: 'Dev9 Title',
        location: 'Dev9 Location',
        image: './public/images/avatar2.png',
        lecturesAttending: []
    }
]
localStorage.setItem('allUsers', JSON.stringify(allUsers));

const currentUser = allUsers[getRandomNumber(0, allUsers.length)];
localStorage.setItem('currentUser', JSON.stringify(currentUser));

// database call for Lessons
const allLessons = [
    {
        _id: '1000000001',
        title: 'Designing with A-Frame VR',
        date: '11/25/2017',
        description: 'Words, words, words and more words go right here in this space. Words, words, words and more words go right here in this space. Words, words, words and more words go right here in this space. Words, words, words and more words go right here in this space. Words, words, words and more words go right here in this space.<br><br>Words, words, words and more words go right here in this space. Words, words, words and more words go right here in this space. Words, words, words and more words go right here in this space. Words, words, words and more words go right here in this space.<br><br>Words, words, words and more words go right here in this space. Words, words, words and more words go right here in this space. Words, words, words and more words go right here in this space.',
        lessonTaughtBy: ['0000000001', '0000000002'],
        lessonAttendees: ['0000000001', '0000000002', '0000000003', '0000000004'],
        lessonVotes: []
    },
    {
        _id: '1000000002',
        title: 'Building a city with HTML & CSS',
        date: '12/02/2017',
        description: 'Words, words, words and more words go right here in this space. Words, words, words and more words go right here in this space. Words, words, words and more words go right here in this space. Words, words, words and more words go right here in this space. Words, words, words and more words go right here in this space.<br><br>Words, words, words and more words go right here in this space. Words, words, words and more words go right here in this space. Words, words, words and more words go right here in this space.',
        lessonTaughtBy: ['0000000003', '0000000004', '0000000006'],
        lessonAttendees: ['0000000001', '0000000002', '0000000003', '0000000004', '0000000005', '0000000006', '0000000007'],
        lessonVotes: ['0000000001']

    },
    {
        _id: '1000000003',
        title: 'Building a calculator with HTML, CSS & JavaScript',
        date: '12/09/2017',
        description: 'Words, words, words and more words go right here in this space. Words, words, words and more words go right here in this space. Words, words, words and more words go right here in this space. Words, words, words and more words go right here in this space. Words, words, words and more words go right here in this space.<br><br>Words, words, words and more words go right here in this space. Words, words, words and more words go right here in this space. Words, words, words and more words go right here in this space. Words, words, words and more words go right here in this space.<br><br>Words, words, words and more words go right here in this space. Words, words, words and more words go right here in this space. Words, words, words and more words go right here in this space.',
        lessonTaughtBy: ['0000000005', '0000000006'],
        lessonAttendees: ['0000000001', '0000000002', '0000000003', '0000000004', '0000000005', '0000000006', '0000000007'],
        lessonVotes: ['0000000001', '0000000002']
    },
    {
        _id: '1000000004',
        title: 'Building a timer with HTML, CSS & JavaScript',
        date: '12/16/2017',
        description: 'Words, words, words and more words go right here in this space. Words, words, words and more words go right here in this space. Words, words, words and more words go right here in this space. Words, words, words and more words go right here in this space. Words, words, words and more words go right here in this space.<br><br>Words, words, words and more words go right here in this space. Words, words, words and more words go right here in this space. Words, words, words and more words go right here in this space.',
        lessonTaughtBy: ['0000000001', '0000000003'],
        lessonAttendees: ['0000000001', '0000000002', '0000000003', '0000000004', '0000000005', '0000000006', '0000000007'],
        lessonVotes: ['0000000001', '0000000002', '0000000003']
    },
    {
        _id: '1000000005',
        title: 'Building a website with HTML, CSS & JavaScript',
        date: '12/23/2017',
        description: 'Words, words, words and more words go right here in this space. Words, words, words and more words go right here in this space. Words, words, words and more words go right here in this space. Words, words, words and more words go right here in this space. Words, words, words and more words go right here in this space.<br><br>Words, words, words and more words go right here in this space. Words, words, words and more words go right here in this space. Words, words, words and more words go right here in this space. Words, words, words and more words go right here in this space.',
        lessonTaughtBy: ['0000000002', '0000000004'],
        lessonAttendees: ['0000000001', '0000000002', '0000000003', '0000000004', '0000000005', '0000000006', '0000000007'],
        lessonVotes: ['0000000001', '0000000002', '0000000003', '0000000004']
    },
    {
        _id: '1000000006',
        title: 'Building a web application with HTML, CSS & JavaScript',
        date: '12/30/2017',
        description: 'Words, words, words and more words go right here in this space. Words, words, words and more words go right here in this space. Words, words, words and more words go right here in this space. Words, words, words and more words go right here in this space. Words, words, words and more words go right here in this space.<br><br>Words, words, words and more words go right here in this space. Words, words, words and more words go right here in this space. Words, words, words and more words go right here in this space.<br><br>Words, words, words and more words go right here in this space. Words, words, words and more words go right here in this space. Words, words, words and more words go right here in this space.',
        lessonTaughtBy: ['0000000003', '0000000005'],
        lessonAttendees: ['0000000001', '0000000002', '0000000003', '0000000004', '0000000005', '0000000006', '0000000007'],
        lessonVotes: ['0000000001', '0000000002', '0000000003', '0000000004', '0000000005']
    }
]
localStorage.setItem('allLessons', JSON.stringify(allLessons));

// interview questions
const allInterviewQuestions = [
    {
        _id: 'iq00000001',
        title: 'Highlight Table Rows',
        submitted: '09/05/2017',
        description: 'Words, words, words and more words go right here in this space. Words, words, words and more words go right here in this space. Words, words, words and more words go right here in this space. Words, words, words and more words go right here in this space. Words, words, words and more words go right here in this space.<br><br>Words, words, words and more words go right here in this space. Words, words, words and more words go right here in this space. Words, words, words and more words go right here in this space.',
        categories: ['Front End Development', 'JavaScript', 'HTML', 'CSS'],
        answersToQuestion: [],
        fk_author: '0000000001'
    },
    {
        _id: 'iq00000002',
        title: 'Build An Accordion',
        submitted: '09/05/2017',
        description: 'Words, words, words and more words go right here in this space. Words, words, words and more words go right here in this space. Words, words, words and more words go right here in this space. Words, words, words and more words go right here in this space. Words, words, words and more words go right here in this space.<br><br>Words, words, words and more words go right here in this space. Words, words, words and more words go right here in this space. Words, words, words and more words go right here in this space.',
        categories: ['Front End Development', 'JavaScript', 'HTML', 'CSS'],
        answersToQuestion: [],
        fk_author: '0000000001'
    },
    {
        _id: 'iq00000001',
        title: 'Highlight Table Rows',
        submitted: '09/05/2017',
        description: 'Words, words, words and more words go right here in this space. Words, words, words and more words go right here in this space. Words, words, words and more words go right here in this space. Words, words, words and more words go right here in this space. Words, words, words and more words go right here in this space.<br><br>Words, words, words and more words go right here in this space. Words, words, words and more words go right here in this space. Words, words, words and more words go right here in this space.',
        categories: ['Front End Development', 'JavaScript', 'HTML', 'CSS'],
        answersToQuestion: [],
        fk_author: '0000000001'
    },
    {
        _id: 'iq00000002',
        title: 'Build An Accordion',
        submitted: '09/05/2017',
        description: 'Words, words, words and more words go right here in this space. Words, words, words and more words go right here in this space. Words, words, words and more words go right here in this space. Words, words, words and more words go right here in this space. Words, words, words and more words go right here in this space.<br><br>Words, words, words and more words go right here in this space. Words, words, words and more words go right here in this space. Words, words, words and more words go right here in this space.',
        categories: ['Front End Development', 'JavaScript', 'HTML', 'CSS'],
        answersToQuestion: [],
        fk_author: '0000000001'
    }
]
localStorage.setItem('allInterviewQuestions', JSON.stringify(allInterviewQuestions));

const allAnswersToQuestions = [
    {
        _id: 'ia00000000',
        title: '',
        submitted: '',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi, recusandae distinctio sunt beatae ut quasi! Nulla repellendus impedit eum recusandae architecto, distinctio id voluptate doloremque ratione alias eveniet maiores voluptatum, qui maxime repellat iste facilis possimus quibusdam eos similique amet nesciunt? Ipsum iure deserunt facilis fugit officia pariatur, rerum, dolore ad sit laborum odio amet! At, quibusdam. Hic laborum, alias dolore suscipit minima inventore accusamus! Autem, magni! Aliquid quod ullam maiores illo similique? Dolore ad consequuntur, accusamus fugit sint iure quod quos id suscipit molestiae quibusdam expedita nam autem consectetur dignissimos doloremque fugiat veniam error rem! Illo totam minima fugiat.',
        fk_question: 'iq00000001',
        fk_author: '0000000001'
    },
    {
        _id: 'ia00000001',
        title: '',
        submitted: '',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi, recusandae distinctio sunt beatae ut quasi! Nulla repellendus impedit eum recusandae architecto, distinctio id voluptate doloremque ratione alias eveniet maiores voluptatum, qui maxime repellat iste facilis possimus quibusdam eos similique amet nesciunt? Ipsum iure deserunt facilis fugit officia pariatur, rerum, dolore ad sit laborum odio amet! At, quibusdam. Hic laborum, alias dolore suscipit minima inventore accusamus! Autem, magni! Aliquid quod ullam maiores illo similique? Dolore ad consequuntur, accusamus fugit sint iure quod quos id suscipit molestiae quibusdam expedita nam autem consectetur dignissimos doloremque fugiat veniam error rem! Illo totam minima fugiat.',
        fk_question: 'iq00000001',
        fk_author: '0000000001'
    },
    {
        _id: 'ia00000002',
        title: '',
        submitted: '',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi, recusandae distinctio sunt beatae ut quasi! Nulla repellendus impedit eum recusandae architecto, distinctio id voluptate doloremque ratione alias eveniet maiores voluptatum, qui maxime repellat iste facilis possimus quibusdam eos similique amet nesciunt? Ipsum iure deserunt facilis fugit officia pariatur, rerum, dolore ad sit laborum odio amet! At, quibusdam. Hic laborum, alias dolore suscipit minima inventore accusamus! Autem, magni! Aliquid quod ullam maiores illo similique? Dolore ad consequuntur, accusamus fugit sint iure quod quos id suscipit molestiae quibusdam expedita nam autem consectetur dignissimos doloremque fugiat veniam error rem! Illo totam minima fugiat.',
        fk_question: 'iq00000002',
        fk_author: '0000000001'
    },
    {
        _id: 'ia00000003',
        title: '',
        submitted: '',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi, recusandae distinctio sunt beatae ut quasi! Nulla repellendus impedit eum recusandae architecto, distinctio id voluptate doloremque ratione alias eveniet maiores voluptatum, qui maxime repellat iste facilis possimus quibusdam eos similique amet nesciunt? Ipsum iure deserunt facilis fugit officia pariatur, rerum, dolore ad sit laborum odio amet! At, quibusdam. Hic laborum, alias dolore suscipit minima inventore accusamus! Autem, magni! Aliquid quod ullam maiores illo similique? Dolore ad consequuntur, accusamus fugit sint iure quod quos id suscipit molestiae quibusdam expedita nam autem consectetur dignissimos doloremque fugiat veniam error rem! Illo totam minima fugiat.',
        fk_question: 'iq00000002',
        fk_author: '0000000001'
    }
]
localStorage.setItem('allInterviewQuestions', JSON.stringify(allAnswersToQuestions));

const arrayOfAvatars = ['avatar1.png', 'avatar2.png', 'avatar3.png', 'avatar4.png', 'avatar5.png', 'avatar6.png']
localStorage.setItem('arrayOfAvatars', JSON.stringify(arrayOfAvatars));

const profileVisitsTotal = 27;
const profileGitHubViews = 10;
const profileCodePenViews = 8;
const profilePortfolioViews = 13;
const profileLinkedInViews = 17;
const profileResumeViews = 9;

// database call for Lessons
const profileStatistics = [
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

// utils
function randomAvatar() {
    let min = 0;
    let max = arrayOfAvatars.length;
    let index = getRandomNumber(min, max);
    // console.log(arrayOfAvatars[index]);
    return arrayOfAvatars[index];
}

function getRandomNumber(min, max) {
    // let min = min || 0;
    // let max = max;
    let randomNumber = Math.floor(Math.random() * (max - min) + min);
    // console.log(randomNumber);
    return randomNumber;
}

const arrayOfDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const arrayOfMonths = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const getDayOfWeek = (index) => {
    let dateString = arrayOfDays[index];
    return dateString;
}

const getMonthOfYear = (index) => {
    let monthString = arrayOfMonths[index];
    return monthString;
}

const getFormattedLessonDate = (dateToFormat) => {

    const dayOfWeek = getDayOfWeek(dateToFormat.getDay());
    const dateOfMonth = dateToFormat.getDate();
    const year = dateToFormat.getFullYear();
    const monthAsNumberIndex = dateToFormat.getMonth();
    const monthAsNumber = monthAsNumberIndex + 1;
    const monthAsString = getMonthOfYear(monthAsNumberIndex);
    const upComingDateString = `${year} ${monthAsNumber} ${dateOfMonth}`

    return {
        dayOfWeek: dayOfWeek,
        dateOfMonth: dateOfMonth,
        year: year,
        monthAsNumberIndex: monthAsNumberIndex,
        monthAsNumber: monthAsNumber,
        monthAsString: monthAsString,
        upComingDateString: upComingDateString
    };

}

// function to fix vote string based on number
const getLessonVoteString = (lesson) => {
    let createVoteString = '';
    if (lesson.lessonVotes.length === 0) {
        createVoteString = `No Votes`;
    } else if (lesson.lessonVotes.length === 1) {
        createVoteString = `${lesson.lessonVotes.length} Vote`;
    } else if (lesson.lessonVotes.length > 1) {
        createVoteString = `${lesson.lessonVotes.length} Votes`
    }
    return createVoteString;
}

// getRandomNumber(0, 6)
// randomAvatar(arrayOfAvatars);

const generateTaughtByThumbs = (loopNumber, containerHTML, lessonTitleForAlt) => {
    for (let i = 0; i < loopNumber; i += 1) {
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

function displayMessage(inputString) {}

const returnFilteredTaughtByUserArray = (lessonTaughtByArray) => {
    let compareArray = [];
    for (let i = 0; i < lessonTaughtByArray.length; i += 1) {
        // console.log(lessonTaughtByArray[i]);
        let pushItem = allUsers.filter((element) => {
            // console.log(element == lessonTaughtByArray[i]);
            return element["_id"] == lessonTaughtByArray[i];
        })
        // console.log(pushItem);
        compareArray.push(pushItem[0])
    }
    // console.log(compareArray);
    return compareArray;
}

function hasUserVoted(lessonVotesArray, currentUserObj) {
    let hasVotedArrayOnLesson = [];
    console.log(lessonVotesArray);
    let hasVotedArrayOnLessonBool = false;
    // console.log(lessonVotesArray, currentUserObj["_id"] , currentUserObj);
    for (let i = 0; i < lessonVotesArray.length; i += 1) {
        if (lessonVotesArray[i] === currentUserObj["_id"]) {
            hasVotedArrayOnLesson.push(true)
        } else {
            hasVotedArrayOnLesson.push(false)
        }
    }
    hasVotedArrayOnLesson = hasVotedArrayOnLesson.filter((element) => element === true);
    // console.log(hasVotedArrayOnLesson);
    if (hasVotedArrayOnLesson.length > 0) {
        hasVotedArrayOnLessonBool = true;
    }

    return hasVotedArrayOnLessonBool;
}

function getButtonHTMLString(boolVal) {
    if (boolVal) {
        return `<button class="btn btnOutline fw900" type="submit">Voted!</button>`
    } else {
        return `<button class="btn btnFill fw900" type="submit">Click to Vote!</button>`
    }
}

const getAllUsers = () => JSON.parse(localStorage.getItem('allUsers'));
const getAllLessons = () => JSON.parse(localStorage.getItem('allLessons'));
const getAllProfileStatistics = () => JSON.parse(localStorage.getItem('allProfileStatistics'));
const getCurrentUser = () => JSON.parse(localStorage.getItem('currentUser'));

export const data = {
    getAllUsers,
    getAllLessons,
    getAllProfileStatistics,
    getCurrentUser
};

export const utils = {
    getDayOfWeek,
    getMonthOfYear,
    getFormattedLessonDate,
    getRandomNumber,
    getLessonVoteString,
    returnFilteredTaughtByUserArray,
    generateTaughtByThumbs
};
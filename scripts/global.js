const allUsers = [
    {
        _id: '0000000001',
        image: './public/images/avatar1.png',
        name: 'Porg Dev1',
        birthday: '02/08/1931',
        location: 'Dev1 Location',
        title: 'Dev1 Title',
        employer: '',
        linkGitHub: '',
        linkCodePen: '',
        linkLinkedIn: '',
        linkPortfolio: '',
        linkResume: '',
        aboutUser: '',
        aboutUserYearsOfExperience: '',
        aboutUserTimeWithRT: '',
        skillsProfessional: [ 0, 1, 2, 3, 4, 5, 6],
        skillsSoftware: [ 0, 1, 2, 3 ],
        skillsLanguages:[ 0, 1, 2, 3 ],
        lecturesAttending: []
    },
    {
        _id: '0000000002',
        image: './public/images/avatar2.png',
        name: 'Porg Dev2',
        birthday: '03/24/1930',
        location: 'Dev2 Location',
        title: 'Dev2 Title',
        employer: '',
        linkGitHub: '',
        linkCodePen: '',
        linkLinkedIn: '',
        linkPortfolio: '',
        linkResume: '',
        aboutUser: '',
        aboutUserYearsOfExperience: '',
        aboutUserTimeWithRT: '',
        skillsProfessional: [ 0, 2, 4, 6],
        skillsSoftware: [ 0, 2 ],
        skillsLanguages:[ 0, 2 ],
        lecturesAttending: []
    },
    {
        _id: '0000000003',
        image: './public/images/avatar3.png',
        name: 'Porg Dev3',
        birthday: '08/29/1958',
        location: 'Dev3 Location',
        title: 'Dev3 Title',
        employer: '',
        linkGitHub: '',
        linkCodePen: '',
        linkLinkedIn: '',
        linkPortfolio: '',
        linkResume: '',
        aboutUser: '',
        aboutUserYearsOfExperience: '',
        aboutUserTimeWithRT: '',
        skillsProfessional: [ 1, 3, 5 ],
        skillsSoftware: [ 1, 3 ],
        skillsLanguages:[ 1, 3 ],
        lecturesAttending: []
    },
    {
        _id: '0000000004',
        image: './public/images/avatar4.png',
        name: 'Porg Dev4',
        birthday: '11/11/1922',
        location: 'Dev4 Location',
        title: 'Dev4 Title',
        employer: '',
        linkGitHub: '',
        linkCodePen: '',
        linkLinkedIn: '',
        linkPortfolio: '',
        linkResume: '',
        aboutUser: '',
        aboutUserYearsOfExperience: '',
        aboutUserTimeWithRT: '',
        skillsProfessional: [ 0, 1, 2, 3, 4, 5, 6],
        skillsSoftware: [ 0, 1, 2, 3 ],
        skillsLanguages:[ 0, 1, 2, 3 ],
        lecturesAttending: []
    },
    {
        _id: '0000000005',
        image: './public/images/avatar5.png',
        name: 'Porg Dev5',
        birthday: '03/10/1965',
        location: 'Dev5 Location',
        title: 'Dev5 Title',
        employer: '',
        linkGitHub: '',
        linkCodePen: '',
        linkLinkedIn: '',
        linkPortfolio: '',
        linkResume: '',
        aboutUser: '',
        aboutUserYearsOfExperience: '',
        aboutUserTimeWithRT: '',
        skillsProfessional: [ 1, 3, 5 ],
        skillsSoftware: [ 1, 3 ],
        skillsLanguages:[ 1, 3 ],
        lecturesAttending: []
    },
    {
        _id: '0000000006',
        image: './public/images/avatar6.png',
        name: 'Porg Dev6',
        birthday: '03/07/1974',
        location: 'Dev6 Location',
        title: 'Dev6 Title',
        employer: '',
        linkGitHub: '',
        linkCodePen: '',
        linkLinkedIn: '',
        linkPortfolio: '',
        linkResume: '',
        aboutUser: '',
        aboutUserYearsOfExperience: '',
        aboutUserTimeWithRT: '',
        skillsProfessional: [ 0, 1, 2, 3, 4, 5, 6],
        skillsSoftware: [ 0, 1, 2, 3 ],
        skillsLanguages:[ 0, 1, 2, 3 ],
        lecturesAttending: []
    },
    {
        _id: '0000000007',
        image: './public/images/porg_sq.jpeg',
        name: 'Porg Von Porghoven',
        birthday: '12/23/1234',
        location: 'Porgsville - Population Porg',
        title: 'Porgy Porg Porg',
        employer: '',
        linkGitHub: 'https://github.com/porgvonporghoven',
        linkCodePen: 'https://codepen.io/porgvonporghoven/',
        linkLinkedIn: 'https://www.linkedin.com/in/porgvonporghoven/',
        linkPortfolio: 'https://www.theporgisindahus.com',
        linkResume: '',
        aboutUser: 'Porgy porg porgy porgy. Porghoven porghoven von von von porg porghoven porgy porgy porgy porghoven porgy porgy porg von. Porghoven team player porg porg porghoven porg porghoven porgy porg von porghoven porgy von.&NewLine;&NewLine;Von porghoven porg porghoven porg porg porg porghoven porghoven porghoven detail oriented porg porghoven porghoven. Porgy porgy porg von porgy porg porgy von. Porghoven porgy porgy von.&NewLine;&NewLine;Porgy porgy porg porg porg porgy porgy porg porghoven porgy porgy porghoven porgy. Porgy porg von porghoven von porgy porghoven porghoven super rocket von porgy porgy von von. Porgy porg porghoven porghoven porgy porg.',
        aboutUserYearsOfExperience: '11/07/2016',
        aboutUserTimeWithRT: '02/02/2017',
        skillsProfessional: [ 0, 1, 2, 3, 4, 5, 6, 7],
        skillsSoftware: [ 0, 1, 2, 3 ],
        skillsLanguages:[ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13 ],
        lecturesAttending: []
    },
    {
        _id: '0000000008',
        image: './public/images/avatar1.png',
        name: 'Porg Dev8',
        birthday: '10/11/1980',
        location: 'Dev8 Location',
        title: 'Dev8 Title',
        employer: '',
        linkGitHub: '',
        linkCodePen: '',
        linkLinkedIn: '',
        linkPortfolio: '',
        linkResume: '',
        aboutUser: '',
        aboutUserYearsOfExperience: '',
        aboutUserTimeWithRT: '',
        skillsProfessional: [ 0, 2, 4, 6],
        skillsSoftware: [ 0, 2 ],
        skillsLanguages:[ 0, 2 ],
        lecturesAttending: []
    },
    {
        _id: '0000000009',
        image: './public/images/avatar2.png',
        name: 'Porg Dev9',
        birthday: '12/13/1981',
        location: 'Dev9 Location',
        title: 'Dev9 Title',
        employer: '',
        linkGitHub: '',
        linkCodePen: '',
        linkLinkedIn: '',
        linkPortfolio: '',
        linkResume: '',
        aboutUser: '',
        aboutUserYearsOfExperience: '',
        aboutUserTimeWithRT: '',
        skillsProfessional: [ 1, 3, 5 ],
        skillsSoftware: [ 1, 3 ],
        skillsLanguages:[ 1, 3 ],
        lecturesAttending: []
    }
]
localStorage.setItem('allUsers', JSON.stringify(allUsers));

// allSkillsProfessional
const allSkillsProfessional = [
    'User Experience Design', 'User Research', 'Information Architecture', 'Visual Design', 'User Centered Design', 'Wireframing Design', 'Interaction Design', 'Front End Development'
]

const allSkillsSoftware = [
    'Sketch', 'Balsamiq', 'OmniGraffle', 'Axure'
]

const allProgrammingLanguages = [
    'HTML', 'CSS', 'JavaScript', 'jQuery', 'Angular', 'React', 'C#', '.NETCore', 'Nancy', 'Python', 'Django', 'Flask', 'Bootstrap', 'WebPack'
]

const allCategories = allSkillsProfessional.concat(allSkillsSoftware, allProgrammingLanguages);
console.log(allCategories);

function returnArrayOfApplicableItems(category, inputArray){
    // console.log(category, inputArray);
    let returnArray = [];
    for(let i = 0; i < inputArray.length; i += 1){
        if(category === 'skillsProfessional'){
            returnArray[i] = allSkillsProfessional[inputArray[i]];
        }
        else if(category === 'skillsSoftware'){
            returnArray[i] = allSkillsSoftware[inputArray[i]];
        }
        else if(category === 'skillsLanguage'){
            returnArray[i] = allProgrammingLanguages[inputArray[i]];
        }
        else if(category === 'allCategories'){
            returnArray[i] = allCategories[inputArray[i]];
        }
        else {
            "Eat my Shorts"
        }
    }
    // console.log(returnArray);
    return returnArray;
}

function deleteItemFromArray(index){
    console.log(index);
    console.log("AT FUNCTION");
}

// const currentUser = allUsers[6];
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
        submitted: '09/12/2017',
        description: 'Words, words, words and more words go right here in this space. Words, words, words and more words go right here in this space. Words, words, words and more words go right here in this space. Words, words, words and more words go right here in this space. Words, words, words and more words go right here in this space.<br><br>Words, words, words and more words go right here in this space. Words, words, words and more words go right here in this space. Words, words, words and more words go right here in this space.',
        categories: [7, 14, 12, 13],
        answersToQuestion: [],
        fk_author: '0000000001'
    },
    {
        _id: 'iq00000002',
        title: 'Build An Accordion',
        submitted: '09/05/2017',
        description: 'Words, words, words and more words go right here in this space. Words, words, words and more words go right here in this space. Words, words, words and more words go right here in this space. Words, words, words and more words go right here in this space. Words, words, words and more words go right here in this space.<br><br>Words, words, words and more words go right here in this space. Words, words, words and more words go right here in this space. Words, words, words and more words go right here in this space.',
        categories: [ 3, 7, 12, 13, 14 ],
        answersToQuestion: ['ia00000001', 'ia00000002'],
        fk_author: '0000000001'
    },
    {
        _id: 'iq00000003',
        title: 'Build a Modal',
        submitted: '08/28/2017',
        description: 'Words, words, words and more words go right here in this space. Words, words, words and more words go right here in this space. Words, words, words and more words go right here in this space. Words, words, words and more words go right here in this space. Words, words, words and more words go right here in this space.<br><br>Words, words, words and more words go right here in this space. Words, words, words and more words go right here in this space. Words, words, words and more words go right here in this space.',
        categories: [ 3, 7, 12, 13, 14 ],
        answersToQuestion: ['ia00000003'],
        fk_author: '0000000001'
    },
    {
        _id: 'iq00000004',
        title: 'Build a Gallery',
        submitted: '08/21/2017',
        description: 'Words, words, words and more words go right here in this space. Words, words, words and more words go right here in this space. Words, words, words and more words go right here in this space. Words, words, words and more words go right here in this space. Words, words, words and more words go right here in this space.<br><br>Words, words, words and more words go right here in this space. Words, words, words and more words go right here in this space. Words, words, words and more words go right here in this space.',
        categories: [ 3, 7, 12, 13, 14, 15, 24 ],
        answersToQuestion: ['ia00000004'],
        fk_author: '0000000001'
    }
]
localStorage.setItem('allInterviewQuestions', JSON.stringify(allInterviewQuestions));

const allAnswersToQuestions = [
    {
        _id: 'ia00000001',
        title: '',
        submitted: '09/07/2017',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi, recusandae distinctio sunt beatae ut quasi! Nulla repellendus impedit eum recusandae architecto, distinctio id voluptate doloremque ratione alias eveniet maiores voluptatum, qui maxime repellat iste facilis possimus quibusdam eos similique amet nesciunt? Ipsum iure deserunt facilis fugit officia pariatur, rerum, dolore ad sit laborum odio amet! At, quibusdam. Hic laborum, alias dolore suscipit minima inventore accusamus! Autem, magni! Aliquid quod ullam maiores illo similique? Dolore ad consequuntur, accusamus fugit sint iure quod quos id suscipit molestiae quibusdam expedita nam autem consectetur dignissimos doloremque fugiat veniam error rem! Illo totam minima fugiat.',
        fk_question: 'iq00000002',
        fk_author: '0000000001'
    },
    {
        _id: 'ia00000002',
        title: '',
        submitted: '09/09/2017',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi, recusandae distinctio sunt beatae ut quasi! Nulla repellendus impedit eum recusandae architecto, distinctio id voluptate doloremque ratione alias eveniet maiores voluptatum, qui maxime repellat iste facilis possimus quibusdam eos similique amet nesciunt? Ipsum iure deserunt facilis fugit officia pariatur, rerum, dolore ad sit laborum odio amet! At, quibusdam. Hic laborum, alias dolore suscipit minima inventore accusamus! Autem, magni! Aliquid quod ullam maiores illo similique? Dolore ad consequuntur, accusamus fugit sint iure quod quos id suscipit molestiae quibusdam expedita nam autem consectetur dignissimos doloremque fugiat veniam error rem! Illo totam minima fugiat.',
        fk_question: 'iq00000002',
        fk_author: '0000000001'
    },
    {
        _id: 'ia00000003',
        title: '',
        submitted: '09/01/2017',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi, recusandae distinctio sunt beatae ut quasi! Nulla repellendus impedit eum recusandae architecto, distinctio id voluptate doloremque ratione alias eveniet maiores voluptatum, qui maxime repellat iste facilis possimus quibusdam eos similique amet nesciunt? Ipsum iure deserunt facilis fugit officia pariatur, rerum, dolore ad sit laborum odio amet! At, quibusdam. Hic laborum, alias dolore suscipit minima inventore accusamus! Autem, magni! Aliquid quod ullam maiores illo similique? Dolore ad consequuntur, accusamus fugit sint iure quod quos id suscipit molestiae quibusdam expedita nam autem consectetur dignissimos doloremque fugiat veniam error rem! Illo totam minima fugiat.',
        fk_question: 'iq00000003',
        fk_author: '0000000001'
    },
    {
        _id: 'ia00000004',
        title: '',
        submitted: '08/31/2017',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi, recusandae distinctio sunt beatae ut quasi! Nulla repellendus impedit eum recusandae architecto, distinctio id voluptate doloremque ratione alias eveniet maiores voluptatum, qui maxime repellat iste facilis possimus quibusdam eos similique amet nesciunt? Ipsum iure deserunt facilis fugit officia pariatur, rerum, dolore ad sit laborum odio amet! At, quibusdam. Hic laborum, alias dolore suscipit minima inventore accusamus! Autem, magni! Aliquid quod ullam maiores illo similique? Dolore ad consequuntur, accusamus fugit sint iure quod quos id suscipit molestiae quibusdam expedita nam autem consectetur dignissimos doloremque fugiat veniam error rem! Illo totam minima fugiat.',
        fk_question: 'iq00000004',
        fk_author: '0000000001'
    }
]
localStorage.setItem('allAnswersToQuestions', JSON.stringify(allAnswersToQuestions));

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

const getFormattedDate = (dateToFormat) => {

    const dayOfWeek = getDayOfWeek(dateToFormat.getDay());
    const dateOfMonth = dateToFormat.getDate();
    const year = dateToFormat.getFullYear();
    const monthAsNumberIndex = dateToFormat.getMonth();
    const monthAsNumber = monthAsNumberIndex + 1;
    const monthAsString = getMonthOfYear(monthAsNumberIndex);
    const upComingDateStringEuroNamingNumber = `${year} ${monthAsNumber} ${dateOfMonth}`
    const upComingDateStringAmericanNaming = `${monthAsString} ${dateOfMonth}, ${year}`
    const upComingDateStringAmericanWithSlash = `${monthAsNumber}/${dateOfMonth}/${year}`

    return {
        dayOfWeek: dayOfWeek,
        dateOfMonth: dateOfMonth,
        year: year,
        monthAsNumberIndex: monthAsNumberIndex,
        monthAsNumber: monthAsNumber,
        monthAsString: monthAsString,
        upComingDateStringEuroNamingNumber: upComingDateStringEuroNamingNumber,
        upComingDateStringAmericanNaming: upComingDateStringAmericanNaming,
        upComingDateStringAmericanWithSlash: upComingDateStringAmericanWithSlash
    };

}

// function to fix vote string based on number
// const getLessonVoteString = (lesson) => {
//     let createVoteString = '';
//     if (lesson.lessonVotes.length === 0) {
//         createVoteString = `No Votes`;
//     } else if (lesson.lessonVotes.length === 1) {
//         createVoteString = `${lesson.lessonVotes.length} Vote`;
//     } else if (lesson.lessonVotes.length > 1) {
//         createVoteString = `${lesson.lessonVotes.length} Votes`
//     }
//     return createVoteString;
// }
const getCountString = (condString, array) => {
    let createCountString = '';
    let count;
    let string = '';
    if(condString === 'lesson'){
        count = array.lessonVotes.length;
    }
    else if(condString === 'question'){
        count = array.answersToQuestion.length;
    }
    if (count === 0) {
        if(condString === 'lesson'){
            string = 'Votes'
        }
        else if(condString === 'question'){
            string = 'Replies'
        }
        createCountString = `No ${string}`;
    } else if (count === 1) {
        if(condString === 'lesson'){
            string = 'Vote'
        }
        else if(condString === 'question'){
            string = 'Reply'
        }
        createCountString = `${count} ${string}`;
    } else if (count > 1) {
        if(condString === 'lesson'){
            string = 'Votes'
        }
        else if(condString === 'question'){
            string = 'Replies'
        }
        createCountString = `${count} ${string}`
    }
    return createCountString;
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
    // console.log(lessonVotesArray);
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


//editProfile functions
function getAgeEditProfile(dateOfBirth){
    let millisecsInAYear = 31536000000;
    let dateNow = Date.now();
    let totalAgeMS = dateNow - dateOfBirth;
    // console.log(Math.floor(totalAgeMS/millisecsInAYear));
    return Math.floor(totalAgeMS/millisecsInAYear);
}

const checkFullScreen = (page) => {
    if (page === 'home' || page === 'sign-out') {
        document.querySelector('.sidebar').style.display = "none";
        document.querySelector('header').style.display = "none";
        document.querySelector('#mainWindow').style.marginLeft = 0;
    } else {
        document.querySelector('#mainWindow').style.marginLeft = '20%';
        document.querySelector('.sidebar').style.display = "";
        document.querySelector('header').style.display = "";
    }
};

const navigateToPage = (page) => {
    window.location.hash = page;  
};


const getAllUsers = () => JSON.parse(localStorage.getItem('allUsers'));
// console.log('getAllUsers', getAllUsers);
const getCurrentUser = () => JSON.parse(localStorage.getItem('currentUser'));

const getAllProfileStatistics = () => JSON.parse(localStorage.getItem('allProfileStatistics'));

const getAllLessons = () => JSON.parse(localStorage.getItem('allLessons'));

const getAllInterviewQuestions = () => JSON.parse(localStorage.getItem('allInterviewQuestions'));

const getAllAnswersToQuestions = () => JSON.parse(localStorage.getItem('allAnswersToQuestions'));

const getArrayOfAvatars = () => JSON.parse(localStorage.getItem('arrayOfAvatars'));


export const data = {
    getAllUsers,
    getCurrentUser,
    getAllProfileStatistics,
    getAllLessons,
    getAllInterviewQuestions,
    getAllAnswersToQuestions,
    getArrayOfAvatars
};

export const utils = {
    getDayOfWeek,
    getMonthOfYear,
    getFormattedDate,
    getRandomNumber,
    getCountString,
    returnFilteredTaughtByUserArray,
    hasUserVoted,
    getButtonHTMLString,
    generateTaughtByThumbs,
    // edit Profile
    getAgeEditProfile,
    returnArrayOfApplicableItems,
    deleteItemFromArray,
    checkFullScreen,
    navigateToPage
};
import {Store} from './store.js';
// userSchema = {
//     userId: - String - uuid for each user from cognito
//     username: - String - username from cognito
//     picture: - String - upload .jpg or .png under 300kb to our S3 save url that comes back, (we could accept gravitar since we can control the url and just ask for gravitar username)
//     name: 'Porg Dev1'
//     created - - Date String - JS date string new Date().toString()
//     birthday: - Date String - JS date string Date().toString()
//     city: - String - city of residence
//     state: - String - shorthand state e.g. WA
//     title: - String -  Title of dev
//     employer: - String - Free input
//     github: - String - github username (we construct url ourselves)
//     codepen: - String - codepen username (we construct url ourselves)
//     linkedin: - String - linkedin username (we construct url ourselves)
//     website: - String - free input website ... dangerous field, might want to not link it have it just be text
//     resume: - String<S3URL> - Base64 the file and send it up to our S3 get the link from S3 back (validate only take certain extensions .doc .docx to S3)
//     bio: - String - users bio max 500 words ''
//     experience: - Number - Years experience (?)
//     timeWithRT: - Number - Years with RT (?)
//     rank: Number - Rank in RT (white belt, green belt, black)etc... for mentor/project pairing,
//     skillsProfessional: Array<Strings> -  should be array of text skills, (users pick from a wide variety we curate from dropdown)
//     skillsSoftware:  Array<Strings> -  should be array of text skills, (users pick from a wide variety we curate from dropdown)
//     skillsLanguages: Array<Strings> -  should be array of text skills, (users pick from a wide variety we curate from dropdown)
//     lessonsAttending:  Array<Strings> - array of ids of lessons dev is planning to attend
// }

const allUsers = [{
        _id: '0000000001',
        image: './images/avatar1.png',
        name: 'Porg Dev1',
        username: '',
        created: new Date('01/01/2016').toString(),
        // birthday: new Date(1931, 2, 8, 0, 0, 0).toString(),
        birthday: new Date('02/08/1931').toString(),
        // location: 'Dev1 Location',
        city: 'Seattle',
        state: 'WA',
        title: 'Dev1 Title',
        employer: '',
        linkGitHub: 'https://github.com/',
        linkCodePen: 'https://codepen.io/',
        linkLinkedIn: 'https://www.linkedin.com/in/',
        linkPortfolio: '',
        linkResume: '',
        aboutUser: '',
        aboutUserYearsOfExperience: '',
        aboutUserTimeWithRT: '',
        skillsProfessional: [0, 1, 2, 3, 4, 5, 6],
        skillsSoftware: [0, 1, 2, 3],
        skillsLanguages: [0, 1, 2, 3],
        lessonsAttending: ['1000000001']
    },
    {
        _id: '0000000002',
        image: './images/avatar2.png',
        name: 'Porg Dev2',
        username: '',
        created: new Date('01/01/2016').toString(),
        birthday: new Date('03/24/1930').toString(),
        // location: 'Dev2 Location',
        city: 'Portland',
        state: 'OR',
        title: 'Dev2 Title',
        employer: '',
        linkGitHub: 'https://github.com/',
        linkCodePen: 'https://codepen.io/',
        linkLinkedIn: 'https://www.linkedin.com/in/',
        linkPortfolio: '',
        linkResume: '',
        aboutUser: '',
        aboutUserYearsOfExperience: '',
        aboutUserTimeWithRT: '',
        skillsProfessional: [0, 2, 4, 6],
        skillsSoftware: [0, 2],
        skillsLanguages: [0, 2],
        lessonsAttending: ['1000000001', '1000000002']
    },
    {
        _id: '0000000003',
        image: './images/avatar3.png',
        name: 'Porg Dev3',
        username: '',
        created: new Date('01/01/2016').toString(),
        birthday: new Date('08/29/1958').toString(),
        // location: 'Dev3 Location',
        city: 'Vancouver',
        state: 'WA',
        title: 'Dev3 Title',
        employer: '',
        linkGitHub: 'https://github.com/',
        linkCodePen: 'https://codepen.io/',
        linkLinkedIn: 'https://www.linkedin.com/in/',
        linkPortfolio: '',
        linkResume: '',
        aboutUser: '',
        aboutUserYearsOfExperience: '',
        aboutUserTimeWithRT: '',
        skillsProfessional: [1, 3, 5],
        skillsSoftware: [1, 3],
        skillsLanguages: [1, 3],
        lessonsAttending: ['1000000002', '1000000003']
    },
    {
        _id: '0000000004',
        image: './images/avatar4.png',
        name: 'Porg Dev4',
        username: '',
        created: new Date('01/01/2016').toString(),
        birthday: new Date('11/11/1922').toString(),
        // location: 'Dev4 Location',
        city: 'Tacoma',
        state: 'WA',
        title: 'Dev4 Title',
        employer: '',
        linkGitHub: 'https://github.com/',
        linkCodePen: 'https://codepen.io/',
        linkLinkedIn: 'https://www.linkedin.com/in/',
        linkPortfolio: '',
        linkResume: '',
        aboutUser: '',
        aboutUserYearsOfExperience: '',
        aboutUserTimeWithRT: '',
        skillsProfessional: [0, 1, 2, 3, 4, 5, 6],
        skillsSoftware: [0, 1, 2, 3],
        skillsLanguages: [0, 1, 2, 3],
        lessonsAttending: ['1000000003', '1000000004']
    },
    {
        _id: '0000000005',
        image: './images/avatar5.png',
        name: 'Porg Dev5',
        username: '',
        created: new Date('01/01/2016').toString(),
        birthday: new Date('03/10/1965').toString(),
        // location: 'Dev5 Location',
        city: 'Yakima',
        state: 'WA',
        title: 'Dev5 Title',
        employer: '',
        linkGitHub: 'https://github.com/',
        linkCodePen: 'https://codepen.io/',
        linkLinkedIn: 'https://www.linkedin.com/in/',
        linkPortfolio: '',
        linkResume: '',
        aboutUser: '',
        aboutUserYearsOfExperience: '',
        aboutUserTimeWithRT: '',
        skillsProfessional: [1, 3, 5],
        skillsSoftware: [1, 3],
        skillsLanguages: [1, 3],
        lessonsAttending: ['1000000005', '1000000006']
    },
    {
        _id: '0000000006',
        image: './images/avatar6.png',
        name: 'Porg Dev6',
        username: '',
        created: new Date('01/01/2016').toString(),
        birthday: new Date('03/07/1974').toString(),
        // location: 'Dev6 Location',
        city: 'Walla Walla',
        state: 'WA',
        title: 'Dev6 Title',
        employer: '',
        linkGitHub: 'https://github.com/',
        linkCodePen: 'https://codepen.io/',
        linkLinkedIn: 'https://www.linkedin.com/in/',
        linkPortfolio: '',
        linkResume: '',
        aboutUser: '',
        aboutUserYearsOfExperience: '',
        aboutUserTimeWithRT: '',
        skillsProfessional: [0, 1, 2, 3, 4, 5, 6],
        skillsSoftware: [0, 1, 2, 3],
        skillsLanguages: [0, 1, 2, 3],
        lessonsAttending: ['1000000006']
    },
    {
        _id: '0000000007',
        image: './images/porg_sq.jpeg',
        name: 'Porg Von Porghoven',
        username: '',
        created: new Date('01/01/2016').toString(),
        birthday: new Date('12/23/1234').toString(),
        // location: 'Porgsville - Population Porg',
        city: 'Porgsville',
        state: 'Porgistan',
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
        skillsProfessional: [0, 1, 2, 3, 4, 5, 6, 7],
        skillsSoftware: [0, 1, 2, 3],
        skillsLanguages: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
        lessonsAttending: ['1000000001', '1000000002', '1000000003', '1000000004', '1000000005', '1000000006']
    },
    {
        _id: '0000000008',
        image: './images/avatar1.png',
        name: 'Porg Dev8',
        username: '',
        created: new Date('01/01/2016').toString(),
        birthday: new Date('10/11/1980').toString(),
        // location: 'Dev8 Location',
        city: 'Gig Harbor',
        state: 'WA',
        title: 'Dev8 Title',
        employer: '',
        linkGitHub: 'https://github.com/',
        linkCodePen: 'https://codepen.io/',
        linkLinkedIn: 'https://www.linkedin.com/in/',
        linkPortfolio: '',
        linkResume: '',
        aboutUser: '',
        aboutUserYearsOfExperience: '',
        aboutUserTimeWithRT: '',
        skillsProfessional: [0, 2, 4, 6],
        skillsSoftware: [0, 2],
        skillsLanguages: [0, 2],
        lessonsAttending: ['1000000001', '1000000003', '1000000005']
    },
    {
        _id: '0000000009',
        image: './images/avatar2.png',
        name: 'Porg Dev9',
        username: '',
        created: new Date('01/01/2016').toString(),
        birthday: new Date('12/13/1981').toString(),
        // location: 'Dev9 Location',
        city: 'Pullman',
        state: 'WA',
        title: 'Dev9 Title',
        employer: '',
        linkGitHub: 'https://github.com/',
        linkCodePen: 'https://codepen.io/',
        linkLinkedIn: 'https://www.linkedin.com/in/',
        linkPortfolio: '',
        linkResume: '',
        aboutUser: '',
        aboutUserYearsOfExperience: '',
        aboutUserTimeWithRT: '',
        skillsProfessional: [1, 3, 5],
        skillsSoftware: [1, 3],
        skillsLanguages: [1, 3],
        lessonsAttending: ['1000000002', '1000000004', '1000000006']
    }
]
localStorage.setItem('allUsers', JSON.stringify(allUsers));

// allSkillsProfessional
const allSkillsProfessional = [
    'User Experience Design', 'User Research', 'Information Architecture', 'Visual Design', 'User Centered Design', 'Wireframing Design', 'Interaction Design', 'Front End Development'
]

export const allSkillsProfessionalObj = {
    UXDesign: 'User Experience Design',
    UResearch: 'User Research',
    InfoArch: 'Information Architecture',
    VisualDesign: 'Visual Design',
    UCenterdDesign: 'User Centered Design',
    WireFramingDesign: 'Wireframing Design',
    InteracctionDesign: 'Interaction Design',
    FrontEndDevelopment: 'Front End Development'
}

const allSkillsSoftware = [
    'Sketch', 'Balsamiq', 'OmniGraffle', 'Axure'
]

export const allSkillsSoftwareObj = {
    Sketch: 'Sketch',
    Balsamiq: 'Balsamiq',
    OmniGraffle: 'OmniGraffle',
    Axure: 'Axure'
}

const allProgrammingLanguages = [
    'HTML', 'CSS', 'JavaScript', 'jQuery', 'Angular', 'React', 'C#', '.NETCore', 'Nancy', 'Python', 'Django', 'Flask', 'Bootstrap', 'WebPack'
]

export const allProgrammingLanguagesObj = {
    HTML : 'HTML',
    CSS : 'CSS',
    JavaScript: 'JavaScript',
    jQuery: 'jQuery',
    Angular: 'Angular',
    React: 'React',
    CSharp: 'C#',
    dotNetCore: '.NETCore',
    Nancy: 'Nancy',
    Python: 'Python',
    Django: 'Django',
    Flask: 'Flask',
    Bootstrap: 'Bootstrap',
    WebPack: 'WebPack'
}

const allStates = [
    ["Alabama", "AL"],
    ["Alaska", "AK"],
    ["Arizona", "AZ"],
    ["Arkansas", "AR"],
    ["California", "CA"],
    ["Colorado", "CO"],
    ["Connecticut", "CT"],
    ["Delaware", "DE"],
    ["Florida", "FL"],
    ["Georgia", "GA"],
    ["Hawaii", "HI"],
    ["Idaho", "ID"],
    ["Illinois", "IL"],
    ["Indiana", "IN"],
    ["Iowa", "IA"],
    ["Kansas", "KS"],
    ["Kentucky", "KY"],
    ["Louisiana", "LA"],
    ["Maine", "ME"],
    ["Maryland", "MD"],
    ["Massachusetts", "MA"],
    ["Michigan", "MI"],
    ["Minnesota", "MN"],
    ["Mississippi", "MS"],
    ["Missouri", "MO"],
    ["Montana", "MT"],
    ["Nebraska", "NE"],
    ["Nevada", "NV"],
    ["New Hampshire", "NH"],
    ["New Jersey", "NJ"],
    ["New Mexico", "NM"],
    ["New York", "NY"],
    ["North Carolina", "NC"],
    ["North Dakota", "ND"],
    ["Ohio", "OH"],
    ["Oklahoma", "OK"],
    ["Oregon", "OR"],
    ["Pennsylvania", "PA"],
    ["Rhode Island", "RI"],
    ["South Carolina", "SC"],
    ["South Dakota", "SD"],
    ["Tennessee", "TN"],
    ["Texas", "TX"],
    ["Utah", "UT"],
    ["Vermont", "VT"],
    ["Virginia", "VA"],
    ["Washington", "WA"],
    ["West Virginia", "WV"],
    ["Wisconsin", "WI"],
    ["Wyoming", "WY"]
]
localStorage.setItem('allStates', JSON.stringify(allStates));

const allCategories = allSkillsProfessional.concat(allSkillsSoftware, allProgrammingLanguages);
// console.log(allCategories);

function returnArrayOfApplicableItems(category, inputArray) {
    // console.log(category, inputArray);
    let returnArray = [];
    for (let i = 0; i < inputArray.length; i += 1) {
        if (category === 'skillsProfessional') {
            returnArray[i] = allSkillsProfessional[inputArray[i]];
        } else if (category === 'skillsSoftware') {
            returnArray[i] = allSkillsSoftware[inputArray[i]];
        } else if (category === 'skillsLanguage') {
            returnArray[i] = allProgrammingLanguages[inputArray[i]];
        } else if (category === 'allCategories') {
            returnArray[i] = allCategories[inputArray[i]];
        } else {
            "Eat my Shorts"
        }
    }
    // console.log(returnArray);
    return returnArray;
}

function deleteItemFromArray(index) {
    console.log(index);
    console.log("AT FUNCTION");
}

// const currentUser = allUsers[6];
const currentUser = allUsers[getRandomNumber(0, allUsers.length)];
localStorage.setItem('currentUser', JSON.stringify(currentUser));

// lessonSchema = {
//   id: - String - Random a-z0-9 uuid,
//   title: - String - Title of lesson,
//   date: - Date String - new Date().toString(),
//   description: - String - A description of the lesson,
//   createdBy: - String - uuid - userid of the dev that created the lesson request
//   lessonTaughtBy: - Array<String> - usernames of the devs teaching,
//   lessonAttendees: - Array<String> - usernames of the devs attending,
//   rank: Array<String> - usernames of the devs who have voted the lesson (for an optional sort) we display as length of the array or icons of devs,
// }
// database call for Lessons
const allLessons = [{
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

// interviewQuestionSchema = {
//     id: String - some random string uid',
//     title: String - title of the question
//     submitted: String - JS new Date().toString() "Sun Feb 25 2018 23:25:08 GMT-0800 (PST)",
//     description: String(Max 1000 characters) - The question,
//     categories: Array<Strings> - The question category names related to the question,
//     rank: Array<String> - usernames of the devs who have upvoted the question (for an optional sort) we display as length of the array or icons of devs,
//     author: String - username of the user who created
// };

// interview questions
const allInterviewQuestions = [{
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
        categories: [3, 7, 12, 13, 14],
        answersToQuestion: ['ia00000001', 'ia00000002'],
        fk_author: '0000000001'
    },
    {
        _id: 'iq00000003',
        title: 'Build a Modal',
        submitted: '08/28/2017',
        description: 'Words, words, words and more words go right here in this space. Words, words, words and more words go right here in this space. Words, words, words and more words go right here in this space. Words, words, words and more words go right here in this space. Words, words, words and more words go right here in this space.<br><br>Words, words, words and more words go right here in this space. Words, words, words and more words go right here in this space. Words, words, words and more words go right here in this space.',
        categories: [3, 7, 12, 13, 14],
        answersToQuestion: ['ia00000003'],
        fk_author: '0000000001'
    },
    {
        _id: 'iq00000004',
        title: 'Build a Gallery',
        submitted: '08/21/2017',
        description: 'Words, words, words and more words go right here in this space. Words, words, words and more words go right here in this space. Words, words, words and more words go right here in this space. Words, words, words and more words go right here in this space. Words, words, words and more words go right here in this space.<br><br>Words, words, words and more words go right here in this space. Words, words, words and more words go right here in this space. Words, words, words and more words go right here in this space.',
        categories: [3, 7, 12, 13, 14, 15, 24],
        answersToQuestion: ['ia00000004'],
        fk_author: '0000000001'
    }
]
localStorage.setItem('allInterviewQuestions', JSON.stringify(allInterviewQuestions));

// interviewAnswerSchema = {
//     id: String - some random string uid',
//     title: String - title of the question
//     submitted: String - JS new Date().toString() "Sun Feb 25 2018 23:25:08 GMT-0800 (PST)",
//     description: String - The question,
//     rank: Number - devs who have upvoted the answer (for an optional sort),
//     questionId: String - the id of the question the answer is associated with
//     author: String - username of the user who created
// };
const allAnswersToQuestions = [{
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
const profileStatistics = [{
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

const getBoolIfUserAttending = (lessonId, userAttendingArray) => {
    // console.log(lessonId);
    // console.log(userAttendingArray);
    // console.log(Array.isArray(userAttendingArray));
    let bool = userAttendingArray.includes(lessonId);
    // console.log(bool);
    let slotObj = {};
    if (bool) {
        //true
        // slotString = `class="fc-dateRowTitle Star"`
        slotObj = {
            class: "fc-dateRowTitle Star"
        }
    } else {
        // slotString = `class="fc-dateRowTitle noStar"`
        slotObj = {
            class: "fc-dateRowTitle noStar"
        }
    }
    // console.log(slotObj);
    return slotObj;
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

const getCountString = (condString, array) => {
    let createCountString = '';
    let count;
    let string = '';
    if (condString === 'lesson') {
        count = array.lessonVotes.length;
    } else if (condString === 'question') {
        count = array.answersToQuestion.length;
    }
    if (count === 0) {
        if (condString === 'lesson') {
            string = 'Votes'
        } else if (condString === 'question') {
            string = 'Replies'
        }
        createCountString = `No ${string}`;
    } else if (count === 1) {
        if (condString === 'lesson') {
            string = 'Vote'
        } else if (condString === 'question') {
            string = 'Reply'
        }
        createCountString = `${count} ${string}`;
    } else if (count > 1) {
        if (condString === 'lesson') {
            string = 'Votes'
        } else if (condString === 'question') {
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
        imgTaughtByThumbs.setAttribute('src', `../images/${randImage}`);
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
        return `<button class="btn btnOutline fw500" type="submit">Voted!</button>`
    } else {
        return `<button class="btn btnFill fw500" type="submit">Vote for this</button>`
    }
}

//editProfile functions
function getAgeEditProfile(dateOfBirth) {
    let millisecsInAYear = 31536000000;
    let dateNow = Date.now();
    let totalAgeMS = dateNow - dateOfBirth;
    // console.log(Math.floor(totalAgeMS/millisecsInAYear));
    return Math.floor(totalAgeMS / millisecsInAYear);
}

// const theApi = new api();

const checkFullScreen = (page) => {
    if (page === 'home' || page === 'sign-out') {
        document.querySelector('.sidebar').style.display = "none";
        document.querySelector('header').style.display = "none";
        document.querySelector('#mainWindow').style.marginLeft = 0;

    } else {
        // console.log("We hit the checkFullScreen");
        if (window.innerWidth > 768) {
            document.querySelector('.sidebar').style.display = "";
            document.querySelector('header').style.display = "";
            setWindowOffsetsLayout();
        } else if (window.innerWidth <= 768) {
            document.querySelector('.sidebar').style.display = "";
            document.querySelector('header').style.display = "";
            document.querySelector('#mainWindow').style.marginLeft = 0;
            setWindowOffsetsMobile();
        }
    }
};

const navigateToPage = (page) => {
    window.location.hash = page;
};

const setTitle = () => {
    const newTitle = document.location.hash.replace('#', '').split('-');
    const currentTitle = document.getElementsByTagName('title')[0];

    const newTitleUppercased = newTitle.map((word) => {
        return word[0].toUpperCase() + word.slice(1, word.length);
    }).join(" ");

    currentTitle.textContent = newTitleUppercased;
};


const showModal = (modalToShow) => {
    Array.from(document.getElementsByClassName('modal'), (modal) => {
        modal.style.display = "none";
    });

    modalToShow.style.display = "block";
}

const getConcatenatedLocationString = (city, state) => {
    let concatString = `${city}, ${state}`;
    // console.log(concatString);
    return concatString;
}

// helper method for textAreaCharCounter
const toggleCharCountText = (count, limit, element) => {
    if (count < limit) {
        element.style.color = element.style.color === 'red' ? 'black' : null;
        element.textContent = `You have ${limit - count} characters left.`
    } else {
        element.style.color = 'red';
        element.textContent = `You have exceeded the character limit. `
    }
}

// helper method for textAreaCharCounter
const getCharCount = (event) => {
    return event.target.value.length;
}

// helper method for textAreaCharCounter
const checkForLimit = (event, count, limit) => {
    if (count >= limit) {
        event.preventDefault();
        return false;
    }
};

const textAreaCharCounter = (textAreaElemantId, charCountId, limit) => {
    const parent = document.getElementById(textAreaElemantId).parentNode;
    const textarea = document.getElementById(textAreaElemantId);
    const charCount = document.createElement('div');
    let count = textarea.value.length;


    charCount.setAttribute('id', charCountId);
    charCount.classList.add('counterBot');

    parent.appendChild(charCount);

    charCount.textContent = `You have ${limit} characters left.`

    toggleCharCountText(count, limit, charCount);

    textarea.addEventListener('keypress', (e) => {
        checkForLimit(e, count, limit);
    });

    textarea.addEventListener('paste', (e) => {
        checkForLimit(e, count, limit);
    });

    textarea.addEventListener('input', (e) => {
        count = getCharCount(e);
        toggleCharCountText(count, limit, charCount);
    });
};

const parseJwt = (token) => {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64));
}

const getAllUsers = () => JSON.parse(localStorage.getItem('allUsers'));
// console.log('getAllUsers', getAllUsers);
const getCurrentUser = () => JSON.parse(localStorage.getItem('currentUser'));

const getAllProfileStatistics = () => JSON.parse(localStorage.getItem('allProfileStatistics'));

const getAllLessons = () => JSON.parse(localStorage.getItem('allLessons'));

const getAllInterviewQuestions = () => JSON.parse(localStorage.getItem('allInterviewQuestions'));

const getAllAnswersToQuestions = () => JSON.parse(localStorage.getItem('allAnswersToQuestions'));

const getArrayOfAvatars = () => JSON.parse(localStorage.getItem('arrayOfAvatars'));

const getArrayOfAllStates = () => JSON.parse(localStorage.getItem('AllStates'));

const setWindowOffsetsLayout = () => {
    // console.log("setWindowOffsetsLayout");
    // console.log("innerHeight", window.innerHeight);
    // console.log("outerHeight", window.outerHeight);
    // console.log("innerWidth", window.innerWidth);
    // console.log("outerWidth", window.outerWidth);
    const header = document.getElementsByTagName("header")[0]
    const headerHeight = document.getElementsByTagName("header")[0].offsetHeight;
    const mainContainer = document.getElementById("mainWindow");
    const mainContainerOffsetTop = headerHeight;
    const footerHeight = document.getElementsByTagName("footer")[0].offsetHeight;
    // console.log(header);
    // console.log("headerHeight: ", headerHeight);


    if (window.location.hash != "#home") {
        const sideBar = document.getElementById("sidebar");
        const sideBarWidth = Math.floor(window.innerWidth * .2);
        const sideBarHeightOffsetTop = headerHeight;
        const mainContainerOffsetLeft = sideBarWidth;

        let sidebarHeight = window.innerHeight - headerHeight - footerHeight;

        sideBar.style.marginTop = `${headerHeight}px`;
        sideBar.style.height = `${sidebarHeight}px`;
        sideBar.style.width = `${sideBarWidth}px`;
        mainContainer.style.marginLeft = `${mainContainerOffsetLeft}px`;
    }

    // console.log("sideBarWidth: ", sideBarWidth);
    // console.log(mainContainer);
    // console.log("mainContainerOffLeft: ", mainContainerOffsetLeft);

    // console.log("mainContainerOffTop: ", mainContainerOffsetTop);

    // console.log("footerHeight: ", footerHeight);

    // console.log(sidebarHeight);
    // header
    // console.log(header.offsetTop);
    // header.offsetTop = `${headerHeight}px`;
    mainContainer.style.marginTop = `${headerHeight}px`;
    mainContainer.style.marginBottom = `${footerHeight}px`;
    // console.log(document.getElementsByTagName("header"));
}

document.getElementById('hamburger').addEventListener('click', function log() {
    const headerHeight = document.getElementsByTagName("header")[0].offsetHeight;
    document.getElementById('sidebar').classList.toggle('displayed');
    const sideBar = document.querySelector(".sidebar");
    const sideBarHeight = sideBar.offsetHeight;
    // console.log("Log", sideBarHeight);

    const sideBarHeightOffsetTop = headerHeight;
    sideBar.style.marginTop = `${sideBarHeightOffsetTop}px`

    const mainContainer = document.getElementById("mainWindow");
    const mainContainerMarginTop = headerHeight + sideBarHeight;

    mainContainer.style.marginTop = `${mainContainerMarginTop}px`
})


const setWindowOffsetsMobile = () => {
    // console.log("setWindowOffsetsMobile");
    const headerHeight = document.getElementsByTagName("header")[0].offsetHeight;
    // console.log(headerHeight);
    const sideBar = document.querySelector(".sidebar");
    // console.log(sideBar);
    // const sideBarWidth = window.innerWidth;
    const sideBarHeight = sideBar.offsetHeight;
    const sideBarHeightOffsetTop = headerHeight;

    const mainContainer = document.getElementById("mainWindow");
    const mainContainerMarginTop = headerHeight + sideBarHeight;
    document.querySelector('#mainWindow').style.marginLeft = 0;
    sideBar.style.width = ""

    sideBar.style.marginTop = `${sideBarHeightOffsetTop}px`

    mainContainer.style.marginTop = `${mainContainerMarginTop}px`
}

let allSkillsProfessionalArray = Object.values(allSkillsProfessionalObj);
let allSkillsSoftwareArray = Object.values(allSkillsSoftwareObj);
let allProgrammingLanguagesArray = Object.values(allProgrammingLanguagesObj);
let allSkillsArray = [...Object.values(allSkillsProfessionalObj), ...Object.values(allSkillsSoftwareObj), ...Object.values(allProgrammingLanguagesObj)]
console.log(allSkillsArray);

function autoComplete(event){
    let currentFocus;
    let arrayInput = [];
    if(event.target.id === "skillsProg"){
        arrayInput = allProgrammingLanguagesArray;
        // arrayInput = countries;
    }
    else if(event.target.id === "skillsSoft"){
        arrayInput = allSkillsSoftwareArray
    }
    else if(event.target.id === "skillsProf"){
        arrayInput = allSkillsProfessionalArray
    }
    else if(event.target.id === "allSkills"){
        arrayInput = allSkillsArray
    }
    else {
        console.log('Where the Sidewalk Ends - Have you Completed Your Conditional in AutoComplete for this list/input?');
    }
    // close any other array lists
    closeAllLists(event.target);
    currentFocus = -1;
    let masterDiv = document.createElement("div");
    let filterDiv;
    masterDiv.setAttribute("id", this.id + "autocomplete-list");
    masterDiv.setAttribute("class", "autocomplete-items");
    // append the DIV element as a child of the autocomplete container:
    this.parentNode.appendChild(masterDiv);
    // this will make the filtered Array for the DDL
    // let filterDiv = ''
    let matchArray = [];
    let inputValue = event.target.value
    arrayInput.forEach(arrItem => {
        if(arrItem.substr(0, inputValue.length).toLowerCase() == inputValue.toLowerCase()) {
            filterDiv = document.createElement("div");
            filterDiv.setAttribute("class", "item");
            /*make the matching letters bold:*/
            filterDiv.innerHTML = "<strong>" + arrItem.substr(0, inputValue.length) + "</strong>";
            filterDiv.innerHTML += arrItem.substr(inputValue.length);
            /*insert a input field that will hold the current array item's value:*/
            filterDiv.innerHTML += "<input type='hidden' value='" + arrItem + "'>";
            /*execute a function when someone clicks on the item value (div element):*/
            filterDiv.addEventListener("click", function (e) {
                // insert the value for the autocomplete text field:
                this.parentNode.previousSibling.previousSibling.value = this.getElementsByTagName("input")[0].value;
                // close the list of autocompleted values, (or any other open lists of autocompleted values:
                closeAllLists();
            });
            masterDiv.appendChild(filterDiv);  
        matchArray.push(arrItem)
        }
    })
    if(!matchArray.length){
        matchArray.push("No Results Found")
    }
    this.addEventListener("keydown", function (event) {
        var dropDownList = document.getElementById(this.id + "autocomplete-list");
        if (dropDownList){ dropDownList = dropDownList.getElementsByTagName("div") };
        if (event.keyCode == 40) {
            /*If the arrow DOWN key is pressed, increase the currentFocus variable:*/
            currentFocus += 1;
            /*and and make the current item more visible:*/
            addActive(dropDownList);
        } else if (event.keyCode == 38) { //up
            /*If the arrow UP key is pressed, decrease the currentFocus variable:*/
            currentFocus -= 1;
            /* and and make the current item more visible:*/
            addActive(dropDownList);
        } else if (event.keyCode == 13) {
            /*If the ENTER key is pressed, prevent the form from being submitted,*/
            event.preventDefault();
            if (currentFocus > -1) {
                /*and simulate a click on the "active" item:*/
                if(dropDownList){ dropDownList[currentFocus].click() };
            }
        }
    });
    function addActive(ddl){
        /*a function to classify an item as "active":*/
        if (!ddl){ return false };
        /*start by removing the "active" class on all items:*/
        removeActive(ddl);
        if (currentFocus >= ddl.length) currentFocus = 0;
        if (currentFocus < 0) currentFocus = (ddl.length - 1);
        /*add class "autocomplete-active":*/
        ddl[currentFocus].classList.add("active");
    }

    function removeActive(ddl){
        /*a function to remove the "active" class from all autocomplete items:*/
        for (var i = 0; i < ddl.length; i += 1) {
            ddl[i].classList.remove("active");
        }
    }
    
    function closeAllLists(htmlTag){
        // console.log(item);
        /*close all autocomplete lists in the document, except the one passed as an argument:*/
        let arrayItems = document.getElementsByClassName("autocomplete-items");
        for (let i = 0; i < arrayItems.length; i += 1) {
            if (htmlTag !== arrayItems[i] && htmlTag !== this) {
                arrayItems[i].parentNode.removeChild(arrayItems[i]);
            }
        }
    }
    
    document.addEventListener("click", function (event) {
        closeAllLists(event.target);
    });
}

function updateSidebarNameTitle(){
    const sidebarDeveloperName = document.getElementById('sidebarDeveloperName');
    const sidebarDeveloperTitle = document.getElementById('sidebarDeveloperTitle');
    if(Store.currentUser.username.length > 0){
        sidebarDeveloperName.innerText = Store.currentUser.username;
    }
    if(Store.currentUser.title.length > 0){
        sidebarDeveloperTitle.innerText = Store.currentUser.title;
    }
}

export const data = {
    getAllUsers,
    getCurrentUser,
    getAllProfileStatistics,
    getAllLessons,
    getAllInterviewQuestions,
    getAllAnswersToQuestions,
    getArrayOfAvatars,
    getArrayOfAllStates
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
    parseJwt,
    // edit Profile
    getAgeEditProfile,
    returnArrayOfApplicableItems,
    deleteItemFromArray,
    checkFullScreen,
    navigateToPage,
    setTitle,
    showModal,
    getConcatenatedLocationString,
    getBoolIfUserAttending,
    textAreaCharCounter,
    setWindowOffsetsLayout,
    setWindowOffsetsMobile,
    autoComplete,
    updateSidebarNameTitle
};
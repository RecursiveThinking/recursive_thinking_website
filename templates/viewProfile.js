import {
    importTemplate,
    templates,
    fill
} from '../scripts/templater'
import {
    utils,
    data
} from '../scripts/global';

import viewProfileHtml from './viewProfile.html'
importTemplate("viewProfile", viewProfileHtml)

export function setup(renderFunction) {
    renderFunction(
        fill(templates.viewProfile.page, getViewProfileModel())
    );
};


// userSchema = {
//     username: - String - uuid for each user due to cognito
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
//     rank: Number - Rank in RT (white belt, green belt, black)etc... for mentor/project pairing,
//     skillsProfessional: Array<Strings> -  should be array of text skills, (users pick from a wide variety we curate from dropdown)
//     skillsSoftware:  Array<Strings> -  should be array of text skills, (users pick from a wide variety we curate from dropdown)
//     skillsLanguages: Array<Strings> -  should be array of text skills, (users pick from a wide variety we curate from dropdown)
//     lessonsAttending:  Array<Strings> - array of ids of lessons dev is planning to attend
// }

const viewProfileUser = {
    username: 'PorgDev1',
    picture: '../public/images/avatar1.png',
    name: 'Porg Dev1',
    created: new Date('01/01/2018').toString(),
    birthday: new Date('01/01/1990').toString(),
    city: 'Seattle',
    state: 'WA',
    title: 'UX Designer',
    employer: 'Amazon',
    github: 'https://github.com/',
    codepen: 'https://codepen.io/',
    linkedin: 'https://linkedin.com/in/',
    website: 'https://google.com/',
    resume: '',
    bio: 'Hello, I am Porg Dev 1! I am an innovative and passionate user experience designer with a broad portfolio of product design solutions. I utilize creative, motivational and technical communication skills to facilitate team cohesiveness and efficiently achieve objectives. My passion for learning and professional develpment has led to an immersion in programming, UX design, UI design, graphic design, motion graphics and animation.',
    experience: '3',
    rank: 'Black Belt',
    skillsProfessional: ['User Experience Design', 'User Research', 'Information Architecture', 'Visual Design'],
    skillsSoftware: ['Sketch', 'Balsamiq', 'OmniGraffle', 'Axure'],
    skillsLanguages: ['HTML', 'CSS', 'JavaScript', 'Python', 'C#'],
    lessonsAttending: ['1000000001', '1000000002']
}

export const getViewProfileModel = () => {

    // #TODO: API Call goes here
    // const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    // console.log(currentUser);

    const viewProfileUserAge = Math.floor((Date.now() - Date.parse(viewProfileUser.birthday)) / (24 * 3600 * 365.25 * 1000));

    // Still missing "time with recursive thinking" as a userSchema

    return {
        mainProfile: fill(templates.viewProfile.mainProfile, {
            imageAttributes: {
                src: viewProfileUser.picture
            },
            name: viewProfileUser.name,
            title: viewProfileUser.title,
            age: viewProfileUserAge,
            city: viewProfileUser.city,
            state: viewProfileUser.state,
            employer: viewProfileUser.employer,
            profileLinks: fill(templates.viewProfile.profileLinks, {
                github: {
                    href: viewProfileUser.github
                },
                codepen: {
                    href: viewProfileUser.codepen
                },
                linkedin: {
                    href: viewProfileUser.linkedin
                },
                website: {
                    href: viewProfileUser.website
                }
            })
        }),
        aboutProfile: fill(templates.viewProfile.aboutProfile, {
            bio: viewProfileUser.bio,
            experience: viewProfileUser.experience
        }),
        skillsProfessional: fill(templates.viewProfile.skills, {
            skillType: 'Professional Skills',
            skill: viewProfileUser.skillsProfessional.map((skill) => {
                return fill(templates.viewProfile.skill, {
                    skill
                })
            })
        }),
        skillsSoftware: fill(templates.viewProfile.skills, {
            skillType: 'Software Skills',
            skill: viewProfileUser.skillsSoftware.map((skill) => {
                return fill(templates.viewProfile.skill, {
                    skill
                })
            })
        }),
        skillsLanguages: fill(templates.viewProfile.skills, {
            skillType: 'Languages',
            skill: viewProfileUser.skillsLanguages.map((skill) => {
                return fill(templates.viewProfile.skill, {
                    skill
                })
            })
        })
    }
}
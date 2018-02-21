import { utils, data } from '../scripts/global';
import { templates, fill } from '../scripts/templater';

export const getEditProfileModel = () => {
    
    // #TODO: API Call goes here
    // const allInterviewQuestions = JSON.parse(localStorage.getItem('allInterviewQuestions'));
    console.log("In Edit Profile Model");
    const currentUser = data.getCurrentUser();
    console.log(currentUser);
    
    
    return {
        editProfile: fill(templates.editProfile.currentUserProfile, {
            // basic stats
            profileBasicValImgAttrs: {
                src: `${currentUser['image']}`,
                alt: `A profile picture of ${currentUser['name']}`
            },
            profileBasicValName: { value: `${currentUser['name']}` },
            profileBasicValAge: {},
            profileBasicValLocation: { value: `${currentUser['location']}`},
            // professional stats
            profileProfValJobTitle: { value: `${currentUser['title']}`},
            profileProfValEmployer: { value: `${currentUser['employer']}`},
            // links
            profileLinkGitHub: { value: `${currentUser['linkGitHub']}`},
            profileLinkCodePen: { value: `${currentUser['linkCodePen']}`},
            profileLinkLinkedIn: { value: `${currentUser['linkLinkedIn']}`},
            profileLinkPortfolio: { value: `${currentUser['linkPortfolio']}`},
            profileLinkResume: { value: `${currentUser['linkResume']}`},
            // about
            profileAboutUser: { value: `${currentUser['aboutUser']}`},
            profileAboutUserYearsOfExperience: { value: `${currentUser['aboutUserYearsOfExperience']}`},
            profileAboutUserTimeWithRTYear: {},
            profileAboutUserTimeWithRTMonth: {},
            // professional skills
        })
    }
};
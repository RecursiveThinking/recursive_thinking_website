import { utils, data } from '../scripts/global';
import { templates, fill } from '../scripts/templater';

export const getEditProfileModel = () => {
    
    // #TODO: API Call goes here
    // const allInterviewQuestions = JSON.parse(localStorage.getItem('allInterviewQuestions'));
    console.log("In Edit Profile Model");
    const currentUser = data.getCurrentUser();
    console.log(currentUser);
    
    let age = utils.getAgeEditProfile(new Date(currentUser.birthday));
    // let age = new Date(currentUser.birthday);
    // console.log(age);
    let skillsProfessionalArray = utils.returnArrayOfApplicableItems('skillsProfessional', currentUser.skillsProfessional);
    let skillsSoftwareArray = utils.returnArrayOfApplicableItems('skillsSoftware', currentUser.skillsSoftware);
    let skillsLanguageArray = utils.returnArrayOfApplicableItems('skillsLanguage', currentUser.skillsLanguages);
    let aboutUser = currentUser['aboutUser'];
    console.log(aboutUser);
    return {
        editProfile: fill(templates.editProfile.currentUserProfile, {
            // basic stats
            profileBasicValImgAttrs: {
                src: `${currentUser['image']}`,
                alt: `A profile picture of ${currentUser['name']}`
            },
            profileBasicValName: { value: `${currentUser['name']}` },
            profileBasicValAge: { value: age },
            // profileBasicValLocation: { value: `${currentUser['location']}`},
            profileBasicValLocation: { value: utils.getConcatenatedLocationString(currentUser.city, currentUser.state)},
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
            // profileAboutUser: currentUser.aboutUser,
            profileAboutUser: currentUser['aboutUser'],
            // profileAboutUser: { value: `${currentUser['aboutUser']}`},
            profileAboutUserYearsOfExperience: { value: `${currentUser['aboutUserYearsOfExperience']}`},
            profileAboutUserTimeWithRTYear: {},
            profileAboutUserTimeWithRTMonth: {},
            // professional skills
            profileSkillProfessional: skillsProfessionalArray.map((skillProfessional, index) => {
                // let deleteItem = utils.deleteItemFromArray(index);
                return fill(templates.editProfile.currentUserSkillProfessional, {
                skillItemProf: skillProfessional,
                // delSkillItemProf: { onclick: "deleteItemFromArray(index)"}
                // delSkillItemProf: { onclick: "deleteItem(index)"}
                delSkillItemProf: { onclick: ""}
                })
            }),
            
            profileSkillSoftware: skillsSoftwareArray.map((skillSoftware) => fill(templates.editProfile.currentUserSkillSoftware, {
                skillItemSoft: skillSoftware
            })),
            profileSkillLanguage: skillsLanguageArray.map((skillLanguage) => fill(templates.editProfile.currentUserSkillLanguage, {
                skillItemLang: skillLanguage
            }))
        })
    }
};
import { importTemplate, templates, fill } from '../scripts/templater'
import { utils, data } from '../scripts/global';

import editProfileHtml from './editProfile.html'
importTemplate("editProfile", editProfileHtml)

export function setup(renderFunction) {
    renderFunction(
        fill(templates.editProfile.page, getEditProfileModel())
    );

    editProfile();
    editProfilePicture();
};

export const getEditProfileModel = () => {
    
    // #TODO: API Call goes here
    // const allInterviewQuestions = JSON.parse(localStorage.getItem('allInterviewQuestions'));
    // console.log("In Edit Profile Model");
    const currentUser = data.getCurrentUser();
    // console.log(currentUser);
    
    let age = utils.getAgeEditProfile(new Date(currentUser.birthday));
    // let age = new Date(currentUser.birthday);
    // console.log(age);
    let skillsProfessionalArray = utils.returnArrayOfApplicableItems('skillsProfessional', currentUser.skillsProfessional);
    let skillsSoftwareArray = utils.returnArrayOfApplicableItems('skillsSoftware', currentUser.skillsSoftware);
    let skillsLanguageArray = utils.returnArrayOfApplicableItems('skillsLanguage', currentUser.skillsLanguages);
    let aboutUser = currentUser['aboutUser'];
    // console.log(aboutUser);
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
            // profileBasicValLocation: { value: utils.getConcatenatedLocationString(currentUser.city, currentUser.state)},
            profileBasicValCity: { value: `${currentUser['city']}` },
            profileBasicValState: { value: `${currentUser['state']}` },
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

export const editProfile = () => {
    utils.textAreaCharCounter('bio', 'counter', 500);
};

export const editProfilePicture = () => {
    const editProfilePicButton = document.getElementById("profile-picture");
    const profilePicture = document.getElementsByClassName("avatarPicXL")[0];
    const fileInput = document.getElementById('file');
    const sidebarImage = document.getElementsByClassName('sidebarImage')[0];
  
    const preventDefaults = (e) => {
      e.preventDefault()
      e.stopPropagation()
    };
  
    const drop = (event) => {
      var fileList = event.dataTransfer.files;
      renderImage(fileList[0]);
    };
  
    const renderImage = (file) => {
      const reader = new FileReader();
  
      reader.onload = function(event) {
        const imageUrl = event.target.result;
        sidebarImage.setAttribute('src', imageUrl)
        profilePicture.setAttribute('src', imageUrl);
      }
  
      reader.readAsDataURL(file);
    };
  
    // TODO: Set up backend service for setting profile picture
    const uploadFile = (file) => {
      const url = 'where we are sending the picture';
      let formData = new FormData();
      let headers = new Headers({
              "Content-Type": "multipart/form-data",
              "X-File-Name": file.name,
            "X-File-Size": file.size,
            "X-File-Type": file.type
          });
  
      formData.append('file', file);
  
      fetch(url, {
        method: 'POST',
        body: formData,
        headers: headers
      })
      .then(() => { console.log("success!"); })
      .catch(() => { console.error("Could not upload file..."); });
    };
  
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
      editProfilePicButton.addEventListener(eventName, preventDefaults, false)
    });
  
    editProfilePicButton.addEventListener("drop", drop, false);
    fileInput.addEventListener('change', function(event) {
       renderImage(this.files[0]);
       uploadFile(this.files[0]);
    }, false);
  }
  
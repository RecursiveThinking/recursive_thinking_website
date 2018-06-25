import {
    importTemplate,
    templates,
    fill
} from '../../templater'
import {
    utils,
    data,
    allSkillsProfessionalObj,
    allSkillsSoftwareObj,
    allProgrammingLanguagesObj
} from '../../global';
import {
    Store
} from '../../store.js';
import serverApi from '../../serverApi.js';

import editProfileHtml from './editProfile.html'
importTemplate("editProfile", editProfileHtml)

export function setup(renderFunction) {
    renderFunction(
        fill(templates.editProfile.page, getEditProfileModel())
    );

    editProfile();
    editProfilePicture();
};

async function submitProfileChangeFunc() {
    Store.updatedUser = JSON.parse(JSON.stringify(Store.currentUser));
    let updatedUserAttributes = document.querySelectorAll("[name]");

    updatedUserAttributes = Array.from(updatedUserAttributes);

    updatedUserAttributes = updatedUserAttributes.filter((item) => {
        return item.name !== 'viewport' && item.name !== 'skillsProfessional' && item.name !== 'skillsSoftware' && item.name !== 'skillsLanguage';
    });

    // Updating the currentUser in the store - to send to the backend DB
    for(let i = 0; i < updatedUserAttributes.length; i++){
        let key = updatedUserAttributes[i].name;
        let currentValue = Store.currentUser[key];
        let updatedValue = updatedUserAttributes[i].value;
        // console.log('Key: ', key, 'Current Value: ', currentValue, 'Updated Value: ', updatedValue);

        if(key === 'github' || key === 'codepen' || key === 'linkedin' || key === 'portfolioWebsite'){
            if(validateUrls(updatedValue)){
                updateValue(key, updatedValue);
                continue;
            }
            console.log(key, ' url is invalid');
            continue;
        }
        if(updatedValue !== currentValue && typeof currentValue === 'string'){
            updateValue(key, updatedValue);
        }
    }

    console.log('Current User: ', Store.currentUser, 'Updated User', Store.updatedUser);

    let response = await serverApi.postEditProfile();
    if(response['Item']){
        Store.updateUser(response['Item']);
    }
    Store.clearUpdatedUser();
}

function validateUrls(url){
    let validator = new RegExp('(http[s]?:\/\/)?[^\s(["<,>]*\.[^\s[",><]*');
    return validator.test(url);
}

function updateValue(key, value){
    Store.updatedUser[key] = value;
}

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
        // SubmitProfileChanges
        submitProfileChange: {
            onclick: submitProfileChangeFunc
        },
        editProfile: fill(templates.editProfile.currentUserProfile, {
            // basic stats
            profileBasicValImgAttrs: {
                src: `${currentUser['image']}`,
                alt: `A profile picture of ${currentUser['name']}`
            },
            profileBasicValName: {
                value: `${Store.currentUser.name}`
            },
            profileBasicValCity: {
                value: `${Store.currentUser.city}`
            },
            profileBasicValState: {
                value: `${Store.currentUser.state}`
            },
            // professional stats
            profileProfValJobTitle: {
                value: `${Store.currentUser.title}`
            },
            profileProfValEmployer: {
                value: `${Store.currentUser.employer}`
            },
            // links
           github: {
                value: `${Store.currentUser.github}`
            },
            codepen: {
                value: `${Store.currentUser.codepen}`
            },
            linkedin: {
                value: `${Store.currentUser.linkedin}`
            },
            portfolioWebsite: {
                value: `${Store.currentUser.portfolioWebsite}`
            },
            profileLinkResume: {
                value: `${Store.currentUser.resume}`
            },
            // about
            bio: {
                value: `${Store.currentUser.bio}`
            },
            // Store.currentUser.bio,
            profileAboutUserYearsOfExperience: {
                value: `${Store.currentUser.experience}`
            },
            profileAboutUserTimeWithRTYear: {},
            profileAboutUserTimeWithRTMonth: {},
            // professional skills
            profileSkillProfessional: skillsProfessionalArray.map((skillProfessional, index) => {
                // let deleteItem = utils.deleteItemFromArray(index);
                return fill(templates.editProfile.currentUserSkillProfessional, {
                    skillItemProf: skillProfessional,
                    // delSkillItemProf: { onclick: "deleteItemFromArray(index)"}
                    // delSkillItemProf: { onclick: "deleteItem(index)"}
                    delSkillItemProf: {
                        onclick: ""
                    }
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

        reader.onload = function (event) {
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
            .then(() => {
                console.log("success!");
            })
            .catch(() => {
                console.error("Could not upload file...");
            });
    };

    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        editProfilePicButton.addEventListener(eventName, preventDefaults, false)
    });

    editProfilePicButton.addEventListener("drop", drop, false);
    fileInput.addEventListener('change', function (event) {
        renderImage(this.files[0]);
        uploadFile(this.files[0]);
    }, false);
}
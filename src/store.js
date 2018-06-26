// need to add created and updated to postDeveloperById and postDeveloperByIdEdit
export const Store = {
    currentUserCognitoId: {},
    currentUser: {
        userId: '',
        username: '',
        picture: '',
        name: '',
        created: '',
        updated: '',
        city: '',
        state: '',
        title: '',
        employer: '',
        github: '',
        codepen: '',
        linkedin: '',
        portfolioWebsite: '',
        resume: '',
        bio: '',
        experience: '',
        timeWithRT: '',
        rank: '',
        skillsProfessional: {},
        skillsSoftware: {},
        skillsLanguages: {},
        lessonsAttending: []
    },
    updatedUser: {
        userId: '',
        username: '',
        picture: '',
        name: '',
        created: '',
        updated: '',
        city: '',
        state: '',
        title: '',
        employer: '',
        github: '',
        codepen: '',
        linkedin: '',
        portfolioWebsite: '',
        resume: '',
        bio: '',
        experience: '',
        timeWithRT: '',
        rank: '',
        skillsProfessional: {},
        skillsSoftware: {},
        skillsLanguages: {},
        lessonsAttending: []
    },
    developers: {},
    lessons: {},
    updateUser: function (userInfo) {
        let keys = Object.keys(userInfo);
        keys.forEach((key) => {
            this.currentUser[key] = userInfo[key];
        });
        console.log(this.currentUser);
    },
    clearUpdatedUser: function(){
        this.updatedUser = getDefaultUser();
        console.log(this);
    },
    updateCurrentUserCognitoId: function (userCreds) {
        this.currentUserCognitoId = userCreds;
    },
    updateDevelopers: function (developers) {
        this.developers = developers;
    },
    updateLessons: function (lessons){
        lessons.forEach((lesson) => {
            this.lessons[lesson.Id] = lesson;
        });
        console.log(this.lessons);
    }
}

function getDefaultUser(){
    const newUser = {
        userId: '',
        username: '',
        picture: '',
        name: '',
        created: '',
        updated: '',
        city: '',
        state: '',
        title: '',
        employer: '',
        github: '',
        codepen: '',
        linkedin: '',
        portfolioWebsite: '',
        resume: '',
        bio: '',
        experience: '',
        timeWithRT: '',
        rank: '',
        skillsProfessional: {},
        skillsSoftware: {},
        skillsLanguages: {},
        lessonsAttending: []
    };
    return newUser;
}
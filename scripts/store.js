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
    developers: {},
    lessons: {},
    updateUser: function (user) {
        let keys = Object.keys(user);
        keys.forEach((key) => {
            this.currentUser[key] = user[key];
        })
        console.log(this.currentUser);
    },
    updateCurrentUserCognitoId: function (userCreds) {
        this.currentUserCognitoId = userCreds;
    },
    updateDevelopers: function (developers) {
        this.developers = developers;
    }
}
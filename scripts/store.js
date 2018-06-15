export const Store = {
    currentUserCognitoId: {},
    currentUser: {
        userId: '',
        username: '',
        picture: '',
        name: '',
        created: '',
        birthday: '',
        city: '',
        state: '',
        title: '',
        employer: '',
        github: '',
        codepen: '',
        linkedin: '',
        website: '',
        resume: '',
        bio: '',
        experience: '',
        rank: '',
        skillsProfessional: '',
        skillsSoftware: '',
        skillsLanguages: '',
        lessonsAttending: ''
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
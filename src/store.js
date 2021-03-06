// need to add created and updated to postDeveloperById and postDeveloperByIdEdit
export const Store = {
    currentUserCognitoId: {},
    currentUser: getDefaultUser(),
    updatedUser: getDefaultUser(),
    developers: {},
    lessons: {},
    updateUser: function (userInfo) {
        let keys = Object.keys(userInfo);
        keys.forEach((key) => {
            if(typeof userInfo[key] === "undefined" || userInfo[key] == null || userInfo[key] == " "){
                this.currentUser[key] = "";
            }
            else{
                this.currentUser[key] = userInfo[key];
            }
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
        picture: '../images/avatar_default.png',
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
        profileStatsVisits: 0,
        profileStatsViewGithub: 0,
        profileStatsViewCodePen: 0,
        profileStatsViewPortfolio: 0,
        profileStatsViewLinkedIn: 0,
        profileStatsViewResume: 0,
        experience: '',
        timeWithRT: '',
        rank: '',
        skillsProfessional: [],
        skillsSoftware: [],
        skillsLanguages: [],
        lessonsAttending: []
    };
    return newUser;
}
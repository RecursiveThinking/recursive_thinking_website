export const Store = {
    currentUserCognitoId:{},
    currentUser: {
        name: "Seth",
        occupation: "developer"
    },
    developers: {},
    lessons: {},
    updateUser: function(user){
        this.currentUser = user;
    },
    updateCurrentUserCognitoId: function(userCreds){
        this.currentUserCognitoId = userCreds;
    },
    updateDevelopers: function(developers){
        this.developers = developers;
    }
}
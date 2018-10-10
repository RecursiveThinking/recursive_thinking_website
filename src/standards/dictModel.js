const dictModel = {
  user: {
    userId: 'userId',
    username: 'username',
    avatar: 'avatar',
    name: 'name',
    email: 'email',
    city: 'city',
    state: 'state', 
    title: 'title',
    employer: 'employer',
    linkGithub: 'linkGithub',
    linkCodepen: 'linkCodepen',
    linkLinkedIn: 'linkLinkedIn',
    linkPortfolioWebsite: 'linkPortfolioWebsite',
    linkResume: 'linkResume',
    bio: 'bio',
    profileStatsVisits: 'profileStatsVisits',
    profileStatsViewsGithub: 'profileStatsViewsGithub',
    profileStatsViewsCodePen: 'profileStatsViewsCodePen',
    profileStatsViewsPortfolio: 'profileStatsViewsPortfolio',
    profileStatsViewsLinkedIn: 'profileStatsViewsLinkedIn',
    profileStatsViewsResume: 'profileStatsViewsResume',
    experience: 'experience',
    timeWithRT: 'timeWithRT',
    rank: 'rank',
    skillsProfessional: 'skillsProfessional',
    skillsSoftware: 'skillsSoftware',
    skillsLanguages: 'skillsLanguages',
    lessonStatus: 'lessonStatus',
    admin: 'admin',
    inactive: 'inactive',
    isProfileSetup: 'isProfileSetup',
    lastActive: 'lastActive',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  },
  lesson: {
    Id: 'Id',
    title: 'title',
    date: 'date',
    description: 'description',
    lessonTaughtBy: 'lessonTaughtBy',
    lessonAttendees: 'lessonAttendees',
    lessonVotes: 'lessonVotes',
    scheduled: 'scheduled',
    _lessonCreatedBy: '_lessonCreatedBy',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  },
  intQuestion: {
    Id: 'Id',
    title: 'title',
    description: 'description',
    categories: 'categories',
    answersToQuestion: 'answersToQuestion',
    _createdByUser: '_createdByUser',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  },
  intQuestionAnswer: {
    Id: 'Id',
    title: 'title',
    description: 'description',
    _createdByUser: '_createdByUser',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  }
}

export default dictModel
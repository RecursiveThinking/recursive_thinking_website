import v1 from 'uuid/v1'

const empty = ' ';
const viewDefaultVal = 0
export class CogUser {
  constructor(userId, username, name, email){
    this.userId = userId;
    this.username = username;
    this.name = name;
    this.email = email;
  }
}

// export class RegUser extends CogUser {
export class User extends CogUser{
  constructor({userId, username, name, email}){
    super(userId, username, name, email)
    this.avatar = 'avatar_default.png';
    this.city = empty;
    this.state = empty;
    this.title = empty;
    this.employer = empty;
    this.linkGithub = empty;
    this.linkCodepen = empty;
    this.linkLinkedIn = empty;
    this.linkPortfolioWebsite = empty;
    this.linkResume = empty;
    this.bio = empty;
    this.profileStatsVisits = viewDefaultVal;
    this.profileStatsViewsGithub = viewDefaultVal;
    this.profileStatsViewsCodePen = viewDefaultVal;
    this.profileStatsViewsPortfolio = viewDefaultVal;
    this.profileStatsViewsLinkedIn = viewDefaultVal;
    this.profileStatsViewsResume = viewDefaultVal;
    this.experience = empty;
    this.timeWithRT = new Date().toString();
    this.rank = empty;
    this.skillsProfessional = [];
    this.skillsSoftware = [];
    this.skillsLanguages = [];
    this.lessonStatus = {};
    this.admin = false;
    this.inactive = false;
    this.isProfileSetup = false;
    this.lastLogin = new Date().toString();
    this.lastLogout = new Date().toString();
    this.createdAt = new Date().toString();
    this.updatedAt = new Date().toString();
  }
}

export class Lesson {
  constructor(title, description, lessonTaughtBy, currentUserId){
    this.Id = v1();
    this.title = title;
    this.date = empty;
    this.description = description;
    this.lessonTaughtBy = lessonTaughtBy;
    this.lessonAttendees = [];
    this.lessonVotes = [];
    this.scheduled = false;
    this._lessonCreatedBy = currentUserId;
    this.createdAt = new Date().toString();
    this.updatedAt = new Date().toString();
  }
}

export class InterviewQuestion {
  constructor(title, description, intQuestCategories, currentUserId){
    this.Id = v1();
    this.title = title;
    this.description = description;
    this.categories = intQuestCategories;
    this.answersToQuestion = [];
    this.upVotes = [];
    this.downVotes = [];
    this._createdByUser = currentUserId;
    this.createdAt = new Date().toString();
    this.updatedAt = new Date().toString();
  }
}

export class InterviewQuestionAnswer {
  constructor(description, currentUserId){
    this.Id = v1();
    // this.title = title;
    this.description = description;
    this.upVotes = [];
    this.downVotes = [];
    this._createdByUser = currentUserId;
    this.createdAt = new Date().toString();
    this.updatedAt = new Date().toString();
  }
}

export class SkillOrCategory {
  constructor(tag, currentUserId){
    console.log('tag @ model: ', tag, currentUserId)
    // this.Id = v1();
    this.id = v1();
    this.name = tag.name;
    this._usersWithSkill = [];
    this._interviewquestionsWithCategory = [];
    this._createdByUser = currentUserId;
    this.createdAt = new Date().toString();
    this.updatedAt = new Date().toString();
  }
}

export class HomeScreenQuote {
  
}
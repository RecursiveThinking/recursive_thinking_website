import v1 from 'uuid/v1'

const empty = ' ';

export class CogUser {
  constructor(userId, username, name, email){
    this.userId = userId;
    this.username = username;
    this.name = name;
    this.email = email;
  }
}

// export class RegUser extends CogUser {
export class User {
  constructor(userId, username, name, email){
  // constructor(){
    // super();
    // this.userId = super.userId;
    // this.username = super.username;
    // this.name = super.name;
    // this.email = super.email;
    this.userId = userId;
    this.username = username;
    this.name = name;
    this.email = email;
    this.avatar = empty;
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
    this.profileStatsVisits = empty;
    this.profileStatsViewsGithub = empty;
    this.profileStatsViewsCodePen = empty;
    this.profileStatsViewsPortfolio = empty;
    this.profileStatsViewsLinkedIn = empty;
    this.profileStatsViewsResume = empty;
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
  constructor(title, description, currentUserId){
    this.Id = v1();
    this.title = title;
    this.date = empty;
    this.description = description;
    this.lessonTaughtBy = [];
    this.lessonAttendees = [];
    this.lessonVotes = [];
    this.scheduled = false;
    this._lessonCreatedBy = currentUserId;
    this.createdAt = new Date().toString();
    this.updatedAt = new Date().toString();
  }
}

export class InterviewQuestion {
  constructor(title, description, categories, currentUserId){
    this.Id = v1();
    this.title = title;
    this.description = description;
    this.categories = categories;
    this.answersToQuestion = [];
    this._createByUser = currentUserId;
    this.createdAt = new Date().toString();
    this.updatedAt = new Date().toString();
  }
}

export class InterviewQuestionAnswer {
  constructor(title, description, currentUserId){
    this.Id = v1();
    this.title = title;
    this.description = description;
    this._createByUser = currentUserId;
    this.createdAt = new Date().toString();
    this.updatedAt = new Date().toString();
  }
}

export class ProfileSkill {
  constructor(name, currentUserId){
    this.Id = v1();
    this.name = name;
    this._usersWithSkill = Array.from(currentUserId);
    this._createByUser = currentUserId;
    this.createdAt = new Date().toString();
    this.updatedAt = new Date().toString();
  }
}

export class HomeScreenQuote {
  
}
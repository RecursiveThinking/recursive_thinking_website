import React from 'react'

import AdminPanelListItem from './adminPanelListItem'
import DM from '../../standards/dictModel'

export const TABLE_NAMES = {
  users: 'users',
  lessons: 'lessons',
  interviewQuestions: 'interviewQuestions',
  interviewQuestionAnswers: 'interviewQuestionAnswers'
}

const adminPanelList = ({...props}) => {
  const { users, lessons, interviewQuestions, interviewQuestionAnswers } = DM
  const tableTitle = [ 
    'User Admin Table',
    'Lesson Admin Table',
    'Interview Questions Admin Table',
    'Interview Questions Answers Admin Table'
  ]
  const { 
    user: { username, name, email, admin, inactive, isProfileSetup, lastActive},
    lesson: { title, scheduled, lessonVotes, _lessonCreatedBy},
    intQuestion,
    intQuestionAnswer
  } = DM
  const userTableHeadings = [
    username,
    name,
    email,
    admin,
    inactive,
    isProfileSetup,
    lastActive
  ]
  
  const lessonTableHeadings = [
    title,
    scheduled,
    lessonVotes,
    _lessonCreatedBy,
  ]
  
  const interviewQuestionsTableHeadings = [
    intQuestion.title,
    intQuestion._createdByUser
  ]
  
  const interviewQuestionsAnswersTableHeadings = [
    intQuestionAnswer.title,
    intQuestionAnswer._createdByUser
  ]
  
  return (
    <ul>
      <li key={TABLE_NAMES[users]} className="grid grid--full">
        <AdminPanelListItem 
          title={tableTitle[0]} 
          table={'users'} 
          tableHeadingArr={userTableHeadings} 
          tableBodyArr={props.allUsers} 
        />
      </li>
      <li key={TABLE_NAMES[lessons]} className="grid grid--full">
        <AdminPanelListItem 
          title={tableTitle[1]} 
          table={'lessons'} 
          tableHeadingArr={lessonTableHeadings} 
          tableBodyArr={props.allLessons}
          lookupTableAllUsers={props.lookupTableAllUsers}
        />
      </li>
      <li key={TABLE_NAMES[interviewQuestions]} className="grid grid--full">
        <AdminPanelListItem 
          title={tableTitle[2]} 
          table={'interviewQuestions'}
          tableHeadingArr={interviewQuestionsTableHeadings} 
          tableBodyArr={props.allInterviewQuestions}
        />
      </li>
      <li key={TABLE_NAMES[interviewQuestionAnswers]} className="grid grid--full">
        <AdminPanelListItem
          title={tableTitle[3]}
          table={'interviewQuestionsAnswers'}
          tableHeadingArr={interviewQuestionsAnswersTableHeadings} 
          tableBodyArr={props.allInterviewQuestionAnswers}
        />
      </li>
    </ul>
  )
}

export default adminPanelList;
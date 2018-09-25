import React from 'react'

import AdminPanelListItem from './adminPanelListItem'
import DM from '../../standards/dictModel'

const adminPanelList = ({...props}) => {
  const tableTitle = [ 
    'User Admin Table',
    'Lesson Admin Table',
    'Interview Questions Admin Table',
    'Interview Questions Answers Admin Table'
  ]
  const userTableHeadings = [
    DM.user.name,
    DM.user.username,
    DM.user.email,
    DM.user.admin,
    DM.user.inactive,
    DM.user.isProfileSetup,
    DM.user.lastActive
  ]
  
  const lessonTableHeadings = [
    DM.lesson.title,
    DM.lesson.scheduled,
    DM.lesson.lessonVotes,
    DM.lesson._lessonCreatedBy,
  ]
  
  const interviewQuestionsTableHeadings = [
    DM.intQuestion.title,
    DM.intQuestion._createdByUser
  ]
  
  const interviewQuestionsAnswersTableHeadings = [
    DM.intQuestionAnswer.title,
    DM.intQuestionAnswer._createdByUser
  ]
  
  return (
    <ul>
      <AdminPanelListItem 
        title={tableTitle[0]} 
        table={'users'} 
        tableHeadingArr={userTableHeadings} 
        tableBodyArr={props.allUsers} 
      />
      <AdminPanelListItem 
        title={tableTitle[1]} 
        table={'lessons'} 
        tableHeadingArr={lessonTableHeadings} 
        tableBodyArr={props.allLessons}
        lookupTableUsers={props.lookupTableUsers}
      />
      <AdminPanelListItem 
        title={tableTitle[2]} 
        table={'interviewQuestions'}
        tableHeadingArr={interviewQuestionsTableHeadings} 
        tableBodyArr={props.allInterviewQuestions}
      />
      <AdminPanelListItem
        title={tableTitle[3]}
        table={'interviewQuestionsAnswers'}
        tableHeadingArr={interviewQuestionsAnswersTableHeadings} 
        tableBodyArr={props.allInterviewQuestionsAnswers}
      />
    </ul>
    

  )
}

export default adminPanelList;
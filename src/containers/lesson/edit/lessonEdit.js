import React, { Component } from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { getLessonById, editLessonById, fetchUsers } from '../../../actions'
import { FETCHING } from '../../../actions/action_types'

import DefaultLoadingPage from '../../../components/defaults/loadingPage/loadingPage';
import DefaultMessage from '../../../components/defaults/defaultMessage/defaultMessage';
import { DEFAULT_MESSAGE_LESSON_BY_ID_ITEM_NOT_FOUND } from '../../../components/defaults/defaultMessage/defaultMessageContent/defaultMessageContent'

import { FORM_HEADING_LESSON_EDIT } from '../../../components/forms/formContent/formContent'
import LessonForm from '../../../components/forms/form_lesson'

import { ROUTES_REACT } from '../../../standards/routes'

class LessonEdit extends Component {
  
  componentDidMount(){
    console.log('CDM @ lessonEdit: ', this.props.match.params.id)
    this.props.getLessonById(this.props.match.params.id)
  }
  
  onSubmit = (formValues, addToTaughtByUsers, localTaughtByUsersArray) => {
    console.log('formVals @ Lesson Edit', formValues)
    let edittedLesson = { ...this.props.lessonById };
    edittedLesson.title = formValues.lessonTitle;
    edittedLesson.description = formValues.lessonDescription;
    // convert localTBUA from user Obj to userIds
    let taughtByUserArrayId = []
    localTaughtByUsersArray.forEach(userObj => taughtByUserArrayId.push(userObj.userId));
    // then add any new users
    addToTaughtByUsers.forEach(userObj => taughtByUserArrayId.push(userObj.userId));
    edittedLesson.lessonTaughtBy = taughtByUserArrayId
    // console.log('newLesson', JSON.stringify(newLesson))
    // if successful, route back to unscheduled lessons, if unsuccessful, back to lesson
    this.props.editLessonById(edittedLesson, ROUTES_REACT.unscheduledlessons, `${ROUTES_REACT.lessons_edit}/${edittedLesson.Id}`);
  }
  
  render () {
    console.log('props @ LessonEdit', this.props);
    console.log('params', this.props.match.params.id)
    if(this.props.lessonById === null || this.props.allUsers === FETCHING){
      return (
        <section style={{padding: '1.5rem 1.5rem'}}>
          <DefaultLoadingPage />
        </section>
      )
    }
    else if(!this.props.lessonById){
    // if(this.props.lessonById.Id !== this.props.match.params.id){
      return (
        <section>
          <DefaultMessage
            content={DEFAULT_MESSAGE_LESSON_BY_ID_ITEM_NOT_FOUND}
          />
        </section>
      )
    }
    else {
    const {
      title,
      description
    } = this.props.lessonById
    console.log('lessonById: ', this.props.lessonById, 'this.props: ', this.props)
    // fill in the lesson Taught By with User Objects, not just the Id
    let dupLesson = { ...this.props.lessonById }
    dupLesson.lessonTaughtBy = dupLesson.lessonTaughtBy.map(userId => this.props.lookupTableAllUsers[userId])
    return (
      <>
        <LessonForm 
          onSubmit={this.onSubmit}
          content={FORM_HEADING_LESSON_EDIT}
          initialValues={{
            lessonTitle: title,
            lessonDescription: description
          }}
          allUsers={this.props.allUsers}
          lesson={dupLesson}
        />
      </>
    )
    }
  }
}

function mapStateToProps(state, ownProps){
  // console.log('MSTP @ Lesson: ', state, ownProps)
  return { 
    lessonById: state.lessons.lessonById,
    // lessonById: state.lessons.lookupTableAllLessons[ownProps.match.params.id]
    allUsers: state.users.allUsers,
    lookupTableAllUsers: state.users.lookupTableAllUsers
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({ getLessonById, editLessonById, fetchUsers }, dispatch);
}

export default connect ( mapStateToProps, mapDispatchToProps )(LessonEdit)
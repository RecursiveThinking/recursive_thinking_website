import React, { Component } from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { SubmissionError } from 'redux-form';

import { lessonGetById, lessonEditById, usersGetAll } from '../../../actions'

import DefaultLoadingPage from '../../../components/defaults/loadingPage/loadingPage';
import DefaultErrorPage from '../../../components/defaults/errorPage/errorPage'
import DefaultMessage from '../../../components/defaults/defaultMessage/defaultMessage';
import DefaultProcessingPage from '../../../components/defaults/processingPage/processingPage';

import { DEFAULT_MESSAGE_LESSON_BY_ID_ITEM_NOT_FOUND } from '../../../components/defaults/defaultMessage/defaultMessageContent/defaultMessageContent'
import { 
  CARD_TITLE_SELECTED_LESSON_GET_BY_ID, CARD_TITLE_EDITING_LESSON_EDIT_BY_ID 
} from '../../../components/common/content/contentInfo'

import { FORM_HEADING_LESSON_EDIT } from '../../../components/forms/formContent/formContent'
import LessonForm from '../../../components/forms/form_lesson'

import { ROUTES_REACT } from '../../../standards/routes'

class LessonEdit extends Component {
  
  componentDidMount(){
    // console.log('CDM @ lessonEdit: ', this.props.match.params.id)
    this.props.usersGetAll();
    this.props.lessonGetById(this.props.match.params.id);
  }
  
  onSubmit = (formValues, addToTaughtByUsers, localTaughtByUsersArray) => {
    let {
      lessonById
    } = this.props.lessons;
    // console.log('formValues: ', formValues, 'addToTaughtByUsers: ', addToTaughtByUsers, 'localTaughtByUsersArray: ', localTaughtByUsersArray)
    if(addToTaughtByUsers.length === 0 && localTaughtByUsersArray.length === 0){
      // console.log('no users teaching')
      throw new SubmissionError({ lessonTaughtBy: 'Please Specifiy at least one Member to Teach This Lesson'})
    } else {
      console.log('formVals @ Lesson Edit', formValues)
      let edittedLesson = { ...lessonById };
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
      this.props.lessonEditById(edittedLesson, ROUTES_REACT.unscheduledlessons, `${ROUTES_REACT.lessons_edit}/${edittedLesson.Id}`);
    }
  }
  
  render () {
    let {
      users: { 
        allUsers, lookupTableAllUsers, 
        isFetchingUsersGetAll, errorMessageUsersGetAll },
      lessons: { 
        isGettingLessonById, errorMessageGettingLessonById, 
        isEdittingLessonById, errorMessageEditingLessonById,
        lessonById
      }
    } = this.props
    // lessonById = {};
    // console.log('props @ LessonEdit', this.props);
    // console.log('params', this.props.match.params.id)
    // show progress on edit
    if(isEdittingLessonById){
      const {
        title,
        classNameTxt
      } = CARD_TITLE_EDITING_LESSON_EDIT_BY_ID;
      return (
        <DefaultProcessingPage 
          title={title}
          classNameTxt={classNameTxt}
        />
      )
    }
    // getlesson, getUsers
    else if(isGettingLessonById || isFetchingUsersGetAll){
      const {
        title,
        classNameTxt
      } = CARD_TITLE_SELECTED_LESSON_GET_BY_ID;
      return (
        <DefaultLoadingPage 
          title={title}
          classNameTxt={classNameTxt}
        />
      )
    }
    // show any errors
    else if(errorMessageGettingLessonById || errorMessageEditingLessonById || errorMessageUsersGetAll){
      return (
        <DefaultErrorPage 
          
        />
      )
    }
    // if no lesson
    else if(!lessonById){
      return (
        <DefaultMessage
          content={DEFAULT_MESSAGE_LESSON_BY_ID_ITEM_NOT_FOUND}
        />
      )
    }
    else {
      const {
        title,
        description
      } = lessonById
      // console.log('lessonById: ', lessonById, 'this.props: ', this.props)
      // fill in the lesson Taught By with User Objects, not just the Id
      let dupLesson = { ...lessonById }
      // console.log('dupLesson: ', dupLesson)
      dupLesson.lessonTaughtBy = dupLesson.lessonTaughtBy.map(userId => lookupTableAllUsers[userId])
      return (
        <LessonForm 
          onSubmit={this.onSubmit}
          content={FORM_HEADING_LESSON_EDIT}
          initialValues={{
            lessonTitle: title,
            lessonDescription: description
          }}
          allUsers={allUsers}
          lesson={dupLesson}
        />
      )
    }
  }
}

function mapStateToProps(state, ownProps){
  // console.log('MSTP @ Lesson: ', state, ownProps)
  return { 
    lessons: state.lessons,
    // lessonById: state.lessons.lessonById,
    users: state.users,    
    // allUsers: state.users.allUsers,
    // lookupTableAllUsers: state.users.lookupTableAllUsers
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({ lessonGetById, lessonEditById, usersGetAll }, dispatch);
}

export default connect ( mapStateToProps, mapDispatchToProps )(LessonEdit)
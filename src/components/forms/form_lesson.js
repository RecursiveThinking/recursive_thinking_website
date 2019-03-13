import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';

import ReactTags from 'react-tag-autocomplete';

import ValidationMethods from '../../functions/validationMethods';

class LessonForm extends Component {
  constructor(props){
    super(props)
    this.state = {
      addToTaughtByUsers: [],
      allUsers: this.props.allUsers,
      filterUsers: this.props.allUsers
    }
  }
  
  updateFilteredArray = () => {
    const {
      addToTaughtByUsers,
      allUsers
    } = this.state;
    
    let updatedFilterUsers = [ ...allUsers ];
    console.log('updatedFilterUsers: ', updatedFilterUsers)
    let addToTaughtByUsersId = [];
    addToTaughtByUsers.forEach(user => addToTaughtByUsersId.push(user.userId))
    console.log('addToTaughtByUsersId: ', addToTaughtByUsersId)
    console.log('state', this.state)
    updatedFilterUsers = updatedFilterUsers.filter(item => !addToTaughtByUsersId.includes(item.userId))
    console.log('updateFilterUsers: After filter: ', updatedFilterUsers)
    this.setState({filterUsers: updatedFilterUsers})
  }
  
  handleDelete = (i) => {
    const addToTaughtByUsers = this.state.addToTaughtByUsers.slice(0)
    addToTaughtByUsers.splice(i, 1)
    this.setState({ addToTaughtByUsers }, () => this.updateFilteredArray())
  }
  
  handleAddition = (tag) => {
    const addToTaughtByUsers = [].concat(this.state.addToTaughtByUsers, tag)
    this.setState({ addToTaughtByUsers }, () => this.updateFilteredArray())
  }
  
  onSubmit = (formValues) => {
    // console.log('formValues @ lessonForm Comp: ', formValues)
    this.props.onSubmit(formValues, this.state.addToTaughtByUsers)
  }
  
  renderField(field){
    const { meta: { touched, error }} = field;
    const errorInput = `fc-field-row-full fc--disp-flex fc--fdir-row mt10 ${touched && error ? 'input-invalid' : ''}`
    return(
      <div className="fc-field fc--disp-flex fc--fdir-col fc--jCont-ce width100P">
        <div className="fc-field-row-full fc--disp-flex fc--fdir-row mt10">
          <label htmlFor={field.name} className={field.labelStyle}>{field.label}</label>
        </div>
        <div className={errorInput}>
          <input 
            {...field.input}
            className={field.inputStyle}
            type={field.type}
            placeholder={field.placeholder}
          />
        </div>
        <div className="error fc-field-row-full fc--disp-flex fc--fdir-row width100P">
          {/* <div className=" fc--disp-flex fc--fdir-row fc--jCont-fs width90P"> */}
            <div className="fc--disp-flex fc--fdir-row fc--jCont-fs fs16">
              { touched ? error : "" }
            </div>
          {/* </div> */}
        </div>
      </div>
    )
  }
  
  renderTextArea(field){
    const { meta: { touched, error }} = field;
    const errorInput = `fc-field-row-full fc--disp-flex fc--fdir-row mt10 ${touched && error ? 'input-invalid' : ''}`
    return(
      <div className="fc-field fc--disp-flex fc--fdir-col fc--jCont-ce width100P">
        <div className="fc-field-row-full fc--disp-flex fc--fdir-row mt10">
          <label htmlFor={field.name} className={field.labelStyle}>{field.label}</label>
        </div>
        <div className={errorInput}>
          <textarea 
            {...field.input}
            className={field.textAreaStyle}
            placeholder={field.placeholder}
            cols={field.cols}
            rows={field.rows}
          />
        </div>
        <div className="error fc-field-row-full fc--disp-flex fc--fdir-row width100P">
          <div className="fc--disp-flex fc--fdir-row fc--jCont-fs fs16">
            { touched ? error : "" }
          </div>
        </div>
      </div>
    )
  }
  
  renderReactTag(field){
    const { meta: { touched, error }} = field;
    const errorInput = `fc-field-row-full fc--disp-flex fc--fdir-row mt10 ${touched && error ? 'input-invalid' : ''}`;
    console.log('field: ', field)
    return(
      <div className="fc-field fc--disp-flex fc--fdir-col fc--jCont-ce width100P">
        <div className="fc-field-row-full fc--disp-flex fc--fdir-row mt10">
          <label htmlFor={field.name} className={field.labelStyle}>{field.label}</label>
        </div>
        <div className={errorInput}>
          <ReactTags
            {...field.input}
            placeholder={field.placeholder}
            tags={field.tags}
            suggestions={field.suggestions}
            // allowNew={field.allowNew}
            // autoresize={field.autoresize}
            // autofocus={field.autofocus}
            minQueryLength={field.minQueryLength}
            maxSuggestionsLength={field.maxSuggestionsLength}
            delimiters={field.delimiters}
            delimiterChars={field.delimiterChars}
            handleAddition={field.handleAddition}
            handleDelete={field.handleDelete}
            classNames={field.classNames}
          />
        </div>
        <div className="error fc-field-row-full fc--disp-flex fc--fdir-row width100P">
          <div className="fc--disp-flex fc--fdir-row fc--jCont-fs fs16">
            { touched ? error : "" }
          </div>
        </div>
      </div>
    )
  }
  
  renderHeadingContent(){
    const {
      content
    } = this.props;
    if(!this.props.lesson){
      return (
        <h5 className="fw600 ls12 fcGrey424041">{content.heading}</h5>
      )
    } else {
      return (
        <h5 className="fw600 ls12 fcGrey424041">{content.heading}{this.props.lesson['title']}</h5>
      )
    }
  }
  
  render(){
    const {
      content
    } = this.props;
    
    const userClassNames = {
      root: 'react-tags',
      rootFocused: 'is-focused',
      selected: 'react-tags-lesson__selected',
      selectedTag: 'react-tags-lesson__selected-tag',
      selectedTagName: 'react-tags-lesson__selected-tag-name',
      search: 'react-tags-lesson__search',
      searchInput: 'react-tags-lesson__search-input',
      suggestions: 'react-tags-lesson__suggestions',
      suggestionActive: 'is-active',
      suggestionDisabled: 'is-disabled'
    }
    return (
      <section style={{padding: '1.5rem 1.5rem'}}>
        <article className="card">
          <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
          <div className="grid grid--full">
            <div className="grid-cell">
            
          <fieldset className="fc--disp-flex fc--fdir-col fc--aItem-ce noMargin">
            {/* <h2 className="fs33 fw300 ls24 fcBlack ta-cent">{content.heading}</h2> */}
            {/* <h5 className="fw700 ls14 ttup fcGrey424041">{content.heading}</h5> */}
            <legend>
              {this.renderHeadingContent()}
            </legend>
            <hr className="modalHR mt10" />
              <div className="fc-fieldset">
                <Field
                  label="Title:"
                  name="lessonTitle"
                  type="text"
                  placeholder="Enter Title"
                  component={this.renderField}
                  labelStyle="width100P"
                  inputStyle="width100P"
                />
                <Field
                  label="Description:"
                  name="lessonDescription"
                  placeholder="Enter Description"
                  component={this.renderTextArea}
                  labelStyle="width100P"
                  textAreaStyle="width100P"
                  cols={"30"}
                  rows={"10"}
                />
                <Field
                  label="Lesson Taught By:"
                  name="lessonTaughtBy"
                  component={this.renderReactTag}
                  labelStyle="width100P"
                  inputStyle="width100P"
                  classNames={userClassNames}
                  placeholder='Select a User To Teach this Lesson'
                  tags={this.state.addToTaughtByUsers}
                  suggestions={this.state.filterUsers}
                  // allowNew={false}
                  // autoresize={true}
                  // autofocus={true}
                  minQueryLength={2}
                  maxSuggestionsLength={4}
                  delimiters={[9, 13]}
                  delimiterChars={[',']}
                  handleAddition={this.handleAddition}
                  handleDelete={this.handleDelete}
                />
              </div> 
              <hr className="modalHR mt80" />
              <div className="ta-cent">
                {
                  // this.props.anyTouched && !this.props.invalid &&
                  
                  <button className="btn btnFillClrSchGreen00b371 pdTB2LR8 fs20 fw500 ls12 mt30">{content.buttonText}</button>
                }
              </div>
          </fieldset>
          </div>
          </div>
          </form>
        </article>
      </section>
    )
  }
}

export default reduxForm({
  validate: validate,
  form: 'LessonForm'
})(LessonForm)

function validate(values){
  const errors = {};
  console.log('values: ', values)
  if(!values.lessonTitle){ errors.lessonTitle = 'Lesson Titles can not be Empty' };
  if(values.lessonTitle){
    const titleCharLimit = 4;
    if(!ValidationMethods.isWordOverCharLimit(values.lessonTitle, titleCharLimit)){
      errors.lessonsTitle = `Lesson Titles must contain at Least ${titleCharLimit} Characters`
    }
  }
  if(!values.lessonDescription){ errors.lessonDescription = 'Lesson Descriptions can not be Empty' }
  if(values.lessonDescription){
    const descriptionCharLimit = 10;
    if(!ValidationMethods.isWordOverCharLimit(values.lessonDescription, descriptionCharLimit)){
      errors.lessonDescription = `Lesson Descriptions must contain at Least ${descriptionCharLimit} Characters`
    }
  }
    
  // if(!values.lessonTaughtBy){ errors.lessonTaughtBy = 'Please Search to Assign Users to this Lesson' }

  
  return errors
}
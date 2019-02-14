import React, { Component } from 'react';
import ModalDelete from '../common/modal/modalDelete';

import { connect } from 'react-redux'
import { getLessonById, deleteLessonById } from '../../actions/index'

import { Link } from 'react-router-dom'

import { ROUTES_REACT } from '../../standards/routes'

class LessonDelete extends Component {
  constructor(props){
    super(props);
    this.state = {
      showModalLessonDelete: true
    }
  }
  
  handleToggleModalLessonDelete(){
    this.setState( { showModalLessonDelete: !this.state.showModalLessonDelete })
  }
  
  componentDidMount(){
    console.log('props @ ', this.props)
    this.props.getLessonById(this.props.match.params.id);
  }
  
  renderModalButtons(){
    const { id } = this.props.match.params;
    const { unscheduledlessons } = ROUTES_REACT;
    return (
      <>
        <Link
          className=""
          to={ unscheduledlessons }
        >Cancel</Link>
        <button
          className=""
          onClick={() => {this.props.deleteLessonById(id)}}
        >Delete</button>
      </>
    )
  }
  
  renderContent(){
    const { lesson } = this.props;
    if(!lesson){
      return (
        <div>Loading!!!</div>
      )
    } else {
      return(
        <fieldset className="fc--disp-flex fc--fdir-col fc--aItem-ce">
          <h2 className="fs33 fw300 ls24 fcBlack ta-cent">Delete A Lesson</h2>
          <hr className="modalHR mt10" />
          <h4 className="fs18 fw300 ls24 fcBlack ta-cent">Are you sure you want to delete the lesson titled:</h4>
          <h3 className="fs22 fw700 ls24 fcBlack ta-cent">{lesson.title}</h3>
        </fieldset>
      )
    }
  }
  
  render(){
    return(
      <section>
        {
          this.state.showModalLessonDelete &&
          
          <ModalDelete 
            onCloseRequest={() => this.handleToggleModalLessonDelete()}
            content={this.renderContent()}
            buttons={this.renderModalButtons()}
          />
        }
      </section>
    )
  }
}

function mapStateToProps(state, ownProps){
  return {
    lesson: state.lessons.lookupTableAllLessons[ownProps.match.params.id]
  }
}

export default connect(mapStateToProps, { getLessonById, deleteLessonById })(LessonDelete)

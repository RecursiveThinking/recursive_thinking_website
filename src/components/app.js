import React, { Component } from 'react';
import { Route } from 'react-router-dom';
// , Redirect
import HomeScreen from '../containers/public/HomeScreen/HomeScreen';
import userCreate from '../containers/user/create/userCreate';
import userSetup from '../containers/user/setup/userSetup';
import MainApp from '../containers/mainApp/mainApp';
import SignOut from '../containers/signOut/signOut';

import { ROUTES_REACT } from '../standards/routes';

const {
  root,
  dashboard,
  scheduledlessons,
  unscheduledlessons,
  lessons_create,
  lessons_edit_id,
  lessons_delete_id,
  interviewquestions,
  interviewquestions_create,
  interviewquestions_edit_id,
  interviewquestions_delete_id,
  interviewquestionsanswers_create,
  interviewquestionsanswers_edit_id,
  interviewquestionsanswers_delete_id,
  recursivedirectory,
  users_edit,
  users_create,
  users_setup,  
  users_setup_id,
  users_view_id,
  admindashboard,
  signout
} = ROUTES_REACT

class App extends Component {
  render(){
    return(
      <div className="mainApp">
        <Route path={root} exact component={HomeScreen} />
        <Route path={dashboard} exact component={MainApp}/>
        <Route path={scheduledlessons} component={MainApp}/>
        <Route path={unscheduledlessons} exact component={MainApp}/>
        <Route path={lessons_create} component={MainApp}/>
        <Route path={lessons_edit_id} exact component={MainApp}/>
        <Route path={lessons_delete_id} exact component={MainApp}/>
        <Route path={interviewquestions_delete_id} exact component={MainApp}/>
        <Route path={interviewquestions_edit_id} exact component={MainApp}/>
        <Route path={interviewquestions_create} component={MainApp}/>
        <Route path={interviewquestions} component={MainApp}/>
        <Route path={`${interviewquestionsanswers_create}/:id/answers/create`} exact component={MainApp} />
        <Route path={interviewquestionsanswers_edit_id} exact component={MainApp} />
        <Route path={interviewquestionsanswers_delete_id} exact component={MainApp} />
        <Route path={recursivedirectory} component={MainApp}/>
        <Route path={users_edit} exact component={MainApp}/>
        <Route path={users_view_id} exact component={MainApp}/>
        <Route path={users_create} component={userCreate}/>
        <Route path={users_setup} exact component={userSetup}/>
        <Route path={users_setup_id} exact component={userSetup}/>
        <Route path={admindashboard} component={MainApp}/>
        {/* <Route path={signout} render={ () => ( <Redirect to="/" /> ) } /> */}
        <Route path={signout} component={SignOut} />
      </div>
    )
  }
}

export default App
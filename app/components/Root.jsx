import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { fetchStudents, fetchCampuses } from '../reducers';
import store from '../store';

//import Navbar from './Navbar';
import Campuses from './Campuses';
import SingleCampus from './SingleCampus';
import Students from './Students';
import SingleStudent from './SingleStudent';
import NotFound from './NotFound';
import NewCampusForm from './NewCampusForm';
import NewStudentForm from './NewStudentForm';
import NavBar from './NavBar';

export default class Root extends Component {

  componentDidMount () {
    store.dispatch(fetchCampuses());
    store.dispatch(fetchStudents());
  }

  // only render whichever of the routes is selected in the store
  render () {
    return (
      <div>
      <NavBar />
        <main>
          <Switch>
            <Route exact path="/" />
            <Route exact path="/campuses" component={Campuses} />
            <Route exact path="/campuses/new-campus" component={NewCampusForm} />
            <Route path="/campuses/:campusid" component={SingleCampus} />
            <Route exact path="/students" component={Students} />
            <Route exact path="/students/new-student" component={NewStudentForm} />
            <Route path="/students/:studentid" component={SingleStudent} />
            <Route component={NotFound} />
          </Switch>
        </main>
      </div>
    );
  }
}


// import external dependencies
import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

// import components / store
import { fetchStudents, fetchCampuses } from '../reducers';
import store from '../store';
import Campuses from './Campuses';
import SingleCampus from './SingleCampus';
import Students from './Students';
import SingleStudent from './SingleStudent';
import NotFound from './NotFound';
import NewCampusForm from './NewCampusForm';
import NewStudentForm from './NewStudentForm';
import NavBar from './NavBar';
import Home from './Home';

export default class Root extends Component {

  componentDidMount() {
    store.dispatch(fetchCampuses());
    store.dispatch(fetchStudents());
  }

  render() {
    return (
      <div className="container-fluid">
        <NavBar />
        <main>
          <Switch>
            <Route exact path="/" component={Home} />
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


import React, { Component } from 'react';
import { Route, Switch, Redirect, BrowserRouter as Router } from 'react-router-dom';
import connect from 'react-redux';

import { fetchStudents, fetchCampuses } from './reducers';
import store from './store';

import Campuses from './components/Campuses';
import SingleCampus from './components/SingleCampus';
import Students from './components/Students';
import SingleStudent from './components/SingleStudent';
import NotFound from './components/NotFound';
import NewCampusForm from './components/NewCampusForm';
import NewStudentForm from './components/NewStudentForm';
import NavBar from './components/NavBar';
import Home from './components/Home';
import Root from './components/Root';

export class Routes extends Component {

  componentDidMount () {
    store.dispatch(fetchCampuses());
    store.dispatch(fetchStudents());
  }
      // <div className="container-fluid">
  // only render whichever of the routes is selected in the store
  render () {
    return (
      <Router >
        <Root>
          <Switch>
            <Route exact path="/" component={Home}/>
            <Route exact path="/campuses" component={Campuses} />
            <Route exact path="/campuses/new-campus" component={NewCampusForm} />
            <Route path="/campuses/:campusid" component={SingleCampus} />
            <Route exact path="/students" component={Students} />
            <Route exact path="/students/new-student" component={NewStudentForm} />
            <Route path="/students/:studentid" component={SingleStudent} />
            <Route component={NotFound} />
          </Switch>
          </Root>
      </Router>
    );
  }
}

export default connect(null, null)(Routes);

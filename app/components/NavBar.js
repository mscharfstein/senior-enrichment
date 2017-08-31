import React, { Component } from 'react';
import { NavLink, Link, withRouter } from 'react-router-dom';
import {connect} from 'react-redux';

export class NavBar extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    console.log('props are ', this.props)
    return (
      <nav className="navbar navbar-default">
            <div className="nav navbar-nav navbar-brand">
              <img src='/big_ten_conf_logo.png' width="45"/>
            </div>
            <div className="nav navbar-nav">
              <NavLink className="navbar-brand" to="/">Home</NavLink>
            </div>
            <div className="nav navbar-nav">
              <NavLink className="navbar-brand" to='/campuses'>Campuses</NavLink>
            </div>
            <div className="nav navbar-nav">
              <NavLink className="navbar-brand" to='/students'>Students</NavLink>
            </div>
      </nav>
    );
  }
}

const mapProps = null;
const mapDispatch = null;

export default withRouter(connect(mapProps, mapDispatch)(NavBar))

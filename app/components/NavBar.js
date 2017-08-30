import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';

export default function NavBar () {
  return (
    <nav>
      <h4><NavLink to='/campuses'>Campuses</NavLink></h4>
      <h4><NavLink to='/students'>Students</NavLink></h4>
    </nav>
  );
}

'use strict'
import React from 'react'
import {render} from 'react-dom'
import { Provider } from 'react-redux'
import {BrowserRouter as Router} from 'react-router-dom'

import store from './store'
import Root from './components/Root'
//import Routes from './Routes';

render (
  <Provider store={store}>
    <Router>
      <Root/>
    </Router>
  </Provider>,
  document.getElementById('main')
)


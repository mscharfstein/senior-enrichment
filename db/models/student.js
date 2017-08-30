'use strict';
const Sequelize = require('sequelize')
const db = require('../index.js')
const Campus = require('./campus');

module.exports = db.define('student', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    validate: {
      isEmail: true
    }
  }
},{
  defaultScope: {
    include: [{model: Campus}]
  }
})

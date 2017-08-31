'use strict';
const Sequelize = require('sequelize')
const db = require('../index.js')
const Campus = require('./campus');


const Student = db.define('student', {
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

module.exports = Student;

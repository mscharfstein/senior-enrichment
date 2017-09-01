'use strict';
const Sequelize = require('sequelize')
const db = require('../index.js')

const Campus = db.define('campus', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  image: {
    type: Sequelize.STRING
  }
}, {
    hooks: {
      beforeDestroy: function (inst) {
        db.model('student').destroy({
          where: {
            campusId: inst.id
          }
        })
      }
    }
  })

module.exports = Campus;

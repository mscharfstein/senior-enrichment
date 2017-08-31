'use strict';
const Sequelize = require('sequelize')
const db = require('../index.js')
//const Student = require('./student');
const Promise = require('bluebird');

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
    beforeDestroy: function(inst) {
      console.log("in the before destroy hook");
      db.model('student').destroy({
        where: {
          campusId: inst.id
        }
      })
    }
  }
})

// Campus.hook('beforeDestroy', function (inst) {
//   inst.getStudents()
//     .then(res => {
//       Promise.map(res, function(student) {
//         console.log('student', student);
//         return student.destroy()
//         }
//       ).then(()=> console.log("students deleted"))
//     })
//       // res.forEach(student => {
//       //    student.destroy()
//       // })
// });

module.exports = Campus;

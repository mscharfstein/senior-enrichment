'use strict';

// Require all the models
const Student = require('./student');
const Campus = require('./campus');

Student.belongsTo(Campus);
Campus.hasMany(Student,{
  onDelete: 'cascade',
  hooks: true
});

module.exports = {Student, Campus}

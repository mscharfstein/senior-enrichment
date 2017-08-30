// This file should contain all the record creation needed to seed the database with its default values.
// The data can then be loaded with the node seed.js

var Promise = require('bluebird');
var db = require('./index');
var Student = db.models.Student;
var Campus = db.models.Campus;


db.sync()
.then(function () {
  console.log(db)
  // return Student.create({
  //   name: "Michelle Scharfstein",
  //   email: "michelle.scharfstein@gmail.com"
  // })
})
.catch(function (err) {
  console.error('There was totally a problem', err, err.stack);
})
.finally(function () {
  db.close() // uses promises but does not return a promise. https://github.com/sequelize/sequelize/pull/5776
  console.log('connection closed'); // the connection eventually closes, we just manually do so to end the process quickly
  return null; // silences bluebird warning about using non-returned promises inside of handlers.
});

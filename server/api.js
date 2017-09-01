'use strict'
const api = require('express').Router()
const campusRouter = require('./campus');
const studentRouter = require('./students');

// use separate routers for the campus routes and student routes
api.use('/campuses', campusRouter)
api.use('/students', studentRouter)

module.exports = api

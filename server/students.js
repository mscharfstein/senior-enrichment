const router = require('express').Router()
const db = require('../db')
const { Student } = require('../db/models');

// /api/students
router.route('/')
	// get all students
	.get((req, res, next) => {
		Student.findAll({})
			.then((students) => res.status(200).send(students))
			.catch(next)
	})

	// add student
	.post((req, res, next) => {
		Student.create(req.body)
			.then((student) => {
				return Student.findById(student.id)
			})
			.then(student => res.status(201).send(student))
			.catch(next)
	})

// /api/students/:studentId
router.route('/:studentId')
	// get student
	.get((req, res, next) => {
		Student.findById(req.params.studentId)
			.then((student) => res.status(200).send(student))
			.catch(next)
	})

	// update student info
	.put((req, res, next) => {
		Student.update(
			{
				name: req.body.name,
				email: req.body.email,
				campusId: req.body.campusId
			},
			{ where: { id: req.params.studentId } },
			{ returning: true }
		)
			.then(() => Student.findById(req.params.studentId))
			.then(student => {
				res.status(201).send(student)
			})
			.catch(next)
	})

	// delete student
	.delete((req, res, next) => {
		Student.destroy(
			{ where: { id: req.params.studentId } }
		)
			.then(() => res.sendStatus(204))
			.catch(next)
	})

module.exports = router;

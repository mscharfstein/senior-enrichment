const router = require('express').Router()
const db = require('../db')
const {Campus, Student} = require('../db/models');

router.route('/')
	.get((req, res, next) => {
		Campus.findAll({})
			.then((campuses) => res.status(200).send(campuses))
			.catch(next)
	})

	// add campus
	.post((req, res, next) => {
		Campus.create(req.body)
			.then((campus) => res.status(201).send(campus))
			.catch(next)
		})

// campus with particular id
router.route('/:campusId')
	// get campus with particular id
	.get((req, res, next) => {
	Campus.findById(req.params.campusId)
		.then((campus) => res.status(200).send(campus))
		.catch(next)
	})

	// update campus info
	.put((req, res, next) => {
		Campus.update(
			{name: req.body.name,
				image: req.body.image},
			{ where: {id: req.params.campusId}}
		)
			.then((res) => {
				return Campus.findById(req.params.campusId)
			})
			.then(campus => {
				res.status(201).send(campus)
			})
			.catch(next)
	})

	// delete campus
	.delete((req, res, next) => {
		// Campus.findById(req.params.campusId)
		// .then((campus) => campus.destroy())
		// .then(() => res.sendStatus(204))
		// .catch(next)
		Campus.destroy(
			{ where: {id: req.params.campusId}, individualHooks: true}
		)
			.then(() => res.sendStatus(204))
			.catch(next)
	})

router.route('/:campusId/students')
	// get campus with particular id
	.get((req, res, next) => {
	Student.findAll({
		where: {
			campusId: req.params.campusId
		}
	})
		.then((students) => res.status(200).send(students))
		.catch(next)
	})


  module.exports = router;

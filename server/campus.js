const router = require('express').Router()
const db = require('../db')
const {Campus} = require('../db/models');

router.route('/')
	.get((req, res, next) => {
		Campus.findAll({})
			.then((campuses) => res.status(200).send(campuses))
			.catch(next)
	})

	// add campus
	.post((req, res, next) => {
		console.log("posting in api")
		Campus.create({
			name: req.body.name
		})
			.then((campus) => res.status(201).send(campus))
			.catch(next)
		})

// campus with particular id
router.route('/:campusId')
	// get campus with particular id
	.get((req, res, next) => {
	Campus.findAll({
		where: {
			id: req.params.campusId
		}
	})
		.then((campus) => res.status(200).send(campus))
		.catch(next)
	})

	// update campus info
	.put((req, res, next) => {
		Campus.update(
			{name: req.body.name,
				image: req.body.image},
			{ where: {id: req.params.campusId}},
			{ returning: true}
		)
			.then(() => Campus.findById(req.params.campusId))
			.then(campus => {
				res.status(201).send(campus)
			})
			.catch(next)
	})

	// delete campus
	.delete((req, res, next) => {
		Campus.destroy(
			{ where: {id: req.params.campusId}}
		)
			.then(() => res.sendStatus(204))
			.catch(next)
	})

  module.exports = router;

'use strict';

const express = require('express');
const router = express.Router();
// const controller = require('../controllers/site.controller');
const controller = require('../controllers/users.controller');
const ecommerces = require('../middlewares/ecommerces');
const auth = require('../middlewares/auth');

router.get('/account', auth, controller.account)

router.put('/user', auth, (req, res, next) => {
	let validations = Joi.object({
		first_name: Joi.string(),
		last_name: Joi.string(),
		country: Joi.string(),
        company: Joi.string(),
		phone: Joi.string().regex(/^[0-9]{10}$/).messages({'string.pattern.base': `"Phone" must have 10 digits.`}),
		poNumber: Joi.string(),
		address: Joi.object({
			address1: Joi.string(),
			address2: Joi.string(),
			country: Joi.string(),
			state: Joi.string(),
			city: Joi.string(),
			postalCode:Joi.string(),
			email: Joi.string().email(),
			phone: Joi.string().regex(/^[0-9]{10}$/).messages({'string.pattern.base': `"Address Phone" must have 10 digits.`})
		})
	}).validate(req.body);
	if (validations.error) {
		let error = {};
		validations.error.details.forEach(err => {
			error.message = err.message;
		});
		return res.status(422).json(error);
	}
	next();
}, controller.updateUser);

router.post('/login', controller.createLogin);

router.post('/plate/login', controller.createPlateLogin);

router.post('/register', (req, res, next) => {
	let validations = Joi.object({
		first_name: Joi.string().required(),
		last_name: Joi.string().required(),
		email: Joi.string().email().required(),
		password: Joi.string().required(),
		password_confirmation: Joi.string().required().valid(Joi.ref('password')),
		country: Joi.string().required(),
		phone: Joi.string().required()
	}).validate(req.body);
	if (validations.error) {
		let errors = {};
		validations.error.details.forEach(err => {
			errors[err.path] = err.message;
		});
		return res.status(422).json({
			success: false,
			errors: errors
		});
	}
	next();
}, controller.createRegister);

module.exports = router;

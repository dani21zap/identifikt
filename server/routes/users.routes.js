'use strict';

const express = require('express');
const router = express.Router();
// const controller = require('../controllers/site.controller');
const controller = require('../controllers/users.controller');
const ecommerces = require('../middlewares/ecommerces');
const auth = require('../middlewares/auth');

router.get('/account', auth, controller.account)

router.post('/account', controller.createAdmin);

// router.put('/engomado', auth, (req, res, next) => {
// 	let validations = Joi.object({
// 		owner_name: Joi.string(),
// 		owner_lastname: Joi.string(),
// 		plate_id: Joi.string(),
//         car_model: Joi.string(),
// 		car_brand: Joi.string(),
// 		car_line: Joi.string(),
// 		car_serial_number: Joi.string(),
// 		car_type: Joi.string(),
// 		expedition_at: Joi.string(),
// 		expires_at: Joi.string(),
// 	}).validate(req.body);
// 	if (validations.error) {
// 		let error = {};
// 		validations.error.details.forEach(err => {
// 			error.message = err.message;
// 		});
// 		return res.status(422).json(error);
// 	}
// 	next();
// }, controller.updateUser);

router.post('/login', controller.createLogin);

router.post('/plate/login', controller.createPlateLogin);

module.exports = router;

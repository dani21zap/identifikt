'use strict';

const axios = require('axios');

module.exports = (req, res, next) => {
	axios.get(`${process.env.ECARTAPI_URL}/modules/ecommerces`, {
		headers: {
			authorization: process.env.TOKEN || null
		}
	})
	.then(response => {
		res.locals.ecommerces = response.data;
		next();
	})
	.catch(err => next(err));
};
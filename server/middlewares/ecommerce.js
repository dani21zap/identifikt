'use strict';

const axios = require('axios');

module.exports = (req, res, next) => {
	axios.get(`${process.env.ECARTAPI_URL}/modules/ecommerces/${req.params.ecommerce}`, {
		headers: {
			authorization: process.env.TOKEN || null
		}
	})
	.then(response => {
		res.locals.ecommerce = response.data;
		next();
	})
	.catch(err => next(err));
};
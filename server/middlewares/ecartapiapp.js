'use strict';

const axios = require('axios');

module.exports = (req, res, next) => {
	axios.get(`${process.env.ECARTAPI_URL}/modules/apps/${process.env.APP_ID}`, {
		headers: {
			authorization: process.env.TOKEN || null
		}
	})
	.then(response => {
		res.locals.ecartapiApp = response.data;
		next();
	})
	.catch(err => next(err))
};
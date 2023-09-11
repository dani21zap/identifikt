'use strict';

const axios = require('axios');

module.exports = (req, res, next) => {
	axios.get(`${process.env.ECARTAPI_URL}/modules/apps/${req.params.appId}`, {
		headers: {
			authorization: process.env.TOKEN || null
		},
		params:{
			nocount: true
		}
	})
	.then(response => {
		res.locals.app = response.data;
		next();
	})
	.catch(err => next(err))
};
'use strict';
const mongoose = require('mongoose');
const request = new mongoose.Schema({
	access_id: {
		type: mongoose.Schema.ObjectId,
		ref: 'accesses',
		require: true
	},
	app_id: {
		type: mongoose.Schema.ObjectId,
		ref: 'apps',
		require: true
	},
	user_id: {
		type: mongoose.Schema.ObjectId,
		ref: 'users',
		require: true
	},
	payment_id: {
		type: mongoose.Schema.ObjectId,
		ref: 'payments'
	},
	code: {
		type: String
	},
	path: {
		type: String
	}
},{
	timestamps:{
		createdAt: "created_at"
	}
});
module.exports = mongoose.model('accesses_requests', request);
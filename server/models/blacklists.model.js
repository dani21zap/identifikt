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
	ip: {
		type: String
	},
	critical: {
		type: Boolean
	},
	path: {
		type: String
	}
},{
	timestamps:{
		createdAt: "created_at"
	}
});

module.exports = mongoose.model('blacklists', request);

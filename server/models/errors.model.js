'use strict';

const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const error = new mongoose.Schema({
	reference: {
		type: String,
		required: true,
		index: true,
		unique: true
	},
	credentials: {
		type: mongoose.Schema.Types.Mixed
	},
	error: {
		type: mongoose.Schema.Types.Mixed,
	},
	method: {
		type: String,
		required: true
	},
	url: {
		type: String,
		required: true
	},
	request: {
		type: mongoose.Schema.Types.Mixed,
	},
	response: {
		type: mongoose.Schema.Types.Mixed,
	}
},{
	timestamps:{
		createdAt: "created_at",
		updatedAt: "updated_at"
	}
});

module.exports = mongoose.model('log_errors', error.plugin(uniqueValidator));

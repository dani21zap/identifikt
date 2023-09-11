'use strict';

const mongoose = require('mongoose');
const unique = require('mongoose-unique-validator');

const ecommerce = new mongoose.Schema({
	name: { 
		type: String, 
		required: [true, 'is required.'],
		trim: true,
		unique: true
	},
	required_app_keys: {
		type: Boolean,
		deafult: false
	},
	code: {
		type: Number,
		required: true,
		unique: true
	},
	order: {
		type: Number,
		required: true,
		unique: true
	},
	pattern: {
		type: [String]
	},
	oauth_pattern: {
		type: mongoose.Schema.Types.Mixed
	},
	type: {
		type: String
	},
	static_url: {
		type: String
	},
	integrations: { type: Number, default: 0 },
	form: {
		type: mongoose.Schema.Types.Mixed
	},
	webhooks:{
		type: mongoose.Schema.Types.Mixed
	},
	scopes:{
		type: mongoose.Schema.Types.Mixed
	},
	redirect_url:{
		type: String
	},
	landing_type:{
		type: String
	},
	resources: {
		type: mongoose.Schema.Types.Mixed
	},
	guideURL: {
		type: String
	}
});

module.exports = mongoose.model('ecommerces', ecommerce.plugin(unique, {message: 'already exists.'}));

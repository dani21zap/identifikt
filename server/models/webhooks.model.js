'use strict';

const mongoose = require('mongoose');
const datetime = require('node-datetime');

const schema = new mongoose.Schema({
	shop_key: {
		type: String,
		required: true 
	},
	ecommerce: {
		type: String,
		required: true
	},
	resource: {
		type: String,
		required: true
	},
	action: {
		type: String,
		required: true
	},
	url: {
		type: String,
		required: true
	},
	name: {
		type: String
	},
	data: {
		type: mongoose.Schema.Types.Mixed
	},
	reference: {
		type: String,
		require: true
	},
	auth: {
		type: String
	},
	active: {
		type: Boolean,
		default: true
	},
	deleted: {
		type: Boolean,
		default: false
	},
	version: {
		type: String,
		enum: ['v1', 'v2'],
		require: true
	},
	err : {
		type: [ { type: mongoose.Schema.Types.Mixed } ]
	}
},{
	timestamps:{
		createdAt: "created_at"
	}
});


module.exports = mongoose.model('webhooks', schema);

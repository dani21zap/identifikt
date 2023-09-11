'use strict';

const mongoose = require('mongoose');

const access = new mongoose.Schema({
	app_id: {
		type: mongoose.Schema.ObjectId,
		ref: 'apps',
		require: true
	},
	active: {
		type: Boolean,
		default: true
	},
	deleted: {
		type: Boolean,
		default: false
	},
	access_token: {
		type: String,
		require: true,
		index: true
	},
	access: {
		type: mongoose.Schema.Types.Mixed,
		require: true
	},
	error: {
		type: Boolean
	},
	ecartapi: {
		type: Boolean
	},
	requests: { type: Number, default: 0 }
},{
	timestamps:{
		createdAt: "created_at",
		updatedAt: "updated_at"
	}
},
{
	ecommerce:{
			type: mongoose.Schema.Types.Mixed,
		}
}
);

module.exports = mongoose.model('accesses', access);

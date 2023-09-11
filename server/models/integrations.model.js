'use strict';

const mongoose = require('mongoose');
const unique = require('mongoose-unique-validator');
const randomstring = require('randomstring');

const integration = new mongoose.Schema({
	name: {
		type: String,
		required: [true, 'Integration name is required.'],
		unique: true,
		trim: true
	},
	description: {
		type: String,
		trim: true
	},
	in_dev: {
		type: Boolean,
		default: true
	},
	progress: mongoose.Schema({	
		v1:{
			type: Number,
			min:0,
			max:100,
			default: 0
		},
		v2: {
			type: Number,
			min:0,
			max:100,
			default: 0
		},
		oauth: {
			type: Number,
			min:0,
			max:100,			
			default: 0
		},
		doc:{
			type: Number,
			min:0,
			max:100,			
			default: 0
		}
	}),
	begin: {
		type: Date,
		default: Date.now()
	},
	week_end: {
		type: Number,
		default: 0
	},
},{
	timestamps:{
		createdAt: "created_at",
		updatedAt: "updated_at"
	},

});

module.exports = mongoose.model('integrations', integration.plugin(unique, {message: 'App name already exists.'}));

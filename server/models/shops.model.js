'use strict';

const mongoose = require('mongoose');
const unique = require('mongoose-unique-validator');

const shop = new mongoose.Schema({
	url: {
		type: String, 
		required: true,
		index: true,
		unique: true
	},
	ecommerce: {
		type: String,
		required: true
	},
	accesses: {
		type: [{
			type: mongoose.Schema.ObjectId, ref: 'accesses'
		}]
	}
});

module.exports = mongoose.model('shops', shop.plugin(unique, {message: 'already exists.'}));
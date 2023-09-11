'use strict';

const mongoose = require('mongoose');
const unique = require('mongoose-unique-validator');

const countries = new mongoose.Schema({
	name: {
		type:String,
		unique: true,
		trim: true
	},
	code_2:{
		type: String,
		unique: true,
		trim: true
	},
	code_3:{
		type: String,
		unique: true,
		trim: true
	}
});

module.exports = mongoose.model('countries', countries);

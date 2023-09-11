'use strict';

const mongoose = require('mongoose');
const unique = require('mongoose-unique-validator');
const jsonwebtoken = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const discounts = new mongoose.Schema({
	percentage: {
		type:mongoose.Schema.Types.Mixed
	},
	amount: {
		type: mongoose.Schema.Types.Mixed
	},
	prices: {
		type: mongoose.Schema.Types.Mixed
	}
});

const settings = new mongoose.Schema({
	cc_email: {
		type:mongoose.Schema.Types.Mixed
	}
});

const address = new mongoose.Schema({
	address1: {
		type: String,
		trim: true
	},
	address2: {
		type: String,
		trim: true
	},
	country: {
		type: String,
		trim: true
	},
	state: {
		type: String,
		trim: true
	},
	city: {
		type: String,
		trim: true
	},
	postalCode: {
		type: String,
		trim: true
	},
	email: {
		type: String,
		trim: true
	},
	phone: {
		type: String,
		trim: true
	}
});

const user = new mongoose.Schema({
	first_name: {
		type: String,
		required: [true, 'First name is required.'],
		trim: true
	},
	last_name: {
		type: String,
		required: [true, 'Last name is required.'],
		trim: true
	},
	email: {
		type: String,
		required: [true, 'Email is required.'],
		index: true,
		unique: [true, 'already exists.'],
		trim: true
	},
	company: {
		type: String
	},
	password: {
		type: String,
		required: [true, 'Password is required.'],
		validate: {
			validator: function(p) {
				return this.password_confirmation === p;
			},
			message: 'Password confirmation is not equal.'
		},
		trim: true
	},
	country: {
		type: String,
		required: [true, 'Country is required.'],
		trim: true
	},
	phone: {
		type:
		String,
		required: [true, 'Phone is required.'],
		trim: true
	},
	active: {
		type: Boolean,
		default: false,
		required: true
	},
	client_id: {
		type: String,
		index: true,
		unique: true
	},
	payment_customer_id: {
		type: String
	},
	poNumber: {
		type: String,
		trim: true	
	},
	recovery: mongoose.Schema({
		date: {
			type: Number
		},
		expires_in: {
			type: Number
		}
	}),
	discount: discounts,
	address: address,
	month_requests:{
		type: Number, default: 0
	},
	settings: settings
},{
	timestamps:{
		createdAt: "created_at",
		updatedAt: "updated_at"
	}
});

user.virtual('password_confirmation')
.get(function() {
	return this.password_c;
})
.set(function(password) {
	this.password_c = password;
});

user.pre('save', function(next) {
	if (this.isNew) {
		this.password = bcrypt.hashSync(this.password, parseInt(process.env.BCRYPT_SALT));
		this.client_id = jsonwebtoken.sign({
			iss: Buffer.from(String(this._id)).toString('base64'),
			iat: new Date().getTime()
		}, process.env.JWT_USER_SECRET, {
			algorithm: process.env.JWT_USER_ALGORITHM
		});
	}
	next();
});

module.exports = mongoose.model('users', user.plugin(unique, {message: 'already exists.'}));

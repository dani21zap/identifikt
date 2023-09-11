'use strict';

const mongoose = require('mongoose');
const unique = require('mongoose-unique-validator');

const payment = new mongoose.Schema({
	user_id: {
		type: mongoose.Schema.Types.ObjectId, ref: 'users',
		required: true
	},
	company: {
		type: String
	},
	begin: {
		type: Date,
		required: true
	},
	end: {
		type: Date,
		required: true
	},
	number: {
		type: String,
		required: true,
		unique: true
	},
	price: {
		type: Number,
		required: true
	},
	totals: {
		type: mongoose.Schema({
			subtotal: {
				type: Number,
				required: true
			},
			tax: {
				type: Number,
				required: true
			},
			total: {
				type: Number,
				required: true
			},
			requests: {
				type: Number,
				required: true
			},
			discount: {
				type: Number,
				default: 0
			},
			domains: {
				type: Number,
				default: 0
			}
		}, { _id: false }),
		required: true
	},
	status: {
		type: String,
		default: 'pending',
	},
	paid_at: {
		type: Date
	},
	payment_order_id: {
		type: String
	},
	risk_score: {
		type: Number,
		required: true
	},
	currency:{
		type: String
	},
	pay_link:{
		type: String
	},
	payment_method: {
		type: mongoose.Schema.Types.Mixed
	},
	url_pdf: {
		type: String
	}
},{
	timestamps:{
		createdAt: "created_at"
	}
});

module.exports = mongoose.model('payments', payment.plugin(unique, { message: 'Number already exists.' }));

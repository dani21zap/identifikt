'use strict';

const mongoose = require('mongoose');
const unique = require('mongoose-unique-validator');
const randomstring = require('randomstring');

const app = new mongoose.Schema({
	name: {
		type: String,
		required: [true, 'App name is required.'],
		unique: true,
		trim: true
	},
	description: {
		type: String,
		trim: true
	},
	short_description: {
		type: String,
		trim: true
	},
	app_id: {
		type: String,
		index: true,
		unique: true
	},
	active: {
		type: Boolean,
		default: true
	},
	published:{
		type: Boolean,
		default: false
	},
	deleted: {
		type: Boolean,
		default: false
	},
	own_domain: {
		type: Boolean,
		default: false
	},
	domain_id: {
		type: String,
		default: null
	},
	ecommerces: {
        type:[{
            type: mongoose.Schema.Types.Mixed
        }],
        default: []
    },
	oauth: {
		type: mongoose.Schema.Types.Mixed,
		toLowerCase: true,
		default: {}
	},
	bucket_id: {
		type: String,
		unique: true
	},
	settings: mongoose.Schema({
		image: {
			type: String
		},
		redirect_url: {
			type: String,
			trim: true
		},
		app_url: {
			type: String,
			trim: true
		},
		domain_url: {
			type: String,
			trim: true,
			default: null
		},
		cname: {
			type: String,
			trim: true
		},
	 	extension_callback_url:{
		 	type : String,
		 	trim: true,
		 	default: null
		}
	}, { _id: false }),
	user_id: {
		type: mongoose.Schema.ObjectId, ref: 'user',
		required: true
	},
	requests: {
		type: Number, 
		default: 0 
	},
	accesses: {
		type: Number, 
		default: 0 
	},
	month_requests:{
		type: Number,
		default: 0
	}
},
{
	timestamps:{
		createdAt: "created_at",
		updatedAt: "updated_at"
},
	count:{
		type: Number,
		default: {}
	}
});

app.pre('save', function(next) {
	if (this.isNew) {
		this.app_id = randomstring.generate({
			length: 32,
			charset: 'alphanumeric'
		});
		this.payments = [
			{ gateway: 'conekta', type: 'card', title: 'Credit Card' },
			{ gateway: 'conekta', type: 'oxxo', title: 'OXXO' },
			{ gateway: 'paypal', type: 'other', title: 'Paypal' }
		];
	}
	next();
});

module.exports = mongoose.model('apps', app.plugin(unique, {message: 'App name already exists.'}));

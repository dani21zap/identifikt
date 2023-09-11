'use strict';

const mongoose = require('mongoose');
const unique = require('mongoose-unique-validator');

const docs = new mongoose.Schema({
	location: {
		type: String
	},
	static_token: {
		type: Boolean
	},
	access_token: {
		type: String
	},
	routes: {
		type: [{
			type: mongoose.Schema.Types.Mixed,
		}]
	},
	videos: {
		type: [{
			type: mongoose.Schema.Types.Mixed,
		}]
	},
	docs_hot_routes: {
		type: [{
			type: mongoose.Schema.Types.Mixed,
		}]
	}
},{
	timestamps:{
		createdAt: "created_at",
		updatedAt: "updated_at"
	}
});

module.exports = mongoose.model('docs', docs);

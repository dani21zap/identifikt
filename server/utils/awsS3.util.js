'use strict';

const AWS = require('aws-sdk');
const Promise = require('bluebird');

class AWSUtil {

	constructor() {	
		AWS.config.update({
			accessKeyId : 'AKIA6AZGMEPHC5KU66MB',
			secretAccessKey : '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',
		});
		this.bucket = 'ecartapi';
	}

	upload(data, key, type ) {
		return Promise.resolve(
			new Promise((resolve, reject) => {
				// let expresion = /^data:\w+\/\w+;base64,/;
				// let contentType = data.match(expresion)[0].replace('data:', '').replace(';base64,', '');
				// key = opts.ext === true ? `${key}.${contentType.split('/')[1]}`: key
				new AWS.S3({
					params: { Bucket: this.bucket }
				})
				.putObject({
					Key: key,
					ACL: 'public-read',
					// Body: Buffer.from(data.replace(expresion, ''), 'base64'),
					Body:data,
					ContentDisposition: 'inline',
    				ContentType: type
				}, (err, data) => {
					if (err) {
						reject(err);
					}
					resolve(data);
				})
			})
		)
		.then(data => {
			return `https://${this.bucket}.s3.amazonaws.com/${key}`;
		})
		.catch(err => { throw err });
	}

	delete(key) {
		return Promise.resolve(
			new Promise((resolve, reject) => {
				new AWS.S3({
					params: { Bucket: this.bucket }
				})
				.deleteObject({
					Key: key
				}, (err, data) => {
					if (err) {
						reject(err);
					}
					resolve(data);
				})
			})
		)
		.then(data => data)
		.catch(err => { throw err });
	}

	list() {
		return Promise.resolve(
			new Promise((resolve, reject) => {
				new AWS.S3({ 
					params: { Bucket: this.bucket }
				})
				.listObjects({}, (err, data) => {
					if (err) {
						reject(err);
					}
					resolve(data);
				});
			})
		)
		.then(data => data)
		.catch(err => { throw err });
	}

}

module.exports = new AWSUtil;
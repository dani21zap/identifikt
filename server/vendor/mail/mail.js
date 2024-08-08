'use strict';

const axios = require('axios');
const striptags = require('striptags');
const fs = require('fs');
const path = require('path');

const Vue = require('vue');
const renderer = require('vue-server-renderer').createRenderer()
const twig = require('twig');
const from = 'Ecartapi.com <admin@ecartapi.com>'
class Mail {

	constructor(res) {
		this.mailgun = require('mailgun-js')({
			// apiKey: process.delete.env.MAILGUN_KEY,
			domain: 'mail.ecartapi.com'
		});
		this.res = res;
	}

	async recovery(email, link) {
		let config = Object.assign({
			link: link,
			from: from,
			to: email,
			subject: 'Password Recovery'
		});
		this.res.render('mail/recovery', {
			button: {
				text: 'Change password',
				link: config.link
			}
		}, (err, html) => {
			if (!err) {
				config.html = html;
				config.text = striptags(html);
				return this.mailgun.messages().send(config, (err,response) => {
					if (err) { console.log('err',err) };
				});
			}
		});
	}

	async confirmation(email, link) {
		let config = Object.assign({
			link: link,
			from: from,
			to: email,
			subject: 'Welcome to Ecartapi'
		});
		this.res.render('mail/confirmation', {
			button: {
				text: 'Verify email Address',
				link: config.link
			}
		}, (err, html) => {
			if (!err) {
				config.html = html;
				config.text = striptags(html);
				return this.mailgun.messages().send(config, (err, res) => {
					if (err) { console.log('mail.js-confirmation ',err) };
				});
			}
		});
	}

	async invoice(email, link, user, payment, cc_email, token) {
		// const filepath =  path.join(path.join( __dirname, '../../public/site/assets/tmp/62881828fb06cf0016349110.pdf'));
  		let pdf =  await axios.post(`${process.env.HOSTNAME}/api/payments/docs`, {
  				paymentId: payment._id, user: user
		},{
			headers: {
                    Authorization: token
                }
		} );
		payment.end = new Date(payment.end.getFullYear(), payment.end.getMonth() + 1 ,0)
		payment.end.toDateString();
		let attch = new this.mailgun.Attachment({
			data: pdf.data.invoice,
			filename:`Invoice ${payment._id}.pdf`
		});

		let config = Object.assign({
			from: from,
			cc: cc_email,
			to: email,
			subject: `Invoice ${payment.number ? payment.number : ''} for Ecartapi due ${payment.end}`,
			attachment: attch
		});
		// payment.billingUrl = `${process.delete.env.HOSTNAME}/dashboard/billing/${payment._id}`
		this.res.render('mail/invoice', {
			user: user,
			payment: payment,
			button: {
				text: 'Pay now',
				link: payment.billingUrl
			}
		}, (err, html) => {
			if (!err) {
				config.html = html;
				config.text = striptags(html);
				return this.mailgun.messages().send(config, (err, res) => {
					if (err) { console.log('mail.js-confirmation ',err) };
				});
			}
		});
	}

	async news(data, email, user) {
		let config = Object.assign({
			link: data.link,
			from: from,
			to: email,
			cc: user.settings && user.settings.cc_email ? user.settings.cc_email : null,
			bcc: data.bcc ? data.bcc : null,
			subject: data.subject
		});
		let body = {
			user: user.first_name == null ? user.company : user.first_name,
			text: data.body,
			button: {
				text: data.button && data.button.text ? data.button.text : 'Go to EcartApi',
				link: data.button && data.button.link ? data.button.link : 'https://ecartapi.com'
			}
,		};
		this.res.render('mail/news', body, (err, html) => {
			if (!err) {
				config.html = html;
				config.text = striptags(html);
				return this.mailgun.messages().send(config, (err, res) => {
					if (err) { console.log('mail.js-confirmation ',err) };
				});
			}
		});
	}
}

module.exports = Mail;

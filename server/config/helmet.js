const helmet = require('helmet');
module.exports = helmet({
	frameguard: {
		action: 'allow-from',
		domain: 'https://pay.ecart.com',
	},
});

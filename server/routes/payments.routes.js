'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controllers/payments.controller');
const auth = require('../middlewares/auth');
const { createHmac } = require('crypto');

router.get('/payments', auth, controller.payments);

router.get('/payments/:paymentId', auth, controller.paymentInfo);

router.get('/payments/:appId/stores/:paymentId', auth, controller.paymentListStores);

router.post('/invoices/all', controller.invoicesCreate);

router.post('/payment/success', (req, res, next) => {
	let hash = createHmac('sha256', process.env.PAYMENT_PRIVATE);
    hash = hash.update(req.body.data.id).digest('hex')
	if (req.query.hash !== hash) {
		return res.status(422).json({
			success: false,
			errors: 'Invalid parameters'
		});
	}
	next();
}, controller.paymentSuccess);

router.post('/payments/docs', controller.createInvoicePdf);

router.get('/payments/docs/:paymentId', auth, controller.createInvoicePdf);

router.delete('/payments/docs/:paymentId', auth, controller.deleteInvoicePdf);

router.post('/payments/notice', controller.emailNotifications);

module.exports = router;

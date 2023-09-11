'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controllers/webhooks.controller');

router.get('/', controller.getOneWebhook);

router.get('/all', controller.getAllWebhook);

router.post('/', controller.createWebhooks);

router.post('/multi', controller.createMultiWebhooks);

router.delete('/', controller.deleteWebhook);

router.put('/:id', controller.updateWebhooks);

module.exports = router;
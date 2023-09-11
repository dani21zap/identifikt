'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controllers/services.controller');
const auth = require('../middlewares/auth');

router.get('/ecommerces', controller.ecommerces);

router.get('/ecommerces/resources', controller.resources);

router.get('/countries', controller.countries);

router.post('/news', controller.newsletters);

router.get('/docs/:location', controller.docs);

module.exports = router;

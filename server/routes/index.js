const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');

router.use('/oauth', require('./oauth.routes'));

router.use('/api', require('./users.routes'));

router.use('/api', require('./payments.routes'));

router.use('/api/engomados', require('./engomados.routes'));

router.use('/api/services', require('./services.routes'));

router.use('/api/webhooks', auth, require('./webhooks.routes'));

// api/migration -> get, update, create

module.exports = router;

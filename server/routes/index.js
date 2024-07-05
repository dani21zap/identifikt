const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');

router.use('/api', require('./users.routes'));

router.use('/api/engomados', require('./engomados.routes'));

module.exports = router;

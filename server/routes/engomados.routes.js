'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controllers/engomados.controller');
const upload = require('../middlewares/upload');
const auth = require('../middlewares/auth');

router.get('/', auth, controller.listEngomados);

router.post('/img/upload/:id?', auth, upload.single("file"), controller.uploadImg);

router.get('/:id', auth, controller.infoEngomado);

router.post('/', auth, controller.createEngomado);

// router.put('/:id', auth, controller.updateApp);

module.exports = router;

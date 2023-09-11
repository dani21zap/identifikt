'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controllers/apps.controller');
const upload = require('../middlewares/upload');
const auth = require('../middlewares/auth');

router.get('/', auth, controller.listApps);

router.post('/img/upload/:id?', auth, upload.single("file"), controller.uploadImg);

router.get('/stores', auth, controller.listStores);

router.get('/:id', auth, controller.infoApp);

router.post('/', auth, controller.createApp);

router.put('/:id', auth, controller.updateApp);

router.put('/:id/domain', auth, controller.updateAppDomain);

router.put('/:id/ecommerce', auth, controller.updateAppEcommerce);

router.put('/:id/oauth', auth, (req, res, next) => {
    if (req.query.pattern) {
        req.query.pattern = req.query.pattern.split(',');
        let validations = { error: false, messages: [] };
        req.query.pattern.forEach(item => {
            if (item !== 'scopes') {
                if (req.body[req.query.ecommerce][item] == '' || !req.body[req.query.ecommerce][item]) {
                    validations.messages.push(`${ item.toUpperCase() } is required`);
                }
            } else {
                if (req.body[req.query.ecommerce].scopes.length == 0) {
                    validations.messages.push(`SCOPES are required`);
                }
            }
        });
        validations.error = validations.messages.length > 0 ? true : false;
        if (validations.error) {
            let errors = validations.messages.join(',');
            throw new BadRequestError(errors);
        }
    }
    next();
}, controller.updateAppKeysAndScopes);

router.delete('/:id/oauth/:ecommerce', auth, controller.deleteAppKeysAndScopes);

router.delete('/:id', auth, controller.deleteApp);

router.get('/:appId/stores/:id', auth, controller.infoStore);

router.put('/:appId/stores/:id', auth, controller.updateStore);

router.delete('/:appId/stores/:id', auth, controller.deleteStore);

module.exports = router;

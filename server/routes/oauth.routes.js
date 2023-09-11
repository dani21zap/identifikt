'use strict';

const express = require('express');
const router = express.Router();

router.get('/:id', (req, res, next) => {
    try {
        res.redirect(`${process.env.OAUTH_URL}${req.url}`);
    } catch (error) {
        next(error);
    }
});


module.exports = router;

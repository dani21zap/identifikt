'use strict';
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        let token = req.get('Authorization')
        var decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded
        return next();
    } catch(err) {
        if(req.originalUrl == '/api/apps'){
            return next();
        }
        throw new UnauthorizedError('Unauthorized user. Header is missing')
    }
}

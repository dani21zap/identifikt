const path = require('path');
require('dotenv').config({path: path.resolve(__dirname, '../.env')});
global.Joi = require('@hapi/joi');

const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const app = express();
const routes = require('./routes');
const csurf = require('csurf');
const csrf = csurf({ cookie: true });
const helmet = require('helmet')


require('./config/database.connection').run();
app.use(require('./config/compression'));
app.disable('x-powered-by');
app.enable('trust proxy');
global.Joi = require('@hapi/joi');
global.rootDir = path.dirname(require.main.filename)

app.use(cors());
app.use(helmet({ 
	contentSecurityPolicy: false,
	referrerPolicy: { policy: 'origin' }
}))
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'twig');
app.settings.views = path.join(__dirname, './views');
app.use(logger('dev'));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use(require('./middlewares/ensure-ssl'));
app.use(routes);
// app.use(csrf);
// app.use("/oauth",require('./routes/oauth.routes'));
// error handler
global.BadRequestError = require('./errors/badrequest.error');
global.UnauthorizedError = require('./errors/unauthorized.error');
global.NotFoundError = require('./errors/notfound.error');
global.ConflictError = require('./errors/conflict.error');
global.UnprocessableError = require('./errors/unprocessable.error');
app.use(require('./middlewares/error'));

module.exports = { path: '/', handler: app };

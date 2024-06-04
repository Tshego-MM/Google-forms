require('dotenv').config();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/userRoute');
var responseRouter = require('./routes/responseRoute');
var formRouter = require('./routes/formRoute');

var {ensureSecure,verifyJWT} = require('./middleware/ensureSecure');
var rateLimit = require('./middleware/reateLimit');

var app = express();


const corsOptions = {
    origin: 'http://localhost:4200', //front-end url
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(ensureSecure);//comment this line in dev
app.use(verifyJWT)
app.use(rateLimit);

app.use('/api/', indexRouter);
app.use('/api/users', usersRouter);
app.use('/api/responses', responseRouter);
app.use('/api/forms',formRouter);



module.exports = app;

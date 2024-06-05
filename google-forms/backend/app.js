require('dotenv').config();
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/userRoute');
const responseRouter = require('./routes/responseRoute');
const formRouter = require('./routes/formRoute');
const loginRouter=require("./routes/loginRoute")
const {ensureSecure,verifyJWT} = require('./middleware/ensureSecure');
const rateLimit = require('./middleware/reateLimit');
const logRequests = require('./middleware/loggerMiddleware');

const app = express();


const corsOptions = {
    origin: 'http://localhost:4200', //front-end url
    optionsSuccessStatus: 200
};



app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(ensureSecure);//comment this line in dev
app.use(rateLimit);
app.use(logRequests);
app.use(cors(corsOptions));


app.use("/api/login",loginRouter);
app.use('/api/', indexRouter);
app.use('/api/users',verifyJWT, usersRouter);
app.use('/api/responses',verifyJWT, responseRouter);
app.use('/api/forms',verifyJWT,formRouter);


module.exports = app;

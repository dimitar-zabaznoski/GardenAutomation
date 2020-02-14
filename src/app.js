const env = require('dotenv').config();
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes');
const usersRouter = require('./routes/user');
const flowerRouter = require('./routes/flower');

const app = express();

const mongoUrl = process.env.MONGO_URL || 'mongodb://localhost:27017';

// view engine setup
app.set('views', path.join(__dirname, 'ui/views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/flowers', flowerRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
    next(createError(404));
});

// error handler

app.use((err, req, res, next) => { // eslint-disable-line
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = 'development' === req.app.get('env') ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

// DB
const {MongoClient} = require('mongodb');
const assert = require('assert');

const mongoose = require('mongoose');

const dbName = 'FlowerIO';

mongoose.connect(mongoUrl, {useNewUrlParser: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('DB connected');
});

module.exports = app;

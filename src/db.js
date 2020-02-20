'use strict'; // ALWAYS

const mongoose = require('mongoose');

const ENV = require('./util/env.util.js');
const {tie} = require('./util/function.util.js');
const LOG = require('./util/log.util.js');
const PROC = require('./util/process.util.js');


mongoose.connect(
    ENV.val('mongoUri'),
    {
        useNewUrlParser:    true,
        useUnifiedTopology: true,
    }
).catch(PROC.fail);

const db = mongoose.connection;


db.on('error', tie(LOG.alert$, 'db.js: connection error:'));
db.once('open', () => void LOG.info$('db.js: connected'));


module.exports = db;

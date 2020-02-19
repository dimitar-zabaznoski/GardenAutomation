'use strict'; // ALWAYS

const mongoose = require('mongoose');

const ENAME = require('./etc/env-name.const.js');
const DEFAULT = require('./etc/default.const.js');
const {tie} = require('./util/function.util.js');
const LOG = require('./util/log.util.js');
const ENV = require('./util/env.util.js');


mongoose.connect(
    ENV.get(DEFAULT.mongoUri, ENAME.mongoUri),
    {
        useNewUrlParser:    true,
        useUnifiedTopology: true,
    }
);

const db = mongoose.connection;


db.on('error', tie(LOG.alert, 'db.js: connection error:'));
db.once('open', () => void LOG.info('db.js: connected'));


module.exports = db;

'use strict'; // ALWAYS

const mongoose = require('mongoose');

const ENV = require('./util/env.util.js');
const {tie} = require('./util/function.util.js');
const LOG = require('./util/log.util.js');
const PROC = require('./util/process.util.js');


module.exports = (

    () => {

        const uris = ENV.val('mongoUri');
        const options = {useNewUrlParser: true, useUnifiedTopology: true};

        mongoose.connect(uris, options).catch(PROC.fail);

        const db = mongoose.connection;

        db.on('error', tie(LOG.alert$, 'db.js: connection error:'));
        db.once('open', tie(LOG.info$, 'db.js: connected'));

        return db;

    }

);

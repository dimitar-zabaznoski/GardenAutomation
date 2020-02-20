'use strict'; // ALWAYS

const {resolve} = require('path');
const dotenv = require('dotenv');

const DEFAULT = require('./etc/default.const.js');
const ENAME = require('./etc/env-name.const.js');
const ENV = require('./util/env.util.js');
const PROC = require('./util/process.util.js');


PROC.onErrors((error, origin) => {
    console.error('Exception origin:', origin); // eslint-disable-line no-console
    console.error('Caught exception: ', error); // eslint-disable-line no-console
});

// load process.ENV with values from .env files
const env = dotenv.config({path: resolve('.env')});

if (env.error) {
    PROC.fail$('dotenv failed', env.error);
}

// init db and server
require('./db.js'); // TODO: @azder: make db return init function like server
const server$ = require('./server.js');


// run server with ENV parameters
server$({
    port:      ENV.port(DEFAULT.port, ENAME.port),
    statics:   ENV.val('statics'),
    routepath: ENV.val('routedir'),
});

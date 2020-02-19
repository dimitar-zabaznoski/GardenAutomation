'use strict'; // ALWAYS


const onError$ = (
    (error, origin) => {
        console.error('Exception origin:', origin); // eslint-disable-line no-console
        console.error('Caught exception: ', error); // eslint-disable-line no-console
    }
);

process.on('uncaughtException', onError$);
process.on('unhandledRejection', onError$);


// load process.ENV with values from .env files
const {resolve} = require('path');
const dotenv = require('dotenv');

const DEFAULT = require('../src/etc/default.const.js');
const ENAME = require('./etc/env-name.const.js');
const ENV = require('../src/util/env.util.js');


const path = resolve('.env');
const env = dotenv.config({path});

if (env.error) {
    onError$(env.error, 'custom: dotenv');
    process.exit(require('./etc/exit-code.enum.js').fail);
}


require('./db.js');
const server$ = require('./server.js');


// run server with ENV parameters
server$({
    port:      ENV.port(DEFAULT.port, ENAME.port),
    statics:   process.env.STATICS,
    routepath: process.env.ROUTEPATH,
});

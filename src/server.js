// add this to each file for node commonjs
// when sourceType is 'script' and impliedStrict is false

'use strict'; // ALWAYS


// side effect, fills process.env from .env file
require('dotenv').config();


const {resolve} = require('path');
const express = require('express');
const morgan = require('morgan');
const glob = require('glob');

const DEFAULT = require('../src/etc/default.const.js');
const {createRouter} = require('./util/express.util.js');
const LOG = require('../src/util/log.util.js');
const IS = require('../src/util/is.util.js');
const XC = require('../src/etc/exit-code.enum.js');

const sender$ = require('./mw/sender.mw.js');

const indexRouter = require('./route/index.manual-route.js');


module.exports = (


    ({
        port = DEFAULT.port,
        statics = DEFAULT.statics,
        routedir = DEFAULT.routedir,
    }) => {


        const server$ = express();

        if (statics) {
            server$.use(express.static(statics));
        }

        server$.use(morgan('dev'));
        server$.use(express.json());
        // app.use(express.urlencoded({extended: false}));


        // ATTACH ROUTES

        glob.sync(`${routedir}/**/*.route.js`).forEach(fileName => {

            const fullPath = resolve(fileName);

            // LOG.info(`exposing ${fileName}...`);

            server$.use('/v1', require(fullPath)(createRouter()));

        });

        server$.use('/', indexRouter(createRouter()));
        // server$.use('/users', usersRouter);
        // server$.use('/flowers', flowerRouter);

        // EVENT LISTENERS

        /** Event listener for HTTP server "error" event */
        const onError = (
            error => {

                if ('listen' !== error.syscall) {
                    throw error;
                }

                const bind = IS.string(port)
                    ? `Pipe ${port}`
                    : `Port ${port}`;

                // handle specific listen errors with friendly messages
                if ('EACCES' === error.code) {
                    LOG.alert(`${bind} requires elevated privileges`);
                    process.exit(XC.fail);
                }

                if ('EADDRINUSE' === error.code) {
                    LOG.alert(`${bind} is already in use`);
                    process.exit(XC.fail);
                }

                throw error;

            }
        );

        /** Event listener for HTTP server "listening" event */
        const onListening = (
            () => {
                const addr = server$.address();
                const bind = (
                    IS.string(addr)
                        ? `pipe ${addr}`
                        : `port ${addr.port}`
                );
                LOG.info(`index.js: listening on ${bind}...`);
            }
        );


        // MAIN

        server$.on('error', onError);
        server$.on('listening', onListening);

        server$.use(sender$);
        server$.listen(port);

        return server$;

    }

);

'use strict'; // ALWAYS


const XC = require('../etc/exit-code.enum.js');
const LOG = require('./log.util.js');


const fail$ = (

    (...message) => {
        LOG.alert$(...message);
        process.exit(XC.fail);
    }

);


const onErrors = (

    listener$ => {
        process.on('uncaughtException', listener$);
        process.on('unhandledRejection', listener$);
    }

);


module.exports = Object.freeze({

    fail$,
    onErrors,

});


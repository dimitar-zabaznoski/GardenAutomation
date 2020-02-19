'use strict'; // ALWAYS


const DEFAULT = require('../etc/default.const.js');
const EC = require('../etc/error-code.enum.js');
const ENAME = require('../etc/env-name.const.js');
const ENV = require('../util/env.util.js');
const LOG = require('../util/log.util.js');
const {df} = require('../util/object.util.js');


const REDACTED = 'error details redacted';


module.exports = (

    // noinspection JSUnusedLocalSymbols
    // eslint-disable-next-line no-unused-vars
    (err, req, res, next) => { // must have 4 params for Express

        const {stack, status, message, code, meta = {}} = err;
        const {ctype, location} = meta;


        // eslint-disable-next-line no-console
        LOG.alert(stack);

        res.status(df(DEFAULT.hcode, status));

        res.header(`Content-Type: ${df(DEFAULT.ctype, ctype)}`);

        if (location) {
            res.header(`Location: ${location}`);
        }


        const showError = ENV.get(DEFAULT.showError, ENAME.showError);

        res.json({
            code:    df(EC.server, code),
            message: showError ? message : REDACTED,
            data:    showError ? stack && stack.split('\n') : [REDACTED],

        });

    }

);

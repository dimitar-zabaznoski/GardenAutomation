'use strict'; // ALWAYS


const DEFAULT = require('../etc/default.const.js');
const EC = require('../etc/error-code.enum.js');
const ENV = require('../util/env.util.js');
const LOG = require('../util/log.util.js');
const {df} = require('../util/object.util.js');
const R = require('../util/responder.util.js');


const REDACTED = 'error details redacted';


module.exports = (

    // noinspection JSUnusedLocalSymbols
    // eslint-disable-next-line no-unused-vars
    (err, req, res, next) => { // must have 4 params for Express

        const {stack, status, message, code} = err;

        // eslint-disable-next-line no-console
        LOG.alert$(stack);

        res.status(df(DEFAULT.hcode, status));

        const showError = ENV.val('showError');

        // eslint-disable-next-line new-cap
        res.json(R.espond(
            df(EC.server, code),
            showError ? message : REDACTED,
            showError ? stack && stack.split('\n') : [REDACTED]
        ));

    }

);


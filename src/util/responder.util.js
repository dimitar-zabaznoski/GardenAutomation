'use strict'; // ALWAYS

const EC = require('../etc/error-code.enum.js');
const ec2hc = require('../etc/ec2hc.mapper.js');
const ec2xc = require('../etc/ec2xc.mapper.js');
const {tie} = require('./function.util.js');
const {freeze$} = require('./object.util.js');


const responder = (

    (
        ecode = EC.ok,
        message = 'success',
        data = null,
        meta = {},
    ) => (
        {

            // the error, https status and cli exit codes
            ecode,
            hcode: ec2hc(ecode),
            xcode: ec2xc(ecode),

            // dev message and other meta information
            message,
            meta,

            // actual data
            data,

        }
    )

);


responder.ok = tie(responder, EC.ok);
responder.created = (

    (
        location,
        message = 'created',
        data = null,
        meta = {},
    ) => responder(
        EC.created,
        message,
        data,
        {...meta, location}
    )

);


responder.notFound = tie(responder, EC.notFound);
responder.invalid = tie(responder, EC.semantic);
responder.server = tie(responder, EC.server);
responder.notImplemented = tie(responder, EC.notImplemented);


freeze$(responder);
module.exports = responder;

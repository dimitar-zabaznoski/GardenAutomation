'use strict'; // ALWAYS


const DEFAULT = require('../etc/default.const.js');
const LOG = require('../util/log.util.js');
const HC = require('../etc/http-code.enum.js');
const R = require('../util/responder.util.js');
const {compose} = require('../util/function.util.js');


const message = compose(R.notFound, LOG.info$);


module.exports = (

    (req, res) => void res
        .status(HC.notFound)
        .header(`Content-Type: ${DEFAULT.ctype}`)
        .json(message(`404 not found @ ${req.method} ${req.originalUrl}`))

);

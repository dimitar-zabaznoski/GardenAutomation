'use strict'; // ALWAYS


const EC = require('./error-code.enum.js');


/**
 *
 *  Returns 0 for OK codes, 1 otherwise
 *
 * @type {function(*=): number}
 */
module.exports = (

    ec => String(ec).startsWith(EC.ok) ? 0 : 1

);

'use strict'; // ALWAYS


const {tie} = require('./function.util.js');

/**
 * A generic logger used to create more specialized loggers
 *
 * @type {function(*): function(...[*]): *}
 */
const logger = (

    (method, ...args) => {

        console[method](...args); // eslint-disable-line no-console
        return args.pop();

    }

);


const alert$ = tie(logger, 'error');
const info$ = tie(logger, 'log');


module.exports = Object.freeze({

    alert$,
    info$,

});

'use strict'; // ALWAYS


const freeze$ = Object.freeze;


/**
 *
 * Works like ?? from the new ECMAScript proposals
 *
 * @type {function(!*, *): !*}
 */

const df = (


    (defaultValue, value) => (

        null === value || void 0 === value
            ? defaultValue
            : value

    )

);


module.exports = Object.freeze({

    df,
    freeze$,


});


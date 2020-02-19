'use strict'; // ALWAYS


const nil = (

    value => null === value || void 0 === value

);


const string = (
    // eslint-disable-next-line prefer-template
    value => 'symbol' !== typeof value && ('' + value === value)
);


module.exports = Object.freeze({

    nil,
    string,

});

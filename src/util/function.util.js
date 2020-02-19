'use strict'; // ALWAYS

const tie = (

    (fn, ...params) => fn.bind(null, ...params)

);


module.exports = Object.freeze({

    tie,


});

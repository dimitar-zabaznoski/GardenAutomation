'use strict'; // ALWAYS

const tie = (

    (fn, ...params) => fn.bind(null, ...params)

);


const reducer = (arg, fn) => fn(arg);

const compose = (

    (...fns) => arg => fns.reduceRight(reducer, arg)

);


module.exports = Object.freeze({

    tie,
    compose,

});

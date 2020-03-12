'use strict'; // ALWAYS


const Validation = require('folktale/validation/index.js');
const Result = require('folktale/result/index.js');

const {Success: success, Failure: failure} = Validation;
const {Ok: ok, Error: error} = Result;


const invalid = (

    result => Validation.Failure.hasInstance(result) || Result.Error.hasInstance(result)

);


module.exports = Object.freeze({

    // from Result
    ok,
    error,

    // from Validation
    success,
    failure,

    // custom
    invalid,

});

'use strict'; // ALWAYS

const DEFAULT = require('../etc/default.const.js');
const ENAME = require('../etc/env-name.const.js');


const get = (

    (defaultValue, name) => process.env[name] || defaultValue

);

const val = (
    name => get(DEFAULT[name], ENAME[name])
);


const port = (

    (defaultValue, name) => {

        const string = process.env[name] || defaultValue;
        const parsed = parseInt(string, 10);

        if (isNaN(parsed)) {
            return string; // it is named pipe
        }

        // port is only positive, but has high limit, not checked here
        return (0 <= parsed ? parsed : false);

    }

);


module.exports = Object.freeze({
    port,
    get,
    val,
});

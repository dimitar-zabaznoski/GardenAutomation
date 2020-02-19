'use strict'; // ALWAYS

const get = (

    (defaultValue, name) => process.env[name] || defaultValue

);


const port = (

    (defaultValue, name) => {

        const val = process.env[name] || defaultValue;
        const prt = parseInt(val, 10);

        if (isNaN(prt)) {
            // named pipe
            return val;
        }

        // port can only be positive
        // but also has high limit, not checked here
        return (0 <= prt ? prt : false);

    }

);


module.exports = Object.freeze({
    port,
    get,
});

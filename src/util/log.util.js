'use strict'; // ALWAYS


const alert = console.error.bind(console); // eslint-disable-line no-console

const info = console.log.bind(console); // eslint-disable-line no-console


module.exports = Object.freeze({
    alert,
    info,
});

'use strict'; // ALWAYS


const {wrapSync} = require('../util/express.util.js');
const R = require('../util/responder.util.js');


const PATH = '/';


module.exports = (

    router => router.get(
        PATH,
        wrapSync(() => R.ok(
            'greeting',
            'This is not the route you\'re looking for'
        ))
    )

);

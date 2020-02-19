'use strict'; // ALWAYS


const {wrapSync} = require('../util/express.util.js');
const R = require('../util/responder.util.js');


const PATH = '/user';


module.exports = (

    router => router
        .get(
            PATH,
            wrapSync(() => R.ok('respond with user data', {}))
        )
        .post(
            PATH,
            wrapSync(() => R.notImplemented())
        )

);



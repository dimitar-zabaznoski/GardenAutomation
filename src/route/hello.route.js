'use strict'; // ALWAYS


const {wrapSync} = require('../util/express.util.js');
const R = require('../util/responder.util.js');


const PATH = '/hello';


module.exports = (

    router => router
        .get(
            PATH,
            wrapSync(() => R.ok('display greeting', 'hello world'))
        )
        .post(
            PATH,
            wrapSync(() => R.notImplemented())
        )

);



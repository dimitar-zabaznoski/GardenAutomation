const EC = require('./error-code.enum.js');
const HC = require('./http-code.enum.js');
const DEFAULT = require('./default.const.js');
const {df} = require('../util/object.util.js');


const MAPPING = Object.freeze({

    [EC.ok]:      HC.ok,
    [EC.created]: HC.created,
    [EC.client]:  HC.client,
    [EC.server]:  HC.server,
    [EC.invalid]: HC.semantic,

});


module.exports = (

    ec => df(DEFAULT.hcode, MAPPING[ec])

);

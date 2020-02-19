'use strict'; // ALWAYS

const {define} = require('../util/mongo.util.js');


module.exports = define(
    'ActionLog',
    {
        atMoisture:  Number,
        atTemp:      Number,
        newMoisture: Number,
        newTemp:     Number,
        waterLog:    String,
    }
);

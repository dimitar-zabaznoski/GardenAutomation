'use strict'; // ALWAYS

const {define} = require('../util/mongo.util.js');


module.exports = define(
    'WaterConsumption',
    {
        name:                 String,
        minMoistureThreshold: Number,
        waterConsumption:     {
            type:    String,
            enum:    ['low', 'moderate', 'high'],
            default: 'moderate',
        },
        waterAfterDays:       Number,
    }
);


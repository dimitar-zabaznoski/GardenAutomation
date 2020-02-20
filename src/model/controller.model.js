'use strict'; // ALWAYS

const {define, reference} = require('../util/mongo.util.js');
const Flower = require('./flower.model.js');


module.exports = define(
    'Controller',
    {
        name:         String,
        model:        String,
        serialNumber: String,
        url:          String,

        chanelType: {
            type:    String,
            enum:    ['wifi', 'bluetooth'],
            default: 'wifi',
        },

        flowers: reference(Flower.NAME),

    }
);



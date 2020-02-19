'use strict'; // ALWAYS


const mongoose = require('mongoose');
const {define} = require('../util/mongo.util.js');


module.exports = define(
    'Controller',
    {
        name:         String,
        model:        String,
        serialNumber: String,
        url:          String,
        chanelType:   {
            type:    String,
            enum:    ['wifi', 'bluetooth'],
            default: 'wifi',
        },
        flowers:      [{
            type: mongoose.Schema.Types.ObjectId,
            ref:  'Flower',
        }],
    }
);



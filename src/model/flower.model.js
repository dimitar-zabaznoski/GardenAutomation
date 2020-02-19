'use strict'; // ALWAYS


const mongoose = require('mongoose');

const ActionLog = require('./action-log.model.js');
const WaterConsumption = require('./water-consumption.model.js');

const {define, reference} = require('../util/mongo.util.js');

module.exports = define(
    'Flower',
    {
        _id:              {
            type:     mongoose.Schema.Types.ObjectId,
            // index:    true,
            required: true,
            auto:     true,
        },
        friendlyName:     String,
        speciesName:      String,
        waterConsumption: reference(WaterConsumption.NAME),
        actionLogs:       [ActionLog.SCHEMA],

    }
);

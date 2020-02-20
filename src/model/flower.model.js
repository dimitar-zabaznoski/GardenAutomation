'use strict'; // ALWAYS


const MT = require('../etc/mongo-type.enum.js');

const ActionLog = require('./action-log.model.js');
const WaterConsumption = require('./water-consumption.model.js');

const {define, reference} = require('../util/mongo.util.js');

module.exports = define(
    'Flower',
    {
        _id:              MT.auto,
        friendlyName:     String,
        speciesName:      String,
        waterConsumption: reference(WaterConsumption.NAME),
        actionLogs:       [ActionLog.SCHEMA],

    }
);

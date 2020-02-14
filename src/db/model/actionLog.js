let mongoose = require('mongoose');

let actionLogSchema = new mongoose.Schema({
    atMoisture: Number,
    atTemp: Number,
    newMoisture: Number,
    newTemp: Number,
    waterLog: String
});

module.exports = actionLogSchema;

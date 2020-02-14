const mongoose = require('mongoose');
const actionLogSchema = require('./actionLog');

const flowerSchema = new mongoose.Schema({
    friendlyName: String,
    speciesName: String,
    waterConsumption: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'WaterConsumption',
    },
    actionLogs: [actionLogSchema],
});

const Flower = mongoose.model('Flower', flowerSchema);

module.exports = Flower;

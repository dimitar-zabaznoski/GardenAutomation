let mongoose = require('mongoose');

let waterConsumptionSchema = new mongoose.Schema({
    name: String,
    minMoistureThreshold: Number,
    waterConsumption: {
        type: String,
        enum: ['low', 'moderate', 'high'],
        default: 'moderate'
    },
    waterAfterDays: Number
});

let WaterConsumption = mongoose.model('WaterConsumption', waterConsumptionSchema);

module.exports = WaterConsumption;


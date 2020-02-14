let mongoose = require('mongoose');

let controllerSchema = new mongoose.Schema({
    name: String,
    model: String,
    serialNumber: String,
    url: String,
    chanelType: {
        type: String,
        enum: ['wifi', 'bluetooth'],
        default: 'wifi'
    },
    flowers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Flower'
    }]
});

let Controller = mongoose.model('Controller', controllerSchema);

module.exports = Controller;


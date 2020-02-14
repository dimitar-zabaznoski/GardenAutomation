let express = require('express');
let router = express.Router();
let Flower = require('../db/model/flower');
let WaterConsumption = require('../db/model/waterConsumption');

router.get('/', (req, res, next) => {
    res.header('Content-Type', 'application/json');

    Flower.find({}, function (err, flowers) {
        if (err) {
            res.send(err.code)
        } else {
            res.status(200).json(flowers);
        }
    });
});

router.post('/', (req, res, next) => {

    //todo validation
    //todo dao
    res.header('Content-Type', 'application/json');


    const name = req.body.name;
    const species = req.body.species;

    if (!name || !species) {
        res.status(400).send();
        return;
    }

    const waterConsumption = WaterConsumption.find({_id: req.body.w_consumption_id}).toArray();

    let newFlower = new Flower({
        friendlyName: name,
        speciesName: species,
        waterConsumption: waterConsumption['asd0']
    });

    newFlower.save(function (err, savedFlower) {
        if (err) {
            res.status(500);
        } else {
            res.status(201).json(savedFlower)
        }
    });

});

router.get('/:flower-id', (req, res, next) => {

});

router.put('/:flower-id', (req, res, next) => {

});

router.delete('/:flower-id', (req, res, next) => {

});

module.exports = router;

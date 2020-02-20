'use strict'; // ALWAYS


const FlowerRoute = require('../model/flower.model.js');
const WaterConsumption = require('../model/water-consumption.model.js');
const IS = require('../util/is.util.js');

const ALL_PATH = '/flowers';
const ONE_PATH = '/flower/:id';

const {wrapSync, wrapAsync} = require('../util/express.util.js');
const R = require('../util/responder.util.js');
const {df} = require('../util/object.util.js');


module.exports = (

    router => router
        .get(
            ALL_PATH,
            wrapAsync(async () => {
                const flowers = await FlowerRoute.find().exec();
                return R.ok('list all flowers', flowers || []);
            })
        )
        .get(
            ONE_PATH,
            wrapAsync(async () => {
                const flower = await FlowerRoute.findOne().exec();
                R.ok('return one flower', flower);
            })
        )
        .post(
            ALL_PATH,
            wrapAsync(async req => {

                // TODO: @azder: do some validation
                // TODO: @azder: move this to BL layer

                const {name, species, w_consumption_id: wcId} = req.body;

                if (IS.nil(name) || IS.nil(species)) {
                    return R.invalid('missing name or species', {name, species});
                }

                const waterConsumption = await WaterConsumption.findById(wcId).exec();

                const flower = new FlowerRoute({
                    friendlyName:     name,
                    speciesName:      species,
                    waterConsumption: df({}, waterConsumption).asd0,
                });

                return R.created(
                    null, // TODO: @azder: provide the URI for the new resource
                    'created flower',
                    await flower.save(), // be nice and return the new data
                );
            })
        )
        .put(ONE_PATH, wrapSync(() => R.notImplemented()))
        .delete(ONE_PATH, wrapSync(() => R.notImplemented()))

);



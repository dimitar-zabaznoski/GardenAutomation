'use strict'; // ALWAYS

const FlowerRoute = require('../model/flower.model.js');

const createFlower$ = require('../service/create-flower.service.js');

const {wrapSync, wrapAsync} = require('../util/express.util.js');
const R = require('../util/responder.util.js');
const {invalid} = require('../util/folktale.util.js');
const {idOf} = require('../util/mongo.util.js');


const ALL_PATH = '/flowers';
const SEG_PATH = 'flower';
const ONE_PATH = `/${SEG_PATH}/:id`;


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

                const {name, species, w_consumption_id: waterConsumptionId} = req.body;

                const result = await createFlower$({name, species, waterConsumptionId});
                const {value} = result;

                if (invalid(result)) {
                    return R.invalid('invalid flower data', value);
                }

                const id = idOf(value);

                return R.created(
                    id ? `${req.baseUrl}/${SEG_PATH}/${id}` : null,
                    'created flower',
                    value, // be nice and return the new data
                );

            })
        )
        .put(ONE_PATH, wrapSync(() => R.notImplemented('sorry #2')))
        .delete(ONE_PATH, wrapSync(() => R.notImplemented('sorry #3')))

);



'use strict'; // ALWAYS

const WaterConsumption = require('../model/water-consumption.model.js');

const {tie} = require('../util/function.util.js');
const IS = require('../util/is.util.js');
const LOG = require('../util/log.util.js');
const {failure, success, invalid, ok, error} = require('../util/folktale.util.js');


const info$ = tie(LOG.info$, __filename.split('/').pop());


const validate = (

    ({id}) => (

        IS.there(id)
            ? success({id})
            : failure({message: 'id is missing', data: {id, name: WaterConsumption.NAME}})

    )

);


const waterConsumptionById = (

    async data => {

        const validation = validate(data);
        if (invalid(validation)) {
            return info$('createFlower$()', 'bailing save b/c', validation);
        }

        const {id} = data;
        const waterConsumption = await WaterConsumption.findById(id).exec();

        return waterConsumption ? ok(waterConsumption) : error(waterConsumption);

    }

);


waterConsumptionById.validate = validate;
module.exports = waterConsumptionById;

'use strict'; // ALWAYS


const Flower = require('../model/flower.model.js');
const {tie} = require('../util/function.util.js');
const IS = require('../util/is.util.js');
const LOG = require('../util/log.util.js');
const {invalid, success, failure, ok, error} = require('../util/folktale.util.js');
const {df} = require('../util/object.util.js');
const waterConsumptionById = require('./water-consumption-by-id.service.js');


const info$ = tie(LOG.info$, __filename.split('/').pop()); // TODO: @azder: move to utility


const validate = (

    ({name, species}) => (

        IS.there(name) && IS.there(species)
            ? success({name, species})
            : failure({message: 'missing name or species', data: {name, species}})
    )

);


const createFlower$ = (

    async data => {

        const validation = validate(data);
        if (invalid(validation)) {
            return info$('createFlower$()', 'bailing save b/c', validation);
        }

        const {name, species, waterConsumptionId} = data;
        const found = await waterConsumptionById({id: waterConsumptionId});

        if (invalid(found)) {
            return info$('createFlower$()', 'bailing save b/c', found);
        }

        const {value: wc} = found;

        const saved = await (
            new Flower({
                friendlyName:     name,
                speciesName:      species,
                waterConsumption: df({}, wc),
            })
        ).save(); // TODO: @azder: use utility save$ for boilerplate

        return saved ? ok(saved) : error(saved);

    }
);


createFlower$.validate = validate;
module.exports = createFlower$;

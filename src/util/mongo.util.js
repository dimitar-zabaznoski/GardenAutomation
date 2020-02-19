'use strict'; // ALWAYS

const mongoose = require('mongoose');
const {Schema} = mongoose;
const {ObjectId} = Schema.Types;


/** @typedef {Model & {NAME:string,SCHEMA:Schema} } MongooseModel */

/** @type {function(string,object,object=):MongooseModel} */
const define = (
    (name, definition, options) => {

        definition = {
            _id:      ObjectId,
            created:  Date,
            modified: Date,
            deleted:  Date,
            archived: Date,
            ...definition,
        };

        const schema = new Schema(definition, options);
        const model = mongoose.model(name, schema);

        model.NAME = name;
        model.SCHEMA = schema;

        return model;

    }
);


const reference = (

    name => ({type: ObjectId, ref: name})

);


module.exports = Object.freeze({
    define,
    reference,
});

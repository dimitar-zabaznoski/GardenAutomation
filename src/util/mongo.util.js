'use strict'; // ALWAYS

const {Schema, model} = require('mongoose');
const MT = require('../etc/mongo-type.enum.js');


const define = (
    (name, definition, options) => {

        const d = {
            _id:        MT.id,
            createdAt:  Date,
            updatedAt:  Date,
            deletedAt:  Date,
            archivedAt: Date,
            ...definition,
        };

        const o = {
            timestamps: true,
            ...options,
        };

        const s = new Schema(d, o);
        const m = model(name, s);

        m.NAME = name;
        m.SCHEMA = s;

        return m;

    }
);


const reference = (

    name => ({type: MT.id, ref: name})

);


const idOf = (

    // eslint-disable-next-line no-underscore-dangle
    document => document && (document._id || document.id)

);

module.exports = Object.freeze({
    define,
    reference,
    idOf,
});

'use strict'; // ALWAYS

const {Schema, model} = require('mongoose');
const MT = require('../etc/mongo-type.enum.js');


const define = (
    (name, definition, options) => {

        const d = {
            _id:      MT.id,
            created:  Date,
            modified: Date,
            deleted:  Date,
            archived: Date,
            ...definition,
        };

        const s = new Schema(d, options);
        const m = model(name, s);

        m.NAME = name;
        m.SCHEMA = s;

        return m;

    }
);


const reference = (

    name => ({type: MT.id, ref: name})

);


module.exports = Object.freeze({
    define,
    reference,
});

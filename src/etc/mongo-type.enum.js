'use strict'; // ALWAYS


const {Schema: {Types: types}} = require('mongoose');


module.exports = Object.freeze({

    id:     types.ObjectId,
    auto: Object.freeze({
        type:     types.ObjectId,
        required: true,
        auto:     true,
    }),

    array:   types.Array,
    boolean: types.Boolean,
    date:    types.Date,
    number:  types.Number,
    string:  types.String,


});





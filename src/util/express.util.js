'use strict'; // ALWAYS

const DEFAULT = require('../etc/default.const.js');
const {df} = require('./object.util.js');
const {Router} = require('express');


/**
 *
 * Helper function for creating new express.Router
 *
 * @type {function(*=): Router}
 */
const createRouter = (

    // eslint-disable-next-line new-cap
    options => Router(options)

);


/**
 *  Helper so that async routes can propagate thrown errors
 *
 * @type {function(*): function(*=, *=, *=): *}
 */
const wrapAsync = (

    mw => (req, res, next) => (

        mw(req, res, next).then(
            body => {

                const {meta, hcode} = body;
                const {ctype, location} = meta;

                if (location) {
                    res.location(location);
                }

                return (
                    res
                        .type(df(DEFAULT.ctype, ctype))
                        .status(hcode)
                        .json(body)
                );
            }
        ).catch(next)

    )

);


const wrapSync = (

    mw => (req, res, next) => {

        try {

            const body = mw(req, res, next);
            res.status(body.hcode).json(body);

        } catch (e) {
            next(e);
        }

    }

);


module.exports = Object.freeze({

    createRouter,

    wrapAsync,
    wrapSync,

});

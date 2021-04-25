const express = require('express');
const router = express.Router();
const constants = require('../config/constants');
const jwt = require('jsonwebtoken');
const Collection = require('../models/collection');
const authentication = require('../middlewares/authentication');

router.get('/', authentication.verifyToken, (req, res, next) => {

    let pagination = req.query.pagination || 0;
    pagination = Number(pagination);

    Collection.find()
        /*.populate({ path: 'motocicles.users', select: 'name' })*/
        .skip(pagination)
        .limit(constants.PAGINATION)
        .exec(
            (err, collections) => {
                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: 'No se pueden consultar los departamentos',
                        errors: err
                    });
                } else {
                    Collection.countDocuments({}, (err, totalRecords) => {
                        res.status(200).write(JSON.stringify({
                            success: true,
                            collections: collections,
                            totalRecords: totalRecords,
                            pagination: pagination
                        }, null, 2));
                        res.end();

                    });
                }
            });
});

router.get('/rides/', authentication.verifyToken, (req, res, next) => {

    let pagination = req.query.pagination || 0;
    pagination = Number(pagination);

    Collection.find({ name: "Taller" }, { 'motocicles.rides': { $elemMatch: { "motocicles._id": "5aef30e3ee3cbe0d3c67a15a" } } })
        /*.populate({ path: 'motocicles.users', select: 'name' })*/
        .skip(pagination)
        .limit(constants.PAGINATION)
        .exec(
            (err, collections) => {
                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: 'No se pueden consultar los departamentos',
                        errors: err
                    });
                } else {
                    Collection.countDocuments({}, (err, totalRecords) => {
                        res.status(200).write(JSON.stringify({
                            success: true,
                            collections: collections,
                            totalRecords: totalRecords,
                            pagination: pagination
                        }, null, 2));
                        res.end();

                    });
                }
            });
});

router.post('/', authentication.verifyToken, (req, res, next) => {
    let collection = new Collection({
        name: req.body.name,
        cars: [...req.body.cars],
        motocicles: [...req.body.motocicles]
    });
    collection.save((err, collection) => {
        if (err) {
            return res.status(400).json({
                success: false,
                message: 'No se puede crear el departamento',
                errors: err
            });
        } else {
            res.status(201).json({
                success: true,
                message: 'Operación realizada de forma exitosa.',
                collection: collection
            });
        }
    });
});


module.exports = router;
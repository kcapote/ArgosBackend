const express = require('express');
const router = express.Router();
const constants = require('../config/constants');
const jwt = require('jsonwebtoken');
const Floor = require('../models/floor');
const authentication = require('../middlewares/authentication');

router.get('/', authentication.verifyToken, (req, res, next) => {

    let pagination = req.query.pagination || 0;
    pagination = Number(pagination);
    let limit = 1;
    if (pagination === -1) {
        pagination = 0;
        limit = 0;
    }
    Floor.find()
        .populate('project')
        .skip(pagination)
        .limit(limit === 0 ? 0 : constants.PAGINATION)
        .exec(
            (err, floors) => {
                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: 'No se pueden consultar los pisos',
                        errors: err
                    });
                } else {
                    Floor.count({}, (err, totalRecords) => {
                        res.status(200).write(JSON.stringify({
                            success: true,
                            floors: floors,
                            totalRecords: totalRecords,
                            pagination: pagination
                        }, null, 2));
                        res.end();

                    });
                }
            });
});

router.get('/recordActive/:recordActive', authentication.verifyToken, (req, res, next) => {

    let pagination = req.query.pagination || 0;
    pagination = Number(pagination);
    let limit = 1;
    if (pagination === -1) {
        pagination = 0;
        limit = 0;
    }
    let recordActive = req.params.recordActive;
    recordActive = Boolean(recordActive);

    Floor.find({ 'recordActive': recordActive })
        .populate('project')
        .skip(pagination)
        .limit(limit === 0 ? 0 : constants.PAGINATION)
        .exec(
            (err, floors) => {
                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: 'No se pueden consultar los pisos',
                        errors: err
                    });
                } else {
                    Floor.count({}, (err, totalRecords) => {
                        res.status(200).write(JSON.stringify({
                            success: true,
                            floors: floors,
                            totalRecords: totalRecords,
                            pagination: pagination
                        }, null, 2));
                        res.end();

                    });
                }
            });
});

router.get('/project/:id', authentication.verifyToken, (req, res, next) => {

    let id = req.params.id;

    Floor.find({ 'project': id, 'recordActive': true })
        .populate('project')
        .exec(
            (err, floors) => {
                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: 'No se pueden consultar los pisos',
                        errors: err
                    });
                } else {
                    Floor.count({}, (err, totalRecords) => {
                        res.status(200).write(JSON.stringify({
                            success: true,
                            floors: floors,
                            totalRecords: totalRecords
                        }, null, 2));
                        res.end();

                    });
                }
            });
});

router.get('/:id', authentication.verifyToken, (req, res, next) => {

    let id = req.params.id;

    Floor.find({ '_id': id })
        .populate('project')
        .exec(
            (err, floors) => {
                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: 'No se pueden consultar los pisos',
                        errors: err
                    });
                } else {
                    Floor.count({}, (err, totalRecords) => {
                        res.status(200).write(JSON.stringify({
                            success: true,
                            floors: floors,
                            totalRecords: totalRecords
                        }, null, 2));
                        res.end();

                    });
                }
            });
});

router.post('/', authentication.verifyToken, (req, res, next) => {
    let floor = new Floor({
        project: req.body.project,
        number: req.body.number,
        quantityDepartment: req.body.quantityDepartment,
        type: req.body.type,
        status: req.body.status
    });
    floor.save((err, floor) => {
        if (err) {
            return res.status(400).json({
                success: false,
                message: 'No se puede crear el piso',
                errors: err
            });
        } else {
            res.status(201).json({
                success: true,
                message: 'Operación realizada de forma exitosa.',
                floor: floor
            });
        }
    });
});

router.put('/:id', authentication.verifyToken, (req, res, next) => {

    let id = req.params.id;

    Floor.findById(id, (err, floor) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: 'No se puede actualizar el piso',
                errors: err
            });
        }

        if (!floor) {
            return res.status(400).json({
                success: false,
                message: 'No existe un piso con el id: ' + id,
                errors: { message: 'No se pudo encontrar el piso para actualizar' }
            });
        } else {

            floor.project = req.body.project;
            floor.number = req.body.number;
            floor.quantityDepartment = req.body.number;
            floor.type = req.body.type;
            floor.status = req.body.status;
            floor.recordActive = req.body.recordActive || true;

            floor.save((err, floor) => {
                if (err) {
                    return res.status(400).json({
                        success: false,
                        message: 'No se puede actualizar el piso',
                        errors: err
                    });
                } else {
                    res.status(200).json({
                        success: true,
                        message: 'Operación realizada de forma exitosa.',
                        floor: floor
                    });
                }
            });

        }
    })
});


router.delete('/:id', authentication.verifyToken, (req, res, next) => {

    let id = req.params.id;

    Floor.findById(id, (err, floor) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: 'No se puede eliminar el piso',
                errors: err
            });
        }

        if (!floor) {
            return res.status(400).json({
                success: false,
                message: 'No existe un piso con el id: ' + id,
                errors: { message: 'No se pudo encontrar el piso para eliminar' }
            });
        } else {

            floor.recordActive = false;

            floor.save((err, floor) => {
                if (err) {
                    return res.status(400).json({
                        success: false,
                        message: 'No se puede eliminar el piso',
                        errors: err
                    });
                } else {
                    res.status(200).json({
                        success: true,
                        message: 'Operación realizada de forma exitosa.',
                        floor: floor
                    });
                }
            });

        }
    })
});

module.exports = router;
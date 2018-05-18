const express = require('express');
const router = express.Router();
const constants = require('../config/constants');
const jwt = require('jsonwebtoken');
const Position = require('../models/position');
const authentication = require('../middlewares/authentication');

router.get('/', authentication.verifyToken, (req, res, next) => {

    let pagination = req.query.pagination || 0;
    pagination = Number(pagination);

    Position.find()
        .skip(pagination)
        .limit(constants.PAGINATION)
        .exec(
            (err, positions) => {
                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: 'No se pueden consultar los cargos',
                        errors: err
                    });
                } else {

                    Position.count({}, (err, totalRecords) => {
                        res.status(200).write(JSON.stringify({
                            success: true,
                            positions: positions,
                            totalRecords: positions.length,
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
    let recordActive = req.params.recordActive;
    recordActive = Boolean(recordActive);

    Position.find({ 'recordActive': recordActive })
        .skip(pagination)
        .limit(constants.PAGINATION)
        .exec(
            (err, positions) => {
                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: 'No se pueden consultar los cargos',
                        errors: err
                    });
                } else {

                    Position.count({}, (err, totalRecords) => {
                        res.status(200).write(JSON.stringify({
                            success: true,
                            positions: positions,
                            totalRecords: positions.length,
                            pagination: pagination
                        }, null, 2));
                        res.end();

                    });
                }
            });
});

router.get('/search/:term', authentication.verifyToken, (req, res, next) => {

    let term = req.params.term;
    var regex = new RegExp(term, 'i');

    let pagination = req.query.pagination || 0;
    pagination = Number(pagination);

    Position.find()
        .or([{ 'name': regex }]) //arreglo de campos a tomar en cuenta para la busqueda
        .skip(pagination)
        .limit(constants.PAGINATION)
        .exec(
            (err, positions) => {
                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: 'No se encontraron resultados',
                        errors: err
                    });
                } else {

                    Position.count({}, (err, totalRecords) => {
                        res.status(200).write(JSON.stringify({
                            success: true,
                            positions: positions,
                            totalRecords: positions.length,
                            pagination: pagination
                        }, null, 2));
                        res.end();

                    });
                }
            });
});

router.get('/search/:term/:recordActive', authentication.verifyToken, (req, res, next) => {

    let term = req.params.term;
    var regex = new RegExp(term, 'i');

    let pagination = req.query.pagination || 0;
    pagination = Number(pagination);
    let recordActive = req.params.recordActive;
    recordActive = Boolean(recordActive);

    Position.find({ 'recordActive': recordActive })
        .or([{ 'name': regex }]) //arreglo de campos a tomar en cuenta para la busqueda
        .skip(pagination)
        .limit(constants.PAGINATION)
        .exec(
            (err, positions) => {
                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: 'No se encontraron resultados',
                        errors: err
                    });
                } else {

                    Position.count({}, (err, totalRecords) => {
                        res.status(200).write(JSON.stringify({
                            success: true,
                            positions: positions,
                            totalRecords: positions.length,
                            pagination: pagination
                        }, null, 2));
                        res.end();

                    });
                }
            });
});

router.get('/:id', authentication.verifyToken, (req, res, next) => {

    let id = req.params.id;

    Position.findById(id, (err, position) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: 'No se puede actualizar la tarea',
                errors: err
            });
        }

        if (!position) {
            return res.status(400).json({
                success: false,
                message: 'No existe un cargo con el id: ' + id,
                errors: { message: 'No se pudo encontrar el cargo' }
            });
        } else {

            res.status(200).json({
                success: true,
                message: 'Operación realizada de forma exitosa.',
                position: position
            });

        }
    })
});


router.post('/', authentication.verifyToken, (req, res, next) => {
    let position = new Position({
        name: req.body.name,
        code: req.body.code,
        description: req.body.description,
        performancePercentage: req.body.performancePercentage
    });
    position.save((err, positionSave) => {
        if (err) {
            return res.status(400).json({
                success: false,
                message: 'No se puede crear el cargo',
                errors: err
            });
        } else {
            res.status(201).json({
                success: true,
                message: 'Operación realizada de forma exitosa.',
                position: positionSave
            });
        }
    });
});

router.put('/:id', authentication.verifyToken, (req, res, next) => {

    let id = req.params.id;

    Position.findById(id, (err, position) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: 'No se puede actualizar el cargo',
                errors: err
            });
        }

        if (!position) {
            return res.status(400).json({
                success: false,
                message: 'No existe el cargo con el id: ' + id,
                errors: { message: 'No se pudo encontrar el cargo para actualizar' }
            });
        } else {
            position.name = req.body.name;
            position.code = req.body.code;
            position.description = req.body.description;
            position.performancePercentage = req.body.performancePercentage;
            position.recordActive = req.body.recordActive || true;

            position.save((err, positionSave) => {
                if (err) {
                    return res.status(400).json({
                        success: false,
                        message: 'No se puede actualizar el cargo',
                        errors: err
                    });
                } else {
                    res.status(200).json({
                        success: true,
                        message: 'Operación realizada de forma exitosa.',
                        position: positionSave
                    });
                }
            });

        }
    })
});


router.delete('/:id', authentication.verifyToken, (req, res, next) => {

    let id = req.params.id;

    Position.findById(id, (err, position) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: 'No se puede eliminar el cargo',
                errors: err
            });
        }

        if (!position) {
            return res.status(400).json({
                success: false,
                message: 'No existe el cargo con el id: ' + id,
                errors: { message: 'No se pudo encontrar el cargo para eliminar' }
            });
        } else {

            position.recordActive = false;

            position.save((err, positionSave) => {
                if (err) {
                    return res.status(400).json({
                        success: false,
                        message: 'No se puede eliminar el cargo',
                        errors: err
                    });
                } else {
                    res.status(200).json({
                        success: true,
                        message: 'Operación realizada de forma exitosa.',
                        position: positionSave
                    });
                }
            });

        }
    })
});

module.exports = router;
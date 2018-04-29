const express = require('express');
const router = express.Router();
const constants = require('../config/constants');
const jwt = require('jsonwebtoken');
const Floor = require('../models/floor');
const authentication = require('../middlewares/authentication');

router.get('/', authentication.verifyToken, (req, res, next) => {

    let pagination = req.query.pagination || 0;
    pagination = Number(pagination);

    Floor.find()
        .populate('project')
        .skip(pagination)
        .limit(constants.PAGINATION)
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

router.get('/search/:term', authentication.verifyToken, (req, res, next) => {

    let term = req.params.term;
    var regex = new RegExp(term, 'i');

    let pagination = req.query.pagination || 0;
    pagination = Number(pagination);

    Floor.find()
        .populate('project')
        .or([{ 'name': regex }]) //arreglo de campos a tomar en cuenta para la busqueda
        .skip(pagination)
        .limit(constants.PAGINATION)
        .exec(
            (err, floors) => {
                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: 'No se encontraron resultados',
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

    Floor.find({ 'project': id })
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
                    SubTask.count({}, (err, totalRecords) => {
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
        quantityDepartment: req.body.number,
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
            floor.status = req.body.status

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

    Floor.findByIdAndRemove(id, (err, floor) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: 'No se puede eliminar el piso',
                errors: err
            });
        } else if (taskRemove) {
            res.status(200).json({
                success: true,
                message: 'Operación realizada de forma exitosa',
                floor: floor
            });
        } else {
            return res.status(400).json({
                success: false,
                message: 'No existe una tarea con el id: ' + id,
                errors: { message: 'No se pudo encontrar el piso para eliminar' }
            });
        }
    })
});

module.exports = router;
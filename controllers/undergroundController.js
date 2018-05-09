const express = require('express');
const router = express.Router();
const constants = require('../config/constants');
const jwt = require('jsonwebtoken');
const Underground = require('../models/underground');
const authentication = require('../middlewares/authentication');

router.get('/', authentication.verifyToken, (req, res, next) => {

    let pagination = req.query.pagination || 0;
    pagination = Number(pagination);

    Underground.find()
        .populate('project')
        .skip(pagination)
        .limit(constants.PAGINATION)
        .exec(
            (err, undergrounds) => {
                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: 'No se pueden consultar los subterraneos',
                        errors: err
                    });
                } else {
                    Underground.count({}, (err, totalRecords) => {
                        res.status(200).write(JSON.stringify({
                            success: true,
                            undergrounds: undergrounds,
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

    Underground.find()
        .populate('project')
        .or([{ 'name': regex }]) //arreglo de campos a tomar en cuenta para la busqueda
        .skip(pagination)
        .limit(constants.PAGINATION)
        .exec(
            (err, undergrounds) => {
                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: 'No se encontraron resultados',
                        errors: err
                    });
                } else {

                    Underground.count({}, (err, totalRecords) => {
                        res.status(200).write(JSON.stringify({
                            success: true,
                            undergrounds: undergrounds,
                            totalRecords: undergrounds.length,
                            pagination: pagination
                        }, null, 2));
                        res.end();

                    });
                }
            });
});


router.get('/project/:id', authentication.verifyToken, (req, res, next) => {

    let id = req.params.id;

    Underground.find({ 'project': id })
        .populate('project')
        .exec(
            (err, undergrounds) => {
                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: 'No se pueden consultar los subterraneos',
                        errors: err
                    });
                } else {
                    Underground.count({}, (err, totalRecords) => {
                        res.status(200).write(JSON.stringify({
                            success: true,
                            undergrounds: undergrounds,
                            totalRecords: totalRecords
                        }, null, 2));
                        res.end();

                    });
                }
            });
});

router.get('/:id', authentication.verifyToken, (req, res, next) => {

    let id = req.params.id;

    Underground.find({ '_id': id })
        .populate('project')
        .exec(
            (err, undergrounds) => {
                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: 'No se pueden consultar los subterraneos',
                        errors: err
                    });
                } else {
                    Underground.count({}, (err, totalRecords) => {
                        res.status(200).write(JSON.stringify({
                            success: true,
                            undergrounds: undergrounds,
                            totalRecords: totalRecords
                        }, null, 2));
                        res.end();

                    });
                }
            });
});

router.post('/', authentication.verifyToken, (req, res, next) => {
    let underground = new Underground({
        project: req.body.project,
        number: req.body.number,
        status: req.body.status
    });
    underground.save((err, underground) => {
        if (err) {
            return res.status(400).json({
                success: false,
                message: 'No se puede crear el subterraneo',
                errors: err
            });
        } else {
            res.status(201).json({
                success: true,
                message: 'Operación realizada de forma exitosa.',
                underground: underground
            });
        }
    });
});

router.put('/:id', authentication.verifyToken, (req, res, next) => {

    let id = req.params.id;

    Underground.findById(id, (err, underground) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: 'No se puede actualizar el subterraneo',
                errors: err
            });
        }

        if (!underground) {
            return res.status(400).json({
                success: false,
                message: 'No existe un subterraneo con el id: ' + id,
                errors: { message: 'No se pudo encontrar el subterraneo para actualizar' }
            });
        } else {

            underground.project = req.body.project;
            underground.number = req.body.number;
            underground.status = req.body.status;

            underground.save((err, underground) => {
                if (err) {
                    return res.status(400).json({
                        success: false,
                        message: 'No se puede actualizar el subterraneo',
                        errors: err
                    });
                } else {
                    res.status(200).json({
                        success: true,
                        message: 'Operación realizada de forma exitosa.',
                        underground: underground
                    });
                }
            });

        }
    })
});


router.delete('/:id', authentication.verifyToken, (req, res, next) => {

    let id = req.params.id;

    Underground.findByIdAndRemove(id, (err, underground) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: 'No se puede eliminar el subterraneo',
                errors: err
            });
        } else if (underground) {
            res.status(200).json({
                success: true,
                message: 'Operación realizada de forma exitosa',
                underground: underground
            });
        } else {
            return res.status(400).json({
                success: false,
                message: 'No existe un subterraneo con el id: ' + id,
                errors: { message: 'No se pudo encontrar el subterraneo para eliminar' }
            });
        }
    })
});

module.exports = router;
const express = require('express');
const router = express.Router();
const constants = require('../config/constants');
const jwt = require('jsonwebtoken');
const Emplacement = require('../models/emplacement');
const authentication = require('../middlewares/authentication');

router.get('/', authentication.verifyToken, (req, res, next) => {

    let pagination = req.query.pagination || 0;
    pagination = Number(pagination);

    Emplacement.find()
        .populate('project')
        .skip(pagination)
        .limit(constants.PAGINATION)
        .exec(
            (err, emplacements) => {
                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: 'No se pueden consultar los emplazamientos',
                        errors: err
                    });
                } else {
                    Emplacement.count({}, (err, totalRecords) => {
                        res.status(200).write(JSON.stringify({
                            success: true,
                            emplacements: emplacements,
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

    Emplacement.find()
        .populate('project')
        .or([{ 'name': regex }]) //arreglo de campos a tomar en cuenta para la busqueda
        .skip(pagination)
        .limit(constants.PAGINATION)
        .exec(
            (err, emplacements) => {
                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: 'No se encontraron resultados',
                        errors: err
                    });
                } else {

                    Emplacement.count({}, (err, totalRecords) => {
                        res.status(200).write(JSON.stringify({
                            success: true,
                            emplacements: emplacements,
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

    Emplacement.find({ 'project': id })
        .populate('project')
        .exec(
            (err, emplacements) => {
                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: 'No se pueden consultar los emplazamientos',
                        errors: err
                    });
                } else {
                    Emplacement.count({}, (err, totalRecords) => {
                        res.status(200).write(JSON.stringify({
                            success: true,
                            emplacements: emplacements,
                            totalRecords: totalRecords
                        }, null, 2));
                        res.end();

                    });
                }
            });
});

router.get('/:id', authentication.verifyToken, (req, res, next) => {

    let id = req.params.id;

    Emplacement.find({ '_id': id })
        .populate('project')
        .exec(
            (err, emplacements) => {
                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: 'No se pueden consultar los emplazamientos',
                        errors: err
                    });
                } else {
                    Emplacement.count({}, (err, totalRecords) => {
                        res.status(200).write(JSON.stringify({
                            success: true,
                            emplacements: emplacements,
                            totalRecords: totalRecords
                        }, null, 2));
                        res.end();

                    });
                }
            });
});

router.post('/', authentication.verifyToken, (req, res, next) => {
    let emplacement = new Emplacement({
        project: req.body.project,
        number: req.body.number,
        status: req.body.status
    });
    emplacement.save((err, emplacement) => {
        if (err) {
            return res.status(400).json({
                success: false,
                message: 'No se puede crear el emplazamiento',
                errors: err
            });
        } else {
            res.status(201).json({
                success: true,
                message: 'Operación realizada de forma exitosa.',
                emplacement: emplacement
            });
        }
    });
});

router.put('/:id', authentication.verifyToken, (req, res, next) => {

    let id = req.params.id;

    Emplacement.findById(id, (err, emplacement) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: 'No se puede actualizar el emplazamiento',
                errors: err
            });
        }

        if (!emplacement) {
            return res.status(400).json({
                success: false,
                message: 'No existe un emplazamiento con el id: ' + id,
                errors: { message: 'No se pudo encontrar el emplazamiento para actualizar' }
            });
        } else {

            emplacement.project = req.body.project;
            emplacement.number = req.body.number;
            emplacement.status = req.body.status;

            emplacement.save((err, emplacement) => {
                if (err) {
                    return res.status(400).json({
                        success: false,
                        message: 'No se puede actualizar el emplazamiento',
                        errors: err
                    });
                } else {
                    res.status(200).json({
                        success: true,
                        message: 'Operación realizada de forma exitosa.',
                        emplacement: emplacement
                    });
                }
            });

        }
    })
});


router.delete('/:id', authentication.verifyToken, (req, res, next) => {

    let id = req.params.id;

    Emplacement.findByIdAndRemove(id, (err, emplacement) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: 'No se puede eliminar el emplazamiento',
                errors: err
            });
        } else if (emplacement) {
            res.status(200).json({
                success: true,
                message: 'Operación realizada de forma exitosa',
                emplacement: emplacement
            });
        } else {
            return res.status(400).json({
                success: false,
                message: 'No existe un emplazamiento con el id: ' + id,
                errors: { message: 'No se pudo encontrar el emplazamiento para eliminar' }
            });
        }
    })
});

module.exports = router;
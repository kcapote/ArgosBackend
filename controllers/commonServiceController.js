const express = require('express');
const router = express.Router();
const constants = require('../config/constants');
const jwt = require('jsonwebtoken');
const CommonService = require('../models/commonService');
const authentication = require('../middlewares/authentication');

router.get('/', authentication.verifyToken, (req, res, next) => {

    let pagination = req.query.pagination || 0;
    pagination = Number(pagination);

    CommonService.find()
        .populate('project')
        .skip(pagination)
        .limit(constants.PAGINATION)
        .exec(
            (err, commonServices) => {
                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: 'No se pueden consultar los registros',
                        errors: err
                    });
                } else {
                    CommonService.count({}, (err, totalRecords) => {
                        res.status(200).write(JSON.stringify({
                            success: true,
                            commonServices: commonServices,
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

    CommonService.find()
        .populate('project')
        .or([{ 'type': regex }, { 'number': regex }]) //arreglo de campos a tomar en cuenta para la busqueda
        .skip(pagination)
        .limit(constants.PAGINATION)
        .exec(
            (err, commonServices) => {
                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: 'No se encontraron resultados',
                        errors: err
                    });
                } else {

                    CommonService.count({}, (err, totalRecords) => {
                        res.status(200).write(JSON.stringify({
                            success: true,
                            commonServices: commonServices,
                            totalRecords: commonServices.length,
                            pagination: pagination
                        }, null, 2));
                        res.end();

                    });
                }
            });
});


router.get('/project/:id', authentication.verifyToken, (req, res, next) => {

    let id = req.params.id;

    CommonService.find({ 'project': id })
        .populate('project')
        .exec(
            (err, commonServices) => {
                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: 'No se pueden consultar los registros',
                        errors: err
                    });
                } else {
                    CommonService.count({}, (err, totalRecords) => {
                        res.status(200).write(JSON.stringify({
                            success: true,
                            commonServices: commonServices,
                            totalRecords: totalRecords
                        }, null, 2));
                        res.end();

                    });
                }
            });
});

router.get('/:id', authentication.verifyToken, (req, res, next) => {

    let id = req.params.id;

    CommonService.find({ '_id': id })
        .populate('project')
        .exec(
            (err, commonService) => {
                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: 'No se pueden consultar los registros',
                        errors: err
                    });
                } else {
                    CommonService.count({}, (err, totalRecords) => {
                        res.status(200).write(JSON.stringify({
                            success: true,
                            commonService: commonService,
                            totalRecords: commonService.length
                        }, null, 2));
                        res.end();

                    });
                }
            });
});

router.post('/', authentication.verifyToken, (req, res, next) => {
    let commonService = new CommonService({
        project: req.body.project,
        number: req.body.number,
        type: req.body.type,
        status: req.body.status
    });
    commonService.save((err, commonService) => {
        if (err) {
            return res.status(400).json({
                success: false,
                message: 'No se puede crear el registro',
                errors: err
            });
        } else {
            res.status(201).json({
                success: true,
                message: 'Operación realizada de forma exitosa.',
                commonService: commonService
            });
        }
    });
});

router.put('/:id', authentication.verifyToken, (req, res, next) => {

    let id = req.params.id;

    CommonService.findById(id, (err, commonService) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: 'No se puede actualizar el registro',
                errors: err
            });
        }

        if (!commonService) {
            return res.status(400).json({
                success: false,
                message: 'No existe un registro con el id: ' + id,
                errors: { message: 'No se pudo encontrar el registro para actualizar' }
            });
        } else {

            commonService.project = req.body.project;
            commonService.number = req.body.number;
            commonService.type = req.body.type;
            commonService.status = req.body.status;

            commonService.save((err, commonService) => {
                if (err) {
                    return res.status(400).json({
                        success: false,
                        message: 'No se puede actualizar el registro',
                        errors: err
                    });
                } else {
                    res.status(200).json({
                        success: true,
                        message: 'Operación realizada de forma exitosa.',
                        commonService: commonService
                    });
                }
            });

        }
    })
});


router.delete('/:id', authentication.verifyToken, (req, res, next) => {

    let id = req.params.id;

    CommonService.findByIdAndRemove(id, (err, commonService) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: 'No se puede eliminar el registro',
                errors: err
            });
        } else if (commonService) {
            res.status(200).json({
                success: true,
                message: 'Operación realizada de forma exitosa',
                commonService: commonService
            });
        } else {
            return res.status(400).json({
                success: false,
                message: 'No existe un registro con el id: ' + id,
                errors: { message: 'No se pudo encontrar el registro para eliminar' }
            });
        }
    })
});

module.exports = router;
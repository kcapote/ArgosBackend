const express = require('express');
const router = express.Router();
const constants = require('../config/constants');
const jwt = require('jsonwebtoken');
const CommonService = require('../models/commonService');
const authentication = require('../middlewares/authentication');

router.get('/', [authentication.verifyToken, authentication.refreshToken], (req, res, next) => {

    let pagination = req.query.pagination || 0;
    pagination = Number(pagination);

    CommonService.find()
        .populate('project')
        .skip(pagination)
        .limit(constants.PAGINATION)
        .sort({ number: 1 })
        .exec(
            (err, commonServices) => {
                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: 'No se pueden consultar los registros',
                        errors: err,
                        user: req.user
                    });
                } else {
                    CommonService.count({}, (err, totalRecords) => {
                        res.status(200).write(JSON.stringify({
                            success: true,
                            commonServices: commonServices,
                            totalRecords: commonServices.length,
                            pagination: pagination,
                            user: req.user
                        }, null, 2));
                        res.end();

                    });
                }
            });
});

router.get('/recordActive/:recordActive', [authentication.verifyToken, authentication.refreshToken], (req, res, next) => {

    let pagination = req.query.pagination || 0;
    pagination = Number(pagination);
    let recordActive = req.params.recordActive;
    recordActive = Boolean(recordActive);

    CommonService.find({ 'recordActive': recordActive })
        .populate('project')
        .skip(pagination)
        .limit(constants.PAGINATION)
        .sort({ number: 1 })
        .exec(
            (err, commonServices) => {
                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: 'No se pueden consultar los registros',
                        errors: err,
                        user: req.user
                    });
                } else {
                    CommonService.count({}, (err, totalRecords) => {
                        res.status(200).write(JSON.stringify({
                            success: true,
                            commonServices: commonServices,
                            totalRecords: commonServices.length,
                            pagination: pagination,
                            user: req.user
                        }, null, 2));
                        res.end();

                    });
                }
            });
});

router.get('/project/:id', [authentication.verifyToken, authentication.refreshToken], (req, res, next) => {

    let id = req.params.id;

    CommonService.find({ 'project': id, 'recordActive': true })
        .populate('project')
        .sort({ number: 1 })
        .exec(
            (err, commonServices) => {
                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: 'No se pueden consultar los registros',
                        errors: err,
                        user: req.user
                    });
                } else {
                    CommonService.count({}, (err, totalRecords) => {
                        res.status(200).write(JSON.stringify({
                            success: true,
                            commonServices: commonServices,
                            totalRecords: commonServices.length,
                            user: req.user
                        }, null, 2));
                        res.end();

                    });
                }
            });
});

router.get('/project/:id/:type', [authentication.verifyToken, authentication.refreshToken], (req, res, next) => {

    let id = req.params.id;
    let type = req.params.type;

    CommonService.find({ 'project': id, 'type': type, 'recordActive': true })
        .populate('project')
        .sort({ number: 1 })
        .exec(
            (err, commonServices) => {
                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: 'No se pueden consultar los registros',
                        errors: err,
                        user: req.user
                    });
                } else {
                    CommonService.count({}, (err, totalRecords) => {
                        res.status(200).write(JSON.stringify({
                            success: true,
                            commonServices: commonServices,
                            totalRecords: commonServices.length,
                            user: req.user
                        }, null, 2));
                        res.end();

                    });
                }
            });
});

router.get('/:id', [authentication.verifyToken, authentication.refreshToken], (req, res, next) => {

    let id = req.params.id;

    CommonService.find({ '_id': id })
        .populate('project')
        .sort({ number: 1 })
        .exec(
            (err, commonService) => {
                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: 'No se pueden consultar los registros',
                        errors: err,
                        user: req.user
                    });
                } else {
                    CommonService.count({}, (err, totalRecords) => {
                        res.status(200).write(JSON.stringify({
                            success: true,
                            commonService: commonService,
                            totalRecords: commonService.length,
                            user: req.user
                        }, null, 2));
                        res.end();

                    });
                }
            });
});

router.post('/', [authentication.verifyToken, authentication.refreshToken], (req, res, next) => {
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
                errors: err,
                user: req.user
            });
        } else {
            res.status(201).json({
                success: true,
                message: 'Operación realizada de forma exitosa.',
                commonService: commonService,
                user: req.user
            });
        }
    });
});

router.put('/:id', [authentication.verifyToken, authentication.refreshToken], (req, res, next) => {

    let id = req.params.id;

    CommonService.findById(id, (err, commonService) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: 'No se puede actualizar el registro',
                errors: err,
                user: req.user
            });
        }

        if (!commonService) {
            return res.status(400).json({
                success: false,
                message: 'No existe un registro con el id: ' + id,
                errors: { message: 'No se pudo encontrar el registro para actualizar' },
                user: req.user
            });
        } else {

            commonService.project = req.body.project;
            commonService.number = req.body.number;
            commonService.type = req.body.type;
            commonService.status = req.body.status;
            commonService.recordActive = req.body.recordActive || true;

            commonService.save((err, commonService) => {
                if (err) {
                    return res.status(400).json({
                        success: false,
                        message: 'No se puede actualizar el registro',
                        errors: err,
                        user: req.user
                    });
                } else {
                    res.status(200).json({
                        success: true,
                        message: 'Operación realizada de forma exitosa.',
                        commonService: commonService,
                        user: req.user
                    });
                }
            });

        }
    })
});


router.delete('/:id', [authentication.verifyToken, authentication.refreshToken], (req, res, next) => {

    let id = req.params.id;

    CommonService.findById(id, (err, commonService) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: 'No se puede eliminar el registro',
                errors: err,
                user: req.user
            });
        }

        if (!commonService) {
            return res.status(400).json({
                success: false,
                message: 'No existe un registro con el id: ' + id,
                errors: { message: 'No se pudo encontrar el registro para eliminar' },
                user: req.user
            });
        } else {

            commonService.recordActive = false;

            commonService.save((err, commonService) => {
                if (err) {
                    return res.status(400).json({
                        success: false,
                        message: 'No se puede eliminar el registro',
                        errors: err,
                        user: req.user
                    });
                } else {
                    res.status(200).json({
                        success: true,
                        message: 'Operación realizada de forma exitosa.',
                        commonService: commonService,
                        user: req.user
                    });
                }
            });

        }
    })
});

module.exports = router;
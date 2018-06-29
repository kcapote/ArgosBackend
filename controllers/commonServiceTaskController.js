const express = require('express');
const router = express.Router();
const constants = require('../config/constants');
const jwt = require('jsonwebtoken');
const CommonServiceTask = require('../models/commonServiceTask');
const authentication = require('../middlewares/authentication');

router.get('/', [authentication.verifyToken, authentication.refreshToken], (req, res, next) => {

    let pagination = req.query.pagination || 0;
    pagination = Number(pagination);

    CommonServiceTask.find()
        .populate('commonService')
        .populate('task')
        .populate('project')
        .skip(pagination)
        .limit(constants.PAGINATION)
        .exec(
            (err, commonServiceTasks) => {
                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: 'No se pueden consultar la información',
                        errors: err,
                        user: req.user
                    });
                } else {
                    CommonServiceTask.count({}, (err, totalRecords) => {
                        res.status(200).write(JSON.stringify({
                            success: true,
                            commonServiceTasks: commonServiceTasks,
                            totalRecords: totalRecords,
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

    CommonServiceTask.find({ 'recordActive': recordActive })
        .populate('commonService')
        .populate('task')
        .populate('project')
        .skip(pagination)
        .limit(constants.PAGINATION)
        .exec(
            (err, commonServiceTasks) => {
                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: 'No se pueden consultar la información',
                        errors: err,
                        user: req.user
                    });
                } else {
                    CommonServiceTask.find({ 'recordActive': recordActive }).count({}, (err, totalRecords) => {
                        res.status(200).write(JSON.stringify({
                            success: true,
                            commonServiceTasks: commonServiceTasks,
                            totalRecords: totalRecords,
                            pagination: pagination,
                            user: req.user
                        }, null, 2));
                        res.end();

                    });
                }
            });
});

router.get('/task/:idProject/:idTask/:type', [authentication.verifyToken, authentication.refreshToken], (req, res, next) => {

    let idProject = req.params.idProject;
    let idTask = req.params.idTask;
    let type = req.params.type;

    CommonServiceTask.find({ 'project': idProject, 'task': idTask, 'type': type, 'recordActive': true })
        .populate('commonService')
        .populate('task')
        .populate('project')
        .exec(
            (err, commonServiceTasks) => {
                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: 'No se pueden consultar la información',
                        errors: err,
                        user: req.user
                    });
                } else {
                    CommonServiceTask.find({ 'project': idProject, 'task': idTask, 'type': type, 'recordActive': true }).count({}, (err, totalRecords) => {
                        res.status(200).write(JSON.stringify({
                            success: true,
                            commonServiceTasks: commonServiceTasks,
                            totalRecords: totalRecords,
                            user: req.user
                        }, null, 2));
                        res.end();

                    });
                }
            });
});

router.get('/task/:idProject/:idTask', [authentication.verifyToken, authentication.refreshToken], (req, res, next) => {

    let idProject = req.params.idProject;
    let idTask = req.params.idTask;

    CommonServiceTask.find({ 'project': idProject, 'task': idTask, 'recordActive': true })
        .populate('commonService')
        .populate('task')
        .populate('project')
        .exec(
            (err, commonServiceTasks) => {
                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: 'No se pueden consultar la información',
                        errors: err,
                        user: req.user
                    });
                } else {
                    CommonServiceTask.find({ 'project': idProject, 'task': idTask, 'recordActive': true }).count({}, (err, totalRecords) => {
                        res.status(200).write(JSON.stringify({
                            success: true,
                            commonServiceTasks: commonServiceTasks,
                            totalRecords: totalRecords,
                            user: req.user
                        }, null, 2));
                        res.end();

                    });
                }
            });
});

router.get('/commonservice/:idProject/:idcommonService', [authentication.verifyToken, authentication.refreshToken], (req, res, next) => {

    let idProject = req.params.idProject;
    let idcommonService = req.params.idcommonService;

    CommonServiceTask.find({ 'project': idProject, 'commonService': idcommonService, 'recordActive': true })
        .populate('commonService')
        .populate('task')
        .populate('project')
        .exec(
            (err, commonServiceTasks) => {
                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: 'No se pueden consultar la información',
                        errors: err,
                        user: req.user
                    });
                } else {
                    CommonServiceTask.find({ 'project': idProject, 'commonService': idcommonService, 'recordActive': true }).count({}, (err, totalRecords) => {
                        res.status(200).write(JSON.stringify({
                            success: true,
                            commonServiceTasks: commonServiceTasks,
                            totalRecords: totalRecords,
                            user: req.user
                        }, null, 2));
                        res.end();

                    });
                }
            });
});

router.get('/project/:idProject', [authentication.verifyToken, authentication.refreshToken], (req, res, next) => {

    let idProject = req.params.idProject;

    CommonServiceTask.find({ 'project': idProject, 'recordActive': true })
        .populate('commonService')
        .populate('task')
        .populate('project')
        .exec(
            (err, commonServiceTasks) => {
                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: 'No se pueden consultar la información',
                        errors: err,
                        user: req.user
                    });
                } else {
                    CommonServiceTask.find({ 'project': idProject, 'recordActive': true }).count({}, (err, totalRecords) => {
                        res.status(200).write(JSON.stringify({
                            success: true,
                            commonServiceTasks: commonServiceTasks,
                            totalRecords: totalRecords,
                            user: req.user
                        }, null, 2));
                        res.end();

                    });
                }
            });
});

router.get('/project/:idProject/:type', [authentication.verifyToken, authentication.refreshToken], (req, res, next) => {

    let idProject = req.params.idProject;
    let type = req.params.type;

    CommonServiceTask.find({ 'project': idProject, 'type': type, 'recordActive': true })
        .populate('commonService')
        .populate('task')
        .populate('project')
        .exec(
            (err, commonServiceTasks) => {
                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: 'No se pueden consultar la información',
                        errors: err,
                        user: req.user
                    });
                } else {
                    CommonServiceTask.find({ 'project': idProject, 'type': type, 'recordActive': true }).count({}, (err, totalRecords) => {
                        res.status(200).write(JSON.stringify({
                            success: true,
                            commonServiceTasks: commonServiceTasks,
                            totalRecords: totalRecords,
                            user: req.user
                        }, null, 2));
                        res.end();

                    });
                }
            });
});

router.post('/', [authentication.verifyToken, authentication.refreshToken], (req, res, next) => {
    let commonServiceTask = new CommonServiceTask({
        commonService: req.body.commonService,
        task: req.body.task,
        type: req.body.type,
        project: req.body.project,
        startDate: req.body.startDate,
        updateDate: req.body.updateDate,
        endDate: req.body.endDate,
        status: req.body.status
    });
    commonServiceTask.save((err, commonServiceTask) => {
        if (err) {
            return res.status(400).json({
                success: false,
                message: 'No se puede guardar el registro',
                errors: err,
                user: req.user
            });
        } else {
            res.status(201).json({
                success: true,
                message: 'Operación realizada de forma exitosa.',
                commonServiceTask: commonServiceTask,
                user: req.user
            });
        }
    });
});

router.put('/:id', [authentication.verifyToken, authentication.refreshToken], (req, res, next) => {

    let id = req.params.id;

    CommonServiceTask.findById(id, (err, commonServiceTask) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: 'No se puede actualizar el registro',
                errors: err,
                user: req.user
            });
        }

        if (!commonServiceTask) {
            return res.status(400).json({
                success: false,
                message: 'No existe un registro con el id: ' + id,
                errors: { message: 'No se pudo encontrar el registro para actualizar' },
                user: req.user
            });
        } else {

            commonServiceTask.task = req.body.task;
            commonServiceTask.commonService = req.body.commonService;
            commonServiceTask.type = req.body.type;
            commonServiceTask.project = req.body.project;
            commonServiceTask.startDate = req.body.startDate;
            commonServiceTask.updateDate = req.body.updateDate;
            commonServiceTask.endDate = req.body.endDate;
            commonServiceTask.status = req.body.status;
            commonServiceTask.recordActive = req.body.recordActive || true;

            commonServiceTask.save((err, commonServiceTask) => {
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
                        commonServiceTask: commonServiceTask,
                        user: req.user
                    });
                }
            });

        }
    })
});


router.delete('/:id', [authentication.verifyToken, authentication.refreshToken], (req, res, next) => {

    let id = req.params.id;

    CommonServiceTask.findById(id, (err, commonServiceTask) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: 'No se puede eliminar el registro',
                errors: err,
                user: req.user
            });
        }

        if (!commonServiceTask) {
            return res.status(400).json({
                success: false,
                message: 'No existe un registro con el id: ' + id,
                errors: { message: 'No se pudo encontrar el registro para eliminar' },
                user: req.user
            });
        } else {

            commonServiceTask.recordActive = false;

            commonServiceTask.save((err, commonServiceTask) => {
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
                        commonServiceTask: commonServiceTask,
                        user: req.user
                    });
                }
            });

        }
    })
});

module.exports = router;
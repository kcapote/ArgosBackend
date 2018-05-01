const express = require('express');
const router = express.Router();
const constants = require('../config/constants');
const jwt = require('jsonwebtoken');
const UndergroundTask = require('../models/undergroundTask');
const authentication = require('../middlewares/authentication');

router.get('/', authentication.verifyToken, (req, res, next) => {

    let pagination = req.query.pagination || 0;
    pagination = Number(pagination);

    UndergroundTask.find()
        .populate('underground')
        .populate('task')
        .populate('project')
        .skip(pagination)
        .limit(constants.PAGINATION)
        .exec(
            (err, undergroundTasks) => {
                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: 'No se pueden consultar la información',
                        errors: err
                    });
                } else {
                    UndergroundTask.count({}, (err, totalRecords) => {
                        res.status(200).write(JSON.stringify({
                            success: true,
                            undergroundTasks: undergroundTasks,
                            totalRecords: totalRecords,
                            pagination: pagination
                        }, null, 2));
                        res.end();

                    });
                }
            });
});

router.get('/task/:idProject/:idTask', authentication.verifyToken, (req, res, next) => {

    let idProject = req.params.idProject;
    let idTask = req.params.idTask;

    UndergroundTask.find({ 'project': idProject, 'task': idTask })
        .populate('underground')
        .populate('task')
        .populate('project')
        .exec(
            (err, undergroundTasks) => {
                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: 'No se pueden consultar la información',
                        errors: err
                    });
                } else {
                    UndergroundTask.count({}, (err, totalRecords) => {
                        res.status(200).write(JSON.stringify({
                            success: true,
                            undergroundTasks: undergroundTasks,
                            totalRecords: totalRecords
                        }, null, 2));
                        res.end();

                    });
                }
            });
});


router.get('/underground/:idProject/:idUnderground', authentication.verifyToken, (req, res, next) => {

    let idProject = req.params.idProject;
    let idUnderground = req.params.idUnderground;

    UndergroundTask.find({ 'project': idProject, 'underground': idUnderground })
        .populate('underground')
        .populate('task')
        .populate('project')
        .exec(
            (err, undergroundTasks) => {
                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: 'No se pueden consultar la información',
                        errors: err
                    });
                } else {
                    UndergroundTask.count({}, (err, totalRecords) => {
                        res.status(200).write(JSON.stringify({
                            success: true,
                            undergroundTasks: undergroundTasks,
                            totalRecords: totalRecords
                        }, null, 2));
                        res.end();

                    });
                }
            });
});


router.post('/', authentication.verifyToken, (req, res, next) => {
    let undergroundTask = new UndergroundTask({
        task: req.body.task,
        underground: req.body.underground,
        project: req.body.project,
        startDate: req.body.startDate,
        updateDate: req.body.updateDate,
        endDate: req.body.endDate,
        status: req.body.status
    });
    undergroundTask.save((err, undergroundTask) => {
        if (err) {
            return res.status(400).json({
                success: false,
                message: 'No se puede guardar el registro',
                errors: err
            });
        } else {
            res.status(201).json({
                success: true,
                message: 'Operación realizada de forma exitosa.',
                undergroundTask: undergroundTask
            });
        }
    });
});

router.put('/:id', authentication.verifyToken, (req, res, next) => {

    let id = req.params.id;

    UndergroundTask.findById(id, (err, undergroundTask) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: 'No se puede actualizar el registro',
                errors: err
            });
        }

        if (!undergroundTask) {
            return res.status(400).json({
                success: false,
                message: 'No existe un registro con el id: ' + id,
                errors: { message: 'No se pudo encontrar el registro para actualizar' }
            });
        } else {

            undergroundTask.task = req.body.task;
            undergroundTask.underground = req.body.underground;
            undergroundTask.project = req.body.project;
            undergroundTask.startDate = req.body.startDate;
            undergroundTask.updateDate = req.body.updateDate;
            undergroundTask.endDate = req.body.endDate;
            undergroundTask.status = req.body.status;

            undergroundTask.save((err, undergroundTask) => {
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
                        undergroundTask: undergroundTask
                    });
                }
            });

        }
    })
});


router.delete('/:id', authentication.verifyToken, (req, res, next) => {

    let id = req.params.id;

    UndergroundTask.findByIdAndRemove(id, (err, undergroundTask) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: 'No se puede eliminar el registro',
                errors: err
            });
        } else if (undergroundTask) {
            res.status(200).json({
                success: true,
                message: 'Operación realizada de forma exitosa',
                undergroundTask: undergroundTask
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
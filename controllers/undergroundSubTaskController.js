const express = require('express');
const router = express.Router();
const constants = require('../config/constants');
const jwt = require('jsonwebtoken');
const UndergroundSubTask = require('../models/undergroundSubTask');
const authentication = require('../middlewares/authentication');

router.get('/', authentication.verifyToken, (req, res, next) => {

    let pagination = req.query.pagination || 0;
    pagination = Number(pagination);

    UndergroundSubTask.find()
        .populate('underground')
        .populate('subTask')
        .populate('task')
        .populate('project')
        .skip(pagination)
        .limit(constants.PAGINATION)
        .exec(
            (err, undergroundSubTasks) => {
                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: 'No se pueden consultar la información',
                        errors: err
                    });
                } else {
                    UndergroundSubTask.count({}, (err, totalRecords) => {
                        res.status(200).write(JSON.stringify({
                            success: true,
                            undergroundSubTasks: undergroundSubTasks,
                            totalRecords: totalRecords,
                            pagination: pagination
                        }, null, 2));
                        res.end();

                    });
                }
            });
});

router.get('/task/:idProject/:idSubTask', authentication.verifyToken, (req, res, next) => {

    let idProject = req.params.idProject;
    let idSubTask = req.params.idSubTask;

    UndergroundSubTask.find({ 'project': idProject, 'subTask': idSubTask })
        .populate('underground')
        .populate('subTask')
        .populate('task')
        .populate('project')
        .exec(
            (err, undergroundSubTasks) => {
                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: 'No se pueden consultar la información',
                        errors: err
                    });
                } else {
                    UndergroundSubTask.count({}, (err, totalRecords) => {
                        res.status(200).write(JSON.stringify({
                            success: true,
                            undergroundSubTasks: undergroundSubTasks,
                            totalRecords: totalRecords
                        }, null, 2));
                        res.end();

                    });
                }
            });
});

router.get('/task/:idProject/:idTask', authentication.verifyToken, (req, res, next) => {

    let idProject = req.params.idProject;
    let idTask = req.params.idTask;

    UndergroundSubTask.find({ 'project': idProject, 'task': idTask })
        .populate('underground')
        .populate('subTask')
        .populate('task')
        .populate('project')
        .exec(
            (err, undergroundSubTasks) => {
                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: 'No se pueden consultar la información',
                        errors: err
                    });
                } else {
                    UndergroundSubTask.count({}, (err, totalRecords) => {
                        res.status(200).write(JSON.stringify({
                            success: true,
                            undergroundSubTasks: undergroundSubTasks,
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

    UndergroundSubTask.find({ 'project': idProject, 'underground': idUnderground })
        .populate('underground')
        .populate('subTask')
        .populate('task')
        .populate('project')
        .exec(
            (err, undergroundSubTasks) => {
                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: 'No se pueden consultar la información',
                        errors: err
                    });
                } else {
                    UndergroundSubTask.count({}, (err, totalRecords) => {
                        res.status(200).write(JSON.stringify({
                            success: true,
                            undergroundSubTasks: undergroundSubTasks,
                            totalRecords: totalRecords
                        }, null, 2));
                        res.end();

                    });
                }
            });
});


router.post('/', authentication.verifyToken, (req, res, next) => {
    let undergroundSubTask = new UndergroundSubTask({
        subTask: req.body.subTask,
        task: req.body.task,
        underground: req.body.underground,
        project: req.body.project,
        startDate: req.body.startDate,
        updateDate: req.body.updateDate,
        endDate: req.body.endDate,
        status: req.body.status
    });
    undergroundSubTask.save((err, undergroundSubTask) => {
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
                undergroundSubTask: undergroundSubTask
            });
        }
    });
});

router.put('/:id', authentication.verifyToken, (req, res, next) => {

    let id = req.params.id;

    UndergroundSubTask.findById(id, (err, undergroundSubTask) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: 'No se puede actualizar el registro',
                errors: err
            });
        }

        if (!undergroundSubTask) {
            return res.status(400).json({
                success: false,
                message: 'No existe un registro con el id: ' + id,
                errors: { message: 'No se pudo encontrar el registro para actualizar' }
            });
        } else {

            undergroundSubTask.task = req.body.task;
            undergroundSubTask.subTask = req.body.subTask;
            undergroundSubTask.underground = req.body.underground;
            undergroundSubTask.project = req.body.project;
            undergroundSubTask.startDate = req.body.startDate;
            undergroundSubTask.updateDate = req.body.updateDate;
            undergroundSubTask.endDate = req.body.endDate;
            undergroundSubTask.status = req.body.status;

            undergroundSubTask.save((err, undergroundSubTask) => {
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
                        undergroundSubTask: undergroundSubTask
                    });
                }
            });

        }
    })
});


router.delete('/:id', authentication.verifyToken, (req, res, next) => {

    let id = req.params.id;

    UndergroundSubTask.findByIdAndRemove(id, (err, undergroundSubTask) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: 'No se puede eliminar el registro',
                errors: err
            });
        } else if (undergroundSubTask) {
            res.status(200).json({
                success: true,
                message: 'Operación realizada de forma exitosa',
                undergroundSubTask: undergroundSubTask
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
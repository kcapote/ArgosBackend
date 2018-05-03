const express = require('express');
const router = express.Router();
const constants = require('../config/constants');
const jwt = require('jsonwebtoken');
const EmplacementSubTask = require('../models/emplacementSubTask');
const authentication = require('../middlewares/authentication');

router.get('/', authentication.verifyToken, (req, res, next) => {

    let pagination = req.query.pagination || 0;
    pagination = Number(pagination);

    EmplacementSubTask.find()
        .populate('subTask')
        .populate('task')
        .populate('emplacement')
        .populate('project')
        .skip(pagination)
        .limit(constants.PAGINATION)
        .exec(
            (err, emplacementSubTasks) => {
                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: 'No se pueden consultar la información',
                        errors: err
                    });
                } else {
                    EmplacementSubTask.count({}, (err, totalRecords) => {
                        res.status(200).write(JSON.stringify({
                            success: true,
                            emplacementSubTasks: emplacementSubTasks,
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

    EmplacementSubTask.find({ 'project': idProject, 'task': idTask })
        .populate('subTask')
        .populate('task')
        .populate('emplacement')
        .populate('project')
        .exec(
            (err, emplacementSubTasks) => {
                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: 'No se pueden consultar la información',
                        errors: err
                    });
                } else {
                    EmplacementSubTask.count({}, (err, totalRecords) => {
                        res.status(200).write(JSON.stringify({
                            success: true,
                            emplacementSubTasks: emplacementSubTasks,
                            totalRecords: totalRecords
                        }, null, 2));
                        res.end();

                    });
                }
            });
});

router.get('/subTask/:idProject/:idSubTask', authentication.verifyToken, (req, res, next) => {

    let idProject = req.params.idProject;
    let idSubTask = req.params.idSubTask;

    EmplacementSubTask.find({ 'project': idProject, 'subTask': subTask })
        .populate('subTask')
        .populate('task')
        .populate('emplacement')
        .populate('project')
        .exec(
            (err, emplacementSubTasks) => {
                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: 'No se pueden consultar la información',
                        errors: err
                    });
                } else {
                    EmplacementSubTask.count({}, (err, totalRecords) => {
                        res.status(200).write(JSON.stringify({
                            success: true,
                            emplacementSubTasks: emplacementSubTasks,
                            totalRecords: totalRecords
                        }, null, 2));
                        res.end();

                    });
                }
            });
});

router.get('/project/:idProject', authentication.verifyToken, (req, res, next) => {

    let idProject = req.params.idProject;

    EmplacementSubTask.find({ 'project': idProject })
        .populate('subTask')
        .populate('task')
        .populate('emplacement')
        .populate('project')
        .exec(
            (err, emplacementSubTasks) => {
                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: 'No se pueden consultar la información',
                        errors: err
                    });
                } else {
                    EmplacementSubTask.count({}, (err, totalRecords) => {
                        res.status(200).write(JSON.stringify({
                            success: true,
                            emplacementSubTasks: emplacementSubTasks,
                            totalRecords: totalRecords
                        }, null, 2));
                        res.end();

                    });
                }
            });
});

router.get('/emplacement/:idProject/:idEmplacement', authentication.verifyToken, (req, res, next) => {

    let idProject = req.params.idProject;
    let idEmplacement = req.params.idEmplacement;

    EmplacementSubTask.find({ 'project': idProject, 'emplacement': idEmplacement })
        .populate('subTask')
        .populate('task')
        .populate('emplacement')
        .populate('project')
        .exec(
            (err, emplacementSubTasks) => {
                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: 'No se pueden consultar la información',
                        errors: err
                    });
                } else {
                    EmplacementSubTask.count({}, (err, totalRecords) => {
                        res.status(200).write(JSON.stringify({
                            success: true,
                            emplacementSubTasks: emplacementSubTasks,
                            totalRecords: totalRecords
                        }, null, 2));
                        res.end();

                    });
                }
            });
});


router.post('/', authentication.verifyToken, (req, res, next) => {
    let emplacementSubTask = new EmplacementSubTask({
        task: req.body.task,
        subTask: req.body.subTask,
        emplacement: req.body.emplacement,
        project: req.body.project,
        startDate: req.body.startDate,
        updateDate: req.body.updateDate,
        endDate: req.body.endDate,
        status: req.body.status
    });
    emplacementSubTask.save((err, emplacementSubTask) => {
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
                emplacementSubTask: emplacementSubTask
            });
        }
    });
});

router.put('/:id', authentication.verifyToken, (req, res, next) => {

    let id = req.params.id;

    EmplacementSubTask.findById(id, (err, emplacementSubTask) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: 'No se puede actualizar el registro',
                errors: err
            });
        }

        if (!emplacementSubTask) {
            return res.status(400).json({
                success: false,
                message: 'No existe un registro con el id: ' + id,
                errors: { message: 'No se pudo encontrar el registro para actualizar' }
            });
        } else {

            emplacementSubTask.subTask = req.body.subTask;
            emplacementSubTask.task = req.body.task;
            emplacementSubTask.emplacement = req.body.emplacement;
            emplacementSubTask.project = req.body.project;
            emplacementSubTask.startDate = req.body.startDate;
            emplacementSubTask.updateDate = req.body.updateDate;
            emplacementSubTask.endDate = req.body.endDate;
            emplacementSubTask.status = req.body.status;

            emplacementSubTask.save((err, emplacementSubTask) => {
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
                        emplacementSubTask: emplacementSubTask
                    });
                }
            });

        }
    })
});


router.delete('/:id', authentication.verifyToken, (req, res, next) => {

    let id = req.params.id;

    EmplacementSubTask.findByIdAndRemove(id, (err, emplacementSubTask) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: 'No se puede eliminar el registro',
                errors: err
            });
        } else if (emplacementSubTask) {
            res.status(200).json({
                success: true,
                message: 'Operación realizada de forma exitosa',
                emplacementSubTask: emplacementSubTask
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
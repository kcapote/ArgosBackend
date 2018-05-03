const express = require('express');
const router = express.Router();
const constants = require('../config/constants');
const jwt = require('jsonwebtoken');
const EmplacementTask = require('../models/emplacementTask');
const authentication = require('../middlewares/authentication');

router.get('/', authentication.verifyToken, (req, res, next) => {

    let pagination = req.query.pagination || 0;
    pagination = Number(pagination);

    EmplacementTask.find()
        .populate('task')
        .populate('emplacement')
        .populate('project')
        .skip(pagination)
        .limit(constants.PAGINATION)
        .exec(
            (err, emplacementTasks) => {
                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: 'No se pueden consultar la información',
                        errors: err
                    });
                } else {
                    EmplacementTask.count({}, (err, totalRecords) => {
                        res.status(200).write(JSON.stringify({
                            success: true,
                            emplacementTasks: emplacementTasks,
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

    EmplacementTask.find({ 'project': idProject, 'task': idTask })
        .populate('task')
        .populate('emplacement')
        .populate('project')
        .exec(
            (err, emplacementTasks) => {
                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: 'No se pueden consultar la información',
                        errors: err
                    });
                } else {
                    EmplacementTask.count({}, (err, totalRecords) => {
                        res.status(200).write(JSON.stringify({
                            success: true,
                            emplacementTasks: emplacementTasks,
                            totalRecords: totalRecords
                        }, null, 2));
                        res.end();

                    });
                }
            });
});

router.get('/project/:idProject', authentication.verifyToken, (req, res, next) => {

    let idProject = req.params.idProject;

    EmplacementTask.find({ 'project': idProject })
        .populate('task')
        .populate('emplacement')
        .populate('project')
        .exec(
            (err, emplacementTasks) => {
                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: 'No se pueden consultar la información',
                        errors: err
                    });
                } else {
                    EmplacementTask.count({}, (err, totalRecords) => {
                        res.status(200).write(JSON.stringify({
                            success: true,
                            emplacementTasks: emplacementTasks,
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

    EmplacementTask.find({ 'project': idProject, 'emplacement': idEmplacement })
        .populate('task')
        .populate('emplacement')
        .populate('project')
        .exec(
            (err, emplacementTasks) => {
                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: 'No se pueden consultar la información',
                        errors: err
                    });
                } else {
                    EmplacementTask.count({}, (err, totalRecords) => {
                        res.status(200).write(JSON.stringify({
                            success: true,
                            emplacementTasks: emplacementTasks,
                            totalRecords: totalRecords
                        }, null, 2));
                        res.end();

                    });
                }
            });
});


router.post('/', authentication.verifyToken, (req, res, next) => {
    let emplacementTask = new EmplacementTask({
        task: req.body.task,
        emplacement: req.body.emplacement,
        project: req.body.project,
        startDate: req.body.startDate,
        updateDate: req.body.updateDate,
        endDate: req.body.endDate,
        status: req.body.status
    });
    emplacementTask.save((err, emplacementTask) => {
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
                emplacementTask: emplacementTask
            });
        }
    });
});

router.put('/:id', authentication.verifyToken, (req, res, next) => {

    let id = req.params.id;

    EmplacementTask.findById(id, (err, emplacementTask) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: 'No se puede actualizar el registro',
                errors: err
            });
        }

        if (!emplacementTask) {
            return res.status(400).json({
                success: false,
                message: 'No existe un registro con el id: ' + id,
                errors: { message: 'No se pudo encontrar el registro para actualizar' }
            });
        } else {

            emplacementTask.task = req.body.task;
            emplacementTask.emplacement = req.body.emplacement;
            emplacementTask.project = req.body.project;
            emplacementTask.startDate = req.body.startDate;
            emplacementTask.updateDate = req.body.updateDate;
            emplacementTask.endDate = req.body.endDate;
            emplacementTask.status = req.body.status;

            emplacementTask.save((err, emplacementTask) => {
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
                        emplacementTask: emplacementTask
                    });
                }
            });

        }
    })
});


router.delete('/:id', authentication.verifyToken, (req, res, next) => {

    let id = req.params.id;

    EmplacementTask.findByIdAndRemove(id, (err, emplacementTask) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: 'No se puede eliminar el registro',
                errors: err
            });
        } else if (emplacementTask) {
            res.status(200).json({
                success: true,
                message: 'Operación realizada de forma exitosa',
                emplacementTask: emplacementTask
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
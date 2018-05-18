const express = require('express');
const router = express.Router();
const constants = require('../config/constants');
const jwt = require('jsonwebtoken');
const SubTask = require('../models/subTask');
const authentication = require('../middlewares/authentication');

router.get('/', authentication.verifyToken, (req, res, next) => {

    let pagination = req.query.pagination || 0;
    pagination = Number(pagination);

    SubTask.find()
        .populate('task')
        .skip(pagination)
        .limit(constants.PAGINATION)
        .sort({ position: 1 })
        .exec(
            (err, subTasks) => {
                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: 'No se pueden consultar las tareas',
                        errors: err
                    });
                } else {
                    SubTask.count({}, (err, totalRecords) => {
                        res.status(200).write(JSON.stringify({
                            success: true,
                            subTasks: subTasks,
                            totalRecords: subTasks.length,
                            pagination: pagination
                        }, null, 2));
                        res.end();

                    });
                }
            });
});

router.get('/recordActive/:recordActive', authentication.verifyToken, (req, res, next) => {

    let pagination = req.query.pagination || 0;
    pagination = Number(pagination);
    let recordActive = req.params.recordActive;
    recordActive = Boolean(recordActive);

    SubTask.find({ 'recordActive': recordActive })
        .populate('task')
        .skip(pagination)
        .limit(constants.PAGINATION)
        .sort({ position: 1 })
        .exec(
            (err, subTasks) => {
                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: 'No se pueden consultar las tareas',
                        errors: err
                    });
                } else {
                    SubTask.count({}, (err, totalRecords) => {
                        res.status(200).write(JSON.stringify({
                            success: true,
                            subTasks: subTasks,
                            totalRecords: subTasks.length,
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

    SubTask.find()
        .populate('task')
        .or([{ 'name': regex }]) //arreglo de campos a tomar en cuenta para la busqueda
        .skip(pagination)
        .limit(constants.PAGINATION)
        .sort({ position: 1 })
        .exec(
            (err, subTasks) => {
                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: 'No se encontraron resultados',
                        errors: err
                    });
                } else {

                    SubTask.count({}, (err, totalRecords) => {
                        res.status(200).write(JSON.stringify({
                            success: true,
                            subTasks: subTasks,
                            totalRecords: subTasks.length,
                            pagination: pagination
                        }, null, 2));
                        res.end();

                    });
                }
            });
});

router.get('/search/:term/:recordActive', authentication.verifyToken, (req, res, next) => {

    let term = req.params.term;
    var regex = new RegExp(term, 'i');

    let pagination = req.query.pagination || 0;
    pagination = Number(pagination);
    let recordActive = req.params.recordActive;
    recordActive = Boolean(recordActive);

    SubTask.find({ 'recordActive': recordActive })
        .populate('task')
        .or([{ 'name': regex }]) //arreglo de campos a tomar en cuenta para la busqueda
        .skip(pagination)
        .limit(constants.PAGINATION)
        .sort({ position: 1 })
        .exec(
            (err, subTasks) => {
                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: 'No se encontraron resultados',
                        errors: err
                    });
                } else {

                    SubTask.count({}, (err, totalRecords) => {
                        res.status(200).write(JSON.stringify({
                            success: true,
                            subTasks: subTasks,
                            totalRecords: subTasks.length,
                            pagination: pagination
                        }, null, 2));
                        res.end();

                    });
                }
            });
});


router.get('/task/:id', authentication.verifyToken, (req, res, next) => {

    let id = req.params.id;

    SubTask.find({ 'task': id, 'recordActive': true })
        .populate('task')
        .exec(
            (err, subTasks) => {
                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: 'No se pueden consultar las tareas',
                        errors: err
                    });
                } else {
                    SubTask.count({}, (err, totalRecords) => {
                        res.status(200).write(JSON.stringify({
                            success: true,
                            subTasks: subTasks,
                            totalRecords: subTasks.length
                        }, null, 2));
                        res.end();

                    });
                }
            });
});

router.get('/:id', authentication.verifyToken, (req, res, next) => {

    let id = req.params.id;

    SubTask.find({ '_id': id })
        .populate('task')
        .exec(
            (err, subTasks) => {
                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: 'No se pueden consultar las tareas',
                        errors: err
                    });
                } else {
                    SubTask.count({}, (err, totalRecords) => {
                        res.status(200).write(JSON.stringify({
                            success: true,
                            subTasks: subTasks,
                            totalRecords: subTasks.length
                        }, null, 2));
                        res.end();

                    });
                }
            });
});

router.post('/', authentication.verifyToken, (req, res, next) => {
    let subTask = new SubTask({
        name: req.body.name,
        task: req.body.task,
        position: req.body.position
    });
    subTask.save((err, subTask) => {
        if (err) {
            return res.status(400).json({
                success: false,
                message: 'No se puede crear la tarea',
                errors: err
            });
        } else {
            res.status(201).json({
                success: true,
                message: 'Operación realizada de forma exitosa.',
                subTask: subTask
            });
        }
    });
});

router.put('/:id', authentication.verifyToken, (req, res, next) => {

    let id = req.params.id;

    SubTask.findById(id, (err, subTask) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: 'No se puede actualizar la tarea',
                errors: err
            });
        }

        if (!subTask) {
            return res.status(400).json({
                success: false,
                message: 'No existe una tarea con el id: ' + id,
                errors: { message: 'No se pudo encontrar la tarea para actualizar' }
            });
        } else {

            subTask.name = req.body.name;
            subTask.position = req.body.position;
            subTask.recordActive = req.body.recordActive || true;

            subTask.save((err, subTask) => {
                if (err) {
                    return res.status(400).json({
                        success: false,
                        message: 'No se puede actualizar la tarea',
                        errors: err
                    });
                } else {
                    res.status(200).json({
                        success: true,
                        message: 'Operación realizada de forma exitosa.',
                        subTask: subTask
                    });
                }
            });

        }
    })
});


router.delete('/:id', authentication.verifyToken, (req, res, next) => {

    let id = req.params.id;

    SubTask.findById(id, (err, subTask) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: 'No se puede eliminar la tarea',
                errors: err
            });
        }

        if (!subTask) {
            return res.status(400).json({
                success: false,
                message: 'No existe una tarea con el id: ' + id,
                errors: { message: 'No se pudo encontrar la tarea para eliminar' }
            });
        } else {

            subTask.recordActive = false;

            subTask.save((err, subTask) => {
                if (err) {
                    return res.status(400).json({
                        success: false,
                        message: 'No se puede eliminar la tarea',
                        errors: err
                    });
                } else {
                    res.status(200).json({
                        success: true,
                        message: 'Operación realizada de forma exitosa.',
                        subTask: subTask
                    });
                }
            });

        }
    })
});

module.exports = router;
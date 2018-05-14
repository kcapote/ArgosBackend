const express = require('express');
const router = express.Router();
const constants = require('../config/constants');
const jwt = require('jsonwebtoken');
const Task = require('../models/task');
const SubTask = require('../models/subTask');
const authentication = require('../middlewares/authentication');

router.get('/', authentication.verifyToken, (req, res, next) => {

    let pagination = req.query.pagination || 0;
    pagination = Number(pagination);

    Task.find()
        .skip(pagination)
        .limit(constants.PAGINATION)
        .sort({ position: 1 })
        .exec(
            (err, tasks) => {
                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: 'No se pueden consultar las tareas',
                        errors: err
                    });
                } else {
                    Task.count({}, (err, totalRecords) => {
                        res.status(200).write(JSON.stringify({
                            success: true,
                            tasks: tasks,
                            totalRecords: totalRecords,
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


    Task.find({ 'recordActive': recordActive })
        .skip(pagination)
        .limit(constants.PAGINATION)
        .sort({ position: 1 })
        .exec(
            (err, tasks) => {
                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: 'No se pueden consultar las tareas',
                        errors: err
                    });
                } else {
                    Task.count({}, (err, totalRecords) => {
                        res.status(200).write(JSON.stringify({
                            success: true,
                            tasks: tasks,
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

    Task.find()
        .or([{ 'name': regex }]) //arreglo de campos a tomar en cuenta para la busqueda
        .skip(pagination)
        .limit(constants.PAGINATION)
        .sort({ position: 1 })
        .exec(
            (err, tasks) => {
                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: 'No se encontraron resultados',
                        errors: err
                    });
                } else {

                    Task.count({}, (err, totalRecords) => {
                        res.status(200).write(JSON.stringify({
                            success: true,
                            tasks: tasks,
                            totalRecords: tasks.length,
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

    Task.find({ 'recordActive': recordActive })
        .or([{ 'name': regex }]) //arreglo de campos a tomar en cuenta para la busqueda
        .skip(pagination)
        .limit(constants.PAGINATION)
        .sort({ position: 1 })
        .exec(
            (err, tasks) => {
                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: 'No se encontraron resultados',
                        errors: err
                    });
                } else {

                    Task.count({}, (err, totalRecords) => {
                        res.status(200).write(JSON.stringify({
                            success: true,
                            tasks: tasks,
                            totalRecords: tasks.length,
                            pagination: pagination
                        }, null, 2));
                        res.end();

                    });
                }
            });
});


router.get('/:id', authentication.verifyToken, (req, res, next) => {

    let id = req.params.id;

    console.log(id);

    Task.findById(id, (err, task) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: 'No se puede actualizar la tarea',
                errors: err
            });
        }

        if (!task) {
            return res.status(400).json({
                success: false,
                message: 'No existe una tarea con el id: ' + id,
                errors: { message: 'No se pudo encontrar la tarea para actualizar' }
            });
        } else {

            res.status(200).json({
                success: true,
                message: 'Operación realizada de forma exitosa.',
                task: task
            });

        }
    })
});

router.post('/', authentication.verifyToken, (req, res, next) => {
    let task = new Task({
        name: req.body.name,
        type: req.body.type,
        position: req.body.position
    });
    task.save((err, taskSave) => {
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
                task: taskSave
            });
        }
    });
});

router.put('/:id', authentication.verifyToken, (req, res, next) => {

    let id = req.params.id;

    Task.findById(id, (err, task) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: 'No se puede actualizar la tarea',
                errors: err
            });
        }

        if (!task) {
            return res.status(400).json({
                success: false,
                message: 'No existe una tarea con el id: ' + id,
                errors: { message: 'No se pudo encontrar la tarea para actualizar' }
            });
        } else {

            task.name = req.body.name;
            task.type = req.body.type;
            task.position = req.body.position;
            task.recordActive = req.body.recordActive;

            task.save((err, taskSave) => {
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
                        task: taskSave
                    });
                }
            });

        }
    })
});


router.delete('/:id', authentication.verifyToken, (req, res, next) => {

    let id = req.params.id;

    Task.findById(id, (err, task) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: 'No se puede eliminar la tarea',
                errors: err
            });
        }

        if (!task) {
            return res.status(400).json({
                success: false,
                message: 'No existe una tarea con el id: ' + id,
                errors: { message: 'No se pudo encontrar la tarea para eliminar' }
            });
        } else {

            task.name = req.body.name;
            task.type = req.body.type;
            task.position = req.body.position;
            task.recordActive = false;

            task.save((err, taskSave) => {
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
                        task: taskSave
                    });
                }
            });

        }
    })
});
module.exports = router;
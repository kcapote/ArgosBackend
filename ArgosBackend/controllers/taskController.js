const express = require('express');
const router = express.Router();

const Task = require('../models/task');

router.get('/', (req, res) => {

    let pagination = req.query.pagination || 0;
    pagination = Number(pagination);

    Task.find()
        .skip(pagination)
        .limit(10)
        .exec(
            (err, tasks) => {
                if (err) {
                    res.status(500).json({
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

router.get('/search/:term', (req, res) => {

    let term = req.params.term;
    var regex = new RegExp(term, 'i');

    let pagination = req.query.pagination || 0;
    pagination = Number(pagination);

    Task.find()
        .or([{ 'name': regex }]) //arreglo de campos a tomar en cuenta para la busqueda
        .skip(pagination)
        .limit(10)
        .exec(
            (err, tasks) => {
                if (err) {
                    res.status(500).json({
                        success: false,
                        message: 'No se encontrarón resultados',
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


router.post('/', (req, res, next) => {
    
    console.log(req.body);
    
    let task = new Task({
        name: req.body.name,
        description: req.body.description,
        subTask: [...req.body.subTask]
    });
    task.save((err, taskSave) => {
        if (err) {
            res.status(400).json({
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

router.put('/:id', (req, res, next) => {

    let id = req.params.id;

    Task.findById(id, (err, task) => {
        if (err) {
            res.status(500).json({
                success: false,
                message: 'No se puede actualizar la tarea',
                errors: err
            });
        }

        if (!task) {
            res.status(400).json({
                success: false,
                message: 'No existe una tarea con el id: ' + id,
                errors: { message: 'No se pudo encontrar la tarea para actualizar' }
            });
        } else {
            task.name = req.body.name;
            task.description = req.body.description;

            task.save((err, taskSave) => {
                if (err) {
                    res.status(400).json({
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


router.delete('/:id', (req, res, next) => {

    let id = req.params.id;

    Task.findByIdAndRemove(id, (err, taskRemove) => {
        if (err) {
            res.status(500).json({
                success: false,
                message: 'No se puede eliminar la tarea',
                errors: err
            });
        } else if (taskRemove) {
            res.status(200).json({
                success: true,
                message: 'Operación realizada de forma exitosa',
                task: taskRemove
            });
        } else {
            res.status(400).json({
                success: false,
                message: 'No existe una tarea con el id: ' + id,
                errors: { message: 'No se pudo encontrar la tarea para eliminar' }
            });
        }
    })
});

module.exports = router;
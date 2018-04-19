const express = require('express');
const router = express.Router();

const SubTask = require('../models/subTask');

router.get('/', (req, res) => {

    let pagination = req.query.pagination || 0;
    pagination = Number(pagination);

    SubTask.find()
        .skip(pagination)
        .limit(10)
        .exec(
            (err, subTasks) => {
                if (err) {
                    res.status(500).json({
                        success: false,
                        message: 'No se pueden consultar las sub tareas',
                        errors: err
                    });
                } else {

                    SubTask.count({}, (err, totalRecords) => {
                        res.status(200).write(JSON.stringify({
                            success: true,
                            subTasks: subTasks,
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

    SubTask.find()
        .or([{ 'name': regex }]) //arreglo de campos a tomar en cuenta para la busqueda
        .skip(pagination)
        .limit(10)
        .exec(
            (err, subTasks) => {
                if (err) {
                    res.status(500).json({
                        success: false,
                        message: 'No se encontrarón resultados',
                        errors: err
                    });
                } else {

                    SubTask.count({}, (err, totalRecords) => {
                        res.status(200).write(JSON.stringify({
                            success: true,
                            subTasks: subTasks,
                            totalRecords: totalRecords,
                            pagination: pagination
                        }, null, 2));
                        res.end();

                    });
                }
            });
});


router.post('/', (req, res, next) => {
    let subTask = new SubTask({
        name: req.body.name,
        description: req.body.description
    });
    subTask.save((err, subTaskSave) => {
        if (err) {
            res.status(400).json({
                success: false,
                message: 'No se puede crear la sub tarea',
                errors: err
            });
        } else {
            res.status(201).json({
                success: true,
                message: 'Operación realizada de forma exitosa.',
                subTask: subTaskSave
            });
        }
    });
});

router.put('/:id', (req, res, next) => {

    let id = req.params.id;

    SubTask.findById(id, (err, subTask) => {
        if (err) {
            res.status(500).json({
                success: false,
                message: 'No se puede actualizar la sub tarea',
                errors: err
            });
        }

        if (!subTask) {
            res.status(400).json({
                success: false,
                message: 'No existe una sub tarea con el id: ' + id,
                errors: { message: 'No se pudo encontrar la sub tarea para actualizar' }
            });
        } else {
            subTask.name = req.body.name;
            subTask.description = req.body.description;

            subTask.save((err, subTaskSave) => {
                if (err) {
                    res.status(400).json({
                        success: false,
                        message: 'No se puede actualizar la sub tarea',
                        errors: err
                    });
                } else {
                    res.status(200).json({
                        success: true,
                        message: 'Operación realizada de forma exitosa.',
                        subTask: subTaskSave
                    });
                }
            });

        }
    })
});


router.delete('/:id', (req, res, next) => {

    let id = req.params.id;

    SubTask.findByIdAndRemove(id, (err, subTaskRemove) => {
        if (err) {
            res.status(500).json({
                success: false,
                message: 'No se puede eliminar la sub tarea',
                errors: err
            });
        } else if (subTaskRemove) {
            res.status(200).json({
                success: true,
                message: 'Operación realizada de forma exitosa',
                subTask: subTaskRemove
            });
        } else {
            res.status(400).json({
                success: false,
                message: 'No existe una sub tarea con el id: ' + id,
                errors: { message: 'No se pudo encontrar la sub tarea para eliminar' }
            });
        }
    })
});

module.exports = router;
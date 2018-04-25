const express = require('express');
const router = express.Router();
const constants = require('../config/constants');
const jwt = require('jsonwebtoken');
const DepartmentTask = require('../models/departmentTask');
const Project = require('../models/project');
const Task = require('../models/task');
const authentication = require('../middlewares/authentication');


router.get('/:id', authentication.verifyToken, (req, res, next) => {

    let id = req.params.id;

    console.log(id);

    DepartmentTask.findOne({ 'department': id })
        .exec(
            (err, departmentTask) => {
                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: 'No se puede consultar la información',
                        errors: err
                    });
                }

                if (!departmentTask) {
                    return res.status(400).json({
                        success: false,
                        message: 'No existen resultados para la consulta',
                        errors: { message: 'No existen resultados para la consulta' }
                    });
                } else {

                    Project.findOne({ 'floors.departaments._id': id })
                        .exec(
                            (err, project) => {
                                if (err) {
                                    return res.status(500).json({
                                        success: false,
                                        message: 'No se puede consultar la información',
                                        errors: err
                                    });
                                }

                                Task.find({ 'subTask._id': departmentTask.subTask })
                                    .exec(
                                        (err, tasks) => {
                                            if (err) {
                                                return res.status(500).json({
                                                    success: false,
                                                    message: 'No se puede consultar la información',
                                                    errors: err
                                                });
                                            }

                                            res.status(200).json({
                                                success: true,
                                                message: 'Operación realizada de forma exitosa.',
                                                project: project,
                                                tasks: tasks
                                            });

                                        }
                                    )

                            }
                        )
                }
            })
});

router.post('/', authentication.verifyToken, (req, res, next) => {
    let departmentTask = new DepartmentTask({
        department: req.body.department,
        subTask: req.body.subTask
    });
    departmentTask.save((err, departmentTaskSave) => {
        if (err) {
            return res.status(400).json({
                success: false,
                message: 'No se puede crear el registro',
                errors: err
            });
        } else {
            res.status(201).json({
                success: true,
                message: 'Operación realizada de forma exitosa.',
                departmentTask: departmentTaskSave
            });
        }
    });
});

/*
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
            task.description = req.body.description;
            task.type = req.body.type;
            task.subTask = [...req.body.subTask];

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

*/

module.exports = router;
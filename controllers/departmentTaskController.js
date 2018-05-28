const express = require('express');
const router = express.Router();
const constants = require('../config/constants');
const jwt = require('jsonwebtoken');
const DepartmentTask = require('../models/departmentTask');
const authentication = require('../middlewares/authentication');

router.get('/', [authentication.verifyToken, authentication.refreshToken], (req, res, next) => {

    let pagination = req.query.pagination || 0;
    pagination = Number(pagination);

    DepartmentTask.find()
        .populate('department')
        .populate('task')
        .populate('floor')
        .populate('project')
        .skip(pagination)
        .limit(constants.PAGINATION)
        .exec(
            (err, departmentTasks) => {
                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: 'No se pueden consultar la información',
                        errors: err,
                        user: req.user
                    });
                } else {
                    DepartmentTask.count({}, (err, totalRecords) => {
                        res.status(200).write(JSON.stringify({
                            success: true,
                            departmentTasks: departmentTasks,
                            totalRecords: departmentTasks.length,
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

    DepartmentTask.find({ 'recordActive': recordActive })
        .populate('department')
        .populate('task')
        .populate('floor')
        .populate('project')
        .skip(pagination)
        .limit(constants.PAGINATION)
        .exec(
            (err, departmentTasks) => {
                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: 'No se pueden consultar la información',
                        errors: err,
                        user: req.user
                    });
                } else {
                    DepartmentTask.count({}, (err, totalRecords) => {
                        res.status(200).write(JSON.stringify({
                            success: true,
                            departmentTasks: departmentTasks,
                            totalRecords: departmentTasks.length,
                            pagination: pagination,
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

    DepartmentTask.find({ 'project': idProject, 'task': idTask, 'recordActive': true })
        .populate('department')
        .populate('task')
        .populate('floor')
        .populate('project')
        .exec(
            (err, departmentTasks) => {
                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: 'No se pueden consultar la información',
                        errors: err,
                        user: req.user
                    });
                } else {
                    DepartmentTask.count({}, (err, totalRecords) => {
                        res.status(200).write(JSON.stringify({
                            success: true,
                            departmentTasks: departmentTasks,
                            totalRecords: departmentTasks.length,
                            user: req.user
                        }, null, 2));
                        res.end();

                    });
                }
            });
});

router.get('/project/:idProject', [authentication.verifyToken, authentication.refreshToken], (req, res, next) => {

    let idProject = req.params.idProject;

    DepartmentTask.find({ 'project': idProject, 'recordActive': true })
        .populate('department')
        .populate('task')
        .populate('floor')
        .populate('project')
        .exec(
            (err, departmentTasks) => {
                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: 'No se pueden consultar la información',
                        errors: err,
                        user: req.user
                    });
                } else {
                    DepartmentTask.count({}, (err, totalRecords) => {
                        res.status(200).write(JSON.stringify({
                            success: true,
                            departmentTasks: departmentTasks,
                            totalRecords: departmentTasks.length,
                            user: req.user
                        }, null, 2));
                        res.end();

                    });
                }
            });
});

router.get('/department/:idProject/:idDepartment', [authentication.verifyToken, authentication.refreshToken], (req, res, next) => {

    let idProject = req.params.idProject;
    let idDepartment = req.params.idDepartment;

    DepartmentTask.find({ 'project': idProject, 'department': idDepartment, 'recordActive': true })
        .populate('department')
        .populate('task')
        .populate('floor')
        .populate('project')
        .exec(
            (err, departmentTasks) => {
                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: 'No se pueden consultar la información',
                        errors: err,
                        user: req.user
                    });
                } else {
                    DepartmentTask.count({}, (err, totalRecords) => {
                        res.status(200).write(JSON.stringify({
                            success: true,
                            departmentTasks: departmentTasks,
                            totalRecords: departmentTasks.length,
                            user: req.user
                        }, null, 2));
                        res.end();

                    });
                }
            });
});

router.get('/floor/:idProject/:idFloor', [authentication.verifyToken, authentication.refreshToken], (req, res, next) => {

    let idProject = req.params.idProject;
    let idFloor = req.params.idFloor;

    DepartmentTask.find({ 'project': idProject, 'floor': idFloor, 'recordActive': true })
        .populate('department')
        .populate('task')
        .populate('floor')
        .populate('project')
        .exec(
            (err, departmentTasks) => {
                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: 'No se pueden consultar la información',
                        errors: err,
                        user: req.user
                    });
                } else {
                    DepartmentTask.count({}, (err, totalRecords) => {
                        res.status(200).write(JSON.stringify({
                            success: true,
                            departmentTasks: departmentTasks,
                            totalRecords: departmentTasks.length,
                            user: req.user
                        }, null, 2));
                        res.end();

                    });
                }
            });
});


router.post('/', [authentication.verifyToken, authentication.refreshToken], (req, res, next) => {
    let departmentTask = new DepartmentTask({
        department: req.body.department,
        task: req.body.task,
        floor: req.body.floor,
        project: req.body.project,
        startDate: req.body.startDate,
        updateDate: req.body.updateDate,
        endDate: req.body.endDate,
        status: req.body.status
    });
    departmentTask.save((err, departmentTask) => {
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
                departmentTask: departmentTask,
                user: req.user
            });
        }
    });
});

router.put('/:id', [authentication.verifyToken, authentication.refreshToken], (req, res, next) => {

    let id = req.params.id;

    DepartmentTask.findById(id, (err, departmentTask) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: 'No se puede actualizar el registro',
                errors: err,
                user: req.user
            });
        }

        if (!departmentTask) {
            return res.status(400).json({
                success: false,
                message: 'No existe un registro con el id: ' + id,
                errors: { message: 'No se pudo encontrar el registro para actualizar' },
                user: req.user
            });
        } else {

            departmentTask.department = req.body.department;
            departmentTask.task = req.body.task;
            departmentTask.floor = req.body.floor;
            departmentTask.project = req.body.project;
            departmentTask.startDate = req.body.startDate;
            departmentTask.updateDate = req.body.updateDate;
            departmentTask.endDate = req.body.endDate;
            departmentTask.status = req.body.status;
            departmentTask.recordActive = req.body.recordActive || true;

            departmentTask.save((err, departmentTask) => {
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
                        departmentTask: departmentTask,
                        user: req.user
                    });
                }
            });

        }
    })
});


router.delete('/:id', [authentication.verifyToken, authentication.refreshToken], (req, res, next) => {

    let id = req.params.id;

    DepartmentTask.findById(id, (err, departmentTask) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: 'No se puede eliminar el registro',
                errors: err,
                user: req.user
            });
        }

        if (!departmentTask) {
            return res.status(400).json({
                success: false,
                message: 'No existe un registro con el id: ' + id,
                errors: { message: 'No se pudo encontrar el registro para eliminar' },
                user: req.user
            });
        } else {

            departmentTask.recordActive = false;

            departmentTask.save((err, departmentTask) => {
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
                        departmentTask: departmentTask,
                        user: req.user
                    });
                }
            });

        }
    })
});

module.exports = router;
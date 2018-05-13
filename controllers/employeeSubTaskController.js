const express = require('express');
const router = express.Router();
const constants = require('../config/constants');
const jwt = require('jsonwebtoken');
const EmployeeSubTask = require('../models/employeeSubTask');
const Employee = require('../models/employee');
const authentication = require('../middlewares/authentication');

router.get('/', authentication.verifyToken, (req, res, next) => {

    let pagination = req.query.pagination || 0;
    pagination = Number(pagination);

    EmployeeSubTask.find()
        .populate('employee')
        .populate('subTask')
        .populate('task')
        .populate('floor')
        .populate('department')
        .populate('commonService')
        .populate('project')
        .skip(pagination)
        .limit(constants.PAGINATION)
        .exec(
            (err, employeeSubTasks) => {
                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: 'No se pueden consultar los datos',
                        errors: err
                    });
                } else {
                    EmployeeSubTask.count({}, (err, totalRecords) => {
                        res.status(200).write(JSON.stringify({
                            success: true,
                            employeeSubTasks: employeeSubTasks,
                            totalRecords: employeeSubTasks.length,
                            pagination: pagination
                        }, null, 2));
                        res.end();

                    });
                }
            });
});

router.get('/:recordActive', authentication.verifyToken, (req, res, next) => {

    let pagination = req.query.pagination || 0;
    pagination = Number(pagination);
    let recordActive = req.params.recordActive;
    recordActive = Boolean(recordActive);

    EmployeeSubTask.find({ 'recordActive': recordActive })
        .populate('employee')
        .populate('subTask')
        .populate('task')
        .populate('floor')
        .populate('department')
        .populate('commonService')
        .populate('project')
        .skip(pagination)
        .limit(constants.PAGINATION)
        .exec(
            (err, employeeSubTasks) => {
                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: 'No se pueden consultar los datos',
                        errors: err
                    });
                } else {
                    EmployeeSubTask.count({}, (err, totalRecords) => {
                        res.status(200).write(JSON.stringify({
                            success: true,
                            employeeSubTasks: employeeSubTasks,
                            totalRecords: employeeSubTasks.length,
                            pagination: pagination
                        }, null, 2));
                        res.end();

                    });
                }
            });
});

router.get('/project/:idProject', authentication.verifyToken, (req, res, next) => {

    let idProject = req.params.idProject;

    EmployeeSubTask.find({ 'project': idProject, 'recordActive': true })
        .populate('employee')
        .populate('subTask')
        .populate('task')
        .populate('floor')
        .populate('department')
        .populate('commonService')
        .populate('project')
        .exec(
            (err, employeeSubTasks) => {
                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: 'No se pueden consultar los datos',
                        errors: err
                    });
                } else {
                    EmployeeSubTask.count({}, (err, totalRecords) => {
                        res.status(200).write(JSON.stringify({
                            success: true,
                            employeeSubTasks: employeeSubTasks,
                            totalRecords: employeeSubTasks.length
                        }, null, 2));
                        res.end();

                    });
                }
            });
});


router.get('/employee/:idProject/:idEmployee', authentication.verifyToken, (req, res, next) => {

    let idProject = req.params.idProject;
    let idEmployee = req.params.idEmployee;

    EmployeeSubTask.find({ 'project': idProject, 'employee': idEmployee, 'recordActive': true })
        .populate('employee')
        .populate('subTask')
        .populate('task')
        .populate('floor')
        .populate('department')
        .populate('commonService')
        .populate('project')
        .exec(
            (err, employeeSubTasks) => {
                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: 'No se pueden consultar los datos',
                        errors: err
                    });
                } else {
                    EmployeeSubTask.count({}, (err, totalRecords) => {
                        res.status(200).write(JSON.stringify({
                            success: true,
                            employeeSubTasks: employeeSubTasks,
                            totalRecords: employeeSubTasks.length
                        }, null, 2));
                        res.end();

                    });
                }
            });
});

router.get('/employee/calendar/:idEmployee', authentication.verifyToken, (req, res, next) => {

    let idProject = req.params.idProject;
    let idEmployee = req.params.idEmployee;

    EmployeeSubTask.find({ 'project': idProject, 'employee': idEmployee, 'recordActive': true })
        .populate('employee')
        .populate('subTask')
        .populate('task')
        .populate('floor')
        .populate('department')
        .populate('commonService')
        .populate('project')
        .exec(
            (err, employeeSubTasks) => {
                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: 'No se pueden consultar los datos',
                        errors: err
                    });
                } else {
                    EmployeeSubTask.count({}, (err, totalRecords) => {
                        res.status(200).write(JSON.stringify({
                            success: true,
                            employeeSubTasks: employeeSubTasks,
                            totalRecords: employeeSubTasks.length
                        }, null, 2));
                        res.end();

                    });
                }
            });
});

router.get('/employee/calendar/:idEmployee/:initDate/:endDate', authentication.verifyToken, (req, res, next) => {

    let idProject = req.params.idProject;
    let idEmployee = req.params.idEmployee;
    let initDate = req.params.initDate;
    let endDate = req.params.endDate;

    EmployeeSubTask.find({ 'project': idProject, 'employee': idEmployee, 'recordActive': true })
        .populate('employee')
        .populate('subTask')
        .populate('task')
        .populate('floor')
        .populate('department')
        .populate('commonService')
        .populate('project')
        .exec(
            (err, employeeSubTasks) => {
                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: 'No se pueden consultar los datos',
                        errors: err
                    });
                } else {
                    EmployeeSubTask.count({}, (err, totalRecords) => {
                        res.status(200).write(JSON.stringify({
                            success: true,
                            employeeSubTasks: employeeSubTasks,
                            totalRecords: employeeSubTasks.length
                        }, null, 2));
                        res.end();

                    });
                }
            });
});

router.get('/employee/:idProject/:idFloor/:idDepartment/:idEmployee', authentication.verifyToken, (req, res, next) => {

    let idProject = req.params.idProject;
    let idEmployee = req.params.idEmployee;
    let idFloor = req.params.idFloor;
    let idDepartment = req.params.idDepartment;

    EmployeeSubTask.find({ 'project': idProject, 'floor': idFloor, 'department': idDepartment, 'employee': idEmployee, 'recordActive': true })
        .populate('employee')
        .populate('subTask')
        .populate('task')
        .populate('floor')
        .populate('department')
        .populate('commonService')
        .populate('project')
        .exec(
            (err, employeeSubTasks) => {
                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: 'No se pueden consultar los datos',
                        errors: err
                    });
                } else {
                    EmployeeSubTask.count({}, (err, totalRecords) => {
                        res.status(200).write(JSON.stringify({
                            success: true,
                            employeeSubTasks: employeeSubTasks,
                            totalRecords: employeeSubTasks.length
                        }, null, 2));
                        res.end();

                    });
                }
            });
});

router.get('/employee/:idProject/:idCommonService/:idEmployee', authentication.verifyToken, (req, res, next) => {

    let idProject = req.params.idProject;
    let idEmployee = req.params.idEmployee;
    let idCommonService = req.params.idCommonService;

    EmployeeSubTask.find({ 'project': idProject, 'commonService': idCommonService, 'employee': idEmployee, 'recordActive': true })
        .populate('employee')
        .populate('subTask')
        .populate('task')
        .populate('floor')
        .populate('department')
        .populate('commonService')
        .populate('project')
        .exec(
            (err, employeeSubTasks) => {
                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: 'No se pueden consultar los datos',
                        errors: err
                    });
                } else {
                    EmployeeSubTask.count({}, (err, totalRecords) => {
                        res.status(200).write(JSON.stringify({
                            success: true,
                            employeeSubTasks: employeeSubTasks,
                            totalRecords: employeeSubTasks.length
                        }, null, 2));
                        res.end();

                    });
                }
            });
});

router.get('/department/:idProject/:idFloor/:idDepartment', authentication.verifyToken, (req, res, next) => {

    let idProject = req.params.idProject;
    let idDepartment = req.params.idDepartment;
    let idFloor = req.params.idFloor;

    EmployeeSubTask.find({ 'project': idProject, 'floor': idFloor, 'department': idDepartment, 'recordActive': true })
        .populate('employee')
        .populate('subTask')
        .populate('task')
        .populate('floor')
        .populate('department')
        .populate('commonService')
        .populate('project')
        .exec(
            (err, employeeSubTasks) => {
                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: 'No se pueden consultar los datos',
                        errors: err
                    });
                } else {
                    EmployeeSubTask.count({}, (err, totalRecords) => {
                        res.status(200).write(JSON.stringify({
                            success: true,
                            employeeSubTasks: employeeSubTasks,
                            totalRecords: employeeSubTasks.length
                        }, null, 2));
                        res.end();

                    });
                }
            });
});

router.get('/department/:idProject/:idFloor/:idDepartment/:idTask', authentication.verifyToken, (req, res, next) => {

    let idProject = req.params.idProject;
    let idDepartment = req.params.idDepartment;
    let idFloor = req.params.idFloor;
    let idTask = req.params.idTask;

    EmployeeSubTask.find({ 'project': idProject, 'floor': idFloor, 'department': idDepartment, 'task': idTask, 'recordActive': true })
        .populate('employee')
        .populate('subTask')
        .populate('task')
        .populate('floor')
        .populate('department')
        .populate('commonService')
        .populate('project')
        .exec(
            (err, employeeSubTasks) => {
                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: 'No se pueden consultar los datos',
                        errors: err
                    });
                } else {
                    EmployeeSubTask.count({}, (err, totalRecords) => {
                        res.status(200).write(JSON.stringify({
                            success: true,
                            employeeSubTasks: employeeSubTasks,
                            totalRecords: employeeSubTasks.length
                        }, null, 2));
                        res.end();

                    });
                }
            });
});

router.get('/department/:idProject/:idFloor/:idDepartment/:idTask/:idSubTask', authentication.verifyToken, (req, res, next) => {

    let idProject = req.params.idProject;
    let idDepartment = req.params.idDepartment;
    let idFloor = req.params.idFloor;
    let idTask = req.params.idTask;
    let idSubTask = req.params.idSubTask;

    EmployeeSubTask.find({ 'project': idProject, 'floor': idFloor, 'department': idDepartment, 'task': idTask, 'subTask': idSubTask, 'recordActive': true })
        .populate('employee')
        .populate('subTask')
        .populate('task')
        .populate('floor')
        .populate('department')
        .populate('commonService')
        .populate('project')
        .exec(
            (err, employeeSubTasks) => {
                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: 'No se pueden consultar los datos',
                        errors: err
                    });
                } else {
                    EmployeeSubTask.count({}, (err, totalRecords) => {
                        res.status(200).write(JSON.stringify({
                            success: true,
                            employeeSubTasks: employeeSubTasks,
                            totalRecords: employeeSubTasks.length
                        }, null, 2));
                        res.end();

                    });
                }
            });
});

router.get('/commonService/:idProject/:idCommonService', authentication.verifyToken, (req, res, next) => {

    let idProject = req.params.idProject;
    let idCommonService = req.params.idCommonService;

    EmployeeSubTask.find({ 'project': idProject, 'commonService': idCommonService, 'recordActive': true })
        .populate('employee')
        .populate('subTask')
        .populate('task')
        .populate('floor')
        .populate('department')
        .populate('commonService')
        .populate('project')
        .exec(
            (err, employeeSubTasks) => {
                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: 'No se pueden consultar los datos',
                        errors: err
                    });
                } else {
                    EmployeeSubTask.count({}, (err, totalRecords) => {
                        res.status(200).write(JSON.stringify({
                            success: true,
                            employeeSubTasks: employeeSubTasks,
                            totalRecords: employeeSubTasks.length
                        }, null, 2));
                        res.end();

                    });
                }
            });
});

router.get('/commonService/:idProject/:idCommonService/:idTask', authentication.verifyToken, (req, res, next) => {

    let idProject = req.params.idProject;
    let idCommonService = req.params.idCommonService;
    let idTask = req.params.idTask;

    EmployeeSubTask.find({ 'project': idProject, 'commonService': idCommonService, 'task': idTask, 'recordActive': true })
        .populate('employee')
        .populate('subTask')
        .populate('task')
        .populate('floor')
        .populate('department')
        .populate('commonService')
        .populate('project')
        .exec(
            (err, employeeSubTasks) => {
                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: 'No se pueden consultar los datos',
                        errors: err
                    });
                } else {
                    EmployeeSubTask.count({}, (err, totalRecords) => {
                        res.status(200).write(JSON.stringify({
                            success: true,
                            employeeSubTasks: employeeSubTasks,
                            totalRecords: employeeSubTasks.length
                        }, null, 2));
                        res.end();

                    });
                }
            });
});

router.get('/commonService/:idProject/:idCommonService/:idTask/:idSubTask', authentication.verifyToken, (req, res, next) => {

    let idProject = req.params.idProject;
    let idCommonService = req.params.idCommonService;
    let idTask = req.params.idTask;
    let idSubTask = req.params.idSubTask;

    EmployeeSubTask.find({ 'project': idProject, 'commonService': idCommonService, 'task': idTask, 'subTask': idSubTask, 'recordActive': true })
        .populate('employee')
        .populate('subTask')
        .populate('task')
        .populate('floor')
        .populate('department')
        .populate('commonService')
        .populate('project')
        .exec(
            (err, employeeSubTasks) => {
                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: 'No se pueden consultar los datos',
                        errors: err
                    });
                } else {
                    EmployeeSubTask.count({}, (err, totalRecords) => {
                        res.status(200).write(JSON.stringify({
                            success: true,
                            employeeSubTasks: employeeSubTasks,
                            totalRecords: employeeSubTasks.length
                        }, null, 2));
                        res.end();

                    });
                }
            });
});


router.post('/', authentication.verifyToken, (req, res, next) => {
    let employeeProject = new EmployeeProject({
        employee: req.body.employee,
        project: req.body.project,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        recordActive: req.body.recordActive
    });
    employeeProject.save((err, employeeProject) => {
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
                employeeProject: employeeProject
            });
        }
    });
});

router.put('/:id', authentication.verifyToken, (req, res, next) => {

    let id = req.params.id;

    EmployeeProject.findById(id, (err, employeeProject) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: 'No se puede actualizar el registro',
                errors: err
            });
        }

        if (!employeeProject) {
            return res.status(400).json({
                success: false,
                message: 'No existe un registro con el id: ' + id,
                errors: { message: 'No se pudo encontrar el registro para actualizar' }
            });
        } else {

            employeeProject.employee = req.body.employee;
            employeeProject.project = req.body.project;
            employeeProject.startDate = req.body.startDate;
            employeeProject.endDate = req.body.endDate;
            employeeProject.recordActive = req.body.recordActive;

            employeeProject.save((err, employeeProject) => {
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
                        employeeProject: employeeProject
                    });
                }
            });

        }
    })
});


router.delete('/:id', authentication.verifyToken, (req, res, next) => {

    let id = req.params.id;

    EmployeeProject.findById(id, (err, employeeProject) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: 'No se puede actualizar el registro',
                errors: err
            });
        }

        if (!employeeProject) {
            return res.status(400).json({
                success: false,
                message: 'No existe un registro con el id: ' + id,
                errors: { message: 'No se pudo encontrar el registro para actualizar' }
            });
        } else {

            employeeProject.employee = req.body.employee;
            employeeProject.project = req.body.project;
            employeeProject.startDate = req.body.startDate;
            employeeProject.endDate = req.body.endDate;
            employeeProject.recordActive = false;

            employeeProject.save((err, employeeProject) => {
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
                        employeeProject: employeeProject
                    });
                }
            });

        }
    })
});

module.exports = router;
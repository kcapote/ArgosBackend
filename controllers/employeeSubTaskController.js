const express = require('express');
const router = express.Router();
const constants = require('../config/constants');
const jwt = require('jsonwebtoken');
const EmployeeSubTask = require('../models/employeeSubTask');
const Employee = require('../models/employee');
const authentication = require('../middlewares/authentication');
const Project = require('../models/project');

router.get('/', [authentication.verifyToken, authentication.refreshToken], (req, res, next) => {

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
        .sort({ recordDate: -1 })
        .exec(
            (err, employeeSubTasks) => {
                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: 'No se pueden consultar los datos',
                        errors: err,
                        user: req.user
                    });
                } else {
                    EmployeeSubTask.countDocuments({}, (err, totalRecords) => {
                        res.status(200).write(JSON.stringify({
                            success: true,
                            employeeSubTasks: employeeSubTasks,
                            totalRecords: employeeSubTasks.length,
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
        .sort({ recordDate: -1 })
        .exec(
            (err, employeeSubTasks) => {
                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: 'No se pueden consultar los datos',
                        errors: err,
                        user: req.user
                    });
                } else {
                    EmployeeSubTask.find({ 'recordActive': recordActive }).countDocuments({}, (err, totalRecords) => {
                        res.status(200).write(JSON.stringify({
                            success: true,
                            employeeSubTasks: employeeSubTasks,
                            totalRecords: totalRecords,
                            pagination: pagination,
                            user: req.user
                        }, null, 2));
                        res.end();

                    });
                }
            });
});

router.get('/project/:idProject', [authentication.verifyToken, authentication.refreshToken], (req, res, next) => {

    let idProject = req.params.idProject;
    let pagination = req.query.pagination || 0;
    pagination = Number(pagination);

    EmployeeSubTask.find({ 'project': idProject, 'recordActive': true })
        .populate('employee')
        .populate('subTask')
        .populate('task')
        .populate('floor')
        .populate('department')
        .populate('commonService')
        .populate('project')
        .skip(pagination)
        .limit(constants.PAGINATION)
        .sort({ recordDate: -1 })
        .exec(
            (err, employeeSubTasks) => {
                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: 'No se pueden consultar los datos',
                        errors: err,
                        user: req.user
                    });
                } else {
                    EmployeeSubTask.find({ 'project': idProject, 'recordActive': true }).countDocuments({}, (err, totalRecords) => {
                        res.status(200).write(JSON.stringify({
                            success: true,
                            employeeSubTasks: employeeSubTasks,
                            totalRecords: totalRecords,
                            pagination: pagination,
                            user: req.user
                        }, null, 2));
                        res.end();

                    });
                }
            });
});

router.get('/employee/:idEmployee', [authentication.verifyToken, authentication.refreshToken], (req, res, next) => {

    let idEmployee = req.params.idEmployee;

    EmployeeSubTask.find({ 'employee': idEmployee, 'recordActive': true })
        .populate('employee')
        .populate('subTask')
        .populate('task')
        .populate('floor')
        .populate('department')
        .populate('commonService')
        .populate('project')
        .sort({ recordDate: -1 })
        .exec(
            (err, employeeSubTasks) => {
                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: 'No se pueden consultar los datos',
                        errors: err,
                        user: req.user
                    });
                } else {
                    EmployeeSubTask.find({ 'employee': idEmployee, 'recordActive': true }).countDocuments({}, (err, totalRecords) => {
                        res.status(200).write(JSON.stringify({
                            success: true,
                            employeeSubTasks: employeeSubTasks,
                            totalRecords: totalRecords,
                            user: req.user
                        }, null, 2));
                        res.end();

                    });
                }
            });
});

router.get('/employee/:idProject/:idEmployee', [authentication.verifyToken, authentication.refreshToken], (req, res, next) => {

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
        .sort({ recordDate: -1 })
        .exec(
            (err, employeeSubTasks) => {
                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: 'No se pueden consultar los datos',
                        errors: err,
                        user: req.user
                    });
                } else {
                    EmployeeSubTask.find({ 'project': idProject, 'employee': idEmployee, 'recordActive': true }).countDocuments({}, (err, totalRecords) => {
                        res.status(200).write(JSON.stringify({
                            success: true,
                            employeeSubTasks: employeeSubTasks,
                            totalRecords: totalRecords,
                            user: req.user
                        }, null, 2));
                        res.end();

                    });
                }
            });
});

router.get('/employee/calendar/:idEmployee', [authentication.verifyToken, authentication.refreshToken], (req, res, next) => {

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
        .sort({ recordDate: -1 })
        .exec(
            (err, employeeSubTasks) => {
                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: 'No se pueden consultar los datos',
                        errors: err,
                        user: req.user
                    });
                } else {
                    EmployeeSubTask.find({ 'project': idProject, 'employee': idEmployee, 'recordActive': true }).countDocuments({}, (err, totalRecords) => {
                        res.status(200).write(JSON.stringify({
                            success: true,
                            employeeSubTasks: employeeSubTasks,
                            totalRecords: totalRecords,
                            user: req.user
                        }, null, 2));
                        res.end();

                    });
                }
            });
});

router.get('/employee/calendar/:idEmployee/:initDate/:endDate', [authentication.verifyToken, authentication.refreshToken], (req, res, next) => {

    let idEmployee = req.params.idEmployee;
    let initDate = `${req.params.initDate} 00:00:00.000Z`;
    let endDate = `${req.params.endDate} 00:00:00.000Z`;

    EmployeeSubTask.find({ 'employee': idEmployee, 'recordActive': true, "$and": [{ "recordDate": { "$gte": initDate } }, { "recordDate": { "$lte": endDate } }] })
        .populate('employee')
        .populate('subTask')
        .populate('task')
        .populate('floor')
        .populate('department')
        .populate('commonService')
        .populate('project')
        .sort({ recordDate: -1 })
        .exec(
            (err, employeeSubTasks) => {
                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: 'No se pueden consultar los datos',
                        errors: err,
                        user: req.user
                    });
                } else {
                    EmployeeSubTask.find({ 'employee': idEmployee, 'recordActive': true, "$and": [{ "recordDate": { "$gte": initDate } }, { "recordDate": { "$lte": endDate } }] }).countDocuments({}, (err, totalRecords) => {
                        res.status(200).write(JSON.stringify({
                            success: true,
                            employeeSubTasks: employeeSubTasks,
                            totalRecords: totalRecords,
                            user: req.user
                        }, null, 2));
                        res.end();

                    });
                }
            });
});

router.get('/employee/calendar/project/:idProject/:idEmployee/:initDate/:endDate', [authentication.verifyToken, authentication.refreshToken], (req, res, next) => {

    let idProject = req.params.idProject;
    let idEmployee = req.params.idEmployee;
    let initDate = `${req.params.initDate} 00:00:00.000Z`;
    let endDate = `${req.params.endDate} 00:00:00.000Z`;

    EmployeeSubTask.find({ 'project': idProject, 'employee': idEmployee, 'recordActive': true, "$and": [{ "recordDate": { "$gte": initDate } }, { "recordDate": { "$lte": endDate } }] })
        .populate('employee')
        .populate('subTask')
        .populate('task')
        .populate('floor')
        .populate('department')
        .populate('commonService')
        .populate('project')
        .sort({ recordDate: -1 })
        .exec(
            (err, employeeSubTasks) => {
                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: 'No se pueden consultar los datos',
                        errors: err,
                        user: req.user
                    });
                } else {
                    EmployeeSubTask.find({ 'project': idProject, 'employee': idEmployee, 'recordActive': true, "$and": [{ "recordDate": { "$gte": initDate } }, { "recordDate": { "$lte": endDate } }] }).countDocuments({}, (err, totalRecords) => {
                        res.status(200).write(JSON.stringify({
                            success: true,
                            employeeSubTasks: employeeSubTasks,
                            totalRecords: totalRecords,
                            user: req.user
                        }, null, 2));
                        res.end();

                    });
                }
            });
});

router.get('/employee/calendar/project/:idProject/:initDate/:endDate', [authentication.verifyToken, authentication.refreshToken], (req, res, next) => {

    let idProject = req.params.idProject;
    let initDate = `${req.params.initDate} 00:00:00.000Z`;
    let endDate = `${req.params.endDate} 00:00:00.000Z`;

    EmployeeSubTask.find({ 'project': idProject, 'recordActive': true, "$and": [{ "recordDate": { "$gte": initDate } }, { "recordDate": { "$lte": endDate } }] })
        .populate('employee')
        .populate('subTask')
        .populate('task')
        .populate('floor')
        .populate('department')
        .populate('commonService')
        .populate('project')
        .sort({ recordDate: -1 })
        .exec(
            (err, employeeSubTasks) => {
                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: 'No se pueden consultar los datos',
                        errors: err,
                        user: req.user
                    });
                } else {
                    EmployeeSubTask.find({ 'project': idProject, 'recordActive': true, "$and": [{ "recordDate": { "$gte": initDate } }, { "recordDate": { "$lte": endDate } }] }).countDocuments({}, (err, totalRecords) => {
                        res.status(200).write(JSON.stringify({
                            success: true,
                            employeeSubTasks: employeeSubTasks,
                            totalRecords: totalRecords,
                            user: req.user
                        }, null, 2));
                        res.end();

                    });
                }
            });
});

router.get('/employee/:idProject/:idFloor/:idDepartment/:idEmployee', [authentication.verifyToken, authentication.refreshToken], (req, res, next) => {

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
        .sort({ recordDate: -1 })
        .exec(
            (err, employeeSubTasks) => {
                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: 'No se pueden consultar los datos',
                        errors: err,
                        user: req.user
                    });
                } else {
                    EmployeeSubTask.find({ 'project': idProject, 'floor': idFloor, 'department': idDepartment, 'employee': idEmployee, 'recordActive': true }).countDocuments({}, (err, totalRecords) => {
                        res.status(200).write(JSON.stringify({
                            success: true,
                            employeeSubTasks: employeeSubTasks,
                            totalRecords: totalRecords,
                            user: req.user
                        }, null, 2));
                        res.end();

                    });
                }
            });
});

router.get('/employee/:idProject/:idCommonService/:idEmployee', [authentication.verifyToken, authentication.refreshToken], (req, res, next) => {

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
        .sort({ recordDate: -1 })
        .exec(
            (err, employeeSubTasks) => {
                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: 'No se pueden consultar los datos',
                        errors: err,
                        user: req.user
                    });
                } else {
                    EmployeeSubTask.find({ 'project': idProject, 'commonService': idCommonService, 'employee': idEmployee, 'recordActive': true }).countDocuments({}, (err, totalRecords) => {
                        res.status(200).write(JSON.stringify({
                            success: true,
                            employeeSubTasks: employeeSubTasks,
                            totalRecords: totalRecords,
                            user: req.user
                        }, null, 2));
                        res.end();

                    });
                }
            });
});

router.get('/department/:idProject/:idFloor/:idDepartment', [authentication.verifyToken, authentication.refreshToken], (req, res, next) => {

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
        .sort({ recordDate: -1 })
        .exec(
            (err, employeeSubTasks) => {
                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: 'No se pueden consultar los datos',
                        errors: err,
                        user: req.user
                    });
                } else {
                    EmployeeSubTask.find({ 'project': idProject, 'floor': idFloor, 'department': idDepartment, 'recordActive': true }).countDocuments({}, (err, totalRecords) => {
                        res.status(200).write(JSON.stringify({
                            success: true,
                            employeeSubTasks: employeeSubTasks,
                            totalRecords: totalRecords,
                            user: req.user
                        }, null, 2));
                        res.end();

                    });
                }
            });
});

router.get('/department/:idProject/:idFloor/:idDepartment/:idTask', [authentication.verifyToken, authentication.refreshToken], (req, res, next) => {

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
        .sort({ recordDate: -1 })
        .exec(
            (err, employeeSubTasks) => {
                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: 'No se pueden consultar los datos',
                        errors: err,
                        user: req.user
                    });
                } else {
                    EmployeeSubTask.find({ 'project': idProject, 'floor': idFloor, 'department': idDepartment, 'task': idTask, 'recordActive': true }).countDocuments({}, (err, totalRecords) => {
                        res.status(200).write(JSON.stringify({
                            success: true,
                            employeeSubTasks: employeeSubTasks,
                            totalRecords: totalRecords,
                            user: req.user
                        }, null, 2));
                        res.end();

                    });
                }
            });
});

router.get('/department/:idProject/:idFloor/:idDepartment/:idTask/:idSubTask', [authentication.verifyToken, authentication.refreshToken], (req, res, next) => {

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
        .sort({ recordDate: -1 })
        .exec(
            (err, employeeSubTasks) => {
                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: 'No se pueden consultar los datos',
                        errors: err,
                        user: req.user
                    });
                } else {
                    EmployeeSubTask.find({ 'project': idProject, 'floor': idFloor, 'department': idDepartment, 'task': idTask, 'subTask': idSubTask, 'recordActive': true }).countDocuments({}, (err, totalRecords) => {
                        res.status(200).write(JSON.stringify({
                            success: true,
                            employeeSubTasks: employeeSubTasks,
                            totalRecords: totalRecords,
                            user: req.user
                        }, null, 2));
                        res.end();

                    });
                }
            });
});

router.get('/commonService/:idProject/:idCommonService', [authentication.verifyToken, authentication.refreshToken], (req, res, next) => {

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
        .sort({ recordDate: -1 })
        .exec(
            (err, employeeSubTasks) => {
                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: 'No se pueden consultar los datos',
                        errors: err,
                        user: req.user
                    });
                } else {
                    EmployeeSubTask.find({ 'project': idProject, 'commonService': idCommonService, 'recordActive': true }).countDocuments({}, (err, totalRecords) => {
                        res.status(200).write(JSON.stringify({
                            success: true,
                            employeeSubTasks: employeeSubTasks,
                            totalRecords: totalRecords,
                            user: req.user
                        }, null, 2));
                        res.end();

                    });
                }
            });
});

router.get('/commonService/:idProject/:idCommonService/:idTask', [authentication.verifyToken, authentication.refreshToken], (req, res, next) => {

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
        .sort({ recordDate: -1 })
        .exec(
            (err, employeeSubTasks) => {
                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: 'No se pueden consultar los datos',
                        errors: err,
                        user: req.user
                    });
                } else {
                    EmployeeSubTask.find({ 'project': idProject, 'commonService': idCommonService, 'task': idTask, 'recordActive': true }).countDocuments({}, (err, totalRecords) => {
                        res.status(200).write(JSON.stringify({
                            success: true,
                            employeeSubTasks: employeeSubTasks,
                            totalRecords: totalRecords,
                            user: req.user
                        }, null, 2));
                        res.end();

                    });
                }
            });
});

router.get('/commonService/:idProject/:idCommonService/:idTask/:idSubTask', [authentication.verifyToken, authentication.refreshToken], (req, res, next) => {

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
        .sort({ recordDate: -1 })
        .exec(
            (err, employeeSubTasks) => {
                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: 'No se pueden consultar los datos',
                        errors: err,
                        user: req.user
                    });
                } else {
                    EmployeeSubTask.find({ 'project': idProject, 'commonService': idCommonService, 'task': idTask, 'subTask': idSubTask, 'recordActive': true }).countDocuments({}, (err, totalRecords) => {
                        res.status(200).write(JSON.stringify({
                            success: true,
                            employeeSubTasks: employeeSubTasks,
                            totalRecords: totalRecords,
                            user: req.user
                        }, null, 2));
                        res.end();

                    });
                }
            });
});


router.post('/', [authentication.verifyToken, authentication.refreshToken], (req, res, next) => {
    let employeeSubTask = new EmployeeSubTask({
        employee: req.body.employee,
        subTask: req.body.subTask,
        task: req.body.task,
        floor: req.body.floor,
        department: req.body.department,
        commonService: req.body.commonService,
        project: req.body.project,
        recordDate: req.body.recordDate,
        hoursWorked: req.body.hoursWorked
    });

    let dateRecord = `${req.body.recordDate} 00:00:00.000Z`;

    EmployeeSubTask.findOne({ 'project': req.body.project, 'employee': req.body.employee, "$and": [{ "recordDate": { "$gte": dateRecord } }, { "recordDate": { "$lte": dateRecord } }] })
        .populate('employee')
        .exec(
            (err, employee) => {
                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: 'No se puede eliminar el registro',
                        errors: err,
                        user: req.user
                    });
                }

                if (employee) {
                    return res.status(400).json({
                        success: false,
                        message: 'El empleado ya posee registros para la fecha ' + req.body.recordDate,
                        errors: { message: 'El empleado ' + employee.employee.rut + ': ' + employee.employee.name + " ya posee registros para la fecha " + req.body.recordDate },
                        user: req.user,
                        employee: employee
                    });
                } else {
                    employeeSubTask.save((err, employeeSubTask) => {
                        if (err) {
                            return res.status(400).json({
                                success: false,
                                message: 'No se puede crear el registro',
                                errors: err,
                                user: req.user
                            });
                        } else {
                            res.status(201).json({
                                success: true,
                                message: 'Operación realizada de forma exitosa.',
                                employeeSubTask: employeeSubTask,
                                user: req.user
                            });
                        }
                    });
                }
            })

});

router.put('/:id', [authentication.verifyToken, authentication.refreshToken], (req, res, next) => {

    let id = req.params.id;

    EmployeeSubTask.findById(id, (err, employeeSubTask) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: 'No se puede actualizar el registro',
                errors: err,
                user: req.user
            });
        }

        if (!employeeSubTask) {
            return res.status(400).json({
                success: false,
                message: 'No existe un registro con el id: ' + id,
                errors: { message: 'No se pudo encontrar el registro para actualizar' },
                user: req.user
            });
        } else {

            employeeSubTask.employee = req.body.employee;
            employeeSubTask.subTask = req.body.subTask;
            employeeSubTask.task = req.body.task;
            employeeSubTask.floor = req.body.floor;
            employeeSubTask.department = req.body.department;
            employeeSubTask.commonService = req.body.commonService;
            employeeSubTask.project = req.body.project;
            employeeSubTask.recordDate = req.body.recordDate;
            employeeSubTask.hoursWorked = req.body.hoursWorked;
            employeeSubTask.recordActive = req.body.recordActive || true;

            employeeSubTask.save((err, employeeSubTask) => {
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
                        employeeSubTask: employeeSubTask,
                        user: req.user
                    });
                }
            });

        }
    })
});


router.delete('/:id', [authentication.verifyToken, authentication.refreshToken], (req, res, next) => {

    let id = req.params.id;

    EmployeeSubTask.findById(id, (err, employeeSubTask) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: 'No se puede eliminar el registro',
                errors: err,
                user: req.user
            });
        }

        if (!employeeSubTask) {
            return res.status(400).json({
                success: false,
                message: 'No existe un registro con el id: ' + id,
                errors: { message: 'No se pudo encontrar el registro para eliminar' },
                user: req.user
            });
        } else {

            employeeSubTask.recordActive = false;

            employeeSubTask.save((err, employeeSubTask) => {
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
                        employeeSubTask: employeeSubTask,
                        user: req.user
                    });
                }
            });

        }
    })
});


router.get('/find/top10', [authentication.verifyToken, authentication.refreshToken], async (req, res, next) => {
   
    try {
        const projects = await Project.find({ 'recordActive': true }).sort({'startDate': 'desc'}).limit(10).exec();
        if (!projects || projects.length === 0) {
            return res.status(400).json({
                success: false,
                message: 'No existen registros ',
                errors: { message: 'No hay registros guardados' },
                user: req.user
            });
        }

        cond = []; 
        collection = [];
        collection = projects;
        for (let c  of collection){
            cond.push(
                {'project': c._id}
            )
        }
        const employeeSubTask = await EmployeeSubTask
            .aggregate([{
                $match: {
                    $or: cond
                }
            },
            {
            $group: {
                _id: '$project',
                total: { $sum: '$hoursWorked' },
                cantidad: { $sum: 1 }
            }
            }]).exec();
            
        if(!employeeSubTask){
            return res.status(400).json({
                success: false,
                message: 'No existen registros ',
                errors: { message: 'No hay registros guardados' },
                user: req.user
            });
        } 

        let arrayCollection = [];
        for(let o of d){
            let col = [];
            col = projects;
            let temp = {
                id: o._id,
                total: o.total,
                proName: projects.find(function (obj) { return ( (obj._id+"") == (o['_id']+"") ); }).name
            }
            arrayCollection.push(temp);
        }    
        
        res.status(200).json({
            success: true,
            message: 'Operación realizada de forma exitosa.',
            donuts: arrayCollection,
            user: req.user
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'No se pueden consultar las obras',
            errors: err,
            user: req.user
        });
    }
});

module.exports = router;
const express = require('express');
const router = express.Router();
const constants = require('../config/constants');
const jwt = require('jsonwebtoken');
const EmployeeProject = require('../models/employeeProject');
const Employee = require('../models/employee');
const authentication = require('../middlewares/authentication');

router.get('/', authentication.verifyToken, (req, res, next) => {

    let pagination = req.query.pagination || 0;
    pagination = Number(pagination);

    EmployeeProject.find()
        //.populate('employee')
        .populate('project')
        .skip(pagination)
        .limit(constants.PAGINATION)
        .exec(
            (err, employeeProjects) => {
                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: 'No se pueden consultar los empleados',
                        errors: err
                    });
                } else {
                    EmployeeProject.count({}, (err, totalRecords) => {
                        res.status(200).write(JSON.stringify({
                            success: true,
                            employeeProjects: employeeProjects,
                            totalRecords: employeeProjects.length,
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

    EmployeeProject.find({ 'recordActive': recordActive })
        //.populate('employee')
        .populate('project')
        .skip(pagination)
        .limit(constants.PAGINATION)
        .exec(
            (err, employeeProjects) => {
                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: 'No se pueden consultar los empleados',
                        errors: err
                    });
                } else {
                    EmployeeProject.count({}, (err, totalRecords) => {
                        res.status(200).write(JSON.stringify({
                            success: true,
                            employeeProjects: employeeProjects,
                            totalRecords: employeeProjects.length,
                            pagination: pagination
                        }, null, 2));
                        res.end();

                    });
                }
            });
});

router.get('/project/:idProject', authentication.verifyToken, (req, res, next) => {

    let idProject = req.params.idProject;

    EmployeeProject.find({ 'project': idProject, 'recordActive': true })
        //.populate('employee')
        .populate('project')
        .exec(
            (err, employeeProjects) => {
                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: 'No se pueden consultar los empleados',
                        errors: err
                    });
                } else {
                    EmployeeProject.count({}, (err, totalRecords) => {
                        res.status(200).write(JSON.stringify({
                            success: true,
                            employeeProjects: employeeProjects,
                            totalRecords: employeeProjects.length
                        }, null, 2));
                        res.end();

                    });
                }
            });
});

router.get('/notproyect/', authentication.verifyToken, (req, res, next) => {

    let idProject = req.params.idProject;

    Employee.find({ 'recordActive': true })
        .populate('position')
        .skip(pagination)
        .limit(constants.PAGINATION)
        .exec(
            (err, employees) => {
                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: 'No se pueden consultar los datos',
                        errors: err
                    });
                } else {

                    EmployeeProject.find({ 'recordActive': true })
                        .populate('employee')
                        .populate('project')
                        .exec(
                            (err, employeeProjects) => {
                                if (err) {
                                    return res.status(500).json({
                                        success: false,
                                        message: 'No se pueden consultar los datos',
                                        errors: err
                                    });
                                } else {

                                    let freeEmployees = [];
                                    let found = false;
                                    employees.forEach(employee => {
                                        found = false;
                                        employeeProjects.forEach(employeeProject => {
                                            if (employee._id === employeeProject.employee._id) {
                                                found = true;
                                            }
                                        });
                                        if (!found) {
                                            freeEmployees.push(employee);
                                        }
                                    });

                                    res.status(200).write(JSON.stringify({
                                        success: true,
                                        freeEmployees: freeEmployees,
                                        totalRecords: freeEmployees.length
                                    }, null, 2));
                                    res.end();
                                }
                            });
                }
            });

});

router.get('/project/:idProject/:recordActive', authentication.verifyToken, (req, res, next) => {

    let idProject = req.params.idProject;
    let recordActive = req.params.recordActive;
    recordActive = Boolean(recordActive);

    EmployeeProject.find({ 'project': idProject, 'recordActive': recordActive })
        //.populate('employee')
        .populate('project')
        .exec(
            (err, employeeProjects) => {
                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: 'No se pueden consultar los empleados',
                        errors: err
                    });
                } else {
                    EmployeeProject.count({}, (err, totalRecords) => {
                        res.status(200).write(JSON.stringify({
                            success: true,
                            employeeProjects: employeeProjects,
                            totalRecords: employeeProjects.length
                        }, null, 2));
                        res.end();

                    });
                }
            });
});

router.get('/employee/:idEmployee', authentication.verifyToken, (req, res, next) => {

    let idEmployee = req.params.idEmployee;

    EmployeeProject.find({ 'employee': idEmployee })
        //.populate('employee')
        .populate('project')
        .exec(
            (err, employeeProjects) => {
                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: 'No se pueden consultar los empleados',
                        errors: err
                    });
                } else {
                    EmployeeProject.count({}, (err, totalRecords) => {
                        res.status(200).write(JSON.stringify({
                            success: true,
                            employeeProjects: employeeProjects,
                            totalRecords: employeeProjects.length
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
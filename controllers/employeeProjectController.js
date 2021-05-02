const express = require('express');
const router = express.Router();
const constants = require('../config/constants');
const jwt = require('jsonwebtoken');
const EmployeeProject = require('../models/employeeProject');
const Employee = require('../models/employee');
const authentication = require('../middlewares/authentication');

router.get('/', [authentication.verifyToken, authentication.refreshToken], (req, res, next) => {

    let pagination = req.query.pagination || 0;
    pagination = Number(pagination);

    EmployeeProject.find()
        .populate('employee')
        .populate('project')
        .skip(pagination)
        .limit(constants.PAGINATION)
        .exec(
            (err, employeeProjects) => {
                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: 'No se pueden consultar los empleados',
                        errors: err,
                        user: req.user
                    });
                } else {
                    EmployeeProject.countDocuments({}, (err, totalRecords) => {
                        res.status(200).write(JSON.stringify({
                            success: true,
                            employeeProjects: employeeProjects,
                            totalRecords: employeeProjects.length,
                            pagination: pagination,
                            user: req.user
                        }, null, 2));
                        res.end();

                    });
                }
            });
});

router.get('/all', [authentication.verifyToken, authentication.refreshToken], (req, res, next) => {

    EmployeeProject.find({ 'recordActive': recordActive })
        .populate('employee')
        .populate('project')
        .exec(
            (err, employeeProjects) => {
                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: 'No se pueden consultar los empleados',
                        errors: err,
                        user: req.user
                    });
                } else {
                    EmployeeProject.find({ 'recordActive': recordActive }).countDocuments({}, (err, totalRecords) => {
                        res.status(200).write(JSON.stringify({
                            success: true,
                            employeeProjects: employeeProjects,
                            totalRecords: totalRecords,
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

    EmployeeProject.find({ 'recordActive': recordActive })
        .populate('employee')
        .populate('project')
        .skip(pagination)
        .limit(constants.PAGINATION)
        .exec(
            (err, employeeProjects) => {
                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: 'No se pueden consultar los empleados',
                        errors: err,
                        user: req.user
                    });
                } else {
                    EmployeeProject.find({ 'recordActive': recordActive }).countDocuments({}, (err, totalRecords) => {
                        res.status(200).write(JSON.stringify({
                            success: true,
                            employeeProjects: employeeProjects,
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

    EmployeeProject.find({ 'project': idProject })
        .populate('employee')
        .populate('project')
        .exec(
            (err, employeeProjects) => {
                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: 'No se pueden consultar los empleados',
                        errors: err,
                        user: req.user
                    });
                } else {
                    EmployeeProject.find({ 'project': idProject, 'recordActive': true }).countDocuments({}, (err, totalRecords) => {
                        res.status(200).write(JSON.stringify({
                            success: true,
                            employeeProjects: employeeProjects,
                            totalRecords: totalRecords,
                            user: req.user
                        }, null, 2));
                        res.end();

                    });
                }
            });
});

router.get('/notproyect/', [authentication.verifyToken, authentication.refreshToken], (req, res, next) => {

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
                        errors: err,
                        user: req.user
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
                                        errors: err,
                                        user: req.user
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
                                        totalRecords: freeEmployees.length,
                                        user: req.user
                                    }, null, 2));
                                    res.end();
                                }
                            });
                }
            });

});

router.get('/project/:idProject/:recordActive', [authentication.verifyToken, authentication.refreshToken], (req, res, next) => {

    let idProject = req.params.idProject;
    let recordActive = req.params.recordActive;
    recordActive = Boolean(recordActive);

    EmployeeProject.find({ 'project': idProject, 'recordActive': recordActive })
        .populate('employee')
        .populate('project')
        .exec(
            (err, employeeProjects) => {
                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: 'No se pueden consultar los empleados',
                        errors: err,
                        user: req.user
                    });
                } else {
                    EmployeeProject.find({ 'project': idProject, 'recordActive': recordActive }).countDocuments({}, (err, totalRecords) => {
                        res.status(200).write(JSON.stringify({
                            success: true,
                            employeeProjects: employeeProjects,
                            totalRecords: totalRecords,
                            user: req.user
                        }, null, 2));
                        res.end();

                    });
                }
            });
});

router.get('/employee/:idEmployee', [authentication.verifyToken, authentication.refreshToken], (req, res, next) => {

    let idEmployee = req.params.idEmployee;

    EmployeeProject.find({ 'employee': idEmployee })
        .populate('employee')
        .populate('project')
        .exec(
            (err, employeeProjects) => {
                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: 'No se pueden consultar los empleados',
                        errors: err,
                        user: req.user
                    });
                } else {
                    EmployeeProject.find({ 'employee': idEmployee }).countDocuments({}, (err, totalRecords) => {
                        res.status(200).write(JSON.stringify({
                            success: true,
                            employeeProjects: employeeProjects,
                            totalRecords: totalRecords,
                            user: req.user
                        }, null, 2));
                        res.end();

                    });
                }
            });
});





router.post('/', [authentication.verifyToken, authentication.refreshToken], async (req, res, next) => {
    let collection = req.body;
    let employeeProjects = [];
    for (let i = 0; i < collection.length; i++) {
        employeeProjects.push({
            employee: collection[i].employee,
            project: collection[i].project,
            startDate: collection[i].startDate,
            endDate: collection[i].endDate,
            recordActive: collection[i].recordActive
        });
    }    
    const employees = await EmployeeProject.insertMany(employeeProjects);
    if (!employees) {
        return res.status(400).json({
            success: false,
            message: 'No se puede crear el registro',
            errors: err,
            user: req.user
        });
    }

    res.status(201).json({
        success: true,
        message: 'Operación realizada de forma exitosa.',
        employeeProject: employees,
        user: req.user
    });

});

router.put('/:id', [authentication.verifyToken, authentication.refreshToken], (req, res, next) => {

    let id = req.params.id;

    EmployeeProject.findById(id, (err, employeeProject) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: 'No se puede actualizar el registro',
                errors: err,
                user: req.user
            });
        }

        if (!employeeProject) {
            return res.status(400).json({
                success: false,
                message: 'No existe un registro con el id: ' + id,
                errors: { message: 'No se pudo encontrar el registro para actualizar' },
                user: req.user
            });
        } else {

            employeeProject.employee = req.body.employee;
            employeeProject.project = req.body.project;
            employeeProject.startDate = req.body.startDate;
            employeeProject.endDate = req.body.endDate;
            employeeProject.recordActive = req.body.recordActive || true;

            employeeProject.save((err, employeeProject) => {
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
                        employeeProject: employeeProject,
                        user: req.user
                    });
                }
            });

        }
    })
});


router.delete('/:id', [authentication.verifyToken, authentication.refreshToken], (req, res, next) => {

    let id = req.params.id;

    EmployeeProject.findById(id, (err, employeeProject) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: 'No se puede actualizar el registro',
                errors: err,
                user: req.user
            });
        }

        if (!employeeProject) {
            return res.status(400).json({
                success: false,
                message: 'No existe un registro con el id: ' + id,
                errors: { message: 'No se pudo encontrar el registro para actualizar' },
                user: req.user
            });
        } else {

            employeeProject.recordActive = false;

            employeeProject.save((err, employeeProject) => {
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
                        employeeProject: employeeProject,
                        user: req.user
                    });
                }
            });

        }
    })
});

module.exports = router;
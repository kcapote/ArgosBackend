const express = require('express');
const router = express.Router();
const constants = require('../config/constants');
const jwt = require('jsonwebtoken');
const Employee = require('../models/employee');
const authentication = require('../middlewares/authentication');

router.get('/', authentication.verifyToken, (req, res, next) => {

    let pagination = req.query.pagination || 0;
    pagination = Number(pagination);

    Employee.find()
        .populate('position')
        .skip(pagination)
        .limit(constants.PAGINATION)
        .exec(
            (err, employees) => {
                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: 'No se pueden consultar los empleados',
                        errors: err
                    });
                } else {
                    Employee.count({}, (err, totalRecords) => {
                        res.status(200).write(JSON.stringify({
                            success: true,
                            employees: employees,
                            totalRecords: totalRecords,
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

    Employee.find({ 'recordActive': recordActive })
        .populate('position')
        .skip(pagination)
        .limit(constants.PAGINATION)
        .exec(
            (err, employees) => {
                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: 'No se pueden consultar los empleados',
                        errors: err
                    });
                } else {
                    Employee.count({}, (err, totalRecords) => {
                        res.status(200).write(JSON.stringify({
                            success: true,
                            employees: employees,
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

    Employee.find()
        .populate('position')
        .or([{ 'name': regex }, { 'lastName': regex }, { 'rut': regex }]) //arreglo de campos a tomar en cuenta para la busqueda
        .skip(pagination)
        .limit(constants.PAGINATION)
        .exec(
            (err, employees) => {
                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: 'No se encontraron resultados',
                        errors: err
                    });
                } else {

                    Employee.count({}, (err, totalRecords) => {
                        res.status(200).write(JSON.stringify({
                            success: true,
                            employees: employees,
                            totalRecords: employees.length,
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

    Employee.find({ 'recordActive': recordActive })
        .populate('position')
        .or([{ 'name': regex }, { 'lastName': regex }, { 'rut': regex }]) //arreglo de campos a tomar en cuenta para la busqueda
        .skip(pagination)
        .limit(constants.PAGINATION)
        .exec(
            (err, employees) => {
                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: 'No se encontraron resultados',
                        errors: err
                    });
                } else {

                    Employee.count({}, (err, totalRecords) => {
                        res.status(200).write(JSON.stringify({
                            success: true,
                            employees: employees,
                            totalRecords: employees.length,
                            pagination: pagination
                        }, null, 2));
                        res.end();

                    });
                }
            });
});


router.get('/position/:id', authentication.verifyToken, (req, res, next) => {

    let id = req.params.id;

    Employee.find({ 'position': id, 'recordActive': true })
        .populate('position')
        .exec(
            (err, employees) => {
                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: 'No se pueden consultar los empleados',
                        errors: err
                    });
                } else {
                    Employee.count({}, (err, totalRecords) => {
                        res.status(200).write(JSON.stringify({
                            success: true,
                            employees: employees,
                            totalRecords: totalRecords
                        }, null, 2));
                        res.end();

                    });
                }
            });
});

router.get('/:id', authentication.verifyToken, (req, res, next) => {

    let id = req.params.id;

    Employee.find({ '_id': id })
        .populate('position')
        .exec(
            (err, employees) => {
                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: 'No se pueden consultar los empleados',
                        errors: err
                    });
                } else {
                    Employee.count({}, (err, totalRecords) => {
                        res.status(200).write(JSON.stringify({
                            success: true,
                            employees: employees,
                            totalRecords: totalRecords
                        }, null, 2));
                        res.end();

                    });
                }
            });
});

router.post('/', authentication.verifyToken, (req, res, next) => {
    let employee = new Employee({
        rut: req.body.rut,
        name: req.body.name,
        lastName: req.body.lastName,
        position: req.body.position,
        phone: req.body.phone,
        mail: req.body.mail,
        address: req.body.address,
        sex: req.body.sex,
        contractStartDate: req.body.contractStartDate,
        contractEndDate: req.body.contractEndDate
    });
    employee.save((err, employee) => {
        if (err) {
            return res.status(400).json({
                success: false,
                message: 'No se puede crear el empleado',
                errors: err
            });
        } else {
            res.status(201).json({
                success: true,
                message: 'Operación realizada de forma exitosa.',
                employee: employee
            });
        }
    });
});

router.put('/:id', authentication.verifyToken, (req, res, next) => {

    let id = req.params.id;

    Employee.findById(id, (err, employee) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: 'No se puede actualizar el empleado',
                errors: err
            });
        }

        if (!employee) {
            return res.status(400).json({
                success: false,
                message: 'No existe un empleado con el id: ' + id,
                errors: { message: 'No se pudo encontrar el empleado para actualizar' }
            });
        } else {

            employee.rut = req.body.rut;
            employee.name = req.body.name;
            employee.lastName = req.body.lastName;
            employee.position = req.body.position;
            employee.phone = req.body.phone;
            employee.mail = req.body.mail;
            employee.address = req.body.address;
            employee.sex = req.body.sex;
            employee.contractStartDate = req.body.contractStartDate;
            employee.contractEndDate = req.body.contractEndDate;
            employee.recordActive = req.body.recordActive;

            employee.save((err, employee) => {
                if (err) {
                    return res.status(400).json({
                        success: false,
                        message: 'No se puede actualizar el empleado',
                        errors: err
                    });
                } else {
                    res.status(200).json({
                        success: true,
                        message: 'Operación realizada de forma exitosa.',
                        employee: employee
                    });
                }
            });

        }
    })
});


router.delete('/:id', authentication.verifyToken, (req, res, next) => {

    let id = req.params.id;

    Employee.findById(id, (err, employee) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: 'No se puede eliminar el empleado',
                errors: err
            });
        }

        if (!employee) {
            return res.status(400).json({
                success: false,
                message: 'No existe un empleado con el id: ' + id,
                errors: { message: 'No se pudo encontrar el empleado para eliminar' }
            });
        } else {

            employee.rut = req.body.rut;
            employee.name = req.body.name;
            employee.lastName = req.body.lastName;
            employee.position = req.body.position;
            employee.phone = req.body.phone;
            employee.mail = req.body.mail;
            employee.address = req.body.address;
            employee.sex = req.body.sex;
            employee.contractStartDate = req.body.contractStartDate;
            employee.contractEndDate = req.body.contractEndDate;
            employee.recordActive = false;

            employee.save((err, employee) => {
                if (err) {
                    return res.status(400).json({
                        success: false,
                        message: 'No se puede eliminar el empleado',
                        errors: err
                    });
                } else {
                    res.status(200).json({
                        success: true,
                        message: 'Operación realizada de forma exitosa.',
                        employee: employee
                    });
                }
            });

        }
    })
});

module.exports = router;
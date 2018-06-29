const express = require('express');
const router = express.Router();
const constants = require('../config/constants');
const jwt = require('jsonwebtoken');
const Employee = require('../models/employee');
const authentication = require('../middlewares/authentication');

router.get('/', [authentication.verifyToken, authentication.refreshToken], (req, res, next) => {

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
                        errors: err,
                        user: req.user
                    });
                } else {
                    Employee.count({}, (err, totalRecords) => {
                        res.status(200).write(JSON.stringify({
                            success: true,
                            employees: employees,
                            totalRecords: employees.length,
                            pagination: pagination,
                            user: req.user
                        }, null, 2));
                        res.end();

                    });
                }
            });
});

router.get('/all', [authentication.verifyToken, authentication.refreshToken], (req, res, next) => {

    Employee.find({ 'recordActive': true })
        .populate('position')
        .exec(
            (err, employees) => {
                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: 'No se pueden consultar los empleados',
                        errors: err,
                        user: req.user
                    });
                } else {
                    Employee.find({ 'recordActive': true }).count({}, (err, totalRecords) => {
                        res.status(200).write(JSON.stringify({
                            success: true,
                            employees: employees,
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
                        errors: err,
                        user: req.user
                    });
                } else {
                    Employee.find({ 'recordActive': recordActive }).count({}, (err, totalRecords) => {
                        res.status(200).write(JSON.stringify({
                            success: true,
                            employees: employees,
                            totalRecords: totalRecords,
                            pagination: pagination,
                            user: req.user
                        }, null, 2));
                        res.end();

                    });
                }
            });
});

router.get('/search/:term', [authentication.verifyToken, authentication.refreshToken], (req, res, next) => {

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
                        errors: err,
                        user: req.user
                    });
                } else {

                    Employee.find().or([{ 'name': regex }, { 'lastName': regex }, { 'rut': regex }]).count({}, (err, totalRecords) => {
                        res.status(200).write(JSON.stringify({
                            success: true,
                            employees: employees,
                            totalRecords: totalRecords,
                            pagination: pagination,
                            user: req.user
                        }, null, 2));
                        res.end();

                    });
                }
            });
});

router.get('/search/:term/:recordActive', [authentication.verifyToken, authentication.refreshToken], (req, res, next) => {

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
                        errors: err,
                        user: req.user
                    });
                } else {

                    Employee.find().or([{ 'name': regex }, { 'lastName': regex }, { 'rut': regex }]).count({}, (err, totalRecords) => {
                        res.status(200).write(JSON.stringify({
                            success: true,
                            employees: employees,
                            totalRecords: totalRecords,
                            pagination: pagination,
                            user: req.user
                        }, null, 2));
                        res.end();

                    });
                }
            });
});


router.get('/position/:id', [authentication.verifyToken, authentication.refreshToken], (req, res, next) => {

    let id = req.params.id;

    Employee.find({ 'position': id, 'recordActive': true })
        .populate('position')
        .exec(
            (err, employees) => {
                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: 'No se pueden consultar los empleados',
                        errors: err,
                        user: req.user
                    });
                } else {
                    Employee.count({}, (err, totalRecords) => {
                        res.status(200).write(JSON.stringify({
                            success: true,
                            employees: employees,
                            totalRecords: employees.length,
                            user: req.user
                        }, null, 2));
                        res.end();

                    });
                }
            });
});

router.get('/:id', [authentication.verifyToken, authentication.refreshToken], (req, res, next) => {

    let id = req.params.id;

    Employee.find({ '_id': id })
        .populate('position')
        .exec(
            (err, employees) => {
                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: 'No se pueden consultar los empleados',
                        errors: err,
                        user: req.user
                    });
                } else {
                    Employee.count({}, (err, totalRecords) => {
                        res.status(200).write(JSON.stringify({
                            success: true,
                            employees: employees,
                            totalRecords: employees.length,
                            user: req.user
                        }, null, 2));
                        res.end();

                    });
                }
            });
});

router.post('/', [authentication.verifyToken, authentication.refreshToken], (req, res, next) => {
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
                errors: err,
                user: req.user
            });
        } else {
            res.status(201).json({
                success: true,
                message: 'Operación realizada de forma exitosa.',
                employee: employee,
                user: req.user
            });
        }
    });
});

router.put('/:id', [authentication.verifyToken, authentication.refreshToken], (req, res, next) => {

    let id = req.params.id;

    Employee.findById(id, (err, employee) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: 'No se puede actualizar el empleado',
                errors: err,
                user: req.user
            });
        }

        if (!employee) {
            return res.status(400).json({
                success: false,
                message: 'No existe un empleado con el id: ' + id,
                errors: { message: 'No se pudo encontrar el empleado para actualizar' },
                user: req.user
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
            employee.recordActive = req.body.recordActive || true;

            employee.save((err, employee) => {
                if (err) {
                    return res.status(400).json({
                        success: false,
                        message: 'No se puede actualizar el empleado',
                        errors: err,
                        user: req.user
                    });
                } else {
                    res.status(200).json({
                        success: true,
                        message: 'Operación realizada de forma exitosa.',
                        employee: employee,
                        user: req.user
                    });
                }
            });

        }
    })
});


router.delete('/:id', [authentication.verifyToken, authentication.refreshToken], (req, res, next) => {

    let id = req.params.id;

    Employee.findById(id, (err, employee) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: 'No se puede eliminar el empleado',
                errors: err,
                user: req.user
            });
        }

        if (!employee) {
            return res.status(400).json({
                success: false,
                message: 'No existe un empleado con el id: ' + id,
                errors: { message: 'No se pudo encontrar el empleado para eliminar' },
                user: req.user
            });
        } else {

            employee.recordActive = false;

            employee.save((err, employee) => {
                if (err) {
                    return res.status(400).json({
                        success: false,
                        message: 'No se puede eliminar el empleado',
                        errors: err,
                        user: req.user
                    });
                } else {
                    res.status(200).json({
                        success: true,
                        message: 'Operación realizada de forma exitosa.',
                        employee: employee,
                        user: req.user
                    });
                }
            });

        }
    })
});

module.exports = router;
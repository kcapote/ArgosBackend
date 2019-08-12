const express = require('express');
const router = express.Router();
const constants = require('../config/constants');
const jwt = require('jsonwebtoken');
const Department = require('../models/department');
const authentication = require('../middlewares/authentication');

router.get('/', [authentication.verifyToken, authentication.refreshToken], (req, res, next) => {

    let pagination = req.query.pagination || 0;
    pagination = Number(pagination);

    Department.find()
        .populate('floor')
        .skip(pagination)
        .limit(constants.PAGINATION)
        .sort({ number: 1 })
        .exec(
            (err, departments) => {
                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: 'No se pueden consultar los departamentos',
                        errors: err,
                        user: req.user
                    });
                } else {
                    Department.count({}, (err, totalRecords) => {
                        res.status(200).write(JSON.stringify({
                            success: true,
                            departments: departments,
                            totalRecords: departments.length,
                            pagination: pagination,
                            user: req.user
                        }, null, 2));
                        res.end();

                    });
                }
            });
});

router.get('/all', [authentication.verifyToken, authentication.refreshToken], (req, res, next) => {

    Department.find({ 'recordActive': true })
        .populate('floor')
        .sort({ number: 1 })
        .exec(
            (err, departments) => {
                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: 'No se pueden consultar los departamentos',
                        errors: err,
                        user: req.user
                    });
                } else {
                    Department.find({ 'recordActive': true }).count({}, (err, totalRecords) => {
                        res.status(200).write(JSON.stringify({
                            success: true,
                            departments: departments,
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

    Department.find({ 'recordActive': recordActive })
        .populate('floor')
        .skip(pagination)
        .limit(constants.PAGINATION)
        .sort({ number: 1 })
        .exec(
            (err, departments) => {
                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: 'No se pueden consultar los departamentos',
                        errors: err,
                        user: req.user
                    });
                } else {
                    Department.find({ 'recordActive': recordActive }).count({}, (err, totalRecords) => {
                        res.status(200).write(JSON.stringify({
                            success: true,
                            departments: departments,
                            totalRecords: totalRecords,
                            pagination: pagination,
                            user: req.user
                        }, null, 2));
                        res.end();

                    });
                }
            });
});

router.get('/floor/:id', [authentication.verifyToken, authentication.refreshToken], (req, res, next) => {

    let id = req.params.id;

    Department.find({ 'floor': id, 'recordActive': true })
        .populate('floor')
        .sort({ number: 1 })
        .exec(
            (err, departments) => {
                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: 'No se pueden consultar los departamentos',
                        errors: err,
                        user: req.user
                    });
                } else {
                    Department.find({ 'floor': id, 'recordActive': true }).count({}, (err, totalRecords) => {
                        res.status(200).write(JSON.stringify({
                            success: true,
                            departments: departments,
                            totalRecords: totalRecords,
                            user: req.user
                        }, null, 2));
                        res.end();

                    });
                }
            });
});

router.get('/:id', [authentication.verifyToken, authentication.refreshToken], (req, res, next) => {

    let id = req.params.id;

    Department.find({ '_id': id })
        .populate('floor')
        .sort({ number: 1 })
        .exec(
            (err, departments) => {
                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: 'No se pueden consultar los departamentos',
                        errors: err,
                        user: req.user
                    });
                } else {
                    Department.count({}, (err, totalRecords) => {
                        res.status(200).write(JSON.stringify({
                            success: true,
                            departments: departments,
                            totalRecords: departments.length,
                            user: req.user
                        }, null, 2));
                        res.end();

                    });
                }
            });
});

router.post('/', [authentication.verifyToken, authentication.refreshToken], (req, res, next) => {
    let department = new Department({
        floor: req.body.floor,
        number: req.body.number,
        status: req.body.status
    });
    department.save((err, department) => {
        if (err) {
            return res.status(400).json({
                success: false,
                message: 'No se puede crear el departamento',
                errors: err,
                user: req.user
            });
        } else {
            res.status(201).json({
                success: true,
                message: 'Operación realizada de forma exitosa.',
                department: department,
                user: req.user
            });
        }
    });
});

router.put('/:id', [authentication.verifyToken, authentication.refreshToken], (req, res, next) => {

    let id = req.params.id;

    Department.findById(id, (err, department) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: 'No se puede actualizar el departamento',
                errors: err,
                user: req.user
            });
        }

        if (!department) {
            return res.status(400).json({
                success: false,
                message: 'No existe un departamento con el id: ' + id,
                errors: { message: 'No se pudo encontrar el departamento para actualizar' },
                user: req.user
            });
        } else {

            department.floor = req.body.floor;
            department.number = req.body.number;
            department.status = req.body.status;
            department.recordActive = req.body.recordActive || true;

            department.save((err, department) => {
                if (err) {
                    return res.status(400).json({
                        success: false,
                        message: 'No se puede actualizar el departamento',
                        errors: err,
                        user: req.user
                    });
                } else {
                    res.status(200).json({
                        success: true,
                        message: 'Operación realizada de forma exitosa.',
                        department: department,
                        user: req.user
                    });
                }
            });

        }
    })
});


router.delete('/:id', [authentication.verifyToken, authentication.refreshToken], (req, res, next) => {

    let id = req.params.id;

    Department.findById(id, (err, department) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: 'No se puede eliminar el departamento',
                errors: err,
                user: req.user
            });
        }

        if (!department) {
            return res.status(400).json({
                success: false,
                message: 'No existe un departamento con el id: ' + id,
                errors: { message: 'No se pudo encontrar el departamento para eliminar' },
                user: req.user
            });
        } else {

            department.recordActive = false;

            department.save((err, department) => {
                if (err) {
                    return res.status(400).json({
                        success: false,
                        message: 'No se puede eliminar el departamento',
                        errors: err,
                        user: req.user
                    });
                } else {
                    res.status(200).json({
                        success: true,
                        message: 'Operación realizada de forma exitosa.',
                        department: department,
                        user: req.user
                    });
                }
            });

        }
    })
});

module.exports = router;
const express = require('express');
const router = express.Router();
const constants = require('../config/constants');
const jwt = require('jsonwebtoken');
const Department = require('../models/department');
const authentication = require('../middlewares/authentication');

router.get('/', authentication.verifyToken, (req, res, next) => {

    let pagination = req.query.pagination || 0;
    pagination = Number(pagination);

    Department.find()
        .populate('floor')
        .skip(pagination)
        .limit(constants.PAGINATION)
        .exec(
            (err, departments) => {
                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: 'No se pueden consultar los departamentos',
                        errors: err
                    });
                } else {
                    Department.count({}, (err, totalRecords) => {
                        res.status(200).write(JSON.stringify({
                            success: true,
                            departments: departments,
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

    Department.find()
        .populate('floor')
        .or([{ 'name': regex }]) //arreglo de campos a tomar en cuenta para la busqueda
        .skip(pagination)
        .limit(constants.PAGINATION)
        .exec(
            (err, departments) => {
                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: 'No se encontraron resultados',
                        errors: err
                    });
                } else {

                    Department.count({}, (err, totalRecords) => {
                        res.status(200).write(JSON.stringify({
                            success: true,
                            departments: departments,
                            totalRecords: totalRecords,
                            pagination: pagination
                        }, null, 2));
                        res.end();

                    });
                }
            });
});


router.get('/floor/:id', authentication.verifyToken, (req, res, next) => {

    let id = req.params.id;

    Department.find({ 'floor': id })
        .populate('floor')
        .exec(
            (err, departments) => {
                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: 'No se pueden consultar los departamentos',
                        errors: err
                    });
                } else {
                    Department.count({}, (err, totalRecords) => {
                        res.status(200).write(JSON.stringify({
                            success: true,
                            departments: departments,
                            totalRecords: totalRecords
                        }, null, 2));
                        res.end();

                    });
                }
            });
});

router.get('/:id', authentication.verifyToken, (req, res, next) => {

    let id = req.params.id;

    Department.find({ '_id': id })
        .populate('floor')
        .exec(
            (err, departments) => {
                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: 'No se pueden consultar los departamentos',
                        errors: err
                    });
                } else {
                    Department.count({}, (err, totalRecords) => {
                        res.status(200).write(JSON.stringify({
                            success: true,
                            departments: departments,
                            totalRecords: totalRecords
                        }, null, 2));
                        res.end();

                    });
                }
            });
});

router.post('/', authentication.verifyToken, (req, res, next) => {
    let department = new Floor({
        floor: req.body.floor,
        number: req.body.number,
        status: req.body.status
    });
    department.save((err, department) => {
        if (err) {
            return res.status(400).json({
                success: false,
                message: 'No se puede crear el departamento',
                errors: err
            });
        } else {
            res.status(201).json({
                success: true,
                message: 'Operación realizada de forma exitosa.',
                department: department
            });
        }
    });
});

router.put('/:id', authentication.verifyToken, (req, res, next) => {

    let id = req.params.id;

    Department.findById(id, (err, department) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: 'No se puede actualizar el departamento',
                errors: err
            });
        }

        if (!department) {
            return res.status(400).json({
                success: false,
                message: 'No existe un departamento con el id: ' + id,
                errors: { message: 'No se pudo encontrar el departamento para actualizar' }
            });
        } else {

            department.floor = req.body.floor;
            department.number = req.body.number;
            department.status = req.body.status

            department.save((err, department) => {
                if (err) {
                    return res.status(400).json({
                        success: false,
                        message: 'No se puede actualizar el departamento',
                        errors: err
                    });
                } else {
                    res.status(200).json({
                        success: true,
                        message: 'Operación realizada de forma exitosa.',
                        department: department
                    });
                }
            });

        }
    })
});


router.delete('/:id', authentication.verifyToken, (req, res, next) => {

    let id = req.params.id;

    Department.findByIdAndRemove(id, (err, department) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: 'No se puede eliminar el departamento',
                errors: err
            });
        } else if (department) {
            res.status(200).json({
                success: true,
                message: 'Operación realizada de forma exitosa',
                department: department
            });
        } else {
            return res.status(400).json({
                success: false,
                message: 'No existe un departamento con el id: ' + id,
                errors: { message: 'No se pudo encontrar el departamento para eliminar' }
            });
        }
    })
});

module.exports = router;
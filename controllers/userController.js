const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const constants = require('../config/constants');
const jwt = require('jsonwebtoken');
const authentication = require('../middlewares/authentication');

router.get('/', [authentication.verifyToken, authentication.refreshToken], (req, res, next) => {

    let pagination = req.query.pagination || 0;
    pagination = Number(pagination);

    User.find({}, 'name lastName email role')
        .skip(pagination)
        .limit(constants.PAGINATION)
        .exec(
            (err, users) => {
                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: 'No se pueden consultar las tareas',
                        errors: err,
                        user: req.user
                    });
                } else {

                    User.countDocuments({}, (err, totalRecords) => {
                        res.status(200).write(JSON.stringify({
                            success: true,
                            users: users,
                            totalRecords: users.length,
                            pagination: pagination,
                            user: req.user
                        }, null, 2));
                        res.end();

                    });
                }
            });
});

router.get('/all', [authentication.verifyToken, authentication.refreshToken], (req, res, next) => {

    User.find({ 'recordActive': true }, 'name lastName email role')
        .exec(
            (err, users) => {
                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: 'No se pueden consultar las tareas',
                        errors: err,
                        user: req.user
                    });
                } else {

                    User.find({ 'recordActive': true }).countDocuments({}, (err, totalRecords) => {
                        res.status(200).write(JSON.stringify({
                            success: true,
                            users: users,
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

    User.find({ 'recordActive': recordActive }, 'name lastName email role')
        .skip(pagination)
        .limit(constants.PAGINATION)
        .exec(
            (err, users) => {
                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: 'No se pueden consultar las tareas',
                        errors: err,
                        user: req.user
                    });
                } else {

                    User.find({ 'recordActive': recordActive }).countDocuments({}, (err, totalRecords) => {
                        res.status(200).write(JSON.stringify({
                            success: true,
                            users: users,
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

    User.find({ 'recordActive': recordActive }, 'name lastName email role')
        .or([{ 'name': regex }, { 'lastName': regex }, { 'email': regex }]) //arreglo de campos a tomar en cuenta para la busqueda
        .skip(pagination)
        .limit(constants.PAGINATION)
        .exec(
            (err, users) => {
                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: 'No se encontraron resultados',
                        errors: err,
                        user: req.user
                    });
                } else {

                    User.find({ 'recordActive': recordActive }).or([{ 'name': regex }, { 'lastName': regex }, { 'email': regex }]).countDocuments({}, (err, totalRecords) => {
                        res.status(200).write(JSON.stringify({
                            success: true,
                            users: users,
                            totalRecords: totalRecords,
                            pagination: pagination,
                            user: req.user
                        }, null, 2));
                        res.end();

                    });
                }
            });
});

router.get('/:id', [authentication.verifyToken, authentication.refreshToken], async (req, res, next) => {
    
    try {
        let id = req.params.id;
        const user = await User.find({ '_id': id }, 'name lastName email role').exec();
        const totalUsers = await User.countDocuments({});
        res.status(200).write(JSON.stringify({
            success: true,
            users: user,
            totalRecords: totalUsers,
            user: req.user
        }, null, 2));
        res.end();

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'No se encontraron resultados',
            errors: error,
            user: req.user
        });
    }
});

router.post('/', [authentication.verifyToken, authentication.refreshToken], (req, res, next) => {

    let user = new User({
        name: req.body.name,
        lastName: req.body.lastName,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10),
        role: req.body.role,
        token: ''
    });
    user.save((err, userSave) => {
        if (err) {
            return res.status(400).json({
                success: false,
                message: 'No se puede crear el usuario',
                errors: err,
                user: req.user
            });
        } else {
            res.status(201).json({
                success: true,
                message: 'Operación realizada de forma exitosa.',
                userSave: userSave,
                user: req.user
            });
        }
    });
});

router.put('/:id', [authentication.verifyToken, authentication.refreshToken], (req, res, next) => {

    let id = req.params.id;

    User.findById(id, (err, user) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: 'No se puede actualizar el usuario',
                errors: err,
                user: req.user
            });
        }

        if (!user) {
            return res.status(400).json({
                success: false,
                message: 'No existe un usuario con el id: ' + id,
                errors: { message: 'No se pudo encontrar el usuario para actualizar' },
                user: req.user
            });
        } else {
            user.name = req.body.name;
            user.lastName = req.body.lastName;
            user.email = req.body.email;
            user.password = bcrypt.hashSync(req.body.password, 10) || user.password;
            user.role = req.body.role;
            user.recordActive = req.body.recordActive || true;

            user.save((err, userSave) => {
                if (err) {
                    return res.status(400).json({
                        success: false,
                        message: 'No se puede actualizar el usuario',
                        errors: err,
                        user: req.user
                    });
                } else {
                    res.status(200).json({
                        success: true,
                        message: 'Operación realizada de forma exitosa.',
                        userSave: userSave,
                        user: req.user
                    });
                }
            });

        }
    })
});


router.delete('/:id', [authentication.verifyToken, authentication.refreshToken], (req, res, next) => {

    let id = req.params.id;

    User.findById(id, (err, user) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: 'No se puede eliminar el usuario',
                errors: err,
                user: req.user
            });
        }

        if (!user) {
            return res.status(400).json({
                success: false,
                message: 'No existe un usuario con el id: ' + id,
                errors: { message: 'No se pudo encontrar el usuario para eliminar' },
                user: req.user
            });
        } else {

            user.recordActive = false;

            user.save((err, userSave) => {
                if (err) {
                    return res.status(400).json({
                        success: false,
                        message: 'No se puede eliminar el usuario',
                        errors: err,
                        user: req.user
                    });
                } else {
                    res.status(200).json({
                        success: true,
                        message: 'Operación realizada de forma exitosa.',
                        userSave: userSave,
                        user: req.user
                    });
                }
            });

        }
    })
});

module.exports = router;
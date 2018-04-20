const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/user');

router.get('/', (req, res) => {

    let pagination = req.query.pagination || 0;
    pagination = Number(pagination);

    User.find({}, 'name lastName email role')
        .skip(pagination)
        .limit(10)
        .exec(
            (err, users) => {
                if (err) {
                    res.status(500).json({
                        success: false,
                        message: 'No se pueden consultar las tareas',
                        errors: err
                    });
                } else {

                    User.count({}, (err, totalRecords) => {
                        res.status(200).write(JSON.stringify({
                            success: true,
                            users: users,
                            totalRecords: totalRecords,
                            pagination: pagination
                        }, null, 2));
                        res.end();

                    });
                }
            });
});

router.get('/search/:term', (req, res) => {

    let term = req.params.term;
    var regex = new RegExp(term, 'i');

    let pagination = req.query.pagination || 0;
    pagination = Number(pagination);

    User.find({}, 'name lastName email role')
        .or([{ 'name': regex }, { 'lastName': regex }]) //arreglo de campos a tomar en cuenta para la busqueda
        .skip(pagination)
        .limit(10)
        .exec(
            (err, users) => {
                if (err) {
                    res.status(500).json({
                        success: false,
                        message: 'No se encontrarón resultados',
                        errors: err
                    });
                } else {

                    User.count({}, (err, totalRecords) => {
                        res.status(200).write(JSON.stringify({
                            success: true,
                            users: users,
                            totalRecords: totalRecords,
                            pagination: pagination
                        }, null, 2));
                        res.end();

                    });
                }
            });
});


router.post('/', (req, res, next) => {

    console.log(req.body);

    let user = new User({
        name: req.body.name,
        lastName: req.body.lastName,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10),
        role: req.body.role
    });
    user.save((err, userSave) => {
        if (err) {
            res.status(400).json({
                success: false,
                message: 'No se puede crear el usuario',
                errors: err
            });
        } else {
            res.status(201).json({
                success: true,
                message: 'Operación realizada de forma exitosa.',
                user: userSave
            });
        }
    });
});

router.put('/:id', (req, res, next) => {

    let id = req.params.id;

    User.findById(id, (err, user) => {
        if (err) {
            res.status(500).json({
                success: false,
                message: 'No se puede actualizar el usuario',
                errors: err
            });
        }

        if (!user) {
            res.status(400).json({
                success: false,
                message: 'No existe un usuario con el id: ' + id,
                errors: { message: 'No se pudo encontrar el usuario para actualizar' }
            });
        } else {
            user.name = req.body.name;
            user.lastName = req.body.lastName;
            user.email = req.body.email;
            user.password = req.body.password;
            user.role = req.body.role;

            user.save((err, userSave) => {
                if (err) {
                    res.status(400).json({
                        success: false,
                        message: 'No se puede actualizar el usuario',
                        errors: err
                    });
                } else {
                    res.status(200).json({
                        success: true,
                        message: 'Operación realizada de forma exitosa.',
                        user: userSave
                    });
                }
            });

        }
    })
});


router.delete('/:id', (req, res, next) => {

    let id = req.params.id;

    User.findByIdAndRemove(id, (err, userRemove) => {
        if (err) {
            res.status(500).json({
                success: false,
                message: 'No se puede eliminar el usuario',
                errors: err
            });
        } else if (userRemove) {
            res.status(200).json({
                success: true,
                message: 'Operación realizada de forma exitosa',
                user: userRemove
            });
        } else {
            res.status(400).json({
                success: false,
                message: 'No existe una tarea con el id: ' + id,
                errors: { message: 'No se pudo encontrar el usuario para eliminar' }
            });
        }
    })
});

module.exports = router;
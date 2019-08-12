const constants = require('../config/constants');
const { Position } = require('../models');

//router.get('/', [authentication.verifyToken, authentication.refreshToken],
const find = (req, res, next) => {

    let pagination = req.query.pagination || 0;
    pagination = Number(pagination);

    Position.find()
        .skip(pagination)
        .limit(constants.PAGINATION)
        .exec(
            (err, positions) => {
                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: 'No se pueden consultar los cargos',
                        errors: err,
                        user: req.user
                    });
                } else {

                    Position.count({}, (err, totalRecords) => {
                        res.status(200).write(JSON.stringify({
                            success: true,
                            positions: positions,
                            totalRecords: positions.length,
                            pagination: pagination,
                            user: req.user
                        }, null, 2));
                        res.end();

                    });
                }
            });
};

//router.get('/all', [authentication.verifyToken, authentication.refreshToken],
const findAll = (req, res, next) => {

    Position.find({ 'recordActive': true })
        .exec(
            (err, positions) => {
                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: 'No se pueden consultar los cargos',
                        errors: err,
                        user: req.user
                    });
                } else {

                    Position.find({ 'recordActive': true }).count({}, (err, totalRecords) => {
                        res.status(200).write(JSON.stringify({
                            success: true,
                            positions: positions,
                            totalRecords: totalRecords,
                            user: req.user
                        }, null, 2));
                        res.end();

                    });
                }
            });
};

//router.get('/recordActive/:recordActive', [authentication.verifyToken, authentication.refreshToken], 
const findByRecordActive = (req, res, next) => {

    let pagination = req.query.pagination || 0;
    pagination = Number(pagination);
    let recordActive = req.params.recordActive;
    recordActive = Boolean(recordActive);

    Position.find({ 'recordActive': recordActive })
        .skip(pagination)
        .limit(constants.PAGINATION)
        .exec(
            (err, positions) => {
                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: 'No se pueden consultar los cargos',
                        errors: err,
                        user: req.user
                    });
                } else {

                    Position.find({ 'recordActive': recordActive }).count({}, (err, totalRecords) => {
                        res.status(200).write(JSON.stringify({
                            success: true,
                            positions: positions,
                            totalRecords: totalRecords,
                            pagination: pagination,
                            user: req.user
                        }, null, 2));
                        res.end();

                    });
                }
            });
};

//router.get('/search/:term', [authentication.verifyToken, authentication.refreshToken],
const findByTerm = (req, res, next) => {

    let term = req.params.term;
    var regex = new RegExp(term, 'i');

    let pagination = req.query.pagination || 0;
    pagination = Number(pagination);

    Position.find()
        .or([{ 'name': regex }]) //arreglo de campos a tomar en cuenta para la busqueda
        .skip(pagination)
        .limit(constants.PAGINATION)
        .exec(
            (err, positions) => {
                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: 'No se encontraron resultados',
                        errors: err,
                        user: req.user
                    });
                } else {

                    Position.find().or([{ 'name': regex }]).count({}, (err, totalRecords) => {
                        res.status(200).write(JSON.stringify({
                            success: true,
                            positions: positions,
                            totalRecords: totalRecords,
                            pagination: pagination,
                            user: req.user
                        }, null, 2));
                        res.end();

                    });
                }
            });
};

//router.get('/search/:term/:recordActive', [authentication.verifyToken, authentication.refreshToken],
const findByTermAndRecordActive = (req, res, next) => {

    let term = req.params.term;
    var regex = new RegExp(term, 'i');

    let pagination = req.query.pagination || 0;
    pagination = Number(pagination);
    let recordActive = req.params.recordActive;
    recordActive = Boolean(recordActive);

    Position.find({ 'recordActive': recordActive })
        .or([{ 'name': regex }]) //arreglo de campos a tomar en cuenta para la busqueda
        .skip(pagination)
        .limit(constants.PAGINATION)
        .exec(
            (err, positions) => {
                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: 'No se encontraron resultados',
                        errors: err,
                        user: req.user
                    });
                } else {

                    Position.find({ 'recordActive': recordActive }).or([{ 'name': regex }]).count({}, (err, totalRecords) => {
                        res.status(200).write(JSON.stringify({
                            success: true,
                            positions: positions,
                            totalRecords: totalRecords,
                            pagination: pagination,
                            user: req.user
                        }, null, 2));
                        res.end();

                    });
                }
            });
};

//router.get('/:id', [authentication.verifyToken, authentication.refreshToken],
const findById = (req, res, next) => {

    let id = req.params.id;

    Position.findById(id, (err, position) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: 'No se puede actualizar la tarea',
                errors: err,
                user: req.user
            });
        }

        if (!position) {
            return res.status(400).json({
                success: false,
                message: 'No existe un cargo con el id: ' + id,
                errors: { message: 'No se pudo encontrar el cargo' },
                user: req.user
            });
        } else {

            res.status(200).json({
                success: true,
                message: 'Operación realizada de forma exitosa.',
                position: position,
                user: req.user
            });

        }
    })
};


//router.post('/', [authentication.verifyToken, authentication.refreshToken],

const savePosition = (req, res, next) => {

    let position = new Position({
        name: req.body.name,
        code: req.body.code,
        description: req.body.description,
        performancePercentage: req.body.performancePercentage
    });
    position.save((err, positionSave) => {
        if (err) {
            return res.status(400).json({
                success: false,
                message: 'No se puede crear el cargo',
                errors: err,
                user: req.user
            });
        } else {
            res.status(201).json({
                success: true,
                message: 'Operación realizada de forma exitosa.',
                position: positionSave,
                user: req.user
            });
        }
    });
};

//router.put('/:id', [authentication.verifyToken, authentication.refreshToken],
const updatePosition = (req, res, next) => {

    let id = req.params.id;

    Position.findById(id, (err, position) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: 'No se puede actualizar el cargo',
                errors: err,
                user: req.user
            });
        }

        if (!position) {
            return res.status(400).json({
                success: false,
                message: 'No existe el cargo con el id: ' + id,
                errors: { message: 'No se pudo encontrar el cargo para actualizar' },
                user: req.user
            });
        } else {
            position.name = req.body.name;
            position.code = req.body.code;
            position.description = req.body.description;
            position.performancePercentage = req.body.performancePercentage;
            position.recordActive = req.body.recordActive || true;

            position.save((err, positionSave) => {
                if (err) {
                    return res.status(400).json({
                        success: false,
                        message: 'No se puede actualizar el cargo',
                        errors: err,
                        user: req.user
                    });
                } else {
                    res.status(200).json({
                        success: true,
                        message: 'Operación realizada de forma exitosa.',
                        position: positionSave,
                        user: req.user
                    });
                }
            });

        }
    })
};


//router.delete('/:id', [authentication.verifyToken, authentication.refreshToken], 
const deletePosition = (req, res, next) => {

    let id = req.params.id;

    Position.findById(id, (err, position) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: 'No se puede eliminar el cargo',
                errors: err,
                user: req.user
            });
        }

        if (!position) {
            return res.status(400).json({
                success: false,
                message: 'No existe el cargo con el id: ' + id,
                errors: { message: 'No se pudo encontrar el cargo para eliminar' },
                user: req.user
            });
        } else {

            position.recordActive = false;

            position.save((err, positionSave) => {
                if (err) {
                    return res.status(400).json({
                        success: false,
                        message: 'No se puede eliminar el cargo',
                        errors: err,
                        user: req.user
                    });
                } else {
                    res.status(200).json({
                        success: true,
                        message: 'Operación realizada de forma exitosa.',
                        position: positionSave,
                        user: req.user
                    });
                }
            });

        }
    })
};

module.exports = {
    find,
    findAll,
    findByRecordActive,
    findByTerm,
    findByTermAndRecordActive,
    findById,
    savePosition,
    updatePosition,
    deletePosition
};
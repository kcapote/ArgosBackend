
const constants = require('../config/constants');
const { SubTask } = require('../models');

//router.get('/', [authentication.verifyToken, authentication.refreshToken], 
const find = (req, res, next) => {

    let pagination = req.query.pagination || 0;
    pagination = Number(pagination);

    SubTask.find()
        .populate('task')
        .skip(pagination)
        .limit(constants.PAGINATION)
        .sort({ position: 1 })
        .exec(
            (err, subTasks) => {
                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: 'No se pueden consultar las tareas',
                        errors: err,
                        user: req.user
                    });
                } else {
                    SubTask.count({}, (err, totalRecords) => {
                        res.status(200).write(JSON.stringify({
                            success: true,
                            subTasks: subTasks,
                            totalRecords: subTasks.length,
                            pagination: pagination,
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

    SubTask.find({ 'recordActive': recordActive })
        .populate('task')
        .skip(pagination)
        .limit(constants.PAGINATION)
        .sort({ position: 1 })
        .exec(
            (err, subTasks) => {
                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: 'No se pueden consultar las tareas',
                        errors: err,
                        user: req.user
                    });
                } else {
                    SubTask.find({ 'recordActive': recordActive }).count({}, (err, totalRecords) => {
                        res.status(200).write(JSON.stringify({
                            success: true,
                            subTasks: subTasks,
                            totalRecords: totalRecords,
                            pagination: pagination,
                            user: req.user
                        }, null, 2));
                        res.end();

                    });
                }
            });
};

//router.get('/all', [authentication.verifyToken, authentication.refreshToken], 
const findByAll = (req, res, next) => {

    SubTask.find({ 'recordActive': true })
        .populate('task')
        .sort({ position: 1 })
        .exec(
            (err, subTasks) => {
                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: 'No se pueden consultar las tareas',
                        errors: err,
                        user: req.user
                    });
                } else {
                    SubTask.find({ 'recordActive': true }).count({}, (err, totalRecords) => {
                        res.status(200).write(JSON.stringify({
                            success: true,
                            subTasks: subTasks,
                            totalRecords: totalRecords,
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

    SubTask.find()
        .populate('task')
        .or([{ 'name': regex }]) //arreglo de campos a tomar en cuenta para la busqueda
        .skip(pagination)
        .limit(constants.PAGINATION)
        .sort({ position: 1 })
        .exec(
            (err, subTasks) => {
                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: 'No se encontraron resultados',
                        errors: err,
                        user: req.user
                    });
                } else {

                    SubTask.find().or([{ 'name': regex }]).count({}, (err, totalRecords) => {
                        res.status(200).write(JSON.stringify({
                            success: true,
                            subTasks: subTasks,
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

    SubTask.find({ 'recordActive': recordActive })
        .populate('task')
        .or([{ 'name': regex }]) //arreglo de campos a tomar en cuenta para la busqueda
        .skip(pagination)
        .limit(constants.PAGINATION)
        .sort({ position: 1 })
        .exec(
            (err, subTasks) => {
                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: 'No se encontraron resultados',
                        errors: err,
                        user: req.user
                    });
                } else {

                    SubTask.find({ 'recordActive': recordActive }).or([{ 'name': regex }]).count({}, (err, totalRecords) => {
                        res.status(200).write(JSON.stringify({
                            success: true,
                            subTasks: subTasks,
                            totalRecords: totalRecords,
                            pagination: pagination,
                            user: req.user
                        }, null, 2));
                        res.end();

                    });
                }
            });
};


//router.get('/task/:id', [authentication.verifyToken, authentication.refreshToken], 
const findByTaskId = (req, res, next) => {

    let id = req.params.id;

    SubTask.find({ 'task': id, 'recordActive': true })
        .populate('task')
        .exec(
            (err, subTasks) => {
                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: 'No se pueden consultar las tareas',
                        errors: err,
                        user: req.user
                    });
                } else {
                    SubTask.find({ 'task': id, 'recordActive': true }).count({}, (err, totalRecords) => {
                        res.status(200).write(JSON.stringify({
                            success: true,
                            subTasks: subTasks,
                            totalRecords: totalRecords,
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

    SubTask.find({ '_id': id })
        .populate('task')
        .exec(
            (err, subTasks) => {
                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: 'No se pueden consultar las tareas',
                        errors: err,
                        user: req.user
                    });
                } else {
                    SubTask.count({}, (err, totalRecords) => {
                        res.status(200).write(JSON.stringify({
                            success: true,
                            subTasks: subTasks,
                            totalRecords: subTasks.length,
                            user: req.user
                        }, null, 2));
                        res.end();

                    });
                }
            });
};

//router.post('/', [authentication.verifyToken, authentication.refreshToken], 
const saveSubTask = (req, res, next) => {
    let subTask = new SubTask({
        name: req.body.name,
        task: req.body.task,
        position: req.body.position
    });
    subTask.save((err, subTask) => {
        if (err) {
            return res.status(400).json({
                success: false,
                message: 'No se puede crear la tarea',
                errors: err,
                user: req.user
            });
        } else {
            res.status(201).json({
                success: true,
                message: 'Operación realizada de forma exitosa.',
                subTask: subTask,
                user: req.user
            });
        }
    });
};

//router.put('/:id', [authentication.verifyToken, authentication.refreshToken],
const updateSubTask = (req, res, next) => {

    let id = req.params.id;

    SubTask.findById(id, (err, subTask) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: 'No se puede actualizar la tarea',
                errors: err,
                user: req.user
            });
        }

        if (!subTask) {
            return res.status(400).json({
                success: false,
                message: 'No existe una tarea con el id: ' + id,
                errors: { message: 'No se pudo encontrar la tarea para actualizar' },
                user: req.user
            });
        } else {

            subTask.name = req.body.name;
            subTask.position = req.body.position;
            subTask.recordActive = req.body.recordActive || true;
            subTask.task = req.body.task;

            subTask.save((err, subTask) => {
                if (err) {
                    return res.status(400).json({
                        success: false,
                        message: 'No se puede actualizar la tarea',
                        errors: err,
                        user: req.user
                    });
                } else {
                    res.status(200).json({
                        success: true,
                        message: 'Operación realizada de forma exitosa.',
                        subTask: subTask,
                        user: req.user
                    });
                }
            });

        }
    })
};


//router.delete('/:id', [authentication.verifyToken, authentication.refreshToken],
const deleteSubTask = (req, res, next) => {

    let id = req.params.id;

    SubTask.findById(id, (err, subTask) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: 'No se puede eliminar la tarea',
                errors: err,
                user: req.user
            });
        }

        if (!subTask) {
            return res.status(400).json({
                success: false,
                message: 'No existe una tarea con el id: ' + id,
                errors: { message: 'No se pudo encontrar la tarea para eliminar' },
                user: req.user
            });
        } else {

            subTask.recordActive = false;

            subTask.save((err, subTask) => {
                if (err) {
                    return res.status(400).json({
                        success: false,
                        message: 'No se puede eliminar la tarea',
                        errors: err,
                        user: req.user
                    });
                } else {
                    res.status(200).json({
                        success: true,
                        message: 'Operación realizada de forma exitosa.',
                        subTask: subTask,
                        user: req.user
                    });
                }
            });

        }
    })
};

module.exports = {
    find,
    findByRecordActive,
    findByAll,
    findByTerm,
    findByTermAndRecordActive,
    findByTaskId,
    findById,
    saveSubTask,
    updateSubTask,
    deleteSubTask
};